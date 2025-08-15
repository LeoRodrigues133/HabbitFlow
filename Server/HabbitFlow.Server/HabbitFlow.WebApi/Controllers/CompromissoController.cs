using AutoMapper;
using HabbitFlow.Aplicacao.ModuloCompromisso;
using HabbitFlow.Dominio.ModuloCompromisso;
using HabbitFlow.WebApi.Controllers.Shared;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static HabbitFlow.WebApi.ViewModels.ModuloCompromisso.CompromissoViewModels;

namespace HabbitFlow.WebApi.Controllers;
[Route("api/[controller]")]
[ApiController]
[Authorize]
public class CompromissoController : ControllerBaseExtension
{
    readonly ServicoCompromisso _servicoCompromisso;
    readonly IMapper _mapper;

    public CompromissoController(
        ServicoCompromisso servicoCompromisso,
        IMapper mapper)
    {
        _servicoCompromisso = servicoCompromisso;
        _mapper = mapper;
    }

    [HttpGet]
    [ProducesResponseType(typeof(List<ListarCompromissoViewModel>), 200)]
    [ProducesResponseType(typeof(string[]), 500)]
    public async Task<IActionResult> SelecionarTodos()
    {
        var result = await _servicoCompromisso.SelecionarTodosAsync();

        var compromissos = result.Value;

        var viewModel = _mapper.Map<List<ListarCompromissoViewModel>>(compromissos);

        return Ok(viewModel);
    }

    [HttpGet("SelectById/{id}")]
    [ProducesResponseType(typeof(ListarCompromissoViewModel), 200)]
    [ProducesResponseType(typeof(ListarCompromissoViewModel), 404)]
    [ProducesResponseType(typeof(ListarCompromissoViewModel), 500)]
    public async Task<IActionResult> SelecionarPorId(Guid id)
    {
        var result = await _servicoCompromisso.SelecionarPorIdAsync(id);

        if (result.IsFailed)
            return NotFound(result.Errors);

        var compromissso = result.Value;

        var viewModel = _mapper.Map<ListarCompromissoViewModel>(compromissso);

        return Ok(viewModel);
    }

    [HttpPost]
    [ProducesResponseType(typeof(CadastrarCompromissoViewModel), 200)]
    [ProducesResponseType(typeof(string[]), 400)]
    [ProducesResponseType(typeof(string[]), 500)]
    public async Task<IActionResult> Cadastrar(CadastrarCompromissoViewModel viewModel)
    {
        var compromisso = _mapper.Map<Compromisso>(viewModel);

        var result = await _servicoCompromisso.CadastrarAsync(compromisso);

        return ProcessarResultado(result.ToResult(), viewModel);
    }
    [HttpPut("{id}")]
    [ProducesResponseType(typeof(EditarCompromissoViewModel), 200)]
    [ProducesResponseType(typeof(string[]), 400)]
    [ProducesResponseType(typeof(string[]), 404)]
    [ProducesResponseType(typeof(string[]), 500)]
    public async Task<IActionResult> Editar(Guid id, EditarCompromissoViewModel compromissoVm)
    {
        var result = await _servicoCompromisso.SelecionarPorIdAsync(id);

        if (result.IsFailed)
            return NotFound(result.Errors);

        var compromissoValue = result.Value;

        var compromisso = _mapper.Map(compromissoVm, compromissoValue);

        var compromissoResult = await _servicoCompromisso.EditarAsync(compromisso);

        return ProcessarResultado(compromissoResult.ToResult(), compromissoVm);
    }
    [HttpDelete("{id}")]
    [ProducesResponseType(typeof(ExcluirCompromissoViewModel), 200)]
    [ProducesResponseType(typeof(string[]), 400)]
    [ProducesResponseType(typeof(string[]), 404)]
    [ProducesResponseType(typeof(string[]), 500)]
    public async Task<IActionResult> Excluir(Guid id)
    {
        var result = await _servicoCompromisso.SelecionarPorIdAsync(id);

        if (result.IsFailed) 
            return NotFound(result.Errors);

        var compromissoValue = result.Value;

        var compromissoResult = await _servicoCompromisso.ExcluirAsync(compromissoValue);

        return ProcessarResultado(compromissoResult.ToResult());
    }
}
