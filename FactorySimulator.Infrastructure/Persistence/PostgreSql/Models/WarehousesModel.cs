namespace FactorySimulator.Infrastructure.Persistence.PostgreSql.Models;

public class WarehousesModel
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string WarehouseTypeCode { get; set; } = string.Empty;
    public Guid? EnterpriseId { get; set; }
    public int Capacity { get; set; }
    public int? RentPrice { get; set; }
    public string DistanceFromEnterprise { get; set; } = string.Empty;
    public List<ResourceModel>? ConstructionResources { get; set; } = [];
    public decimal? WarehouseConstructionPrice { get; set; }
    public List<WarehouseItemModel> Items { get; set; } = [];
}