
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
        this.curse;
        this.cursecooldown = false;

        this.logoToggle =false;
        this.logoAnimationPlayed = false;

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

        this.curse; 
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
            this.load.spritesheet("title" , "assets/Phantom's Curse.png" , {frameWidth: 1773 , frameHeight: 168 });
            this.load.spritesheet("titleLogo" , "assets/title screen logo.png" , {frameWidth: 1080 , frameHeight: 1140});
            this.load.spritesheet("maleSexSelectIcons" , "assets/maleSexSelectIcons.png" , {frameWidth: 75 , frameHeight: 75 });
            this.load.spritesheet("femaleSexSelectIcons" , "assets/femaleSexSelectIcons.png" , {frameWidth: 75 , frameHeight: 75 });
            this.load.spritesheet("neutralSexSelectIcons" , "assets/neutralSexSelectIcons.png" , {frameWidth: 75 , frameHeight: 75 });
            this.load.spritesheet('textBox', 'assets/textBox.png',{frameWidth: 600, frameHeight: 100 });
            this.load.spritesheet('characterSet', 'assets/characterSet.png',{frameWidth: 84, frameHeight: 108});
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

            this.load.scenePlugin({
                key: 'rexuiplugin',
                url: 'lib/vendors/rexuiplugin.min.js',
                sceneKey: 'rexUI'
            });

        }

        create(){
            let that = this;

            this.anims.create({key: 'noActive',frames: this.anims.generateFrameNames('no', { start: 1, end: 1 }),frameRate: 1,repeat: -1});
            this.anims.create({key: 'noInActive',frames: this.anims.generateFrameNames('no', { start: 0, end: 0 }),frameRate: 1,repeat: -1});
            this.anims.create({key: 'backroundLoop',frames: this.anims.generateFrameNames('backgroundForest', { start: 0, end: 8 }),frameRate: 4,repeat: -1});
            this.anims.create({key: 'titleLogoLoop1',frames: this.anims.generateFrameNames('titleLogo', { start: 0, end: 10 }),frameRate: 4,repeat: 0});
            this.anims.create({key: 'titleLogoLoop2',frames: this.anims.generateFrameNames('titleLogo', { start: 11, end: 14 }),frameRate: 4,repeat: 0});
            this.anims.create({key: 'titleLoop',frames: this.anims.generateFrameNames('title', { start: 0, end: 6 }),frameRate: 3,repeat: -1});
            this.backround = this.add.sprite(450, 450, "backgroundForest");
            this.backround.setScale(1.6);
            this.backround.setTint(0x4b4b4b);
            this.titleLogo = this.add.sprite(450, 550, "titleLogo");
           
            this.titleLogo.setScale(1/2+1/3);
            this.title =this.add.sprite(450, 50, "title");
            this.title.anims.play("titleLoop");
            this.title.setScale(1/3 + 1/7);

            this.curse = new curse(this, 275,175);

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
           
            this.newGame = new newGame(this,150,600);

            this.loadGame = new loadGame(this,150, 650);

            this.options = new options(this,130, 700);

            this.back = new back(this, 80, 850);

            this.maleIcon = new maleIcon(this,350, 500);

            this.femaleIcon = new femaleIcon(this,550, 500);

            this.yes = new yes(this,550, 500);


            this.no = this.add.sprite(350, 500, "no").setInteractive();
            this.no. visible = false;

           // this.yes = this.add.sprite(550, 500, "yes").setInteractive();
            //this.yes. visible = false;

            

            this.allFunctions = new allSceneFunctions;

            this.input.mouse.capture = true;

            this.newGame.setupNewGame();

            this.loadGame.setupLoadGame();

            this.options.setupOptions();

            this.back.setupBack();

            this.maleIcon.setupMaleIcon();

            this.femaleIcon.setupFemaleIcon();

            this.yes.setupYes();

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

            

            /*this.soundSlider = new Slider(this,{
                x: 200,
                y: 200,
                width: 200,
                height: 20,
                orientation: 'x',
    
                track: this.rexUI.add.roundRectangle(0, 0, 0, 0, 6, COLOR_DARK),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),
    
                valuechangeCallback: function (value) {
                    print0.text = value;
                },
                space: {
                    top: 4,
                    bottom: 4
                },
                input: 'drag', // 'drag'|'click'
            }).layout();

            this.add.existing(this.soundSlider);*/
            

        


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

        switchScene(){
            console.log("now stoping this scene",);
            this.scene.stop();

            console.log("now loading game ui",);
            this.scene.launch('gameHud');
            
            console.log("now Loading main scene",);
            this.scene.start('tutorialBeachLevel');
        }

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
                        this.flagValues
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