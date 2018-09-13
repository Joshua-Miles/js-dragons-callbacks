const state = {};

fetch('http://localhost:3000/dragons')
    .then( result => result.json())
    .then( dragons => {
        state.dragons = dragons
        render()
    })

function render(){
    let list = document.querySelector('.dragons')
    list.innerHTML = ''
    state.dragons.forEach( (dragon) => {
        let dragonElement = renderDragon(dragon)
        list.appendChild(dragonElement) 
        attachDragonEvents(dragonElement, dragon)
    })
}

// Render
function renderDragon(dragon){
    let dragonElement = document.createElement('div')
    dragonElement.innerHTML = `
        <h1 contenteditable="true" class="name">${dragon.name}</h1>
        <p>${dragon.description}</p>
        <p>Likes: ${dragon.likes || 0}</p>
        <button style="cursor:pointer" class="delete-button">Delete</button>
        <button style="cursor:pointer" class="like-button">Like</button>  
    `
    return dragonElement
}

// Attach Events
function attachDragonEvents(dragonElement, dragon){
    let dragons = state.dragons;

    let deleteButton = dragonElement.querySelector('.delete-button')
    deleteButton.addEventListener('click', e => deleteDragon(dragon))

    let likeButton = dragonElement.querySelector('.like-button')
    likeButton.addEventListener('click', e => likeDragon(dragon))

    let dragonName = dragonElement.querySelector('.name')
    dragonName.addEventListener('focusout', e => editName( dragonName.innerText, dragon))
}

// Actions
function deleteDragon(dragon){
    let dragons = state.dragons
    let dragonIndex = dragons.indexOf(dragon)
    dragons.splice(dragonIndex, 1)
    fetch(`http://localhost:3000/dragons/${dragon.id}`, {
        method:'DELETE'
    })
    render()
}

function likeDragon(dragon){
    let dragons = state.dragons
    dragon.likes = dragon.likes || 0;
    dragon.likes = dragon.likes + 1;
    updateDragon(dragon)
}

function editName(name, dragon){
    let dragons = state.dragons
    dragon.name = name
    updateDragon(dragon)
}

function updateDragon(dragon){
    let dragons = state.dragons
    fetch(`http://localhost:3000/dragons/${dragon.id}`, {
        method:'PATCH',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(dragon)
    })
    render()
}