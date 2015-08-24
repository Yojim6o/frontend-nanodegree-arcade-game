// constants
var PLAYER_X_COORDINATE = 200;
var PLAYER_Y_COORDINATE = 390;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-princess-girl.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 525) {
        this.x += this.speed * dt;  
    } else {
        this.x = -100;
        this.y = lanes[getRandomInt(0,3)];
        this.speed = getRandomInt(2,6)*100;
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var lanes = [62,144,226]; //-20, 62, 144, 226, 308, 390 (multiplier: 82)

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(dt) {
    for (var i = 0; i < allEnemies.length; i++)
    if (
        this.x <= (allEnemies[i].x + 32)
        && allEnemies[i].x <= (this.x + 32)
        && this.y <= (allEnemies[i].y + 32)
        && allEnemies[i].y <= (this.y + 32)
    ) {
        this.x = 200;
        this.y = 390;
    }
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(e) {
    if (e === 'left') {
        if (this.x === 0) {
            this.x -= 0;
        } else {
            this.x -= 100;
        }
    } else if (e === 'right') {
        if (this.x === 400) {
            this.x += 0;
        } else {
            this.x += 100;
        }
    } else if (e === 'up') {
        this.y -= 82;
    } else if (e === 'down') {
        if (this.y === 390) {
            this.y += 0;
        } else {
            this.y += 82;
        }
    }
    if (this.y === -20) {
        this.x = 200;
        this.y = 390;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};


var bug1 = new Enemy(-100,lanes[getRandomInt(0,3)],getRandomInt(2,6)*100);
var bug2 = new Enemy(0,lanes[getRandomInt(0,3)],getRandomInt(2,6)*100);
var bug3 = new Enemy(100,lanes[getRandomInt(0,3)],getRandomInt(2,6)*100);
var bug4 = new Enemy(250,lanes[getRandomInt(0,3)],getRandomInt(2,6)*100);
var bug5 = new Enemy(300,lanes[getRandomInt(0,3)],getRandomInt(2,6)*100);
var allEnemies = [bug1,bug2,bug3,bug4,bug5];
var player = new Player(PLAYER_X_COORDINATE,PLAYER_Y_COORDINATE);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});