namespace FactorySimulator.Infrastructure.Persistence.PostgreSql.Models;

public class WarehouseItemModel
{
    public Guid ResourceId { get; set; }
    public int Amount { get; set; }
}