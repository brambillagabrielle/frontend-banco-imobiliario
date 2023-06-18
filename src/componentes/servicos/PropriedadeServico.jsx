import Autenticacao from "../seg/Autenticacao";

export const getPropriedadesAPI = async () => {
    const response =
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/propriedades`,
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

export const getPropriedadePorCodigoAPI = async codigo => {
    const response =
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/propriedades/${codigo}`,
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

export const deletePropriedadePorCodigoAPI = async codigo => {
    const response =
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/propriedades/${codigo}`,
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

export const cadastraPropriedadesAPI = async (objeto, metodo) => {
    const response =
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/propriedades`,
            {
                method: metodo,
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": Autenticacao.pegaAutenticacao().token
                },
                body: JSON.stringify(objeto),

            });
    const data = await response.json();
    return data;
}
