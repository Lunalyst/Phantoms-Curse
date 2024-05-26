class newGame extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'newGame');
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
        scene.add.existing(this);
        this.setDepth(50);
        this.setScrollFactor(0);
        this.visible = true;
        this.setInteractive();
      
        this.anims.create({key: 'newActive',frames: this.anims.generateFrameNames('newGame', { start: 1, end: 1 }),frameRate: 1,repeat: -1});
        this.anims.create({key: 'newInActive',frames: this.anims.generateFrameNames('newGame', { start: 0, end: 0 }),frameRate: 1,repeat: -1});

        this.anims.play('newInActive');

        this.scene = scene;
      
    }

    setupNewGame(){

        let that = this;

        this.on('pointerover',function(pointer){
            that.anims.play("newActive");
            that.scene.initSoundEffect('buttonSFX','1',0.05);
        })
        this.on('pointerout',function(pointer){
            that.anims.play("newInActive");
        })

        this.on('pointerdown', function (pointer) {
            that.scene.initSoundEffect('buttonSFX','2',0.05);
            that.visible = false;
            that.scene.loadGame.visible = false;
            that.scene.back.visible = true;
            that.scene.titleLogo.visible = false;
            that.scene.isInSlotSelectNew = true;
            that.scene.curse.visible = false;
            that.scene.curse.visible = false;
            

            that.scene.showSaveSlots(true,false);
           
        });

    }
}