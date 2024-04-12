class yes extends Phaser.Physics.Arcade.Sprite{
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
      
        this.anims.create({key: 'yesActive',frames: this.anims.generateFrameNames('yes', { start: 1, end: 1 }),frameRate: 1,repeat: -1});
        this.anims.create({key: 'yesInActive',frames: this.anims.generateFrameNames('yes', { start: 0, end: 0 }),frameRate: 1,repeat: -1});
        
        
        this.anims.play('yesInActive');

        this.scene = scene;
      
    }

    setupYes(){

        let that = this;

        this.on('pointerdown', function (pointer) {

            
            that.scene.clearSlotData();

            let playerSaveSlotData = {
                saveSlot:that.scene.selectedSlotToBeDeleted,
                currency: 0,
                bestiaryCompletionPercent: 0,
                playerHealthUpgrades: 0,
             };

             let playerBestiaryData = {
                blueSlime:0,
                largeBlueSlime:0,
                axolotlMale:0,
                axolotlfemale:0,
                largePurpleSlugFemale:0,
                largePurpleSlugMale:0,
                rabbitfemale:0,
                rabbitMale:0,
                cowFemale:0,
                cowMale:0,
                blueSlimeHumanoidFemale:0,
                blueSlimeHumanoidFemaleLarge:0,
                sharkFemale:0,
                sharkMale:0
             };

             let playerSkillsData = {
                jump:0,
                dash:0,
                strength:0,
                mimic:0,
                looting:0
             };

             let gameFlags = {
                containerFlags: []

             };

             let playerDataObject = {
                currentHp: null,
                playerMaxHp: null,
                inventoryArray: null,
                playerBestiaryData: playerBestiaryData,
                playerSkillsData: playerSkillsData,
                playerSaveSlotData: playerSaveSlotData,
                flagValues: gameFlags,
            };
            that.scene.activateFunctions.saveGameFile(
                that.scene.warpToX,
                that.scene.warpToY,
                that.scene.playerSex,
                that.scene.playerLocation,
                playerDataObject
               );

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
}