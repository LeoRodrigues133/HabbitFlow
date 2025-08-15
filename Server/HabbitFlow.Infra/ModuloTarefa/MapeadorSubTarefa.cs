using HabbitFlow.Dominio.ModuloSubtarefa;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HabbitFlow.Infra.ModuloTarefa;

public class MapeadorSubTarefa : IEntityTypeConfiguration<SubTarefa>
{
    public void Configure(EntityTypeBuilder<SubTarefa> builder)
    {
        builder.ToTable("TBSUBTAREFA");

        builder.Property(x=>x.Id)
            .IsRequired()
            .ValueGeneratedNever();

        builder.Property(x => x.Titulo)
            .HasColumnType("varchar(100)")
            .IsRequired();

        builder.Property(x => x.Finalizada)
            .HasColumnType("bit")
            .IsRequired();

        builder.HasOne(x=>x.Tarefa)
            .WithMany()
            .HasForeignKey(x=>x.TarefaId)
            .IsRequired(false);
    }
}