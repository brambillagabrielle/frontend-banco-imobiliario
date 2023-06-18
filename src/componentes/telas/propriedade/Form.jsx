import { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import PropriedadeContext from "./PropriedadeContext";
import CampoEntrada from "../../comuns/CampoEntrada";
import Dialogo from "../../comuns/Dialogo";

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta, listaJogadores } =
        useContext(PropriedadeContext);

    return (
        <Dialogo id="modalEdicao" titulo="Propriedade"
            acaoCadastrar={acaoCadastrar} idform="formulario">
            <Alerta alerta={alerta} />
            <CampoEntrada id="txtCodigo" label="Código"
                tipo="number" name="codigo" value={objeto.codigo}
                onchange={handleChange} requerido={false}
                readonly={true} />
            <CampoEntrada id="txtNome" label="Nome"
                tipo="text" name="nome"
                value={objeto.nome}
                onchange={handleChange} requerido={true}
                readonly={false} maxlength={40}
                msgvalido="Nome OK"
                msginvalido="Informe o nome" />
            <div class="mb-3">
                <label htmlFor="selectCor"
                    className="form-label">Cor</label>
                <select className="form-control"
                    required
                    value={objeto.cor}
                    name="cor" onChange={handleChange}>
                    <option disabled="true" value="">
                        Selecione a Cor
                    </option>
                    <option value="Vermelho">
                        Vermelho
                    </option>
                    <option value="Amarelo">
                        Amarelo
                    </option>
                    <option value="Verde">
                        Verde
                    </option>
                    <option value="Azul">
                        Azul
                    </option>
                </select>
                <div class="valid-feedback">
                    Cor OK
                </div>
                <div class="invalid-feedback">
                    Informe a cor
                </div>
            </div>
            <CampoEntrada id="txtValor" label="Valor"
                tipo="number" name="valor" value={objeto.valor}
                onchange={handleChange} requerido={true}
                readonly={false} maxlength={10}
                msgvalido="Valor OK"
                msginvalido="Informe o valor" />
            <CampoEntrada id="txtAluguel" label="Aluguel"
                tipo="number" name="aluguel" value={objeto.aluguel}
                onchange={handleChange} requerido={true}
                readonly={false} maxlength={10}
                msgvalido="Aluguel OK"
                msginvalido="Informe o aluguel" />
            <div class="mb-3">
                <label htmlFor="selectProprietario"
                    className="form-label">Jogador</label>
                <select className="form-control"
                    required
                    value={objeto.proprietario}
                    name="proprietario" onChange={handleChange}>
                    <option disabled="true" value="">
                        Selecione o proprietário
                    </option>
                    {
                        listaJogadores.map((jogador) => (
                            <option key={jogador.codigo} value={jogador.codigo}>
                                {jogador.nome}
                            </option>
                        ))
                    }
                </select>
                <div class="valid-feedback">
                    Jogador OK
                </div>
                <div class="invalid-feedback">
                    Informe o jogador
                </div>
            </div>
        </Dialogo>
    )

}

export default Form;