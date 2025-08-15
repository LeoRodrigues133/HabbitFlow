using HabbitFlow.Dominio.ModuloContato;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HabbitFlow.Infra.ModuloContato;

public class MapeadorContato : IEntityTypeConfiguration<Contato>
{
    public void Configure(EntityTypeBuilder<Contato> builder)
    {
        builder.ToTable("TBContato");

        builder.HasKey(c => c.Id);

        builder.Property(c => c.Nome)
               .HasColumnType("varchar(200)")
               .IsRequired();

        builder.Property(c => c.Telefone)
               .HasColumnType("varchar(20)")
               .IsRequired();

        builder.Property(c => c.Email)
               .HasColumnType("varchar(150)")
               .IsRequired(false);

        builder.Property(c => c.Empresa)
               .HasColumnType("varchar(150)")
               .IsRequired();

        builder.Property(c => c.Cargo)
               .HasColumnType("varchar(100)")
               .IsRequired();

        builder.HasMany(c => c.Compromissos)
               .WithOne(c => c.Contato)
               .HasForeignKey("ContatoId")
               .OnDelete(DeleteBehavior.NoAction);
    }
}