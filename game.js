const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');

startScreen.addEventListener('click', start);

let player = {speed:7, score:0};

let keys = {ArrowUp: false, ArrowDown: false, ArrowRight: false, ArrowLeft: false};

document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);

//keydown event -> when user presses a key
//keyup event -> when user releases a key
function keyDown(e){
    e.preventDefault();
    keys[e.key] = true; //when we press a particular key, change it's value to true
    //console.log(e.key);
}

function keyUp(e){
    e.preventDefault();
    keys[e.key] = false;//when we release a particular key, change it's value to false
    //console.log(e.key);
}

function isCollide(a,b)
{
    aRect = a.getBoundingClientRect(); //our car
    bRect = b.getBoundingClientRect(); //enemy car
    return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) ||
     (aRect.right < bRect.left) || (aRect.left > bRect.right));
}

function moveLines()
{
    let lines = document.querySelectorAll('.lines');

    lines.forEach(function(item){
        if(item.y >= 670)
        {
            item.y -= 730;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function endGame()
{
    player.start = false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML = "Game Over <br> Your final score is "+player.score+"<br> Press here to restart the game."
}

function moveEnemy(car)
{
    let enemy = document.querySelectorAll('.enemy');

    enemy.forEach(function(item){
        if(isCollide(car,item))
        {
            console.log('Hit');
            endGame();
        }
        if(item.y >= 600)
        {
            item.y =-330;
            item.style.left = Math.floor(Math.random()*350)+"px";
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
        
    })
}


//The getBoundingClientRect() method returns the size of an element and its position relative to the viewport.

function gamePlay()
{
   // console.log("clicked");
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();

    if(player.start)
    {
        moveLines();
        moveEnemy(car);
        if(keys.ArrowUp && player.y > road.top + 70){player.y -= player.speed;}
        if(keys.ArrowDown && player.y < road.bottom - 85){ player.y += player.speed;} 
        if(keys.ArrowLeft && player.x > 0){player.x -= player.speed;}
        if(keys.ArrowRight && player.x < road.width-50){player.x += player.speed;}

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";
        window.requestAnimationFrame(gamePlay);
        player.score++;
        let ps = player.score-1;
        score.innerText = "Your Score : "+ ps;
    } 
}

//The window.requestAnimationFrame() method tells the browser that you wish to perform
// an animation and requests that the browser calls a specified function to update an animation right before the next repaint. 
//The method takes a callback as an argument to be invoked before the repaint.


function start()
{
    //gameArea.classList.remove('hide');
    startScreen.classList.add('hide');
    gameArea.innerHTML = "";
    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay); 

    for(x=0;x<5;x++)
    {
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class','lines');
        roadLine.y = (x*150);
        roadLine.style.top = roadLine.y + "px"; //first line will be from 0 to 100, as height of line is 100, then second line will be from 150 to 250 and so on..
        gameArea.appendChild(roadLine);
    }
    

    let car = document.createElement('div');
    car.setAttribute('class','car');
    //car.innerText = "Hey I am ur car";
    gameArea.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    for(x=0;x<3;x++)
    {
        let enemycar = document.createElement('div');
        enemycar.setAttribute('class','enemy');
        enemycar.y = ((x+1)*350)*-1;
        enemycar.style.top = enemycar.y + "px"; //first line will be from 0 to 100, as height of line is 100, then second line will be from 150 to 250 and so on..
        enemycar.style.left = Math.floor(Math.random()*350)+"px";
        gameArea.appendChild(enemycar);
    }

    //console.log("left position : ", car.offsetLeft);
    //console.log("top position : ", car.offsetTop);

    
}
