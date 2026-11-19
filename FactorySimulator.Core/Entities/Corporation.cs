namespace FactorySimulator.Core.Entities;

public class Corporation
{
    private readonly List<Enterprise> _enterprises = [];
    private readonly List<Warehouse> _warehouses = [];
    public IReadOnlyList<Warehouse> Warehouses => _warehouses;
    public decimal Balance { get; private set; } = 60_000_000m;
    public IReadOnlyCollection<Enterprise> Enterprises => _enterprises.AsReadOnly();

    public bool TrySpend(decimal amount)
    {
        if (amount <= 0 || Balance < amount)
            return false;

        Balance -= amount;
        return true;
    }

    public void AddEnterprise(Enterprise enterprise)
    {
        ArgumentNullException.ThrowIfNull(enterprise);
        _enterprises.Add(enterprise);
    }

    public void AddWarehouse(Warehouse warehouse)
    {
        ArgumentNullException.ThrowIfNull(warehouse);
        _warehouses.Add(warehouse);
    }

    public void LoadEnterprisesFromDb(IEnumerable<Enterprise> loadedEnterprises)
    {
        _enterprises.Clear();
        _enterprises.AddRange(loadedEnterprises);
    }
}