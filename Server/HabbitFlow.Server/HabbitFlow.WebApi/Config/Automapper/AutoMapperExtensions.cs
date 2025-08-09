namespace HabbitFlow.WebApi.Config.Automapper;
public static class AutoMapperExtensions
{
    public static void ConfigurarAutoMapper(this IServiceCollection services)
    {
        services.AddAutoMapper(opt =>
        {
            opt.AddProfile<UsuarioProfile>();
            opt.AddProfile<CategoriaProfile>();
        });

        services.AddTransient<UsuarioResolver>();
    }

}