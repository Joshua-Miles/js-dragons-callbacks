fetch('http://localhost:3000/dragons')
    .then( result => result.json())
    .then( renderDragons )

function renderDragons(dragons){
    let list = document.querySelector('.dragons')
    list.innerHTML = ''
    dragons.forEach( (dragon, dragonIndex) => {
        let dragonElement = document.createElement('div')
        list.appendChild(dragonElement)
        dragonElement.innerHTML += `
            <h1>${dragon.name}</h1>
            <p>${dragon.description}</p>
            <button class="delete-button">Delete</button>  
        `
        let deleteButton = dragonElement.querySelector('.delete-button')
        deleteButton.addEventListener('click', e => {
            dragons.splice(dragonIndex, 1)
            fetch(`http://localhost:3000/dragons/${dragon.id}`, {
                method:'DELETE'
            })
            renderDragons(dragons)
        })
    })
}