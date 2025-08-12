using HabbitFlow.Dominio.ModuloAuth;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using static HabbitFlow.WebApi.ViewModels.ModuloAuth.AuthViewModels;


namespace HabbitFlow.WebApi.Config;

public static class UsuarioJwtExtension
{
    private static string AuthKey = "UmaChaveBemSegura123@eAleatóriaTipoBichoMeuAmigo";

    public static TokenViewModel GerarJwt(this Usuario usuario, DateTime dataExpiracao)
    {
        string chaveToken = CriarChaveToken(usuario, dataExpiracao);

        var token = new TokenViewModel
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

        return token;
    }

    private static string CriarChaveToken(Usuario usuario, DateTime dataExpiracao)
    {

    var tokenHandler = new JwtSecurityTokenHandler();

        var segredo = Encoding.ASCII.GetBytes(AuthKey);

        var token = tokenHandler.CreateToken(new SecurityTokenDescriptor
        {
            Issuer = "HabbitFlow",
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