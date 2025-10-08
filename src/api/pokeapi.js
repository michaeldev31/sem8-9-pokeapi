import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/',
});

export const getPokemons = async (limit = 20, offset = 0) => {
    const response = await api.get(`pokemon?limit=${limit}&offset=${offset}`);
    return response.data;
};

export const getPokemonDetail = async (url) => {
    const response = await axios.get(url);
    return response.data;
}