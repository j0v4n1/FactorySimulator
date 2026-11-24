using System.Text.Json;
using FactorySimulator.Core;
using FactorySimulator.Infrastructure.Persistence.PostgreSql;
using FactorySimulator.Server.Hubs;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace FactorySimulator.Server.Endpoints;

public class DepositsEndpoints
{
    public static void MapEndpoints(WebApplication app)
    {
        app.MapPost("/api/deposits", async (AppDbContext db, JsonElement body, Game game,
            IHubContext<GameHub> hubContext) =>
        {
            var id = body.GetProperty("id").GetGuid();

            var depositModel = await db.Deposits.FirstOrDefaultAsync(d => d.Id == id);

            if (depositModel == null) return Results.BadRequest();

            var canRent = game.DepositSystem.TryRentDeposit(
                depositModel.RentPrice
            );

            if (!canRent) return Results.BadRequest();

            depositModel.IsLeased = true;

            await db.SaveChangesAsync();

            game.DepositSystem.RentDeposit(depositModel.Id,
                depositModel.Name,
                depositModel.Description,
                depositModel.ResourceId,
                depositModel.TotalReserves,
                depositModel.RemainingReserves,
                depositModel.Distance,
                depositModel.RentPrice,
                depositModel.PurchasePrice,
                depositModel.IsOwned,
                true, depositModel.EnterpriseId
            );

            await hubContext.Clients.All.SendAsync(
                "BalanceUpdated",
                game.Corporation.Balance
            );

            return Results.Ok(new { isLeased = true });
        });
    }
}