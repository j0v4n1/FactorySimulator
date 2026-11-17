using FactorySimulator.Infrastructure.Persistence.PostgreSql.Models;

namespace FactorySimulator.Server.Contracts;

public class BuildEnterpriseRequest
{
    public string ConstructionCode { get; set; } = string.Empty;
    public int EquipmentCount { get; set; }
    public int Employees { get; set; }
    public RecipeModel Recipe { get; set; }
    public EquipmentModel equipment { get; set; }
}