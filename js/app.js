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

}) 