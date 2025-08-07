using HabbitFlow.Dominio.Compartilhado;
using HabbitFlow.Dominio.ModuloAuth;
using HabbitFlow.Dominio.ModuloCategoria;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace HabbitFlow.Infra.Compartilhado;

public class HabbitFlowDbContext : IdentityDbContext<Usuario, IdentityRole<Guid>, Guid>, IPersistContext
{
    readonly ITenantProvider _tenantProvider;
    private Guid? UsuarioId { get; }

    public HabbitFlowDbContext(DbContextOptions options, ITenantProvider tenantProvider = null)
    {
        if (tenantProvider != null)
            UsuarioId = tenantProvider.UsuarioId;
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

    protected override void OnModelCreating(ModelBuilder builder)
    {
        Type tipo = typeof(HabbitFlowDbContext);

        Assembly dllConfigurationOrm = tipo.Assembly;

        builder.ApplyConfigurationsFromAssembly(dllConfigurationOrm);

        builder.Entity<Categoria>().HasQueryFilter(x => x.usuarioId == UsuarioId);
    }
}
