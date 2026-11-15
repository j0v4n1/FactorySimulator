namespace FactorySimulator.Infrastructure.Persistence.PostgreSql.Models;

public class EquipmentModel
{
    public Guid Id { get; set; }
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int PowerConsumption { get; set; }
    public decimal UnitCost { get; set; }
    public int ProductionPerSecond { get; set; }
    public int ReducedProductionPerSecond { get; set; }
}