console.log("Hello")

async function getData() {
    const move_id = parseInt(document.getElementById('move_id').value)
    console.log(move_id)
    let move_name = 'thunderbolt'
    // let link = `https://pokeapi.co/api/v2/move/${move_id}/`
    try {
        let link = `https://pokeapi.co/api/v2/move/${move_name}/`
        console.log('Making the api call...')
        const data = await fetch(link);
        console.log('data received...')
        console.log('converting into JSON...')
        const json_data = await data.json()
        console.log('converted to JSON')
        console.log('JSON:')
        console.log(json_data)
        const move_data = document.getElementById('move_details')
        move_data.innerText = json_data.name
    }
    catch (e) {
        console.error(e)
    }

}
const move_button = document.getElementById('move_btn')
move_button.addEventListener('click', getData)



