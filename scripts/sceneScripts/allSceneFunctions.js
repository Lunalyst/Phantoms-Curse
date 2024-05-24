//class is used mainly to store functions that should be shared across all game scenes. mainly loading and saving functions.
class allSceneFunctions extends Phaser.Scene {
  
  //{Save AND lOAD Functions}===================================================================================================================

    //this function saves data when the player is defeated so that the gameover scene can tell what enemy defeated the player.
    saveGameoverFile(playerSex,gameoverLocation, enemyThatDefeatedPlayer, playerSaveSlotData,defeatedTitle) {
      //creates a compound object that contains x and y possitions which tell the scene where to playce the player when warping to a new scene
      console.log("calling saveGameoverFile============================");
      console.log("playerSex: " + playerSex);
      console.log("gameoverLocation: " + gameoverLocation);
      console.log("enemyThatDefeatedPlayer: " + enemyThatDefeatedPlayer);
      console.log("playerSaveSlotData: ", playerSaveSlotData);
      console.log("defeatedTitle: ", defeatedTitle);

      const file = {
      sex: playerSex,
      location: gameoverLocation,
      enemy: enemyThatDefeatedPlayer,
      pssd: playerSaveSlotData,
      dt: defeatedTitle
      };
      
      //uses local Storage to store the data
      localStorage.setItem('saveGameoverFile', JSON.stringify(file));
  }

  //function to load data once we are in the gameover scene.
  loadGameoverFile() {
      //sets variable to the stored data
      // we will use const because we dont want anything to change variable. difference between let and var is that var can exist outside the scope when its declared. using let makes sure that the variable stays within scope.obeying scoping rules.
      const file = JSON.parse(localStorage.getItem('saveGameoverFile'));
      //retrieves data from the file object and gives it to the current scene
      console.log("calling loadGameoverFile============================");
      console.log("playerSex: " + file.sex);
      console.log("location: ", file.location);
      console.log("enemy: " + file.enemy);
      console.log("playerSaveSlotData: ", file.pssd);
      console.log("defeatedTitle: ", file.dt);

      this.playerSex = file.sex;
      this.gameoverLocation = file.location;
      this.enemyThatDefeatedPlayer = file.enemy;
      this.playerSaveSlotData = file.pssd;
      this.defeatedTitle = file.dt;
  }

  // the deep save function that is used to keep the savedata of the player. activated in savepoints class.
  saveGameFile(dataObject) {
      // bundles save data up in a variable to be json.stringifyed
      const file = {
      saveX: dataObject.saveX,
      saveY: dataObject.saveY,
      playerHpValue: dataObject.playerHpValue,
      sex: dataObject.playerSex,
      locationName: dataObject.playerLocation,
      id: dataObject.inventoryArray,
      pbd: dataObject.playerBestiaryData,
      psd: dataObject.playerSkillsData,
      pssd: dataObject.playerSaveSlotData,
      flags: dataObject.flagValues,
      settings: dataObject.settings
      };

      // these are the game variables that are hard saved when the player uses a save point.
      console.log("[saveGameFile]============================================");
      console.log("dataObject.saveX:",dataObject.saveX," --> file.saveX: ",file.saveX);
      console.log("dataObject.saveY:",dataObject.saveY," --> file.saveY: ",file.saveY);
      console.log("dataObject.playerHpValue:",dataObject.playerHpValue," --> file.playerHpValue: ",file.playerHpValue);
      console.log("dataObject.playerSex:",dataObject.playerSex," --> file.sex: ",file.sex);
      console.log("dataObject.playerLocation:",dataObject.playerLocation," --> file.locationName: ",file.locationName);
      console.log("dataObject.inventoryArray:",dataObject.inventoryArray," --> file.id: ",file.id);
      console.log("dataObject.playerBestiaryData:",dataObject.playerBestiaryData," --> file.pbd: ",file.pbd);
      console.log("dataObject.playerSkillsData:",dataObject.playerSkillsData," --> file.psd: ",file.psd);
      console.log("dataObject.playerSaveSlotData:",dataObject.playerSaveSlotData," --> file.pssd: ",file.pssd);
      console.log("dataObject.flagValues:",dataObject.flagValues," --> file.flags: ",file.flags);
      console.log("dataObject.settings:",dataObject.settings," --> file.settings: ",file.settings);
      console.log("=======================================================");
      //uses local Storage to store the data. playerSaveSlotData.saveSlot determines which slot the save data is stored in.
      if (dataObject.playerSaveSlotData.saveSlot === 1) {
      localStorage.setItem('saveFile1', JSON.stringify(file));
      } else if (dataObject.playerSaveSlotData.saveSlot === 2) {
      localStorage.setItem('saveFile2', JSON.stringify(file));
      } else if (dataObject.playerSaveSlotData.saveSlot === 3) {
      localStorage.setItem('saveFile3', JSON.stringify(file));
      } else {
      console.log(" something went wrong with the save location. location: " + playerSaveSlotData.saveSlot);
      }
      
  }

  //loads savedata from the sabeslot in title screen.
  loadGameFile(slot) {
      console.log("attempting to load slot:" + slot);
      // attempts to parse savedata from one of the three save slots based on the slot passed in by function call.
      let file;
      if (slot === 1) {
      file = JSON.parse(localStorage.getItem('saveFile1'));
      } else if (slot === 2) {
      file = JSON.parse(localStorage.getItem('saveFile2'));
      } else if (slot === 3) {
      file = JSON.parse(localStorage.getItem('saveFile3'));
      } else {
      console.log(" something went wrong with loading a save file. location: " + slot);
      file = undefined;
      }


      //retrieves data from the file object and gives it to the current scene
      if (file !== undefined && file !== null) {
        //sets values from save data to the values in the scene.
        this.warpToX = file.saveX;
        this.warpToY = file.saveY;
        this.playerHealth = file.playerHpValue;
        this.playerSex = file.sex;
        this.playerLocation = file.locationName;
        this.inventoryDataArray = file.id;
        this.playerBestiaryData = file.pbd;
        this.playerSkillsData = file.psd;
        // does the math and sets the bestiary completion percentage to the playerSaveSlotData[2]
        let tempPlayerSaveSlotData = file.pssd;
        if (this.playerBestiaryData !== undefined) {

            let bestiaryPercent = 0;
            // loops though the objects to find how many of the entrys the player has
            for (let [key, value] of Object.entries(this.playerBestiaryData)) {
            if (value !== 0) {
                bestiaryPercent++;
            }
            }
            // calcs percentage and sets it to the value apart of the save data
            bestiaryPercent = (bestiaryPercent / Object.keys(this.playerBestiaryData).length) * 100;
            tempPlayerSaveSlotData.bestiaryCompletionPercent = bestiaryPercent;
        }
        this.playerSaveSlotData = tempPlayerSaveSlotData;
        this.flagValues = file.flags;
        this.settings = file.settings;
        // loading the player location may be redundant. it has already been recieved to load the scene so why set it here?
        
        console.log("[loadGameFile]============================================");
        console.log("this.warpToX:",this.warpToX," <-- file.saveX: ",file.saveX);
        console.log("this.warpToY:",this.warpToY," <-- file.saveY: ",file.saveY);
        console.log("this.playerHealth:",this.playerHealth," <-- file.playerHpValue: ",file.playerHpValue);
        console.log("this.playerSex:",this.playerSex," <-- file.sex: ",file.sex);
        console.log("this.playerLocation:",this.playerLocation," <-- file.locationName: ",file.locationName);
        console.log("this.inventoryDataArray:",this.inventoryDataArray," <-- file.id: ",file.id);
        console.log("this.playerBestiaryData:",this.playerBestiaryData," <-- file.pbd: ",file.pbd);
        console.log("this.playerSkillsData:",this.playerSkillsData," <-- file.psd: ",file.psd);
        console.log("this.playerSaveSlotData:",this.playerSaveSlotData," <-- file.pssd: ",file.pssd);
        console.log("this.flagValues:",this.flagValues," <-- file.flags: ",file.flags);
        console.log("this.settings:",this.settings," <-- file.settings: ",file.settings);
        console.log("=======================================================");

        }
    }

  //function to return the hard saved player data, useful for updating settings.
  returnFile(slot,dataObject) {
    console.log("attempting to load slot:" + slot);
    // attempts to parse savedata from one of the three save slots based on the slot passed in by function call.
    let file;
    if (slot === 1) {
    file = JSON.parse(localStorage.getItem('saveFile1'));
    } else if (slot === 2) {
    file = JSON.parse(localStorage.getItem('saveFile2'));
    } else if (slot === 3) {
    file = JSON.parse(localStorage.getItem('saveFile3'));
    } else {
    console.log(" something went wrong with loading a save file. location: " + slot);
    file = undefined;
    }


    //retrieves data from the file object and gives it to the current scene
    if (file !== undefined && file !== null) {
    
    //sets values from save data to the values in the object
    dataObject.saveX = file.saveX;
    dataObject.saveY = file.saveY;
    dataObject.playerHpValue = file.playerHpValue;
    dataObject.playerSex = file.sex;
    dataObject.playerLocation = file.locationName;
    dataObject.inventoryArray = file.id;
    dataObject.playerBestiaryData = file.pbd;
    dataObject.playerSkillsData = file.psd;
    // does the math and sets the bestiary completion percentage to the playerSaveSlotData[2]
    let tempPlayerSaveSlotData = file.pssd;
    if (this.playerBestiaryData !== undefined) {

        let bestiaryPercent = 0;
        // loops though the objects to find how many of the entrys the player has
        for (let [key, value] of Object.entries(this.playerBestiaryData)) {
        if (value !== 0) {
            bestiaryPercent++;
        }
        }
        // calcs percentage and sets it to the value apart of the save data
        bestiaryPercent = (bestiaryPercent / Object.keys(this.playerBestiaryData).length) * 100;
        tempPlayerSaveSlotData.bestiaryCompletionPercent = bestiaryPercent;
    }
    dataObject.playerSaveSlotData = tempPlayerSaveSlotData;
    dataObject.flagValues = file.flags;
    dataObject.settings = file.settings;

      console.log("[returnFile]==============================================");
      console.log("dataObject.saveX:",dataObject.saveX," <-- file.saveX: ",file.saveX);
      console.log("dataObject.saveY:",dataObject.saveY," <-- file.saveY: ",file.saveY);
      console.log("dataObject.playerHpValue:",dataObject.playerHpValue," <-- file.playerHpValue: ",file.playerHpValue);
      console.log("dataObject.playerSex:",dataObject.playerSex," <-- file.sex: ",file.sex);
      console.log("dataObject.playerLocation:",dataObject.playerLocation," <-- file.locationName: ",file.locationName);
      console.log("dataObject.inventoryArray:",dataObject.inventoryArray," <-- file.id: ",file.id);
      console.log("dataObject.playerBestiaryData:",dataObject.playerBestiaryData," <-- file.pbd: ",file.pbd);
      console.log("dataObject.playerSkillsData:",dataObject.playerSkillsData," <-- file.psd: ",file.psd);
      console.log("dataObject.playerSaveSlotData:",dataObject.playerSaveSlotData," <-- file.pssd: ",file.pssd);
      console.log("dataObject.flagValues:",dataObject.flagValues," <-- file.flags: ",file.flags);
      console.log("dataObject.settings:",dataObject.settings," <-- file.settings: ",file.settings);
      console.log("=======================================================");
    // loading the player location may be redundant. it has already been recieved to load the scene so why set it here?
   
    }
}

  //temp save game. used to keep track of data between scenes.
  saveGame(dataObject) {
      //creates a compound object that contains x and y possitions which tell the scene where to playce the player when warping to a new scene

      // bundles save data up in a variable to be json.stringifyed
      const file = {
      saveX: dataObject.saveX,
      saveY: dataObject.saveY,
      playerHpValue: dataObject.playerHpValue,
      sex: dataObject.playerSex,
      locationName: dataObject.playerLocation,
      id: dataObject.inventoryArray,
      pbd: dataObject.playerBestiaryData,
      psd: dataObject.playerSkillsData,
      pssd: dataObject.playerSaveSlotData,
      flags: dataObject.flagValues,
      settings: dataObject.settings
      }

      console.log("[saveGame]============================================");
      console.log("dataObject.saveX:",dataObject.saveX," --> file.saveX: ",file.saveX);
      console.log("dataObject.saveY:",dataObject.saveY," --> file.saveY: ",file.saveY);
      console.log("dataObject.playerHpValue:",dataObject.playerHpValue," --> file.playerHpValue: ",file.playerHpValue);
      console.log("dataObject.playerSex:",dataObject.playerSex," --> file.sex: ",file.sex);
      console.log("dataObject.playerLocation:",dataObject.playerLocation," --> file.locationName: ",file.locationName);
      console.log("dataObject.inventoryArray:",dataObject.inventoryArray," --> file.id: ",file.id);
      console.log("dataObject.playerBestiaryData:",dataObject.playerBestiaryData," --> file.pbd: ",file.pbd);
      console.log("dataObject.playerSkillsData:",dataObject.playerSkillsData," --> file.psd: ",file.psd);
      console.log("dataObject.playerSaveSlotData:",dataObject.playerSaveSlotData," --> file.pssd: ",file.pssd);
      console.log("dataObject.flagValues:",dataObject.flagValues," --> file.flags: ",file.flags);
      console.log("dataObject.settings:",dataObject.settings," --> file.settings: ",file.settings);
      console.log("=======================================================");

      localStorage.setItem('saveBetweenScenes', JSON.stringify(file));
  }

  // grabs data from temp save when the player transitions scenes.
  loadGamePlayData() {
    //sets variable to the stored data
    var file = JSON.parse(localStorage.getItem('saveBetweenScenes'));
    //retrieves data from the file object and gives it to the current scene
      this.warpToX = file.saveX;
      this.warpToY = file.saveY;
      this.playerSex = file.sex;

    console.log("[loadGamePlayData]============================================");
    console.log("this.warpToX:",this.warpToX," <-- file.saveX: ",file.saveX);
    console.log("this.warpToY:",this.warpToY," <-- file.saveY: ",file.saveY);
    console.log("this.playerSex:",this.playerSex," <-- file.playerSex: ",file.sex);
    console.log("=======================================================");
  }

  //loads value from data to display the hud
  loadGameHudData(){
    //on start up we need files from the scene transition. so we grab those.
    var file = JSON.parse(localStorage.getItem('saveBetweenScenes'));

    this.healthDisplay.playerHealth = file.playerHpValue;
    this.playerSex = file.sex;
    this.inventoryDataArray = file.id;
    this.playerBestiaryData = file.pbd;
    this.playerSkillsData = file.psd;
    this.playerSaveSlotData = file.pssd;
    this.flagValues = file.flags;
    this.settings = file.settings;

    console.log("[loadGameHudData]============================================");
        console.log("this.healthDisplay.playerHealth:",this.healthDisplay.playerHealth," <-- file.playerHpValue: ",file.playerHpValue);
        console.log("this.playerSex:",this.playerSex," <-- file.sex: ",file.sex);
        console.log("this.inventoryDataArray:",this.inventoryDataArray," <-- file.id: ",file.id);
        console.log("this.playerBestiaryData:",this.playerBestiaryData," <-- file.pbd: ",file.pbd);
        console.log("this.playerSkillsData:",this.playerSkillsData," <-- file.psd: ",file.psd);
        console.log("this.playerSaveSlotData:",this.playerSaveSlotData," <-- file.pssd: ",file.pssd);
        console.log("this.flagValues:",this.flagValues," <-- file.flags: ",file.flags);
        console.log("this.settings:",this.settings," <-- file.settings: ",file.settings);
        console.log("=======================================================");

}

returnSave(dataObject){
    //sets variable to the stored data
    var file = JSON.parse(localStorage.getItem('saveBetweenScenes'));
    //retrieves data from the file object and gives it to the current scene

    dataObject.saveX = file.saveX;
    dataObject.saveY = file.saveY;
    dataObject.playerHpValue = file.playerHpValue;
    dataObject.playerSex = file.sex;
    dataObject.playerLocation = file.locationName;
    dataObject.inventoryArray = file.id;
    dataObject.playerBestiaryData = file.pbd;
    dataObject.playerSkillsData = file.psd;
    dataObject.playerSaveSlotData = file.pssd;
    dataObject.flagValues = file.flags;
    dataObject.settings = file.settings;

    console.log("[returnSave]==============================================");
    console.log("dataObject.saveX:",dataObject.saveX," <-- file.saveX: ",file.saveX);
    console.log("dataObject.saveY:",dataObject.saveY," <-- file.saveY: ",file.saveY);
    console.log("dataObject.playerHpValue:",dataObject.playerHpValue," <-- file.playerHpValue: ",file.playerHpValue);
    console.log("dataObject.playerSex:",dataObject.playerSex," <-- file.sex: ",file.sex);
    console.log("dataObject.playerLocation:",dataObject.playerLocation," <-- file.locationName: ",file.locationName);
    console.log("dataObject.inventoryArray:",dataObject.inventoryArray," <-- file.id: ",file.id);
    console.log("dataObject.playerBestiaryData:",dataObject.playerBestiaryData," <-- file.pbd: ",file.pbd);
    console.log("dataObject.playerSkillsData:",dataObject.playerSkillsData," <-- file.psd: ",file.psd);
    console.log("dataObject.playerSaveSlotData:",dataObject.playerSaveSlotData," <-- file.pssd: ",file.pssd);
    console.log("dataObject.flagValues:",dataObject.flagValues," <-- file.flags: ",file.flags);
    console.log("dataObject.settings:",dataObject.settings," <-- file.settings: ",file.settings);
    console.log("=======================================================");
}

validateSaveFile(){
    
}



}