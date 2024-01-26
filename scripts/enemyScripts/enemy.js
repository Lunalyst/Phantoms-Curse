

class enemy extends Phaser.Physics.Arcade.Sprite {

    setupDefaultValues(){

        //this.struggleCounter = 0;


        //enemy need to tell if it has grabbed the player.
        this.struggleCounter = 0;
        this.playerDamaged = false;
        this.playerGrabbed = false;
        this.struggleFree = false;
        this.grabCoolDown = false;

        //enemy needs resistances and weakinesses values

        //enemy needs a health and damage function

        //random number generation function
        
        //note, when jumping cant use.once to play animation then play the inare animation.

    }
    
}