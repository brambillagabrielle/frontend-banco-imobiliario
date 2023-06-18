import { useState, useEffect } from "react";
import PropriedadeContext from "./PropriedadeContext";
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import { getJogadoresAPI } from '../../servicos/JogadorServico';
import { getPropriedadesAPI, getPropriedadePorCodigoAPI, deletePropriedadePorCodigoAPI, cadastraPropriedadesAPI } from '../../servicos/PropriedadeServico'
import {
    getAdicionaisDaPropriedadeAPI, getAdicionalPorCodigoAPI,
    deleteAdicionalPorCodigoAPI, cadastraAdicionaisAPI
} from '../../servicos/AdicionalServico';
import FormAdicional from "./FormAdicional";
import TabelaAdicionais from "./TabelaAdicionais";
import WithAuth from "../../seg/WithAuth";
import { useNavigate } from "react-router-dom";


function Propriedade() {

    let navigate = useNavigate();

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", nome: "",
        cor: "", valor: "", aluguel: ""
    });
    const [carregando, setCarregando] = useState(true);
    const [listaJogadores, setListaJogadores] = useState([]);
    const [editarAdicional, setEditarAdicional] = useState(false);
    const [adicional, setAdicional] = useState({
        codigo: "", tipo: "", valor_adicional: "", propriedade: ""
    })
    const [listaAdicionais, setListaAdicionais] = useState([]);
    const [exibirAdicionais, setExibirAdicionais] = useState(false);

    const recuperarAdicionais = async codigopropriedade => {

        console.log("Código propriedade: ", codigopropriedade)
        try {
            setObjeto(await getPropriedadePorCodigoAPI(codigopropriedade));
            setListaAdicionais(await getAdicionaisDaPropriedadeAPI(codigopropriedade));
            setExibirAdicionais(true);
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const recuperarAdicional = async codigo => {
        try {
            setAdicional(await getAdicionalPorCodigoAPI(codigo));
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const removerAdicional = async adicional => {
        if (window.confirm('Deseja remover este adicional?')) {
            let retornoAPI =
                await deleteAdicionalPorCodigoAPI(adicional.codigo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setListaAdicionais(await getAdicionaisDaPropriedadeAPI(objeto.codigo));
        }
    }

    const acaoCadastrarAdicional = async e => {
        e.preventDefault();
        const metodo = editarAdicional ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraAdicionaisAPI(adicional, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editarAdicional) {
                setEditarAdicional(true);
            }
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
        recuperarAdicionais(objeto.codigo);
    }

    const handleChangeAdicional= (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setAdicional({ ...adicional, [name]: value });
    }

    const recuperar = async codigo => {
        try {
            setObjeto(await getPropriedadePorCodigoAPI(codigo));
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraPropriedadesAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
        recuperaPropriedades();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const recuperaPropriedades = async () => {
        try {
            setCarregando(true);
            setListaObjetos(await getPropriedadesAPI());
            setCarregando(false);
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const recuperaJogadores = async () => {
        setListaJogadores(await getJogadoresAPI());
    }

    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                let retornoAPI = await deletePropriedadePorCodigoAPI(objeto.codigo);
                setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            } catch (err) {
                console.log(err);
                window.location.reload();
                navigate("/login", { replace: true });
            }
        }
        recuperaPropriedades();
    }

    useEffect(() => {
        recuperaPropriedades();
        recuperaJogadores();
    }, []);

    return (
        <PropriedadeContext.Provider value={{
            alerta, setAlerta,
            listaObjetos, setListaObjetos,
            recuperaJogadores, remover,
            objeto, setObjeto,
            editar, setEditar,
            recuperar, acaoCadastrar, handleChange, listaJogadores,
            listaAdicionais, adicional, setAdicional, handleChangeAdicional,
            removerAdicional, recuperarAdicional, acaoCadastrarAdicional,
            setEditarAdicional, editarAdicional, recuperarAdicionais,
            setExibirAdicionais
        }}>
            <Carregando carregando={carregando}>
                {!exibirAdicionais ? <Tabela /> : <TabelaAdicionais />}
            </Carregando>
            <Form />
            <FormAdicional />
        </PropriedadeContext.Provider>
    )

}

export default Propriedade;