using Serilog;
using FluentResults;
using HabbitFlow.Dominio.Compartilhado;
using HabbitFlow.Dominio.ModuloContato;
using HabbitFlow.Aplicacao.Compartilhado;

namespace HabbitFlow.Aplicacao.ModuloContato;

public class ServicoContato: ServicoBase<Contato, ContatoValidation>
{
    IRepositorioContato _repositorioContato;
    IPersistContext _persistContext;

    public ServicoContato(
        IRepositorioContato repositorioContato,
        IPersistContext persistContext)
    {
        _repositorioContato = repositorioContato;
        _persistContext = persistContext;
    }

    public Result<Contato> Cadastrar(Contato contato)
    {
        Log.Logger.Debug($"Tentando cadastrar contato {contato}");

        Result result = Validar(contato);

        if (result.IsFailed)
            return Result.Fail(result.Errors);

        try
        {
            _repositorioContato.Cadastrar(contato);

            _persistContext.SaveContextChanges();

            Log.Logger.Information($"Contato {contato} cadastrado com sucesso!");

            return Result.Ok(contato);
        }
        catch (Exception ex)
        {
            _persistContext.UndoContextChanges();

            string error = "Falha ao tentar cadastrar contato no sistema";

            Log.Logger.Error(ex, error + $"{contato}");

            return Result.Fail(error);
        }
    }

    public Result<Contato> Editar(Contato contato)
    {
        Log.Logger.Debug($"Tentando editar contato {contato}");

        var result = Validar(contato);

        if (result.IsFailed)
            return Result.Fail(result.Errors);

        try
        {
            _repositorioContato.Editar(contato);

            _persistContext.SaveContextChanges();

            Log.Logger.Information($"Contato {contato} editada com sucesso!");
        }
        catch (Exception ex)
        {
            _persistContext.UndoContextChanges();

            string error = "Falha ao tentar editar contato no sistema.";

            Log.Logger.Error(ex, error + $"{contato}");

            return Result.Fail(error);
        }

        return Result.Ok(contato);
    }

    public Result Excluir(Contato contato)
    {
        Log.Logger.Debug($"Tentando excluir a contato {contato}");

        try
        {
            _repositorioContato.Excluir(contato);

            _persistContext.SaveContextChanges();

            Log.Logger.Information($"Contato {contato} excluida com sucesso!");

            return Result.Ok();

        }
        catch (Exception ex)
        {
            _persistContext.UndoContextChanges();

            string error = "Falha ao tentar excluir a contato do sistema.";

            Log.Logger.Error(ex, error + $"{contato}");

            return Result.Fail(error);
        }
    }

    public Result<Contato> SelecionaPorId(Guid id)
    {
        Log.Logger.Debug($"Tentando selecionar contato com id: [{id}]");

        try
        {
            var contato = _repositorioContato.SelecionarPorId(id);

            if (contato == null)
            {
                Log.Logger.Warning($"Contato id: [{id}] não encontrada.");

                return Result.Fail("Contato não encontrado");
            }

            Log.Logger.Information($"Contato id [{id}] selecionada com sucesso!");

            return Result.Ok(contato);

        }
        catch (Exception ex)
        {
            string error = "Falha ao tentar selecionar contato no sistema.";

            Log.Logger.Error(ex, error + $"{id}");

            return Result.Fail(error);
        }
    }

    public Result<List<Contato>> SelecionarTodos()
    {
        Log.Logger.Debug("Tentando selecionar contato");

        try
        {
            var contato = _repositorioContato.SelecionarTodos();

            Log.Logger.Information($"Contato selecionadas com sucesso");

            return Result.Ok(contato);
        }
        catch (Exception ex)
        {
            string error = "Falha ao tentar selecionar Contato no sistema.";

            Log.Logger.Error(ex, error);

            return Result.Fail(error);
        }
    }

}