using AutoMapper;
using HabbitFlow.Aplicacao.ModuloCategoria;
using HabbitFlow.Dominio.ModuloAuth;
using HabbitFlow.WebApi.Controllers.Shared;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using static HabbitFlow.WebApi.ViewModels.ModuloAuth.AuthViewModels;


namespace HabbitFlow.WebApi.Controllers;
[Route("api/[controller]")]
[ApiController]
public class AutenticacaoController : ExtensionControllerBase
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

        if(result.IsFailed)
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


public static class UsuarioJwtExtension
{
    public static TokenViewModel GerarJwt(this Usuario usuario, DateTime dataExpiracao)
    {
        string chaveToken = CriarChaveToken(usuario, dataExpiracao);

        var tokem = new TokenViewModel
        {
            Chave = chaveToken,
            DataExpiracao = dataExpiracao,
            Usuario = new UsuarioTokenViewModel
            {
                Id = usuario.Id,
                Nome = usuario.Nome,
                Email = usuario.Email,
                Login = usuario.UserName
            }
        };

        return tokem;
    }

    private static string CriarChaveToken(Usuario usuario, DateTime dataExpiracao)
    {
        var tokenHandler = new JwtSecurityTokenHandler();

        var segredo = Encoding.ASCII.GetBytes("07xiA716eLITq7smiUueBD0QpqcTcR8V");

        var token = tokenHandler.CreateToken(new SecurityTokenDescriptor
        {
            Issuer = "eAgenda",
            Audience = "http://localhost",
            Subject = ObterIdentityClaims(usuario),
            Expires = dataExpiracao,
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(segredo), SecurityAlgorithms.HmacSha256Signature)
        });

        string chaveToken = tokenHandler.WriteToken(token);

        return chaveToken;
    }

    private static ClaimsIdentity ObterIdentityClaims(Usuario usuario)
    {
        var identityClaims = new ClaimsIdentity();

        identityClaims.AddClaim(new Claim(JwtRegisteredClaimNames.Sub, usuario.Id.ToString()));
        identityClaims.AddClaim(new Claim(JwtRegisteredClaimNames.Email, usuario.Email));
        identityClaims.AddClaim(new Claim(JwtRegisteredClaimNames.UniqueName, usuario.UserName));
        identityClaims.AddClaim(new Claim(JwtRegisteredClaimNames.GivenName, usuario.Nome));

        return identityClaims;
    }
}