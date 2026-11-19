namespace FactorySimulator.Core.Entities;

public class Recipe
{
    public Guid Id { get; set; }
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public List<ResourceAmount> Inputs { get; set; } = [];
    public Resource OutputResource { get; set; }
}