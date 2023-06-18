import { useState, useEffect } from "react";
import JogadorContext from "./JogadorContext";
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import { getJogadoresAPI, getJogadorPorCodigoAPI, deleteJogadorPorCodigoAPI, cadastraJogadoresAPI } from '../../servicos/JogadorServico';
import WithAuth from "../../seg/WithAuth";
import { useNavigate } from "react-router-dom";

function Jogador() {

    let navigate = useNavigate();

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", nome: "",
        saldo: ""
    });
    const [carregando, setCarregando] = useState(true);

    const recuperar = async codigo => {
        try {
            setObjeto(await getJogadorPorCodigoAPI(codigo));
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraJogadoresAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            console.log(err);
            window.location.reload();
            navigate("/login", { replace: true });
        }
        recuperaJogadores();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const recuperaJogadores = async () => {
        try {
            setCarregando(true);
            setListaObjetos(await getJogadoresAPI());
            setCarregando(false);
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                let retornoAPI = await deleteJogadorPorCodigoAPI(objeto.codigo);
                setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            } catch (err) {
                window.location.reload();
                navigate("/login", { replace: true });
            }
        }
        recuperaJogadores();
    }

    useEffect(() => {
        recuperaJogadores();
    }, []);

    return (
        <JogadorContext.Provider value={{
            alerta, setAlerta,
            listaObjetos, setListaObjetos,
            recuperaJogadores, remover,
            objeto, setObjeto,
            editar, setEditar,
            recuperar, acaoCadastrar, handleChange
        }}>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Form />
        </JogadorContext.Provider>
    )

}

export default WithAuth(Jogador);