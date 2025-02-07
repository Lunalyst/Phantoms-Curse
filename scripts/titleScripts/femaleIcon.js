class femaleIcon extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'femaleSexSelectIcons');
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
        scene.add.existing(this);
        this.setDepth(50);
        this.setScrollFactor(0);
        this.visible = false;
        this.setInteractive();
      
        this.anims.create({key: 'femaleActive',frames: this.anims.generateFrameNames('femaleSexSelectIcons', { start: 1, end: 1 }),frameRate: 1,repeat: -1});
        this.anims.create({key: 'femaleInActive',frames: this.anims.generateFrameNames('femaleSexSelectIcons', { start: 0, end: 0 }),frameRate: 1,repeat: -1});
            
        this.anims.play('femaleInActive');

        this.scene = scene;
      
    }

    setupFemaleIcon(){

        let that = this;

        this.on('pointerover',function(pointer){
            that.anims.play("femaleActive");
            that.scene.initSoundEffect('buttonSFX','1',0.05);
        })
        this.on('pointerout',function(pointer){
            that.anims.play("femaleInActive");
        })

        this.on('pointerdown', function (pointer) {

            that.scene.initSoundEffect('buttonSFX','2',0.05);

            console.log("that.tempNewGameSlotID: "+that.scene.tempNewGameSlotID);
             
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

            //sets value to true, so scene knows to send the player through the intro cutscene
            that.scene.newGameActivated = true;

            that.scene.makeSaveFile(playerDataObject,1,that.scene.tempNewGameSlotID);
            //saves data to the temp data location
            that.scene.saveGame(playerDataObject);
            //also hard saves the game to prevent issues, and allow the player to have a first save point on the beach.
            that.scene.saveGameFile(playerDataObject);
            
            that.scene.switchScene();
                   
        });

    }
}