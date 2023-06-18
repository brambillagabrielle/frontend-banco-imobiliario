import { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import PropriedadeContext from "./PropriedadeContext";
import CampoEntrada from "../../comuns/CampoEntrada";
import Dialogo from "../../comuns/Dialogo";

function FormAdicional() {

    const { adicional, handleChangeAdicional,
        acaoCadastrarAdicional, alerta } = useContext(PropriedadeContext);

    return (
        <Dialogo id="modalEdicaoAdicional" titulo="Adicional"
            acaoCadastrar={acaoCadastrarAdicional}
            idform="formularioAdicional">
            <Alerta alerta={alerta} />
            <CampoEntrada id="txtCodigo" label="Código"
                tipo="number" name="codigo" value={adicional.codigo}
                onchange={handleChangeAdicional} requerido={false}
                readonly={true} />
            <div class="mb-3">
                <label htmlFor="selectTipo"
                    className="form-label">Tipo</label>
                <select className="form-control"
                    required
                    value={adicional.tipo}
                    name="tipo" onChange={handleChangeAdicional}>
                    <option disabled="true" value="">
                        Selecione o tipo
                    </option>
                    <option value="casa">Casa</option>
                    <option value="hotel">Hotel</option>
                </select>
                <div class="valid-feedback">
                    Tipo OK
                </div>
                <div class="invalid-feedback">
                    Informe o tipo
                </div>
            </div>
            <CampoEntrada id="txtValorAdicional" label="Valor Adicional"
                tipo="number" name="valor_adicional" value={adicional.valor_adicional}
                onchange={handleChangeAdicional} requerido={true}
                readonly={false} maxlength={10}
                msgvalido="Valor adicional OK"
                msginvalido="Informe o valor adicional" />
        </Dialogo>
    )

}

export default FormAdicional;