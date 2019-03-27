/* 
*
*      Enemy's Section
* 
*/
// The enemies Y axis location on canvas
let locations = [50, 130, 201];
class Enemy {
    // x, y represent the axis position of the enemy on canvas
    constructor() {
        // the initial values of the enemy before it goes out of frame
        this.sprite = 'images/enemy-bug.png';
        this.x = -100;
        this.y = locations[Math.floor(Math.random() * locations.length)];
        this.height = 50;
        this.width = 50;
        this.speed = Math.floor((Math.random() * 250) + 80);
    }
    // Update the position and speed after it goes out of the frame
    update(dt) {
        this.x += this.speed * dt;
        if (this.x >= 500) {
            this.x = -100;
            this.y = locations[Math.floor(Math.random() * locations.length)];
            this.speed = Math.floor((Math.random() * 250) + 80);
        }
        // check collision with player
        if (this.x < player.x + player.width &&
            this.x + this.width > player.x &&
            this.y < player.y + player.height &&
            this.height + this.y > player.y) {
            // decrement the player's live
            decrementLives();
            // shows the changed modal
            showLoseModal();
            // resets the player position
            player.reset();
        }
    }
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

/* 
*
*      Collectable Item's Section
* 
*/
// collectable item's width and height based on row, column size
const itemCol = 101;
const itemRow = 80;
class Star {
    constructor() {
        this.sprite = 'images/Star.png'
        // randomize the star's location based on column, row
        // x is the column, y is the row
        this.x = Math.floor(Math.random() * 3) * itemCol;
        this.y = Math.floor((Math.random() * 3) + 1) * itemRow - 25;
        this.height = 50;
        this.width = 50;
        this.score = 70;
        this.display = true;
    }
    // Draw the Star on the screen, required method for game
    render() {
        if (this.display === true) {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        }
    }
    // reset's star position
    resetStar() {
        // display the star 
        this.display = true;
        // randomize star's location
        this.x = Math.floor(Math.random() * 3) * itemCol;
        this.y = Math.floor((Math.random() * 3) + 1) * itemRow - 25;
    }
}

const gems = [
    'images/Gem Blue.png',
    'images/Gem Orange.png',
    'images/Gem Green.png'
];

class Gem {
    constructor() {
        // randomize gem's color
        this.sprite = gems[Math.floor(Math.random() * gems.length)];
        // randomize the gem's location based on column, row
        // x is the column, y is the row
        this.x = Math.floor(Math.random() * 5) * itemCol;
        this.y = Math.floor((Math.random() * 3) + 1) * itemRow - 25;
        this.height = 50;
        this.width = 50;
        this.score = 30;
        this.display = true;
    }
    // Draw the Gem on the screen, required method for game
    render() {
        if (this.display === true) {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        }
    }
    // reset's gem position
    resetGem() {
        // display the gem
        this.display = true;
        // randomize the gem's location based on row, column
        this.x = Math.floor(Math.random() * 5) * itemCol;
        this.y = Math.floor((Math.random() * 5) + 1) * itemRow - 25;
        // randomize gem's color
        this.sprite = gems[Math.floor(Math.random() * gems.length)];
    }
}

/* 
*
*      Player's Section
* 
*/
let characters = [
    "images/char-boy.png",
    "images/char-cat-girl.png",
    "images/char-horn-girl.png",
    "images/char-pink-girl.png",
    "images/char-princess-girl.png"
];

class Player {
    // x, y represent the axis position of the player on canvas
    constructor(x, y) {
        this.sprite = characters[0];
        this.x = x;
        this.height = 50;
        this.width = 50;
        this.y = y;
        this.heart = 4;
        this.score = 0;
    }
    // Update the player's position
    update() {
        // check Collision with collectable items
        if (this.x < gem.x + gem.width &&
            this.x + this.width > gem.x &&
            this.y < gem.y + gem.height &&
            this.y + this.height > gem.y) {
            gem.display = false;
        }
        if (this.x < star.x + star.width &&
            this.x + this.width > star.x &&
            this.y < star.y + star.height &&
            this.y + this.height > star.y) {
            star.display = false;
        }
        if (this.y < 0) {
            // stops the loop process method for period time
            setTimeout(() => {
                // resets the position
                this.reset()
            }, 10);
            // increment player's score
            incrementScore();
        }
    }
    // resets the position of the player
    reset() {
        // resets the gem's position
        gem.resetGem();
        // resets the star's position
        star.resetStar();
        this.y = 400;
        this.x = 200;

    }

    // Draw the player on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    // character's movement when key arrows pressed
    handleInput(keyArrows) {
        if (keyArrows === "left" && this.x > 0) {
            this.x -= 100;
        }
        if (keyArrows === "right" && this.x < 400) {
            this.x += 100;
        }
        if (keyArrows === "up" && this.y > 0) {
            this.y -= 87;
        }
        if (keyArrows === "down" && this.y < 400) {
            this.y += 87;
        }
    }
}

// player's score
let score = document.getElementById("score");
// increment player's score
let incrementScore = () => {
    // when the player reach the top
    if (player.y < 0) {
        player.score += 10;
        score.innerHTML = "Score : " + parseInt(player.score);
    }
    // when the player collide with the gem
    if (gem.display === false) {
        player.score += gem.score;
        score.innerHTML = "Score : " + parseInt(player.score);
    }
    // when the player collide with the star
    if (star.display === false) {
        player.score += star.score;
        score.innerHTML = "Score : " + parseInt(player.score);
    }
    // after the player gets 1000 or above show the modal
    if(player.score >= 1000){
        showWinModal();
    }
}

// player's live
const lives = document.querySelectorAll(".hearts li");
// decrement player's live
let decrementLives = () => {
    player.heart -= 1;
    if (player.heart === 3) {
        lives[0].style.display = 'none';
    }
    if (player.heart === 2) {
        lives[1].style.display = 'none';
    }
    if (player.heart === 1) {
        lives[2].style.display = 'none';
    }
    if (player.heart === 0) {
        lives[3].style.display = 'none';
    }
}

// resets player's live / heart
let resetLives = () => {
    player.heart = 4;
    for (let live of lives) {
        live.style.display = "block";
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const allEnemies = [];

const star = new Star();

const gem = new Gem();

const player = new Player(200, 400);

// enemy's number
let numOfEnemies = 4;

for (let i = 0; i < numOfEnemies; i++) {
    let enemy = new Enemy();
    allEnemies.push(enemy);
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
// locks the keyup event
let lockKeyUp = false;
document.addEventListener('keyup', function (e) {
    if (!lockKeyUp) {
        var allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };
        player.handleInput(allowedKeys[e.keyCode]);
    }

});

/*
*
*       DOM manipulation section
*
*/
const btn = document.getElementById("button");
const mainModal = document.getElementById("main-modal");
const background = document.querySelector('.modal-background');
const imgs = document.querySelectorAll(".characters img");

// removes the original modal 
let disableModal = () => {
    lockKeyUp = false;
    mainModal.style.display = "none";
    background.style.display = "none";

}

// close the modal when clicked outside
background.addEventListener("click", disableModal);

// shows the original modal
let showModal = () => {
    lockKeyUp = true;
    mainModal.style.display = "block";
    background.style.display = "block";
}


// button to close  modal
let closeBtn = document.querySelector('.close');
closeBtn.addEventListener("click", disableModal);

// adds an EventListener on button
btn.addEventListener("click", showModal);

// click event for each img 

for (let img of imgs) {
    img.addEventListener('click', clickImg);
}

// change character function 
function clickImg(evt) {
    let image = evt.target;
    if (image.getAttribute('src') === 'images/char-boy.png') {
        player.sprite = characters[0];
        // if character selected remove modal
        disableModal();
    }
    if (image.getAttribute('src') === 'images/char-cat-girl.png') {
        player.sprite = characters[1];
        // if character selected remove modal
        disableModal();
    }
    if (image.getAttribute('src') === 'images/char-horn-girl.png') {
        player.sprite = characters[2];
        // if character selected remove modal
        disableModal();
    }
    if (image.getAttribute('src') === 'images/char-pink-girl.png') {
        player.sprite = characters[3];
        // if character selected remove modal
        disableModal();
    }
    if (image.getAttribute('src') === 'images/char-princess-girl.png') {
        player.sprite = characters[4];
        // if character selected remove modal
        disableModal();
    }
}

// when the player loses the game 

let replayBtn = document.createElement("button");
replayBtn.classList.add("btn");
replayBtn.innerHTML = "REPLAY";


// changes the  all modal's elements
let body = document.querySelector(".modal-body");
let bodyImgs = document.querySelector(".modal-body ul");
let header = document.querySelector('.modal-header');
let headerH2 = document.querySelector(".modal-header h2");
let paragraph = document.createElement("p");
let lastScore = document.createElement("p");
let mainBtn = document.querySelector(".btn");

// change the modal elements when the player loses
let showLoseModal = () => {

    if (player.heart === 0) {
        body.removeChild(bodyImgs);
        headerH2.innerHTML = "GAME OVER";
        header.appendChild(headerH2);
        lastScore.innerHTML = `Your Score is : ${player.score}`;
        paragraph.innerHTML = "Would you like to play again?";
        mainBtn.innerHTML = "REPLAY";
        body.appendChild(lastScore);
        body.appendChild(paragraph);
        body.appendChild(replayBtn);
        lockKeyUp = true;
        mainModal.style.display = "block";
        background.style.display = "block";
    }
}

// changes the modal elements when the player wins
let showWinModal = () => {

    body.removeChild(bodyImgs);
    headerH2.innerHTML = `CONGRATULATIONS!!<br> You Won!`;
    lastScore.innerHTML = `Your Best Score is : ${player.score}`;
    paragraph.innerHTML = "Would you like to play again?";
    replayBtn.innerHTML = "Play Again";
    mainBtn.innerHTML = "Play Again";
    header.appendChild(headerH2);
    body.appendChild(lastScore);
    body.appendChild(paragraph);
    body.appendChild(replayBtn);
    lockKeyUp = true;
    mainModal.style.display = "block";
    background.style.display = "block";
}

// removes the changed Modal and reload the page
// resets everything

let removeMainModal = () => {
    lockKeyUp = true;
    mainModal.style.display = "none";
    background.style.display = "none";
    resetLives();
    player.reset();
    window.location.reload();
}

replayBtn.addEventListener("click", removeMainModal);


