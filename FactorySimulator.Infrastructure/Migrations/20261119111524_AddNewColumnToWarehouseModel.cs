using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FactorySimulator.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddNewColumnToWarehouseModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Guid>(
                name: "EnterpriseId",
                table: "Warehouses",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddColumn<decimal>(
                name: "WarehouseConstructionPrice",
                table: "Warehouses",
                type: "numeric",
                nullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "Id",
                table: "Resources",
                type: "uuid",
                nullable: false,
                defaultValueSql: "gen_random_uuid()",
                oldClrType: typeof(Guid),
                oldType: "uuid");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Resources_Warehouses_WarehousesModelId",
                table: "Resources");

            migrationBuilder.DropIndex(
                name: "IX_Resources_WarehousesModelId",
                table: "Resources");

            migrationBuilder.DropColumn(
                name: "WarehouseConstructionPrice",
                table: "Warehouses");

            migrationBuilder.DropColumn(
                name: "WarehousesModelId",
                table: "Resources");

            migrationBuilder.AlterColumn<Guid>(
                name: "EnterpriseId",
                table: "Warehouses",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "Id",
                table: "Resources",
                type: "uuid",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldDefaultValueSql: "gen_random_uuid()");
        }
    }
}
