class EndBoss extends MoveableObject {
    width = 250;
    height = 400;
    y = 58;
    deadBossInterval;
    movementBossInterval;
    speed = 15;
    firstContact = false;
    endbossIsStopped = true;
    gamewinner_sound = new Audio('audio/gamewinner.mp3');

    Images_Alert = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    Images_Walking = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ]

    Images_Hurt = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    Images_Dead = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ]
    

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.Images_Walking);
        this.loadImages(this.Images_Alert);
        this.loadImages(this.Images_Dead);
        this.loadImages(this.Images_Hurt);
        this.x = 2250;
        this.setAnimation();
    }


    animation() {
        if(this.isDead()) {
            this.animateDead();
            this.gameStopped();
            splash_sound.muted = true;
        }else if(this.isHurt()) {
            this.playAnimation(this.Images_Hurt);
            this.speed = 32;
        }else if(this.endBossCanMoveleft()) {
            this.endBossMoveLeft();
        }else if(this.endBossCanMoveRight()) {
            this.endBossMoveRight();
        }else {
            this.playAnimation(this.Images_Alert);
        }
    }


    setAnimation() {
        setStopableInterval(()=>{
            this.animation();
        },200);
    }


    gameStopped() {
        world.character.walking_sound.pause();
        stopGame();
        setTimeout(()=>this.gameIsWon(),4500); 
    }


    endBossCanMoveRight() {
        return  world.character.x > this.x
    }


    endBossCanMoveleft() {
        return this.endbossIsStopped == false && 
        world.character.x < this.x
    }


    endBossMoveRight() {
        this.moveRight();
        this.otherDirection = true;
        this.playAnimation(this.Images_Walking);
    }


    endBossMoveLeft() {
        this.moveLeft();
        this.otherDirection = false;
        this.playAnimation(this.Images_Walking);
    }


    animateDead() {
        setInterval(()=>this.playAnimation(this.Images_Dead),100);
        this.gamewinner_sound.play();
        this.gamewinner_sound.volume = 0.7;
    }


    gameIsWon(){
        document.getElementById('winner').classList.remove('d-none');
        document.getElementById('game').classList.add('d-none');
        document.getElementById('winnerBtn').classList.remove('d-none');
        document.getElementById('winnerImg').classList.remove('d-none'); 
    }
}