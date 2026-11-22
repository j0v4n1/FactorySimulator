namespace FactorySimulator.Core.Entities;

public class Warehouse
{
    public Warehouse(string name, string code, string size, string warehouseTypeCode, Guid? enterpriseId, int capacity,
        string distance, decimal? rentPrice,
        decimal? buildPrice
    )
    {
        Id = Guid.NewGuid();
        Name = name;
        Code = code;
        Size = size;
        Type = warehouseTypeCode;
        EnterpriseId = enterpriseId;
        Capacity = capacity;
        Distance = distance;
        RentPrice = rentPrice;
        BuildPrice = buildPrice;
    }

    public Warehouse(Guid id, string name, string code, string size, string type, Guid? enterpriseId, int capacity,
        string distance, decimal? rentPrice, decimal? buildPrice, List<ResourceAmount> items
    )
    {
        Id = id;
        Name = name;
        Code = code;
        Size = size;
        Type = type;
        EnterpriseId = enterpriseId;
        Capacity = capacity;
        Distance = distance;
        RentPrice = rentPrice;
        BuildPrice = buildPrice;
        Items = items;
    }

    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Code { get; set; }
    public string Type { get; set; }
    public string Size { get; set; }
    public Guid? EnterpriseId { get; set; }
    public int Capacity { get; set; }
    public string Distance { get; set; }
    public decimal? RentPrice { get; set; }
    public decimal? BuildPrice { get; set; }
    public List<ResourceAmount> Items { get; set; } = [];
}