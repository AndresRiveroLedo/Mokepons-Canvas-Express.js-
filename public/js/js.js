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
let playerId = null
let enemyId = null
let arrayMokepons = []
let arrayMokeponsEnemys = []
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
    constructor(name, image, life, imageCanvas, id = null){
        this.id = id
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


const HIPODOGE_ATTACKS = [
    {name: '💧', id: "btn-water"},
    {name: '💧', id: "btn-water"},
    {name: '💧', id: "btn-water"},
    {name: '🔥', id: "btn-fire"},
    {name: '🏔️', id: 'btn-earth'}
]

const CAPIPEPO_ATTACKS = [
    {name: "🏔️", id: "btn-earth"},
    {name: "🏔️", id: "btn-earth"},
    {name: "🏔️", id: "btn-earth"},
    {name: "🔥", id: "btn-fire"},
    {name: "💧", id: "btn-water"}
]

const RATIGUEYA_ATTACKS = [
    {name: '🔥', id: "btn-fire"},
    {name: '🔥', id: "btn-fire"},
    {name: '🔥', id: 'btn-fire'},
    {name: '💧', id: 'btn-water'},
    {name: '🏔️', id: 'btn-earth'}
]

capipepo.attacks.push(...CAPIPEPO_ATTACKS)

hipodoge.attacks.push(...HIPODOGE_ATTACKS )

ratigueya.attacks.push(...RATIGUEYA_ATTACKS)


arrayMokepons.push(capipepo, hipodoge, ratigueya)


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

    joinGame()
}

function joinGame(){
    fetch('http://192.168.1.39:8080/join')
        .then(function(res){
            if(res.ok){
                res.text()
                    .then(function(response){
                        console.log(response)
                        playerId = response
                    })
            }
        })
}

function addSectionAttacks(){

   
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
       // reloadGame()
       return
    }

    sectionSelectionPetsPlayer.style.display = 'none'
    sectionSelectionAttacksPlayer.style.display  = 'none'
    sectionCardAttacks.style.display = 'none'


   selectedMokepon(namePlayer)

   selectedAttackPetPlayer(namePlayer)
   sectionCanvas.style.display = 'flex'
   initCanvas()
  //selectedAttackPetEnemy();
    
}

function selectedMokepon(petPlayer){
    fetch(`http://192.168.1.39:8080/mokepon/${playerId}`,{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: petPlayer
        })
    })
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
            //sequenceAttacksEnemy()
            if(arrayAttacksPlayer.length === 5){
                sendAttacks()
            }
            
        })
    }) 

}

function sendAttacks(){
    fetch(`http://192.168.1.39:8080/mokepon/${playerId}/attacks`, {
        method: "post",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            attacks: arrayAttacksPlayer
        })
    })

    interval = setInterval(getAttacks, 50)
    
}

function getAttacks(){
    fetch(`http://192.168.1.39:8080/mokepon/${enemyId}/attacks`)
        .then(function(res){
            if(res.ok){
                res.json()
                    .then(function({attacks}){
                        if(attacks.lenght === 5){
                            arrayAttacksEnemy = attacks
                            fight()
                        }
                    })
            }
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
    clearInterval(interval)

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
    sendPosition(objectPlayer.x, objectPlayer.y)
    arrayMokeponsEnemys.forEach(function(mokepon){
        mokepon.drawMokepon()
        checkCollision(mokepon)
    })
   

}

function sendPosition(x, y){
    fetch(`http://192.168.1.39:8080/mokepon/${playerId}/position`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function ({enemys}){
                    console.log(enemys)
                    arrayMokeponsEnemys = enemys.map(function (enemy){
                        let mokeponEnemy = null
                        const mokeponName = enemy.mokepon.name || ""
                        console.log(mokeponName)
                        if(mokeponName === "Hipodoge"){
                            mokeponEnemy = new Mokepon('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png', enemy.id)
                        }else if(mokeponName === "Capipepo"){
                            mokeponEnemy = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.png', enemy.id)
                        }else if(mokeponName === "Ratigueya"){
                            mokeponEnemy = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png', enemy.id)
                        }

                        mokeponEnemy.x = enemy.x
                        mokeponEnemy.y = enemy.y

                        return mokeponEnemy
                    })
            
                    
                })
        }
    })
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

    //enemyId = objectEnemy.id
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
