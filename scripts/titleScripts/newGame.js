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

        let thatNG = this;

        this.on('pointerdown', function (pointer) {

            thatNG.visible = false;
            thatNG.scene.loadGame.visible = false;
            thatNG.scene.options.visible = false;
            thatNG.scene.back.visible = true;
            thatNG.scene.titleLogo.visible = false;
            thatNG.scene.isInSlotSelectNew = true;
            if(thatNG.scene.curse !== undefined){
                thatNG.scene.curse.visible = false;
            }

            thatNG.scene.showSaveSlots(true,false);
           
        });

    }
}