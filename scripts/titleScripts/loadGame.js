class loadGame extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'loadGame');
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
        scene.add.existing(this);
        this.setDepth(50);
        this.setScrollFactor(0);
        this.visible = true;
        this.setInteractive();
      
        this.anims.create({key: 'loadActive',frames: this.anims.generateFrameNames('loadGame', { start: 1, end: 1 }),frameRate: 1,repeat: -1});
        this.anims.create({key: 'loadInActive',frames: this.anims.generateFrameNames('loadGame', { start: 0, end: 0 }),frameRate: 1,repeat: -1});
            
        this.anims.play('loadInActive');

        this.scene = scene;
      
    }

    setupLoadGame(){

        let that = this;

        this.on('pointerover',function(pointer){
            that.anims.play("loadActive");
            that.scene.initSoundEffect('buttonSFX','1',0.05);
        })
        this.on('pointerout',function(pointer){
            that.anims.play("loadInActive");
        })

        this.on('pointerdown', function (pointer) {
            that.scene.initSoundEffect('buttonSFX','2',0.05);

            // here is where we set up the three save slots.
            that.scene.newGame.visible = false;
            that.visible = false;
            that.scene.titleLogo.visible = false;
            that.scene.back.visible = true;
            that.scene.isInSlotSelectLoad = true;
            that.scene.creditsButton.visible = false;
            if(that.scene.curse !== undefined){
                that.scene.curse.visible = false;
            }
            
            console.log("calling showsaveslots");
            that.scene.showSaveSlots(true,true);
        
        });

    }
}