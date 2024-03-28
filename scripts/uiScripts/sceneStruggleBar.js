/*
https://photonstorm.github.io/phaser3-docs/Phaser.Types.Physics.Arcade.html
//https://phaser.io/examples/v3/view/game-objects/graphics/health-bars-demo
use classes tab as a guide for how to set up the header. each object has different phaser.physics.arcade
*/
let thisStruggleBar;
const struggleStartMaxWidth = 430;
const struggleStartmaxHight = 34;

class sceneStruggleBar extends Phaser.GameObjects.Container{

    constructor(scene, xPos, yPos){

        super(scene, xPos, yPos);

        this.outSide = scene.add.sprite(this.x, this.y, 'struggleBar');
       
        //this.outSide.anims.create({key: '13',frames: this.outSide.anims.generateFrameNames('healthBar', { start: 6, end: 6 }),frameRate: 10,repeat: -1});

        //sets the proper health upgrade animation frame
        
        this.setDepth(20);
        //connects the sprite to the camera so that it sticks with the player.
        this.setScrollFactor(0);
        
        thisStruggleBar = this;

        this.struggleCap = 100;


        this.barWidth = struggleStartMaxWidth;
        this.barHight = struggleStartmaxHight;

        this.bar = new Phaser.GameObjects.Graphics(scene);
        this.bar.setDepth(20);
        this.bar.setScrollFactor(0);
        
        this.add(this.outSide);
        this.add(this.bar);
        

        scene.add.existing(this);

        this.setScale(1/3);
        //this.updateDisplay();

        this.visible = false;
    }
    //simple function using if statements to update display using animations defined above.
    updateDisplay(){

        this.bar.clear();

        let percentage = 1;
        
        //if the amount is less than the cap make the percentage
        if(this.struggleAmount < this.struggleCap){

            percentage = (this.struggleAmount/this.struggleCap);

        }
        //lese percentage is fill if the amount goes over the cap.

        let barLength = Math.floor(this.barWidth * percentage);

        this.bar.fillStyle(0xffffff);
    
        this.bar.fillRect(0,  0, barLength,  this.barHight);
        this.bar.x = this.x-215;
        this.bar.y = this.y-18;

    }

    setStruggleAmount(currentStruggleAmount){
        
          this.struggleAmount = currentStruggleAmount;

          this.updateDisplay();
        
    }

    setStruggleCap(currentStruggleCap){
        
        this.struggleCap = currentStruggleCap;
        this.struggleAmount = 0;

        this.updateDisplay();
      
  }

}