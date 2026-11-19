namespace FactorySimulator.Infrastructure.Persistence.PostgreSql.Models;

public class WarehouseItemModel
{
    public string ResourceCode { get; set; } = string.Empty;
    public int Amount { get; set; }
}