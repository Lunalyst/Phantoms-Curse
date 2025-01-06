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

  //creates a sign object in the scene
  initSigns(x, y, text, profileArray) {
      let sign1 = new sign(this, x, y, text, profileArray);
      
      sign1.signId = this.signId;
      this.signId++;

      this.signPoints.add(sign1);
      //console.log("added sign",this.signPoints);

      //if we are using dark lighting
      if(this.lightingSystemActive === true){ 
        sign1.setPipeline('Light2D');
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

    //if we are using dark lighting
    if(this.lightingSystemActive === true){ 
      drop1.setPipeline('Light2D');
    }

  }

  //creates a item drop object in the scene
  initFakeItemDrop(x, y,itemID) {
    //creates a item drop
    let drop1 = new itemDrop(this, x, y,itemID,0,1,"","","",0);
    drop1.activateFakeDrop();

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
    initItemContainer(x, y,itemID,itemStackable,itemAmount,onlyOpenOnce,flag) {
      //creates a item drop
      let container = new itemContainer(this, x, y,itemID,itemStackable,itemAmount,onlyOpenOnce,flag);

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

      let slimeProj = new slimeProjectile(this,x,y,velocityX,savedGravity);

      this.physics.add.existing(slimeProj);
      this.slimeProjectiles.add(slimeProj);

      //if we are using dark lighting
      if(this.lightingSystemActive === true){ 
        slimeProj.setPipeline('Light2D');
        
      }
    }

    initCursedHeartProjectile(x,y,velocityX,enemy,direction){

      let cursedHeartProj = new cursedHeartProjectile(this,x,y,velocityX,enemy,direction);

      this.physics.add.existing(cursedHeartProj);
      this.CursedHearts.add(cursedHeartProj);

      //if we are using dark lighting
      if(this.lightingSystemActive === true){ 
        cursedHeartProj.setPipeline('Light2D');
      }
    }
  

}