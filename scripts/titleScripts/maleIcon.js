class maleIcon extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'maleSexSelectIcons');
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
        scene.add.existing(this);
        this.setDepth(50);
        this.setScrollFactor(0);
        this.visible = false;
        this.setInteractive();
      
        this.anims.create({key: 'maleActive',frames: this.anims.generateFrameNames('maleSexSelectIcons', { start: 1, end: 1 }),frameRate: 1,repeat: -1});
        this.anims.create({key: 'maleInActive',frames: this.anims.generateFrameNames('maleSexSelectIcons', { start: 0, end: 0 }),frameRate: 1,repeat: -1});
            
        this.anims.play('maleInActive');

        this.scene = scene;
      
    }

    setupMaleIcon(){

        let that = this;

        this.on('pointerover',function(pointer){
            that.anims.play("maleActive");
        })
        this.on('pointerout',function(pointer){
            that.anims.play("maleInActive");
        })

        this.on('pointerdown', function (pointer) {
            console.log("that.tempNewGameSlotID: "+that.scene.tempNewGameSlotID);
             
             let playerBestiaryData = {
                blueSlime:1,
                largeBlueSlime:1,
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
                sharkMale:0,
                
             };

             let playerSkillsData = {
                jump:1,
                dash:0,
                strength:0,
                mimic:0,
                looting:0
             };

            let saveSlotData = {
                saveSlot:that.scene.tempNewGameSlotID,
                currency: 0,
                bestiaryCompletionPercent: 0,
                playerHealthUpgrades: 0,
                PlayerStorage: [],
             };

             let gameFlags = {
                containerFlags: []
             };

             let settings = {
                preferance: 2,
                volume: 1,
                onomatopoeia: true
             };

             //creates a array to be filled my objects
             this.inventoryArray  = [];

             //fills the array with objects
             for(let counter = 0; counter < 26; counter++){
 
                 //for some reason, by defininging the object here, it creates new instances of the object, so that all the items in the array,
                 //are not refrencing the same object like it would be if this variable was defined outside this for loop.
                 let item = {
                     itemID: 0,
                     itemStackable: 1,
                     itemAmount: 0 
                  };
 
                 this.inventoryArray.push(item);
             }
             
 
            console.log("testing new data structure in ->this.inventoryArray",this.inventoryArray);

            //creates a temp object to store the data
            let playerDataObject = {
                saveX: 441,
                saveY: 926,
                playerHpValue: 1,
                playerSex: 0,
                playerLocation: 'tutorialBeachLevel',
                inventoryArray: this.inventoryArray,
                playerBestiaryData: playerBestiaryData,
                playerSkillsData:  playerSkillsData,
                playerSaveSlotData: saveSlotData,
                flagValues: gameFlags,
                settings:settings
              };

            //saves data to the temp data location
            that.scene.saveGame(playerDataObject);
            //also hard saves the game to prevent issues, and allow the player to have a first save point on the beach.
            that.scene.saveGameFile(playerDataObject);

            that.scene.switchScene();
                
                   
        });

    }
}