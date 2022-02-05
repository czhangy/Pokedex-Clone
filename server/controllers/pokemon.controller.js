// Import PokeAPI
const Pokedex = require("pokeapi-js-wrapper");
const P = new Pokedex.Pokedex();

// Gets a list of all Pokemon => /api/pokemon/
exports.getPokemon = async (req, res) => {
    // Get all Gen I Pokemon
    const interval = {
        limit: 151,
        offset: 0,
    };
    // Fetch from PokeAPI
    P.getPokemonsList(interval)
        .then((response) => {
            return res.status(200).json(response);
        })
        .catch((err) => {
            return res.status(400).json("Error: " + err);
        });
};
