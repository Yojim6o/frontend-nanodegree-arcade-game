// constants
var PLAYER_X_COORDINATE = 202;
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
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    var lanes = [62,144,226]; //-25, 58, 141, 224, 307, 390 (multiplier: 83)
    if (this.x < 525) {
        this.x += this.speed * dt;  
    } else {
        this.x = -100;
        this.y = lanes[getRandomInt(0,3)];
        this.speed = getRandomInt(2,6)*100;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

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
        this.x <= (allEnemies[i].x + 32) && allEnemies[i].x <= (this.x + 32) && this.y <= (allEnemies[i].y + 32) && allEnemies[i].y <= (this.y + 32)
    ) {
        this.x = 202;
        this.y = 390;
    }
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(e) {
    if (e === 'left') {
        if (this.x !== 0) {
            this.x -= 101;
        }
    } else if (e === 'right') {
        if (this.x !== 404) {
            this.x += 101;
        }
    } else if (e === 'up') {
        this.y -= 83;
    } else if (e === 'down') {
        if (this.y !== 390) {
            this.y += 83;
        }
    }
    if (this.y < 0) {
        this.x = 202;
        this.y = 390;
        allEnemies.push(new Enemy(-100,62,500));
        console.log(allEnemies.length);
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
allEnemies.push(new Enemy(-100,62,500));
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