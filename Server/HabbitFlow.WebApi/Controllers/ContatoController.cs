using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using HabbitFlow.Dominio.ModuloContato;
using HabbitFlow.Aplicacao.ModuloContato;
using Microsoft.AspNetCore.Authorization;
using HabbitFlow.WebApi.Controllers.Shared;
using static HabbitFlow.WebApi.ViewModels.ModuloContato.ContatoViewModels;

namespace HabbitFlow.WebApi.Controllers;
[Route("api/[controller]")]
[ApiController]
[Authorize]
public class ContatoController : ControllerBaseExtension
{
    readonly ServicoContato _servicoContato;
    readonly IMapper _mapper;

    public ContatoController(
        ServicoContato servicoContato,
        IMapper mapper)
    {
        _servicoContato = servicoContato;
        _mapper = mapper;
    }

    [HttpGet]
    [ProducesResponseType(typeof(List<ListarContatoViewModel>), 200)]
    [ProducesResponseType(typeof(string[]), 500)]
    public async Task<IActionResult> SelecionarTodos()
    {
        var result = await _servicoContato.SelecionarTodosAsync();

        var contato = result.Value;

        var viewModel = _mapper.Map<List<ListarContatoViewModel>>(contato);

        return Ok(viewModel);
    }

    [HttpGet("SelectById/{id}")]
    [ProducesResponseType(typeof(ListarContatoViewModel), 200)]
    [ProducesResponseType(typeof(ListarContatoViewModel), 404)]
    [ProducesResponseType(typeof(ListarContatoViewModel), 500)]
    public async Task<IActionResult> SelecionarPorId(Guid id)
    {
        var result = await _servicoContato.SelecionarPorIdAsync(id);

        if (result.IsFailed)
            return NotFound(result.Errors);

        var contato = result.Value;

        var viewModel = _mapper.Map<ListarContatoViewModel>(contato);

        return Ok(viewModel);
    }

    [HttpPost]
    [ProducesResponseType(typeof(CadastrarContatoViewModel), 200)]
    [ProducesResponseType(typeof(string[]), 400)]
    [ProducesResponseType(typeof(string[]), 500)]
    public async Task<IActionResult> Cadastrar(CadastrarContatoViewModel viewModel)
    {
        var contato = _mapper.Map<Contato>(viewModel);

        var result = await _servicoContato.CadastrarAsync(contato);

        return ProcessarResultado(result.ToResult(), viewModel);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(typeof(EditarContatoViewModel), 200)]
    [ProducesResponseType(typeof(string[]), 400)]
    [ProducesResponseType(typeof(string[]), 404)]
    [ProducesResponseType(typeof(string[]), 500)]
    public async Task<IActionResult> Editar(Guid id, EditarContatoViewModel contatoVm)
    {
        var result = await _servicoContato.SelecionarPorIdAsync(id);

        if (result.IsFailed)
            return NotFound(result.Errors);

        var contatoValue = result.Value;

        var contato = _mapper.Map(contatoVm, contatoValue);

        var contatoResult = await _servicoContato.EditarAsync(contato);

        return ProcessarResultado(contatoResult.ToResult(), contatoVm);
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(typeof(ExcluirContatoViewModel), 200)]
    [ProducesResponseType(typeof(string[]), 400)]
    [ProducesResponseType(typeof(string[]), 404)]
    [ProducesResponseType(typeof(string[]), 500)]
    public async Task<IActionResult> Excluir(Guid id)
    {
        var result = await _servicoContato.SelecionarPorIdAsync(id);

        if (result.IsFailed)
            return NotFound(result.Errors);

        var contatoValue = result.Value;

        var contatoResult = await _servicoContato.ExcluirAsync(contatoValue);

        return ProcessarResultado(contatoResult.ToResult());
    }
}
