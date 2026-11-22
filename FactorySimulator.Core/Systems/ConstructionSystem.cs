using FactorySimulator.Core.Entities;

namespace FactorySimulator.Core.Systems;

public class ConstructionSystem(Corporation corporation)
{
    public Enterprise? TryBuildEnterprise(string name, string constructionCode, int equipmentCount, int employees,
        decimal constructionCost, string recipe, string equipmentCode)
    {
        if (equipmentCount <= 0 || employees <= 0) return null;

        if (!corporation.TrySpend(constructionCost)) return null;

        var enterpriseCount = corporation.Enterprises.Count;

        var fullName = $"{name} №{enterpriseCount + 1}";

        var enterprise = new Enterprise(fullName,
            constructionCode,
            equipmentCount,
            employees,
            constructionCost, recipe, equipmentCode);

        corporation.AddEnterprise(enterprise);

        return enterprise;
    }
}