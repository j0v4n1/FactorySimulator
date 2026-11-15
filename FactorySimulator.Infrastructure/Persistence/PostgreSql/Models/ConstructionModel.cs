namespace FactorySimulator.Infrastructure.Persistence.PostgreSql.Models;

public class ConstructionModel
{
    public Guid Id { get; set; }
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal ConstructionCost { get; set; }
    public string ImageKey { get; set; } = string.Empty;
    public AllowedEquipmentModel AllowedEquipment { get; set; } = new();
    public int MinEmployees { get; set; }
    public int MaxEmployees { get; set; }
    public List<string> AllowedRecipes { get; set; } = [];
}