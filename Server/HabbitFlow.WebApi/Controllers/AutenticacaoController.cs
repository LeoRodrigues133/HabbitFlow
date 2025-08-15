using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using HabbitFlow.WebApi.Config;
using HabbitFlow.Dominio.ModuloAuth;
using HabbitFlow.Aplicacao.ModuloCategoria;
using HabbitFlow.WebApi.Controllers.Shared;
using static HabbitFlow.WebApi.ViewModels.ModuloAuth.AuthViewModels;


namespace HabbitFlow.WebApi.Controllers;
[Route("api/[controller]")]
[ApiController]
public class AutenticacaoController : ControllerBaseExtension
{
    readonly ServicoAuth _servicoAuth;
    readonly IMapper _mapeador;
    public AutenticacaoController(ServicoAuth servicoAuth, IMapper mapeador)
    {
        _servicoAuth = servicoAuth;
        _mapeador = mapeador;
    }

    [HttpPost("registrar")] // Não esquecer, de colocar a rota expecífica. Dará conflito nas rotas.
    public async Task<IActionResult> Registrar(RegistrarUsuarioViewModel viewModel)
    {
        var usuario = _mapeador.Map<Usuario>(viewModel);

        var result = await _servicoAuth.RegisterAsync(usuario, viewModel.Senha);

        if (result.IsFailed)
            return BadRequest(result.Errors);

        var tokenViewModel = usuario.GerarJwt(DateTime.Now.AddDays(5));

        return Ok(tokenViewModel);
    }

    [HttpPost("autenticar")]
    public async Task<IActionResult> Autenticar(AutenticarUsuarioViewModel viewModel)
    {
        var result = await _servicoAuth.AuthAsync(viewModel.Login, viewModel.Senha);

        if (result.IsFailed)
            return BadRequest(result.Errors);

        var usuario = result.Value;

        var tokenViewModel = usuario.GerarJwt(DateTime.Now.AddDays(5));

        return Ok(tokenViewModel);
    }

    [HttpPost("sair")]
    public async Task<IActionResult> Sair()
    {
        await _servicoAuth.LogoutAsync();

        return Ok();
    }
}
