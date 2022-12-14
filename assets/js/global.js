
const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonList = document.getElementById('pokemonList')

const maxRecords = 1151
const limit = 151
let offset = 0;
//Aqui a gente usa crase//
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
// Eu vou chamar o fetch, depois, quando vier a resposta, o then pega a resposta.//

//tu olha a página, lá no "inspecionar">>>"console" e o status "200" significa que está tudo ok.//
// arrow é "=>" para  indicar uma função.//
//O .then já puxa o retorno do .then anterior
function convertPokemonToHtml(pokemon){
    return `
    <li class="pokemon ${pokemon.type}">
            <span class="number">#00${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            
            
            <div class="detail">
                  
                <ol class="types">
                <h2 class="tipo"> Tipo </h2>  
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>

            
         </li>    
        `

}


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToHtml).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

console