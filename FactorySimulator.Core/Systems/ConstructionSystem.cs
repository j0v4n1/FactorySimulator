using FactorySimulator.Core.Entities;

namespace FactorySimulator.Core.Systems;

public class ConstructionSystem(Corporation corporation)
{
    private readonly string[] _enterpriseNames =
    [
        "Союз",
        "Гранит",
        "Монолит",
        "Вектор",
        "Рубеж",
        "Протон",
        "Малахит",
        "Полюс",
        "Авангард",
        "Сплав"
    ];

    private readonly Random _random = new();

    public Enterprise? TryBuildEnterprise(string name, string constructionCode, int equipmentCount, int employees,
        decimal constructionCost, string recipe, string equipmentCode)
    {
        if (equipmentCount <= 0 || employees <= 0) return null;

        if (!corporation.TrySpend(constructionCost)) return null;

        var randomIndex = _random.Next(_enterpriseNames.Length);

        var fullName = $"{name} {_enterpriseNames[randomIndex]}";

        var enterprise = new Enterprise(fullName,
            constructionCode,
            equipmentCount,
            employees,
            constructionCost, recipe, equipmentCode);

        corporation.AddEnterprise(enterprise);

        return enterprise;
    }
}