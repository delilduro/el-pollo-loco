class Bottle extends MoveableObject{
    height = 100;
    width = 80;
    y = 330;

    constructor(){
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = 200 + Math.random()*2000;
    }
}