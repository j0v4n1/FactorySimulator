using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FactorySimulator.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class FixWarehouseResources : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Resources_Warehouses_WarehousesModelId",
                table: "Resources");

            migrationBuilder.DropIndex(
                name: "IX_Resources_WarehousesModelId",
                table: "Resources");

            migrationBuilder.DropColumn(
                name: "WarehousesModelId",
                table: "Resources");

            migrationBuilder.AddColumn<string>(
                name: "ConstructionResources",
                table: "Warehouses",
                type: "jsonb",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ConstructionResources",
                table: "Warehouses");

            migrationBuilder.AddColumn<Guid>(
                name: "WarehousesModelId",
                table: "Resources",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Resources_WarehousesModelId",
                table: "Resources",
                column: "WarehousesModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Resources_Warehouses_WarehousesModelId",
                table: "Resources",
                column: "WarehousesModelId",
                principalTable: "Warehouses",
                principalColumn: "Id");
        }
    }
}
