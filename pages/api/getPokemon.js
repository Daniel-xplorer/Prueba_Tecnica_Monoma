import axios from "axios";

export const handlerGetPokemon = async (req, res) => {
    const { name } = req.query;
    console.log(name);
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Server error', status: 500 });
    };
    res.status(200).json(response);
};