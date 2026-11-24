using FactorySimulator.Core.Entities;

namespace FactorySimulator.Core.Systems;

public class ConstructionSystem(Corporation corporation)
{
    public bool TryBuildEnterprise(int equipmentCount, int employees,
        decimal constructionCost)
    {
        if (equipmentCount <= 0 || employees <= 0) return false;

        return corporation.TrySpend(constructionCost);
    }

    public Enterprise? BuildEnterprise(string name, string constructionCode, int equipmentCount, int employees,
        decimal constructionCost, Recipe recipe, string equipmentCode, Guid depositId)
    {
        var enterpriseCount = corporation.Enterprises.Count;

        var fullName = $"{name} №{enterpriseCount + 1}";

        var enterprise = new Enterprise(fullName,
            constructionCode,
            equipmentCount,
            employees,
            constructionCost, recipe, equipmentCode, depositId);

        corporation.AddEnterprise(enterprise);

        return enterprise;
    }
}