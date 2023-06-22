import axios from "axios";

const fetchSpotifyApi = async (url: string) => {
    const token = await getSpotifyAuthToken();

    if (token) {
        try {
            const response = await axios.get(
                process.env.SPOTIFY_BASE_URL + url,
                {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });

            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            return null
        }
    }
}

const getSpotifyAuthToken = async () => {
    const options = {
        url: process.env.SPOTIFY_TOKEN_URL,
        headers: {
            'Authorization': 'Basic ' + Buffer.from(process.env.SPOTIFY_USER_ID + ':' + process.env.SPOTIFY_USER_SECRET).toString('base64')
        },
        data: 'grant_type=client_credentials'
    };

    const fetchToken = async () => {
        try {
            const response = await axios.post(
                options.url,
                options.data,
                {headers: options.headers});

            if (response.status === 200) {
                return response.data.access_token;
            }
        } catch (error) {
            return null
        }
    }

    return fetchToken()
}

export default fetchSpotifyApi