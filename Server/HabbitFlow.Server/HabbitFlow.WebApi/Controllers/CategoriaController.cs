using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using HabbitFlow.Dominio.ModuloCategoria;
using Microsoft.AspNetCore.Authorization;
using HabbitFlow.WebApi.Controllers.Shared;
using HabbitFlow.Aplicacao.ModuloCategoria;
using static HabbitFlow.WebApi.ViewModels.ModuloCategoria.CategoriaViewModels;

namespace HabbitFlow.WebApi.Controllers;
[Route("api/[controller]")]
[ApiController]
[Authorize]
public class CategoriaController : ExtensionControllerBase
{
    readonly ServicoCategoria _servicoCategoria;
    readonly IMapper _mapper;

    public CategoriaController(
        ServicoCategoria servicoCategoria,
        IMapper mapper)
    {
        _servicoCategoria = servicoCategoria;
        _mapper = mapper;
    }

    [HttpGet]
    [ProducesResponseType(typeof(List<ListarCategoriaViewModel>), 200)]
    [ProducesResponseType(typeof(string[]), 500)]
    public async Task<IActionResult> SelecionarTodos()
    {
        var result = await _servicoCategoria.SelecionarTodosAsync();

        var categorias = result.Value;

        var viewModel = _mapper.Map<List<ListarCategoriaViewModel>>(categorias);

        return Ok(viewModel);
    }

    [HttpGet("SelectById/{id}")]
    [ProducesResponseType(typeof(ListarCategoriaViewModel), 200)]
    [ProducesResponseType(typeof(string[]), 404)]
    [ProducesResponseType(typeof(string[]), 500)]
    public async Task<IActionResult> SelecionarPorId(Guid id)
    {
        var result = await _servicoCategoria.SelecionarPorIdAsync(id);

        if (result.IsFailed)
            return NotFound(result.Errors);

        var categoria = result.Value;

        var viewModel = _mapper.Map<ListarCategoriaViewModel>(categoria);

        return Ok(viewModel);
    }

    [HttpPost]
    [ProducesResponseType(typeof(CadastrarCategoriaViewModel), 200)]
    [ProducesResponseType(typeof(string[]), 400)]
    [ProducesResponseType(typeof(string[]), 500)]
    public async Task<IActionResult> Cadastrar(CadastrarCategoriaViewModel viewModel)
    {
        var categoria = _mapper.Map<Categoria>(viewModel);

        var result = await _servicoCategoria.CadastrarAsync(categoria);

        return ProcessarResultado(result.ToResult(), viewModel);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(typeof(EditarCategoriaViewModel), 200)]
    [ProducesResponseType(typeof(string[]), 400)]
    [ProducesResponseType(typeof(string[]), 404)]
    [ProducesResponseType(typeof(string[]), 500)]
    public async Task<IActionResult> Editar(Guid id, EditarCategoriaViewModel categoriaVm)
    {
        var result = await _servicoCategoria.SelecionarPorIdAsync(id);

        if (result.IsFailed)
            return NotFound(result.Errors);

        var categoriaValue = result.Value;

        var categoria = _mapper.Map(categoriaVm, categoriaValue);

        var categoriaResult = await _servicoCategoria.EditarAsync(categoria);

        return ProcessarResultado(categoriaResult.ToResult(), categoriaVm);
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(typeof(ExcluirCategoriaViewModel), 200)]
    [ProducesResponseType(typeof(string[]), 400)]
    [ProducesResponseType(typeof(string[]), 404)]
    [ProducesResponseType(typeof(string[]), 500)]
    public async Task<IActionResult> Excluir(Guid id)
    {
        var result = await _servicoCategoria.SelecionarPorIdAsync(id);

        if (result.IsFailed)
            return NotFound(result.Errors);

        var categoriaValue = result.Value;

        var categoriaResult = await _servicoCategoria.ExcluirAsync(categoriaValue);

        return ProcessarResultado(categoriaResult.ToResult());
    }
}
