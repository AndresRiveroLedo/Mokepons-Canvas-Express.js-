/**Sections */
const sectionSelectionPetsPlayer = document.getElementById('selection-pets--player')
const sectionSelectionAttacksPlayer = document.getElementById('selection-attacks--player')
const sectionCardAttacks = document.getElementById('card-attacks')
const sectionCardRestart = document.getElementById('card-restart')

/**Cards*/
const cardPets = document.querySelector('.card-pets')
const cardBtnAttacks = document.querySelector('.card-btn-attacks')
const cardMessages = document.getElementById('messages')
const cardAttacksPlayer = document.getElementById('card-attacks--player')
const cardAttacksEnemy = document.getElementById('card-attacks--enemy')
const cardResultsAttacks = document.getElementById('card-results--attacks')

/**Inline*/
const btnSelectionPet = document.getElementById('btn-selection-pet')
const btnRestart = document.getElementById('btn-restart')
const pNamePlayer = document.getElementById('name-player')
const pNameEnemy = document.getElementById('name-enemy')
const pMessage = document.getElementById('message')
const pLifePlayer = document.getElementById('life-player')
const pLifeEnemy = document.getElementById('life-enemy')


/*Variables*/
let arrayMokepons = []
let arrayAttacksPlayer = []
let arrayAttacksEnemy = []
let arrayOrdenAttacksEnemy = []
let inputCapipepo
let inputHipodoge
let inputRatigueya
let namePlayer
let btnsAttacks
let lifePlayer = 0
let lifeEnemy = 0



/**Class */
class Mokepon{
    constructor(name, life, image){
        this.name = name
        this.life = life
        this.image = image
        this.attacks = []
    }
}

const capipepo = new Mokepon('Capipepo', 5, './assets/mokepons_mokepon_capipepo_attack.png')

const hipodoge = new Mokepon('Hipodoge', 5, './assets/mokepons_mokepon_hipodoge_attack.png')

const ratigueya = new Mokepon('Ratigueya', 5, './assets/mokepons_mokepon_ratigueya_attack.png')

capipepo.attacks.push(
    {name: "🏔️", id: "btn-earth"},
    {name: "🏔️", id: "btn-earth"},
    {name: "🏔️", id: "btn-earth"},
    {name: "🔥", id: "btn-fire"},
    {name: "💧", id: "btn-water"}
)

hipodoge.attacks.push(
    {name: '💧', id: "btn-water"},
    {name: '💧', id: "btn-water"},
    {name: '💧', id: "btn-water"},
    {name: '🔥', id: "btn-fire"},
    {name: '🏔️', id: 'btn-earth'}
)

ratigueya.attacks.push(
    {name: '🔥', id: "btn-fire"},
    {name: '🔥', id: "btn-fire"},
    {name: '🔥', id: 'btn-fire'},
    {name: '💧', id: 'btn-water'},
    {name: '🏔️', id: 'btn-earth'}
)

arrayMokepons.push(capipepo, hipodoge, ratigueya)


/*Variables*/
function loadGame(){
    sectionSelectionAttacksPlayer.style.display = 'none'
    sectionCardAttacks.style.display = 'none'
    sectionCardRestart.style.display = 'none'

    arrayMokepons.forEach(mokepon =>{
        let btnMokepons = `
            <input class="input-pets" type="radio" name="pet" id=${mokepon.name}>
            <label class="card-pet" for=${mokepon.name}>
                <p>${mokepon.name}</p>
                <img src=${mokepon.image} alt=${mokepon.name}> 
            </label>
        `
        cardPets.innerHTML += btnMokepons
    })

    inputCapipepo = document.getElementById('Capipepo')
    inputHipodoge = document.getElementById('Hipodoge')
    inputRatigueya = document.getElementById('Ratigueya')

    btnSelectionPet.addEventListener('click', addSectionAttacks)
}

function addSectionAttacks(){

    sectionSelectionPetsPlayer.style.display = 'none'
    sectionSelectionAttacksPlayer.style.display  = 'flex'
    sectionCardAttacks.style.display = 'flex'

    if(inputCapipepo.checked){
        namePlayer = inputCapipepo.id
        pNamePlayer.innerHTML = inputCapipepo.id
    }else if(inputHipodoge.checked){
        namePlayer = inputHipodoge.id
        pNamePlayer.innerHTML = inputHipodoge.id
    }else if(inputRatigueya.checked){
        namePlayer = inputRatigueya.id
        pNamePlayer.innerHTML = inputRatigueya.id
    }else{
        alert('Selected a Pet')
        reloadGame()
    }

   selectedAttackPetPlayer(namePlayer)
   selectedAttackPetEnemy();
    
}

function selectedAttackPetPlayer(namePlayer){
    let attacks = []
    for(let i = 0; i < arrayMokepons.length; i++){
        if(namePlayer == arrayMokepons[i].name){
            attacks = arrayMokepons[i].attacks
        }
    }

    showBtnAttacks(attacks)
}

function showBtnAttacks(attacks){
    
    attacks.forEach(attack =>{
    let optionAttacks = `
        <button class="btn-attack" id=${attack.id}>${attack.name}</button>
    `
    cardBtnAttacks.innerHTML += optionAttacks
    })

    btnsAttacks = document.querySelectorAll('.btn-attack')
}

function selectedAttackPetEnemy(){
    let randomEnemy = numberRandom(0, arrayMokepons.length - 1)
    pNameEnemy.innerHTML = arrayMokepons[randomEnemy].name
    arrayAttacksEnemy = arrayMokepons[randomEnemy].attacks

    sequenceAttacksPlayer()
}

function sequenceAttacksPlayer(){
    
    btnsAttacks.forEach(btn =>{
        btn.addEventListener('click', (e)=>{
            if(e.target.textContent === '🔥'){
                arrayAttacksPlayer.push('Fire')
                btn.disabled = true
                btn.style.background = 'var(--sixth-color)'
            }else if(e.target.textContent === '💧'){
                arrayAttacksPlayer.push('Water')
                btn.disabled = true
                btn.style.background = 'var(--sixth-color)'
            }else if(e.target.textContent === '🏔️'){
                arrayAttacksPlayer.push('Earth')
                btn.style.background = 'var(--sixth-color)'
                btn.disabled = true;
            }
            sequenceAttacksEnemy()
        })
    }) 

}

function sequenceAttacksEnemy(){
    let randomEnemy = numberRandom(0, arrayAttacksEnemy.length - 1)

    if(randomEnemy === 0 && randomEnemy === 1){
        arrayOrdenAttacksEnemy.push('Fire')
    }else if(randomEnemy === 2 && randomEnemy === 3){
        arrayOrdenAttacksEnemy.push('Water')
    }else{
        arrayOrdenAttacksEnemy.push('Earth')
    }

    initFight()
}

function initFight(){
    if(arrayAttacksPlayer.length === 5){
        fight()
    }
}

function fight(){

    for(let i = 0; i < arrayAttacksPlayer.length; i++){
        if(arrayAttacksPlayer[i] === arrayOrdenAttacksEnemy[i]){
            createMessageAttack('Tie')
            showAttacksPlayers(i)
        }else if(arrayAttacksPlayer[i] === 'Fire' && arrayOrdenAttacksEnemy[i] === 'Earth'){
            createMessageAttack('Win')
            showAttacksPlayers(i)
            lifePlayer++
            pLifePlayer.innerHTML = lifePlayer
        }else if(arrayAttacksPlayer[i] === 'Water' && arrayOrdenAttacksEnemy[i] === 'Fire'){
            createMessageAttack('Win')
            showAttacksPlayers(i)
            lifePlayer++
            pLifePlayer.innerHTML = lifePlayer
        }else if(arrayAttacksPlayer[i] === 'Earth' && arrayOrdenAttacksEnemy[i] === 'Water'){
            createMessageAttack('Win')
            showAttacksPlayers(i)
            lifePlayer++
            pLifePlayer.innerHTML = lifePlayer
        }else{
            createMessageAttack('Lost')
            showAttacksPlayers(i) 
            lifeEnemy++
            pLifeEnemy.innerHTML = lifeEnemy
        }
    }

    checkVictory()

}

function createMessage(message){
    pMessage.innerHTML = message
}

function createMessageAttack(message){
    
    const pResultAttack = document.createElement('p');

    pResultAttack.innerHTML = message

    cardResultsAttacks.appendChild(pResultAttack)
}

function showAttacksPlayers(i){

    const pAttacksPlayer = document.createElement('p')
    const pAttacksEnemy = document.createElement('p')

    pAttacksPlayer.innerHTML = arrayAttacksPlayer[i]
    pAttacksEnemy.innerHTML = arrayOrdenAttacksEnemy[i]

    cardAttacksPlayer.appendChild(pAttacksPlayer)
    cardAttacksEnemy.appendChild(pAttacksEnemy)

}

function checkVictory(){

    sectionCardRestart.style.display = 'flex'

    if(lifePlayer == lifeEnemy){
        createMessage('Tie')
    }else if(lifePlayer > lifeEnemy){
        createMessage('You win')
    }else{
        createMessage('You lost')
    }

    btnRestart.addEventListener('click', reloadGame)
}



function numberRandom(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function reloadGame(){
    location.reload()
}

window.addEventListener('load', loadGame)
