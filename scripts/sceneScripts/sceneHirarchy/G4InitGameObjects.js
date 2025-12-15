/****************************************************************************** 
description: init functions for our gameobjects. includes warps save points ect.
*******************************************************************************/
class G4InitGameObjects extends G3SetupCollisionFunctions {

  //creates warp portal objects in the scene
  initPortals(x, y, toX, toY, animation,destination) {

    let portal1 = new warp(this, x, y);
    //gives portal a unique id so that scene can tell which warp object is being activated
    portal1.warpPortalId = this.portalId;
    this.portalId++;
    //sets the location given as to where the player will be sent in the next scene
    portal1.setLocationToSendPlayer(toX, toY, animation,destination);
    //adds portal object to the portal object in the scene
    this.portals.add(portal1);

    //if we are using dark lighting
    if(this.lightingSystemActive === true){  
      //add the portal object to the lighting pipeline.
      portal1.setPipeline('Light2D');

      //if the door is a cave going from inside to outside then
      if("warpCaveInside" == animation){
        //add a door light
        portal1.doorLight = this.lights.addLight(x,y+7, 300);
      }
     
    }
    //console.log(" portal1.warpPortalId: "+ portal1.warpPortalId);
    //console.log(" scene.portalId: "+ scene.portalId);
  }

  //creates warp portal objects in the scene
  initBedPortals(x, y) {
    let portal1 = new bedWarp(this, x, y);
    //gives portal a unique id so that scene can tell which warp object is being activated
    portal1.warpPortalId = this.portalId;
    this.portalId++;
    //sets the location given as to where the player will be sent in the next scene
    portal1.setLocationToSendPlayer(1018, 925,'DreamHub');
    //adds portal object to the portal object in the scene
    this.portals.add(portal1);

    //if we are using dark lighting
    if(this.lightingSystemActive === true){ 
      portal1.setPipeline('Light2D');
    }

    //console.log(" portal1.warpPortalId: "+ portal1.warpPortalId);
    //console.log(" scene.portalId: "+ scene.portalId);
  }

  //creates warp portal objects that are transparent in the scene
  initPortalsWithTransparency(x, y, toX, toY, animation,destination,transparency) {
    let portal1 = new warp(this, x, y);
    portal1.setAlpha(transparency);
    portal1.setDepth(100);
    //gives portal a unique id so that scene can tell which warp object is being activated
    portal1.warpPortalId = this.portalId;
    this.portalId++;
    //sets the location given as to where the player will be sent in the next scene
    portal1.setLocationToSendPlayer(toX, toY, animation,destination);
    //adds portal object to the portal object in the scene
    this.portals.add(portal1);

    //if we are using dark lighting
    if(this.lightingSystemActive === true){ 
      portal1.setPipeline('Light2D');
    }

    //console.log(" portal1.warpPortalId: "+ portal1.warpPortalId);
    //console.log(" scene.portalId: "+ scene.portalId);
  }

  //creates save point in the scene
  initSavePoints(x, y) {
      let savePoint1 = new savePoint(this, x, y);
      savePoint1.saveStoneId = this.saveStoneId;
      this.saveStoneId++;

      this.saveStonePoints.add(savePoint1);

      //if we are using dark lighting
      if(this.lightingSystemActive === true){ 
        savePoint1.setPipeline('Light2D');
      }

  }

  initMemoryPoints(x, y) {
      let savePoint1 = new memoryPoint(this, x, y);
      savePoint1.saveStoneId = this.saveStoneId;
      this.saveStoneId++;

      this.saveStonePoints.add(savePoint1);

      //if we are using dark lighting
      if(this.lightingSystemActive === true){ 
        savePoint1.setPipeline('Light2D');
      }

  }

  initBossStartMatango(x, y) {
      let savePoint1 = new bossStartMatango(this, x, y);
      savePoint1.saveStoneId = this.saveStoneId;
      this.saveStoneId++;

      this.saveStonePoints.add(savePoint1);

      //if we are using dark lighting
      if(this.lightingSystemActive === true){ 
        savePoint1.setPipeline('Light2D');
      }

  }

  initSecretRemover(x, y) {
    let savePoint1 = new secretRemover(this, x, y);
    savePoint1.saveStoneId = this.saveStoneId;
    this.saveStoneId++;

    this.saveStonePoints.add(savePoint1);

    //if we are using dark lighting
    if(this.lightingSystemActive === true){ 
      savePoint1.setPipeline('Light2D');
    }

}

  //creates a sign object in the scene
  initStorage(x, y) {
    let storage = new storageLocker(this, x, y);

    this.playerStorage.add(storage);
    //console.log("added container",this.container);

    //if we are using dark lighting
    if(this.lightingSystemActive === true){ 
      storage.setPipeline('Light2D');
    }
    
  }

  //creates a sign object in the scene
  initPlayerCraftingBench(x, y) {

    let bench = new craftingBench(this, x, y);

    this.playerCraftingBench.add(bench);
    console.log("added bench",this.playerCraftingBench);

    //if we are using dark lighting
    if(this.lightingSystemActive === true){ 
      bench.setPipeline('Light2D');
    }
    
  }

  //creates a item drop object in the scene
  initItemDrop(x, y,itemID,itemStackable,itemAmount,itemName,itemDescription,itemType,sellValue) {
    //creates a item drop
    //console.log("itemType: ",itemType);
    let drop1 = new itemDrop(this, x, y,itemID,itemStackable,itemAmount,itemName,itemDescription,itemType,sellValue);
    //adds it to the item drop group
    //drop1.body.setGravityY(600);
    this.itemDrops.add(drop1);
    //adds gravity. dont know why defining it in the object itself didnt work. this is fine.
    drop1.body.setGravityY(600);
      
    drop1.body.setBounce(0.5,0.5);

    console.log("adding new item drop: ",drop1);

    //NOTE, CANT ADD ITEM DROP TO LIGHTING, AS IT CANCELS THE GLOW EFFECT.
    //probably better since it helps the item stand out more in the dark scenes.
    //if we are using dark lighting
    /*if(this.lightingSystemActive === true){ 
      drop1.setPipeline('Light2D');
    }*/

  }

  //creates a item drop object in the scene
  initFakeItemDrop(x, y,itemID) {
    //creates a item drop
    let drop1 = new itemDrop(this, x, y,itemID,0,1,"","","",0);
    drop1.activateFakeDrop();

    console.log("adding new fake item drop: ",drop1);

  }

  //creates a item drop object in the scene
  initFakeItemDropWithSpeed(x, y,itemID,speed) {
    //creates a item drop
    let drop1 = new itemDrop(this, x, y,itemID,0,1,"","","",0);
    drop1.activateFakeDropWithSpeed(speed);

    console.log("adding new fake item drop: ",drop1);

  }

    //creates a healthUpgrade object in the scene. checks the flag value to see if the object should be spawned or not.
    initHealthUpgrade(x, y, flag) {

      console.log("checking if upgrade should be spawned! -----------------------------");

      //make a temp object
      let object = {
        flagToFind: flag,
        foundFlag: false,
      };

      // call the emitter to check if the value already was picked up.
      inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, object);
      
      //if it has not then spawn it in the level
      if(object.foundFlag === false){

        console.log("sspawning in health upgrade! -----------------------------");

        //creates a item drop
        let upgrade1 = new healthUpgrade(this, x, y,flag);
        
        //adds healthUpgrade to group
        this.healthUpgrades.add(upgrade1);

        //adds gravity. dont know why defining it in the object itself didnt work. this is fine.
        upgrade1.body.setGravityY(600);

        upgrade1.body.setBounce(0.5 , 0.5);

        console.log("adding new healthUpgrade: ",upgrade1)

        //if we are using dark lighting
        if(this.lightingSystemActive === true){ 
          upgrade1.setPipeline('Light2D');

        }
      }
      
    }

    //creates a item container in the scene
    initItemContainer(x, y,itemID,itemStackable,itemAmount,onlyOpenOnce,flag,containerType) {
      //creates a item drop
      let container = new itemContainer(this, x, y,itemID,itemStackable,itemAmount,onlyOpenOnce,flag,containerType);

      //gives portal a unique id so that scene can tell which warp object is being activated
      container.containerId = this.containerId;
      this.containerId++;
      //adds it to the item drop group
      this.itemContainers.add(container);
      
      console.log("adding new item container: ",container)

      //if we are using dark lighting
      if(this.lightingSystemActive === true){ 
        container.setPipeline('Light2D');
        
      }
      
    }

    initBarrier(x,y,width,height){

      let invisWall = this.add.sprite(x, y,'barrier');
      this.physics.add.existing(invisWall);
      invisWall.body.setSize(width, height, true);
      invisWall.body.pushable = false;
      this.invisibleBarriers.add(invisWall);

    }

    initWoodenBarrier(x,y){

      let woodWall = new woodBarrier(this,x,y);
      this.physics.add.existing(woodWall);
      woodWall.body.pushable = false;
      this.woodenBarriers.add(woodWall);

      //if we are using dark lighting
      if(this.lightingSystemActive === true){ 
        woodWall.setPipeline('Light2D');
        
      }

      //checks if the attack hitbox is overlapping the tiger to deal damage.
      this.physics.add.overlap(this.attackHitBox, woodWall, function () {

        woodWall.hitboxOverlaps = true;
      });


    }

    initMushroomBarrier(x,y,flip,orientation){

      let mushroomWall = new mushroomBarrier(this,x,y,flip,orientation);
      this.physics.add.existing(mushroomWall);
      mushroomWall.body.pushable = false;
      this.mushroomBarriers.add(mushroomWall);
    }

    initRockPile(x,y){
      let pile = new rockPile(this,x,y);
      this.physics.add.existing(pile);
      pile.body.pushable = false;
      this.rockPiles.add(pile);

      //if we are using dark lighting
      if(this.lightingSystemActive === true){ 
        pile.setPipeline('Light2D');
        
      }

    }

    initWallLight(x,y,type){
      //console.log("creating wall light");
      let light1 = new wallLight(this,x,y,type);
      this.wallLights.add(light1);

    }

    initSlimeSpike(x,y){
      let slimeTrap = new slimeSpike(this,x,y);
      this.physics.add.existing(slimeTrap);
      slimeTrap.body.pushable = false;
      this.slimeSpikes.add(slimeTrap);

      //if we are using dark lighting
      if(this.lightingSystemActive === true){ 
        slimeTrap.setPipeline('Light2D');
        
      }

    }

    initSlimeProjectile(x,y,velocityX,savedGravity){

      let tempProjectile = new slimeProjectile(this,x,y,velocityX,savedGravity);

      this.physics.add.existing(tempProjectile);
      this.slimeProjectiles.add(tempProjectile);

      //if we are using dark lighting
      if(this.lightingSystemActive === true){ 
        tempProjectile.setPipeline('Light2D');
        
      }

      let tempScene = this;
      //if projectile overlaps with player then
      tempProjectile.collider = this.physics.add.overlap(this.player1.mainHitbox, tempProjectile, function () {

        if(tempProjectile.body.blocked.down === false){
          //set up player stuck grab and 
          tempScene.playerStuckGrab = true;
          tempScene.playerStuckGrabbedBy = "slime_projectile";
          tempScene.playerStuckGrabCap = 100;
          tempScene.player1.resetAttack();
          tempScene.player1.StuckRepeat("blueSlimeStuck");
          tempProjectile.collider.destroy();
          tempProjectile.destroy();

          tempScene.player1.attacking = false;
        }


      });


    }

    initCursedHeartProjectile(x,y,velocityX,enemy,direction){

      let tempProjectile = new cursedHeartProjectile(this,x,y,velocityX,enemy,direction);

      this.physics.add.existing(tempProjectile);
      this.CursedHearts.add(tempProjectile);

      //if we are using dark lighting
      if(this.lightingSystemActive === true){ 
        tempProjectile.setPipeline('Light2D');
      }

      let tempScene = this;
      //if projectile overlaps with player then
      tempProjectile.collider1 = this.physics.add.overlap(this.player1.mainHitbox, tempProjectile, function () {

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
          tempProjectile.collider1.destroy();
          tempProjectile.collider2.destroy();
          tempProjectile.destroy();
        }
      });

      //cool functionality, if the players attack hitbox overlaps the projectile.
       tempProjectile.collider2 = this.physics.add.overlap(this.attackHitBox, tempProjectile, function () {
        tempProjectile.hitboxOverlaps = true;
      });

    }

    initSporeCloud(x,y,direction,speed,duration){
      let tempSporeCloud = new sporeCloud(this,x,y,direction,speed,duration);

      this.sporeClouds.add(tempSporeCloud);

      if(this.lightingSystemActive === true){ 
        tempSporeCloud.setPipeline('Light2D');
      }

      let tempScene = this;
      //overlap function to let player know that the curse bar is increasing.
      tempSporeCloud.colliderRefrence =  this.physics.add.overlap(this.player1.mainHitbox, tempSporeCloud, function () {

        tempScene.player1.overlapCurseBuildUp();
        
      });

    }

    initPlayerProjectile(x,y,type,direction,speed,duration){
      let tempProjectile = new playerProjectile(this,x,y,type,direction,speed,duration);

      this.playerProjectiles.add(tempProjectile);

      if(this.lightingSystemActive === true){ 
        tempProjectile.setPipeline('Light2D');
      }

      let tempScene = this;
      //overlap function to let player know that the curse bar is increasing.
      /*tempProjectile.colliderRefrence =  this.physics.add.overlap(this.player1.mainHitbox, tempProjectile, function () {

        tempScene.player1.overlapCurseBuildUp();
        
      });*/

    }
  

}