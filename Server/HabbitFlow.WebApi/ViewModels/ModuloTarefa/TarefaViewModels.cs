
using HabbitFlow.Dominio.ModuloTarefa;

namespace HabbitFlow.WebApi.ViewModels.ModuloTarefa;
public class TarefaViewModels
{
    public class ListarTarefaViewModel
    {
        public Guid Id { get; set; }
        public string Titulo { get; set; }
        public Guid? CategoriaId { get; set; }

        public int qtSubtarefas { get; set; }
    }
    public class CadastrarTarefaViewModel
    {
        public string Titulo { get; set; }
        public Guid? CategoriaId { get; set; }
    }
    public class EditarTarefaViewModel
    {
        public string Titulo { get; set; }
        public Guid? CategoriaId { get; set; }
    }

    public class ExcluirTarefaViewModel
    {
        public string Titulo { get; set; }
    }

}