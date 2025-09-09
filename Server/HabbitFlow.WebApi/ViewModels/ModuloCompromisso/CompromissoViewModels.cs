using HabbitFlow.Dominio.ModuloCompromisso;

namespace HabbitFlow.WebApi.ViewModels.ModuloCompromisso;
public abstract class CompromissoViewModels
{
    public class ListarCompromissoViewModel
    {
        public Guid Id { get; set; }
        public string Titulo { get; set; }
        public string? Conteudo { get; set; }
        public string Local { get; set; }
        public DateTime Data { get; set; }
        public TimeSpan? Hora { get; set; }
        public Guid? ContatoId { get; set; }
        public Guid? CategoriaId { get; set; }
        public TipoCompromissoEnum Tipo { get; set; }
    }

    public class CadastrarCompromissoViewModel
    {
        public string Titulo { get; set; }
        public string? Conteudo { get; set; }
        public string Local { get; set; }
        public DateTime Data { get; set; }
        public TimeSpan? Hora { get; set; }
        public TipoCompromissoEnum Tipo { get; set; }
        public Guid? ContatoId { get; set; }
        public Guid? CategoriaId { get; set; }
    }

    public class EditarCompromissoViewModel
    {
        public string Titulo { get; set; }
        public string? Conteudo { get; set; }
        public string Local { get; set; }
        public DateTime Data { get; set; }
        public TimeSpan? Hora { get; set; }
        public TipoCompromissoEnum Tipo { get; set; }
        public Guid? ContatoId { get; set; }
        public Guid? CategoriaId { get; set; }
    }

    public class ExcluirCompromissoViewModel
    {
        public Guid Id { get; set; }
        public string Titulo { get; set; }
        public string? Conteudo { get; set; }
        public string Local { get; set; }
        public DateTime Data { get; set; }
        public TimeSpan? Hora { get; set; }
        public TipoCompromissoEnum Tipo { get; set; }
        public Guid? ContatoId { get; set; }
        public Guid? CategoriaId { get; set; }
    }
}