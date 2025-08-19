class back extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'back');
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
        scene.add.existing(this);
        this.setDepth(50);
        this.setScrollFactor(0);
        this.visible = false;
        this.setInteractive();
      
        this.anims.create({key: 'backActive',frames: this.anims.generateFrameNames('back', { start: 1, end: 1 }),frameRate: 1,repeat: -1});
        this.anims.create({key: 'backInActive',frames: this.anims.generateFrameNames('back', { start: 0, end: 0 }),frameRate: 1,repeat: -1});
               
        this.anims.play('backInActive');

        this.scene = scene;
      
    }

    setupBack(){

        let that = this;

        this.on('pointerover',function(pointer){
            that.anims.play("backActive");
            that.scene.initSoundEffect('buttonSFX','1',0.05);
        })
        this.on('pointerout',function(pointer){
            that.anims.play("backInActive");
        })

        this.on('pointerdown', function (pointer) {
            that.scene.initSoundEffect('buttonSFX','2',0.05);
            //console.log("activating back button. "+  )
           
                if(that.scene.isInNewGameSelect){
                    console.log("leaving new game sex select.");
                    that.scene.newGame.visible = false;
                    that.scene.loadGame.visible = false;
                    
                    that.visible = true;
                    that.scene.titleLogo.visible = false;
                    that.scene.isInSlotSelectNew = true;
                    that.scene.isInNewGameSelect = false;
    
                    that.scene.sceneTextBox.hideText(false);
                    that.scene.sceneTextBox.textBoxProfileImage.visible = false;
                    that.scene.sceneTextBox.visible = false;
                    that.scene.femaleIcon.visible = false;
                    that.scene.maleIcon.visible = false;
                    that.scene.creditsButton.visible = true;
    
                    that.scene.showSaveSlots(true,false);
                   
    
                }else if(that.scene.isInSlotSelectLoad === true || that.scene.isInSlotSelectNew === true){
                    console.log("leaving loadfile select/make new game select.");
                    that.scene.isInSlotSelectLoad = false;
                    that.scene.isInSlotSelectNew = false;
                    that.scene.isInNewGameSlotSelect = false;
                    that.scene.newGame.visible = true;
                    that.scene.loadGame.visible = true;
                    that.scene.titleLogo.visible = true;
                    that.scene.creditsButton.visible = true;
                    
                    that.scene.back.visible = false;
                    
                    that.scene.saveslot1.visible = false;
                    that.scene.trashCan1.visible = false;
                    that.scene.saveslot1.showSlot();
                    that.scene.saveslot2.visible = false;
                    that.scene.trashCan2.visible = false;
                    that.scene.saveslot2.showSlot();
                    that.scene.saveslot3.visible = false;
                    that.scene.trashCan3.visible = false;
                    that.scene.saveslot3.showSlot();
    
    
                }else if(that.scene.isInDelete === true){
    
                    that.scene.sceneTextBox.hideText(false);
                    that.scene.sceneTextBox.textBoxProfileImage.visible = false;
                    that.scene.sceneTextBox.visible = false;
    
                    that.scene.yes.visible = false;
                    that.scene.no.visible = false;
                    that.scene.isInDelete = false;
    
                    that.scene.newGame.visible = false;
                    that.scene.loadGame.visible = false;
                    that.scene.titleLogo.visible = false;
                    
                    that.scene.back.visible = true;
                    that.scene.isInSlotSelectLoad = true;
                    
                    that.scene.showSaveSlots(true,true);
                }else if(that.scene.isInCredits === true){
                    that.visible = false;
                    that.scene.isInCredits = false;
                    that.scene.newGame.visible = true;
                    that.scene.loadGame.visible = true;
                    that.scene.titleLogo.visible = true;
                    that.scene.curse.visible = true;
                    that.scene.creditsButton.visible = true;

                    that.scene.credits.visible = false;

                    that.scene.credits.stopCredits();
                   
                }
        
            });

    }
}