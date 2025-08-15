using Microsoft.EntityFrameworkCore;
using HabbitFlow.Dominio.ModuloTarefa;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HabbitFlow.Infra.ModuloTarefa;

public class MapeadorTarefa : IEntityTypeConfiguration<Tarefa>
{
    public void Configure(EntityTypeBuilder<Tarefa> builder)
    {
        builder.ToTable("TBTAREFAS");

        builder.Property(x => x.Id)
            .IsRequired()
            .ValueGeneratedNever();

        builder.Property(x => x.Titulo)
            .HasColumnType("varchar(100)")
            .IsRequired();

        builder.HasMany(x => x.Subtarefas)
            .WithOne(x => x.Tarefa)
            .IsRequired(false)
            .OnDelete(DeleteBehavior.Cascade);
    }
}