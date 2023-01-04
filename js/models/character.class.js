class Character extends MoveableObject {
    height = 300;
    y = 45;
    speed = 10;
    movementInterval;
    deadInterval;

    Images_Walking = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    Images_Idle = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'

    ];

    Images_Jumping = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    Images_Dead = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ]

    Images_Hurt = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ]

    world;
    walking_sound = new Audio('audio/walking.mp3');
    gameover_sound = new Audio('audio/gameover.mp3');
    hurt_sound = new Audio('audio/hurt.mp3');
    

    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.Images_Walking);
        this.loadImages(this.Images_Idle);
        this.loadImages(this.Images_Jumping);
        this.loadImages(this.Images_Dead);
        this.loadImages(this.Images_Hurt);
        this.applyGravity();
        this.animate();
        this.animation();
    }
    

    animate() {
        setStopableInterval(() => {
            this.walking_sound.pause();
            this.animateWalking();
            this.world.camera_x = -this.x + 100;
        },1000/60);
        setStopableInterval(()=>this.animateJumping(),200);
        setTimeout(()=>{
            setStopableInterval(()=>this.animateStanding(),1000);
        }, 3000);
    }


    animateWalking() {
        if(this.characterCanMoveRight()){
            this.otherDirection = false;
            this.moveRight();
            this.walking_sound.play();
        }if(this.characterCanMoveLeft()){
            this.otherDirection = true;
            this.moveLeft();
            this.walking_sound.play();
        }
    }


    characterCanMoveRight() {
        return this.world.keyboard.RIGHT && 
        this.x < this.world.level.level_end_x
    }


    characterCanMoveLeft() {
        return this.world.keyboard.LEFT && 
        this.x > 0
    }


    animateStanding() {
        if(this.characterCanStands()){
            this.playAnimation(this.Images_Idle);
        }
    }


    characterCanStands() {
        return !this.world.keyboard.RIGHT && 
        !this.world.keyboard.LEFT && 
        !this.world.keyboard.SPACE
    }


    animateJumping() {
        if (this.characterCanMoveJump()) {
            this.jump();
        }
    }


    characterCanMoveJump() {
        return this.world.keyboard.SPACE && 
        !this.isAboveGround()
    }


    animation() {
        setStopableInterval(() => {
            if(this.isDead()) {
                this.gameIsStopped();
            }else if(this.isHurt() && !this.isAboveGround()) {
                this.playAnimation(this.Images_Hurt);
                this.hurt_sound.play();
            }else if(this.isAboveGround()) {
                this.playAnimation(this.Images_Jumping);
            }else if(this.canAnimateWalking()){
                this.playAnimation(this.Images_Walking);
            }
        }, 50)
    }


    canAnimateWalking() {
        return this.world.keyboard.RIGHT || 
        this.world.keyboard.LEFT
    }


    gameIsStopped() {
        this.pepeIsDead();
        stopGame();
        this.walking_sound.pause();
        setTimeout(()=>{
            this.gameIsOver();
        }, 3000);
    }


    pepeIsDead() {
        this.playAnimation(this.Images_Dead);
        this.gameover_sound.play();
        this.gameover_sound.volume = 0.2;
    }


    gameIsOver(){
        document.getElementById('gameOver').classList.remove('d-none');
        document.getElementById('game').classList.add('d-none');
        document.getElementById('gameOverBtn').classList.remove('d-none');
        document.getElementById('gameOverImg').classList.remove('d-none');  
    }
}