using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FactorySimulator.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class renameColInWarehousesAndWarehousesTypes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ConstructionCost",
                table: "WarehouseTypes",
                newName: "BuildPrice");

            migrationBuilder.RenameColumn(
                name: "WarehouseTypeCode",
                table: "Warehouses",
                newName: "Type");

            migrationBuilder.RenameColumn(
                name: "WarehouseConstructionPrice",
                table: "Warehouses",
                newName: "BuildPrice");

            migrationBuilder.RenameColumn(
                name: "DistanceFromEnterprise",
                table: "Warehouses",
                newName: "Distance");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "BuildPrice",
                table: "WarehouseTypes",
                newName: "ConstructionCost");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "Warehouses",
                newName: "WarehouseTypeCode");

            migrationBuilder.RenameColumn(
                name: "Distance",
                table: "Warehouses",
                newName: "DistanceFromEnterprise");

            migrationBuilder.RenameColumn(
                name: "BuildPrice",
                table: "Warehouses",
                newName: "WarehouseConstructionPrice");
        }
    }
}
