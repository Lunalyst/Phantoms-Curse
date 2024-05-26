class settingsButton extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos,settingsUIObject,inventoryObject){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'buttons');
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
        scene.add.existing(this);
        this.setDepth(50);
        this.setScrollFactor(0);
        this.visible = false;
        this.setInteractive();
        this.setScale(.6);
      
        this.anims.create({key: 'settingsActive',frames: this.anims.generateFrameNames('buttons', { start: 15, end: 15 }),frameRate: 1,repeat: -1});
        this.anims.create({key: 'settingsInActive',frames: this.anims.generateFrameNames('buttons', { start: 14, end: 14 }),frameRate: 1,repeat: -1});
            
        this.anims.play('settingsInActive');

        this.scene = scene;

        this.settingsUI = settingsUIObject;

        this.inventory = inventoryObject;
      
    }

    setupSettingsButton(){

        let that = this;

        this.on('pointerover',function(pointer){
            that.scene.initSoundEffect('buttonSFX','1',0.05);
            console.log("over setting button");
            that.anims.play("settingsActive");
        })
        this.on('pointerout',function(pointer){
            console.log("off setting button");
            that.anims.play("settingsInActive");
        })
        
        this.on('pointerdown', function (pointer) {
            that.scene.initSoundEffect('buttonSFX','2',0.05);
            //opens settings ui if bestiary is not open.
            if(that.inventory.bestiaryOpen === false){
                that.visible = false;
                that.settingsUI.visible = true;
                that.inventory.settingsOpen = true;
            }
            console.log("opening bestiary: ",that.inventory.settingsOpen);
        });

    }
}