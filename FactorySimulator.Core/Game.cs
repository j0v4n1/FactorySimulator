using FactorySimulator.Core.Entities;
using FactorySimulator.Core.Systems;

namespace FactorySimulator.Core;

public class Game
{
    public Game()
    {
        ConstructionSystem = new ConstructionSystem(Corporation);
        WarehouseSystem = new WarehouseSystem(Corporation);
    }

    public Corporation Corporation { get; } = new();


    public ConstructionSystem ConstructionSystem { get; }
    public WarehouseSystem WarehouseSystem { get; }
}