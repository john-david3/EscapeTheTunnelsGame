let canvas;
let context;

let fpsInterval = 1000 / 30;
let now;
let then = Date.now();
let request_id;

let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDown = false;
let pressSpace = false;
let level1 = true;
let level2 = false;
let setTimer = true;
let cheat = false;

let xhttp;
let nextTile;
let direction;
let directionV;
let directionH;
let enemy_movement_speed = 0;
let player_movement_speed = 0;
let time_left = 0;
let countdown_from = 60;
let score;
let timer_count = 0;
let count_up = 0;

let player = {
    x : 240,
    y : 288,
    xChange : 0,
    yChange : 0,
    size : 16,
    spriteSize : 32,
    tileX : 0,
    tileY : 0,
    frameX : 0,
    frameY : 0,
    invincible : false
};

let enemyA = {
    x : 208,
    y : 64,
    size : 16,
    spriteSize : 32,
    xChange : 0,
    yChange : 0,
    tileX : 0,
    tileY : 0,
    frameX : 0,
    frameY : 0
}

let enemyB = {
    x : 48,
    y : 240,
    size : 16,
    spriteSize : 32,
    xChange : 0,
    yChange : 0,
    tileX : 0,
    tileY : 0,
    frameX : 0,
    frameY : 0
}

let enemyC = {
    x : 464,
    y : 144,
    size : 16,
    spriteSize : 32,
    xChange : 0,
    yChange : 0,
    tileX : 0,
    tileY : 0,
    frameX : 0,
    frameY : 0
}

let enemyD = {
    x : 320,
    y : 112,
    size : 16,
    spriteSize : 32,
    xChange : 0,
    yChange : 0,
    tileX : 0,
    tileY : 0,
    frameX : 0,
    frameY : 0
}

let enemies = [enemyA, enemyB, enemyC, enemyD]

let shield = {
    x : 0,
    y : 0,
    size : 16
}

let playerImage = new Image();
let superPlayer = new Image();
let enemyImage = new Image();
let backgroundImage = new Image();
let subBackground = new Image();
let audio1 = new Audio();
let audio2 = new Audio();
let thud = new Audio();

let tilesPerRow = 64;
let tileSize = 16;

let background1 = [
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1415,1415,1415,1415],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1415,1415,1415,1415,1415,1415,1415,1415,1415,1415,1415,1415,306,307,1415],
    [-1,-1,-1,1415,1415,1415,1415,1415,1415,1415,1415,-1,-1,-1,-1,-1,-1,1415,-1,-1,-1,-1,1415,1415,1415,1415,1415,1415,1415,370,371,1415],
    [-1,-1,-1,-1,-1,-1,1415,-1,-1,-1,1415,-1,-1,-1,-1,-1,-1,1415,-1,-1,-1,-1,1415,-1,-1,1414,-1,-1,1415,1415,1415,1415],
    [-1,-1,-1,-1,-1,-1,1415,-1,-1,-1,1415,1415,1415,1415,1415,1415,1415,1415,-1,-1,-1,-1,1415,-1,-1,1414,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,1415,-1,-1,-1,1415,-1,-1,-1,-1,-1,-1,1414,-1,-1,-1,-1,1415,-1,-1,1414,-1,-1,-1,-1,-1,-1],
    [-1,1415,1415,1415,-1,-1,1415,-1,-1,-1,1415,-1,-1,-1,-1,-1,-1,1414,-1,-1,-1,-1,1415,-1,-1,1414,-1,-1,-1,-1,-1,-1],
    [-1,1415,-1,1415,-1,-1,1415,-1,-1,-1,1415,-1,-1,-1,-1,-1,-1,1415,1415,1415,1415,1415,1415,-1,-1,1414,-1,-1,-1,-1,-1,-1],
    [-1,1415,-1,1415,1414,1414,1414,-1,-1,-1,1415,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1415,-1,-1,1414,-1,-1,-1,-1,-1,-1],
    [-1,1415,-1,1415,-1,-1,-1,-1,-1,-1,1415,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1415,-1,-1,1414,1414,1414,1414,1415,-1,-1],
    [-1,1415,-1,1415,-1,-1,-1,-1,-1,1415,1415,1415,1415,1415,1415,1415,-1,-1,-1,-1,-1,-1,1415,-1,-1,-1,-1,-1,-1,1415,-1,-1],
    [-1,1415,-1,1415,-1,-1,-1,-1,-1,1415,-1,-1,-1,-1,-1,1415,-1,-1,-1,-1,-1,-1,1415,-1,-1,-1,-1,-1,-1,1415,-1,-1],
    [-1,1415,-1,1415,1415,1415,1415,1415,1415,1415,-1,-1,-1,-1,-1,1415,1415,1415,1415,1415,1415,1415,1415,-1,-1,-1,1415,1415,1415,1415,-1,-1],
    [-1,1415,-1,1415,-1,-1,-1,-1,-1,1415,-1,-1,-1,-1,-1,1414,-1,-1,-1,-1,-1,-1,1414,-1,-1,-1,1415,-1,-1,-1,-1,-1],
    [-1,1415,-1,1415,-1,-1,-1,-1,-1,1415,-1,-1,-1,-1,-1,1414,-1,-1,-1,-1,-1,-1,1414,-1,-1,-1,1415,-1,-1,-1,-1,-1],
    [-1,1415,-1,1415,-1,-1,-1,-1,-1,1415,1415,1415,1415,1415,1415,1415,-1,-1,-1,-1,-1,-1,1414,-1,-1,-1,1415,-1,-1,-1,-1,-1],
    [-1,1415,-1,1415,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1415,-1,-1,-1,-1,-1,-1,1414,-1,-1,-1,1415,-1,-1,-1,-1,-1],
    [-1,1415,-1,1415,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1415,1415,1415,1415,1415,1415,1415,1415,1415,1415,1415,1415,-1,-1,-1,-1,-1],
    [-1,1415,1415,1415,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1415,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1415,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
]

let background2 = [
    [399,388,389,390,391,392,393,394,395,396,397,398,399,40,41,42,43,44,388,389,390,391,392,393,394,395,396,397,398,399,388,389],
    [463,452,453,454,455,456,457,458,459,460,461,462,463,104,105,106,107,108,452,453,454,455,456,457,458,459,460,461,462,463,452,453],
    [527,516,517,518,519,520,521,522,523,524,525,526,527,168,169,170,171,172,516,517,518,519,520,521,522,523,524,525,526,527,516,517],
    [591,580,581,582,583,584,585,586,587,588,589,590,591,232,233,234,235,236,580,581,582,583,584,585,586,587,588,589,590,591,580,581],
    [655,644,645,646,647,648,649,650,651,652,653,654,655,296,297,298,299,300,644,645,646,647,648,649,650,651,652,653,654,655,644,645],
    [719,708,709,710,711,712,713,714,715,716,717,718,719,360,361,362,363,364,708,709,710,711,712,713,714,715,716,717,718,719,708,709],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1415,1415,1415,1415,1415,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,1415,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1415,1415,1415,-1,-1,-1,-1,-1,-1,-1,1415,1415,1415,1415,1415,1415,1415,-1],
    [-1,1415,1415,1415,1415,1415,1415,1415,1415,1415,1415,1415,1414,1414,1414,1415,-1,-1,-1,-1,1415,1415,1415,-1,1415,-1,-1,-1,-1,-1,1415,-1],
    [-1,1415,-1,-1,-1,-1,-1,-1,1415,-1,-1,-1,-1,1414,-1,1415,1415,1415,1415,1415,1415,-1,1415,-1,1415,1415,1415,1415,1415,-1,1415,-1],
    [-1,1415,-1,-1,-1,-1,-1,-1,1415,-1,-1,-1,-1,1414,-1,1415,-1,-1,-1,-1,1415,-1,1415,-1,-1,-1,1415,-1,1415,-1,1415,-1],
    [-1,1415,1415,1415,1415,1415,-1,-1,1415,1415,1415,1415,1414,1415,-1,1415,1415,1415,1415,1415,1415,-1,1415,1415,1415,1415,1415,1415,1415,-1,1415,-1],
    [-1,-1,1414,-1,-1,1415,-1,-1,-1,-1,-1,-1,-1,1415,-1,-1,-1,-1,-1,-1,-1,-1,-1,1414,-1,-1,-1,-1,-1,-1,1415,-1],
    [-1,-1,1414,-1,-1,1415,-1,-1,-1,-1,-1,-1,-1,1415,-1,-1,-1,-1,-1,-1,-1,-1,-1,1414,-1,-1,1415,1415,1415,1415,1415,-1],
    [-1,-1,1414,-1,-1,1415,-1,-1,-1,-1,-1,-1,-1,1415,-1,-1,-1,-1,-1,1415,1415,1415,1415,1415,-1,-1,1415,-1,-1,-1,-1,-1],
    [-1,1415,1415,1415,1415,1415,-1,-1,-1,-1,-1,-1,-1,1415,-1,-1,-1,-1,-1,1415,-1,1415,-1,-1,-1,-1,1415,-1,-1,-1,-1,-1],
    [-1,1415,-1,-1,-1,1415,-1,-1,-1,-1,1415,1415,1415,1415,1415,1415,1415,1415,1415,1415,-1,1415,-1,-1,-1,-1,1415,-1,-1,-1,-1,-1],
    [-1,1415,-1,-1,-1,1415,1415,1415,1415,1415,1415,-1,-1,-1,-1,1415,-1,-1,-1,-1,-1,1415,-1,-1,-1,-1,1415,-1,-1,-1,-1,-1],
    [-1,1415,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1415,-1,-1,-1,-1,-1,1415,1415,1415,1415,1415,1415,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1415,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
];

document.addEventListener("DOMContentLoaded", init, false);

function init() {
    canvas = document.querySelector("canvas");
    context = canvas.getContext("2d");

    load_assets([
        {"var": playerImage, "url":"static/$npc003.png"},
        {"var":superPlayer, "url":"static/supernpc03.png"},
        {"var":enemyImage, "url":"static/$ghoulBase1.png"},
        {"var":backgroundImage, "url":"static/tileset.png"},
        {"var":subBackground, "url": "static/Background_space_original.png"},
        {"var":audio1, "url":"static/chiptune-grooving.mp3"},
        {"var":audio2, "url":"static/elixir-of-life.mp3"},
        {"var":thud, "url":"static/thud.mp3"}
    ], draw);

    window.addEventListener("keydown", activate, false);
    window.addEventListener("keyup", deactivate, false);
    
}

function draw() {
    count_up += 1;  //counter for timing

    // play the theme song
    // audio1.play();
    timer_count+=1;
    if (timer_count === 60){
        update_timer();
        timer_count = 0;
    }

    request_id = window.requestAnimationFrame(draw);
    let now = Date.now();
    let elapsed = now -then;
    if (elapsed <= fpsInterval) {
        return;
    }
    then = now - (elapsed % fpsInterval);

    //Draw background on canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(subBackground,
        0, 0, 240, 128,
        0, 0, canvas.width, canvas.height);
    if (level1){        //drawing level 1
        
        for (let r = 0; r < 20; r += 1) {
            for (let c = 0; c < 32; c += 1) {
                let tile = background1[r][c];
                if (tile >= 0) {
                    let tileRow = Math.floor(tile / tilesPerRow);
                    let tileCol = Math.floor(tile % tilesPerRow);
                    context.drawImage(backgroundImage,
                        tileCol * tileSize, tileRow * tileSize, tileSize, tileSize,
                        c * tileSize, r * tileSize, tileSize, tileSize);
                }
            }
        }
    }

    if (level2){         //drawing level 2
        for (let r = 0; r < 20; r += 1) {
            for (let c = 0; c < 32; c += 1) {
                let tile = background2[r][c];
                if (tile >= 0) {
                    let tileRow = Math.floor(tile / tilesPerRow);
                    let tileCol = Math.floor(tile % tilesPerRow);
                    context.drawImage(backgroundImage,
                        tileCol * tileSize, tileRow * tileSize, tileSize, tileSize,
                        c * tileSize, r * tileSize, tileSize, tileSize);
                }
            }
        }
    }
    
    //Draw player
    if (! player.invincible){
        context.drawImage(playerImage,
            player.spriteSize * player.frameX, player.spriteSize * player.frameY, player.spriteSize, player.spriteSize,
            player.x, player.y, player.size, player.size);
    } else {
        context.drawImage(superPlayer,
            player.spriteSize * player.frameX, player.spriteSize * player.frameY, player.spriteSize, player.spriteSize,
            player.x, player.y, player.size, player.size);
    }

    //Draw other objects
    for (let enemy of enemies){
        context.drawImage(enemyImage,       //Enemy A
            enemy.spriteSize * enemy.frameX, enemy.spriteSize * enemy.frameY, enemy.spriteSize, enemy.spriteSize,
            enemy.x, enemy.y, enemy.size, enemy.size);
    }

    //Handle key presses
    player_movement_speed += 1;
    if (player_movement_speed === 3) {      // moves the player once every 3 times draw is called (slower movement)
        if (moveLeft) {     //if player moves left on level 1
            player.tileX = Math.floor(player.x / tileSize);
            player.tileY = Math.floor(player.y / tileSize);
            if (level1){
                // check if the next tile is movable to, if not don't let play move there
                nextTile = background1[player.tileY][player.tileX - 1];
                if (nextTile !== -1 && nextTile !== 1414 && nextTile !== 1414) {
                    player.xChange = player.xChange - 16;
                    player.frameY = 1;
                    player.frameX = (player.frameX + 1) % 3;
                }
            }
            if (level2){     //if player moves left on level 2
                // check if the next tile is movable to, if not don't let play move there
                nextTile = background2[player.tileY][player.tileX - 1];
                if (nextTile !== -1 && nextTile !== 1414 && nextTile !== 1414) {
                    player.xChange = player.xChange - 16;
                    player.frameY = 1;
                    player.frameX = (player.frameX + 1) % 3;
                }
            }
        }
        if (moveRight) {
            player.tileX = Math.floor(player.x / tileSize);
            player.tileY = Math.floor(player.y / tileSize);
            if (level1){        //if player moves right on level 1
                // check if the next tile is movable to, if not don't let play move there
                nextTile = background1[player.tileY][player.tileX + 1];
                if (nextTile !== -1 && nextTile !== 1414 && nextTile !== 1414) {
                    player.xChange = player.xChange + 16;
                    player.frameY = 2;
                    player.frameX = (player.frameX + 1) % 3;
                }
            }
            if (level2){        //if player moves right on level 2
                // check if the next tile is movable to, if not don't let play move there
                nextTile = background2[player.tileY][player.tileX + 1];
                if (nextTile !== -1 && nextTile !== 1414 && nextTile !== 1414) {
                    player.xChange = player.xChange + 16;
                    player.frameY = 2;
                    player.frameX = (player.frameX + 1) % 3;
                }
            }
        }

        if (moveDown) {
            player.tileX = Math.floor(player.x / tileSize);
            player.tileY = Math.floor(player.y / tileSize);
            if (level1){        //if player moves down on level 1
                // check if the next tile is movable to, if not don't let play move there
                nextTile = background1[player.tileY + 1][player.tileX];
                if (nextTile !== -1 && nextTile !== 1414 && nextTile !== 1414) {
                    player.yChange = player.yChange + 16;
                    player.frameY = 0;
                    player.frameX = (player.frameX + 1) % 3;
                }
            }
            if (level2){        //if player moves down on level 2
                // check if the next tile is movable to, if not don't let play move there
                nextTile = background2[player.tileY + 1][player.tileX];
                if (nextTile !== -1 && nextTile !== 1414 && nextTile !== 1414) {
                    player.yChange = player.yChange + 16;
                    player.frameY = 0;
                    player.frameX = (player.frameX + 1) % 3;
                }
            }
        }

        if (moveUp) {
            player.tileX = Math.floor(player.x / tileSize);
            player.tileY = Math.floor(player.y / tileSize);
            if (level1){        	//if player moves up on level 1
                // check if the next tile is movable to, if not don't let play move there
                nextTile = background1[player.tileY - 1][player.tileX];
                if (nextTile !== -1 && nextTile !== 1414 && nextTile !== 1414) {
                    player.yChange = player.yChange - 16;
                    player.frameY = 3;
                    player.frameX = (player.frameX + 1) % 3;
                }
            }
            if (level2){            //if player moves up on level 2
                // check if the next tile is movable to, if not don't let play move there
                nextTile = background2[player.tileY - 1][player.tileX];
                if (nextTile !== -1 && nextTile !== 1414 && nextTile !== 1414) {
                    player.yChange = player.yChange - 16;
                    player.frameY = 3;
                    player.frameX = (player.frameX + 1) % 3;
                }
            }
        }
    // re-initialize the movement speed counter so player can move continuously
    player_movement_speed = 0
    }


    //Update the player
    player.x = player.x + player.xChange;
    player.y = player.y + player.yChange;

    //Update the other objects
    enemy_movement_speed += 1
    if (enemy_movement_speed === 10){

        // make enemies move towards the player
        for (let enemy of enemies){
            directionV, directionH = getDirection(enemy);
            move_enemy(enemy, directionV);
            move_enemy(enemy, directionH);
        }
        enemy_movement_speed = 0;
    }

    //Physics
    player.xChange = player.xChange * 0; // friction
    player.yChange = player.yChange * 0; // friction

    //Collisions
    if ((check_collision(enemyA) || 
    check_collision(enemyB) || 
    check_collision(enemyC) || 
    check_collision(enemyD)) 
    && (player.invincible === false)) {     // if an non-invincible player hits an enemy - stop the game
        stop("You lose!")

    }

    //Win Condition
    player.tileX = Math.floor(player.x / tileSize);
    player.tileY = Math.floor(player.y / tileSize);
    
    if (level1){  //if player clears level 1, load level 2
        let position = background1[player.tileY][player.tileX];
        if (position === 307 || position === 371) {
            level1 = false;
            level2 = true;
            player.x = 240;
            player.y = 304;
            enemyA.x = 176;
            enemyA.y = 128;
            enemyB.x = 16;
            enemyB.y = 304;
            enemyC.x = 208;
            enemyC.y = 176;
            enemyD.x = 240;
            enemyD.y = 128;
        }
    }
    if (level2){    // if player clears level 2, they win the game
        let position = background2[player.tileY][player.tileX];
        if (position >= 295 && position < 301 || position >= 643 && position <= 656) {
            stop("You Win!");
        }
    }

    //Boundaries
    if (player.x < 0) {     //left side
        player.x = 0;
    }
    if (player.x > canvas.width - player.size){     //right side
        player.x = canvas.width - player.size;
    }
    if (player.y < 0) {     //top
        player.y = 0;
    }
    if (player.y > canvas.height - player.size){    //bottom
        player.y = canvas.height - player.size;
    }

    for (let enemy of enemies){
        if (enemy.x < 0) {     //left side
            enemy.x = 0;
        }
        if (enemy.x > canvas.width - enemy.size){     //right side
            enemy.x = canvas.width - enemy.size;
        }
        if (enemy.y < 0) {     //top
            enemy.y = 0;
        }
        if (enemy.y > canvas.height - enemy.size){    //bottom
            enemy.y = canvas.height - enemy.size;
        }  
    }

    // ability - berserker mode/invincibility
    if (level1 || level2){
        if (pressSpace) {       // if the user presses space - deploy the shield for 75 calls of draw
            if (time_left < 75){
                audio2.play()   // play the shield theme
                player.invincible = true;
                let berserker = document.querySelector("#berserker");
                berserker.innerHTML = "Berserker Mode left: 0"
            }
            time_left += 1;
            if (time_left > 75){
                audio2.pause();
                player.invincible = false;
            }
        }
    }

    //cheat 
    if (level1 && cheat) {
        for (let i = 0; i < background1.length; i+=1){
            for (let j = 0; j < background1[i].length; j+=1){
                if (background1[i][j] === 1414){
                    background1[i][j]
                    background1[i][j] = -1;
                }
            }
        }
    }
    if (level2 && cheat) {
        for (let i = 0; i < background2.length; i+=1){
            for (let j = 0; j < background2[i].length; j+=1){
                if (background2[i][j] === 1414){
                    background2[i][j] = -1;
                }
            }
        }
    }


}
function activate(event) {
    //enable an action when a key is pressed down

    let key = event.key;
    if (key === "ArrowLeft") {
        moveLeft = true;
    } else if (key === "ArrowRight") {
        moveRight = true;
    } else if (key === "ArrowUp") {
        moveUp = true;
    } else if (key === "ArrowDown") {
        moveDown = true;
    } else if (key === " ") {
        pressSpace = true;
    } else if (key === "f") {
        cheat = true;
    }
}


function deactivate(event) {
    // disable the action when the key is lifted

    let key = event.key;
    if (key === "ArrowLeft") {
        moveLeft = false;
    } else if (key === "ArrowRight") {
        moveRight = false;
    } else if (key === "ArrowUp") {
        moveUp = false;
    } else if (key === "ArrowDown") {
        moveDown = false;
    }
}

function load_assets(assets, callback) {
    // don't begin the game until every has been loaded

    let num_assets = assets.length;
    let loaded = function() {
        console.log("loaded");
        num_assets = num_assets - 1;
        if (num_assets === 0) {
            callback();
        }
    };
    for (let asset of assets) {
        let element = asset.var;
        if (element instanceof HTMLImageElement) {          // images
            console.log("img");
            element.addEventListener("load", loaded, false);
        }
        else if (element instanceof HTMLAudioElement) {     //audio
            console.log("audio");
            element.addEventListener("canplaythrough", loaded, false);
        }
        element.src = asset.url;
    }
}

function move_enemy(enemy, direction){
    // function that moves the enemy in the direction received from getDirection()

    enemy.tileX = Math.floor(enemy.x / tileSize);
    enemy.tileY = Math.floor(enemy.y / tileSize);
    if (level1){
        // ensure the next tile the enemy tries to move to if a movable to tile

        if (direction === "left"){
            nextTile = background1[enemy.tileY][enemy.tileX - 1];
            if (nextTile !== -1 && nextTile !== 1414 && nextTile !== 1414) {
                thud.play();
                enemy.xChange = 16;
                enemy.x = enemy.x - enemy.xChange;
                enemy.xChange = 0;
                enemy.frameY = 1;
                enemy.frameX = (enemy.frameX + 1) % 3;
                if (count_up > 1){
                    thud.pause()
                    count_up = 0;
                }
                
            }
        }
    
        if (direction === "right"){
            nextTile = background1[enemy.tileY][enemy.tileX + 1];
            if (nextTile !== -1 && nextTile !== 1414 && nextTile !== 1414) {
                thud.play();
                enemy.xChange = 16;
                enemy.x = enemy.x + enemy.xChange;
                enemy.xChange = 0;
                enemy.frameY = 2;
                enemy.frameX = (enemy.frameX + 1) % 3;
                if (count_up > 1){
                    thud.pause()
                    count_up = 0;
                }
            }
        }
        if (direction === "up"){
            nextTile = background1[enemy.tileY - 1][enemy.tileX];
            if (nextTile !== -1 && nextTile !== 1414 && nextTile !== 1414) {
                thud.play();
                enemy.yChange = 16;
                enemy.y = enemy.y - enemy.yChange;
                enemy.yChange = 0;
                enemy.frameY = 3;
                enemy.frameX = (enemy.frameX + 1) % 3;
                if (count_up > 1){
                    thud.pause()
                    count_up = 0;
                }
            }
        }
        if (direction === "down"){
            nextTile = background1[enemy.tileY + 1][enemy.tileX];
            if (nextTile !== -1 && nextTile !== 1414 && nextTile !== 1414) {
                thud.play();
                enemy.yChange = 16;
                enemy.y = enemy.y + enemy.yChange;
                enemy.yChange = 0;
                enemy.frameY = 0;
                enemy.frameX = (enemy.frameX + 1) % 3;
                console.log("Cambia")
                if (count_up > 1){
                    thud.pause()
                    count_up = 0;
                }
            }
        }
    }

    if (level2){
        if (direction === "left"){
            nextTile = background2[enemy.tileY][enemy.tileX - 1];
            if (nextTile !== -1 && nextTile !== 1414 && nextTile !== 1414) {
                enemy.xChange = 16;
                enemy.x = enemy.x - enemy.xChange;
                enemy.xChange = 0;
                enemy.frameY = 1;
                enemy.frameX = (enemy.frameX + 1) % 3;
            }
        }
    
        if (direction === "right"){
            nextTile = background2[enemy.tileY][enemy.tileX + 1];
            if (nextTile !== -1 && nextTile !== 1414 && nextTile !== 1414) {
                enemy.xChange = 16;
                enemy.x = enemy.x + enemy.xChange;
                enemy.xChange = 0;
                enemy.frameY = 2;
                enemy.frameX = (enemy.frameX + 1) % 3;
            }
        }
        if (direction === "up"){
            nextTile = background2[enemy.tileY - 1][enemy.tileX];
            if (nextTile !== -1 && nextTile !== 1414 && nextTile !== 1414) {
                enemy.yChange = 16;
                enemy.y = enemy.y - enemy.yChange;
                enemy.yChange = 0;
                enemy.frameY = 3;
                enemy.frameX = (enemy.frameX + 1) % 3;
            }
        }
        if (direction === "down"){
            nextTile = background2[enemy.tileY + 1][enemy.tileX];
            if (nextTile !== -1 && nextTile !== 1414 && nextTile !== 1414) {
                enemy.yChange = 16;
                enemy.y = enemy.y + enemy.yChange;
                enemy.yChange = 0;
                enemy.frameY = 0;
                enemy.frameX = (enemy.frameX + 1) % 3;
            }
        }
    }

}

function stop(outcome) {
    //stops the game once the user either dies, runs out of time or wins
    setTimer = false;
    //stop the main theme from playing
    // audio1.pause();

    play_again()

    window.removeEventListener("keydown", activate, false);
    window.removeEventListener("keyup", deactivate, false);
    window.cancelAnimationFrame(request_id);

    let outcome_element = document.querySelector("#outcome");
    let completion_time = timer.innerHTML;

    //if the player won display their score and post it to app.py
    if (outcome === "You Win!"){        
        score = calculate_score(completion_time);
        outcome_element.innerHTML = outcome + " SCORE: " + score
    } else {
        outcome_element.innerHTML = outcome;
    }

    let data = new FormData();
    data.append("score", score);

    xhttp = new XMLHttpRequest();
    xhttp.addEventListener("readystatechange", handle_response, false);
    xhttp.open("POST", "/~jdw2/cgi-bin/ca2/run.py/add_to_leaderboard", true);
    xhttp.send(data);
}
    
function calculate_score(completion_time){
    //score is based on completion time, different points awarded depending on the minute and second completed in

    let minute_points = Number(completion_time[0]) * 100;
    let second_points = Number(completion_time.slice(2,4));
    second_points = Math.floor(second_points / 6 * 10)
    score = minute_points + second_points;
    return score;
}

function check_collision(enemy){
    // check is the player has collided with any of the enemies

    if ((player.x < enemy.x) ||
        (enemy.x < player.x) ||
        (player.y > enemy.y) ||
        (enemy.y > player.y)) {
            return false;
    } else {
            return true;
    }
}

function getDirection(enemy){
    //algorithm that determines which direction the player is in regards to the enemy and returns the horizontal
    //and vertical directions

    if (enemy.x < player.x) {
        directionV = "right";
    } else if (enemy.x > player.x) {
        directionV = "left";
    } else {
        directionV = null;
    }
    
    if (enemy.y < player.y) {
        directionH = "down";
    } else if (enemy.y > player.y) {
        directionH = "up";
    } else {
        directionH = null;
    }
    return directionV,directionH
}

function handle_response() {
    // check that the response has fully arrived
    if (xhttp.readyState === 4) {
        // check the request was successful
        if (xhttp.status === 200) {
            //score was successfully stored in database
            console.log("Yes")
        } else {
            // score was not successfully stored in database
            console.log("No")
        }
    }
}

function update_timer() {
    // loads the timer and starts a countdown from n seconds - turns into minutes
    // resource used:https://www.geeksforgeeks.org/javascript-padstart-method/

    let timer = document.querySelector("#timer");

    if (setTimer){
        let minutes = Math.floor(countdown_from / 60)
        let seconds = countdown_from % 60
        timer.innerHTML = String(minutes) + ":" + String(seconds).padStart(2,"0")
        countdown_from-=1
        if (timer.innerHTML === "0:00"){
            stop("Time up. You lose!")
        }
    }
}

function play_again(){
    let restart = document.querySelector("#play_again");

    restart.innerHTML = "Play Again?"
    restart.href = "play"
    restart.style = "border:1px solid black; \
                     background-color:#ff35ff; \
                     padding:.5em;" 
}