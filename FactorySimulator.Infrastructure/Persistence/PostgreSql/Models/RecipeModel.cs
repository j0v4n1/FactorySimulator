namespace FactorySimulator.Infrastructure.Persistence.PostgreSql.Models;

public class RecipeModel
{
    public Guid Id { get; set; }
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public List<RecipeResourceModel> Inputs { get; set; } = [];
    public string OutputResourceCode { get; set; } = string.Empty;
}