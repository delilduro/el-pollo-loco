class Coin extends MoveableObject {
    height = 100;
    width = 100;
    y = 220;

    Coins_Images = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];


    constructor(){
        super().loadImage('img/8_coin/coin_2.png');
        this.x = 200 + Math.random()*2000;
        this.loadImages(this.Coins_Images);
        this.animateCoins();
    }


    animateCoins() {
        setStopableInterval(() => {
            this.playAnimation(this.Coins_Images)
        }, 400);
    }
}