/****************************************************************************** 
description:this class contains crutial load and save function used for many 
different gameplay scenes. its needed not only for the main gameplay scene,
but also that the titlescreen, gameover, and gamehud scenes have acess to these
functions. this class is the beginning of our inheritance class chain as all.
*******************************************************************************/
class A1SaveAndLoad extends Phaser.Scene {

  secretLoad(){
    const file = JSON.parse(localStorage.getItem('secretSave'));
    console.log("file: ",file);
  if(file !== null && file !== undefined){
    this.titleLogoType = file.titleLogoType;
    console.log("this.titleLogoType: ",this.titleLogoType," <- ",file.titleLogoType);
  }else{
    this.titleLogoType = "default";
    console.log("setting logo type to default");
  }
    
    
  }

  secretSave(dataObject){

    //create file variable to store data
    const file = {
      titleLogoType: dataObject.titleLogoType,
      
      };

      //store data in file
      localStorage.setItem('secretSave', JSON.stringify(file));
  }

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
      settings: dataObject.settings,
      dreamReturnLocation: dataObject.dreamReturnLocation
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
      console.log("dataObject.dreamReturnLocation:",dataObject.dreamReturnLocation," --> file.dreamReturnLocation: ",file.dreamReturnLocation);
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
      }else{
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
        if (this.playerBestiaryData !== undefined && this.playerBestiaryData !== null) {

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
        this.dreamReturnLocation = file.dreamReturnLocation;
        this.playerCurseValue = 0;
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
        console.log("this.dreamReturnLocation:",this.dreamReturnLocation," <-- file.dreamReturnLocation: ",file.dreamReturnLocation);
        console.log("this.dreamReturnLocation:",this.playerCurseValue);
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
    if (this.playerBestiaryData !== undefined && this.playerBestiaryData !== null) {

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
    dataObject.dreamReturnLocation = file.dreamReturnLocation;

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
      console.log("dataObject.dreamReturnLocation:",dataObject.dreamReturnLocation," <-- file.dreamReturnLocation: ",file.dreamReturnLocation);
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
      settings: dataObject.settings,
      dreamReturnLocation: dataObject.dreamReturnLocation,
      playerCurseValue: dataObject.playerCurseValue
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
      console.log("dataObject.dreamReturnLocation:",dataObject.dreamReturnLocation," --> file.dreamReturnLocation: ",file.dreamReturnLocation);
      console.log("dataObject.playerCurseValue:",dataObject.playerCurseValue," --> file.playerCurseValue: ",file.playerCurseValue);
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
      this.preferance = file.settings.preferance;
      this.onomatopoeia = file.settings.onomatopoeia;

    console.log("[loadGamePlayData]============================================");
    console.log("this.warpToX:",this.warpToX," <-- file.saveX: ",file.saveX);
    console.log("this.warpToY:",this.warpToY," <-- file.saveY: ",file.saveY);
    console.log("this.playerSex:",this.playerSex," <-- file.playerSex: ",file.sex);
    console.log("this.preferance:",this.preferance," <-- file.settings.preferance: ",file.settings.preferance);
    console.log("this.onomatopoeia:",this.onomatopoeia," <-- this.onomatopoeia: ",file.settings.onomatopoeia);
    console.log("=======================================================");
  }

  //loads value from data to display the hud
  loadGameHudData(){
    //on start up we need files from the scene transition. so we grab those.
    var file = JSON.parse(localStorage.getItem('saveBetweenScenes'));

    this.healthDisplay.playerHealth = file.playerHpValue;
    this.healthDisplay.playerCurse = 0;

    this.playerSex = file.sex;
    this.playerLocation = file.locationName;
    this.inventoryDataArray = file.id;
    this.playerBestiaryData = file.pbd;
    this.playerSkillsData = file.psd;
    this.playerSaveSlotData = file.pssd;
    this.flagValues = file.flags;
    this.settings = file.settings;
    this.dreamReturnLocation = file.dreamReturnLocation;
   

    console.log("[loadGameHudData]============================================");
        console.log("this.healthDisplay.playerHealth:",this.healthDisplay.playerHealth," <-- file.playerHpValue: ",file.playerHpValue);
        console.log("this.playerSex:",this.playerSex," <-- file.sex: ",file.sex);
        console.log("this.playerLocation:",this.playerLocation," <-- file.locationName: ",file.locationName);
        console.log("this.inventoryDataArray:",this.inventoryDataArray," <-- file.id: ",file.id);
        console.log("this.playerBestiaryData:",this.playerBestiaryData," <-- file.pbd: ",file.pbd);
        console.log("this.playerSkillsData:",this.playerSkillsData," <-- file.psd: ",file.psd);
        console.log("this.playerSaveSlotData:",this.playerSaveSlotData," <-- file.pssd: ",file.pssd);
        console.log("this.flagValues:",this.flagValues," <-- file.flags: ",file.flags);
        console.log("this.settings:",this.settings," <-- file.settings: ",file.settings);
        console.log("dataObject.dreamReturnLocation:",this.dreamReturnLocation," <-- file.dreamReturnLocation: ",file.dreamReturnLocation);
        console.log("dataObject.playerCurseValue:",this.healthDisplay.playerCurse," <-- file.playerCurseValue: ",file.playerCurseValue);
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
    dataObject.dreamReturnLocation = file.dreamReturnLocations;

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
    console.log("dataObject.dreamReturnLocation:",dataObject.dreamReturnLocation," <-- file.dreamReturnLocation: ",file.dreamReturnLocation);
    console.log("=======================================================");
  }

  //convenient function to reset the player save data to the beginning of the game. declutters some classes.
  makeSaveFile(playerObject,sex,saveslot){

  let playerBestiaryData = {
    blueSlime:0,
    largeBlueSlime:0,
    femaleTiger:0,
    maleRabbit:0,
    femaleRabbit:0,
    maleBeeDrone:0,
    femaleBeeDrone:0,
    maleBat:0,
    femaleBat:0,
    blueSlimeHS: 0,
    blueSlimeMaleHM: 0,
    blueSlimeFemaleHM: 0,
    femaleChestMimic: 0,
    femaleChestMimicVore: 0,
    maleChestMimic: 0,
    maleChestMimicVore: 0,
    whiteCatMaleTF: 0,
    whiteCatMaleVore: 0,
    whiteCatFemaleTF: 0,
    whiteCatFemaleVore: 0

 };

 let playerSkillsData = {
    jump:1,
    dash:0,
    strength:0,
    mimic:0,
    looting:0
 };

 let saveSlotData = {
    saveSlot:saveslot,
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
    onomatopoeia: true,
    mobileControls:false
 };

 let dreamReturnLocation = {
  location: '',
  x: null,
  y:null
};
 
//creates a array to be filled my objects
this.inventoryArray  = [];

//fills the array with objects
for(let counter = 0; counter < 100; counter++){

    //for some reason, by defininging the object here, it creates new instances of the object, so that all the items in the array,
    //are not refrencing the same object like it would be if this variable was defined outside this for loop.
  

    if(counter === 3){
      let item = {
        itemID: 20,
        itemName: 'PLAIN CLOTHS',
        itemDescription: 'SIMPLE COMFY OUTFIT.',
        itemStackable: 0,
        itemAmount: 1,
        itemType: "vanity",
        sellValue: 10
      };

      this.inventoryArray.push(item);
    }else{

      let item = {
        itemID: 0,
        itemName: ' ',
        itemDescription: ' ',
        itemStackable: 1,
        itemAmount: 0 ,
        itemType: "",
        sellValue: 0  
      };

      this.inventoryArray.push(item);
    }
}

  playerObject.saveX = 441;
  playerObject.saveY = 926;
  playerObject.playerHpValue = 1;
  playerObject.playerSex = sex;
  playerObject.playerLocation = 'tutorialBeachLevel';
  playerObject.inventoryArray = this.inventoryArray;
  playerObject.playerBestiaryData = playerBestiaryData;
  playerObject.playerSkillsData = playerSkillsData;
  playerObject.playerSaveSlotData = saveSlotData;
  playerObject.flagValues = gameFlags;
  playerObject.settings = settings;
  playerObject.dreamReturnLocation = dreamReturnLocation;
  playerObject.playerCurseValue = 0;
  }

  //function to fix dave file if the file is broken or outdated.
  validateSaveFile(dataObject){

    console.log("[validateSaveFile]==============================================");

    if(dataObject.saveX === undefined || dataObject.saveX === null){
      dataObject.saveX = 441;
      dataObject.saveY = 926;
      dataObject.playerLocation = 'tutorialBeachLevel';
    }

    if(dataObject.saveY === undefined || dataObject.saveY === null){
      dataObject.saveX = 441;
      dataObject.saveY = 926;
      dataObject.playerLocation = 'tutorialBeachLevel';
    }

    if(dataObject.playerLocation === "sunFlowerField" && dataObject.saveX > 4000){
      dataObject.saveX = 759;
      dataObject.saveY = 1021;
      dataObject.playerLocation = 'sunFlowerField';
    }

    if(dataObject.playerHpValue === undefined || dataObject.playerHpValue === null){
      dataObject.playerHpValue = 1;
    }

    if(dataObject.playerSex === undefined || dataObject.playerSex === null){
      dataObject.playerSex = 1;
    }

    if(dataObject.playerLocation === undefined || dataObject.playerLocation === null){
      dataObject.saveX = 441;
      dataObject.saveY = 926;
      dataObject.playerLocation = 'tutorialBeachLevel';
    }

    if(dataObject.inventoryArray === undefined || dataObject.inventoryArray === null){
      //creates a array to be filled my objects
      let inventoryArray  = [];

      //fills the array with objects
      for(let counter = 0; counter < 26; counter++){

          //for some reason, by defininging the object here, it creates new instances of the object, so that all the items in the array,
          //are not refrencing the same object like it would be if this variable was defined outside this for loop.
          let item = {
              itemID: 0,
              itemName: ' ',
              itemDescription: ' ',
              itemStackable: 1,
              itemAmount: 0,
              sellValue: 35 
          };

          inventoryArray.push(item);
      }
      dataObject.inventoryArray = inventoryArray;
    // otherwise if the inventory data does exist
    }else{

      // loop through inventory and apply correct item values
      //also can be used to update attributes of some item values
      for(let counter = 0; counter < dataObject.inventoryArray.length; counter++){

        if(dataObject.inventoryArray[counter].itemID === 0 ){

          dataObject.inventoryArray[counter] = {
            itemID: 0,
            itemName: ' ',
            itemDescription: ' ',
            itemStackable: 1,
            itemAmount: 0,
            itemType: "",
            sellValue: 0
            
          };

        }else if(dataObject.inventoryArray[counter].itemID === 2 ){

          //dupes[0] = 1;

          dataObject.inventoryArray[counter] = {
            itemID: 2,
            itemName: 'OAR',
            itemDescription: 'A WOOD PADDLE WHICH CAN BE USED AS A CLUB.',
            itemStackable: 0,
            itemAmount: 1,
            itemType: "weapon",
            sellValue: 5
            
        };

        }else if(dataObject.inventoryArray[counter].itemID === 4 ){

          //dupes[1] = 1;

          dataObject.inventoryArray[counter] = {
            itemID: 4,
            itemName: 'KNIFE',
            itemDescription: 'GOOD FOR SLASHING MONSTERS.',
            itemStackable: 0,
            itemAmount: 1,
            itemType: "weapon",
            sellValue: 15
            
          };

        }else if(dataObject.inventoryArray[counter].itemID === 8 ){

          //dupes[2] = 1;

          dataObject.inventoryArray[counter] = {
            itemID: 8,
            itemName: 'SPEED RING',
            itemDescription: 'INCREASES YOUR MOVEMENT SPEED SLIGHTLY.',
            itemStackable: 0,
            itemAmount: 1,
            itemType: "ring",
            sellValue: 30
          };

        }else if(dataObject.inventoryArray[counter].itemID === 10 ){

          //dupes[3] = 1;

          dataObject.inventoryArray[counter] = {
            itemID: 10,
            itemName: 'AXE',
            itemDescription: 'CAN BE USED TO CUT MONSTERS AND WOOD.',
            itemStackable: 0,
            itemAmount: 1,
            itemType: "weapon",
            sellValue: 20

        };

        }else if(dataObject.inventoryArray[counter].itemID === 1 ){

          //dupes[4] = 1;

          dataObject.inventoryArray[counter] = {
            itemID: 1,
            itemName: 'RAPIER',
            itemDescription: 'GOOD AT POKING HOLES IN THINGS.',
            itemStackable: 0,
            itemAmount: 1,
            itemType: "weapon",
            sellValue: 35
            
          };

        }else if(dataObject.inventoryArray[counter].itemID === 3 ){

          //dupes[5] = 1;

          dataObject.inventoryArray[counter] = {
            itemID: 3,
            itemName: 'MIMIC RAPIER',
            itemDescription: 'INFUSED WITH THE CURSED ENERGY OF AVARICE...',
            itemStackable: 0,
            itemAmount: 1,
            itemType: "weapon",
            sellValue: 75
        };


        }else if(dataObject.inventoryArray[counter].itemID === 6 ){

          //dupes[6] = 1;

          dataObject.inventoryArray[counter] = {
            itemID: 6,
            itemName: 'MIMIC RING',
            itemDescription: 'COVETED BY THOSE CURSED BY AVARICE...',
            itemStackable: 0,
            itemAmount: 1,
            itemType: "ring",
            sellValue: 50
            
        };
        }else if(dataObject.inventoryArray[counter].itemID === 16){

          //dupes[6] = 1;

          dataObject.inventoryArray[counter] = {
            itemID: 16,
            itemName: 'FUEL ICHOR',
            itemDescription: 'FUEL FOR A LANTERN.',
            itemStackable: 1,
            itemAmount: dataObject.inventoryArray[counter].itemAmount,
            itemType: "ammo",
            sellValue: 5
            
        };
      }

      }

      //if inventory does not have 100 slots, then add those slots.
      for(let counter = dataObject.inventoryArray.length; counter < 100 ; counter++){

        //for some reason, by defininging the object here, it creates new instances of the object, so that all the items in the array,
        //are not refrencing the same object like it would be if this variable was defined outside this for loop.
        let item = {
            itemID: 0,
            itemName: ' ',
            itemDescription: ' ',
            itemStackable: 1,
            itemAmount: 0 ,
            itemType: "",
            sellValue: 0
        };

        dataObject.inventoryArray.push(item);
      }
    }

    //adds empty inventory slots to the storage.
    let inventoryPages = 2+(24*4)+1;
    while(dataObject.inventoryArray.length < inventoryPages ){
      console.log("dataObject.inventoryArray.length",dataObject.inventoryArray.length);
      let item = {
        itemID: 0,
        itemName: ' ',
        itemDescription: ' ',
        itemStackable: 1,
        itemAmount: 0,
        sellValue: 0 
    };
      dataObject.inventoryArray.push(item);
    }


    if(dataObject.playerBestiaryData === undefined || dataObject.playerBestiaryData === null){
      let playerBestiaryData = {
        blueSlime:0,
        largeBlueSlime:0,
        femaleTiger:0,
        maleRabbit:0,
        femaleRabbit:0,
        maleBeeDrone:0,
        femaleBeeDrone:0,
        maleBat:0,
        femaleBat:0,
        blueSlimeHS: 0,
        blueSlimeMaleHM: 0,
        blueSlimeFemaleHM: 0,
        femaleChestMimic: 0,
        femaleChestMimicVore: 0,
        maleChestMimic: 0,
        maleChestMimicVore: 0,
        whiteCatMaleTF: 0,
        whiteCatMaleVore: 0,
        whiteCatFemaleTF: 0,
        whiteCatFemaleVore: 0
    
     };

      dataObject.playerBestiaryData = playerBestiaryData;
    }

    if(dataObject.playerSkillsData === undefined || dataObject.playerSkillsData === null){
      let playerSkillsData = {
        jump:1,
        dash:0,
        strength:0,
        mimic:0,
        looting:0
    };
      
      dataObject.playerSkillsData = playerSkillsData;
    }

    if(dataObject.playerSaveSlotData === undefined || dataObject.playerSaveSlotData === null){
      let saveSlotData = {
        saveSlot:that.scene.tempNewGameSlotID,
        currency: 0,
        bestiaryCompletionPercent: 0,
        playerHealthUpgrades: 0,
        PlayerStorage: [],
    };
      
      dataObject.playerSaveSlotData = saveSlotData;
    }

    if(dataObject.flagValues === undefined || dataObject.flagValues === null){
      let gameFlags = {
        containerFlags: []

    };
      
      dataObject.flagValues = gameFlags;
    }

    if(dataObject.settings === undefined || dataObject.settings === null){
      let settings = {
        preferance: 2,
        volume: 1,
        onomatopoeia: true,
        mobileControls
    };
    
      dataObject.settings = settings;

    }

    if(dataObject.settings.mobileControls == undefined || dataObject.settings.mobileControls == undefined ){
      dataObject.settings.mobileControls = false;

    }

    if(dataObject.dreamReturnLocation === undefined || dataObject.dreamReturnLocation === null){
      let dreamReturnLocation = {
        location: '',
        x: null,
        y:null
      };
    
      dataObject.dreamReturnLocation = dreamReturnLocation;

      }
  }

}