using HabbitFlow.Aplicacao.ModuloCategoria;
using HabbitFlow.Aplicacao.ModuloCompromisso;
using HabbitFlow.Dominio.Compartilhado;
using HabbitFlow.Dominio.ModuloAuth;
using HabbitFlow.Dominio.ModuloCategoria;
using HabbitFlow.Dominio.ModuloCompromisso;
using HabbitFlow.Infra.Compartilhado;
using HabbitFlow.Infra.ModuloCategoria;
using HabbitFlow.Infra.ModuloCompromisso;
using Microsoft.EntityFrameworkCore;

namespace HabbitFlow.WebApi.Config;
public static class DependencyInjections
{
    public static void ConfigurarInjecaoDependencia(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration["SQL_SERVER_CONNECTION_STRING"];

        services.AddDbContext<IPersistContext, HabbitFlowDbContext>(optionsBuilder =>
        {
            optionsBuilder.UseSqlServer(connectionString);
        });

        services.AddTransient<ITenantProvider, TenantProviderApi>();

        services.AddTransient<IRepositorioCategoria, RepositorioCategoria>();
        services.AddTransient<ServicoCategoria>();

        services.AddTransient<IRepositorioCompromisso, RepositorioCompromisso>();
        services.AddTransient<ServicoCompromisso>();
    }
}