using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;




using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;


using Microsoft.EntityFrameworkCore;
using ChoreHub.DAL;

using ChoreHub.Models;

namespace ChoreHub
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc();

            // Add the Auth0 Settings object so it can be injected
            services.Configure<Auth0Settings>(Configuration.GetSection("Auth0"));

            // Add authentication services
            services.AddAuthentication(
                options => options.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme);

            services.AddDbContext<ChoreHubContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            // Add MVC services to the services container.
            services.AddMvc();
            services.AddDistributedMemoryCache(); // Adds a default in-memory implementation of IDistributedCache
            services.AddSession();

            // Repositories
            services.AddSingleton<IChoreRepository, ChoreRepository>();
            services.AddSingleton<IImageRepository, ImageRepository>();
            services.AddSingleton<IUserRepository, UserRepository>();
            //services.AddSingleton<IReviewRepository, ReviewRepository>();

            // HttpContext
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, IOptions<Auth0Settings> auth0Settings, ChoreHubContext context)
        {
            // Auth0
            var options = new JwtBearerOptions
            {
                Audience = Configuration["Auth0:ClientId"],
                Authority = $"https://{Configuration["Auth0:Domain"]}/"
            };

            app.UseJwtBearerAuthentication(options);

            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            // Add the cookie middleware
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AutomaticAuthenticate = true,
                AutomaticChallenge = true
            });

            //Auth0 get user info
            var OpenIdConnectionOptions = new OpenIdConnectOptions("Auth0")
            {
                // Set the authority to your Auth0 domain
                Authority = $"https://{auth0Settings.Value.Domain}",

                // Configure the Auth0 Client ID and Client Secret
                ClientId = auth0Settings.Value.ClientId,
                ClientSecret = auth0Settings.Value.ClientSecret,

                // Do not automatically authenticate and challenge
                AutomaticAuthenticate = false,
                AutomaticChallenge = false,

                // Set response type to code
                ResponseType = "code",

                // Set the callback path, so Auth0 will call back to http://localhost:5000/signin-auth0 
                // Also ensure that you have added the URL as an Allowed Callback URL in your Auth0 dashboard 
                CallbackPath = new PathString("/signin-auth0"),

                // Configure the Claims Issuer to be Auth0
                ClaimsIssuer = "Auth0",

                // Saves tokens to the AuthenticationProperties
                SaveTokens = true,

                Events = new OpenIdConnectEvents
                {
                    OnTicketReceived = aContext =>
                    {
                        // Get the ClaimsIdentity
                        var identity = aContext.Principal.Identity as ClaimsIdentity;
                        if (identity != null)
                        {
                            // Add the Name ClaimType. This is required if we want User.Identity.Name to actually return something!
                            if (!aContext.Principal.HasClaim(c => c.Type == ClaimTypes.Name) &&
                                identity.HasClaim(c => c.Type == "name"))
                                identity.AddClaim(new Claim(ClaimTypes.Name, identity.FindFirst("name").Value));
                        }

                        return Task.FromResult(0);
                    }
                }
            };
            OpenIdConnectionOptions.Scope.Clear();
            OpenIdConnectionOptions.Scope.Add("openid");
            OpenIdConnectionOptions.Scope.Add("name");
            OpenIdConnectionOptions.Scope.Add("email");
            OpenIdConnectionOptions.Scope.Add("picture");
            app.UseOpenIdConnectAuthentication(OpenIdConnectionOptions);



            // IMPORTANT: This session call MUST go before UseMvc()
            app.UseSession();

            // Entity
            DbInitializer.Initialize(context);

            // Exception page
            if(env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // Enable cors
            app.UseCors(builder =>
                builder.AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                );

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Users}/{action=Index}/{id?}");
            });
        }
    }
}
