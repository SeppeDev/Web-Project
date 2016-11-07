﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;

using Microsoft.EntityFrameworkCore;
using ChoreHub.DAL;

using ChoreHub.Models;
using Microsoft.IdentityModel.Tokens;

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

            services.AddDbContext<ChoreHubContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddMvc();

            // Repositories
            services.AddSingleton<IChoreRepository, ChoreRepository>();
            services.AddSingleton<IImageRepository, ImageRepository>();
            services.AddSingleton<IUserRepository, UserRepository>();
            services.AddSingleton<ICategoryRepository, CategoryRepository>();

            // HttpContext
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            // Enable Cors
            services.AddCors();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, ChoreHubContext context)
        {
            var keyAsBase64 = Configuration["Auth0:ClientSecret"].Replace('_', '/').Replace('-', '+');
            var keyAsBytes = Convert.FromBase64String(keyAsBase64);

            // Auth0
            var options = new JwtBearerOptions
            {
                TokenValidationParameters =
                {
                    ValidIssuer = $"https://{Configuration["Auth0:Domain"]}/",
                    ValidAudience = Configuration["Auth0:ClientId"],
                    IssuerSigningKey = new SymmetricSecurityKey(keyAsBytes)
                }
            };

            app.UseJwtBearerAuthentication(options);

            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

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

            app.UseMvc();
        }
    }
}
