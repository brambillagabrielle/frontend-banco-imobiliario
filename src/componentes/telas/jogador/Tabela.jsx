import { useContext } from "react";
import JogadorContext from "./JogadorContext";
import Alerta from '../../comuns/Alerta'

function Tabela() {

    const { alerta, setAlerta, listaObjetos, remover,
        setEditar, setObjeto, recuperar }
        = useContext(JogadorContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Jogadores</h1>
            <Alerta alerta={alerta} />
            <button type="button" className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#modalEdicao"
                onClick={() => {
                    setEditar(false);
                    setAlerta({ status: "", message: "" });
                    setObjeto({
                        codigo: 0,
                        nome: "", saldo: ""
                    });

                }}>
                Novo
            </button>
            {listaObjetos.length === 0 &&
                <h1>Nenhuma jogador encontrado</h1>}
            {listaObjetos.length > 0 && (
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col"
                                    style={{ textAlign: 'center' }}>Ações</th>
                                <th scope="col">Código</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Saldo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaObjetos.map(objeto => (
                                <tr key={objeto.codigo}>
                                    <td align="center">
                                        <button className="btn btn-info" title="Editar"
                                            data-bs-toggle="modal"
                                            data-bs-target="#modalEdicao"
                                            onClick={() => {
                                                recuperar(objeto.codigo);
                                                setEditar(true);
                                                setAlerta({ status: "", message: "" });
                                            }}>
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                        <button className="btn btn-danger" title="Remover"
                                            onClick={() => remover(objeto)}>
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                    <th scope="row">{objeto.codigo}</th>
                                    <td>{objeto.nome}</td>
                                    <td>{objeto.saldo}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            )}

        </div>
    )

}

export default Tabela;