using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ChoreHub.Migrations
{
    public partial class chorehub4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Images_ImageId",
                table: "Users");

            migrationBuilder.AlterColumn<int>(
                name: "ImageId",
                table: "Users",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Images_ImageId",
                table: "Users",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Images_ImageId",
                table: "Users");

            migrationBuilder.AlterColumn<int>(
                name: "ImageId",
                table: "Users",
                nullable: false);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Images_ImageId",
                table: "Users",
                column: "ImageId",
                principalTable: "Images",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
