class optionsMenu extends Phaser.GameObjects.Container{

    constructor(scene,inventory, xPos, yPos){

        super(scene, xPos, yPos);

        this.setScrollFactor(0);
        //sets up inner andf outer menu interior and exterior
        //this.optionMenuInterior = scene.add.sprite(50, 385, 'optionsMenu');
        //this.optionMenuInterior.setScale(0.26);
        //this.optionMenuInterior.setAlpha(0.5);
        //this.add(this.optionMenuInterior);

        //this.optionMenuBorder = scene.add.sprite(50, 385, 'optionsMenu');
        //this.optionMenuBorder.anims.create({key: 'border',frames: this.optionMenuBorder.anims.generateFrameNames('optionsMenu', { start: 1, end: 1 }),frameRate: 10,repeat: -1});
        //this.optionMenuBorder.anims.play('border');
        //this.optionMenuBorder.setScale(0.26);
        //this.add(this.optionMenuBorder);

        //refrences to the scene for some use later
        let that = this;

        this.scene = scene;

        this.inventory = inventory;

        this.yIncrementButton = 260;
        this.yIncrementButtonLabel = 100;
        this.buttonOffsetX = -215;
        this.offsetX = -100;

        this.increaseY1 = 50;
        this.incrementY2 = 80;

         //creates boarder which is not translucent
        this.inventoryBorder = new inventoryBorder(scene,0,458,'inventoryBorder');
        this.inventoryBorder.visible = true;
        this.add(this.inventoryBorder);


        //add option menu elements and buttons
        this.title = new makeText(scene,-240,205,'charBubble',"SETTINGS");
        this.add(this.title);

        this.volumeMainButton = new volumeButton(scene,this,this.buttonOffsetX,this.yIncrementButton);
        this.volumeMainButton.setupVolumeButton();
        this.add(this.volumeMainButton);

        this.soundText1 = new makeText(scene,this.volumeMainButton.x + 50,this.volumeMainButton.y+10 ,'charBubble',"MAIN VOLUME ");
        this.add(this.soundText1);

        this.yIncrementButton += this.incrementY2;

        this.volumeMusicButton = new volumeButton(scene,this,this.buttonOffsetX,this.yIncrementButton);
        this.volumeMusicButton.setupVolumeGroupButton("music");
        this.add(this.volumeMusicButton);

        this.soundText2 = new makeText(scene,this.volumeMusicButton.x + 50,this.volumeMusicButton.y + 10,'charBubble',"MUSIC");
        this.add(this.soundText2);
        
        this.yIncrementButton += this.incrementY2;

        this.volumeAmbienceButton = new volumeButton(scene,this,this.buttonOffsetX,this.yIncrementButton);
        this.volumeAmbienceButton.setupVolumeGroupButton("ambience");
        this.add(this.volumeAmbienceButton);

        this.soundText3 = new makeText(scene,this.volumeAmbienceButton.x + 50,this.volumeAmbienceButton.y + 10,'charBubble',"AMBIENCE");
        this.add(this.soundText3);

        this.yIncrementButton += this.incrementY2;

        this.onomatButton = new onomatButton(scene,this,this.buttonOffsetX,this.yIncrementButton);
        this.onomatButton.setupOnomatButton();
        this.add(this.onomatButton);
        
        this.onomatText = new makeText(scene,this.onomatButton.x + 50,this.onomatButton.y + 25 ,'charBubble',"ONOMATOPOEIA ");
        this.add(this.onomatText);

        //exit button
        this.exitButton = new exitButton(scene,this,this.buttonOffsetX,this.yIncrementButton + 212);
        this.exitButton.setupExitButton();
        this.add(this.exitButton);
        
        //exit button text
        this.exitText = new makeText(scene,this.exitButton.x + 50,this.exitButton.y + 25,'charBubble',"EXIT GAME");
        this.add(this.exitText);
         
        this.yIncrementButton = 260;
        this.buttonOffsetX = this.buttonOffsetX + 265;

        this.internalView = new internalViewButton(scene,this,this.buttonOffsetX,this.yIncrementButton);
        this.internalView.setupInternalViewButton();
        this.add(this.internalView);

        this.onomatText = new makeText(scene,this.internalView.x + 50,this.internalView.y + 25,'charBubble',"INTERNAL");
        this.add(this.onomatText);

        this.yIncrementButton += this.incrementY2;

        this.prefButton = new preferenceButton(scene,this,this.buttonOffsetX,this.yIncrementButton);
        this.prefButton.setupPrefButton();
        this.add(this.prefButton);

        this.preferanceText = new makeText(scene,this.prefButton.x + 50,this.prefButton.y + 25,'charBubble',"PREFERENCE");
        this.add(this.preferanceText);

        this.yIncrementButton += this.incrementY2;

        this.sexButton = new sexSelectButton(scene,this,this.buttonOffsetX,this.yIncrementButton);
        this.sexButton.setupSexButton();
        this.add(this.sexButton);

        this.sexText = new makeText(scene,this.sexButton.x + 50,this.sexButton.y + 25,'charBubble',"PLAYER SEX");
        this.add(this.sexText);

        this.yIncrementButton += this.incrementY2;

        this.mobileButton = new mobileSettingsButton(scene,this,this.buttonOffsetX,this.yIncrementButton);
        this.mobileButton.setupMobileButton();
        this.add(this.mobileButton);

        this.mobileToggle = new makeText(scene,this.mobileButton.x + 50,this.mobileButton.y + 25,'charBubble',"MOBILE");
        this.add(this.mobileToggle);

        this.yIncrementButton += this.incrementY2 + 20;

        //need textbox to display exit
        this.optionsTextBox = new textBox(scene,-267,625+250,'charBlack');
        this.optionsTextBox.setScale(2);
        this.add(this.optionsTextBox);

        //closing settings button
        this.closingButton = new closingButton(scene,inventory,this,230,191);
        this.closingButton.setupClosingButton();
        this.add(this.closingButton);

        //need yes button to boot to main menu
        this.yes = new yes(scene,-685, 835);
        this.yes.setupYesSettings();
        this.yes.setOptionsMenu(this);
        this.add(this.yes);

        //need no to close prompt
        this.no = new no(scene,-685, 835 + 60);
        this.no.setOptionsMenu(this);
        this.no.setupNoSettings();
        this.add(this.no);

        //rexUI scene slider plugin
        console.log("scene: ",scene)
        this.volumeSlider = new RexPlugins.UI.Slider(scene,{
                //formula to conver screen x and y to pixel x and y
               
                x: this.volumeMainButton.x + 130,
                y: this.volumeMainButton.y + 15,
                width: 180,
                height: 20,
                orientation: 'x',
    
                track: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0x000000),
                indicator: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0x808080),
                thumb: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0xffffff),
    
                valuechangeCallback: function (value) {

                    //if the value is zero, mute volume. else set volume to value
                    if(value === 0){
                        that.volumeMainButton.isOn = false;
                        that.volumeMainButton.anims.play("volumeOffInActive");
                        console.log(that.scene.sound);
                        that.scene.sound.setVolume(0);  
                        that.currentSoundValue = 0; 
                    
                    }else{
                        that.volumeMainButton.isOn = true;
                        that.volumeMainButton.anims.play("volumeOnInActive");
                        that.scene.sound.setVolume(value);
                        that.currentSoundValue = value; 
                    }
                },
                space: {
                    top: 4,
                    bottom: 4
                },
                input: 'drag', // 'drag'|'click'
            }).layout();

            this.add(this.volumeSlider);

            this.volumeMusicSlider = new RexPlugins.UI.Slider(scene,{
                //formula to conver screen x and y to pixel x and y
               
                x: this.volumeMusicButton.x + 130,
                y: this.volumeMusicButton.y + 15,
                width: 180,
                height: 20,
                orientation: 'x',
    
                track: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0x000000),
                indicator: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0x808080),
                thumb: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0xffffff),
    
                valuechangeCallback: function (value) {

                    //if the value is zero, mute volume. else set volume to value
                    if(value === 0){
                        that.volumeMusicButton.isOn = false;
                        that.volumeMusicButton.anims.play("volumeOffInActive");
                        that.scene.sound.soundGroups["music"].forEach((soundKey) => {
                            console.log("soundKey: ",soundKey);
                            if(soundKey.volumeNode !== null){
                                soundKey.setVolume(0);
                                }
                            });
                        that.currentSoundMusicValue = 0; 
                        that.scene.sound.soundGroupVolumes["music"] = 0;
                    }else{
                        that.volumeMusicButton.isOn = true;
                        that.volumeMusicButton.anims.play("volumeOnInActive");
                        that.scene.sound.soundGroups["music"].forEach((soundKey) => {
                            if(soundKey.volumeNode !== null){
                                soundKey.setVolume(value *musicDampen)
                                }
                            });
                        that.currentSoundMusicValue = value; 
                        that.scene.sound.soundGroupVolumes["music"] = value;
                    }
                },
                space: {
                    top: 4,
                    bottom: 4
                },
                input: 'drag', // 'drag'|'click'
            }).layout();

            this.add(this.volumeMusicSlider);

            this.volumeAmbienceSlider = new RexPlugins.UI.Slider(scene,{
                //formula to conver screen x and y to pixel x and y
               
                x: this.volumeAmbienceButton.x + 130,
                y: this.volumeAmbienceButton.y + 15,
                width: 180,
                height: 20,
                orientation: 'x',
    
                track: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0x000000),
                indicator: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0x808080),
                thumb: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0xffffff),
    
                valuechangeCallback: function (value) {

                    //if the value is zero, mute volume. else set volume to value
                    if(value === 0){
                        that.volumeAmbienceButton.isOn = false;
                        that.volumeAmbienceButton.anims.play("volumeOffInActive");
                        that.scene.sound.soundGroups["ambience"].forEach((soundKey) => soundKey.setVolume(0));
                        that.currentSoundAmbienceValue = 0; 
                        that.scene.sound.soundGroupVolumes["ambience"] = 0;
                    
                    }else{
                        that.volumeAmbienceButton.isOn = true;
                        that.volumeAmbienceButton.anims.play("volumeOnInActive");
                        that.scene.sound.soundGroups["ambience"].forEach((soundKey) => soundKey.setVolume(value * ambienceDampen));
                        that.currentSoundAmbienceValue = value; 
                        that.scene.sound.soundGroupVolumes["ambience"] = value;
                    }
                },
                space: {
                    top: 4,
                    bottom: 4
                },
                input: 'drag', // 'drag'|'click'
            }).layout();

            this.add(this.volumeAmbienceSlider);
            //console.log('this.volumeSlider: ',this.volumeSlider);

        //first we need to figure out what save slot we are working in. making a temp object
        let getSaveSlot = {
            saveSlot: null
        };

        //we call a emitter to get the slot from the gamehud which has the players data.
        inventoryKeyEmitter.emit(inventoryKey.getSaveSlot,getSaveSlot);

        //makes a object to pass along the players data too
        let playerDataObject = {
            saveX: null,
            saveY: null,
            playerMaxHp: null,
            playerSex:null,
            playerLocation: null,
            inventoryArray: null,
            playerBestiaryData: null,
            playerSkillsData: null,
            playerSaveSlotData: null,
            flagValues: null,
            settings:null,
            dreamReturnLocation: null
        };
        
        // then we call the built in returnfile function from our custom scene class
        scene.returnFile(getSaveSlot.saveSlot,playerDataObject);
        console.log("playerDataObject",playerDataObject);

        //now that we have the data we need we can now set correct balues on start up.

        //settings values in object first two can be changed at any time
        this.currentSoundValue = playerDataObject.settings.volume;
        this.currentSoundMusicValue = playerDataObject.settings.musicVolume;
        this.currentSoundAmbienceValue = playerDataObject.settings.ambienceVolume;
        this.currentOnomatValue = playerDataObject.settings.onomatopoeia;
        this.currentInternalViewValue = playerDataObject.settings.internalView;
        this.currentMobileControls = playerDataObject.settings.mobileControls;

        // the other two need a soft reload back to the players last save point
        this.currentPrefValue = playerDataObject.settings.preferance;
        
        this.newPrefValue = playerDataObject.settings.preferance;
        this.currentSexValue = playerDataObject.playerSex;
        this.newSexValue = playerDataObject.playerSex;

        //sets the value of the settings so that they are displayed correctly and function correctly on start up.
        this.volumeMainButton.setValue(this.currentSoundValue);
        this.volumeSlider.setValue(this.currentSoundValue);
        this.volumeMusicButton.setValueGroup(this.currentSoundMusicValue);
        this.volumeMusicSlider.setValue(this.currentSoundMusicValue);
        this.volumeAmbienceButton.setValueGroup(this.currentSoundAmbienceValue);
        this.volumeAmbienceSlider.setValue(this.currentSoundAmbienceValue);
        this.onomatButton.setValue(this.currentOnomatValue);
        this.internalView.setValue(this.currentInternalViewValue);
        this.internalView.setValue(this.currentInternalViewValue);
        this.mobileButton.setValue(this.currentMobileControls);
        this.prefButton.setValue(this.currentPrefValue);
        this.sexButton.setValue(this.currentSexValue);

        //hides mobile controls if they are not suppost to be on.
        if(!this.currentMobileControls){
            this.scene.mobileGroup.toggleVisible();
        }

        scene.add.existing(this);

        //hides the object on creation.
        this.visible = false;  

        //used to tell if a reload is needed.
        this.reloadNeeded = false;

        //used to tell if quit out or reloading
        this.isQuiting = false;
    }

    checkReload(){
        if(this.newPrefValue === this.currentPrefValue && 
            this.newSexValue === this.currentSexValue
        ){
            this.reloadNeeded = false;
        }
    }

    //if the menu is closed without saving then, reset changes.
    resetSettings(){

        //sets the values apart of the main object
        this.newPrefValue = this.currentPrefValue;
        this.newSexValue = this.currentSexValue;

        //resets the value in the button objects
        this.volumeMainButton.setValue(this.currentSoundValue);
        this.volumeSlider.setValue(this.currentSoundValue);
        this.volumeMusicButton.setValueGroup(this.currentSoundMusicValue);
        this.volumeMusicSlider.setValue(this.currentSoundMusicValue);
        this.volumeAmbienceButton.setValueGroup(this.currentSoundAmbienceValue);
        this.volumeAmbienceSlider.setValue(this.currentSoundAmbienceValue);
        this.onomatButton.setValue(this.currentOnomatValue);
        this.internalView.setValue(this.currentInternalViewValue);
        this.internalView.setValue(this.currentInternalViewValue);
        this.mobileButton.setValue(this.currentMobileControls);
        this.prefButton.setValue(this.currentPrefValue);
        this.sexButton.setValue(this.currentSexValue);

        //update the volume and onomat value
        //first we need to figure out what save slot we are working in. making a temp object
        let getSaveSlot = {
            saveSlot: null
        };

        //we call a emitter to get the slot from the gamehud which has the players data.
        inventoryKeyEmitter.emit(inventoryKey.getSaveSlot,getSaveSlot);

        //makes a object to pass along the players data too
        let playerDataObject = {
            saveX: null,
            saveY: null,
            playerMaxHp: null,
            playerSex:null,
            playerLocation: null,
            inventoryArray: null,
            playerBestiaryData: null,
            playerSkillsData: null,
            playerSaveSlotData: null,
            flagValues: null,
            settings:null,
            dreamReturnLocation:null,
            
        };
        
        // then we call the built in returnfile function from our custom scene class
        console.log("getting saveslot data for settings.")
        this.scene.returnFile(getSaveSlot.saveSlot,playerDataObject);
        console.log("playerDataObject",playerDataObject);
        
        //set the non game reset settings
        playerDataObject.settings.volume = this.currentSoundValue;
        playerDataObject.settings.musicVolume = this.currentSoundMusicValue;
        playerDataObject.settings.ambienceVolume = this.currentSoundAmbienceValue; 
        playerDataObject.settings.onomatopoeia = this.currentOnomatValue;
        playerDataObject.settings.internalView = this.currentInternalViewValue;
        playerDataObject.settings.mobileControls = this.currentMobileControls;

        

        //update the settings variable a part of the gamehud, so that the settings dont get overwritten incorrectly later.
        this.scene.settings = playerDataObject.settings;

        //saves settings to our json save file
        this.scene.saveGameFile(playerDataObject);

        //resets the reload value
        this.reloadNeeded = false;

        //temp object to update the onomat value
        let onomat = {
            value: this.currentOnomatValue
        };
        //updates the onomat variable using gameplay scene emitter.
        inventoryKeyEmitter.emit(inventoryKey.updateOnomat,onomat);

        //temp object to update the onomat value
        let internalView = {
            value: this.currentInternalViewValue
        };
        
        //updates the onomat variable using gameplay scene emitter.
        inventoryKeyEmitter.emit(inventoryKey.updateInternalView,internalView);

    }

   /* saveSettings(){
        
    }*/

    //save settings 
    saveSettings(){

        //update the cur values with the new values
         this.currentPrefValue = this.newPrefValue;
         this.currentSexValue = this.newSexValue;

        //update the volume and onomat value
        //first we need to figure out what save slot we are working in. making a temp object
        let getSaveSlot = {
            saveSlot: null
        };

        //we call a emitter to get the slot from the gamehud which has the players data.
        inventoryKeyEmitter.emit(inventoryKey.getSaveSlot,getSaveSlot);

        //makes a object to pass along the players data too
        let playerDataObject = {
            saveX: null,
            saveY: null,
            playerHpValue: null,
            playerSex: null,
            playerLocation: null,
            inventoryArray: null,
            playerBestiaryData: null,
            playerSkillsData: null,
            playerSaveSlotData: null,
            flagValues: null,
            settings:null,
            dreamReturnLocation:null,
        };
        
        // then we call the built in returnfile function from our custom scene class
        console.log("getting saveslot data for settings.")
        this.scene.returnFile(getSaveSlot.saveSlot,playerDataObject);
        console.log("playerDataObject",playerDataObject);
        
        //set the non game reset settings
        playerDataObject.settings.volume = this.currentSoundValue;
        playerDataObject.settings.musicVolume = this.currentSoundMusicValue;
        playerDataObject.settings.ambienceVolume = this.currentSoundAmbienceValue;
        playerDataObject.settings.onomatopoeia = this.currentOnomatValue;
        playerDataObject.settings.internalView = this.currentInternalViewValue;
        playerDataObject.settings.mobileControls = this.currentMobileControls;
        playerDataObject.settings.preferance = this.currentPrefValue;
        playerDataObject.playerSex = this.currentSexValue;

        //saves settings to the hard save
        this.scene.saveGameFile(playerDataObject);

        //now we need to update the temp, transition scenes save with the new data
        console.log('playerDataObject.playerHpValue: ',playerDataObject.playerHpValue)
        let tempPlayerData = {
            saveX: playerDataObject.saveX,
            saveY: playerDataObject.saveY,
            playerHpValue: playerDataObject.playerHpValue,
            playerSex: playerDataObject.playerSex,
            playerLocation: playerDataObject.playerLocation,
            inventoryArray: playerDataObject.inventoryArray,
            playerBestiaryData: playerDataObject.playerBestiaryData,
            playerSkillsData: playerDataObject.playerSkillsData,
            playerSaveSlotData: playerDataObject.playerSaveSlotData,
            flagValues: playerDataObject.flagValues,
            settings:playerDataObject.settings,
            dreamReturnLocation:playerDataObject.dreamReturnLocation,
            playerCurseValue:playerDataObject.playerCurseValue

          };

        this.scene.saveGame(tempPlayerData);

        //resets the value in the button objects
        this.volumeMainButton.setValue(this.currentSoundValue);
        this.volumeSlider.setValue(this.currentSoundValue);
        this.volumeMusicButton.setValueGroup(this.currentSoundMusicValue);
        this.volumeMusicSlider.setValue(this.currentSoundMusicValue);
        this.volumeAmbienceButton.setValueGroup(this.currentSoundAmbienceValue);
        this.volumeAmbienceSlider.setValue(this.currentSoundAmbienceValue);
        this.onomatButton.setValue(this.currentOnomatValue);
        this.internalView.setValue(this.currentInternalViewValue);
        this.mobileButton.setValue(this.currentMobileControls);
        this.prefButton.setValue(this.currentPrefValue);
        this.sexButton.setValue(this.currentSexValue);

        //resets the reload value
        this.reloadNeeded = false;

        //emitter to transition scenes
        loadSceneTransitionLoad.emit(SceneTransitionLoad.reloadGame,playerDataObject.playerLocation);
          
        //full reloads the game if exiting while settings are changed
        if(this.isQuiting === true){
            //calls the fadout for gamehud which reload the webpage.
            console.log("quiting game?")
            this.scene.cameras.main.fadeOut(500, 0, 0, 0);
        }else{

            //close all inventory related objects
            this.inventory.closeInventoryForSettings();

            //reset inventory data to the last save.
            this.scene.loadGameFile(this.scene.playerSaveSlotData.saveSlot);
            this.scene.loadGameHudData();

            //reset the visibility of the yes, no and optiontextbox.
            this.optionsTextBox.visible = false;
            this.yes.visible = false;
            this.no.visible = false;

        }
        
        //temp object to update the onomat value
        let onomat = {
            value: this.currentOnomatValue
        };
        
        //updates the onomat variable using gameplay scene emitter.
        inventoryKeyEmitter.emit(inventoryKey.updateOnomat,onomat);

        //temp object to update the onomat value
        let internalView = {
            value: this.currentInternalViewValue
        };
        
        //updates the onomat variable using gameplay scene emitter.
        inventoryKeyEmitter.emit(inventoryKey.updateInternalView,internalView);
        
    }
    

}