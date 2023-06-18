import { useContext } from "react";
import PropriedadeContext from "./PropriedadeContext";
import Alerta from '../../comuns/Alerta'

function TabelaAdicionais() {

    const { alerta, setAlerta, listaAdicionais, removerAdicional,
        objeto, setEditarAdicional, setAdicional, recuperarAdicional,
        setExibirAdicionais }
        = useContext(PropriedadeContext);

    return (
        <div style={{ padding: '20px' }}>
            <button className="btn btn-secondary" onClick={() => {
                setExibirAdicionais(false);
                setAlerta({ status: "", message: "" });
            }}>
               Voltar <i className="bi bi-backspace"></i>
            </button>
            <h1>Adicionais da propriedade: {objeto.codigo}</h1>
            <Alerta alerta={alerta} />
            <button type="button" className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#modalEdicaoAdicional"
                onClick={() => {
                    setEditarAdicional(false);
                    setAlerta({ status: "", message: "" });
                    setAdicional({
                        codigo: 0,
                        tipo: "", valor_adicional: "", propriedade: objeto.codigo
                    });
                }}>
                Novo
            </button>
            {listaAdicionais.length === 0 &&
                <h1>Nenhum adicional encontrado</h1>}
            {listaAdicionais.length > 0 && (
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col"
                                    style={{ textAlign: 'center' }}>Ações</th>
                                <th scope="col">Código</th>
                                <th scope="col">Tipo</th>
                                <th scope="col">Valor adicional</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaAdicionais.map(adicional => (
                                <tr key={adicional.codigo}>
                                    <td align="center">
                                        <button className="btn btn-info" title="Editar"
                                            data-bs-toggle="modal"
                                            data-bs-target="#modalEdicaoAdicional"
                                            onClick={() => {
                                                recuperarAdicional(adicional.codigo);
                                                setEditarAdicional(true);
                                                setAlerta({ status: "", message: "" });
                                            }}>
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                        <button className="btn btn-danger" title="Remover"
                                            onClick={() => removerAdicional(adicional)}>
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                    <th scope="row">{adicional.codigo}</th>
                                    <td>{adicional.tipo}</td>
                                    <td>{adicional.valor_adicional}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            )}

        </div>
    )

}

export default TabelaAdicionais;