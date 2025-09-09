using HabbitFlow.Dominio.ModuloCompromisso;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HabbitFlow.Infra.ModuloCompromisso;

public class MapeadorCompromisso : IEntityTypeConfiguration<Compromisso>
{
    public void Configure(EntityTypeBuilder<Compromisso> builder)
    {
        builder.ToTable("TBCOMPROMISSO");

        builder
            .Property(x => x.Id)
            .IsRequired()
            .ValueGeneratedNever();

        builder
            .Property(x => x.Titulo)
            .IsRequired()
            .HasMaxLength(60);

        builder
            .Property(x => x.Data)
            .IsRequired();

        builder
            .Property(x => x.TipoEnum)
            .IsRequired();

        builder
            .Property(x => x.Hora)
            .HasColumnType("time")
            .IsRequired(false);

        builder
            .Property(x => x.Local)
            .IsRequired(false)
            .HasMaxLength(150);

        builder
            .Property(x => x.Link)
            .IsRequired(false)
            .HasMaxLength(200);

        builder
            .Property(x => x.Conteudo)
            .HasMaxLength(300)
            .IsRequired(false);

        builder
            .HasOne(x => x.Categoria)
            .WithMany(x => x.Compromissos)
            .HasForeignKey(x => x.CategoriaId)
            .IsRequired(false)
            .OnDelete(DeleteBehavior.NoAction);

        builder
            .HasOne(x => x.Contato)
            .WithMany()
            .HasForeignKey(x => x.ContatoId)
            .IsRequired(false)
            .OnDelete(DeleteBehavior.NoAction);
    }
}
