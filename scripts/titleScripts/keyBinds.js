class keyBinds extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'keyBinds');
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
        scene.add.existing(this);
        this.setDepth(50);
        this.setScrollFactor(0);
        this.visible = true;
        this.setInteractive();
      
        this.anims.create({key: 'keyActive',frames: this.anims.generateFrameNames('keyBinds', { start: 1, end: 1 }),frameRate: 1,repeat: -1});
        this.anims.create({key: 'keyInActive',frames: this.anims.generateFrameNames('keyBinds', { start: 0, end: 0 }),frameRate: 1,repeat: -1});
            
        this.scene = scene;

        this.bindsOptionsMenu = new keyBindsMenu(scene,scene.screenWidth/2,50);
        this.bindsOptionsMenu.visible = false;
      
    }

    setupkeyBinds(){

        let that = this;

        this.on('pointerover',function(pointer){
            that.anims.play("keyActive");
            that.scene.initSoundEffect('buttonSFX','1',0.05);
        })
        this.on('pointerout',function(pointer){
            that.anims.play("keyInActive");
        })

        this.on('pointerdown', function (pointer) {
            that.scene.initSoundEffect('buttonSFX','2',0.05);

            // here is where we set up the three save slots.
            that.scene.newGame.visible = false;
            that.scene.loadGame.visible = false;
            that.visible = false;
            that.scene.titleLogo.visible = false;
            that.scene.back.visible = true;
            that.scene.isInKeyBinds = true;
            that.scene.creditsButton.visible = false;
            if(that.scene.curse !== undefined){
                that.scene.curse.visible = false;
            }
            
            that.bindsOptionsMenu.visible = true;
            console.log("calling showsaveslots");
            //that.scene.showSaveSlots(true,true);
        
        });

    }

    hideKeyBinds(){
        this.bindsOptionsMenu.visible = false;
    }

   
}