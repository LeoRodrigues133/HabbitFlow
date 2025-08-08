using HabbitFlow.Dominio.Compartilhado;
using HabbitFlow.Dominio.ModuloCompromisso;

namespace HabbitFlow.Dominio.ModuloContato;

public class Contato : EntidadeBase<Contato>
{
    public Contato()
    { }
    public Contato(string nome, string telefone, string? email, string empresa, string cargo)
    {
        Nome = nome;
        Telefone = telefone;
        Email = email;
        Empresa = empresa;
        Cargo = cargo;
    }

    public string Nome { get; set; }
    public string Telefone { get; set; }
    public string? Email { get; set; }
    public string Empresa { get; set; }
    public string Cargo { get; set; }
    public List<Compromisso> Compromissos { get; set; }

    public override string ToString()
    {
        return Nome + " - " + Email;
    }

}