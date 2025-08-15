using Microsoft.AspNetCore.Mvc;

namespace HabbitFlow.WebApi.Config;
public static class ValidationConfigExtension
{
    public static void ConfigurarValidacao(this IServiceCollection services)
    {
        services.Configure<ApiBehaviorOptions>(config =>
        {
            config.SuppressModelStateInvalidFilter = true;
        });
    }
}