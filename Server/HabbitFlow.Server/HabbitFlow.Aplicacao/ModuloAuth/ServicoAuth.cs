using FluentResults;
using HabbitFlow.Dominio.ModuloAuth;
using Microsoft.AspNetCore.Identity;
using System.Data;

namespace HabbitFlow.Aplicacao.ModuloCategoria;

public class ServicoAuth
{
    readonly UserManager<Usuario> userManager;
    readonly SignInManager<Usuario> signInManager;

    public ServicoAuth(
        UserManager<Usuario> userManager,
        SignInManager<Usuario> signInManager)
    {
        this.userManager = userManager;
        this.signInManager = signInManager;
    }

    /// <summary>
    /// Registro para usu�rio padr�o.
    /// </summary>
    /// <param name="user"> Login</param>
    /// <param name="password"> Senha</param>
    /// <returns></returns>
    public async Task<Result<Usuario>> RegisterAsync(Usuario user, string password)
    {
        var userResult = await userManager.CreateAsync(user, password);

        if (!userResult.Succeeded)
            return Result.Fail(
                userResult.Errors.Select(failure => new Error(failure.Description)));

        return Result.Ok(user);
    }

    /// <summary>
    /// Autentica��o para usu�rio.
    /// </summary>
    /// <param name="user"> Login</param>
    /// <param name="password"> Senha</param>
    /// <returns></returns>
    public async Task<Result<Usuario>> AuthAsync(string user, string password)
    {
        var loginResult = await signInManager.PasswordSignInAsync(
            userName: user,
            password: password,
            isPersistent: false,
            lockoutOnFailure: true);

        #region Errors
        var errors = new List<IError>();

        if (loginResult.IsLockedOut)
            errors.Add(new Error("O acesso para este usu�rio foi bloqueado."));

        if (loginResult.IsNotAllowed)
            errors.Add(new Error("O acesso para este usu�rio n�o � permitido."));

        if (!loginResult.Succeeded)
            errors.Add(new Error("O login ou a senha est�o incorretas."));

        if (errors.Count > 0)
            return Result.Fail(errors);
        #endregion


        var userAuth = await userManager.FindByNameAsync(user);

        if (userAuth is null)
            return Result.Fail("N�o foi poss�vel encontrar o usu�rio");

        return Result.Ok(userAuth);
    }
    /// <summary>
    /// Logout de usu�rio.
    /// </summary>
    /// <returns></returns>
    public async Task<Result> LogoutAsync()
    {
        await signInManager.SignOutAsync();

        return Result.Ok();
    }
}