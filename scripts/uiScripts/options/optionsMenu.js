class optionsMenu extends Phaser.GameObjects.Container{

    constructor(scene,inventory, xPos, yPos){

        super(scene, xPos, yPos);

        this.setScrollFactor(0);
        //sets up inner andf outer menu interior and exterior
        this.optionMenuInterior = scene.add.sprite(50, 300, 'optionsMenu');
        this.optionMenuInterior.setScale(0.26);
        this.optionMenuInterior.setAlpha(0.5);
        this.add(this.optionMenuInterior);

        this.optionMenuBorder = scene.add.sprite(50, 300, 'optionsMenu');
        this.optionMenuBorder.anims.create({key: 'border',frames: this.optionMenuBorder.anims.generateFrameNames('optionsMenu', { start: 1, end: 1 }),frameRate: 10,repeat: -1});
        this.optionMenuBorder.anims.play('border');
        this.optionMenuBorder.setScale(0.26);
        this.add(this.optionMenuBorder);

        //refrences to the scene for some use later
        let that = this;

        this.scene = scene;

        this.inventory = inventory;

        //add option menu elements and buttons
        this.title = new makeText(scene,0*2,75*2,'charBubble',"SETTINGS");
        this.add(this.title);

        this.soundText = new makeText(scene,-10*2,100*2,'charBubble',"VOLUME ");
        this.add(this.soundText);

        this.volumeButton = new volumeButton(scene,this,-70,190);
        this.volumeButton.setupVolumeButton();
        this.add(this.volumeButton);

        this.onomatText = new makeText(scene,-10*2,130*2,'charBubble',"ONOMATOPOEIA ");
        this.add(this.onomatText);

        this.onomatButton = new onomatButton(scene,this,-70,240);
        this.onomatButton.setupOnomatButton();
        this.add(this.onomatButton);

        this.preferanceText = new makeText(scene,-10*2,155*2,'charBubble',"PREFERENCE ");
        this.add(this.preferanceText);

        this.prefButton = new preferenceButton(scene,this,-70,290);
        this.prefButton.setupPrefButton();
        this.add(this.prefButton);

        this.sexText = new makeText(scene,-10*2,180*2,'charBubble',"SEX ");
        this.add(this.sexText);

        this.sexButton = new sexSelectButton(scene,this,-70,340);
        this.sexButton.setupSexButton();
        this.add(this.sexButton);

        //exit button text
        this.mobileToggle = new makeText(scene,-10*2,205*2,'charBubble',"MOBILE CONTROLS");
        this.add(this.mobileToggle);

        //exit button
        this.mobileButton = new mobileSettingsButton(scene,this,-70,390);
        this.mobileButton.setupMobileButton();
        this.add(this.mobileButton);
        
        //exit button text
        this.exitText = new makeText(scene,-10*2,240*2,'charBubble',"EXIT GAME");
        this.add(this.exitText);

        //exit button
        this.exitButton = new exitButton(scene,this,-70,460);
        this.exitButton.setupExitButton();
        this.add(this.exitButton);

        //need textbox to display exit
        this.optionsTextBox = new textBox(scene,-167,625,'charBlack');
        this.optionsTextBox.setScale(1.1);
        this.add(this.optionsTextBox);

        //closing settings button
        this.closingButton = new closingButton(scene,inventory,this,190,170);
        this.closingButton.setupClosingButton();
        this.add(this.closingButton);

        //need yes button to boot to main menu
        this.yes = new yes(scene,-297, 535);
        this.yes.setupYesSettings();
        this.yes.setOptionsMenu(this);
        this.add(this.yes);

        //need no to close prompt
        this.no = new no(scene,-37, 535);
        this.no.setOptionsMenu(this);
        this.no.setupNoSettings();
        this.add(this.no);

        //rexUI scene slider plugin
        this.volumeSlider = new RexPlugins.UI.Slider(scene,{
                //formula to conver screen x and y to pixel x and y
               
                x: 65,
                y: 200,
                width: 200,
                height: 20,
                orientation: 'x',
    
                track: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0x000000),
                indicator: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0x808080),
                thumb: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0xffffff),
    
                valuechangeCallback: function (value) {

                    //if the value is zero, mute volume. else set volume to value
                    if(value === 0){
                        that.volumeButton.isOn = false;
                        that.volumeButton.anims.play("volumeOffInActive");
                        that.scene.sound.setVolume(0);  
                        that.currentSoundValue = 0; 
                    
                    }else{
                        that.volumeButton.isOn = true;
                        that.volumeButton.anims.play("volumeOnInActive");
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

            console.log('this.volumeSlider: ',this.volumeSlider);

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
            settings:null
        };
        
        // then we call the built in returnfile function from our custom scene class
        scene.returnFile(getSaveSlot.saveSlot,playerDataObject);

        //now that we have the data we need we can now set correct balues on start up.

        //settings values in object first two can be changed at any time
        this.currentSoundValue = playerDataObject.settings.volume;
        this.currentOnomatValue = playerDataObject.settings.onomatopoeia;
        this.currentMobileControls = playerDataObject.settings.mobileControls;

        // the other two need a soft reload back to the players last save point
        this.currentPrefValue = playerDataObject.settings.preferance;
        
        this.newPrefValue = playerDataObject.settings.preferance;
        this.currentSexValue = playerDataObject.playerSex;
        this.newSexValue = playerDataObject.playerSex;

        //sets the value of the settings so that they are displayed correctly and function correctly on start up.
        this.volumeButton.setValue(this.currentSoundValue);
        this.volumeSlider.setValue(this.currentSoundValue);
        this.onomatButton.setValue(this.currentOnomatValue);
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

    //if the menu is closed without saving then, reset changes.
    resetSettings(){

        //sets the values apart of the main object
        this.newPrefValue = this.currentPrefValue;
        this.newSexValue = this.currentSexValue;

        //resets the value in the button objects
        this.volumeButton.setValue(this.currentSoundValue);
        this.volumeSlider.setValue(this.currentSoundValue);
        this.onomatButton.setValue(this.currentOnomatValue);
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
            dreamReturnLocation:null
        };
        
        // then we call the built in returnfile function from our custom scene class
        console.log("getting saveslot data for settings.")
        this.scene.returnFile(getSaveSlot.saveSlot,playerDataObject);
        
        //set the non game reset settings
        playerDataObject.settings.volume = this.currentSoundValue;
        playerDataObject.settings.onomatopoeia = this.currentOnomatValue;
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

    }

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
        
        //set the non game reset settings
        playerDataObject.settings.volume = this.currentSoundValue;
        playerDataObject.settings.onomatopoeia = this.currentOnomatValue;
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
            dreamReturnLocation:playerDataObject.dreamReturnLocation

          };

        this.scene.saveGame(tempPlayerData);

        //resets the value in the button objects
        this.volumeButton.setValue(this.currentSoundValue);
        this.volumeSlider.setValue(this.currentSoundValue);
        this.onomatButton.setValue(this.currentOnomatValue);
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
        
    }
    

}