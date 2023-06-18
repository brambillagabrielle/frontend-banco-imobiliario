import Autenticacao from "../seg/Autenticacao";

export const getJogadoresAPI = async () => {
    const response = 
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/jogadores`,
        {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "x-access-token": Autenticacao.pegaAutenticacao().token
            }
        });
    const data = await response.json();
    return data;
}

export const getJogadorPorCodigoAPI = async codigo => {
    const response = 
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/jogadores/${codigo}`,
        {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "x-access-token": Autenticacao.pegaAutenticacao().token
            }
        });
    const data = await response.json();
    return data;
}

export const deleteJogadorPorCodigoAPI = async codigo => {
    const response = 
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/jogadores/${codigo}`,
        {
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json",
                "x-access-token": Autenticacao.pegaAutenticacao().token
            }
        });
    const data = await response.json();
    return data;
}

export const cadastraJogadoresAPI = async (objeto, metodo) => {
    const response = 
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/jogadores`,
        {
            method : metodo,
            headers : {"Content-Type" : "application/json",
            "x-access-token": Autenticacao.pegaAutenticacao().token},
            body : JSON.stringify(objeto)
        });
    const data = await response.json();
    return data;
}
