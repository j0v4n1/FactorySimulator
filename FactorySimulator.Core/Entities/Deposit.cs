using FactorySimulator.Core.Enum;

namespace FactorySimulator.Core.Entities;

public class Deposit
{
    public Deposit(Guid id, string name, string description, Guid resourceId, long totalReserves,
        long remainingReserves, Distance distance, decimal rentPrice, decimal purchasePrice, bool isOwned,
        bool isLeased, Guid? enterpriseId)
    {
        Id = id;
        Name = name;
        Description = description;
        ResourceId = resourceId;
        TotalReserves = totalReserves;
        RemainingReserves = remainingReserves;
        Distance = distance;
        RentPrice = rentPrice;
        PurchasePrice = purchasePrice;
        IsOwned = isOwned;
        IsLeased = isLeased;
        EnterpriseId = enterpriseId;
    }

    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public Guid ResourceId { get; set; }
    public long TotalReserves { get; set; }
    public long RemainingReserves { get; set; }
    public Distance Distance { get; set; }
    public decimal RentPrice { get; set; }
    public decimal PurchasePrice { get; set; }
    public bool IsOwned { get; set; }
    public bool IsLeased { get; set; }
    public Guid? EnterpriseId { get; set; }
}