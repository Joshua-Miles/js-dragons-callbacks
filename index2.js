fetch('http://localhost:3000/dragons')
    .then( result => result.json())
    .then( dragons => renderDragons(dragons) )

function renderDragons(dragons){
    let list = document.querySelector('.dragons')
    list.innerHTML = ''
    dragons.forEach( (dragon) => {
        let dragonElement = renderDragon(dragon)
        list.appendChild(dragonElement) 
        attachDragonEvents(dragonElement, dragon, dragons)
    })
}

// Render
function renderDragon(dragon){
    let dragonElement = document.createElement('div')
    dragonElement.innerHTML = `
        <h1>${dragon.name}</h1>
        <p>${dragon.description}</p>
        <p>Likes: ${dragon.likes || 0}</p>
        <button style="cursor:pointer" class="delete-button">Delete</button>
        <button style="cursor:pointer" class="like-button">Like</button>  
    `
    return dragonElement
}

// Attach Events
function attachDragonEvents(dragonElement, dragon, dragons){
    let deleteButton = dragonElement.querySelector('.delete-button')
    deleteButton.addEventListener('click', e => deleteDragon(dragon, dragons))

    let likeButton = dragonElement.querySelector('.like-button')
    likeButton.addEventListener('click', e => likeDragon(dragon, dragons))
}

// Actions
function deleteDragon(dragon, dragons){
    let dragonIndex = dragons.indexOf(dragon)
    dragons.splice(dragonIndex, 1)
    fetch(`http://localhost:3000/dragons/${dragon.id}`, {
        method:'DELETE'
    })
    renderDragons(dragons)
}

function likeDragon(dragon, dragons){
    dragon.likes = dragon.likes || 0;
    dragon.likes = dragon.likes + 1;
    fetch(`http://localhost:3000/dragons/${dragon.id}`, {
        method:'PATCH',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(dragon)
    })
    renderDragons(dragons)
}