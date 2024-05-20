/*jslint white: true, browser: true, devel: true, windows: true, forin: true, vars: true, nomen: true, plusplus: true, bitwise: true, regexp: true, sloppy: true, indent: 4, maxerr: 50 */

// this class is used to store all the functions i dont want apart of there respective class.
// if each slime object is calling itself to test if it collides i feel that can cause problems.
// this is probably a decent way of moving forward as the amount of enemys increase.
//https://stackoverflow.com/questions/63213325/phaser-3-share-custom-object-data-between-scenes
//https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/localstorage/localstorage.js
//https://rexrainbow.github.io/phaser3-rex-notes/docs/site/localstorage/
//https://newdocs.phaser.io/docs/3.54.0/focus/Phaser.Loader.LoaderPlugin-json
//https://phaser.discourse.group/t/solved-use-the-same-player-object-across-scenes/2900/5

enemyInfo = {
  width: 90,
  height: 90,
  offset: {
    top: 150,
    left: 60
  },
  padding: 0
};

class allSceneFunctions {
  constructor(scene) {

  }

  // the deep save function that is used to keep the savedata of the player. activated in savepoints class.
  saveGameFile(savePointX, savePointY, playerSex, location, dataObject) {
    // these are the game variables that are hard saved when the player uses a save point.
    console.log("calling saveslot saveGameFile============================");
    console.log("save file x:" + savePointX);
    console.log("save file y:" + savePointY);
    console.log("player HP: " + dataObject.playerMaxHp);
    console.log("playerSex: " + playerSex);
    console.log("location: " + location);
    console.log("playerInventoryData: " + dataObject.inventoryArray);
    console.log("playerBestiaryData: ", dataObject.playerBestiaryData);
    console.log("playerSkillsData: ", dataObject.playerSkillsData);
    console.log("playerSaveSlotData: ", dataObject.playerSaveSlotData);
    console.log("gameFlags: ", dataObject.flagValues);
    console.log("settings: ", dataObject.settings);
    console.log("=======================================================");
    // bundles save data up in a variable to be json.stringifyed
    const file = {
      saveX: savePointX,
      saveY: savePointY,
      playerHpValue: dataObject.playerMaxHp,
      sex: playerSex,
      locationName: location,
      id: dataObject.inventoryArray,
      pbd: dataObject.playerBestiaryData,
      psd: dataObject.playerSkillsData,
      pssd: dataObject.playerSaveSlotData,
      flags: dataObject.flagValues,
      settings: dataObject.settings

    }
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
    //console.log("saved warp x: " +scene1.warpToX+" saved warp y: "+scene1.warpToY);
  }

  //loads savedata from the sabeslot in title screen.
  loadGameFile(scene, slot) {
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
      console.log("calling loadslot for save slot " + slot + "loadGameFile============================");
      console.log("save file x:" + file.saveX);
      console.log("save file y:" + file.saveY);
      console.log("player HP: " + file.playerHpValue);
      console.log("playerSex: " + file.sex);
      console.log("location: " + file.locationName);
      console.log("playerInventoryData: " + file.id);
      console.log("playerBestiaryData: ", file.pbd);
      console.log("playerSkillsData: ", file.psd);
      console.log("playerSaveSlotData: ", file.pssd);
      console.log("gameFlags: ", file.flags);
      console.log("settings: ", file.settings);
      //sets values from save data to the values in the scene.

      if(file.settings === undefined){
        
        let settings = {
          preferance: 2,
          volume: 1.0,
          onomatopoeia: true
       };

        scene.settings = settings;

        console.log("settings not defined now setting the settings: ", scene.settings);
      }

      scene.warpToX = file.saveX;
      scene.warpToY = file.saveY;
      scene.playerHealth = file.playerHpValue;
      scene.playerSex = file.sex;
      scene.playerLocation = file.locationName;
      scene.inventoryDataArray = file.id;
      scene.playerBestiaryData = file.pbd;
      scene.playerSkillsData = file.psd;
      // does the math and sets the bestiary completion percentage to the playerSaveSlotData[2]
      let tempPlayerSaveSlotData = file.pssd;
      if (scene.playerBestiaryData !== undefined) {

        let bestiaryPercent = 0;
        // loops though the objects to find how many of the entrys the player has
        for (let [key, value] of Object.entries(scene.playerBestiaryData)) {
          if (value !== 0) {
            bestiaryPercent++;
          }
        }
        // calcs percentage and sets it to the value apart of the save data
        bestiaryPercent = (bestiaryPercent / Object.keys(scene.playerBestiaryData).length) * 100;
        tempPlayerSaveSlotData.bestiaryCompletionPercent = bestiaryPercent;
      }
      scene.playerSaveSlotData = tempPlayerSaveSlotData;
      scene.playerSex = file.sex;
      scene.flagValues = file.flags;
      // loading the player location may be redundant. it has already been recieved to load the scene so why set it here?
      //scene1.playerLocation = file.locationName;
    }
  }
  //temp save game. used to keep track of data between scenes.
  saveGame(nextSceneX, nextSceneY, playerHp, playerSex, playerInventoryData, playerBestiaryData, playerSkillsData, playerSaveSlotData, gameFlags,settings) {
    //creates a compound object that contains x and y possitions which tell the scene where to playce the player when warping to a new scene

    console.log("calling temerary saveGame============================");
    console.log("save file x:" + nextSceneX);
    console.log("save file y:" + nextSceneY);
    console.log("player HP: " + playerHp);
    console.log("playerSex: " + playerSex);
    console.log("playerInventoryData: " + playerInventoryData);
    console.log("playerBestiaryData: ", playerBestiaryData);
    console.log("playerSkillsData: ", playerSkillsData);
    console.log("playerSaveSlotData: ", playerSaveSlotData);
    console.log("gameFlags: ", gameFlags);
    console.log("settings: ", settings);

    console.log("location: " + location);

    const file = {
      warpToThisX: nextSceneX,
      warpToThisY: nextSceneY,
      playerHpValue: playerHp,
      sex: playerSex,
      inventoryData: playerInventoryData,
      pbd: playerBestiaryData,
      psd: playerSkillsData,
      pssd: playerSaveSlotData,
      flags: gameFlags,
      settings: settings
    }
    localStorage.setItem('saveBetweenScenes', JSON.stringify(file));
  }

  // grabs data from temp save when the player transitions scenes.
  loadGame(scene) {
    //sets variable to the stored data
    var file = JSON.parse(localStorage.getItem('saveBetweenScenes'));
    //retrieves data from the file object and gives it to the current scene
    console.log("calling temerary loadGame============================");
    console.log("save file x:" + file.warpToThisX);
    console.log("save file y:" + file.warpToThisY);
    console.log("playerSex: ", file.sex);
  
    scene.warpToX = file.warpToThisX;
    scene.warpToY = file.warpToThisY;
    scene.playerSex = file.sex;
  }

}