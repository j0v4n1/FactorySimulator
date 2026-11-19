using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FactorySimulator.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class deleteCol : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DistanceFromEnterprise",
                table: "WarehouseTypes");

            migrationBuilder.AddColumn<string>(
                name: "DistanceFromEnterprise",
                table: "Warehouses",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DistanceFromEnterprise",
                table: "Warehouses");

            migrationBuilder.AddColumn<string>(
                name: "DistanceFromEnterprise",
                table: "WarehouseTypes",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
