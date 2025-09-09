using HabbitFlow.Dominio.ModuloCompromisso;
using HabbitFlow.Dominio.ModuloTarefa;

namespace HabbitFlow.WebApi.ViewModels.ModuloContato;
public class ContatoViewModels
{
    public class ListarContatoViewModel
    {
        public Guid Id { get; set; }
        public string Nome { get; set; }
        public string Telefone { get; set; }
        public string? Email { get; set; }
        public string Empresa { get; set; }
        public string Cargo { get; set; }
    }
    public class CadastrarContatoViewModel
    {
        public string Nome { get; set; }
        public string Telefone { get; set; }
        public string? Email { get; set; }
        public string Empresa { get; set; }
        public string Cargo { get; set; }
    }
    public class EditarContatoViewModel
    {
        public string Nome { get; set; }
        public string Telefone { get; set; }
        public string? Email { get; set; }
        public string Empresa { get; set; }
        public string Cargo { get; set; }
    }
    public class ExcluirContatoViewModel
    {
        public string Nome { get; set; }
        public string Telefone { get; set; }
        public string? Email { get; set; }
        public string Empresa { get; set; }
        public string Cargo { get; set; }

    }

}