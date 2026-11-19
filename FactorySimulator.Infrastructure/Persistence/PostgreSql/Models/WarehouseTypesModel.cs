namespace FactorySimulator.Infrastructure.Persistence.PostgreSql.Models;

public class WarehouseTypesModel
{
    public Guid Id { get; set; }
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string Size { get; set; } = string.Empty;
    public string? Benefit { get; set; }
    public int Capacity { get; set; }
    public int? RentPrice { get; set; }
    public int? ConstructionCost { get; set; }
}