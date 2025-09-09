namespace HabbitFlow.WebApi.ViewModels.ModuloTarefa;
public class SubtarefasViewModels
{
    public class ListarSubtarefaViewModel
    {
        public Guid Id { get; set; }
        public string Titulo { get; set; }
        public bool Finalizada { get; set; }
    }
    public class CadastrarSubtarefaViewModel
    {
        public string Titulo { get; set; }
        public Guid tarefaId { get; set; }
    }

    public class EditarSubtarefaViewModel
    {
        public string Titulo { get; set; }
        public Guid tarefaId { get; set; }

    }

    public class ExcluirSubtarefaViewModel
    {
        public string Titulo { get; set; }
        public Guid tarefaId { get; set; }
    }
}