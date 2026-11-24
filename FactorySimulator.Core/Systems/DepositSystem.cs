using FactorySimulator.Core.Entities;
using FactorySimulator.Core.Enum;

namespace FactorySimulator.Core.Systems;

public class DepositSystem(Corporation corporation)
{
    public bool TryRentDeposit(decimal rentPrice)
    {
        return corporation.TrySpend(rentPrice);
    }

    public Deposit? RentDeposit(Guid id, string name, string description, Guid resourceId, long totalReserves,
        long remainingReserves, Distance distance, decimal rentPrice, decimal purchasePrice, bool isOwned,
        bool isLeased, Guid? enterpriseId)
    {
        if (!corporation.TrySpend(rentPrice)) return null;

        var deposit = new Deposit(id, name, description, resourceId, totalReserves, remainingReserves, distance,
            rentPrice, purchasePrice, isOwned, isLeased, enterpriseId);

        corporation.AddDeposit(deposit);

        return deposit;
    }
}