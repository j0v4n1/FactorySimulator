using System.Text.Encodings.Web;
using System.Text.Json;

namespace FactorySimulator.Server.debug;

public static class DebugHelper
{
    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        WriteIndented = true,
        Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping
    };


    public static void PrintJson(object? data, string? title = null)
    {
        if (!string.IsNullOrEmpty(title)) Console.WriteLine($"=== {title} ===");

        var jsonString = JsonSerializer.Serialize(data, JsonOptions);
        Console.WriteLine(jsonString);
    }
}