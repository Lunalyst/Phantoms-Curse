/****************************************************************************** 
description: check enemy logic during gameplay. handles checks for hitboxes, 
and other collisions.
*******************************************************************************/
class G9CheckEnemys extends G8InitEnemys {

  //function set up a map of enemy check functions
  setUpEnemyCheckMap(){


    let tempSceneRef = this;

    this.mapOfEnemyCheckFunctions = {
      blueSlimes: function blueSlimesFunction() {
        tempSceneRef.checkBlueSlimeInteractions(tempSceneRef);
      },tigers: function tigersFunction() {
        tempSceneRef.checkTigerInteractions(tempSceneRef);
      },rabbits: function rabbitsFunction() {
        tempSceneRef.checkRabbitInteractions(tempSceneRef);
      },beeDrones: function beeDronesFunction(){
        tempSceneRef.checkBeeDroneInteractions(tempSceneRef);
      },bats: function batsFunction() {
        tempSceneRef.checkBatInteractions(tempSceneRef);
      },blueSlimeHSs: function blueSlimeHSsFunction() {
        tempSceneRef.checkBlueSlimeHSInteractions(tempSceneRef);
      },blueSlimeHMs: function blueSlimeHMsFunction() {
        tempSceneRef.checkBlueSlimeHMInteractions(tempSceneRef);
      },chestMimics: function chestMimicsFunction() {
        tempSceneRef.checkChestMimicsInteractions(tempSceneRef);
      },whiteCats: function whiteCatsFunction() {
        tempSceneRef.checkWhiteCatInteractions(tempSceneRef);
      },curseShadows: function curseShadowFunction(){
        tempSceneRef.checkCurseShadowInteractions(tempSceneRef);
      },earieShadows: function earieShadowsFunction(){
        tempSceneRef.checkEarieShadowInteractions(tempSceneRef);
      },mushrooms: function mushroomsFunction(){
        tempSceneRef.checkMushroomInteractions(tempSceneRef);
      },mushroomDefeats: function mushroomDefeatsFunction(){
        tempSceneRef.checkMushroomDefeatsInteractions(tempSceneRef);
      },matangoRoot: function matangoRootFunction(){
        tempSceneRef.matangoRootInteractions(tempSceneRef);
      }


    };

  }

  //function keeps track of slime interactions
  checkBlueSlimeInteractions(scene) {

    //console.log("checking slime interactions");
    //applies functions to all slimes in the group.
    scene.blueSlimes.children.each(function (tempSlime) {

      //safty check to improve performance. only does overlap if in range.
      if(this.objectsInRangeX(tempSlime,this.player1,600) && this.objectsInRangeY(tempSlime,this.player1,600) && tempSlime.inSafeMode === false){

        //if the player is not sleeping
        if(scene.player1.idleTimer !== 2000){
          //calls to make each instance of a bat move.
          tempSlime.move(scene.player1,scene);
        }else{
          tempSlime.moveIdle()
        }

        if(tempSlime.hitboxOverlaps === true) {
          console.log("slime taking damage, slime hp:" + tempSlime.slimeHp);
          tempSlime.damage(scene);
          tempSlime.hitboxOverlaps = false;
        }
        
        //deincriments the grabcooldown on any slime that grabbed the player.
        tempSlime.mitosisDelayCheck();

        // creates a overlap between the damage hitbox and the slime so that slime can take damage
      }else if(this.objectsInRangeX(tempSlime,scene.player1,30) && this.objectsInRangeY(tempSlime,scene.player1,30)){

        this.viewAnimationLogic(tempSlime);
      // otherwise hid the prompt from the player.
      }else{
        tempSlime.setVelocityY(0);
        tempSlime.setVelocityX(0);
        tempSlime.safePrompts.visible = false;
        tempSlime.playedSafePrompts = false;
      }
    }, this);

  }

  //function keeps track of slime interactions
  checkBlueSlimeHSInteractions(scene) {

    //console.log("checking slime interactions");
    //applies functions to all slimes in the group.
    scene.blueSlimeHSs.children.each(function (tempSlime) {

      //safty check to improve performance. only does overlap if in range.
      if(this.objectsInRangeX(tempSlime,this.player1,600) && this.objectsInRangeY(tempSlime,this.player1,600) && tempSlime.inSafeMode === false){
        
        if(scene.player1.idleTimer !== 2000){
          //calls to make each instance of a slime move.
          tempSlime.move(scene.player1,scene);
        }else{
          tempSlime.moveIdle()
        }

        
        if(tempSlime.hitboxOverlaps === true) {
          console.log("slime taking damage, slime hp:" + tempSlime.slimeHp);
          tempSlime.damage(scene);
          tempSlime.hitboxOverlaps = false;
        }
        
        
      //function for animation viewer logic.
      }else if(this.objectsInRangeX(tempSlime,scene.player1,30) && this.objectsInRangeY(tempSlime,scene.player1,30)){

        this.viewAnimationLogic(tempSlime);
      // otherwise hid the prompt from the player.
      }else{
        tempSlime.setVelocityY(0);
        tempSlime.setVelocityX(0);
        tempSlime.safePrompts.visible = false;
        tempSlime.playedSafePrompts = false;
      }
    }, this);

  }

  checkBlueSlimeHMInteractions(scene) {

    //console.log("checking slime interactions");
    //applies functions to all slimes in the group.
    scene.blueSlimeHMs.children.each(function (tempSlime) {

      //safty check to improve performance. only does overlap if in range.
      if(this.objectsInRangeX(tempSlime,this.player1,400) && this.objectsInRangeY(tempSlime,this.player1,150) && tempSlime.inSafeMode === false){

        if(scene.player1.idleTimer !== 2000){
          //calls to make each instance of a slime move.
          tempSlime.move(scene.player1,scene);
        }else{
          tempSlime.moveIdle()
        }
        
        
        if(tempSlime.hitboxOverlaps === true) {
          console.log("slime taking damage, slime hp:" + tempSlime.slimeHp);
          tempSlime.damage(scene);
          tempSlime.hitboxOverlaps = false;
        }
        
        
      //function for animation viewer logic.
      }else if(this.objectsInRangeX(tempSlime,scene.player1,30) && this.objectsInRangeY(tempSlime,scene.player1,30)){

        this.viewAnimationLogic(tempSlime);
      // otherwise hid the prompt from the player.
      }else{
        tempSlime.setVelocityY(0);
        tempSlime.setVelocityX(0);
        tempSlime.safePrompts.visible = false;
        tempSlime.playedSafePrompts = false;
      }
    }, this);

  }

  //function keeps track of slime interactions
  checkTigerInteractions(scene) {

    //applys a function to all tigers
    scene.tigers.children.each(function (tempTiger) {

      if(scene.objectsInRangeX(tempTiger,scene.player1,600) && scene.objectsInRangeY(tempTiger,scene.player1,250) && tempTiger.inSafeMode === false ){
         
      if(tempTiger.enemyInDefeatedLogic === true){
        tempTiger.enemyDefeatedLogic();
      }else{
      
        if(scene.player1.idleTimer !== 2000){
          //calls to make each instance of a tiger move.
           tempTiger.move(scene.player1,scene);
        }else{
           tempTiger.moveIdle()
        }
      }
      
        //if the hitbox overlaps the tiger, then  deal damage to that tiger
        if(tempTiger.hitboxOverlaps === true) {
        
          console.log("tiger taking damage, tiger hp:" + tempTiger.enemyHP);
        
          //inflict damage to tiger
          tempTiger.damage(scene);
        
          //clear overlap verable in tiger.
          tempTiger.hitboxOverlaps = false;
        
        }
      
    }else if(this.objectsInRangeX(tempTiger,scene.player1,30) && this.objectsInRangeY(tempTiger,scene.player1,30)){

      this.viewAnimationLogic(tempTiger);
    // otherwise hid the prompt from the player.
    }else{
      tempTiger.safePrompts.visible = false;
      tempTiger.playedSafePrompts = false;
    }


  }, this);
    
  }

  //function keeps track of slime interactions
  checkRabbitInteractions(scene) {

    //applys a function to all rabbits
    scene.rabbits.children.each(function (tempRabbits) {
    
  
    if(scene.objectsInRangeX(tempRabbits,scene.player1,400) && scene.objectsInRangeY(tempRabbits,scene.player1,200) && tempRabbits.inSafeMode === false){

      if(tempRabbits.enemyInDefeatedLogic === true){
        tempRabbits.enemyDefeatedLogic();
      }else{

        if(scene.player1.idleTimer !== 2000){
          //calls to make each instance of a rabbit move.
          tempRabbits.move(scene.player1,scene);
        }else{
          tempRabbits.moveIdle()
        }

      }
      
      //if the hitbox overlaps the tiger, then  deal damage to that tiger
      if(tempRabbits.hitboxOverlaps === true) {
      
        console.log("tiger taking damage, tiger hp:" + tempRabbits.enemyHP);
      
        //inflict damage to tiger
        tempRabbits.damage(scene);

        tempRabbits.setVelocityX(0);
      
        //clear overlap verable in tiger.
        tempRabbits.hitboxOverlaps = false;
      
      }

    }else if(this.objectsInRangeX(tempRabbits,scene.player1,30) && this.objectsInRangeY(tempRabbits,scene.player1,30)){

      this.viewAnimationLogic(tempRabbits);

    // otherwise hid the prompt from the player.
    }else{
      tempRabbits.safePrompts.visible = false;
      tempRabbits.playedSafePrompts = false;
    }
  }, this);
    
  }

  //function keeps track of beeDrones interactions
  checkBeeDroneInteractions(scene) {

    //applys a function to all tigers
    scene.beeDrones.children.each(function (tempBeeDrone) {
      
      //safty check to improve performance. only does overlap if in range.
      if(scene.objectsInRangeX(tempBeeDrone,scene.player1,450)&& tempBeeDrone.inSafeMode === false){

        //calls drone function to move

        //if the player is not sleeping
        if(scene.player1.idleTimer !== 2000){
          //calls to make each instance of a bat move.
            tempBeeDrone.move(scene.player1,scene);
        }else{
           tempBeeDrone.moveIdle()
        }
        
        //if the hitbox overlaps the drone, then  deal damage to that drone
        if(tempBeeDrone.hitboxOverlaps === true) {
        
          console.log("beeDrone taking damage, beedrone hp:" + tempBeeDrone.enemyHP);
        
          //inflict damage to tiger
          tempBeeDrone.damage(scene);
        
          //clear overlap verable in tiger.
          tempBeeDrone.hitboxOverlaps = false;
        
        }  

    //if the tempBeeDrone is in safe mode, and in range of the player then 
    }else if(this.objectsInRangeX(tempBeeDrone,scene.player1,30) && this.objectsInRangeY(tempBeeDrone,scene.player1,30)){

      this.viewAnimationLogic(tempBeeDrone);
    // otherwise hid the prompt from the player.
    }else{
      tempBeeDrone.safePrompts.visible = false;
      tempBeeDrone.playedSafePrompts = false;
    }

  }, this);
    
  }

  //function keeps track of bat interactions
  checkBatInteractions(scene) {
    //applys a function to all bats
    scene.bats.children.each(function (tempBat) {
    
    //safty check to improve performance. only does overlap if in range.
    //console.log('bat.inSafeMode: ',bat.inSafeMode);
    if(this.objectsInRangeX(tempBat,scene.player1,450) && tempBat.inSafeMode === false ){

      if(tempBat.enemyInDefeatedLogic === true){
        tempBat.enemyDefeatedLogic();
      }else{

        //if the player is not sleeping or the bat is in its second stage allow for movement.
        if(scene.player1.idleTimer !== 2000 ||  tempBat.batHasEatenCat === true){
          //calls to make each instance of a bat move.
         tempBat.move(scene.player1,scene);
        }else{
          tempBat.moveIdle()
        }

      }
      //if player is attacking
      if(this.player1.isAttacking === true){

        //if the hitbox overlaps the drone, then  deal damage to that drone
        if(tempBat.hitboxOverlaps === true) {
        
          //inflict damage to tiger
          tempBat.damage(scene);
        
          //clear overlap verable in tiger.
          tempBat.hitboxOverlaps = false;
        }
      }
      
    //if the bat is in safe mode, and in range of the player then 
    }else if(this.objectsInRangeX(tempBat,scene.player1,30) && this.objectsInRangeY(tempBat,scene.player1,70)){
      
      this.viewAnimationLogic(tempBat);

    // otherwise hid the prompt from the player.
    }else{
      tempBat.safePrompts.visible = false;
      tempBat.playedSafePrompts = false;
    }
  }, this);
    
  }

  checkChestMimicsInteractions(scene) {

    //console.log("checking slime interactions");
    //applies functions to all slimes in the group.
    scene.chestMimics.children.each(function (tempMimic) {

      //safty check to improve performance. only does overlap if in range.
      if(this.objectsInRangeX(tempMimic,this.player1,300) && this.objectsInRangeY(tempMimic,this.player1,150) && tempMimic.inSafeMode === false){
        //calls to make each instance of a chest mimic active
        //mimic does not need idle check as it does not move
        tempMimic.move(scene.player1,scene);



        if(tempMimic.hitboxOverlaps === true) {
          console.log("mimic taking damage, mimic hp:" + tempMimic.enemyHP);
          tempMimic.damage(scene);
          tempMimic.hitboxOverlaps = false;

          //if the mimic is attacked then set the value so it can jump out and get angry.
          tempMimic.attacked = true;
        }
        
      //function for animation viewer logic.
      }else if(this.objectsInRangeX(tempMimic,scene.player1,30) && this.objectsInRangeY(tempMimic,scene.player1,30)){

        this.viewAnimationLogic(tempMimic);
      // otherwise hid the prompt from the player.
      }else{
        tempMimic.setVelocityY(0);
        tempMimic.setVelocityX(0);
        tempMimic.safePrompts.visible = false;
        tempMimic.playedSafePrompts = false;
      }
    }, this);

  }

  checkWhiteCatInteractions(scene) {

    //console.log("checking slime interactions");
    //applies functions to all slimes in the group.
    scene.whiteCats.children.each(function (tempCat) {

      //safty check to improve performance. only does overlap if in range.
      if(this.objectsInRangeX(tempCat,this.player1,400) && this.objectsInRangeY(tempCat,this.player1,300) && tempCat.inSafeMode === false){
        //calls to make each instance of a slime move.

        if(tempCat.enemyInDefeatedLogic === true){
          tempCat.enemyDefeatedLogic();
        }else{

          //if the player is not sleeping
          if(scene.player1.idleTimer !== 2000){
            //calls to make each instance of a cat move.
            tempCat.move(scene.player1,scene);
          }else{
            tempCat.moveIdle()
          }
        
        }

        if(tempCat.hitboxOverlaps === true) {
          tempCat.damage(scene);

          tempCat.setVelocityX(0);

          tempCat.hitboxOverlaps = false;
        }
        
      //function for animation viewer logic.
      }else if(this.objectsInRangeX(tempCat,scene.player1,30) && this.objectsInRangeY(tempCat,scene.player1,30)){

        this.viewAnimationLogic(tempCat);
      // otherwise hid the prompt from the player.
      }else{
        tempCat.setVelocityY(0);
        tempCat.setVelocityX(0);
        tempCat.safePrompts.visible = false;
        tempCat.playedSafePrompts = false;
      }
    }, this);

  }

  //function keeps track of slime interactions
  checkCurseShadowInteractions(scene) {

    //console.log("checking slime interactions");
    //applies functions to all slimes in the group.
    scene.curseShadows.children.each(function (tempShadows) {

      //console.log("tempShadows.inSafeMode: ",tempShadows.inSafeMode);
      //safty check to improve performance. only does overlap if in range.
      if(this.objectsInRangeX(tempShadows,this.player1,600) && this.objectsInRangeY(tempShadows,this.player1,600) && tempShadows.inSafeMode === false){

        if(scene.player1.idleTimer !== 2000){
          //calls to make each instance of a slime move.
          tempShadows.move(scene.player1,scene);
        }else{
          tempShadows.moveIdle()
        }
       
      // creates a overlap between the damage hitbox and the slime so that slime can take damage
      }else if(this.objectsInRangeX(tempShadows,scene.player1,50) && this.objectsInRangeY(tempShadows,scene.player1,80)){

        this.viewAnimationLogic(tempShadows);
      // otherwise hid the prompt from the player.
      }else{
        tempShadows.setVelocityY(0);
        tempShadows.setVelocityX(0);
        tempShadows.safePrompts.visible = false;
        tempShadows.playedSafePrompts = false;
      }
        
    }, this);

  }

  checkEarieShadowInteractions(scene) {

    //applies functions to all slimes in the group.
    scene.earieShadows.children.each(function (tempShadows) {

      //safty check to improve performance. only does overlap if in range.
      //744-2227
      if((this.player1.x > 744 && this.player1.x < 2227)  && tempShadows.inSafeMode === false){
        //calls to make each instance of a slime move.
        tempShadows.move(scene.player1,scene);

      }else if(this.objectsInRangeX(tempShadows,scene.player1,10) && this.objectsInRangeY(tempShadows,scene.player1,80)){
        tempShadows.visible = true;
        this.viewAnimationLogic(tempShadows);
      // otherwise hid the prompt from the player.
      }else{
        tempShadows.hitboxActive = false;

        if(tempShadows.inSafeMode === true){
          tempShadows.visible = true;
        }else{
          tempShadows.visible = false;
        }

        tempShadows.curseLight.visible = false;
        tempShadows.grabTimer = false;
        tempShadows.attemptingGrab = false;
        tempShadows.isPlayingMissedAnims = false;
        tempShadows.movementState = 0;
        tempShadows.hitboxActive = false;
        tempShadows.activatedCycleTimer = false;
        tempShadows.grabHitBox.body.enable = false;

        //reset shadows variables
        tempShadows.setVelocityY(0);
        tempShadows.setVelocityX(0);
        tempShadows.safePrompts.visible = false;
        tempShadows.playedSafePrompts = false;
      }
    }, this);

  }


  checkMushroomInteractions(scene){
    //console.log("checking slime interactions");
    //applies functions to all slimes in the group.
    scene.mushrooms.children.each(function (tempMushrooms) {

      //console.log("tempMushrooms.inSafeMode: ",tempMushrooms.inSafeMode);
      //safty check to improve performance. only does overlap if in range.
      if(this.objectsInRangeX(tempMushrooms,this.player1,600) && this.objectsInRangeY(tempMushrooms,this.player1,600) && tempMushrooms.inSafeMode === false){

        if(scene.player1.idleTimer !== 2000){
          tempMushrooms.move(scene.player1,scene);
        }else{
          tempMushrooms.moveIdle();
        }
        
        //if the mushroom is not in moving between nodes, is hiding or is in transition to be out of hiding, then allow for the mushroom to be damagedd
        if(tempMushrooms.hitboxOverlaps === true) {
          tempMushrooms.damage(scene);
          console.log("damaging mushroom node!")
          tempMushrooms.hitboxOverlaps = false;
        }
       
      // creates a overlap between the damage hitbox and the slime so that slime can take damage
      }else if(this.objectsInRangeX(tempMushrooms,scene.player1,50) && this.objectsInRangeY(tempMushrooms,scene.player1,80)){

        this.viewAnimationLogic(tempMushrooms);
      // otherwise hid the prompt from the player.
      }else{
        tempMushrooms.setVelocityY(0);
        tempMushrooms.setVelocityX(0);
        tempMushrooms.safePrompts.visible = false;
        tempMushrooms.playedSafePrompts = false;
      }
        
    }, this);

  }

  //function to handle mushroom defeated animation
  checkMushroomDefeatsInteractions(scene){

    scene.mushroomDefeats.children.each(function (tempMushrooms) {

      //make a temp player health object
      let playerHealthObject = {
        playerHealth: null,
        playerMaxHealth: null
      };

      //if the player isnt already grabbed then call emitter. otherwise stop calling it to hopefully save resources?
      if(tempMushrooms.playerGrabbed === false){
        
        //grab the player health value from the hud emitter.
        healthEmitter.emit(healthEvent.returnHealth,playerHealthObject);
      }
      
      //if the players curse bar is maxed out, and they are touching the floor, then trigger gameover.
      if(playerHealthObject.playerCurse === playerHealthObject.playerCurseMax && scene.player1.mainHitbox.body.blocked.down) {
          //stop the velocity of the player
          tempMushrooms.setVelocityX(0);
          scene.player1.mainHitbox.setVelocityX(0);
          //calls the grab function
          tempMushrooms.grab();
          //sets the scene grab value to true since the player has been grabbed
          // tells instance of slime that it has grabbed player
          tempMushrooms.grabCoolDown = true;
          tempMushrooms.playerGrabbed = true;
          scene.grabbed = true;
          scene.grabCoolDown = true;
          console.log('player was consumed by spores!');

      }else if(scene.objectsInRangeX(tempMushrooms,scene.player1,30) && scene.objectsInRangeY(tempMushrooms,scene.player1,30) && tempMushrooms.inSafeMode === true){

        scene.viewAnimationLogic(tempMushrooms);
      // otherwise hid the prompt from the player.
      }else{
        tempMushrooms.setVelocityY(0);
        tempMushrooms.setVelocityX(0);
        tempMushrooms.safePrompts.visible = false;
        tempMushrooms.playedSafePrompts = false;
      }

    });
  }

  matangoRootInteractions(scene){

     scene.matangoRoots.children.each(function (tempMushrooms) {

      //safty check to improve performance. only does overlap if in range.
      if(this.objectsInRangeX(tempMushrooms,this.player1,3000) && this.objectsInRangeY(tempMushrooms,this.player1,3000) && tempMushrooms.inSafeMode === false){
        //console.log("tempMushrooms.inSafeMode: ",tempMushrooms.inSafeMode);
        if(scene.player1.idleTimer !== 2000){
          tempMushrooms.move(scene.player1,scene);

        }else{
          tempMushrooms.moveIdle();
        }
        //if the mushroom is not in moving between nodes, is hiding or is in transition to be out of hiding, then allow for the mushroom to be damagedd
        if(tempMushrooms.hitboxOverlaps === true) {
          tempMushrooms.damage(scene);
          console.log("damaging mushroom node!")
          tempMushrooms.hitboxOverlaps = false;
        }
       
      // creates a overlap between the damage hitbox and the slime so that slime can take damage
      }else if(this.objectsInRangeX(tempMushrooms,scene.player1,50) && this.objectsInRangeY(tempMushrooms,scene.player1,80)){

        this.viewAnimationLogic(tempMushrooms);
      // otherwise hid the prompt from the player.
      }else{
        tempMushrooms.setVelocityY(0);
        tempMushrooms.setVelocityX(0);
        tempMushrooms.safePrompts.visible = false;
        tempMushrooms.playedSafePrompts = false;
      }
        
    }, this);
  }

  

}