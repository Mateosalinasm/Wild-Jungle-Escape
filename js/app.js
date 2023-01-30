window.addEventListener('load',() => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    canvas.height = 400;
    canvas.width = 720;

    class Keys{
        constructor(){
            this.keys = [];
            window.addEventListener('keydown', event =>{
                if((event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'ArrowRight' ||
                event.key === 'ArrowLeft') && this.keys.indexOf(event.key) === -1){ 
                    this.keys.push(event.key)
                } //Used indexOf(event.key) to check if the key was in the array, if not then to push the key into the array
                console.log(event.key, this.keys)
            });
            window.addEventListener('keyup', event => {
                if((event.key === 'ArrowDown' || 'ArrowUp' || 'ArrowRight' || 'ArrowLeft')){
                    this.keys.splice(this.keys.indexOf(event.key), 1);
                }
            })
            console.log(this.keys)
        }
    }

    const keyPress = new Keys();


    class Player{
        constructor(gameWidth, gameHeight){
            this.width = 45
            this.height = 50
            this.x = 5
            this.y = 322
            this.gameWidth = gameWidth
            this.gameHeight = gameHeight
        }
        // draw(ctx){
        //     ctx.fillstyle = 'white';
        //     ctx.fillRect(this.x, this.y,this.width, this.height)
        // }
    }

    const player1 = new Player(canvas.width, canvas.height)
    const char = new Image();
    char.src = 'css/images/idle outline.gif'
    char.style.zIndex = 100
    char.onload = () => {
        ctx.drawImage(char, 5, 322, 45,50)
    }

    let floor = new Image();
    floor.src = 'css/images/floor.png'
    floor.onload = () => {
        ctx.drawImage(floor, -5, 362, 300, 50) 
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
            

            this.draw = function(){
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
                ctx.strokeStyle = 'yellow'
                ctx.fillStyle = 'yellow'
                ctx.stroke();
                ctx.fill();
            }

            this.update = function(){
                if(this.x + this.radius > canvas.width + 10 || this.x - this.radius < -10){
                    this.dx = -this.dx
                }

                if(this.y + this.radius > canvas.height  || this.y - this.radius < -10){
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
        let dx = (Math.random() - 0.5) / 1;
        let dy = (Math.random() - 0.5) / 1;
        
        fireFliesArr.push(new FireFly(x, y, dx, dy, radius))
    
    }

    console.log(fireFliesArr)

    function animate(){
        requestAnimationFrame(animate)
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for(let i = 0; i < fireFliesArr.length; i++){
            fireFliesArr[i].update()
        }
    
    }
    animate()
    
})

//References:
/* Canvas: 
https://www.youtube.com/playlist?list=PLpPnRKq7eNW3We9VdCfx9fprhqXHwTPXL.
https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API.
https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_usage.
https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes.
https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillRect.
https://fjolt.com/article/html-canvas-adding-images.
*/

