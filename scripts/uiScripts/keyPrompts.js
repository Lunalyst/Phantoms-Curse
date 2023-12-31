/*
https://photonstorm.github.io/phaser3-docs/Phaser.Types.Physics.Arcade.html
use classes tab as a guide for how to set up the header. each object has different phaser.physics.arcade
*/
class keyPrompts extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, xPos, yPos){
        //super() calls the constructor() from the parent class we are extending
        super(scene, xPos, yPos, 'keyPrompts');
        //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
        //so here in the subclass of sprite its refering to the image object we just made. 
        scene.add.existing(this);
        //sets the depth of the ui sprite so that it isnt obscured by other game sprites.
        this.anims.create({key: 'aKeyPrompt',frames: this.anims.generateFrameNames('keyPrompts', { start: 0, end: 2 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'sKeyPrompt',frames: this.anims.generateFrameNames('keyPrompts', { start: 3, end: 5 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'dKeyPrompt',frames: this.anims.generateFrameNames('keyPrompts', { start: 6, end: 8 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'wKeyPrompt',frames: this.anims.generateFrameNames('keyPrompts', { start: 9, end: 11 }),frameRate: 7,repeat: -1});
        //connects the sprite to the camera so that it sticks with the player.
        //this.setScrollFactor(0);
        this.setDepth(6);

    }
    //simple function using if statements to update display using animations defined above.
    

    playAKey(){
        this.anims.play("aKeyPrompt");
    }
    playSKey(){
        this.anims.play("sKeyPrompt");
    }
    playDKey(){
        this.anims.play("dKeyPrompt");
    }
    playWKey(){
        this.anims.play("wKeyPrompt");
    }


}