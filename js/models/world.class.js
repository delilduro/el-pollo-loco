class World {
    character = new Character();
    level = level1;
    canvas;
    keyboard;
    ctx;
    camera_x = 0;
    statusBar = new StatusBar();
    statusBottle = new StatusBottle();
    statusCoin = new StatusCoin();
    statusEndboss = new StatusBarEndboss();
    throwableObject = [];
    numberOfBottles = 0;
    interval;
    showStatusEndboss = false;
    bottleCollect_sound = new Audio('audio/bottleCollect.mp3');
    coinCollect_sound = new Audio('audio/coinCollect.mp3');
    smash_sound = new Audio('audio/smash.mp3');
    hurt_sound = new Audio('audio/hurt.mp3');
    

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    run() {
       this.interval = setInterval(()=>{
            this.checkCollisions();
            this.checkThrowableObject();
            this.checkCollectedCoins();
            this.checkCollectedBottles();
            this.checkCollisionsCharacterChicken();
            this.checkCollisionsBottleToChickens();
            this.checkCollisionsBottleEndboss();
            this.checkCollisionsCharacterEndboss();
        }, 200);
    }


    stopRunInterval() {
        clearInterval(this.interval);
    }


    stopAllIntervals(){
        if(this.gameExit()) {
           this.stopRunInterval();
           this.character.stopIntervals();
           this.level.endboss.stopIntervals();
        }
    }


    checkThrowableObject() {
        if(this.numberOfBottles > 0) {
            if (this.keyboard.D) {
                let bottle = new ThrowableObject(this.character.x+30, this.character.y+100);
                this.throwableObject.push(bottle);
                this.numberOfBottles--;
                this.character.decreaseProgressbarBottle();
                this.statusBottle.setPercentage(this.character.progessBottleBar);
            }
        } else if(this.numberOfBottles = 0) {
            this.keyboard.D = false;
        }    
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy) =>{
            if(this.enemyHitsCharacter(enemy)) {
              this.character.hit();
              this.statusBar.setPercentage(this.character.energy);
            }
         });
    }


    enemyHitsCharacter(enemy) {
        return this.character.isCollading(enemy) && 
        !this.character.isAboveGround();
    }


    checkCollectedCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isCollading(coin)) {
                this.coinCollected(coin, 1);
                this.coinCollect_sound.play();
                this.coinCollect_sound.volume = 0.1;
                this.character.raiseProgressbarCoin();
                this.statusCoin.setPercentage(this.character.progessCoinBar);
            }
        });
    }


    coinCollected(coin) {
        let removeCoinCollected = this.level.coins.indexOf(coin);
        this.level.coins.splice(removeCoinCollected, 1);
    }


    checkCollectedBottles() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isCollading(bottle)) {
                this.bottleCollected(bottle, 1);
                this.character.raiseProgressbarBottle();
                this.statusBottle.setPercentage(this.character.progessBottleBar);
            }
        });
    }


    bottleCollected(bottle) {
        let i = this.level.bottles.indexOf(bottle);
        this.level.bottles.splice(i, 1); 
        this.numberOfBottles++;
        this.bottleCollect_sound.play();
        this.bottleCollect_sound.volume = 0.3;
    }


    checkCollisionsCharacterChicken() {
        this.level.enemies.forEach((enemy) => {
          if (this.enemyIsHitedFromCharacter(enemy)) {
                enemy.hit(100);
                this.chickenRemove(enemy, 1); 
                this.chickenSmashMusic();
            }else if (this.characterIsHitedFrom(enemy)) {
             this.character.hit();
             this.statusBar.setPercentage(this.character.energy);
            }
        });
    }


    enemyIsHitedFromCharacter(enemy) {
        return this.character.isCollading(enemy) && 
        this.character.isAboveGround();
    }


    characterIsHitedFrom(enemy) {
        return this.character.isCollading(enemy) && 
        this.character.isHurt();
    }


    chickenSmashMusic() {
        this.smash_sound.play();
        this.smash_sound.volume = 0.3;
    }


    chickenRemove(enemy) {
        let removeEnemy = this.level.enemies.indexOf(enemy);
        this.hurt_sound.pause();
        setTimeout(()=>{
            this.level.enemies.splice(removeEnemy, 1); 
        }, 220);  
    }


    checkCollisionsBottleToChickens() {
        this.level.enemies.forEach((enemy)=>{
            this.throwableObject.forEach(bottle=>{
                if(bottle.isCollading(enemy)){
                    enemy.hit(100); 
                    this.chickenRemove(enemy,1);
                    bottle.splash = true;  
                    splash_sound.play();
                    splash_sound.volume = 0.3
                }
            })
        })
    } 


    checkCollisionsBottleEndboss() {
       this.throwableObject.forEach((bottle)=>{
            this.level.endboss.forEach(endboss=>{
               if(bottle.isCollading(endboss)){
                    endboss.hit(20);
                    endboss.endbossIsStopped = false;
                    this.statusEndboss.setPercentage(endboss.energy);
                    this.showStatusEndboss = true;
                    splash_sound.play();
                    bottle.splash = true;
                }
            }); 
       });
    } 


    checkCollisionsCharacterEndboss() {
       this.level.endboss.forEach((endboss)=>{
            if(this.character.isCollading(endboss)){
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
                endboss.firstContact = true;
            }
        });
    }
    
     
    setWorld() {
        this.character.world = this;
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);
        this.drawStatusBars();
        this.drawStatusEndboss();
        this.ctx.translate(this.camera_x, 0);
        this.drawObjectsToMap();
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }


    drawStatusBars() {
        this.addToMap(this.statusBar);
        this.addToMap(this.statusCoin);
        this.addToMap(this.statusBottle);
    }


    drawObjectsToMap() {
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.throwableObject);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
    }


    drawStatusEndboss() {
        if(this.canDrawStatusEndboss()) {
            this.addToMap(this.statusEndboss);
        }
    }


    canDrawStatusEndboss() {
        return this.character.x >= 1600 || 
        this.showStatusEndboss == true && 
        this.character.x < 1600
    }


    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    addToMap(mObject) {
        if(mObject.otherDirection) {
            this.flipImages(mObject);
        } mObject.draw(this.ctx);
        if(mObject.otherDirection) {
            this.flipImagesBack(mObject);
        }
    }


    flipImages(mObject) {
        this.ctx.save();
        this.ctx.translate(mObject.width, 0);
        this.ctx.scale(-1, 1);
        mObject.x = mObject.x * -1;
    }


    flipImagesBack(mObject) {
        mObject.x = mObject.x * -1;
        this.ctx.restore();
    }
}