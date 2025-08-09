using HabbitFlow.Aplicacao.ModuloCategoria;
using HabbitFlow.Dominio.Compartilhado;
using HabbitFlow.Dominio.ModuloAuth;
using HabbitFlow.Dominio.ModuloCategoria;
using HabbitFlow.Infra.Compartilhado;
using HabbitFlow.Infra.ModuloCategoria;
using Microsoft.EntityFrameworkCore;

namespace HabbitFlow.WebApi.Config;
public static class DependencyInjections
{
    public static void ConfigurarInjecaoDependencia(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("SqlServer");

        services.AddDbContext<IPersistContext, HabbitFlowDbContext>(optionsBuilder =>
        {
            optionsBuilder.UseSqlServer(connectionString);
        });

        services.AddTransient<ITenantProvider, TenantProviderApi>();

        services.AddTransient<IRepositorioCategoria, RepositorioCategoria>();
        services.AddTransient<ServicoCategoria>();
    }
}