import { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import JogadorContext from "./JogadorContext";
import CampoEntrada from "../../comuns/CampoEntrada";
import Dialogo from "../../comuns/Dialogo";

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta } =
        useContext(JogadorContext);

    return (
        <Dialogo id="modalEdicao" titulo="Jogador"
            acaoCadastrar={acaoCadastrar} idform="formulario">
            <Alerta alerta={alerta} />
            <CampoEntrada id="txtCodigo" label="Código"
                tipo="number" name="codigo" value={objeto.codigo}
                onchange={handleChange} requerido={false}
                readonly={true} />
            <CampoEntrada id="txtNome" label="Nome"
                tipo="text" name="nome" value={objeto.nome}
                onchange={handleChange} requerido={true}
                readonly={false} maxlength={40}
                msgvalido="Nome OK"
                msginvalido="Informe o nome" />
            <CampoEntrada id="txtSaldo" label="Saldo"
                tipo="number" name="saldo"
                value={objeto.saldo}
                onchange={handleChange} requerido={true}
                readonly={false} maxlength={10}
                msgvalido="Saldo OK"
                msginvalido="Informe a saldo" />
        </Dialogo>
    )

}

export default Form;