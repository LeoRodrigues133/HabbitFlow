﻿namespace HabbitFlow.WebApi.Config.Automapper;
public static class AutoMapperExtensions
{
    public static void ConfigurarAutoMapper(this IServiceCollection services)
    {
        services.AddAutoMapper(opt =>
        {
            opt.AddProfile<UsuarioProfile>();
            opt.AddProfile<CategoriaProfile>();
            opt.AddProfile<CompromissoProfile>();
            opt.AddProfile<TarefaProfile>();
            opt.AddProfile<SubtarefaProfile>();
            opt.AddProfile<ContatoProfile>();
        });

        services.AddTransient<UsuarioResolver>();
    }

}