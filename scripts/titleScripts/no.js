class no extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'no');
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
        scene.add.existing(this);
        this.setDepth(50);
        this.setScrollFactor(0);
        this.visible = false;
        this.setInteractive();
      
        this.anims.create({key: 'noActive',frames: this.anims.generateFrameNames('no', { start: 1, end: 1 }),frameRate: 1,repeat: -1});
        this.anims.create({key: 'noInActive',frames: this.anims.generateFrameNames('no', { start: 0, end: 0 }),frameRate: 1,repeat: -1});
        
        this.anims.play('noInActive');

        this.optionsMenu;

        this.scene = scene;
      
    }

    setupNoTitle(){

        let that = this;

        this.on('pointerover',function(pointer){
            that.anims.play("noActive");
        })
        this.on('pointerout',function(pointer){
            that.anims.play("noInActive");
        })

        this.on('pointerdown', function (pointer) {

            that.scene.sceneTextBox.hideText(false);
            that.scene.sceneTextBox.textBoxProfileImage.visible = false;
            that.scene.sceneTextBox.visible = false;

            that.visible = false;
            that.visible = false;
            that.scene.yes.visible = false;
            that.scene.isInDelete = false;

            that.scene.back.visible = true;
            that.scene.isInSlotSelectLoad = true;
            
            that.scene.showSaveSlots(true,true);
        
       
    });

    }

    //used to set the options menu refrence in this object.
    setOptionsMenu(menu){
        this.optionsMenu = menu;
    }

    setupNoSettings(){

        let that = this;

        this.on('pointerover',function(pointer){
            that.anims.play("noActive");
            that.scene.initSoundEffect('buttonSFX','1',0.05);
        });
        this.on('pointerout',function(pointer){
            that.anims.play("noInActive");
        });

        this.on('pointerdown', function (pointer) {
            that.scene.initSoundEffect('buttonSFX','2',0.05);

            //hides the textbox and options if the player clicks no
            that.optionsMenu.optionsTextBox.visible = false;
            that.optionsMenu.yes.visible = false;
            that.optionsMenu.no.visible = false;
            that.optionsMenu.isQuiting = false;
            
        });
    }
}