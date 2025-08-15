using HabbitFlow.Dominio.ModuloCategoria;
using HabbitFlow.Infra.Compartilhado;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace HabbitFlow.AppConsole;

internal class Program
{
    static void Main(string[] args)
    {

        var builder = new DbContextOptionsBuilder<HabbitFlowDbContext>();

        var config = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json")
            .Build();

        string connectionString = config.GetConnectionString("SqlServer")!;

        builder.UseSqlServer(connectionString);

        var db = new HabbitFlowDbContext(builder.Options);

        var teste = new Categoria("Teste");

        db.Add(teste);

        db.SaveChanges();

        Console.WriteLine($"Categoria:  {teste} cadastrada com sucesso!");

    }
}
