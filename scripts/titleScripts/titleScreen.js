
/*
https://phaser.io/examples/v3/view/input/mouse/click-sprite
https://phaser.io/examples/v2/input/pointer-over
https://braelynnn.medium.com/phaser-game-settings-using-localstorage-1cf6a9fa6f2c
 */
let playerUI;

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

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
        this.curse;
        this.cursecooldown = false;

        this.logoToggle =false;
        this.logoAnimationPlayed = false;

        this.optionsMenu;
        this.elements;

        //saved variables
        this.warpToX;
        this.warpToY;
        this.playerHealth;
        this.playerSex;
        this.playerLocation;
        this.inventoryDataArray;
        this.playerBestiaryData;
        this.playerSkillsData;
        this.playerSaveSlotData;
        this.flagValues;
        this.settings;
       
        }

        preload(){
            //this.load.spritesheet('backgroundForest', 'assets/titleScreenBackground.png',{frameWidth: 1000 , frameHeight: 664});
            this.load.spritesheet('backgroundForest', 'assets/title-backround.png',{frameWidth: 1000 , frameHeight: 667});
            this.load.spritesheet("newGame" , "assets/NewGame.png" , {frameWidth: 228 , frameHeight: 33 });
            this.load.spritesheet("loadGame" , "assets/LoadGame.png" , {frameWidth: 231 , frameHeight: 33 });
            this.load.spritesheet("options" , "assets/options.png" , {frameWidth: 165 , frameHeight: 33 });
            this.load.spritesheet("back" , "assets/Back.png" , {frameWidth: 102 , frameHeight: 33 });
            this.load.spritesheet("title" , "assets/Phantom's Curse.png" , {frameWidth: 1773 , frameHeight: 168 });
            this.load.spritesheet("titleLogo" , "assets/title screen logo.png" , {frameWidth: 1080 , frameHeight: 1140});
            this.load.spritesheet("maleSexSelectIcons" , "assets/maleSexSelectIcons.png" , {frameWidth: 75 , frameHeight: 75 });
            this.load.spritesheet("femaleSexSelectIcons" , "assets/femaleSexSelectIcons.png" , {frameWidth: 75 , frameHeight: 75 });
            this.load.spritesheet("neutralSexSelectIcons" , "assets/neutralSexSelectIcons.png" , {frameWidth: 75 , frameHeight: 75 });
            this.load.spritesheet('textBox', 'assets/textBox.png',{frameWidth: 600, frameHeight: 100 });
            this.load.spritesheet('charBlack', 'assets/characterSetBlack.png',{frameWidth: 84, frameHeight: 108});
            this.load.spritesheet('charBubble', 'assets/characterSetBubble.png',{frameWidth: 84, frameHeight: 108});
            this.load.spritesheet('textBoxProfile', 'assets/textBoxProfile.png',{frameWidth: 153, frameHeight: 153 });
            this.load.spritesheet('saveSlot', 'assets/saveSlotBox.png',{frameWidth: 1350, frameHeight: 300 });
            this.load.spritesheet('skillSaveSlotIcon', 'assets/SkillSaveSlotIcons.png',{frameWidth: 99, frameHeight: 99 });
            this.load.spritesheet('healthSlotIcon', 'assets/slotHealthIcon.png',{frameWidth: 99, frameHeight: 99 });
            this.load.spritesheet('sexSlotSexIcon', 'assets/saveSlotSexIcon.png',{frameWidth: 75, frameHeight: 75 });
            this.load.spritesheet('shellIcon', 'assets/shellIcon.png',{frameWidth: 96, frameHeight: 96 });
            this.load.spritesheet('bestiaryIcon', 'assets/bestiaryIcon.png',{frameWidth: 96, frameHeight: 96 });
            this.load.spritesheet('removeSlots', 'assets/removeSlots.png',{frameWidth: 99, frameHeight: 99 });
            this.load.spritesheet('no', 'assets/no.png',{frameWidth: 60, frameHeight: 33 });
            this.load.spritesheet('yes', 'assets/yes.png',{frameWidth: 78, frameHeight: 33 });
            this.load.spritesheet('curses', 'assets/curses.png',{frameWidth: 96, frameHeight: 96 });
            this.load.spritesheet('buttons', 'assets/buttons.png',{frameWidth: 75, frameHeight: 75 });

            this.load.scenePlugin({
                key: 'rexuiplugin',
                url: 'lib/vendors/rexuiplugin.min.js',
                sceneKey: 'rexUI'
            });

        }

        create(){

            let that = this;

            this.elements = this.physics.add.group();

            

            
            // animations for some sprites present
            this.anims.create({key: 'backroundLoop',frames: this.anims.generateFrameNames('backgroundForest', { start: 0, end: 8 }),frameRate: 4,repeat: -1});
            this.anims.create({key: 'titleLogoLoop1',frames: this.anims.generateFrameNames('titleLogo', { start: 0, end: 10 }),frameRate: 4,repeat: 0});
            this.anims.create({key: 'titleLogoLoop2',frames: this.anims.generateFrameNames('titleLogo', { start: 11, end: 14 }),frameRate: 4,repeat: 0});
            this.anims.create({key: 'titleLoop',frames: this.anims.generateFrameNames('title', { start: 0, end: 6 }),frameRate: 3,repeat: -1});

            //background definition.
            this.backround = this.add.sprite(450, 450, "backgroundForest");
            this.backround.setScale(1.6);
            this.backround.setTint(0x4b4b4b);
            this.titleLogo = this.add.sprite(450, 550, "titleLogo");
            this.elements.add(this.titleLogo);

            //title sprite
            this.titleLogo.setScale(1/2+1/3);
            this.title =this.add.sprite(450, 50, "title");
            this.title.anims.play("titleLoop");
            this.title.setScale(1/3 + 1/7);
            
            //curse sprite that changes
            this.curse = new curse(this, 275,175);
            this.elements.add(this.curse);

            //textbox for new character 
            this.sceneTextBox = new textBox(this,450,600,'charBlack');
            this.sceneTextBox.setScale(1.2);
            //this.sceneTextBox.setTitleScreenView();
            this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
            this.sceneTextBox.activateTitleScreenTextbox(
                this,//scene
                this.keyW,//keyW input
                false,// is the text box visible?
                ["lunalyst"],// sets profile array
                "Select your player Sex. this can be changed later if you desire."//text sent to the text box.
                );
            this.elements.add(this.sceneTextBox);

            //sets up the three save slots
            this.saveslot1 = new saveSlot(this, 450, 220);
            this.elements.add(this.saveslot1);

            this.trashCan1 = new removeSlot(this, this.saveslot1.x+350, this.saveslot1.y);
            this.trashCan1.setupRemoveSlot(1);
            this.elements.add(this.trashCan1);
            
            this.saveslot2 = new saveSlot(this, 450, 440);
            this.elements.add(this.saveslot2);

            this.trashCan2 = new removeSlot(this, this.saveslot2.x+350, this.saveslot2.y);
            this.trashCan2.setupRemoveSlot(2);
            this.elements.add(this.trashCan2);

            this.saveslot3 = new saveSlot(this, 450, 660);
            this.elements.add(this.saveslot3);

            this.trashCan3 = new removeSlot(this, this.saveslot3.x+350, this.saveslot3.y);
            this.trashCan3.setupRemoveSlot(3);
            this.elements.add(this.trashCan3);

            this.activateFunctions = new allSceneFunctions;
           
            //sets up button objects.
            this.newGame = new newGame(this,150,600);
            this.elements.add(this.newGame);

            this.loadGame = new loadGame(this,150, 650);
            this.elements.add(this.loadGame);

            this.options = new options(this,130, 700);
            this.elements.add(this.options);

            this.back = new back(this, 80, 850);
            this.elements.add(this.back);

            this.maleIcon = new maleIcon(this,350, 500);
            this.elements.add(this.maleIcon);

            this.femaleIcon = new femaleIcon(this,550, 500);
            this.elements.add(this.femaleIcon);

            this.yes = new yes(this,550, 500);
            this.elements.add(this.yes);

            this.no = new no(this,350, 500);
            this.elements.add(this.no);

            //this.optionsMenu = new optionsMenu(this,200,150);
            //this.elements.add(this.optionsMenu);

            this.allFunctions = new allSceneFunctions;

            //sets up mouse detection
            this.input.mouse.capture = true;

            //applies function so the buttons
            this.newGame.setupNewGame();

            this.loadGame.setupLoadGame();

            this.options.setupOptions();

            this.back.setupBack();

            this.maleIcon.setupMaleIcon();

            this.femaleIcon.setupFemaleIcon();

            this.yes.setupYes();

            this.no.setupNo();

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
           
        }

        update(){

            //code handles the title screen phantom logo animation.
            if(this.logoToggle === false){
                if(this.logoAnimationPlayed === false && this.titleLogo.visible === true){
                    this.logoAnimationPlayed = true;
                    this.curse.visible = true;
                    console.log("this.curse",this.curse);
                    this.cursecooldown = this.curse.switchCurse();
                    this.titleLogo.anims.play("titleLogoLoop1").once('animationcomplete' , () =>{
                        this.logoAnimationPlayed = false;
                        this.logoToggle = true;
                    });
                }
                
            }else if(this.logoToggle === true){
                if(this.logoAnimationPlayed === false){
                    this.logoAnimationPlayed = true;
                    this.titleLogo.anims.play("titleLogoLoop2").once('animationcomplete' , () =>{
                        this.logoAnimationPlayed = false;
                        this.logoToggle = false;
                    });
                }

            }
            
        }

        //function to switch scene
        switchScene(){
            console.log("now stoping this scene",);
            this.scene.stop();

            console.log("now loading game ui",);
            this.scene.launch('gameHud');
            
            console.log("now Loading main scene",);
            this.scene.start('tutorialBeachLevel');
        }

        //clears slot data
        clearSlotData(){
        this.warpToX = undefined;
        this.warpToY= undefined;
        this.playerHealth= undefined;
        this.playerSex= undefined;
        this.playerLocation= undefined;
        this.inventoryDataArray = undefined;
        this.playerBestiaryData = undefined;
        this.playerSkillsData = undefined;
        this.playerSaveSlotData = undefined;
        this.flagValues = undefined;
        this.setting = undefined;
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
                        this.playerBestiaryData,
                        this.playerSkillsData,
                        this.playerSaveSlotData,
                        this.flagValues,
                        this.settings
                           );

                    console.log("warping player to location."+ this.playerLocation);
                    
                    console.log("now stoping this scene",);
                    this.scene.stop();
                    console.log("now loading game ui",);
                    this.scene.launch('gameHud');
                    let that = this;
                    setTimeout(function () {
                        console.log("now Loading main scene",);
                        that.scene.start(that.playerLocation);
        
                    }, 100);
                }
        }
        }

        showSaveSlots(isVisible,trashCansVisible){
            console.log("activating showsaveslots.");
            console.log("isVisible: ",isVisible," trashCansVisible: ",trashCansVisible);
            this.saveslot1.visible = isVisible;
            this.activateFunctions.loadGameFile(this,1);
            this.tempNewGameSlotID = 1;
            this.saveslot1.showSlot();
            this.saveslot1.setSkillDisplay();
            this.trashCan1.visible = trashCansVisible;
            this.clearSlotData();

            this.saveslot2.visible = isVisible;
            this.activateFunctions.loadGameFile(this,2);
            this.tempNewGameSlotID = 2;
            this.saveslot2.showSlot();
            this.saveslot2.setSkillDisplay();
            this.trashCan2.visible = trashCansVisible;
            this.clearSlotData();

            this.saveslot3.visible = isVisible;
            this.activateFunctions.loadGameFile(this,3); 
            this.tempNewGameSlotID = 3;
            this.saveslot3.showSlot();
            this.saveslot3.setSkillDisplay();
            this.trashCan3.visible = trashCansVisible;
            this.clearSlotData();

        }

        

}