using FluentResults;
using HabbitFlow.Aplicacao.Compartilhado;
using HabbitFlow.Dominio.Compartilhado;
using HabbitFlow.Dominio.ModuloCompromisso;
using Serilog;

namespace HabbitFlow.Aplicacao.ModuloCompromisso;

public class ServicoCompromisso : ServicoBase<Compromisso, CompromissoValidation>
{
    IRepositorioCompromisso _repositorioCompromisso;
    IPersistContext _persistContext;

    public ServicoCompromisso(
        IRepositorioCompromisso repositorioCompromisso,
        IPersistContext persistContext)
    {
        _repositorioCompromisso = repositorioCompromisso;
        _persistContext = persistContext;
    }

    public Result<Compromisso> Cadastrar(Compromisso compromisso)
    {
        Log.Logger.Debug($"Tentando cadastrar compromisso {compromisso}");

        Result result = Validar(compromisso);

        if (result.IsFailed)
            return Result.Fail(result.Errors);

        try
        {
            _repositorioCompromisso.Cadastrar(compromisso);

            _persistContext.SaveContextChanges();

            Log.Logger.Information($"Compromisso {compromisso} cadastrado com sucesso!");

            return Result.Ok(compromisso);
        }
        catch (Exception ex)
        {
            _persistContext.UndoContextChanges();

            string error = "Falha ao tentar cadastrar compromisso no sistema";

            Log.Logger.Error(ex, error + $"{compromisso}");

            return Result.Fail(error);
        }
    }

    public Result<Compromisso> Editar(Compromisso compromisso)
    {
        Log.Logger.Debug($"Tentando editar compromisso {compromisso}");

        var result = Validar(compromisso);

        if (result.IsFailed)
            return Result.Fail(result.Errors);

        try
        {
            _repositorioCompromisso.Editar(compromisso);

            _persistContext.SaveContextChanges();

            Log.Logger.Information($"Compromisso {compromisso} editada com sucesso!");
        }
        catch (Exception ex)
        {
            _persistContext.UndoContextChanges();

            string error = "Falha ao tentar editar compromisso no sistema.";

            Log.Logger.Error(ex, error + $"{compromisso}");

            return Result.Fail(error);
        }

        return Result.Ok(compromisso);
    }

    public Result Excluir(Compromisso compromisso)
    {
        Log.Logger.Debug($"Tentando excluir a compromisso {compromisso}");

        try
        {
            _repositorioCompromisso.Excluir(compromisso);

            _persistContext.SaveContextChanges();

            Log.Logger.Information($"Compromisso {compromisso} excluida com sucesso!");

            return Result.Ok();

        }
        catch (Exception ex)
        {
            _persistContext.UndoContextChanges();

            string error = "Falha ao tentar excluir a compromisso do sistema.";

            Log.Logger.Error(ex, error + $"{compromisso}");

            return Result.Fail(error);
        }
    }

    public Result<Compromisso> SelecionaPorId(Guid id)
    {
        Log.Logger.Debug($"Tentando selecionar compromisso com id: [{id}]");

        try
        {
            var compromisso = _repositorioCompromisso.SelecionarPorId(id);

            if (compromisso == null)
            {
                Log.Logger.Warning($"Compromisso id: [{id}] n�o encontrada.");

                return Result.Fail("Compromisso n�o encontrado");
            }

            Log.Logger.Information($"Compromisso id [{id}] selecionada com sucesso!");

            return Result.Ok(compromisso);

        }
        catch (Exception ex)
        {
            string error = "Falha ao tentar selecionar compromisso no sistema.";

            Log.Logger.Error(ex, error + $"{id}");

            return Result.Fail(error);
        }
    }

    public Result<List<Compromisso>> SelecionarTodos()
    {
        Log.Logger.Debug("Tentando selecionar compromisso");

        try
        {
            var compromisso = _repositorioCompromisso.SelecionarTodos();

            Log.Logger.Information($"Compromisso selecionadas com sucesso");

            return Result.Ok(compromisso);
        }
        catch (Exception ex)
        {
            string error = "Falha ao tentar selecionar Compromisso no sistema.";

            Log.Logger.Error(ex, error);

            return Result.Fail(error);
        }
    }

}