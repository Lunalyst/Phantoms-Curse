
/*
https://phaser.io/examples/v3/view/input/mouse/click-sprite
https://phaser.io/examples/v2/input/pointer-over
https://braelynnn.medium.com/phaser-game-settings-using-localstorage-1cf6a9fa6f2c
 */
let playerUI;
class titleScreen extends Phaser.Scene {
    constructor(){
        // scene settings
        super({key: 'titleScreen',active: true,physics:{default:'arcade'}});
        //variables attached to the scene
        this.newGame;
        this.loadGame;
        this.allFunctions;
        this.backround;
        this.titleLogo;
        this.title;
        this.activateFunctions;
        this.isInOptionsMenu = false;
        this.isInNewGameSelect = false;
        this.isInNewGameSlotSelect = false;
        this.isInSlotSelectLoad = false;
        this.isInSlotSelectNew = false;
        this.isInDelete = false;
        this.playerSexSelect = 0;
        this.playerPreferance = 0;
        this.tempNewGameSlotID = 0;
        this.selectedSlotToBeDeleted = 0;

        //saved variables
        this.warpToX;
        this.warpToY;
        this.playerHealth;
        this.playerSex;
        this.playerLocation;
        this.inventoryDataArray;
        this.playerInventoryAmountData;
        this.playerBestiaryData;
        this.playerSkillsData;
        this.playerSaveSlotData;
        this.flagValues;
        }

        //options and new game should make other elements dissapear and for a box of appropriate size to appear. for new game we are going to need a textbox telling the player to choose a sex and a preferance.
        //in the options menu maybe the player should be able to 
        preload(){
            //this.load.spritesheet('backgroundForest', 'assets/titleScreenBackground.png',{frameWidth: 1000 , frameHeight: 664});
            this.load.spritesheet('backgroundForest', 'assets/title-backround.png',{frameWidth: 1000 , frameHeight: 667});
            this.load.spritesheet("newGame" , "assets/NewGame.png" , {frameWidth: 228 , frameHeight: 33 });
            this.load.spritesheet("loadGame" , "assets/LoadGame.png" , {frameWidth: 231 , frameHeight: 33 });
            this.load.spritesheet("options" , "assets/options.png" , {frameWidth: 165 , frameHeight: 33 });
            this.load.spritesheet("back" , "assets/Back.png" , {frameWidth: 102 , frameHeight: 33 });
            this.load.spritesheet("title" , "assets/Phantom's Curse.png" , {frameWidth: 1050 , frameHeight: 100 });
            this.load.spritesheet("titleLogo" , "assets/title screen logo.png" , {frameWidth: 300 , frameHeight: 320 });
            this.load.spritesheet("maleSexSelectIcons" , "assets/maleSexSelectIcons.png" , {frameWidth: 75 , frameHeight: 75 });
            this.load.spritesheet("femaleSexSelectIcons" , "assets/femaleSexSelectIcons.png" , {frameWidth: 75 , frameHeight: 75 });
            this.load.spritesheet("neutralSexSelectIcons" , "assets/neutralSexSelectIcons.png" , {frameWidth: 75 , frameHeight: 75 });
            this.load.spritesheet('textBox', 'assets/textBox.png',{frameWidth: 600, frameHeight: 100 });
            this.load.spritesheet('characterSet', 'assets/characterSet.png',{frameWidth: 40, frameHeight: 40 });
            this.load.spritesheet('textBoxProfile', 'assets/textBoxProfile.png',{frameWidth: 153, frameHeight: 153 });
            this.load.spritesheet('saveSlot', 'assets/saveSlotBox.png',{frameWidth: 1350, frameHeight: 300 });
            this.load.spritesheet('skillSaveSlotIcon', 'assets/SkillSaveSlotIcons.png',{frameWidth: 99, frameHeight: 99 });
            this.load.spritesheet('healthSlotIcon', 'assets/slotHealthIcon.png',{frameWidth: 99, frameHeight: 99 });
            this.load.spritesheet('sexSlotSexIcon', 'assets/saveSlotSexIcon.png',{frameWidth: 75, frameHeight: 75 });
            this.load.spritesheet('shellIcon', 'assets/shellIcon.png',{frameWidth: 96, frameHeight: 96 });
            this.load.spritesheet('bestiaryIcon', 'assets/bestiaryIcon.png',{frameWidth: 96, frameHeight: 96 });
            this.load.spritesheet('removeSlots', 'assets/removeSlots.png',{frameWidth: 99, frameHeight: 99 });
            this.load.spritesheet('removeSlots', 'assets/removeSlots.png',{frameWidth: 99, frameHeight: 99 });
            this.load.spritesheet('no', 'assets/no.png',{frameWidth: 60, frameHeight: 33 });
            this.load.spritesheet('yes', 'assets/yes.png',{frameWidth: 78, frameHeight: 33 });

            
            
        }

        create(){
            let that = this;
            this.anims.create({key: 'newActive',frames: this.anims.generateFrameNames('newGame', { start: 1, end: 1 }),frameRate: 1,repeat: -1});
            this.anims.create({key: 'newInActive',frames: this.anims.generateFrameNames('newGame', { start: 0, end: 0 }),frameRate: 1,repeat: -1});
            this.anims.create({key: 'loadActive',frames: this.anims.generateFrameNames('loadGame', { start: 1, end: 1 }),frameRate: 1,repeat: -1});
            this.anims.create({key: 'loadInActive',frames: this.anims.generateFrameNames('loadGame', { start: 0, end: 0 }),frameRate: 1,repeat: -1});
            this.anims.create({key: 'optionsActive',frames: this.anims.generateFrameNames('options', { start: 1, end: 1 }),frameRate: 1,repeat: -1});
            this.anims.create({key: 'optionsInActive',frames: this.anims.generateFrameNames('options', { start: 0, end: 0 }),frameRate: 1,repeat: -1});
            this.anims.create({key: 'backActive',frames: this.anims.generateFrameNames('back', { start: 1, end: 1 }),frameRate: 1,repeat: -1});
            this.anims.create({key: 'backInActive',frames: this.anims.generateFrameNames('back', { start: 0, end: 0 }),frameRate: 1,repeat: -1});
            this.anims.create({key: 'noActive',frames: this.anims.generateFrameNames('no', { start: 1, end: 1 }),frameRate: 1,repeat: -1});
            this.anims.create({key: 'noInActive',frames: this.anims.generateFrameNames('no', { start: 0, end: 0 }),frameRate: 1,repeat: -1});
            this.anims.create({key: 'yesActive',frames: this.anims.generateFrameNames('yes', { start: 1, end: 1 }),frameRate: 1,repeat: -1});
            this.anims.create({key: 'yesInActive',frames: this.anims.generateFrameNames('yes', { start: 0, end: 0 }),frameRate: 1,repeat: -1});
            this.anims.create({key: 'maleActive',frames: this.anims.generateFrameNames('maleSexSelectIcons', { start: 1, end: 1 }),frameRate: 1,repeat: -1});
            this.anims.create({key: 'maleInActive',frames: this.anims.generateFrameNames('maleSexSelectIcons', { start: 0, end: 0 }),frameRate: 1,repeat: -1});
            this.anims.create({key: 'femaleActive',frames: this.anims.generateFrameNames('femaleSexSelectIcons', { start: 1, end: 1 }),frameRate: 1,repeat: -1});
            this.anims.create({key: 'femaleInActive',frames: this.anims.generateFrameNames('femaleSexSelectIcons', { start: 0, end: 0 }),frameRate: 1,repeat: -1});
            this.anims.create({key: 'backroundLoop',frames: this.anims.generateFrameNames('backgroundForest', { start: 0, end: 8 }),frameRate: 4,repeat: -1});
            this.anims.create({key: 'titleLogoLoop',frames: this.anims.generateFrameNames('titleLogo', { start: 0, end: 5 }),frameRate: 2,repeat: -1});
            this.anims.create({key: 'titleLoop',frames: this.anims.generateFrameNames('title', { start: 0, end: 9 }),frameRate: 15,repeat: -1});
            this.anims.create({key: 'titleLoop1',frames: this.anims.generateFrameNames('title', { start: 4, end: 4 }),frameRate: 1,repeat: -1});
            this.backround = this.add.sprite(450, 450, "backgroundForest");
            this.backround.setScale(1.6);
            this.backround.setTint(0x4b4b4b);
            this.titleLogo = this.add.sprite(450, 430, "titleLogo");
            this.titleLogo.anims.play("titleLogoLoop");
            this.titleLogo.setScale(2);
            this.title =this.add.sprite(450, 50, "title");
            this.title.anims.play("titleLoop1");
            this.title.setScale(.8);

            this.sceneTextBox = new textBox(this,450,620,'textBox');
            this.sceneTextBox.setTitleScreenView();

            this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
            this.sceneTextBox.activateTitleScreenTextbox(
                this,//scene
                this.keyW,//keyW input
                false,// is the text box visible?
                ["lunalyst"],// sets profile array
                "Select your player Sex. this can be changed later if you desire."//text sent to the text box.
                );
            this.isPaused;
            this.PausedInTextBox;

            this.saveslot1 = new saveSlot(this, 450, 220).setInteractive();
            this.saveslot1.visible = false;
            this.trashCan1 = new removeSlot(this, this.saveslot1.x+350, this.saveslot1.y).setInteractive();
            this.trashCan1.on('pointerdown', function (pointer) {
                that.activateTrashCan(1);
             });
            this.saveslot2 = new saveSlot(this, 450, 440).setInteractive();
            this.saveslot2.visible = false;
            this.trashCan2 = new removeSlot(this, this.saveslot2.x+350, this.saveslot2.y).setInteractive();
            this.trashCan2.on('pointerdown', function (pointer) {
                that.activateTrashCan(2);
             });
            this.saveslot3 = new saveSlot(this, 450, 660).setInteractive();
            this.saveslot3.visible = false;
            this.trashCan3 = new removeSlot(this, this.saveslot3.x+350, this.saveslot3.y).setInteractive();
            this.trashCan3.on('pointerdown', function (pointer) {
                that.activateTrashCan(3);
             });


            this.activateFunctions = new allSceneFunctions;
           
            //this.backround.anims.play("backroundLoop");
            this.newGame =  this.add.sprite(150, 600, "newGame").setInteractive();
            //this.newGame.setScale(3);
            this.loadGame =  this.add.sprite(150, 650, "loadGame").setInteractive();
            //this.loadGame.setScale(3);
            this.options =  this.add.sprite(130, 700, "options").setInteractive();
            //this.options.setScale(3);
            this.back =  this.add.sprite(80, 850, "back").setInteractive();
            this.back.visible = false;

            this.no = this.add.sprite(350, 500, "no").setInteractive();
            this.no. visible = false;

            this.yes = this.add.sprite(550, 500, "yes").setInteractive();
            this.yes. visible = false;

            this.maleIcon = this.add.sprite(350, 500, "maleSexSelectIcons").setInteractive();
            this.maleIcon.visible = false;

            this.femaleIcon = this.add.sprite(550, 500, "femaleSexSelectIcons").setInteractive();
            this.femaleIcon.visible = false;
            //this.back.setScale(3);
            

            this.allFunctions = new allSceneFunctions;

            this.input.mouse.capture = true;

            this.newGame.on('pointerdown', function (pointer) {

                that.newGame.visible = false;
                that.loadGame.visible = false;
                that.options.visible = false;
                that.back.visible = true;
                that.titleLogo.visible = false;
                that.isInSlotSelectNew = true;

                that.showSaveSlots(true,false);
               
            });

            this.loadGame.on('pointerdown', function (pointer) {

                // here is where we set up the three save slots.
                that.newGame.visible = false;
                that.loadGame.visible = false;
                that.titleLogo.visible = false;
                that.options.visible = false;
                that.back.visible = true;
                that.isInSlotSelectLoad = true;
                
                that.showSaveSlots(true,true);
            
            });

            this.saveslot1.on('pointerdown', function (pointer) {
                console.log("activating saveSlot1, that.isInSlotSelectNew: "+ that.isInSlotSelectNew+ "that.isInSlotSelectLoad: "+ that.isInSlotSelectLoad);
                that.ActivateSaveSlot(1);
                
            });

            this.saveslot2.on('pointerdown', function (pointer) {
                console.log("activating saveSlot1, that.isInSlotSelectNew: "+ that.isInSlotSelectNew+ "that.isInSlotSelectLoad: "+ that.isInSlotSelectLoad);
                that.ActivateSaveSlot(2);
                
            });

            this.saveslot3.on('pointerdown', function (pointer) {
                console.log("activating saveSlot1, that.isInSlotSelectNew: "+ that.isInSlotSelectNew+ "that.isInSlotSelectLoad: "+ that.isInSlotSelectLoad);
                that.ActivateSaveSlot(3);
                
                
            });
            // make a options setting. options setting should hide other options on screen. maybe a popup window that covers title?
            // should change sound effects. maybe key binds or something of the like.

            this.options.on('pointerdown', function (pointer) {

       
                that.isInOptionsMenu = true;
                that.newGame.visible = false;
                that.loadGame.visible = false;
                that.options.visible = false;
                that.back.visible = true;
                that.titleLogo.visible = false;
        
             });

            this.back.on('pointerdown', function (pointer) {
        //console.log("activating back button. "+  )
       
            if(that.isInOptionsMenu){
                console.log("leaving options menu.");
                that.newGame.visible = true;
                that.loadGame.visible = true;
                that.titleLogo.visible = true;
                that.options.visible = true;
                that.back.visible = false;
                that.isInOptionsMenu = false;
            }else if(that.isInNewGameSelect){
                console.log("leaving new game sex select.");
                that.newGame.visible = false;
                that.loadGame.visible = false;
                that.options.visible = false;
                that.back.visible = true;
                that.titleLogo.visible = false;
                that.isInSlotSelectNew = true;
                that.isInNewGameSelect = false;

                that.sceneTextBox.hideText(false);
                that.sceneTextBox.textBoxProfileImage.visible = false;
                that.sceneTextBox.visible = false;
                that.femaleIcon.visible = false;
                that.maleIcon.visible = false;

                that.showSaveSlots(true,false);
               

            }else if(that.isInSlotSelectLoad === true || that.isInSlotSelectNew === true){
                console.log("leaving loadfile select/make new game select.");
                that.isInSlotSelectLoad = false;
                that.isInSlotSelectNew = false;
                that.isInNewGameSlotSelect = false;
                that.newGame.visible = true;
                that.loadGame.visible = true;
                that.titleLogo.visible = true;
                that.options.visible = true;
                that.back.visible = false;
                that.isInOptionsMenu = false;
                that.saveslot1.visible = false;
                that.trashCan1.visible = false;
                that.saveslot1.showSlot();
                that.saveslot2.visible = false;
                that.trashCan2.visible = false;
                that.saveslot2.showSlot();
                that.saveslot3.visible = false;
                that.trashCan3.visible = false;
                that.saveslot3.showSlot();


            }else if(that.isInDelete === true){

                that.sceneTextBox.hideText(false);
                that.sceneTextBox.textBoxProfileImage.visible = false;
                that.sceneTextBox.visible = false;

                that.yes.visible = false;
                that.no.visible = false;
                that.isInDelete = false;

                that.newGame.visible = false;
                that.loadGame.visible = false;
                that.titleLogo.visible = false;
                that.options.visible = false;
                that.back.visible = true;
                that.isInSlotSelectLoad = true;
                
                that.showSaveSlots(true,true);
            }
    
            });

        this.maleIcon.on('pointerdown', function (pointer) {
            console.log("that.tempNewGameSlotID: "+that.tempNewGameSlotID);
             //saveGame(nextSceneX,nextSceneY,playerHp,playerSex,playerInventoryData,playerInventoryAmountData,playerBestiaryData,playerSkillsData,playerSaveSlotData,gameFlags)
             
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
                saveSlot:that.tempNewGameSlotID,
                currency: 0,
                bestiaryCompletionPercent: 0,
                playerHealthUpgrades: 10
             };

             let gameFlags = {
                cutTree1:0

             };
            /*saveGame(
                nextSceneX,
                nextSceneY,
                playerHp,
                playerSex,
                playerInventoryData,
                playerInventoryAmountData,
                playerBestiaryData,
                playerSkillsData,
                playerSaveSlotData,
                gameFlags)*/ 
                console.log("saveSlotData: ",saveSlotData);
            that.allFunctions.saveGame(
                441,//nextSceneX
                926,//nextSceneY
                1,//playerHp
                0,//playerSex
                [2,4,6,8,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//playerInventoryData
                [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//playerInventoryAmountData
                playerBestiaryData,//playerBestiaryData
                playerSkillsData,//playerSkillsData
                saveSlotData,//playerSaveSlotData(saveslotID,currency, bestiary percentage)
                gameFlags//gameFlags
                );
                that.scene.launch('gameHud')
                that.scene.start('tutorialBeachLevel');
                
                   
        });
        
        this.femaleIcon.on('pointerdown', function (pointer) {
            console.log("that.tempNewGameSlotID: "+that.tempNewGameSlotID);
             //saveGame(nextSceneX,nextSceneY,playerHp,playerInventoryData,playerSex,gameFlags)
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
                jump:1,
                dash:0,
                strength:0,
                mimic:0,
                looting:0
             };

             let saveSlotData = {
                saveSlot:that.tempNewGameSlotID,
                currency: 0,
                bestiaryCompletionPercent: 0,
                playerHealthUpgrades: 1
             };

             let gameFlags = {
                cutTree1:0

             };

             
             //creates a array to be filled my objects
            this.inventoryArray  = [];

            //fills the array with objects
            for(let counter = 0; counter < 25; counter++){

                //for some reason, by defininging the object here, it creates new instances of the object, so that all the items in the array,
                //are not refrencing the same object like it would be if this variable was defined outside this for loop.
                let item = {
                    itemID: 0,
                    itemStackable: 1, 
                 };

                this.inventoryArray.push(item);
            }

            this.inventoryArray[0].itemID = 2;
            this.inventoryArray[0].itemStackable = 0;
           

            this.inventoryArray[1].itemID = 4;
            this.inventoryArray[1].itemStackable = 0;
            

            this.inventoryArray[2].itemID = 6;
            this.inventoryArray[2].itemStackable = 0;
            

            this.inventoryArray[3].itemID = 8;
            this.inventoryArray[3].itemStackable = 0;
            

            this.inventoryArray[4].itemID = 10;
            this.inventoryArray[4].itemStackable = 0;
            

            console.log("testing new data structure in ->this.inventoryArray",this.inventoryArray);

            
             //441, 926
             //3735,541
            that.allFunctions.saveGame(
                3735,//nextSceneX
                541,//nextSceneY
                2,//playerHp
                1,//playerSex
                this.inventoryArray,//playerInventoryData
                [1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],//playerInventoryAmountData
                playerBestiaryData,//playerBestiaryData
                playerSkillsData,//playerSkillsData
                saveSlotData,//playerSaveSlotData(saveslotID,currency, bestiary percentage)
                gameFlags//gameFlags
                );
                that.scene.launch('gameHud')
                that.scene.start('tutorialBeachLevel');
                
                   
        });

        this.yes.on('pointerdown', function (pointer) {

            
            that.clearSlotData();

            let playerSaveSlotData = {
                saveSlot:that.selectedSlotToBeDeleted,
                currency: 0,
                bestiaryCompletionPercent: 0
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
                jump:1,
                dash:0,
                strength:0,
                mimic:0,
                looting:0
             };

             let gameFlags = {
                cutTree1:0

             };

             let playerDataObject = {
                currentHp: null,
                playerMaxHp: null,
                inventoryArray: null,
                playerInventoryAmountData: null,
                playerBestiaryData: playerBestiaryData,
                playerSkillsData: playerSkillsData,
                playerSaveSlotData: playerSaveSlotData,
                flagValues: gameFlags,
            };
            that.activateFunctions.saveGameFile(
                that.warpToX,
                that.warpToY,
                that.playerSex,
                that.playerLocation,
                playerDataObject
               );

               that.sceneTextBox.hideText(false);
                that.sceneTextBox.textBoxProfileImage.visible = false;
                that.sceneTextBox.visible = false;

                that.yes.visible = false;
                that.no.visible = false;
                that.isInDelete = false;

                that.back.visible = true;
                that.isInSlotSelectLoad = true;
                
                that.showSaveSlots(true,true);
           
        });

        this.no.on('pointerdown', function (pointer) {

                that.sceneTextBox.hideText(false);
                that.sceneTextBox.textBoxProfileImage.visible = false;
                that.sceneTextBox.visible = false;

                that.yes.visible = false;
                that.no.visible = false;
                that.isInDelete = false;

                that.back.visible = true;
                that.isInSlotSelectLoad = true;
                
                that.showSaveSlots(true,true);
            
           
        });


            this.newGame.on('pointerover',function(pointer){
                that.newGame.anims.play("newActive");
            })
            this.newGame.on('pointerout',function(pointer){
                that.newGame.anims.play("newInActive");
            })

            this.loadGame.on('pointerover',function(pointer){
                that.loadGame.anims.play("loadActive");
            })
            this.loadGame.on('pointerout',function(pointer){
                that.loadGame.anims.play("loadInActive");
            })

            this.options.on('pointerover',function(pointer){
                that.options.anims.play("optionsActive");
            })
            this.options.on('pointerout',function(pointer){
                that.options.anims.play("optionsInActive");
            })

            this.back.on('pointerover',function(pointer){
                that.back.anims.play("backActive");
            })
            this.back.on('pointerout',function(pointer){
                that.back.anims.play("backInActive");
            })

            this.no.on('pointerover',function(pointer){
                that.no.anims.play("noActive");
            })
            this.no.on('pointerout',function(pointer){
                that.no.anims.play("noInActive");
            })

            this.yes.on('pointerover',function(pointer){
                that.yes.anims.play("yesActive");
            })
            this.yes.on('pointerout',function(pointer){
                that.yes.anims.play("yesInActive");
            })

            this.maleIcon.on('pointerover',function(pointer){
                that.maleIcon.anims.play("maleActive");
            })
            this.maleIcon.on('pointerout',function(pointer){
                that.maleIcon.anims.play("maleInActive");
            })
            this.femaleIcon.on('pointerover',function(pointer){
                that.femaleIcon.anims.play("femaleActive");
            })
            this.femaleIcon.on('pointerout',function(pointer){
                that.femaleIcon.anims.play("femaleInActive");
            })
            

        }

        update(){
            
        }

        clearSlotData(){
        this.warpToX = undefined;
        this.warpToY= undefined;
        this.playerHealth= undefined;
        this.playerSex= undefined;
        this.playerLocation= undefined;
        this.inventoryDataArray = undefined;
        this.playerInventoryAmountData = undefined;
        this.playerBestiaryData = undefined;
        this.playerSkillsData = undefined;
        this.playerSaveSlotData = undefined;
        this.flagValues = undefined;
        }

        ActivateSaveSlot(slot){

            if(this.isInSlotSelectNew === true){
                this.back.visible = true;
                this.isInNewGameSelect = true;
                this.isInSlotSelectNew = false;
                this.maleIcon.visible = true;
                this.femaleIcon.visible = true;
                this.saveslot1.visible = false;
                this.saveslot1.showSlot();
                this.trashCan1.visible = false;
                this.saveslot2.visible = false;
                this.saveslot2.showSlot();
                this.trashCan2.visible = false;
                this.saveslot3.visible = false;
                this.saveslot3.showSlot();
                this.trashCan3.visible = false;
                this.isInNewGameSelect = true;
                this.tempNewGameSlotID = slot;
                console.log("that.tempNewGameSlotID: "+this.tempNewGameSlotID);
                this.sceneTextBox.activateTitleScreenTextbox(
                    this,//scene
                    this.keyW,//keyW input
                    true,// is the text box visible?
                    ["lunalyst"],// sets profile array
                    "Select your player Sex. this can be changed later if you desire."//text sent to the text box.
                    );
                //add text box describing the player sex select. need to change scale.
                
                }else if(this.isInSlotSelectLoad === true){
                this.activateFunctions.loadGameFile(this,slot);
                if(this.warpToX !== undefined){
                    this.allFunctions.saveGame( 
                        this.warpToX,
                        this.warpToY,
                        this.playerHealth,
                        this.playerSex,
                        this.inventoryDataArray,
                        this.playerInventoryAmountData,
                        this.playerBestiaryData,
                        this.playerSkillsData,
                        this.playerSaveSlotData,
                        this.flagValues
                           );
                    console.log("warping player to location."+ this.playerLocation);
                    this.scene.launch('gameHud'); 
                    this.scene.start(this.playerLocation); 
                }
        }
        }

        showSaveSlots(isVisible,trashCansVisible){
            
            this.saveslot1.visible = isVisible;
            this.activateFunctions.loadGameFile(this,1);
            this.tempNewGameSlotID = 1;
            this.saveslot1.showSlot();
            this.saveslot1.setSkillDisplay(this);
            this.trashCan1.visible = trashCansVisible;
            this.clearSlotData();

            this.saveslot2.visible = isVisible;
            this.activateFunctions.loadGameFile(this,2);
            this.tempNewGameSlotID = 2;
            this.saveslot2.showSlot();
            this.saveslot2.setSkillDisplay(this);
            this.trashCan2.visible = trashCansVisible;
            this.clearSlotData();

            this.saveslot3.visible = isVisible;
            this.activateFunctions.loadGameFile(this,3); 
            this.tempNewGameSlotID = 3;
            this.saveslot3.showSlot();
            this.saveslot3.setSkillDisplay(this);
            this.trashCan3.visible = trashCansVisible;
            this.clearSlotData();

        }

        activateTrashCan(slot){
        this.isInSlotSelectLoad = false;
        this.isInDelete = true;
        this.saveslot1.visible = false;
        this.trashCan1.visible = false;
        this.saveslot1.showSlot();
        this.saveslot2.visible = false;
        this.trashCan2.visible = false;
        this.saveslot2.showSlot();
        this.saveslot3.visible = false;
        this.trashCan3.visible = false;
        this.saveslot3.showSlot();
        this.selectedSlotToBeDeleted = slot;
        this.yes.visible = true;
        this.no.visible = true;
        

            this.sceneTextBox.activateTitleScreenTextbox(
                this,//scene
                this.keyW,//keyW input
                true,// is the text box visible?
                ["lunalyst"],// sets profile array
                "are you sure you want to delete save slot: "+ slot +"?"//text sent to the text box.
                );

        
        
        }

}