using HabbitFlow.Dominio.Compartilhado;
using HabbitFlow.Infra.Compartilhado;
using HabbitFlow.WebApi.Config;
using HabbitFlow.WebApi.Config.Automapper;

namespace HabbitFlow.WebApi;

public class Program
{
    private const string NomeCors = "Desenvolvimento";
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.ConfigurarValidacao();
        builder.Services.ConfigurarSerilog(builder.Logging);
        builder.Services.ConfiguracaoIdentity();
        builder.Services.ConfigurarAutoMapper();
        builder.Services.ConfigurarInjecaoDependencia(builder.Configuration);
        builder.Services.ConfigurarJwt();
        builder.Services.ConfigurarSwagger();
        builder.Services.ConfigurarCors(NomeCors);

        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        var app = builder.Build();

        app.UseDeveloperExceptionPage();
        app.UseSwagger();
        app.UseSwaggerUI();

        using var scope = app.Services.CreateScope();

        var ctx = scope.ServiceProvider.GetRequiredService<IPersistContext>();

        if (ctx is HabbitFlowDbContext HabbitFlowContext)
        {
            DbContextMigrator.AtualizarBancoDados(HabbitFlowContext);
        }

        app.UseHttpsRedirection();
        
        app.UseCors(NomeCors);

        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}
