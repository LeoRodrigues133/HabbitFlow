using FluentResults;
using HabbitFlow.Aplicacao.Compartilhado;
using HabbitFlow.Dominio.Compartilhado;
using HabbitFlow.Dominio.ModuloCompromisso;
using HabbitFlow.Dominio.ModuloSubtarefa;
using HabbitFlow.Dominio.ModuloTarefa;
using Serilog;

namespace HabbitFlow.Aplicacao.ModuloTarefa;

public class ServicoTarefa : ServicoBase<Tarefa, TarefaValidation>
{
    IRepositorioTarefa _repositorioTarefa;
    IPersistContext _persistContext;

    public ServicoTarefa(
        IRepositorioTarefa repositorioTarefa,
        IPersistContext persistContext)
    {
        _repositorioTarefa = repositorioTarefa;
        _persistContext = persistContext;
    }

    public async Task<Result<List<Tarefa>>> SelecionarTodosAsync()
    {
        Log.Logger.Debug("Tentando selecionar tarefas...");

        try
        {
            var tarefas = await _repositorioTarefa.SelecionarTodosAsync();

            Log.Logger.Information("Tarefas selecionadas com sucesso!");

            return Result.Ok(tarefas);
        }
        catch (Exception ex)
        {

            string error = "Falha ao tentar selecionar tarefas no sistema.";

            Log.Logger.Error(ex, error);

            return Result.Fail(error);

        }
    }

    public async Task<Result<Tarefa>> SelecionarPorIdAsync(Guid id)
    {
        Log.Logger.Debug("Tentando selecionar tarefa.");

        try
        {
            var tarefa = await _repositorioTarefa.SelecionarPorIdAsync(id);

            if (tarefa is null)
            {
                Log.Logger.Warning($"Tarefa id: [{id}] não encontrada.");

                return Result.Fail("Tarefa não encontrado");
            }

            Log.Logger.Information($"Tarefa id [{id}] selecionada com sucesso!");

            return Result.Ok(tarefa);
        }
        catch (Exception ex)
        {
            string error = "Falha ao tentar selecionar tarefa no sistema.";

            Log.Logger.Error(ex, error + $"{id}");

            return Result.Fail(error);
        }
    }

    public async Task<Result<Tarefa>> CadastrarAsync(Tarefa tarefa)
    {
        Log.Logger.Debug($"Tentando cadastrar tarefa {tarefa}");

        Result result = await ValidarAsync(tarefa);

        if (result.IsFailed)
            return Result.Fail(result.Errors);

        try
        {
            await _repositorioTarefa.CadastrarAsync(tarefa);

            _persistContext.SaveContextChanges();

            Log.Logger.Information($"Tarefa {tarefa} cadastrada com sucesso!");

            return Result.Ok(tarefa);
        }
        catch (Exception ex)
        {
            _persistContext.UndoContextChanges();

            string error = "Falha ao tentar cadastrar tarefa no sistema";

            Log.Logger.Error(ex, error + $"{tarefa}");

            return Result.Fail(error);
        }
    }

    public async Task<Result<Tarefa>> EditarAsync(Tarefa tarefa)
    {
        Log.Logger.Debug($"Tentando editar tarefa {tarefa}");

        var result = await ValidarAsync(tarefa);

        if (result.IsFailed)
            return Result.Fail(result.Errors);

        try
        {
            _repositorioTarefa.Editar(tarefa);

            _persistContext.SaveContextChanges();

            Log.Logger.Information($"Tarefa {tarefa} editada com sucesso!");
        }
        catch (Exception ex)
        {
            _persistContext.UndoContextChanges();

            string error = "Falha ao tentar editar tarefa no sistema.";

            Log.Logger.Error(ex, error + $"{tarefa}");

            return Result.Fail(error);
        }

        return Result.Ok(tarefa);
    }

    public async Task<Result<Tarefa>> ExcluirAsync(Tarefa tarefa)
    {
        Log.Logger.Debug($"Tentando excluir a tarefa {tarefa}");

        try
        {
            _repositorioTarefa.Excluir(tarefa);

            _persistContext.SaveContextChanges();

            Log.Logger.Information($"Tarefa {tarefa} excluida com sucesso!");

            return Result.Ok();

        }
        catch (Exception ex)
        {
            _persistContext.UndoContextChanges();

            string error = "Falha ao tentar excluir a tarefa do sistema.";

            Log.Logger.Error(ex, error + $"{tarefa}");

            return Result.Fail(error);
        }
    }

    public async Task<Result<SubTarefa>> CadastrarSubtarefaAsync(string titulo, Guid tarefaId)
    {
        var tarefa = await _repositorioTarefa.SelecionarPorIdAsync(tarefaId);

        if (tarefa is null)
            return Result.Fail("Tarefa não encontrada");

        var subtarefa = new SubTarefa(titulo, tarefa);

        Log.Logger.Debug("Tentando cadastrar subtarefa {Titulo} para tarefa {TarefaId}", subtarefa, tarefa);

        var validacao = validarSubtarefa(subtarefa);

        if (validacao.IsFailed)
            return validacao;

        try
        {

            tarefa.CadastrarSubTarefa(subtarefa.Titulo);

            await _persistContext.SaveContextAsync();

            Log.Logger.Information($"Subtarefa {subtarefa.Titulo} cadastrada com sucesso!");

            return Result.Ok(subtarefa);
        }
        catch (Exception ex)
        {
            _persistContext.UndoContextChanges();

            string error = "Falha ao tentar cadastrar subtarefa no sistema";

            Log.Logger.Error(ex, error + $"{subtarefa}");

            return Result.Fail(error);
        }
    }

    public async Task<Result<SubTarefa>> EditarSubtarefaAsync(SubTarefa subtarefa, Tarefa tarefa)
    {
        Log.Logger.Debug($"Tentando editar subtarefa {subtarefa}");

        var validacao = validarSubtarefa(subtarefa);

        if (validacao.IsFailed)
            return validacao;

        try
        {

            _persistContext.SaveContextChanges();

            Log.Logger.Information($"Subtarefa {subtarefa} editada com sucesso!");
        }
        catch (Exception ex)
        {
            _persistContext.UndoContextChanges();

            string error = "Falha ao tentar editar subtarefa no sistema.";

            Log.Logger.Error(ex, error + $"{subtarefa}");

            return Result.Fail(error);
        }

        return Result.Ok(subtarefa);
    }

    public async Task<Result<SubTarefa>> ExcluirSubtarefa(SubTarefa subtarefa, Tarefa tarefa)
    {
        Log.Logger.Debug($"Tentando excluir a subtarefa {subtarefa}");

        var validacao = validarSubtarefa(subtarefa);

        if (validacao.IsFailed)
            return validacao;

        try
        {
            tarefa.RemoverSubTarefa(subtarefa.Id);

            _persistContext.SaveContextChanges();

            Log.Logger.Information($"SubTarefa {subtarefa} excluida com sucesso!");

            return Result.Ok();

        }
        catch (Exception ex)
        {
            _persistContext.UndoContextChanges();

            string error = "Falha ao tentar excluir a subtarefa do sistema.";

            Log.Logger.Error(ex, error + $"{subtarefa}");

            return Result.Fail(error);
        }
    }

    Func<SubTarefa, Result<SubTarefa>> validarSubtarefa = subtarefa =>
    {
        var validator = new SubtarefaValidation();
        var result = validator.Validate(subtarefa);

        if (!result.IsValid)
        {
            var erros = result.Errors
                .Select(e => new Error(e.ErrorMessage))
                .ToList();

            return Result.Fail<SubTarefa>(erros);
        }

        return Result.Ok(subtarefa);
    };
}