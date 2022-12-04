const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}
//esse 'pokemon' é que vai servir de referência para os demais termos 'pokemon'

//A gente pode digitar o function como '()=>{}'//
pokeApi.getPokemonDetail = (pokemon) =>{
    return fetch (pokemon.url).then((response) =>response.json())
    .then(convertPokeApiDetailToPokemon)

}

pokeApi.getPokemons = function (offset = 0, limit = 10){
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    
    return fetch(url) 
                    .then((response) => response.json())
                    .then((Object)=> Object.results)
                    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
                    .then((detailRequests) => Promise.all(detailRequests))
                    .then((pokemonsDetails) => pokemonsDetails)

}

 