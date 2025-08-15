using Microsoft.EntityFrameworkCore;
using Serilog;

namespace HabbitFlow.Infra.Compartilhado;

public static class DbContextMigrator
{
    public static bool AtualizarBancoDados(DbContext db)
    {
        var qtdMigracoesPendentes = db.Database.GetPendingMigrations().Count();

        if (qtdMigracoesPendentes == 0)
        {
            Log.Information("Nenhuma migração pendente, continuando...");

            return false;
        }

        Log.Information($"Aplicando {qtdMigracoesPendentes} migrações pendentes, isso pode demorar alguns segundos...");

        db.Database.Migrate();

        Log.Information("Migrações completas...");

        return true;
    }
}