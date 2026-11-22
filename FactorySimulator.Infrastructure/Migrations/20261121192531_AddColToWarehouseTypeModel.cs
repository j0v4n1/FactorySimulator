using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FactorySimulator.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddColToWarehouseTypeModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ConstructionResources",
                table: "Warehouses");

            migrationBuilder.AddColumn<string>(
                name: "ConstructionResources",
                table: "WarehouseTypes",
                type: "jsonb",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ConstructionResources",
                table: "WarehouseTypes");

            migrationBuilder.AddColumn<string>(
                name: "ConstructionResources",
                table: "Warehouses",
                type: "jsonb",
                nullable: true);
        }
    }
}
