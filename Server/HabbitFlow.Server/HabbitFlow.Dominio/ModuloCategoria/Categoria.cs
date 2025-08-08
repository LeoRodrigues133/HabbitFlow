using HabbitFlow.Dominio.Compartilhado;
using HabbitFlow.Dominio.ModuloCompromisso;
using HabbitFlow.Dominio.ModuloTarefa;

namespace HabbitFlow.Dominio.ModuloCategoria;

public class Categoria : EntidadeBase<Categoria>
{
    public string Titulo { get; set; }
    public List<Compromisso> Compromissos { get; set; }

    public Categoria()
    {
        Compromissos = new List<Compromisso>();
    }

    public Categoria(string titulo)
    {
        Titulo = titulo;
    }

    public override string ToString()
    {
        return $"Titulo: {Titulo}";
    }
}
