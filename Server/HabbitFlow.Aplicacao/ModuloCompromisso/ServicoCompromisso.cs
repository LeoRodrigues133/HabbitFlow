using Serilog;
using FluentResults;
using HabbitFlow.Dominio.Compartilhado;
using HabbitFlow.Aplicacao.Compartilhado;
using HabbitFlow.Dominio.ModuloCompromisso;

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

    public async Task<Result<Compromisso>> SelecionarPorIdAsync(Guid id)
    {
        Log.Logger.Debug($"Tentando selecionar compromisso com id: [{id}]");

        try
        {
            var compromisso = await _repositorioCompromisso.SelecionarPorIdAsync(id);

            if (compromisso is null)
            {
                Log.Logger.Warning($"Compromisso id: [{id}] não encontrada.");

                return Result.Fail("Compromisso não encontrado");
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

    public async Task<Result<List<Compromisso>>> SelecionarTodosAsync()
    {
        Log.Logger.Debug("Tentando selecionar compromisso");

        try
        {
            var compromisso = await _repositorioCompromisso.SelecionarTodosAsync();

            Log.Logger.Information($"Compromisso selecionadas com sucesso");

            return Result.Ok(compromisso);
        }
        catch (Exception ex)
        {
            string error = "Falha ao tentar selecionar compromissos no sistema.";

            Log.Logger.Error(ex, error);

            return Result.Fail(error);
        }
    }
    public async Task<Result<Compromisso>> CadastrarAsync(Compromisso compromisso)
    {
        Log.Logger.Debug($"Tentando cadastrar compromisso {compromisso}");

        Result result = await ValidarAsync(compromisso);

        if (result.IsFailed)
            return Result.Fail(result.Errors);

        try
        {
            await _repositorioCompromisso.CadastrarAsync(compromisso);

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

    public async Task<Result<Compromisso>> EditarAsync(Compromisso compromisso)
    {
        Log.Logger.Debug($"Tentando editar compromisso {compromisso}");

        var result = await ValidarAsync(compromisso);

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

    public async Task<Result<Compromisso>> ExcluirAsync(Compromisso compromisso)
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

}