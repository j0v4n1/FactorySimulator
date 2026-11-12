using FactorySimulator.Core;
using Microsoft.AspNetCore.SignalR;

namespace FactorySimulator.Server.Hubs;

public class GameHub(Game game) : Hub
{
    public override async Task OnConnectedAsync()
    {
        await Clients.All.SendAsync(
            "BalanceUpdated",
            game.Corporation.Balance
        );

        await base.OnConnectedAsync();
    }
}