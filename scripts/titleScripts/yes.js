class yes extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'yes');
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
        scene.add.existing(this);
        this.setDepth(50);
        this.setScrollFactor(0);
        this.visible = false;
        this.setInteractive();
      
        this.anims.create({key: 'yesActive',frames: this.anims.generateFrameNames('yes', { start: 1, end: 1 }),frameRate: 1,repeat: -1});
        this.anims.create({key: 'yesInActive',frames: this.anims.generateFrameNames('yes', { start: 0, end: 0 }),frameRate: 1,repeat: -1});
        
        
        this.anims.play('yesInActive');

        this.scene = scene;

        this.optionsMenu;
      
    }
    // title screen button is used to delete save data
    setupYesTitle(){

        let that = this;

        this.on('pointerover',function(pointer){
            that.anims.play("yesActive");
            that.scene.initSoundEffect('buttonSFX','1',0.05);
        })
        this.on('pointerout',function(pointer){
            that.anims.play("yesInActive");
        })
        //when yes is clicked on we want to delete the save data.
        this.on('pointerdown', function (pointer) {
            that.scene.initSoundEffect('buttonSFX','2',0.05);
            console.log("activateing yes button");
            
            //clears slot so new file can be made.
            that.scene.clearSlotData();
            // empty data object
            let playerDataObject = {
                saveX: null,
                saveY: null,
                playerHpValue: null,
                playerSex: null,
                playerLocation: null,
                inventoryArray: null,
                playerBestiaryData: null,
                playerSkillsData:  null,
                playerSaveSlotData: null,
                flagValues: null,
                settings:null
              };

              //need a save file slot. so we define that entity here
              let saveSlotData = {
                saveSlot:that.scene.selectedSlotToBeDeleted,
                currency: 0,
                bestiaryCompletionPercent: 0,
                playerHealthUpgrades: 0,
                PlayerStorage: [],
             };

            playerDataObject.playerSaveSlotData = saveSlotData;

            //saves game file
            that.scene.saveGameFile(playerDataObject);

            that.scene.sceneTextBox.hideText(false);
            that.scene.sceneTextBox.textBoxProfileImage.visible = false;
            that.scene.sceneTextBox.visible = false;

            that.visible = false;
            that.scene.no.visible = false;
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

    setupYesSettings(){

        let that = this;

        this.on('pointerover',function(pointer){
            that.scene.initSoundEffect('buttonSFX','1',0.05);
            that.anims.play("yesActive");
        })
        this.on('pointerout',function(pointer){
            that.anims.play("yesInActive");
        })

        this.on('pointerdown', function (pointer) {
            that.scene.initSoundEffect('buttonSFX','2',0.05);
            that.scene.cameras.main.fadeOut(500, 0, 0, 0);
            //location.reload();
        });
    }
}