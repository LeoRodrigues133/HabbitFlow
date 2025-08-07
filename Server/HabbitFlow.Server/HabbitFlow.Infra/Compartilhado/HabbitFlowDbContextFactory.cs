using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace HabbitFlow.Infra.Compartilhado;

public class HabbitFlowDbContextFactory : IDesignTimeDbContextFactory<HabbitFlowDbContext>
{
    public HabbitFlowDbContext CreateDbContext(string[] args)
    {
        var builder = new DbContextOptionsBuilder<HabbitFlowDbContext>();

        var config = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json")
            .Build();

        string connectionString = config.GetConnectionString("Default")!;

        builder.UseSqlServer(connectionString);

        return new HabbitFlowDbContext(builder.Options);

    }
}