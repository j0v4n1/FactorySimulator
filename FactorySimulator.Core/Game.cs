using FactorySimulator.Core.Entities;

namespace FactorySimulator.Core;

public class Game
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

    public Corporation Corporation { get; } = new();

    public Enterprise? TryBuildEnterprise(string name, string constructionCode, int equipmentCount, int employees,
        decimal constructionCost, string recipe)
    {
        if (equipmentCount <= 0 || employees <= 0) return null;

        if (!Corporation.TrySpend(constructionCost)) return null;

        var randomIndex = _random.Next(_enterpriseNames.Length);

        var fullName = $"{name} {_enterpriseNames[randomIndex]}";

        var enterprise = new Enterprise(fullName,
            constructionCode,
            equipmentCount,
            employees,
            constructionCost, recipe);

        Corporation.AddEnterprise(enterprise);

        return enterprise;
    }
}