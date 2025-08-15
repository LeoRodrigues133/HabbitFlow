using FluentResults;
using FluentValidation;
using Serilog;

namespace HabbitFlow.Aplicacao.Compartilhado;
public abstract class ServicoBase<TDomain, TValidator> where TValidator : AbstractValidator<TDomain>, new()
{
    protected virtual Result Validar(TDomain domain)
    {
        var validation = new TValidator();

        var validationResult = validation.Validate(domain);

        var Logs = new List<Error>();

        foreach (var logResult in validationResult.Errors)
        {
            Log.Logger.Information(logResult.ErrorMessage);

            Logs.Add(new Error(logResult.ErrorMessage));
        }

        if (Logs.Any())
            return Result.Fail(Logs);

        return Result.Ok();
    }

    protected virtual async Task<Result> ValidarAsync(TDomain domain)
    {
        var validation = new TValidator();

        var validationResult = await validation.ValidateAsync(domain);

        var Logs = new List<Error>();

        foreach (var logResult in validationResult.Errors)
        {
            Log.Logger.Information(logResult.ErrorMessage);

            Logs.Add(new Error(logResult.ErrorMessage));
        }

        if (Logs.Any())
            return Result.Fail(Logs);

        return Result.Ok();
    }
}