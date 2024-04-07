class options extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'options');
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
        scene.add.existing(this);
        this.setDepth(50);
        this.setScrollFactor(0);
        this.visible = true;
        this.setInteractive();
      
        this.anims.create({key: 'optionsActive',frames: this.anims.generateFrameNames('options', { start: 1, end: 1 }),frameRate: 1,repeat: -1});
        this.anims.create({key: 'optionsInActive',frames: this.anims.generateFrameNames('options', { start: 0, end: 0 }),frameRate: 1,repeat: -1});
            
        this.anims.play('optionsInActive');

        this.scene = scene;
      
    }

    setupOptions(){

        let that = this;

        this.on('pointerdown', function (pointer) {

       
            that.scene.isInOptionsMenu = true;
            that.scene.newGame.visible = false;
            that.scene.loadGame.visible = false;
            that.visible = false;
            that.scene.back.visible = true;
            that.scene.titleLogo.visible = false;

            
            that.scene.curse.visible = false;
        
    
         });

    }
}