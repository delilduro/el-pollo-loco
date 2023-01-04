class Chicken extends MoveableObject {
    y = 340;
    height = 80;
    Images_Walking = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    Images_Dead = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]
 

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.Images_Walking);
        this.loadImages(this.Images_Dead);
        this.x = 900 + Math.random()*500;
        this.speed = 0.3 + Math.random() * 0.5;
        this.animate();
    }

    animate() {
        setStopableInterval(()=> this.moveLeft(), 1000/60);
        setStopableInterval(() => this.animateWalking(), 100);
        setStopableInterval (() => {
            if (this.isDead()) {
                this.playAnimation(this.Images_Dead);
                setTimeout(()=>this.y = 500, 100);
                this.stopSpeed();
            };
        }, 25);  
    }


    animateWalking() {
        let i = this.currentImage % this.Images_Walking.length;
        let path = this.Images_Walking[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

}