let playerUI;

class titleScreen extends A3SoundEffects {
    constructor(){
        // scene settings
        super({key: 'titleScreen',active: true,physics:{default:'arcade'}});
        //variables attached to the scene
        this.location = 'titleScreen';

        this.newGame;
        this.loadGame;
        this.backround;
        this.titleLogo;
        this.title;
        this.activateFunctions;
        this.isInOptionsMenu = false;
        this.isInNewGameSelect = false;
        this.isInNewGameSlotSelect = false;
        this.isInSlotSelectLoad = false;
        this.isInSlotSelectNew = false;
        this.isInCredits = false;
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

        this.newGameActivated = false;

        //array to check if there is a file defined 
        this.savedFileArray = [false,false,false];

        this.screenWidth = 1200;
        this.screenHeight = 900;
       
        }

        preload(){
            startTimeTest("loading title screen.");
            this.load.spritesheet('titleBackground',  'assets/backgrounds/Forest_Background_Static.png',{frameWidth: 1600 , frameHeight: 1090});
            this.load.spritesheet("newGame" , "assets/titleScreen/NewGame.png" , {frameWidth: 228 , frameHeight: 33 });
            this.load.spritesheet("loadGame" , "assets/titleScreen/LoadGame.png" , {frameWidth: 231 , frameHeight: 33 });
            this.load.spritesheet("options" , "assets/titleScreen/options.png" , {frameWidth: 165 , frameHeight: 33 });
            this.load.spritesheet("back" , "assets/titleScreen/Back.png" , {frameWidth: 102 , frameHeight: 33 });
            this.load.spritesheet("credits" , "assets/titleScreen/credits.png" , {frameWidth: 168 , frameHeight: 33 });
            this.load.spritesheet("creditBackdrop" , "assets/titleScreen/credits backdrop.png" , {frameWidth: 1023 , frameHeight: 693 });
            this.load.spritesheet("title" , "assets/titleScreen/Phantom's Curse.png" , {frameWidth: 1776 , frameHeight: 303 });
            this.load.spritesheet("maleSexSelectIcons" , "assets/titleScreen/maleSexSelectIcons.png" , {frameWidth: 75 , frameHeight: 75 });
            this.load.spritesheet("femaleSexSelectIcons" , "assets/titleScreen/femaleSexSelectIcons.png" , {frameWidth: 75 , frameHeight: 75 });
            this.load.spritesheet("neutralSexSelectIcons" , "assets/titleScreen/neutralSexSelectIcons.png" , {frameWidth: 75 , frameHeight: 75 });
            this.load.spritesheet('textBox', 'assets/hudElements/textBox.png',{frameWidth: 600, frameHeight: 100 });
            //notice, the charcters sprites are x12 there normal size since they are so small.
            this.load.spritesheet('charBlack', 'assets/hudElements/blackCharacterSet.png',{frameWidth: 84, frameHeight: 108});
            this.load.spritesheet('charBubble', 'assets/hudElements/characterSetBubble.png',{frameWidth: 84, frameHeight: 108});
            this.load.spritesheet('charWhite', 'assets/hudElements/whiteCharacterSet.png',{frameWidth: 84, frameHeight: 108});
            this.load.spritesheet('ercus', 'assets/hudElements/ercus.png',{frameWidth: 84, frameHeight: 108});
            this.load.spritesheet('textBoxProfile', 'assets/hudElements/textBoxProfile.png',{frameWidth: 105, frameHeight: 96 });
            this.load.spritesheet('saveSlot', 'assets/titleScreen/saveSlotBox.png',{frameWidth: 1350, frameHeight: 300 });
            this.load.spritesheet('skillSaveSlotIcon', 'assets/titleScreen/SkillSaveSlotIcons.png',{frameWidth: 99, frameHeight: 99 });
            this.load.spritesheet('healthSlotIcon', 'assets/titleScreen/slotHealthIcon.png',{frameWidth: 99, frameHeight: 99 });
            this.load.spritesheet('sexSlotSexIcon', 'assets/titleScreen/saveSlotSexIcon.png',{frameWidth: 75, frameHeight: 75 });
            this.load.spritesheet('shellIcon', 'assets/hudElements/shellIcon.png',{frameWidth: 96, frameHeight: 96 });
            this.load.spritesheet('bestiaryIcon', 'assets/hudElements/bestiaryIcon.png',{frameWidth: 96, frameHeight: 96 });
            this.load.spritesheet('removeSlots', 'assets/titleScreen/removeSlots.png',{frameWidth: 99, frameHeight: 99 });
            this.load.spritesheet('no', 'assets/hudElements/no.png',{frameWidth: 60, frameHeight: 33 });
            this.load.spritesheet('yes', 'assets/hudElements/yes.png',{frameWidth: 78, frameHeight: 33 });
            this.load.spritesheet('curses', 'assets/titleScreen/curses.png',{frameWidth: 96, frameHeight: 96 });
            
            this.secretLoad();

            if(this.titleLogoType === undefined || this.titleLogoType === null){

                let tempObject = {
                    titleLogoType: "default"
                };

                secretSave(tempObject);
                this.titleLogoType = "default";
            }

            if(this.titleLogoType === "default"){
                this.load.spritesheet("titleLogo" , "assets/titleScreen/title screen logo.png" , {frameWidth: 720 , frameHeight: 760});

                this.load.audioSprite('titleThemeSFX','audio/used-audio/titlescreen-sounds/titlescreen-sounds.json',[
                    "audio/used-audio/titlescreen-sounds/In Defiance Of The Curse by Gangstalka.mp3"
                  ]);

            }else if(this.titleLogoType === "shadow"){
                this.load.spritesheet("titleLogo" , "assets/titleScreen/title screen logo shadow.png" , {frameWidth: 720 , frameHeight: 760});

                this.load.audioSprite('earieSFX','audio/used-audio/earie-sounds/earie-sounds.json',[
                    "audio/used-audio/earie-sounds/earie-sounds.mp3"
                    ]);
            }
           
            
            this.load.audioSprite('buttonSFX','audio/used-audio/button-sounds/button-sounds.json',[
                "audio/used-audio/button-sounds/button-sounds.mp3"
              ]);

            this.load.audioSprite('curseSFX','audio/used-audio/curse-sounds/curse-sounds.json',[
                "audio/used-audio/curse-sounds/suntemple-curse.mp3"
              ]);

            
        

            this.load.scenePlugin({
                key: 'rexuiplugin',
                url: 'lib/vendors/rexuiplugin.min.js',
                sceneKey: 'rexUI'
            });

        }

        create(){
            console.log("title scene object", this);

            let that = this;

            this.elements = this.physics.add.group();

            //displays the current game version
            this.version = new makeText(this,this.screenWidth-170,this.screenHeight,'charBubble',"Alpha V0.30");
            this.version.visible = true;
            this.version.setDepth(51);
            this.elements.add(this.version);

            this.creditsArray = [
                "Lunalyst: lead developer",
                'Justanotherjames: development assistance',
                "nobody's death: sound composer",
                'tracks:',
                '- Hare-raising Harmonies',
                '- Paws and Wait',
                '- Whats Good Slime',
                '- In Defiance of the Curse',
                'Stiefeljackal: rabbit gameover moddification',
                'Zacchary Dempsey-Plante: Pixellari font',
                "Scarlet: orthographer, inspiration, bug testing",
                'Kashindolly: orthographer',
                'Otpfurry1: donation, inspiration',
                'Tyler Ritchie: patreon',
                'Leo: patreon',
                'Inquisitor Kobold: patreon',
                'Zealotdkd: patreon',
                'Bunger: patreon',
                'Dainsleft Rovera: patreon',
                'Night Raven: patreon',
                'Foxymew: patreon',
                'Irongelatin: gameover dialogue',
                'Istara: commission & inspiration',
                'Vik : commision, gameover dialogue, inspiration, bug testing',
                'Zebby: inspiration, bug testing',
                'Drachen: inspiration,  bug testing',
                'Cirme: inspiration, bug testing',
                'Darkgamer22263: inspiration, bug testing',
                'Rat Profile Picture: inspiration, bug testing',
                'Lit_kale_chip: bug testing',
                'Gamersgate123: bug testing',
                'patrickster: bug testing',
                'Aaron: bug testing',
                'Dolly-decimal: bug testing',
                'Kaynstarr: inspiration',
                'Fluffstuff: inspiration',
                'Manny: inspiration',
                'Wagoo: inspiration',
                'Nox: inspiration',
                'Bigbigbig: inspiration',
                'Turtwag: inspiration',
                'Adorabletyphlosion: inspiration',
            ];
            
            //this.form = new makeEcrus(this,20, 200,"@011@ @00110@ @111@ @1101@ @111@ @011@ @01011@ @011@ @000@ @00111@ @0010@ @111@ @1101@ @11000@ @1001@ @1101@ @11001@ @1010@ @111@ @10111@ @10110@ @000@ @000@ @1010@ @011@ @1000@ @0100@ @111@ @1001@ @01010@ @000@ @1000@ @0100@ @0010@ @111@");
            //this.form.visible = true;
            this.credits = new credits(this,this.screenWidth/2-400,240,this.creditsArray);
            this.credits.setDepth(51);
            

            //adds looping sound effect.

            if(this.titleLogoType === "shadow"){
                this.initLoopingSound('earieSFX','earieCave', 0.1);
            }else{
                this.initLoopingSound('titleThemeSFX','titleTheme',0.1);
            }
            

            //dramatic fade in.
            this.cameras.main.fadeIn(500, 0, 0, 0);

            //handles scene transition and fade out.
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {

                //for loop looks through all the looping music playing within a given scene and stops the music.
                for(let counter = 0; counter < this.sound.sounds.length; counter++){
                    this.sound.get(this.sound.sounds[counter].key).stop();
                }
                
                console.log("warping player to location."+ this.playerLocation);
                console.log("now stoping this scene",);
                this.scene.stop();

                if(this.newGameActivated === false){
                    console.log("now loading game ui",);
                    this.scene.start('gameHud');
    
                }
                
                let that = this;
                setTimeout(function () {
                    //if we are making a new game
                    if(that.newGameActivated === true){
                        //send the player through the intro cutscene
                        that.scene.start("intro");
                    //otherwise load there saved location. 
                    }else{

                        console.log("now Loading main scene ",that.playerLocation);
                        that.scene.start(that.playerLocation);

                    }

                //startTimeTest("titlescreen load time.");
                }, 100);
            })

            // animations for some sprites present
            this.anims.create({key: 'titleLogoLoop1',frames: this.anims.generateFrameNames('titleLogo', { start: 0, end: 10 }),frameRate: 4,repeat: 0});
            this.anims.create({key: 'titleLogoLoop2',frames: this.anims.generateFrameNames('titleLogo', { start: 11, end: 14 }),frameRate: 4,repeat: 0});
            this.anims.create({key: 'titleLoop',frames: this.anims.generateFrameNames('title', { start: 0, end: 3 }),frameRate: 4,repeat: 0});

            //background definition.
            this.backround = this.add.sprite(this.screenWidth/2, 300, "titleBackground");
            this.backround.setScale(1.1);
            //this.backround.setTint(0x4b4b4b);
            this.titleLogo = this.add.sprite(this.screenWidth/2, 500, "titleLogo");
            this.elements.add(this.titleLogo);

            //title sprite
            //this.titleLogo.setScale();
            this.title = this.add.sprite(this.screenWidth/2, 65, "title");
            this.title.setScale(1/3 + 1/7);

            this.increment = 0;
            this.reset = false;
            this.titleTweenPlayed = false;
            this.colorArray = [0x7e0899,0x7e0899,0x7e0899,0x7e0899,0x7e0899,0x8e08ac,0x990bb9,0xa40dc6,0xad0cd1,0xb00bd5,0xbd0de4,0xc510ed,0xca09f5,0xca09f5,0xca09f5,0xca09f5,0xca09f5];

            //idea
            // on animation complete. reset color index. and loop 

            console.log("this.colorArray.length: ",this.colorArray.length);
            
            //curse sprite that changes
            this.curse = new curse(this, this.screenWidth/2 - 140,175);
            this.elements.add(this.curse);

            //textbox for new character 
            this.sceneTextBox = new textBox(this,this.screenWidth/2-40,630,'charWhite');
            this.sceneTextBox.setScale(1.2);
            //this.sceneTextBox.setTitleScreenView();
            this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
            this.sceneTextBox.activateTitleScreenTextbox(
                this,//scene
                false,// is the text box visible?
                [],// sets profile array
                ""//text sent to the text box.
                );
            this.sceneTextBox.setTextboxBackground("cursed");
            this.sceneTextBox.textTint = 0x9d00e0;
            this.elements.add(this.sceneTextBox);

            //sets up the three save slots
            this.saveslot1 = new saveSlot(this, this.screenWidth/2, 220);
            this.elements.add(this.saveslot1);

            this.trashCan1 = new removeSlot(this, this.saveslot1.x+350, this.saveslot1.y);
            this.trashCan1.setupRemoveSlot(1);
            this.elements.add(this.trashCan1);
            
            this.saveslot2 = new saveSlot(this, this.screenWidth/2, 440);
            this.elements.add(this.saveslot2);

            this.trashCan2 = new removeSlot(this, this.saveslot2.x+350, this.saveslot2.y);
            this.trashCan2.setupRemoveSlot(2);
            this.elements.add(this.trashCan2);

            this.saveslot3 = new saveSlot(this, this.screenWidth/2, 660);
            this.elements.add(this.saveslot3);

            this.trashCan3 = new removeSlot(this, this.saveslot3.x+350, this.saveslot3.y);
            this.trashCan3.setupRemoveSlot(3);
            this.elements.add(this.trashCan3);

            //sets up button objects.
            this.newGame = new newGame(this,130,700);
            this.elements.add(this.newGame);

            this.loadGame = new loadGame(this,130, 750);
            this.elements.add(this.loadGame);

            this.creditsButton = new creditsButton(this,100,800);
            this.elements.add(this.creditsButton);

            this.back = new back(this, 80, 850);
            this.elements.add(this.back);

            this.maleIcon = new maleIcon(this,this.screenWidth/2+75, 500);
            this.elements.add(this.maleIcon);

            this.femaleIcon = new femaleIcon(this,this.screenWidth/2-75, 500);
            this.elements.add(this.femaleIcon);

            this.yes = new yes(this,this.screenWidth/2+75, 500);
            this.elements.add(this.yes);

            this.no = new no(this,this.screenWidth/2-75, 500);
            this.elements.add(this.no);

            //sets up mouse detection
            this.input.mouse.capture = true;

            //applies function so the buttons
            this.newGame.setupNewGame();

            this.loadGame.setupLoadGame();

            this.creditsButton.setupCredits();

            this.back.setupBack();

            this.maleIcon.setupMaleIcon();

            this.femaleIcon.setupFemaleIcon();

            this.yes.setupYesTitle();

            this.no.setupNoTitle();

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
           
            endTimeTest();
        }

        update(){

            //this.countActiveScenes()

            this.titleLetterLoop();

            //code handles the title screen phantom logo animation.
            if(this.logoToggle === false){
                if(this.logoAnimationPlayed === false && this.titleLogo.visible === true){
                    this.logoAnimationPlayed = true;
                    this.curse.visible = true;
                    //console.log("this.curse",this.curse);
                    this.initSoundEffect('curseSFX','curse',0.1);
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
            //loads the next gameplay scene by calling the fadeout camera effect.
            this.playerLocation = 'tutorialBeachLevel';
            this.cameras.main.fadeOut(500, 0, 0, 0);
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

            console.log('this.savedFileArray', this.savedFileArray);
            console.log('slot', slot);
            if(this.isInSlotSelectNew === true && this.savedFileArray[slot-1] === false){
                this.initSoundEffect('buttonSFX','2',0.05);
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
                    true,// is the text box visible?
                    ["sign"],// sets profile array
                    "Select your player Sex. this can be changed later if you desire."//text sent to the text box.
                    );
                //add text box describing the player sex select. need to change scale.
                
                //if the player is in the load menu
                }else if(this.isInSlotSelectLoad === true){

                //load the game file save slot data
                this.loadGameFile(slot);
                //then check if that data has a valid x cordinate,
                //many need better check for file validity
                if(this.warpToX !== undefined && this.warpToX !== null){
                    this.initSoundEffect('buttonSFX','2',0.05);

                    //calls the scene transition load.
                    let playerDataObject = {
                        saveX: this.warpToX,
                        saveY: this.warpToY,
                        playerHpValue: this.playerHealth,
                        playerSex:this.playerSex,
                        playerLocation: this.playerLocation,
                        inventoryArray: this.inventoryDataArray,
                        playerBestiaryData: this.playerBestiaryData,
                        playerSkillsData: this.playerSkillsData,
                        playerSaveSlotData: this.playerSaveSlotData,
                        flagValues: this.flagValues,
                        settings:this.settings,
                        dreamReturnLocation:this.dreamReturnLocation,
                        playerCurseValue: 0
                    };

                    this.validateSaveFile(playerDataObject);
                    
                    this.saveGameFile(playerDataObject);

                    this.saveGame(playerDataObject);
                    
                    //loads the next gameplay scene by calling the fadeout camera effect.
                    this.cameras.main.fadeOut(500, 0, 0, 0);
                }else{
                    this.initSoundEffect('buttonSFX','3',0.05);
                }
            }else{
                this.initSoundEffect('buttonSFX','3',0.05);   
            }
        }

        showSaveSlots(isVisible,trashCansVisible){
            console.log("activating showsaveslots.");
            console.log("isVisible: ",isVisible," trashCansVisible: ",trashCansVisible);
            this.saveslot1.visible = isVisible;
            this.loadGameFile(1);
            //if the save file is defined
            console.log("this.warpToX: ",this.warpToX," this.isInSlotSelectNew: ",this.isInSlotSelectNew," this.isInSlotSelectLoad: ",this.isInSlotSelectLoad);
            if(this.warpToX !== null && this.warpToX !== undefined){
                this.savedFileArray[0] = true;
                if(this.isInSlotSelectNew === true){
                    this.saveslot1.setTint(0xA9A9A9);
                }else{
                    this.saveslot1.clearTint();
                }
            }else{// if the save file is not defined
                this.savedFileArray[0] = false;
                if(this.isInSlotSelectLoad === true){
                    this.saveslot1.setTint(0xA9A9A9);
                }else{
                    this.saveslot1.clearTint();
                }
            }
            this.tempNewGameSlotID = 1;
            this.saveslot1.showSlot();
            this.saveslot1.setSkillDisplay();
            this.trashCan1.visible = trashCansVisible;
            this.clearSlotData();

            this.saveslot2.visible = isVisible;
            this.loadGameFile(2);
            console.log("this.warpToX: ",this.warpToX," this.isInSlotSelectNew: ",this.isInSlotSelectNew," this.isInSlotSelectLoad: ",this.isInSlotSelectLoad);
            if(this.warpToX !== null && this.warpToX !== undefined){
                this.savedFileArray[1] = true;
                if(this.isInSlotSelectNew === true){
                    this.saveslot2.setTint(0xA9A9A9);
                }else{
                    this.saveslot2.clearTint();
                }
            }else{
                this.savedFileArray[1] = false;
                if(this.isInSlotSelectLoad === true){
                    this.saveslot2.setTint(0xA9A9A9);
                }else{
                    this.saveslot2.clearTint();
                }
            }
            this.tempNewGameSlotID = 2;
            this.saveslot2.showSlot();
            this.saveslot2.setSkillDisplay();
            this.trashCan2.visible = trashCansVisible;
            this.clearSlotData();

            this.saveslot3.visible = isVisible;
            this.loadGameFile(3);
            console.log("this.warpToX: ",this.warpToX," this.isInSlotSelectNew: ",this.isInSlotSelectNew," this.isInSlotSelectLoad: ",this.isInSlotSelectLoad);
            if(this.warpToX !== null && this.warpToX !== undefined){
                this.savedFileArray[2] = true;
                if(this.isInSlotSelectNew === true){
                    this.saveslot3.setTint(0xA9A9A9);
                }else{
                    this.saveslot3.clearTint();
                }
            }else{
                this.savedFileArray[2] = false;
                if(this.isInSlotSelectLoad === true){
                    this.saveslot3.setTint(0xA9A9A9);
                }else{
                    this.saveslot3.clearTint();
                }
            }
            this.tempNewGameSlotID = 3;
            this.saveslot3.showSlot();
            this.saveslot3.setSkillDisplay();
            this.trashCan3.visible = trashCansVisible;
            this.clearSlotData();

        }

        titleLetterLoop(){

            //if we havent started the loop.
            if(this.titleTweenPlayed === false){

                this.titleTweenPlayed = true;
                
                //apply tween
                this.titleTween = this.tweens.add({
                    targets: this.title,
                    duration: 800,
                    delay: 0,
                    alpha: 1,
                    repeat: 0,
                    yoyo: true,
                    onUpdate: (tween) => {

                        if(this.reset === false){

                            this.title.anims.play("titleLoop",true);

                            this.reset = true;
                            let temp = this;
                            setTimeout(function () {
                                
                                temp.reset = false;
                                if(temp.increment < temp.colorArray.length){

                                    temp.title.setTint(temp.colorArray[temp.increment]);

                                    temp.increment++;

                                }else{

                                    temp.colorArray.reverse();
                                    temp.increment = 0;  
                                }
                            },25);
                        }
                    
                    },
                    

                },this);

                //play animation of letters
                this.title.anims.play("titleLoop").once('animationcomplete', () => {
                    //destroy tween
                    this.titleTween.remove();

                    //reset variables
                    this.increment = 0;
                    this.reset = false;
                    this.colorArray = [0x7e0899,0x7e0899,0x7e0899,0x7e0899,0x7e0899,0x8e08ac,0x990bb9,0xa40dc6,0xad0cd1,0xb00bd5,0xbd0de4,0xc510ed,0xca09f5,0xca09f5,0xca09f5,0xca09f5,0xca09f5];
                    this.titleTweenPlayed = false;


                });
            }

            
        }

        

}