using FactorySimulator.Core;
using FactorySimulator.Infrastructure.Persistence.PostgreSql;
using FactorySimulator.Server.debug;
using Microsoft.EntityFrameworkCore;

namespace FactorySimulator.Server.Endpoints;

public static class CorporationEndpoints
{
    public static void MapEndpoints(WebApplication app)
    {
        app.MapGet("/api/corporation", async (Game game, AppDbContext db) =>
        {
            var recipes = await db.Recipes.ToListAsync();
            var resources = await db.Resources.ToListAsync();
            var equipments = await db.Equipments.ToListAsync();

            var enterprises = game.Corporation.Enterprises.Select(enterprise =>
            {
                var recipe = recipes.FirstOrDefault(recipe => recipe.Code == enterprise.Recipe.Code);
                var equipment = equipments.FirstOrDefault(equipment => equipment.Code == enterprise.EquipmentCode);
                return new
                {
                    enterprise.Id,
                    enterprise.Name,
                    enterprise.ConstructionCode,
                    enterprise.EquipmentCount,
                    enterprise.Employees,
                    enterprise.TotalConstructionCost,
                    Status = enterprise.Status.ToString(),
                    Recipe = recipe is null
                        ? null
                        : new
                        {
                            Id = recipe.Id.ToString(),
                            recipe.Code,
                            recipe.Name,
                            Inputs = recipe.Inputs.Select(input => new
                            {
                                Resource = resources.FirstOrDefault(res => res.Code == input.ResourceCode),
                                input.Amount
                            }),
                            OutputResource = resources.FirstOrDefault(res => res.Code == recipe.OutputResourceCode)
                        },
                    Equipment = equipment,
                    enterprise.DepositId
                    
                };
            }).ToList();

            var warehouses = game.Corporation.Warehouses.Select(w =>
            {
                return new
                {
                    w.Id,
                    w.Name,
                    w.Code,
                    w.Size,
                    w.Type,
                    w.EnterpriseId,
                    w.Capacity,
                    w.Distance,
                    w.RentPrice,
                    w.Items
                };
            }).ToList();
            
            DebugHelper.PrintJson(enterprises);

            return Results.Ok(new
            {
                game.Corporation.Balance,
                enterprises,
                warehouses
            });
        });
    }
}