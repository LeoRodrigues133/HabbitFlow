using HabbitFlow.Dominio.Compartilhado;
using HabbitFlow.Dominio.ModuloCategoria;
using HabbitFlow.Dominio.ModuloContato;

namespace HabbitFlow.Dominio.ModuloCompromisso;

public class Compromisso : EntidadeBase<Compromisso>
{

    public Compromisso()
    {

    }
    public Compromisso(
        string link,
        string local,
        string titulo,
        DateTime data,
        DateTime? hora,
        string conteudo,
        Contato? contato,
        Categoria? categoria,
        TipoCompromissoEnum tipoEnum
        //,        int tempoEstimado
        // Implemento mais tarde...
        )
    {
        Data = data;
        Link = link;
        Hora = hora;
        Local = local;
        Titulo = titulo;
        Contato = contato;
        Categoria = categoria;
        Conteudo = conteudo;
        TipoEnum = tipoEnum;
        //TempoEstimado = tempoEstimado;
    }
    //public int? TempoEstimado {  get; set; }
    public string Local { get; set; }
    public string Link { get; set; }
    public string Titulo { get; set; }
    public string Conteudo { get; set; }
    public DateTime? Hora { get; set; }

    TipoCompromissoEnum _tipoEnum;
    public TipoCompromissoEnum TipoEnum
    {
        get => _tipoEnum;
        set
        {
            _tipoEnum = value;

            switch (_tipoEnum)
            {
                case TipoCompromissoEnum.Presencial:
                    Link = null;
                    break;

                case TipoCompromissoEnum.Remoto:
                    Local = null;
                    break;

                default:
                    break;
            }
        }
    }

    DateTime _data;
    public DateTime Data
    {
        get => _data.Date;
        set => _data = value;
    }

    Contato? _contato;
    public Guid? ContatoId { get; set; }
    public Contato? Contato
    {
        get => _contato;

        set
        {
            _contato = value;

            if (_contato is not null) ContatoId = _contato.Id;
        }
    }

    Categoria? _categoria;
    public Guid? CategoriaId { get; set; }
    public Categoria? Categoria
    {
        get => _categoria;
        set
        {
            _categoria = value;

            if (_categoria is not null) CategoriaId = _categoria.Id;
        }
    }

}