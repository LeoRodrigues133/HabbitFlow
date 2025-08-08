using FluentResults;
using HabbitFlow.Aplicacao.Compartilhado;
using HabbitFlow.Dominio.Compartilhado;
using HabbitFlow.Dominio.ModuloCategoria;
using Serilog;

namespace HabbitFlow.Aplicacao.ModuloCategoria;

public class ServicoCategoria : ServicoBase<Categoria, CategoriaValidation>
{
    IRepositorioCategoria _repositorioCategoria;
    IPersistContext _persistContext;

    public ServicoCategoria(
        IRepositorioCategoria repositorioCategoria,
        IPersistContext persistContext)
    {
        _repositorioCategoria = repositorioCategoria;
        _persistContext = persistContext;
    }

    public Result<Categoria> Cadastrar(Categoria categoria)
    {
        Log.Logger.Debug($"Tentando cadastrar categoria {categoria}");

        Result result = Validar(categoria);

        if (result.IsFailed)
            return Result.Fail(result.Errors);

        try
        {
            _repositorioCategoria.Cadastrar(categoria);

            _persistContext.SaveContextChanges();

            Log.Logger.Information($"Categoria {categoria} cadastrado com sucesso!");

            return Result.Ok(categoria);
        }
        catch (Exception ex)
        {
            _persistContext.UndoContextChanges();

            string error = "Falha ao tentar cadastrar categoria no sistema";

            Log.Logger.Error(ex, error + $"{categoria}");

            return Result.Fail(error);
        }
    }

    public Result<Categoria> Editar(Categoria categoria)
    {
        Log.Logger.Debug($"Tentando editar categoria {categoria}");

        var result = Validar(categoria);

        if (result.IsFailed)
            return Result.Fail(result.Errors);

        try
        {
            _repositorioCategoria.Editar(categoria);

            _persistContext.SaveContextChanges();

            Log.Logger.Information($"Categoria {categoria} editada com sucesso!");
        }
        catch (Exception ex)
        {
            _persistContext.UndoContextChanges();

            string error = "Falha ao tentar editar categoria no sistema.";

            Log.Logger.Error(ex, error + $"{categoria}");

            return Result.Fail(error);
        }

        return Result.Ok(categoria);
    }

    public Result Excluir(Categoria categoria)
    {
        Log.Logger.Debug($"Tentando excluir a categoria {categoria}");

        try
        {
            _repositorioCategoria.Excluir(categoria);

            _persistContext.SaveContextChanges();

            Log.Logger.Information($"Categoria {categoria} excluida com sucesso!");

            return Result.Ok();

        }
        catch (Exception ex)
        {
            _persistContext.UndoContextChanges();

            string error = "Falha ao tentar excluir a categoria do sistema.";

            Log.Logger.Error(ex, error + $"{categoria}");

            return Result.Fail(error);
        }
    }

    public Result<Categoria> SelecionaPorId(Guid id)
    {
        Log.Logger.Debug($"Tentando selecionar categoria com id: [{id}]");

        try
        {
            var categoria = _repositorioCategoria.SelecionarPorId(id);

            if (categoria == null)
            {
                Log.Logger.Warning($"Categoria id: [{id}] n�o encontrada.");

                return Result.Fail("Categoria n�o encontrado");
            }

            Log.Logger.Information($"Categoria id [{id}] selecionada com sucesso!");

            return Result.Ok(categoria);

        }
        catch (Exception ex)
        {
            string error = "Falha ao tentar selecionar categoria no sistema.";

            Log.Logger.Error(ex, error + $"{id}");

            return Result.Fail(error);
        }
    }

    public Result<List<Categoria>> SelecionarTodos()
    {
        Log.Logger.Debug("Tentando selecionar categorias");

        try
        {
            var categoria = _repositorioCategoria.SelecionarTodos();

            Log.Logger.Information($"Categorias selecionadas com sucesso");

            return Result.Ok(categoria);
        }
        catch (Exception ex)
        {
            string error = "Falha ao tentar selecionar categorias no sistema.";

            Log.Logger.Error(ex, error);

            return Result.Fail(error);
        }
    }

}