using FactorySimulator.Core.Entities;

namespace FactorySimulator.Core.Systems;

public class WarehouseSystem(Corporation corporation)
{
    public Warehouse? TryBuildWarehouse(string name, string warehouseTypeCode, Guid? enterpriseId, int capacity,
        string distanceFromEnterprise,
        decimal rentPrice, decimal warehousePrice
    )
    {
        switch (warehouseTypeCode)
        {
            case "rent" when !corporation.TrySpend(rentPrice):
            case "owned" when !corporation.TrySpend(warehousePrice):
                return null;
        }

        var fullName = $"{name} №{corporation.Warehouses.Count + 1}";

        var warehouse = new Warehouse(fullName, warehouseTypeCode, enterpriseId, capacity, distanceFromEnterprise,
            rentPrice, warehousePrice);
        return warehouse;
    }
}