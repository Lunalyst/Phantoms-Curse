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

  //this function saves data when the player is defeated so that the gameover scene can tell what enemy defeated the player.
  saveGameoverFile(playerSex, enemyThatDefeatedPlayer, playerSaveSlotData) {
    //creates a compound object that contains x and y possitions which tell the scene where to playce the player when warping to a new scene
    console.log("calling saveGameoverFile============================");
    console.log("playerSex: " + playerSex);
    console.log("enemyThatDefeatedPlayer: " + enemyThatDefeatedPlayer);
    console.log("playerSaveSlotData: ", playerSaveSlotData);
    const file = {
      sex: playerSex,
      enemy: enemyThatDefeatedPlayer,
      pssd: playerSaveSlotData
    };
    //uses local Storage to store the data
    localStorage.setItem('saveGameoverFile', JSON.stringify(file));
  }
  //function to load data once we are in the gameover scene.
  loadGameoverFile(scene1) {
    //sets variable to the stored data
    // we will use const because we dont want anything to change variable. difference between let and var is that var can exist outside the scope when its declared. using let makes sure that the variable stays within scope.obeying scoping rules.
    const file = JSON.parse(localStorage.getItem('saveGameoverFile'));
    //retrieves data from the file object and gives it to the current scene
    console.log("calling loadGameoverFile============================");
    console.log("playerSex: " + file.sex);
    console.log("enemy: " + file.enemy);
    console.log("playerSaveSlotData: ", file.pssd);

    scene1.playerSex = file.sex;
    scene1.enemyThatDefeatedPlayer = file.enemy;
    scene1.playerSaveSlotData = file.pssd;
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
    console.log("playerInventoryAmountData: " + dataObject.playerInventoryAmountData);
    console.log("playerBestiaryData: ", dataObject.playerBestiaryData);
    console.log("playerSkillsData: ", dataObject.playerSkillsData);
    console.log("playerSaveSlotData: ", dataObject.playerSaveSlotData);
    console.log("gameFlags: ", dataObject.flagValues);
    console.log("=======================================================");
    // bundles save data up in a variable to be json.stringifyed
    const file = {
      saveX: savePointX,
      saveY: savePointY,
      playerHpValue: dataObject.playerMaxHp,
      sex: playerSex,
      locationName: location,
      id: dataObject.inventoryArray,
      piad: dataObject.playerInventoryAmountData,
      pbd: dataObject.playerBestiaryData,
      psd: dataObject.playerSkillsData,
      pssd: dataObject.playerSaveSlotData,
      flags: dataObject.flagValues,

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
      console.log("playerInventoryAmountData: " + file.piad);
      console.log("playerBestiaryData: ", file.pbd);
      console.log("playerSkillsData: ", file.psd);
      console.log("playerSaveSlotData: ", file.pssd);
      console.log("gameFlags: ", file.flags);
      //sets values from save data to the values in the scene.
      scene.warpToX = file.saveX;
      scene.warpToY = file.saveY;
      scene.playerHealth = file.playerHpValue;
      scene.playerSex = file.sex;
      scene.playerLocation = file.locationName;
      scene.inventoryDataArray = file.id;
      scene.playerInventoryAmountData = file.piad;
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
  saveGame(nextSceneX, nextSceneY, playerHp, playerSex, playerInventoryData, playerInventoryAmountData, playerBestiaryData, playerSkillsData, playerSaveSlotData, gameFlags) {
    //creates a compound object that contains x and y possitions which tell the scene where to playce the player when warping to a new scene

    console.log("calling temerary saveGame============================");
    console.log("save file x:" + nextSceneX);
    console.log("save file y:" + nextSceneY);
    console.log("player HP: " + playerHp);
    console.log("playerSex: " + playerSex);
    console.log("playerInventoryData: " + playerInventoryData);
    console.log("playerInventoryAmountData: " + playerInventoryAmountData);
    console.log("playerBestiaryData: ", playerBestiaryData);
    console.log("playerSkillsData: ", playerSkillsData);
    console.log("playerSaveSlotData: ", playerSaveSlotData);
    console.log("gameFlags: ", gameFlags);
    console.log("location: " + location);

    const file = {
      warpToThisX: nextSceneX,
      warpToThisY: nextSceneY,
      playerHpValue: playerHp,
      sex: playerSex,
      inventoryData: playerInventoryData,
      piad: playerInventoryAmountData,
      pbd: playerBestiaryData,
      psd: playerSkillsData,
      pssd: playerSaveSlotData,
      flags: gameFlags
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
    loadSceneTransitionLoad.emit(SceneTransitionLoad.loadValues,file.playerHpValue,file.inventoryData,file.piad,file.pbd,file.psd,file.pssd,file.flags);
    scene.playerSex = file.sex;
  }

  //generates slimes
  initSlimes(startX, startY, amount, scene, playerSex) {
    //creates a row of slime enemys and adds them to the slime enemy groups.
    for (let row = 0; row < amount; row++) {
      let enemyX = (row * (enemyInfo.width + enemyInfo.padding)) + enemyInfo.offset.left + startX;
      let slime1 = new blueSlime(scene, enemyX, startY, playerSex);
      //id is important for slime combine function. since when the slimes collide symultaniously it needs a way to tell if
      //slime is destroyed or becomes a large slime. if the id is higher on the slime then that one becomes a larger slime
      slime1.slimeId = scene.slimeId;
      scene.slimeId++;
      scene.slimes.add(slime1);
      //console.log("slime id: "+ scene.slimeId);
    }
  }

  // creates warp portal objects in the scene
  initPortals(x, y, scene, toX, toY, animation) {
    let portal1 = new warp(scene, x, y);
    //gives portal a unique id so that scene can tell which warp object is being activated
    portal1.warpPortalId = scene.portalId;
    scene.portalId++;
    //sets the location given as to where the player will be sent in the next scene
    portal1.setLocationToSendPlayer(toX, toY, animation);
    //adds portal object to the portal object in the scene
    scene.portals.add(portal1);
    //console.log(" portal1.warpPortalId: "+ portal1.warpPortalId);
    //console.log(" scene.portalId: "+ scene.portalId);
  }

  initSavePoints(x, y, scene) {
    let savePoint1 = new savePoint(scene, x, y);
    //gives portal a unique id so that scene can tell which warp object is being activated
    savePoint1.saveStoneId = scene.saveStoneId;
    scene.saveStoneId++;
    //sets the location given as to where the player will be sent in the next scene
    //adds portal object to the portal object in the scene
    scene.saveStonePoints.add(savePoint1);
    //console.log(" portal1.warpPortalId: "+ portal1.warpPortalId);
    //console.log(" scene.portalId: "+ scene.portalId);
  }
  initSigns(x, y, scene, text, profileArray) {
    let sign1 = new sign(scene, x, y, text, profileArray);
    //gives portal a unique id so that scene can tell which warp object is being activated
    sign1.signId = scene.signId;
    scene.signId++;
    //sets the location given as to where the player will be sent in the next scene
    //adds portal object to the portal object in the scene
    scene.signPoints.add(sign1);
    //console.log(" portal1.warpPortalId: "+ portal1.warpPortalId);
    //console.log(" scene.portalId: "+ scene.portalId);
  }

  //test to see if the player should be warped.
  checkWarp(scene, location) {
    //applies a function to each portal object in the scene
    scene.portals.children.each(function (tempPortal) {
      //if player overlaps with portal then it its safe to warp and it sets the active id to that portals id.
      // fuck overlap function. check if the player is within the bounds fo the sprite and control prompts according to that. problem solved.
      if ((scene.player1.x > tempPortal.x - 50 && scene.player1.x < tempPortal.x + 50) && (scene.player1.y > tempPortal.y - 50 && scene.player1.y < tempPortal.y + 50) && scene.grabbed === false) {
        //console.log("within warp point");
        tempPortal.safeToLoad = true;
        scene.activatedPortalId = tempPortal.warpPortalId;
        //console.log("scene.activatedPortalId: "+scene.activatedPortalId+" tempPortal.warpPortalId: "+tempPortal.warpPortalId+" scene.safeToLoad: "+scene.safeToLoad+" scene.safeToSave: "+scene.safeToSave);
      } else {
        //console.log("outside save point");
        tempPortal.safeToLoad = false;
      }
      tempPortal.warpTo(scene, scene.keyW, location, scene.activatedPortalId, scene.healthDisplay, scene.KeyDisplay, scene.player1);
    }, scene);
  }

  checkSave(scene) {
    //applies a function to each portal object in the scene
    scene.saveStonePoints.children.each(function (tempSavePoint) {
      //if player overlaps with portal then it its safe to warp and it sets the active id to that portals id.
      // fuck overlap function. check if the player is within the bounds fo the sprite and control prompts according to that. problem solved.
      if ((scene.player1.x > tempSavePoint.x - 50 && scene.player1.x < tempSavePoint.x + 50) && (scene.player1.y > tempSavePoint.y - 50 && scene.player1.y < tempSavePoint.y + 50) && scene.grabbed === false) {
        //console.log("within save point");
        tempSavePoint.safeToSave = true;
        scene.activatedSavePointId = tempSavePoint.saveStoneId;
      } else {
        //console.log("outside save point");
        tempSavePoint.safeToSave = false;
      }
      tempSavePoint.savePointSaveGame(scene, scene.keyW, location, scene.activatedSavePointId, scene.healthDisplay, scene.KeyDisplay, scene.player1, tempSavePoint.x, tempSavePoint.y, scene.flagValues);
      //savePointSaveGame(scene1,keyW,location,activeId,hpBar,keyDisplay,player1,saveX,saveY,flagValues)
    }, scene);
  }

  checkSign(scene) {
    //applies a function to each portal object in the scene
    scene.signPoints.children.each(function (tempSignPoint) {
      //if player overlaps with portal then it its safe to warp and it sets the active id to that portals id.
      // fuck overlap function. check if the player is within the bounds fo the sprite and control prompts according to that. problem solved.
      if ((scene.player1.x > tempSignPoint.x - 30 && scene.player1.x < tempSignPoint.x + 30) && (scene.player1.y > tempSignPoint.y - 30 && scene.player1.y < tempSignPoint.y + 30) && scene.grabbed === false) {
        //console.log("within sign");
        tempSignPoint.safeToSign = true;
        scene.activatedSignId = tempSignPoint.signId;
      } else {
        //console.log("outside save point");
        tempSignPoint.safeToSign = false;
      }
      tempSignPoint.activateSign(scene, scene.keyW, scene.activatedSignId);

    }, scene);
  }

  // simple function to change the backround animation frames.
  // should fix with some settimeout functions.
  animateBackround(scene) {
    if (scene.backroundTimer < 100) {
      scene.backround.setFrame(0);
      scene.backroundTimer++;
    } else if (scene.backroundTimer < 200) {
      scene.backround.setFrame(2);
      scene.backroundTimer++;
    } else if (scene.backroundTimer < 300) {
      scene.backround.setFrame(1);
      scene.backroundTimer++;
    } else if (scene.backroundTimer < 301) {
      scene.backroundTimer = 0;
    }
  }

  //function to activate blue slime grab animation
  checkBlueSlimeGrab(scene) {
    //console.log("activating grab function");
    //scene.healthDisplay.zoomIn();
    scene.slimes.children.each(function (tempSlime) {
      if (tempSlime.playerGrabbed === true) {
        //remeber this function is called twice. once when grab hamppens and agian when the update loop has this.grabbed set to true.
        tempSlime.slimeGrab(scene.player1,scene.keyA, scene.KeyDisplay, scene.keyD, scene, scene.keyTAB, this);
        //focuses on slime that grabbed character and zooms ui elements.
        scene.mycamera.startFollow(tempSlime);
        scene.cameras.main.zoom = 5;
        scene.grabbed = tempSlime.playerGrabbed;
      } else {
        //if slime didn't grab player but player was grabbed then play idle animation.
        tempSlime.moveSlimeIdle();
        tempSlime.setSize(90, 65, true);
        tempSlime.setOffset(105, 233);
        tempSlime.body.setGravityY(600);
        //else if the slime is size 2 then set its hit box to the correct size
      }
    }, scene);
  }
  //function keeps track of slime interactions
  checkBlueSlimeInteractions(scene) {
    //console.log("checking slime interactions");
    //applies functions to all slimes in the group.
    scene.slimes.children.each(function (tempSlime) {
      //calls to make each instance of a slime move.
      tempSlime.moveSlime(scene.player1);
      scene.physics.add.overlap(scene.attackHitBox, tempSlime, function () {
        tempSlime.hitboxOverlaps = true;
      });
      if (tempSlime.hitboxOverlaps === true) {
        console.log("slime taking damage, slime hp:" + tempSlime.slimeHp);
        tempSlime.slimeDamage(scene);
        tempSlime.hitboxOverlaps = false;
      }
      //adds collider between player and slime. then if they collide it plays the grab sequence but only if the player was not grabbed already
      scene.physics.add.overlap(scene.player1, tempSlime, function () {
        let isWindowObject = {
          isOpen: null
        };
        
        inventoryKeyEmitter.emit(inventoryKey.isWindowOpen,isWindowObject);

        if (isWindowObject.isOpen === true) {
          inventoryKeyEmitter.emit(inventoryKey.activateWindow,scene);
          //scene.playerInventory.setView(scene);
        }
        //console.log("player overlaps slime");
        //checks if the slimes grab cool down is zero and that it isnt in the mitosis animation
        //console.log("tempSlime.grabCoolDown:"+tempSlime.grabCoolDown+"scene.grabCoolDown === 0"+scene.grabCoolDown)
        if (tempSlime.grabCoolDown === false && tempSlime.mitosing === false && scene.grabCoolDown === false) {
          //stop the velocity of the player
          tempSlime.setVelocityX(0);
          scene.player1.setVelocityX(0);
          //calls the grab function
          tempSlime.slimeGrab(scene.player1, scene.keyA, scene.KeyDisplay, scene.keyD, scene, scene.keyTAB, this);
          //sets the scene grab value to true since the player has been grabbed
          // tells instance of slime that it has grabbed player
          tempSlime.playerGrabbed = true;
          tempSlime.grabCoolDown = true;
          scene.grabbed = true;
          scene.grabCoolDown = true;
          console.log('player grabbed by slime');
        }
      });
      //if the slime is size 1 then it checks for overlap between slimes. then if the collide they fuse together and play combination animation
      if (tempSlime.slimeSize === 1) {
        //creates another function applies to the slimes so that there are two instances of a function being applied
        scene.slimes.children.each(function (tempSlime1) {
          // collider used to detect a collision between two slimes
          scene.physics.add.overlap(tempSlime1, tempSlime, function () {
            // if both slimes are of size 1 then call combine function
            if (tempSlime.slimeSize === 1 && tempSlime1.slimeSize === 1) {
              tempSlime.slimeCombine(tempSlime1, scene.grabbed);
            }
          });
        }, this);
      }
      //deincriments the grabcooldown on any slime that grabbed the player.
      tempSlime.mitosisDelayCheck();
      // creates a overlap between the damage hitbox and the slime so that slime can take damage
    }, this);

  }
  // function called to pause slimes for all slimes in the group.
  checkBlueSlimePause(scene) {
    scene.slimes.children.each(function (tempSlime1) {
      tempSlime1.pauseSlimeAnimations(scene);
    }, this);
  }

}