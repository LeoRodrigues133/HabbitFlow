using HabbitFlow.Aplicacao.ModuloCategoria;
using HabbitFlow.Dominio.ModuloAuth;
using HabbitFlow.Infra.Compartilhado;
using Microsoft.AspNetCore.Identity;

namespace HabbitFlow.WebApi.Config;
public static class IdentityConfigurationExtension
{
    public static void ConfiguracaoIdentity(this IServiceCollection services)
    {
        services.AddTransient<ServicoAuth>();

        services.AddIdentity<Usuario, IdentityRole<Guid>>(opt =>
        {
            opt.User.RequireUniqueEmail = true;
        })
            .AddEntityFrameworkStores<HabbitFlowDbContext>()
            .AddDefaultTokenProviders();

    }
}