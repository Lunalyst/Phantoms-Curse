class exitButton extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene,optionsMenu, xPos, yPos){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'buttons');
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
        scene.add.existing(this);
        this.setDepth(51);
        this.setScrollFactor(0);
        //this.visible = false;
        this.setInteractive();
        this.setScale(.6);
      
        this.anims.create({key: 'exitActive',frames: this.anims.generateFrameNames('buttons', { start: 17, end: 17 }),frameRate: 1,repeat: -1});
        this.anims.create({key: 'exitInActive',frames: this.anims.generateFrameNames('buttons', { start: 16, end: 16 }),frameRate: 1,repeat: -1});
        
        //need to get volume from scene
        this.anims.play('exitInActive');

        this.scene = scene;

        this.optionsMenu = optionsMenu;
      
    }

    setupSexButton(){

        let that = this;

        this.on('pointerover',function(pointer){
            that.anims.play("exitActive");
        })
        this.on('pointerout',function(pointer){   
            that.anims.play("exitInActive");
        })

        this.on('pointerdown', function (pointer) {
            
                //prompt the user if they want ot quit, letting them know that there progress will be lost if they do

                
                   
        });

    }
}