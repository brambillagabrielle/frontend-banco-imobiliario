import Autenticacao from "../seg/Autenticacao";

export const getAdicionaisDaPropriedadeAPI = async codigopropriedade => {
    const response =
        await
            fetch(`${process.env.REACT_APP_ENDERECO_API}/adicionais/propriedade/${codigopropriedade}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": Autenticacao.pegaAutenticacao().token
                    }
                });
    const data = await response.json();
    return data;
}

export const getAdicionalPorCodigoAPI = async codigopropriedade => {
    const response =
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/adicionais/${codigopropriedade}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": Autenticacao.pegaAutenticacao().token
                }
            });
    const data = await response.json();
    return data;
}

export const deleteAdicionalPorCodigoAPI = async codigo => {
    const response =
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/adicionais/${codigo}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": Autenticacao.pegaAutenticacao().token
                }
            });
    const data = await response.json();
    return data;
}

export const cadastraAdicionaisAPI = async (objeto, metodo) => {
    const response =
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/adicionais`,
            {
                method: metodo,
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": Autenticacao.pegaAutenticacao().token
                },
                body: JSON.stringify(objeto)
            });
    const data = await response.json();
    return data;
}