namespace FactorySimulator.Core.Entities;

public class Recipe
{
    public Recipe(Guid id, string code, string name, List<ResourceAmount> inputs, Resource outputResource)
    {
        Id = id;
        Code = code;
        Name = name;
        Inputs = inputs;
        OutputResource = outputResource;
    }

    public Guid Id { get; set; }
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public List<ResourceAmount> Inputs { get; set; } = [];
    public Resource OutputResource { get; set; }
}