using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace HabbitFlow.WebApi.Config;
public static class JtwConfigExtension
{
    private static string AuthKey = "UmaChaveBemSegura123@eAleatóriaTipoBichoMeuAmigo";
    public static void ConfigurarJwt(this IServiceCollection services)
    {
        var key = Encoding.ASCII.GetBytes(AuthKey);

        services.AddAuthentication(x =>
        {
            x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

        }).AddJwtBearer(x =>
        {   
            x.RequireHttpsMetadata = false;
            x.SaveToken = true;

            x.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidAudience = "http://localhost", 
                ValidIssuer = "HabbitFlow",
                ValidateAudience = true,
                ValidateIssuer = true,
                ValidateLifetime = true
            };
        });
    }
}   