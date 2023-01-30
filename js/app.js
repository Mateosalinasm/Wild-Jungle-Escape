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
    // ctx.drawImage(floor, 80, 10, 100, 30, 0, 250, 100, 50)
}

}) 