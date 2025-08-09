
using HabbitFlow.WebApi.Config;
using HabbitFlow.WebApi.Config.Automapper;

namespace HabbitFlow.WebApi;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.ConfiguracaoIdentity();
        builder.Services.ConfigurarAutoMapper();
        builder.Services.ConfigurarInjecaoDependencia(builder.Configuration);
        ;

        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        var app = builder.Build();

        if (app.Environment.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();


        app.MapControllers();

        app.Run();
    }
}
