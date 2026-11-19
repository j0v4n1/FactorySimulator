namespace FactorySimulator.Core.Entities;

public class Warehouse
{
    public Warehouse(string name, string warehouseTypeCode, Guid? enterpriseId, int capacity,
        string distanceFromEnterprise, decimal rentPrice,
        decimal warehousePrice
    )
    {
        Id = Guid.NewGuid();
        Name = name;
        WarehouseTypeCode = warehouseTypeCode;
        EnterpriseId = enterpriseId;
        Capacity = capacity;
        DistanceFromEnterprise = distanceFromEnterprise;
        RentPrice = rentPrice;
        WarehousePrice = warehousePrice;
    }

    public Guid Id { get; set; }
    public string Name { get; set; }
    public string WarehouseTypeCode { get; set; }
    public Guid? EnterpriseId { get; set; }
    public int Capacity { get; set; }
    public string DistanceFromEnterprise { get; set; }
    public decimal? RentPrice { get; set; }
    public decimal? WarehousePrice { get; set; }
    public List<ResourceAmount> Items { get; set; } = [];
}