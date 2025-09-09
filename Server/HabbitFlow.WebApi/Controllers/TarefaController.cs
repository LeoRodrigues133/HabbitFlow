using AutoMapper;
using FluentResults;
using HabbitFlow.Aplicacao.ModuloCompromisso;
using HabbitFlow.Aplicacao.ModuloTarefa;
using HabbitFlow.Dominio.ModuloCompromisso;
using HabbitFlow.Dominio.ModuloSubtarefa;
using HabbitFlow.Dominio.ModuloTarefa;
using HabbitFlow.WebApi.Controllers.Shared;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static HabbitFlow.WebApi.ViewModels.ModuloTarefa.SubtarefasViewModels;
using static HabbitFlow.WebApi.ViewModels.ModuloTarefa.TarefaViewModels;

namespace HabbitFlow.WebApi.Controllers;
[Route("api/[controller]")]
[ApiController]
[Authorize]
public class TarefaController : ControllerBaseExtension
{
    readonly ServicoTarefa _servicoTarefa;
    readonly IMapper _mapper;

    public TarefaController(
        ServicoTarefa servicoTarefa,
        IMapper mapper)
    {
        _servicoTarefa = servicoTarefa;
        _mapper = mapper;
    }

    [ProducesResponseType(typeof(ListarTarefaViewModel), 200)]
    [ProducesResponseType(typeof(string[]), 400)]
    [ProducesResponseType(typeof(string[]), 500)]
    [HttpGet]
    public async Task<IActionResult> SelecionarTodos()
    {
        var result = await _servicoTarefa.SelecionarTodosAsync();

        var tarefas = result.Value;

        var viewModel = _mapper.Map<List<ListarTarefaViewModel>>(tarefas);

        return Ok(viewModel);
    }

    [ProducesResponseType(typeof(ListarTarefaViewModel), 200)]
    [ProducesResponseType(typeof(string[]), 404)]
    [ProducesResponseType(typeof(string[]), 500)]
    [HttpGet("SelectById/{id}")]
    public async Task<IActionResult> SelecionarPorId(Guid id)
    {
        var result = await _servicoTarefa.SelecionarPorIdAsync(id);

        if (result.IsFailed)
            return NotFound(result.Errors);

        var tarefa = result.Value;

        var viewModel = _mapper.Map<ListarTarefaViewModel>(tarefa);

        return Ok(viewModel);
    }

    [ProducesResponseType(typeof(CadastrarTarefaViewModel), 200)]
    [ProducesResponseType(typeof(string[]), 400)]
    [ProducesResponseType(typeof(string[]), 500)]
    [HttpPost]
    public async Task<IActionResult> Cadastrar(CadastrarTarefaViewModel viewModel)
    {
        var tarefa = _mapper.Map<Tarefa>(viewModel);

        var result = await _servicoTarefa.CadastrarAsync(tarefa);

        return ProcessarResultado(result.ToResult(), viewModel);
    }

    [ProducesResponseType(typeof(EditarTarefaViewModel), 200)]
    [ProducesResponseType(typeof(string[]), 404)]
    [ProducesResponseType(typeof(string[]), 500)]
    [HttpPut("{id}")]
    public async Task<IActionResult> Editar(Guid id, EditarTarefaViewModel viewModel)
    {
        var result = await _servicoTarefa.SelecionarPorIdAsync(id);

        if (result.IsFailed)
            return NotFound(result.Errors);

        var tarefaValue = result.Value;

        var tarefa = _mapper.Map(viewModel, tarefaValue);

        var tarefaResult = await _servicoTarefa.EditarAsync(tarefa);

        return ProcessarResultado(tarefaResult.ToResult(), viewModel);
    }

    [ProducesResponseType(typeof(ExcluirTarefaViewModel), 200)]
    [ProducesResponseType(typeof(string[]), 400)]
    [ProducesResponseType(typeof(string[]), 404)]
    [ProducesResponseType(typeof(string[]), 500)]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Excluir(Guid id)
    {
        var result = await _servicoTarefa.SelecionarPorIdAsync(id);

        if (result.IsFailed)
            return NotFound(result.Errors);

        var tarefaValue = result.Value;

        var tarefaResult = await _servicoTarefa.ExcluirAsync(tarefaValue);

        return ProcessarResultado(tarefaResult.ToResult());
    }


    [ProducesResponseType(typeof(ListarSubtarefaViewModel), 200)]
    [ProducesResponseType(typeof(string[]), 400)]
    [ProducesResponseType(typeof(string[]), 500)]
    [HttpGet("ListarSubtarefas/{tarefaId}")]
    public async Task<IActionResult> ListarSubtarefas(Guid tarefaId)
    {
        var result = await _servicoTarefa.SelecionarPorIdAsync(tarefaId);

        var tarefa = result.Value;

        var subtarefas = tarefa.Subtarefas.ToList();

        var viewModel = _mapper.Map<List<ListarSubtarefaViewModel>>(subtarefas);

        return Ok(viewModel);
    }

    [ProducesResponseType(typeof(CadastrarSubtarefaViewModel), 200)]
    [ProducesResponseType(typeof(string[]), 400)]
    [ProducesResponseType(typeof(string[]), 404)]
    [ProducesResponseType(typeof(string[]), 500)]
    [HttpPost("subtarefa/cadastrar")]
    public async Task<IActionResult> CadastrarSubtarefa(CadastrarSubtarefaViewModel viewModel)
    {
        var resultSubtarefa = await _servicoTarefa.CadastrarSubtarefaAsync(viewModel.Titulo, viewModel.tarefaId);

        return ProcessarResultado(resultSubtarefa.ToResult(), viewModel);
    }

    [ProducesResponseType(typeof(EditarSubtarefaViewModel), 200)]
    [ProducesResponseType(typeof(string[]), 400)]
    [ProducesResponseType(typeof(string[]), 404)]
    [ProducesResponseType(typeof(string[]), 500)]
    [HttpPut("{tarefaId}/subtarefa/editar/{id}")]
    public async Task<IActionResult> EditarSubTarefa(Guid tarefaId, Guid id, EditarSubtarefaViewModel viewModel)
    {
    var resultTarefa = await _servicoTarefa.SelecionarPorIdAsync(tarefaId);
        if (resultTarefa.IsFailed)
            return NotFound(resultTarefa.Errors);

        var tarefa = resultTarefa.Value;

        var subtarefa = tarefa.SelecionarSubtarefa(id);

        if (subtarefa is null)
            return NotFound("Subtarefa não encontrada");

        var viewModelAtualizado = _mapper.Map(viewModel, subtarefa);

        var result = await _servicoTarefa.EditarSubtarefaAsync(subtarefa, tarefa);

        if (result.IsFailed)
            return BadRequest(result.Errors);

        return Ok();
    }


    [ProducesResponseType(typeof(ExcluirSubtarefaViewModel), 200)]
    [ProducesResponseType(typeof(string[]), 400)]
    [ProducesResponseType(typeof(string[]), 404)]
    [ProducesResponseType(typeof(string[]), 500)]
    [HttpDelete("{tarefaId}/subtarefa/excluir/{id}")]
    public async Task<IActionResult> ExcluirSubTarefa(Guid tarefaId, Guid id)
    {
        var tarefa = await ObterTarefaAsync(tarefaId);

        if (tarefa is null)
            return NotFound("Tarefa não encontrada");

        var subtarefa = tarefa.SelecionarSubtarefa(id);

        if (subtarefa is null)
            return NotFound("Subtarefa não encontrada");

        await _servicoTarefa.ExcluirSubtarefa(subtarefa, tarefa);

        return Ok();
    }

    private async Task<Tarefa?> ObterTarefaAsync(Guid tarefaId)
    {
        var resultTarefa = await _servicoTarefa.SelecionarPorIdAsync(tarefaId);
        return resultTarefa.IsSuccess ? resultTarefa.Value : null;
    }
}
