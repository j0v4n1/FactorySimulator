namespace FactorySimulator.Infrastructure.Persistence.PostgreSql.Models;

public class WarehouseTypesModel
{
    public Guid Id { get; set; }
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string Size { get; set; } = string.Empty;
    public string? Benefit { get; set; }
    public List<WarehouseItemModel>? ConstructionResources { get; set; } = [];
    public int Capacity { get; set; }
    public decimal? RentPrice { get; set; }
    public decimal? BuildPrice { get; set; }
}