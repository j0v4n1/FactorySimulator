namespace FactorySimulator.Infrastructure.Persistence.PostgreSql.Models;

public class WarehousesModel
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Code { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string Size { get; set; } = string.Empty;
    public Guid? EnterpriseId { get; set; }
    public int Capacity { get; set; }
    public decimal? RentPrice { get; set; }
    public string Distance { get; set; } = string.Empty;

    public decimal? BuildPrice { get; set; }
    public List<WarehouseItemModel> Items { get; set; } = [];
}