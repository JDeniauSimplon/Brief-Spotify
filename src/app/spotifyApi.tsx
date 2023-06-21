import axios, { AxiosResponse } from "axios"; // npm install axios

let api_key: (string | null) = null

/*
Si api_key est null il va reset la variable (pour lui ajouter une clé valable)
et finalement retourner la valeur de api_key
*/
export async function getAPIKey(): Promise<string> {
    if(api_key === null){
        await resetAPIKey();
    }
    return api_key;
}

/*
Ce reset va faire une requête vers l'API de Spotify et actualiser les
données de la variable api_key
*/
export async function resetAPIKey() {
    axios.post("https://accounts.spotify.com/api/token",
    "grant_type=client_credentials&client_id=ton_client_id&client_secret=ton_client_secret",
    {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(response => {
        api_key = response.data.access_token;
        
    });
}

interface SpotifyAPI {
    method: string,
    data: (JSON | string)
}

/*
la fonction async "api" prend en paramètre "endpoint" (string) et "params" (un JSON).
le JSON de "params" ne contient que les clés "method" (pour déterminer s'il faut une requête GET ou POST)
et "data" s'il faut envoyer des données.
Si la méthode est GET, alors les données seront transmises dans l'url, exemple:

data = "q=eminem"
-> https://api.spotify.com/v1/artist?q=eminem

Les requêtes en fin de compte elles sont quasi pareil, elles font la même chose sauf que:
- c'est soit la méthode GET soit la méthode POST
- les données (optionnelles) sont transmises d'une manière différente

/!\ IMPORTANT DE LIRE /!\
---------------------------
Vu que c'est une fonction asyncrone (async) elle nous retournera un objet de type Promise<quelque chose>
(une promesse, voir https://agreeable-bread-63e.notion.site/Quarter-backend-44bd1415abb5415a8868d1909db6e449?p=6a10ca77b3bc4571aa7f25bc9c97b8ab&pm=c)

Donc pour obtenir les données faut faire comme ceci:

+++++++++++++++++++++++++++++++++++

const test = await api("random", {method: "GET", data: ""}) // Ceci fera une requête GET vers https://api.spotify.com/v1/random sans données
console.log(test)

+++++++++++++++++++++++++++++++++++

*/


export async function api(endpoint: string, params: SpotifyAPI): Promise<AxiosResponse> {
    if(params.method.toUpperCase() === "GET"){
            return axios.get(`https://api.spotify.com/v1/${endpoint}?${params.data}`,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${api_key}`
                }
            
            }).then(response => response.data);
        
    }else {
        return axios.post(`https://api.spotify.com/v1/${endpoint}`, params.data,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${api_key}`
                }
            
            }).then(response => response.data);
    }
    
}
