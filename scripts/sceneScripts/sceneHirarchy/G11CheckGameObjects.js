/****************************************************************************** 
description: function to handle gameobject logic during the update loop
*******************************************************************************/
class G11CheckGameObjects extends G10CheckNPCS {

  //test to see if the player should be warped
  checkWarp(location) {
    //console.log("checking warp");
    //applies a function to each portal object in the scene
    this.portals.children.each(function (tempPortal){
    //if player overlaps with portal then it its safe to warp and it sets the active id to that portals id.
    //fuck overlap function. check if the player is within the bounds fo the sprite and control prompts according to that. problem solved.
    if ((this.player1.x > tempPortal.x - 30 && this.player1.x < tempPortal.x + 30) && (this.player1.y > tempPortal.y - 50 && this.player1.y < tempPortal.y + 50) && this.grabbed === false) {
        console.log("within warp point");
        tempPortal.safeToLoad = true;
        this.activatedPortalId = tempPortal.warpPortalId;
        //console.log("scene.activatedPortalId: "+scene.activatedPortalId+" tempPortal.warpPortalId: "+tempPortal.warpPortalId+" scene.safeToLoad: "+scene.safeToLoad+" scene.safeToSave: "+scene.safeToSave);
    } else {
        //console.log("outside save point");
        tempPortal.safeToLoad = false;
    }

    tempPortal.warpTo(this, this.keyW, this.activatedPortalId);
    }, this);
  }

  //test to se if the player is safe to save there game
  checkSave() {
      //applies a function to each portal object in the scene
      this.saveStonePoints.children.each(function (tempSavePoint) {
      //if player overlaps with portal then it its safe to warp and it sets the active id to that portals id.
      // fuck overlap function. check if the player is within the bounds fo the sprite and control prompts according to that. problem solved.
      if ((this.player1.x > tempSavePoint.x - 50 && this.player1.x < tempSavePoint.x + 50) && (this.player1.y > tempSavePoint.y - 50 && this.player1.y < tempSavePoint.y + 50) && this.grabbed === false) {
          //console.log("within save point");
          tempSavePoint.safeToSave = true;
          this.activatedSavePointId = tempSavePoint.saveStoneId;
      } else {
          //console.log("outside save point");
          tempSavePoint.safeToSave = false;
      }
      tempSavePoint.savePointSaveGame(this, this.keyW, this.activatedSavePointId, tempSavePoint.x, tempSavePoint.y);
      
      }, this);
  }

  //checks to see if the player can activate a sign object
  checkSign(scene) {
    //console.log("checking sign code: scene.signPoints: ",scene.signPoints);
      //applies a function to each portal object in the scene
      this.signPoints.children.each(function (tempSignPoint) {
        //if player overlaps with portal then it its safe to warp and it sets the active id to that portals id.
        // fuck overlap function. check if the player is within the bounds fo the sprite and control prompts according to that. problem solved.
        //console.log("testing to see if player is within range");
        if ((scene.player1.x > tempSignPoint.x - 30 && scene.player1.x < tempSignPoint.x + 30) && (scene.player1.y > tempSignPoint.y - 30 && scene.player1.y < tempSignPoint.y + 30) && scene.grabbed === false) {
          //console.log("within sign");
          tempSignPoint.safeToSign = true;
          scene.activatedSignId = tempSignPoint.signId;
        } else {
          //console.log("outside sign");
          tempSignPoint.safeToSign = false;
        }
        tempSignPoint.activateSign(scene, scene.keyW, scene.activatedSignId);

      }, scene);
  }

  //checks to see if the items should be picked up
  checkItemPickUp() {
      
    this.itemDrops.children.each(function (tempItemDrop) {

      //apply bounce effect if hits the ground. is above loop whee object can be destroyed so it doesnt cause an error 
      if(tempItemDrop.body.blocked.down && tempItemDrop.soundPlayed === false){
        this.initSoundEffect('jumpySFX1',"3",0.04);
        tempItemDrop.soundPlayed = true;
      }else if(!tempItemDrop.body.blocked.down){
        tempItemDrop.soundPlayed = false;
      }

    //if player overlaps with item then they pick it up
    if ((this.player1.x > tempItemDrop.x - 20 && this.player1.x < tempItemDrop.x + 20) && (this.player1.y > tempItemDrop.y - 50 && this.player1.y < tempItemDrop.y + 50) && this.grabbed === false) {
        console.log("picked up item");
        //create a temp item to pass to emitter
        let item = tempItemDrop.itemDropObject;

        let addedToInventory = {
          added: false
        };

        console.log("item : ", item);
        //emitter to add object to inventory.
        inventoryKeyEmitter.emit(inventoryKey.addItem,item, addedToInventory);
        console.log("addedToInventory : ", addedToInventory);
        if(addedToInventory.added === true){
            this.initSoundEffect('jumpySFX1',"2",0.04);
            tempItemDrop.destroy();
        }

      } 

      

      }, this);

      //checks to see if a health upgrade should be added.
      this.healthUpgrades.children.each(function (tempUpgrade) {
        //if player overlaps with item then they pick it up
        if ((this.player1.x > tempUpgrade.x - 20 && this.player1.x < tempUpgrade.x + 20) && (this.player1.y > tempUpgrade.y - 50 && this.player1.y < tempUpgrade.y + 50) && this.grabbed === false) {
            console.log("picked up healthUpgrade");

            
            //call emmiter to upgrade the health by 1
            healthEmitter.emit(healthEvent.upgradeHealth);

            //destroy the object, and adds flag.
            tempUpgrade.destroyAndFlag();
            
          } 

          }, this);
  }

  //checks to see if the container should be opened
  checkContainerPickUp() {
      
    this.itemContainers.children.each(function (tempItemContainer) {
    //if player overlaps with item then they pick it up
    if ((this.player1.x > tempItemContainer.x - 40 && this.player1.x < tempItemContainer.x + 40) && (this.player1.y > tempItemContainer.y - 40 && this.player1.y < tempItemContainer.y + 40) && this.grabbed === false) {
        
        //console.log("within sign");
        tempItemContainer.safeToOpen = true;
        this.activatedContainerId = tempItemContainer.containerId;
      } else {
        //console.log("outside save point");
        tempItemContainer.safeToOpen = false;
      }

      tempItemContainer.activateContainer(this,this.keyW, this.activatedContainerId);
      }, this);
  }

  checkWoodenBarriers(){
  this.woodenBarriers.children.each(function (tempbarrier) {

    if(this.objectsInRangeX(tempbarrier,this.player1,100)){
        //checks if the attack hitbox is overlapping the tiger to deal damage.
      this.physics.add.overlap(this.attackHitBox, tempbarrier, function () {

        tempbarrier.hitboxOverlaps = true;
      });

      if (tempbarrier.hitboxOverlaps === true) {
        console.log("woodenbarrier taking damage, " + tempbarrier.hp);
        tempbarrier.damage();
        tempbarrier.hitboxOverlaps = false;
      }
    }
  }, this);
  }

  checkRockPiles(){
    this.rockPiles.children.each(function (tempPile) {

      //checks if the attack hitbox is overlapping the tiger to deal damage.
      //this.physics.add.overlap(tempPile, this.player1, function () {
      if(this.objectsInRangeX(tempPile,this.player1,20) && this.objectsInRangeY(tempPile,this.player1,40)){
        tempPile.hitboxOverlaps = true;
      }
      //});
      
      if (tempPile.hitboxOverlaps === true) {
        tempPile.activateRockPile();
      }
    }, this);
  }

  checkSlimeSpikes(){
    this.slimeSpikes.children.each(function (tempSpike) {

      //checks if the attack hitbox is overlapping the tiger to deal damage.
      //this.physics.add.overlap(tempPile, this.player1, function () {
      if(this.objectsInRangeX(tempSpike,this.player1,60) && this.objectsInRangeY(tempSpike,this.player1,200) &&this.isPaused === false &&this.playerStuckGrab === false && this.grabbed === false){
        tempSpike.inRange = true;
      }
      //});
      
      if (tempSpike.inRange === true) {
        tempSpike.activateSlimeSpike();
        tempSpike.inRange = false;
      }
    }, this);
  }

  checkSlimeProjectiles(){
    this.slimeProjectiles.children.each(function (tempProjectile) {
      //ensures gravity is applied,
      tempProjectile.body.setGravityY(tempProjectile.savedGravity);

      //applies velocity of projectile if predefined but only if it hasn't hit the ground.
      if(!tempProjectile.body.blocked.down){
        tempProjectile.setVelocityX(tempProjectile.savedVelocityX);
      }else{
        tempProjectile.setVelocityX(0);
      }
      
      //if projectile hits the ground then
      if(tempProjectile.body.blocked.down && !tempProjectile.hitTheGround){
        console.log("slime projectile hit ground!")
        //call slime projectile to destroy its self 
        tempProjectile.destroySlimeProjectile();
        tempProjectile.hitTheGround = true;
      }

      let tempScene = this;
      //if projectile overlaps with player then
      this.physics.add.overlap(this.player1.mainHitbox, tempProjectile, function () {

        if(tempProjectile.body.blocked.down === false){
          //set up player stuck grab and 
          tempScene.playerStuckGrab = true;
          tempScene.playerStuckGrabbedBy = "slime_projectile";
          tempScene.playerStuckGrabCap = 100;
          tempScene.player1.resetAttack();
          tempScene.player1.StuckRepeat("blueSlimeStuck");
          tempProjectile.destroy();

          tempScene.player1.attacking = false;
        }


      });

    }, this);
  }

  checkCursedHeartProjectiles(){
    this.CursedHearts.children.each(function (tempProjectile) {
      //ensures gravity is applied,
      //tempProjectile.body.setGravityY(tempProjectile.savedGravity);

      //applies velocity of projectile if predefined but only if it hasn't hit the ground or a wall
      if(!tempProjectile.body.blocked.down||!tempProjectile.body.blocked.left || !tempProjectile.body.blocked.right || !tempProjectile.body.blocked.up){

        //if the projectile should still be following the player.
        if(tempProjectile.followingPlayer === true){
          //if the projectile is to the left of the player
          if(this.player1.x > tempProjectile.x ){
            //apply velocity going towars the player.
            tempProjectile.setVelocityX(tempProjectile.savedVelocityX);

          //otherwise send it the opisite direction.
          }else if(this.player1.x <= tempProjectile.x){
            tempProjectile.setVelocityX(tempProjectile.savedVelocityX *-1);
          }

          //if thep rojectile is to the left of the player
          if(this.player1.y-10-10 > tempProjectile.y ){
            //apply velocity going towars the player.
            tempProjectile.setVelocityY(tempProjectile.savedVelocityX);

          //otherwise send it the opisite direction.
          }else if(this.player1.y+10-10 <= tempProjectile.y){

            tempProjectile.setVelocityY(tempProjectile.savedVelocityX *-1);
          }else{
            tempProjectile.setVelocityY(0);
          }
          //slowly accelerate the projectile
          if(tempProjectile.accelerateCoolDown === false){

            //increase control variable
            tempProjectile.accelerateCoolDown = true;
            tempProjectile.savedVelocityX += 10;

            //every 0.1 seconds 
            setTimeout(function(){
              //console.log("tempProjectile.savedVelocityX: ",tempProjectile.savedVelocityX);

              tempProjectile.accelerateCoolDown = false;
            },100);

          }
        }
        
      }else{
        tempProjectile.setVelocityX(0);
      }
      
      //if projectile hits the ground or a wall
      if(tempProjectile.body.blocked.down||tempProjectile.body.blocked.left || tempProjectile.body.blocked.right || tempProjectile.body.blocked.up){
        console.log("curse projectile hit ground/wall!")

        //call slime projectile to destroy its self 
        tempProjectile.destroycursedHeartProjectile();
      }

      let tempScene = this;
      //if projectile overlaps with player then
      this.physics.add.overlap(this.player1.mainHitbox, tempProjectile, function () {

        if(tempProjectile.body.blocked.down === false && tempProjectile.destroying === false){
          //set up player stuck grab and 
          tempScene.playerStuckGrab = true;
          tempScene.playerStuckGrabbedBy = "cursed_heart_projectile";
          tempScene.player1.resetAttack();
          console.log("tempScene.player1: ",tempScene.player1 );
          tempScene.player1.attacking = false;
          tempScene.player1.resetAttack();
          tempScene.playerStuckGrabCap = 120;

          tempScene.initSoundEffect('curseSFX','curse',0.3);

          //creates a refrence to the enemy that infatuaged the player
          tempScene.enemyThatInfatuatedPlayer = tempProjectile.enemyThatSpawnedProjectile;

          tempScene.player1.StuckRepeat("cursedHeartInfatuated");
          tempProjectile.destroy();
        }


      });

      //cool functionality, if the players attack hitbox overlaps the projectile.
      this.physics.add.overlap(this.attackHitBox, tempProjectile, function () {
        tempProjectile.hitboxOverlaps = true;
      });

      if(tempProjectile.hitboxOverlaps === true) {
        console.log("player destroyed cursed heart projectile.");
        tempProjectile.destroycursedHeartProjectile();
        tempProjectile.hitboxOverlaps = false;
      }

    }, this);
  }

  checkLocker(){
    this.playerStorage.children.each(function (tempStorage) {

      //checks if the attack hitbox is overlapping the tiger to deal damage.
      //this.physics.add.overlap(tempPile, this.player1, function () {
      if(this.objectsInRangeX(tempStorage,this.player1,40) && this.objectsInRangeY(tempStorage,this.player1,40)){

        tempStorage.safeToOpen = true;
      } else {
        //console.log("outside save point");
        tempStorage.safeToOpen = false;
      }
      //});
      

      tempStorage.activateStorage(this.keyW);
      
    }, this);
  }

  //special check to keep player from falling out of the world
  checkPlayerOutOfBounds(){
    if(this.player1.y > 3000){

      console.log("this.PlayerOutOfBounds: ",this.PlayerOutOfBounds);

      if(this.PlayerOutOfBounds === false){

        //potentially add some flags for luna's dialogue
        //check to see if flag already exists
        let lunaDevDialogue1 = {
          flagToFind: "lunaDevDialogue1",
          foundFlag: false,
        };

        let lunaDevDialogue2 = {
          flagToFind: "lunaDevDialogue2",
          foundFlag: false,
        };

        inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, lunaDevDialogue1);

        inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, lunaDevDialogue2);

        //add flag if the player has managed to escape bound agian.
        if(lunaDevDialogue1.foundFlag === true && lunaDevDialogue2.foundFlag === false){
          inventoryKeyEmitter.emit(inventoryKey.addContainerFlag,lunaDevDialogue2.flagToFind);
        }else if(lunaDevDialogue1.foundFlag === false){
          inventoryKeyEmitter.emit(inventoryKey.addContainerFlag,lunaDevDialogue1.flagToFind);
        }

        this.PlayerOutOfBounds = true;
        //creates a object to hold data for scene transition
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
          dreamReturnLocation:null
        };

        //grabs the latests data values from the gamehud. also sets hp back to max hp.
        inventoryKeyEmitter.emit(inventoryKey.getCurrentData,playerDataObject);
    
        //then we set the correct location values to the scene transition data.
        playerDataObject.saveX = 1486;
        playerDataObject.saveY = 483;
        playerDataObject.playerSex = this.playerSex;
        playerDataObject.playerLocation = "DevRoom2";

        // then we save the scene transition data.
        this.saveGame(playerDataObject);

        //kills gameplay emitters so they dont pile up between scenes
        this.clearGameplayEmmitters();

        this.portalId = 0;
        //for loop looks through all the looping music playing within a given scene and stops the music.
        for(let counter = 0; counter < this.sound.sounds.length; counter++){
          this.sound.get(this.sound.sounds[counter].key).stop();
        }

        //warps player to the next scene
        console.log(" teleporting player too: ",playerDataObject.playerLocation);
        this.destination = "DevRoom2";
        this.cameras.main.fadeOut(500, 0, 0, 0);
        
      }
      

    }

  }

  //if we have a scene like the upper section of the shadow cave, have a function to warp the player to the lower part. 
  checkPlayerFallWarp(fallRange,location,nextSceneY,returnLeftRange,returnRightRange){

    if(this.player1.y > fallRange){

      this.player1.mainHitbox.setVelocityX(0);
      this.player1.mainHitbox.setVelocityY(0);
      this.player1.mainHitbox.body.setGravityY(0); 

      console.log("this.PlayerOutOfBounds: ",this.PlayerOutOfBounds);

      if(this.PlayerOutOfBounds === false){

        //potentially add some flags for luna's dialogue
        //check to see if flag already exists
        let lunaDevDialogue1 = {
          flagToFind: "lunaDevDialogue1",
          foundFlag: false,
        };

        let lunaDevDialogue2 = {
          flagToFind: "lunaDevDialogue2",
          foundFlag: false,
        };

        inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, lunaDevDialogue1);

        inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, lunaDevDialogue2);

        //add flag if the player has managed to escape bound agian.
        if(lunaDevDialogue1.foundFlag === true && lunaDevDialogue2.foundFlag === false){
          inventoryKeyEmitter.emit(inventoryKey.addContainerFlag,lunaDevDialogue2.flagToFind);
        }else if(lunaDevDialogue1.foundFlag === false){
          inventoryKeyEmitter.emit(inventoryKey.addContainerFlag,lunaDevDialogue1.flagToFind);
        }

        this.PlayerOutOfBounds = true;
        //creates a object to hold data for scene transition
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
          dreamReturnLocation:null
        };

        //grabs the latests data values from the gamehud. also sets hp back to max hp.
        inventoryKeyEmitter.emit(inventoryKey.getCurrentData,playerDataObject);
        
        let returnX = this.player1.x;
        //test to make sure x value of player is in range
        if(returnX > returnRightRange){
          returnX = returnRightRange;
        }else if(returnX < returnLeftRange){
          returnX = returnLeftRange;
        }

        //then we set the correct location values to the scene transition data.
        playerDataObject.saveX = returnX;
        playerDataObject.saveY = nextSceneY;
        playerDataObject.playerSex = this.playerSex;
        playerDataObject.playerLocation = location;

        // then we save the scene transition data.
        this.saveGame(playerDataObject);

        //kills gameplay emitters so they dont pile up between scenes
        this.clearGameplayEmmitters();

        this.portalId = 0;
        //for loop looks through all the looping music playing within a given scene and stops the music.
        for(let counter = 0; counter < this.sound.sounds.length; counter++){
          this.sound.get(this.sound.sounds[counter].key).stop();
        }

        //warps player to the next scene
        console.log(" teleporting player too: ",playerDataObject.playerLocation);
        this.destination = location;
        this.cameras.main.fadeOut(500, 0, 0, 0);
        
      }
      

    }

  }

  backgroundRangeLeft(backgroundSprite,xOrigin,range,incr){
    if(backgroundSprite.x > xOrigin - range){
      backgroundSprite.x -= incr;
    }else{
      backgroundSprite.x = xOrigin - range;
    }
  }

  backgroundRangeRight(backgroundSprite,xOrigin,range,incr){
    //console.log("backgroundSprite.x: ",backgroundSprite.x,"  xOrigin + range: ", xOrigin + range);
    if(backgroundSprite.x < xOrigin + range){
      backgroundSprite.x += incr;
    }else{
      backgroundSprite.x = xOrigin + range;
    }
  }

  backgroundRangeUp(backgroundSprite,yOrigin,range,incr){
    if(backgroundSprite.y > yOrigin - range){
      backgroundSprite.y -= incr;
    }else{
      backgroundSprite.y = yOrigin - range;
    }
  }

  backgroundRangeDown(backgroundSprite,yOrigin,range,incr){
    if(backgroundSprite.y < yOrigin + range){
      backgroundSprite.y += incr;
    }else{
      backgroundSprite.y = yOrigin + range;
    }
  }

  //{game over scene transitions}===================================================================================================================

  //function which destroys this scene and starts the gameover scene.
  changeToGameover(){
  

      let playerSaveSlotDataObject = {
        playerSaveSlotData: null
      };
    
      playerSaveSlotEmitter.emit(playerSaveSlot.getSaveSlot,playerSaveSlotDataObject)

      console.log("this.playerSaveSlotData sent to gameover: ",playerSaveSlotDataObject.playerSaveSlotData);

      if(playerSaveSlotDataObject.playerSaveSlotData !== null){
    
      this.saveGameoverFile(this.playerSex,this.gameoverLocation,this.enemyThatDefeatedPlayer,playerSaveSlotDataObject.playerSaveSlotData,this.defeatedTitle);

      //clears emitters
      this.clearAllEmmitters();
      this.clearGameplayEmmitters();

      //for loop looks through all the looping music playing within a given scene and stops the music.
      for(let counter = 0; counter < this.sound.sounds.length; counter++){
        this.sound.get(this.sound.sounds[counter].key).stop();
      }

      this.playerDefeated = true;
      this.cameras.main.fadeOut(500, 0, 0, 0);
    }
    

  }

  

  

}