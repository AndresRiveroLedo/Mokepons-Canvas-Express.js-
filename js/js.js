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
let btnsAttacks = []
let objectPlayer
let lifePlayer = 0
let lifeEnemy = 0

/*Variables of Canvas*/
const sectionCanvas = document.getElementById('section-canvas')
const canvas = document.getElementById('canvas')
let interval
let mapCanvas = canvas.getContext('2d')
let canvasBackground = new Image()
canvasBackground.src = './assets/mokemap.png'
let heightWeAreLookingFor
let widthCanvas = window.innerHeight - 20
const maxWidth = 350

if(widthCanvas > maxWidth){
    widthCanvas = 350
}

heightWeAreLookingFor = 350 * 600 / 800

canvas.width = widthCanvas
canvas.height = heightWeAreLookingFor

/**Class */
class Mokepon{
    constructor(name, image, life, imageCanvas){
        this.name = name
        this.image = image
        this.life = life
        this.width = 40
        this.height = 40
        this.imageCanvas = new Image()
        this.imageCanvas.src = imageCanvas
        this.attacks = []
        this.speedX = 0
        this.speedY = 0
        this.x = numberRandom(0 , canvas.width - this.width)
        this.y = numberRandom(0, canvas.height - this.height)
    }

    drawMokepon(){
        mapCanvas.drawImage(
            this.imageCanvas,
            this.x,
            this.y, 
            this.width,
            this.height
        )
    }
}

/*Players */
const capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png')

const hipodoge = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png')

const ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png')


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

/*Enemy */
const capipepoEnemy = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png')

const hipodogeEnemy = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png')

const ratigueyaEnemy = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png')


capipepoEnemy.attacks.push(
    {name: "🏔️", id: "btn-earth"},
    {name: "🏔️", id: "btn-earth"},
    {name: "🏔️", id: "btn-earth"},
    {name: "🔥", id: "btn-fire"},
    {name: "💧", id: "btn-water"}
)

hipodogeEnemy.attacks.push(
    {name: '💧', id: "btn-water"},
    {name: '💧', id: "btn-water"},
    {name: '💧', id: "btn-water"},
    {name: '🔥', id: "btn-fire"},
    {name: '🏔️', id: 'btn-earth'}
)

ratigueyaEnemy.attacks.push(
    {name: '🔥', id: "btn-fire"},
    {name: '🔥', id: "btn-fire"},
    {name: '🔥', id: 'btn-fire'},
    {name: '💧', id: 'btn-water'},
    {name: '🏔️', id: 'btn-earth'}
)

/*Variables*/
function loadGame(){
    sectionSelectionAttacksPlayer.style.display = 'none'
    sectionCanvas.style.display = 'none'
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
    sectionSelectionAttacksPlayer.style.display  = 'none'
    sectionCardAttacks.style.display = 'none'

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
   sectionCanvas.style.display = 'flex'
   initCanvas()
  //selectedAttackPetEnemy();
    
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

/*Zone Canvas */
function initCanvas(){
    objectPlayer = getObjectMokepon(namePlayer)

    interval = setInterval(drawCanvas, 50)

    window.addEventListener('keydown', pressAKey)
    window.addEventListener('keyup', stopMoviment)


}

function drawCanvas(){
    objectPlayer.x = objectPlayer.x + objectPlayer.speedX
    objectPlayer.y = objectPlayer.y + objectPlayer.speedY
    mapCanvas.clearRect(0, 0, canvas.width, canvas.height)
    mapCanvas.drawImage(
        canvasBackground,
        0,
        0,
        canvas.width,
        canvas.height
    )
    objectPlayer.drawMokepon()
    ratigueyaEnemy.drawMokepon()
    capipepoEnemy.drawMokepon()
    hipodogeEnemy.drawMokepon()

    if(objectPlayer.speedX !== 0 || objectPlayer.speedY !== 0){
        checkCollision(ratigueyaEnemy)
        checkCollision(capipepoEnemy)
        checkCollision(hipodogeEnemy)
    }

}

function pressAKey(event){
    switch(event.key){
        case 'ArrowUp':
            moveUp()
            break
        case 'ArrowDown':
            moveDown()
            break
        case 'ArrowLeft':
            moveLeft()
            break
        case 'ArrowRight':
            moveRight()
            break
        default:
            break
    }
}

function moveUp(){
    objectPlayer.speedY = -5
}

function moveDown(){
    objectPlayer.speedY = 5
}

function moveLeft(){
    objectPlayer.speedX = -5 
}

function moveRight(){
    objectPlayer.speedX = 5
}

function stopMoviment(){
    objectPlayer.speedX = 0
    objectPlayer.speedY = 0
}

function getObjectMokepon(namePlayer){

    for(let i = 0; i < arrayMokepons.length; i++){
        if(namePlayer == arrayMokepons[i].name){
            return arrayMokepons[i]
        }
    }
}

function checkCollision(objectEnemy){
    const upEnemy = objectEnemy.y
    const downEnemy = objectEnemy.y + objectEnemy.height
    const rightEnemy = objectEnemy.x + objectEnemy.width
    const leftEnemy = objectEnemy.x

    const upPlayer = objectPlayer.y
    const downPlayer = objectPlayer.y + objectPlayer.height
    const rightPlayer = objectPlayer.x + objectPlayer.width
    const leftPlayer = objectPlayer.x 
    
    if(
        downPlayer < upEnemy ||
        upPlayer > downEnemy ||
        rightPlayer < leftEnemy ||
        leftPlayer > rightEnemy
    ){
        return
    }

    stopMoviment()
    clearInterval(interval)
    console.log('collision')
    sectionCanvas.style.display = 'none'
    sectionSelectionAttacksPlayer.style.display = 'flex'
    sectionCardAttacks.style.display = 'flex'
    selectedAttackPetEnemy();
}


function numberRandom(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function reloadGame(){
    location.reload()
}

window.addEventListener('load', loadGame)
