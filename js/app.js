// contants
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
    this.sprite = 'images/enemy-bug.png';
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
        this.speed = getRandomInt(6,11)*50;
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var lanes = [60,140,225];

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

};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};


var bug1 = new Enemy(100,lanes[getRandomInt(0,3)],300);
var bug2 = new Enemy(100,lanes[getRandomInt(0,3)],300);
var bug3 = new Enemy(100,lanes[getRandomInt(0,3)],300);
var bug4 = new Enemy(100,lanes[getRandomInt(0,3)],300);
var bug5 = new Enemy(100,lanes[getRandomInt(0,3)],300);
var allEnemies = [bug1,bug2,bug3,bug4,bug5];
bug1.update();
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
