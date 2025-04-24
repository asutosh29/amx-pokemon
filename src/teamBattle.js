/*
// POKEMON Object blueprint
const pokemon = {
    'name':'pikapika',
    'hp':0,
    'frontSprite':null,
    'backSprite':null,
    'moves':[], // List of 'move' objects
}
// Move Object blueprint
const move = {
    'name':null,
    'accuracy':null,
    'pp':null,
    'power':null,
}
*/




function log() {
    console.log("--- Player 1 ---")
    console.log(player1)
    console.log("--- Player 2 ---")
    console.log(player2)
}

// DB
const game = {
    'rounds': 0,
    'commentary': [],//stores the details like A gave this damage to B

}

const player1 = {
    'alias': null,
    'pokemons': [], // stores the details of all the fetched pokemon
    'result': null, // 'win', 'draw', 'loose'
    'currentPokemon': null,
    'currentMove': null, //stores the move id
    'pokemonsLeft': null,
}
const player2 = {
    'alias': null,
    'pokemons': [], // stores the details of all the fetched pokemon
    'result': null, // 'win', 'draw', 'loose'
    'currentPokemon': null,
    'currentMove': null, //stores the move id
    'pokemonsLeft': null,
}



// Utils
async function instructor(...instruction) {

    const instructionsId = document.getElementById('instructions')
    instructionsId.innerText = ""
    for (const inst of instruction) {
        const para = document.createElement('p')
        para.innerText = inst
        instructionsId.appendChild(para)
    }
}
async function loading(...instruction) {

    const instructionsId = document.getElementById('loadingInstruction')
    instructionsId.innerText = ""
    for (const inst of instruction) {
        const para = document.createElement('p')
        para.innerText = inst
        instructionsId.appendChild(para)
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
        'base_hp': 0,
        'frontSprite': null,
        'backSprite': null,
        'moves': [], // List of 'move' objects
    }

    pokemon.name = pok.name
    pokemon.hp = pok.stats[0].base_stat
    pokemon.base_hp = pok.stats[0].base_stat
    pokemon.frontSprite = pok.sprites.front_default
    pokemon.frontSpriteGIF = pok.sprites.other.showdown.front_default ? pok.sprites.other.showdown.front_default : pok.sprites.front_default
    pokemon.backSprite = pok.sprites.back_default
    pokemon.backSpriteGIF = pok.sprites.other.showdown.back_default ? pok.sprites.other.showdown.back_default : pok.sprites.back_default
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
    console.log(pokemon)
    return pokemon
}
async function getMoveData(apiLink) {
    let link = apiLink
    let moveData = await fetch(link)
    let moveDataJson = await moveData.json()
    return moveDataJson
}


async function renderPokemon1(pok) {


    const pokName = pok.name
    const hp = `HP: ${pok.hp}`
    const pokFrontSprite = pok.frontSprite
    const pokFrontSpriteGIF = pok.frontSpriteGIF
    const pokBackSprite = pok.backSprite
    const pokBackSpriteGIF = pok.backSpriteGIF
    const pokMoves = pok.moves //List of all moves

    const pokNameElem = document.getElementById('player1')
    pokNameElem.innerText = `${pokName}`
    const pokHPElem = document.getElementById('hp1')
    pokHPElem.innerText = hp
    const pokFrontSpriteElem = document.querySelector('.left .pokemon_front img')
    pokFrontSpriteElem.src = pokFrontSprite


    const moves = document.getElementById('moves1')
    moves.innerText = ''
    console.log("MOVE DATA:")
    for (let i = 0; i < 4; i++) {
        let moveData = pokMoves[i]

        const move = document.createElement('div')
        move.classList.add('move')
        move.id = `${i}`

        let move_name = document.createElement('p')
        move_name.classList.add('move-name')
        move_name.innerText = `${moveData.name}`
        let move_accuracy = document.createElement('p')
        move_accuracy.innerText = `accuracy: ${moveData.accuracy}`
        let move_pp = document.createElement('p')
        move_pp.innerText = `pp: ${moveData.pp}`
        let move_power = document.createElement('p')
        move_power.innerText = `power: ${moveData.power}`

        move.append(move_name, move_accuracy, move_pp, move_power)

        moves.append(move)

    }

    const battlePokemon = document.getElementById("pokemonBattle1")
    battlePokemon.src = pokBackSpriteGIF
}
async function renderPokemon2(pok) {
    const pokName = pok.name
    const hp = `HP: ${pok.hp}`
    const pokFrontSprite = pok.frontSprite
    const pokFrontSpriteGIF = pok.frontSpriteGIF
    const pokBackSprite = pok.backSprite
    const pokBackSpriteGIF = pok.backSpriteGIF
    const pokMoves = pok.moves //List of all moves

    const pokNameElem = document.getElementById('player2')
    pokNameElem.innerText = `${pokName}`
    const pokHPElem = document.getElementById('hp2')
    pokHPElem.innerText = hp
    const pokFrontSpriteElem = document.querySelector('.right .pokemon_front img')
    pokFrontSpriteElem.src = pokFrontSprite


    const moves = document.getElementById('moves2')
    moves.innerText = ''
    console.log("MOVE DATA:")
    for (let i = 0; i < 4; i++) {
        let moveData = pokMoves[i]

        const move = document.createElement('div')
        move.classList.add('move')
        move.id = `${i}`

        let move_name = document.createElement('p')
        move_name.classList.add('move-name')
        move_name.innerText = `${moveData.name}`
        let move_accuracy = document.createElement('p')
        move_accuracy.innerText = `accuracy: ${moveData.accuracy}`
        let move_pp = document.createElement('p')
        move_pp.innerText = `pp: ${moveData.pp}`
        let move_power = document.createElement('p')
        move_power.innerText = `power: ${moveData.power}`

        move.append(move_name, move_accuracy, move_pp, move_power)

        moves.append(move)

    }

    const battlePokemon = document.getElementById("pokemonBattle2")
    battlePokemon.src = pokFrontSpriteGIF
}

function updatePokemon1(pok) {
    const hp1 = document.getElementById('hp1')
    const hp1Bar = document.getElementById('hp1Bar')
    if (pok.hp <= 0) {
        pok.hp = 0
        hp1.innerText = `HP: ${0}`
    } else {
        hp1.innerText = `HP: ${pok.hp}`
    }
    hp1Bar.style.width = `${pok.hp / pok.base_hp * 100}%`
}
function updatePokemon2(pok) {
    const hp2 = document.getElementById('hp2')
    const hp2Bar = document.getElementById('hp2Bar')

    if (pok.hp <= 0) {
        pok.hp = 0
        hp2.innerText = `HP: ${0}`
    } else {
        hp2.innerText = `HP: ${pok.hp}`
    }
    hp2Bar.style.width = `${pok.hp / pok.base_hp * 100}%`
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

        member.append(pokHPElem, pokFrontSpriteElem)
        // member.append(pokNameElem, pokHPElem, pokFrontSpriteElem)
        team.append(member)
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

        member.append(pokHPElem, pokFrontSpriteElem)
        // member.append(pokNameElem, pokHPElem, pokFrontSpriteElem)
        team.append(member)
    }
}

// CallBacks


// GAME LOGIC
async function initPlayer1(alias = 'Player 1', pokemons) {
    player1.alias = alias
    document.getElementById('player1Alias').innerText = `Player 1: ${alias}`

    for (let i = 0; i < pokemons.length; i++) {
        console.log('loading ', i)
        const newPokemon = await getPokemonData(pokemons[i])
        player1.pokemons.push(newPokemon)
    }
    player1.pokemonsLeft = player1.pokemons.length

    player1.currentPokemon = 0;
    renderPokemon1(player1.pokemons[player1.currentPokemon])

    console.log("--- Player 1 initialized ---")

    console.log("---Player 1 Pokemons---")
    console.log(player1.pokemons)

}
async function initPlayer2(alias = 'Player 2', pokemons) {
    player2.alias = alias
    document.getElementById('player2Alias').innerText = `Player 2: ${alias}`

    for (let i = 0; i < pokemons.length; i++) {
        const newPokemon = await getPokemonData(pokemons[i])
        player2.pokemons.push(newPokemon)
    }
    player2.pokemonsLeft = player2.pokemons.length

    player2.currentPokemon = 0;
    renderPokemon2(player2.pokemons[player2.currentPokemon])
    console.log("--- Player 2 initialized ---")

    console.log("---Player 2 Pokemons---")
    console.log(player2.pokemons)

}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function computeDamage() {
    const multiplier = 0.2
    const battlePokemon1 = document.getElementById("pokemonBattle1")
    const battlePokemon2 = document.getElementById("pokemonBattle2")

    const player1CurrentPokemon = player1.pokemons[player1.currentPokemon]
    const player2CurrentPokemon = player2.pokemons[player2.currentPokemon]
    // --- PLAYER 2 DAMAGE START
    let rand1 = Math.random() * 100
    let rand2 = Math.random() * 100
    let isAttackValidPlayer1 = true
    let isAttackValidPlayer2 = true

    console.log("Rand1: ", rand1)
    console.log("Rand2: ", rand2)

    if (player1CurrentPokemon.moves[player1.currentMove].accuracy < rand1) {
        isAttackValidPlayer1 = false
        console.log("No Attack from 1")

    }
    if (player2CurrentPokemon.moves[player2.currentMove].accuracy < rand2) {
        isAttackValidPlayer2 = false
        console.log("No Attack from 2")
    }

    if (isAttackValidPlayer1) {
        const player2DamageTaken = player1CurrentPokemon.moves[player1.currentMove].power * multiplier
        player2CurrentPokemon.hp -= player2DamageTaken
        player1CurrentPokemon.moves[player1.currentMove].pp--;

        instructor(`${player1.alias} used ${player1CurrentPokemon.moves[player1.currentMove].name}`)
        player1.currentMove = null
        await sleep(1000)

        // UI UPDATES
        renderPokemon1(player1CurrentPokemon)
        updatePokemon2(player2CurrentPokemon)
        updateUI()
        if (player2CurrentPokemon.hp <= 0) {
            player2.currentMove = null
        }
        if (battlePokemon1.classList.contains('animate1')) {
            battlePokemon1.classList.remove('animate1')
            battlePokemon1.classList.add('animate1')
        } else {
            battlePokemon1.classList.add('animate1')

        }
        await sleep(2000)
        battlePokemon1.classList.remove('animate1')

        instructor(`${player1.alias} gave ${player2DamageTaken} hp damage`)
        await sleep(1000)
    } else {
        instructor(`${player1.alias} Attack missed!`)
        await sleep(2000)
        renderPokemon1(player1CurrentPokemon)
    }

    // --- PLAYER 2 DAMAGE END

    // Check if to continue the game or Not
    if (player2CurrentPokemon.hp <= 0) {
        player2.pokemonsLeft--;
        // Checking if team is exhausted or not
        if (player2.pokemonsLeft === 0) {
            endGame({ 'name': player1.alias })
        } else {
            document.getElementById('moves2').innerText = ''
            player2.currentPokemon = null
            instructor(`${player2.alias} please select an Alive Pokemon!`)
            updateUI()
        }

    } else {
        if (isAttackValidPlayer2) {


            const player1DamageTaken = player2CurrentPokemon.moves[player2.currentMove].power * multiplier
            player1CurrentPokemon.hp -= player1DamageTaken
            player2CurrentPokemon.moves[player2.currentMove].pp--;

            instructor(`${player2.alias} used ${player2CurrentPokemon.moves[player2.currentMove].name}`)
            player1.currentMove = null
            await sleep(1000)

            if (battlePokemon2.classList.contains('animate2')) {

                battlePokemon2.classList.remove('animate2')
                battlePokemon2.classList.add('animate2')
            } else {
                battlePokemon2.classList.add('animate2')

            }
            await sleep(2000)
            battlePokemon2.classList.remove('animate2')

            instructor(`${player2.alias} gave ${player1DamageTaken} hp damage`)
            await sleep(1000)

            renderPokemon1(player1CurrentPokemon)
            updatePokemon1(player1CurrentPokemon)
            renderPokemon2(player2CurrentPokemon)
            updateUI()
        } else {
            instructor(`${player2.alias} Attack missed!`)
            await sleep(2000)
            renderPokemon2(player2CurrentPokemon)
        }

        instructor(`Please Select Moves`)
        await sleep(500)


        if (player1CurrentPokemon.hp <= 0) {
            player1.currentMove = null
        }
        // updatePokemon1(player1CurrentPokemon)
        renderPokemon1(player1CurrentPokemon)
        if (player1CurrentPokemon.hp <= 0) {
            player1.pokemonsLeft--;
            if (player1.pokemonsLeft === 0) {
                endGame({ 'name': player2.alias })
            } else {
                document.getElementById('moves1').innerText = ''
                instructor(`${player1.alias} please select an Alive Pokemon!`)
                updateUI()
            }

        }
    }

}
function endGame(winner) {
    instructor("Game ended!", `Winner ${winner.name}`)
    console.log("Game ended!", `Winner ${winner.name}`)
    const battle = (document.getElementById('battle-btn'))
    const moves1 = document.getElementById('moves1')
    const moves2 = document.getElementById('moves2')
    moves1.remove()
    moves2.remove()
    battle.remove()
}

async function battle() {
    game.rounds++;
    const battleBtn = document.getElementById('battle-btn')
    if (player1.currentMove === null || player2.currentMove === null) {
        instructor("Please Choose your Moves!!!")
    } else {
        battleBtn.style.display = "None"
        if (player1.pokemons[player1.currentPokemon].hp >= 0 && player2.pokemons[player2.currentPokemon].hp >= 0) {
            if (player1.pokemons[player1.currentPokemon].moves[player1.currentMove].pp === 0 || player2.pokemons[player2.currentPokemon].moves[player2.currentMove].pp === 0) {
                instructor("Please select a Move with Valid PP")
            } else {
                await computeDamage()
                updateUI()
            }
        }
    }
    battleBtn.style.display = "block"

}

function updateUI() {
    renderTeam1()
    renderTeam2()
}




async function startGame() {
    // Initialisation
    await loading("Game is loading...")

    player1Pokemon = ['pikachu', 'raichu', 'squirtle']
    await initPlayer1(alias = 'AMX', player1Pokemon)
    player2Pokemon = ['charmander', 'bulbasaur', 'pidgey']
    await initPlayer2(alias = 'BMX', player2Pokemon)
    await renderTeam1()
    await renderTeam2()
    
    await sleep(2000)
    const loader = document.getElementById('loader')
    loader.style.display = "none"
    await instructor("Choose your Moves!!!")


}
// Starting point of the game



startGame()


// DOM Utils
const player1Moves = document.getElementById('moves1')
player1Moves.addEventListener('click', (e) => {
    if (e.target.tagName === 'P') {
        console.log("Player 1 move: ", e.target.parentElement.id)
        console.log("Element: ", e.target.tagName)
        moveId = e.target.parentElement.id
        let parent = e.target.parentElement
        for (const child of player1Moves.children) {
            child.classList.remove('selectedMove')
        }
        parent.classList.add('selectedMove')
        player1.currentMove = parseInt(parent.id)
        // console.log("player 1:",player1)

    }
})
const player2Moves = document.getElementById('moves2')
player2Moves.addEventListener('click', (e) => {
    if (e.target.tagName === 'P') {
        console.log("Player 1 move: ", e.target.parentElement.id)
        console.log("Element: ", e.target.tagName)
        moveId = e.target.parentElement.id
        let parent = e.target.parentElement
        for (const child of player2Moves.children) {
            child.classList.remove('selectedMove')
        }
        parent.classList.add('selectedMove')

        player2.currentMove = parseInt(parent.id)
    }
})
const battleBtn = document.getElementById('battle-btn')
battleBtn.addEventListener('click', battle)

// Team Member Change

function changeTeamMember1(e) {
    if (e.target.classList.contains('member-img')) {
        const newPokemonID = e.target.parentElement.id
        player1.currentPokemon = newPokemonID
        const newPokemon = player1.pokemons[newPokemonID]
        renderPokemon1(newPokemon)
    }
}

const team1 = document.querySelector('.left .team')
team1.addEventListener('click', changeTeamMember1)

function changeTeamMember2(e) {
    if (e.target.classList.contains('member-img')) {
        const newPokemonID = e.target.parentElement.id
        player2.currentPokemon = newPokemonID
        const newPokemon = player2.pokemons[newPokemonID]
        renderPokemon2(newPokemon)
    }
}

const team2 = document.querySelector('.right .team')
team2.addEventListener('click', changeTeamMember2)







