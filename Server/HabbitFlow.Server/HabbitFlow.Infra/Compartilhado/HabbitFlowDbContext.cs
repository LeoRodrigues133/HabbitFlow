using HabbitFlow.Dominio.Compartilhado;
using HabbitFlow.Dominio.ModuloAuth;
using HabbitFlow.Dominio.ModuloCategoria;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Serilog;
using System.Reflection;
using System.Reflection.Emit;

namespace HabbitFlow.Infra.Compartilhado;

public class HabbitFlowDbContext : IdentityDbContext<Usuario, IdentityRole<Guid>, Guid>, IPersistContext
{
    private Guid _usuarioId;

    public HabbitFlowDbContext(DbContextOptions options, ITenantProvider tenantProvider = null) : base(options)
    {
        if (tenantProvider != null)
            _usuarioId = tenantProvider.UsuarioId;
    }

    public HabbitFlowDbContext()
    { }

    public async Task<bool> SaveContextAsync()
    {

        var registrosAfetados = await SaveChangesAsync();

        return registrosAfetados > 0;
    }

    public void SaveContextChanges()
    {
        SaveChanges();
    }

    public void UndoContextChanges()
    {
        var registrosAfetados = ChangeTracker.Entries()
            .Where(x => x.State != EntityState.Unchanged)
            .ToList();

        foreach (var registro in registrosAfetados)
        {
            switch (registro.State)
            {
                case EntityState.Added:
                    registro.State = EntityState.Detached;
                    break;

                case EntityState.Deleted:
                    registro.State = EntityState.Unchanged;
                    break;

                case EntityState.Modified:
                    registro.State = EntityState.Unchanged;
                    registro.CurrentValues.SetValues(registro.CurrentValues);
                    break;

                default:
                    break;
            }
        }
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {

        ILoggerFactory loggerFactory = LoggerFactory.Create((x) =>
        {
            x.AddSerilog(Log.Logger);
        });

        optionsBuilder.UseLoggerFactory(loggerFactory);

        optionsBuilder.EnableSensitiveDataLogging();
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        Type tipo = typeof(HabbitFlowDbContext);

        Assembly dllConfigurationOrm = tipo.Assembly;

        builder.ApplyConfigurationsFromAssembly(dllConfigurationOrm);

        //builder.Entity<Categoria>().HasQueryFilter(c => c.UsuarioId == usuarioId);
        // Para os testes, é necessário não utilizar HasQueryFilter por enquanto.

        builder.Entity<Categoria>();

        base.OnModelCreating(builder);
    }
}
