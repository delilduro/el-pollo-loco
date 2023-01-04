class ThrowableObject extends MoveableObject {
    splash = false;
    IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    ]

    constructor(x,y){
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 60;
        this.animateThrowingBottle();
        if(world.character.otherDirection == true) {
            this.throwLeft();
        }else{
            this.throw();
        }
    }


    throw() {
        this.speedY = 25;
        this.applyGravity();
        this.numberOfBottles --;
        setStopableInterval( ()=> {
            this.x += 8;
        }, 25);
    }


    throwLeft() {
        this.speedY = 30;
        this.applyGravity();
        this.numberOfBottles --;
        world.character.otherDirection == true;
        this.otherDirection = true;
        setStopableInterval( ()=> {
            this.x -= 7;
        }, 25);
    }


    animateThrowingBottle() {
        setStopableInterval(()=>{
            this.playAnimation(this.IMAGES);
            if(this.splash == true){
                this.playAnimation(this.IMAGES_SPLASH);
            }
        },100);
    }
}