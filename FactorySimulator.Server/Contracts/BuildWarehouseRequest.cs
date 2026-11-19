namespace FactorySimulator.Server.Contracts;

public class BuildWarehouseRequest
{
    public string Id { get; set; } = string.Empty;
    public string WarehouseTypeCode { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string? EnterpriseId { get; set; }
    public decimal RentPrice { get; set; }
    public decimal WarehouseConstructionPrice { get; set; }
    public string DistanceFromEnterprise { get; set; }
}