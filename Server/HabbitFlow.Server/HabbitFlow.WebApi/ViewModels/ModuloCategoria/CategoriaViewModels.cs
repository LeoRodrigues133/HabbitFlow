namespace HabbitFlow.WebApi.ViewModels.ModuloCategoria;
public class CategoriaViewModels
{
    public class CadastrarCategoriaViewModel
    {
        public string Titulo { get; set; }
    }

    public class EditarCategoriaViewModel
    {
        public string Titulo { get; set; }
    }

    public class ExcluirCategoriaViewModel
    {
        public Guid Id { get; set; }
        public string Titulo { get; set; }
    }

    public class ListarCategoriaViewModel
    {
        public Guid Id { get; set; }
        public string Titulo { get; set; }

    }


}