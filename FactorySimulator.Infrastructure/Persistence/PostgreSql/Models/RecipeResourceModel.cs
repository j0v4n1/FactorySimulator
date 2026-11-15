namespace FactorySimulator.Infrastructure.Persistence.PostgreSql.Models;

public class RecipeResourceModel
{
    public string ResourceCode { get; set; } = string.Empty;
    public int Amount { get; set; }
}