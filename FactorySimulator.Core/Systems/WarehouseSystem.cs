using FactorySimulator.Core.Entities;

namespace FactorySimulator.Core.Systems;

public class WarehouseSystem(Corporation corporation)
{
    public Warehouse? TryBuildWarehouse(string name, string code, string warehouseTypeCode, string size,
        Guid? enterpriseId,
        int capacity,
        string distanceFromEnterprise,
        decimal? rentPrice, decimal? warehousePrice
    )
    {
        var fullName = $"{name} №{corporation.Warehouses.Count + 1}";
        if (rentPrice is decimal price)
            if (!corporation.TrySpend(price))
                return null;

        if (warehousePrice is decimal priceW)
            if (!corporation.TrySpend(priceW))
                return null;


        var warehouse = new Warehouse(fullName, code, size, warehouseTypeCode, enterpriseId, capacity,
            distanceFromEnterprise,
            rentPrice, warehousePrice);

        corporation.AddWarehouse(warehouse);
        return warehouse;
    }
}