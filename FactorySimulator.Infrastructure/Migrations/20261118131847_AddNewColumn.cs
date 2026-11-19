using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FactorySimulator.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddNewColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Benefit",
                table: "WarehouseTypes",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Benefit",
                table: "WarehouseTypes");
        }
    }
}
