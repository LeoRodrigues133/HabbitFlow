using HabbitFlow.Dominio.ModuloCategoria;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HabbitFlow.Infra.ModuloCategoria;

public class MapeadorCategoria : IEntityTypeConfiguration<Categoria>
{
    public void Configure(EntityTypeBuilder<Categoria> builder)
    {
        builder.ToTable("TBCATEGORIA");

        builder
            .Property(x => x.Id)
            .ValueGeneratedNever();

        builder
            .Property(x => x.Titulo)
            .IsRequired();

        builder
            .HasMany(x=>x.Compromissos)
            .WithOne()
            .IsRequired()
            .HasForeignKey(x=>x.categoriaId)
            .OnDelete(DeleteBehavior.NoAction);

        builder.HasOne(x => x.Usuario)
           .WithMany()
           .IsRequired()
           .HasForeignKey(x => x.usuarioId)
           .OnDelete(DeleteBehavior.NoAction);
    }
}