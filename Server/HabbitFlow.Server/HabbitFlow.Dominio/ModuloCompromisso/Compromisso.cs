using HabbitFlow.Dominio.Compartilhado;
using HabbitFlow.Dominio.ModuloCategoria;

namespace HabbitFlow.Dominio.ModuloCompromisso;

public class Compromisso : EntidadeBase<Compromisso>
{
    public Categoria? Categoria { get; set; } // base
   
    public Guid? categoriaId { get; set; } // base
}