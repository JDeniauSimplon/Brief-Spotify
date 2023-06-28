import axios, { AxiosResponse } from "axios";

interface SpotifyAuthTokenResponse {
  access_token: string;
}

const getSpotifyAuthToken = async (): Promise<string | null> => {
  const clientId = process.env.SPOTIFY_USER_ID;
  const clientSecret = process.env.SPOTIFY_USER_SECRET;
  const tokenUrl = process.env.SPOTIFY_TOKEN_URL;

  if (!clientId || !clientSecret || !tokenUrl) {
    console.error('Environment variables for Spotify authentication are missing');
    return null;
  }

  const options = {
    url: tokenUrl,
    headers: {
      'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
    },
    data: 'grant_type=client_credentials',
  };

  try {
    const response: AxiosResponse<SpotifyAuthTokenResponse> = await axios.post(
      options.url,
      options.data,
      { headers: options.headers }
    );

    if (response.status === 200) {
      return response.data.access_token;
    }
  } catch (error) {
    console.error(error);
    return null;
  }

  return null;
};

const fetchSpotifyApi = async (url: string): Promise<any | null> => {
  const baseUrl = process.env.SPOTIFY_BASE_URL;

  if (!baseUrl) {
    console.error('Environment variable for Spotify base URL is missing');
    return null;
  }

  const token = await getSpotifyAuthToken();

  if (token) {
    try {
      const response: AxiosResponse = await axios.get(
        `${baseUrl}${url}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  return null;
};

export default fetchSpotifyApi;
