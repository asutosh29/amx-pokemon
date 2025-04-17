async function getPokemonData(name) {
    let link = `https://pokeapi.co/api/v2/pokemon/${name}/`
    let pokemonData = await fetch(link)
    let pokemonDataJson = await pokemonData.json()
    return pokemonDataJson
}

async function getMoveData(apiLink) {
    let link = apiLink
    let moveData = await fetch(link)
    let moveDataJson = await moveData.json()
    return moveDataJson
}

async function renderPokemon(name) {
    const pok = await getPokemonData(name)
    const pokName = pok.name
    const hp = `HP: ${pok.stats[0].base_stat}`
    const pokFrontSprite = pok.sprites.front_default
    const pokBackSprite = pok.sprites.back_default
    const pokMoves = pok.moves //List of all moves
    console.log(pok)

    const pokNameElem = document.getElementById('pokemon_name')
    pokNameElem.innerText = pokName
    const pokHPElem = document.getElementById('pokemon_hp')
    pokHPElem.innerText = hp

    const pokFrontSpriteElem = document.getElementById('pokeFront')
    pokFrontSpriteElem.src = pokFrontSprite
    const pokBackSpriteElem = document.querySelector('.pokemon_back img')
    pokBackSpriteElem.src = pokBackSprite

    const moves = document.getElementById('moves')

    console.log("Name: ", pokName)
    console.log("HP: ", pok.stats[0].base_stat)
    console.log("sprites: ", pokFrontSprite, pokBackSprite)
    // console.log("Moves: ", pokMoves)
    console.log("MOVE DATA:")
    for (let i = 0; i < 4; i++) {
        let moveData = await getMoveData(pokMoves[i].move.url)

        const move = document.createElement('div')
        move.classList.add('move')
        
        let move_name = document.createElement('p')
        move_name.innerText = `Name: ${moveData.name}`
        let move_accuracy = document.createElement('p')
        move_accuracy.innerText = `Move type: ${moveData.accuracy}`
        let move_pp = document.createElement('p')
        move_pp.innerText = `Move pp: ${moveData.accuracy}`
        let move_power = document.createElement('p')
        move_power.innerText = `Move power: ${moveData.power}`
        move.append(move_name, move_accuracy, move_pp, move_power)

        moves.append(move)


        console.log("name: ", moveData.name)
        console.log("acc: ", moveData.accuracy)
        console.log("pp: ", moveData.pp)
        console.log("power: ", moveData.power)
    }
}

renderPokemon('pikachu')