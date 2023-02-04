window.addEventListener('load',() => {

    const canvas = document.querySelector('#background');
    const ctx = canvas.getContext('2d');
    
    let gameOver = false

    

    //Start Button
    let startButton = document.querySelector('.start')
    startButton.addEventListener('click', startGame)
    
    //Reset Button
    let resetButton = document.querySelector('.reset')
    let restartSound = document.getElementById('restart-sound')
    resetButton.addEventListener('click', function restart() {
        restartSound.play()
        setTimeout(() => {
            window.location.reload()
        }, 1000)
        
    })

    //Aesthic elements
    let title = document.querySelector(".title")
    title.classList.add('animate__zoomInDown')
    
    let hang = document.querySelector('.hang')
    let idle = document.querySelector('.idle')
    let air = document.querySelector('.air')
    let gameOverImg = document.querySelector('.game-over')
    let jumpSound = document.getElementById('jump-sound')
    let gameOverSound = document.getElementById('game-over-sound')
    let song = document.getElementById('song')
    
   

    //Mute Button
    let soundIcon = document.querySelector('.sound-icon')
    soundIcon.addEventListener('click', () =>{
        soundIcon.style.visibility = 'hidden'
        mute.style.visibility = 'visible'
        song.pause()
    })
    let mute = document.querySelector('.mute')
    mute.addEventListener('click', () => {
        mute.style.visibility = 'hidden'
        soundIcon.style.visibility = 'visible'
        song.play()
    })
  
    

    let enemy = document.querySelector('.enemy')
    let player = document.querySelector('.player')
    player.style.position = "absolute";
    player.style.left = "-60px";
    player.style.top = "557px";

    let scoreText = document.getElementById('score')
    let scoreNumber = document.querySelector('#number')
    let score = 0
    
    function scoreCount(){
        let count = setInterval(() =>{
            score++
            document.querySelector('#number').innerHTML = score

            if(gameOver === true){
            clearInterval(count)
            }
        }, 1000)
      
    }

    

    //Collision Detection
    let collision = setInterval(function () {
        
        let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue('top'))
        let playerB = parseInt(window.getComputedStyle(player).getPropertyValue('bottom'))
    

        let enemyLeft = parseInt(window.getComputedStyle(enemy).getPropertyValue('left'))
        console.log(playerTop)

        let enemyTop = parseInt(window.getComputedStyle(enemy).getPropertyValue('top'))
        console.log(enemyLeft)


        // let playerHeight = player.offsetHeight;
        // let playerBottom = playerTop + playerHeight;

        // if (enemyTop <= playerBottom && enemyTop >= playerTop) {
        //     // console.log('hasdfhas')
        // }
        // if(enemyTop > 612 && playerBottom == 480){
        //     console.log('yehaa')
        // }

        if(enemyLeft < 3 && enemyLeft > 0 && playerTop >= 557){
            
            gameOverFunct()
        }

    }, 10)

    function difficulty(){
        let speed = 6;
        let speedInterval = setInterval(() => {
          enemy.style.animation = `move ${speed}s infinite linear`;
          console.log(`speed: ${speed}`);
          speed -= 0.2;
          if (speed < 2) {
            clearInterval(speedInterval);
          }
        }, 7000);
    }
    difficulty()

    let arrowKeysPressed = false;

    function leftArrowPressed() {
      
        player.style.left = parseInt(player.style.left) - 15 + 'px';
        arrowKeysPressed = true;
    }

    function rightArrowPressed() {
     
        player.style.left = parseInt(player.style.left) + 15 + 'px';
        arrowKeysPressed = true;
    }


    function space() {
       
        player.classList.add('jump')
        jumpSound.play()
        setTimeout(() => {
            player.classList.remove('jump');
        }, 400);
            
      
        arrowKeysPressed = true;
      }
      
    //   function idle(){
    //     player.src = 'css/images/idle outline.gif';
       
    //     arrowKeysPressed = false;
    //   }
      
    // function upArrowPressed() {
    //     player.src = 'css/images/jump outline.png'
    //     player.style.animation = "jump 0.4s linear";
    //     player.classList.add('jump')
    //     // player.style.top = parseInt(player.style.top) - 10 + 'px';
       
    //     arrowKeysPressed = true;
    // }

    // function idle(){
    //     player.src = 'css/images/idle outline.gif';
    //     setTimeout(() => {
    //         player.classList.remove('jump')
    //     }, 1000);
       
    //     arrowKeysPressed = false;
    // }

    // function downArrowPressed() {
    
    //     player.style.top = parseInt(player.style.top) + 5 + 'px';
    // }

    function moveSelection(e) {
        switch (e.keyCode) {
            case 37:
            leftArrowPressed();
            break;
            case 39:
            rightArrowPressed();
            break;
            case 32:
            space();
            break;
            case 40:
            downArrowPressed();
            break;
        }
    
    };
    // document.addEventListener('keydown',function(){
    //     jump();
    // })
    window.addEventListener('keydown', moveSelection);
    // window.addEventListener('keyup', idle);

    
    function startGame() {
        startButton.style.visibility = 'hidden'
        resetButton.style.visibility = 'hidden'
        hang.style.visibility = 'hidden'
        idle.style.visibility = 'hidden'
        enemy.style.animationPlayState = 'running'
        canvas.style.animationPlayState = 'running'
        enemy.style.visibility = 'visible'
        player.style.visibility = 'visible'
        scoreText.style.visibility = 'visible'
        scoreNumber.style.visibility = 'visible'
        song.play()
        

        
        scoreCount()
    
        gameOver = false
        enemy.style.left = '1050px';

        console.log('Start!')
    }
    

    function gameOverFunct() {
       
        enemy.style.animationPlayState = 'paused'
        // air.style.visibility = 'visible'
        canvas.style.animation = 'paused'
        enemy.style.visibility = 'hidden'
        player.style.visibility = 'hidden'
        resetButton.style.visibility = 'visible'
        startButton.style.visibility = 'hidden'
        gameOverImg.style.visibility = 'visible'
        gameOverImg.classList.add('animate__wobble')
        scoreNumber.style.visibility = 'hidden'
        scoreText.style.visibility = 'hidden'
        song.pause()
        
        
        resetButton.style.zIndex = '5'
        enemy.style.left = '1050px';
       
     
    
        
        gameOver = true
        console.log('game over')
    }

    /* 
    While teaching myself how to use canvas I learned how to animate circles and thought it would be a really fun
    add-on if I could create fireflies of random sizes that just float around and bounce off the walls.
    */
    class FireFly {
        constructor(x, y, dx, dy, radius){
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.radius = radius;
            
        
            this.draw = () => {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
                ctx.strokeStyle = 'yellow'
                ctx.fillStyle = 'yellow'
                ctx.stroke();
                ctx.fill();
            }

            this.update = () => {
                if(this.x + this.radius > canvas.width + 10 || this.x - this.radius < -10){
                    this.dx = -this.dx
                }

                if(this.y + this.radius > canvas.height || this.y - this.radius < -10){
                    this.dy = -this.dy
                }

                this.x += this.dx
                this.y += this.dy

                this.draw()
            }
        }
    }


    let fireFliesArr = []

    for(let i = 0; i < 150; i++){
        let radius = Math.random() * 1.1;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let dx = (Math.random() - 0.5) / 2;
        let dy = (Math.random() - 0.5) / 2;
        
        fireFliesArr.push(new FireFly(x, y, dx, dy, radius))

    }

    function animateFireFlies(){
        requestAnimationFrame(animateFireFlies)
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for(let i = 0; i < fireFliesArr.length; i++){
            fireFliesArr[i].update()
        }

    }
    animateFireFlies()


    const rules = document.querySelector('.rules');
    const scroll = document.querySelector('.scroll');
    const scrollSound = document.getElementById('paper-sound')

    rules.addEventListener('click', () => {
        
        if (scroll.style.display === 'block') {
        
        scroll.style.display = 'none';
        scroll.classList.remove('animate__fadeInBottomRight');
        scroll.classList.add('animate__fadeOutBottomRight');
       
        } 
        //I can't get the second animation to fade out.
        else{
        scroll.style.display = 'block';
        scroll.classList.remove('animate__fadeOutBottomRight');
        scroll.classList.add('animate__fadeInBottomRight');
        scrollSound.play()
        }
    });
    
})





/* Failed Attempt at making the game using canvas. Learned a lot, but I need more time to be able
to create the type of game I wanted to make. */


//References:
/* Canvas: 
https://www.youtube.com/playlist?list=PLpPnRKq7eNW3We9VdCfx9fprhqXHwTPXL.
https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API.
https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_usage.
https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes.
https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillRect.
https://fjolt.com/article/html-canvas-adding-images.

Jungle Pack:
https://jesse-m.itch.io/jungle-pack

Pausing Animation:
https://css-tricks.com/how-to-play-and-pause-css-animations-with-css-custom-properties/
*/



// const foreground = document.getElementById('foreground');
// const fgCtx = foreground.getContext('2d')

  // class Player{
  //     constructor(gameWidth, gameHeight){
  //         this.x = 60
  //         this.y = 322
  //         this.width = 45
  //         this.height = 50
  //         this.gameWidth = gameWidth
  //         this.gameHeight = gameHeight
  //         this.image = document.getElementById('player')
  //         this.speed = 0
  //         this.yJump

  //         this.draw = (contex) => {
  //             contex.drawImage(this.image,this.x, this.y, this.width, this.height)
  //         }
  //         //This will move the player on the x axis
  //         this.update = (keyPress) => {
  //             this.x += this.speed
  //             if(keyPress.keys.indexOf('ArrowRight') > -1){
  //                 this.speed = 2
  //             } else if(keyPress.keys.indexOf('ArrowLeft') > -1) {
  //                 this.speed = -2
  //             } else {
  //                 this.speed = 0
  //             }
  //             if(this.x < 0) {
  //                 this.x = 0;
  //             } else if(this.x > this.gameWidth - this.width){
  //                this.x = this.gameWidth - this.width - 900
  //             }

  //             // if(this.x < 0){
  //             //     this.x = 0
  //             // } else if (this.x > this.foreground.width - this.width){
  //             //     this.x = this.foregroundWidth - this.width
  //             // }
  //         }
  //     }
  // }

  // const indianaJones = new Player()
  // indianaJones.draw(fgCtx)


   //Floor
//     function floor() {
//         const Bottomfloor = document.getElementById('floor')
//         fgCtx.drawImage(Bottomfloor, 0, 0)
//     }
//    floor()


// let guyJumping = new Image();
  // guyJumping.src = 'css/images/mid air outline.gif'
  // guyJumping.onload = (e) => {
  //     fgCtx.drawImage(guyJumping, 10, 100, 30, 20)
  // }

  // const player1 = new Player(canvas.width, canvas.height)
  // let char = new Image();
  // char.src = 'css/images/idle outline.gif'
  // char.onload = (e) => {
  //     fgCtx.drawImage(char, 5, 316, 40,55)
  // }

  // let floor = new Image();
  // floor.src = 'css/images/floor.png'
  // floor.onload = () => {
  // fgCtx.drawImage(floor, -5, 360, 300, 50) 
  // }

  // let charX = 5
  // let charY = 321

  //This way doesn't move the character, need to find another way
  // document.onkeydown = function(event){
  //     switch(event.keyCode){
  //         case 37: // left arrow
  //             console.log('left')
  //             charX -= 10;
  //             break;
  //         case 38: // up arrow
  //         console.log('right')
  //             charY -= 10;
  //             break;
  //         case 39: // right arrow
  //         console.log('up')
  //             charX +=10;
  //             break;
  //         //case 40: // down arrow


  //     }
  // }



  // class Keys{
  //     constructor(){
  //         this.keys = [];
  //         window.addEventListener('keydown', event =>{
  //             if((event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'ArrowRight' ||
  //             event.key === 'ArrowLeft') && this.keys.indexOf(event.key) === -1){ 
  //                 this.keys.push(event.key) //Use .push to add the key to the array
  //             } //Use indexOf(event.key) to check if the key was in the array, if not then to push the key into the array
  //             console.log(event.key, this.keys)
  //         });
  //         window.addEventListener('keyup', event => {
  //             if((event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'ArrowRight' || event.key === 'ArrowLeft')){
  //                 this.keys.splice(this.keys.indexOf(event.key), 1); //Use .splice to remove the key from the array once the key is let go
  //             }
  //         })
  //         console.log(this.keys)
  //     }
  // }


  // const keyPress = new Keys();

  // function animatePlayer(){
  //     fgCtx.clearRect(0, 0, 720, 400)
  //     indianaJones.draw(fgCtx)
  //     indianaJones.update(keyPress)
  //     requestAnimationFrame(animatePlayer)
  // }

  // animatePlayer()




