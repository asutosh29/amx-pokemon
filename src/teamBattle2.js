
// DB
const game = {
    'rounds': 0,
    'commentary': [],//stores the details like A gave this damage to B

}

const player1 = {
    'alias': null,
    'pokemons': [], // stores the details of all the fetched pokemon
    'result': null, // 'win', 'draw', 'loose'
    'currentPokemon': 0,
    'currentMove': null, //stores the move id
    'pokemonsLeft': null,
}
const player2 = {
    'alias': null,
    'pokemons': [], // stores the details of all the fetched pokemon
    'result': null, // 'win', 'draw', 'loose'
    'currentPokemon': 0,
    'currentMove': null, //stores the move id
    'pokemonsLeft': null,
}

function log() {
    console.log("--- Player 1 ---")
    console.log(player1)
    console.log("--- Player 2 ---")
    console.log(player2)
}

async function sleep(ms) {
    new Promise(resolve => setTimeout(resolve, ms));
}

function instructor(...instruction) {

    const instructions = document.getElementById('instructions')
    instructions.innerText = ""
    for (const inst of instruction) {
        const para = document.createElement('p')
        para.innerText = inst
        instructions.appendChild(para)
    }


}

// ASSETS
async function getPokemonData(name) {
    let link = `https://pokeapi.co/api/v2/pokemon/${name}/`
    let pokemonData = await fetch(link)
    let pok = await pokemonData.json()

    const pokemon = {
        'name': 'pikapika',
        'hp': 0,
        'frontSprite': null,
        'backSprite': null,
        'moves': [], // List of 'move' objects
    }
    pokemon.name = pok.name
    pokemon.hp = pok.stats[0].base_stat
    pokemon.frontSprite = pok.sprites.front_default
    pokemon.backSprite = pok.sprites.back_default
    pokemon.moves = [] //List of all moves

    for (let i = 0; i < 4; i++) {

        const move = {
            'name': null,
            'accuracy': null,
            'pp': null,
            'power': null,
        }
        let moveData = await getMoveData(pok.moves[i].move.url)
        move.name = moveData.name
        move.accuracy = moveData.accuracy ? moveData.accuracy : 0
        move.pp = moveData.pp ? moveData.pp : 0
        move.power = moveData.power ? moveData.power : 0
        pokemon.moves.push(move)
    }
    // console.log(pokemon)
    return pokemon
}
async function getMoveData(apiLink) {
    let link = apiLink
    let moveData = await fetch(link)
    let moveDataJson = await moveData.json()
    return moveDataJson
}

function renderPokemon2(pok) {

    const pokName = pok.name
    const hp = pok.hp >= 0 ? `HP: ${pok.hp}` : `Pokemon Dead. Select Alive Pokemon`
    const pokFrontSprite = pok.frontSprite
    const pokBackSprite = pok.backSprite
    const pokMoves = pok.moves //List of all moves

    const pokNameElem = document.getElementById('player2')
    pokNameElem.innerText = `Current Pokemon: ${pokName}`
    const pokHPElem = document.getElementById('hp2')
    pokHPElem.innerText = hp
    const pokFrontSpriteElem = document.querySelector('.right .pokemon_front img')
    pokFrontSpriteElem.src = pokFrontSprite


    const moves = document.getElementById('moves2')
    moves.innerText = ''
    for (let i = 0; i < 4; i++) {
        let moveData = pokMoves[i]

        const move = document.createElement('div')
        move.classList.add('move')
        move.id = `${i}`

        let move_name = document.createElement('p')
        move_name.innerText = `Name: ${moveData.name}`
        let move_accuracy = document.createElement('p')
        move_accuracy.innerText = `Move accuracy: ${moveData.accuracy}`
        let move_pp = document.createElement('p')
        move_pp.innerText = `Move pp: ${moveData.pp}`
        let move_power = document.createElement('p')
        move_power.innerText = `Move power: ${moveData.power}`

        move.append(move_name, move_accuracy, move_pp, move_power)

        moves.append(move)

    }
}

async function renderTeam2() {
    const team = document.querySelector('.right .team')
    team.innerText = ''

    for (let i = 0; i < player2.pokemons.length; i++) {


        const pok = player2.pokemons[i] //i

        if (pok.hp <= 0) {
            continue
        }
        const pokName = pok.name
        const hp = `HP: ${pok.hp}`
        const pokFrontSprite = pok.frontSprite
        const pokBackSprite = pok.backSprite
        const pokMoves = pok.moves //List of all moves


        // DOM Elements
        const member = document.createElement('div')
        member.classList.add('member')
        member.id = i //i

        const pokNameElem = document.createElement('h3')
        pokNameElem.innerText = `Name: ${pokName}`
        const pokHPElem = document.createElement('p')
        pokHPElem.innerText = hp
        const pokFrontSpriteElem = document.createElement('img')
        pokFrontSpriteElem.classList.add('member-img')
        pokFrontSpriteElem.src = pokFrontSprite

        member.append(pokNameElem, pokHPElem, pokFrontSpriteElem)
        team.append(member)
    }
}
function renderPokemon1(pok) {

    const pokName = pok.name
    const hp = `HP: ${pok.hp}`
    const pokFrontSprite = pok.frontSprite
    const pokBackSprite = pok.backSprite
    const pokMoves = pok.moves //List of all moves

    const pokNameElem = document.getElementById('player1')
    pokNameElem.innerText = `Current Pokemon: ${pokName}`
    const pokHPElem = document.getElementById('hp1')
    pokHPElem.innerText = hp
    const pokFrontSpriteElem = document.querySelector('.left .pokemon_front img')
    pokFrontSpriteElem.src = pokFrontSprite


    const moves = document.getElementById('moves1')
    moves.innerText = ''
    for (let i = 0; i < 4; i++) {
        let moveData = pokMoves[i]

        const move = document.createElement('div')
        move.classList.add('move')
        move.id = `${i}`

        let move_name = document.createElement('p')
        move_name.innerText = `Name: ${moveData.name}`
        let move_accuracy = document.createElement('p')
        move_accuracy.innerText = `Move accuracy: ${moveData.accuracy}`
        let move_pp = document.createElement('p')
        move_pp.innerText = `Move pp: ${moveData.pp}`
        let move_power = document.createElement('p')
        move_power.innerText = `Move power: ${moveData.power}`

        move.append(move_name, move_accuracy, move_pp, move_power)

        moves.append(move)

    }
}

async function renderTeam1() {
    const team = document.querySelector('.left .team')
    team.innerText = ''

    for (let i = 0; i < player1.pokemons.length; i++) {


        const pok = player1.pokemons[i] //i

        if (pok.hp <= 0) {
            continue
        }
        const pokName = pok.name
        const hp = `HP: ${pok.hp}`
        const pokFrontSprite = pok.frontSprite
        const pokBackSprite = pok.backSprite
        const pokMoves = pok.moves //List of all moves


        // DOM Elements
        const member = document.createElement('div')
        member.classList.add('member')
        member.id = i //i

        const pokNameElem = document.createElement('h3')
        pokNameElem.innerText = `Name: ${pokName}`
        const pokHPElem = document.createElement('p')
        pokHPElem.innerText = hp
        const pokFrontSpriteElem = document.createElement('img')
        pokFrontSpriteElem.classList.add('member-img')
        pokFrontSpriteElem.src = pokFrontSprite

        member.append(pokNameElem, pokHPElem, pokFrontSpriteElem)
        team.append(member)
    }
}

async function initPlayer1(alias, pokemons) {
    // fetch the pokemons
    // update the UI
    // update the Object

    player1.alias = alias
    document.getElementById('player1Alias').innerText = `Player 1: ${alias}`

    // Get all the Pokemons
    for (let i = 0; i < pokemons.length; i++) {
        console.log('loading ', i)
        const newPokemon = await getPokemonData(pokemons[i])
        player1.pokemons.push(newPokemon)
    }
    renderPokemon1(player1.pokemons[player1.currentPokemon])
    renderTeam1(player1.pokemons)

    player1.pokemonsLeft = player1.pokemons.length
    player1.currentPokemon = 0
}
async function initPlayer2(alias, pokemons) {
    // fetch the pokemons
    // update the UI
    // update the Object

    player2.alias = alias
    document.getElementById('player2Alias').innerText = `Player 2: ${alias}`

    // Get all the Pokemons
    for (let i = 0; i < pokemons.length; i++) {
        console.log('loading ', i)
        const newPokemon = await getPokemonData(pokemons[i])
        player2.pokemons.push(newPokemon)
    }
    renderPokemon2(player2.pokemons[player2.currentPokemon])
    renderTeam2(player2.pokemons)

    player2.pokemonsLeft = player2.pokemons.length
    player2.currentPokemon = 0
}

function changePokemon1(e) {
    if (e.target.classList.contains('member-img')) {
        const newPokemonID = e.target.parentElement.id
        player1.currentPokemon = newPokemonID
        player1.currentMove = null
        const newPokemon = player1.pokemons[newPokemonID]
        renderPokemon1(newPokemon)
    }
}
function changePokemon2(e) {
    if (e.target.classList.contains('member-img')) {
        const newPokemonID = e.target.parentElement.id
        player2.currentPokemon = newPokemonID
        player2.currentMove = null
        const newPokemon = player2.pokemons[newPokemonID]
        renderPokemon2(newPokemon)
    }
}


function selectMove1(e) {
    if (e.target.tagName === 'P') {
        console.log("Player 1 selected move: ", e.target.parentElement.id)
        // console.log("Element: ", e.target.tagName)
        moveId = e.target.parentElement.id
        let parent = e.target.parentElement
        for (const child of player1Moves.children) {
            child.classList.remove('selectedMove')
        }
        parent.classList.add('selectedMove')
        player1.currentMove = parseInt(parent.id)
    }
}
function selectMove2(e) {
    if (e.target.tagName === 'P') {
        console.log("Player 2 selected move: ", e.target.parentElement.id)
        // console.log("Element: ", e.target.tagName)
        moveId = e.target.parentElement.id
        let parent = e.target.parentElement
        for (const child of player2Moves.children) {
            child.classList.remove('selectedMove')
        }
        parent.classList.add('selectedMove')
        player2.currentMove = parseInt(parent.id)
    }
}

async function computeDamage() {
    const mult = 0.4
    const pok1 = player1.pokemons[player1.currentPokemon]
    const pok2 = player2.pokemons[player2.currentPokemon]



    console.log(`Player 1 used: `, pok1.moves[player1.currentMove])
    instructor(`Player 1 used: `, pok1.moves[player1.currentMove])

    pok2.hp -= mult * pok1.moves[player1.currentMove].power
    if (pok2.hp <= 0) {
        instructor(pok2.name, ' died in Battle.')
        player2.pokemonsLeft--;
        player2.currentMove = null
        player2.currentPokemon = null
    } else {
        pok1.hp -= mult * pok1.moves[player2.currentMove].power
        console.log(`Player 2 used: `, pok2.moves[player2.currentMove])
        instructor(`Player 2 used: `, pok2.moves[player2.currentMove])
        if (pok1.hp <= 0) {
            console.log(pok1.name, ' died in Battle.')
            player1.pokemonsLeft--;
            player1.currentMove = null
            player1.currentPokemon = null
        }
    }
    renderPokemon2(pok2)
    renderPokemon1(pok1)
    if (player1.pokemonsLeft === 0) {
        console.log('Player 2 Won!')
        return
    } else if (player2.pokemonsLeft === 0) {
        console.log('Player 1 Won!')
        return

    }
    
    




}

async function battle() {

    if (player1.pokemonsLeft === 0) {
        console.log('Player 2 Won!')
        return
    } else if (player2.pokemonsLeft === 0) {
        console.log('Player 1 Won!')
        return

    }
    if (player1.currentPokemon === null || player2.currentPokemon === null) {
        console.log('Please Choose a Valid Pokemon')
        return
    }
    if (player1.currentMove === null || player2.currentMove === null) {
        console.log('Please Choose Moves first')
        return
    }
    console.log('--- Battle Started ---')
    await computeDamage()



}

function startGame() {
    let alias1 = 'AMX'
    let pokemons1 = ['pikachu', 'charmander']
    initPlayer1(alias1, pokemons1)
    let alias2 = 'BMX'
    let pokemons2 = ['bulbasaur', 'squirtle']
    initPlayer2(alias2, pokemons2)
    // Select Moves! if Both Selected then Battle Button
    // onclick(battle)
}

startGame()

const team1 = document.querySelector('.left .team')
team1.addEventListener('click', changePokemon1)

const player1Moves = document.getElementById('moves1')
player1Moves.addEventListener('click', selectMove1)

const team2 = document.querySelector('.right .team')
team2.addEventListener('click', changePokemon2)

const player2Moves = document.getElementById('moves2')
player2Moves.addEventListener('click', selectMove2)



const battleBtn = document.getElementById('battle-btn')
battleBtn.addEventListener('click', battle)

