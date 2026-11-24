using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FactorySimulator.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class changeTableName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Deposit",
                table: "Deposit");

            migrationBuilder.RenameTable(
                name: "Deposit",
                newName: "Deposits");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Deposits",
                table: "Deposits",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Deposits",
                table: "Deposits");

            migrationBuilder.RenameTable(
                name: "Deposits",
                newName: "Deposit");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Deposit",
                table: "Deposit",
                column: "Id");
        }
    }
}
