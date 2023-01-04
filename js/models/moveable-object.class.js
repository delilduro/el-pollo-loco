class MoveableObject extends DrawableObject{

    currentImage = 0;
    speed = 0.3;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    energy = 100;
    lastHit = 0;
    progessCoinBar = 0;
    progessBottleBar = 0;
    GameExit = false;
    

    isCollading(mObject) {
        return (this.x + this.width > mObject.x &&
            this.y + this.height > mObject.y &&
            this.x < mObject.x &&
            this.y < mObject.y + mObject.height
        );
    }


    stopSpeed() {
        return this.speed = 0;
    }


    gameExit() {
        if(this.isDead()) {
            return this.GameExit = true;
        }
    }


    hit(damage) {
        this.energy -= damage ? damage:5;
        if(this.energy < 0) {
            this.energy = 0
        } else{
            this.lastHit = new Date().getTime();
        }
    }


    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 500;
        return timePassed < 0.5;
    }

    
    isDead() {
        return this.energy == 0;
    }


    raiseProgressbarCoin() {
        this.progessCoinBar += 10;
    }


    raiseProgressbarBottle() {
        this.progessBottleBar += 10;
    }


    decreaseProgressbarBottle() {
        this.progessBottleBar -= 10;
    }


    applyGravity() {
        setStopableInterval(()=>{
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    isAboveGround() {
        if(this instanceof ThrowableObject){
            return true;
        } else {
            return this.y < 125;
        }
    }
    
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    moveLeft() {
        this.x -= this.speed ;   
    }


    moveRight() {
        this.x += this.speed;
    }


    jump() {
        this.speedY = 20;
    }
}