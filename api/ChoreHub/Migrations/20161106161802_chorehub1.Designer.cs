using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using ChoreHub.DAL;

namespace ChoreHub.Migrations
{
    [DbContext(typeof(ChoreHubContext))]
    [Migration("20161106161802_chorehub1")]
    partial class chorehub1
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ChoreHub.Models.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(60);

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("ChoreHub.Models.Chore", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("CategoryId")
                        .IsRequired();

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(MAX)");

                    b.Property<string>("Title")
                        .IsRequired();

                    b.Property<int?>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("UserId");

                    b.ToTable("Chores");
                });

            modelBuilder.Entity("ChoreHub.Models.Image", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Link")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Images");
                });

            modelBuilder.Entity("ChoreHub.Models.Review", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("AuthorId");

                    b.Property<long>("Content");

                    b.Property<int>("Rating");

                    b.Property<int?>("SubjectId");

                    b.HasKey("Id");

                    b.HasIndex("AuthorId");

                    b.HasIndex("SubjectId");

                    b.ToTable("Reviews");
                });

            modelBuilder.Entity("ChoreHub.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Auth0Id")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(MAX)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(62);

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(46);

                    b.Property<int>("ImageId");

                    b.Property<bool>("IsAdmin");

                    b.Property<bool>("IsPublic");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(46);

                    b.HasKey("Id");

                    b.HasIndex("ImageId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("ChoreHub.Models.Chore", b =>
                {
                    b.HasOne("ChoreHub.Models.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("ChoreHub.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("ChoreHub.Models.Review", b =>
                {
                    b.HasOne("ChoreHub.Models.User", "Author")
                        .WithMany()
                        .HasForeignKey("AuthorId");

                    b.HasOne("ChoreHub.Models.User", "Subject")
                        .WithMany()
                        .HasForeignKey("SubjectId");
                });

            modelBuilder.Entity("ChoreHub.Models.User", b =>
                {
                    b.HasOne("ChoreHub.Models.Image", "Image")
                        .WithMany()
                        .HasForeignKey("ImageId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
