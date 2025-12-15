/****************************************************************************** 
description: check enemy logic during gameplay. handles checks for hitboxes, 
and other collisions.
*******************************************************************************/
class G9CheckEnemys extends G8InitEnemys {

  //contains the logic all enemys should follow when a player is grabbed
  checkEnemyGrab() {
    this.enemys.children.each(function (tempEnemy) {
      if (tempEnemy.playerGrabbed === true) {
          
          //reset stuck grab values incase the player is in a stuck grab when grabbed
          this.playerStuckGrab = false;
          this.playerStuckGrabActivated = false;
          this.playerStuckGrabbedBy = "";
          this.player1.resetAttack();
          this.playerStuckGrabCap = 0;

          //focus on the tiger that grabbed the player
          this.mycamera.startFollow(tempEnemy);
          this.cameras.main.zoom = 4;
          this.grabbed = tempEnemy.playerGrabbed;
          //scene, player1, KeyDisplay,keyTAB, keyW, keyS,keyA, keyD
          if(tempEnemy.inSafeMode === false){
            tempEnemy.grab();
          }else{
            tempEnemy.animationGrab();
          }
          
          //console.log(" player grabbed by tiger tempTiger.tigerId: ",tempTiger.tigerId," tempTiger.playerGrabbed: ",tempTiger.playerGrabbed);
          
      } else {
          //if enemy didn't grab player but player was grabbed then play idle animation.
          tempEnemy.moveIdle();
      }
    }, this);
  }

  //contains the logic for self grabs, or when the player is grabbed/stuck by a projectile 
  checkStuckGrab() {

    //if the player did get self grabbeda
   if(this.playerStuckGrab === true && this.grabbed === false){

    //then do set up for that grab
    if(this.playerStuckGrabActivated === false){
      this.cameras.main.zoom = 4;
      this.cameras.main.followOffset.set(0,10);
      this.KeyDisplay.visible = true;
      this.KeyDisplay.playWKey();

      //make an object which is passed by refrence to the emitter to update the hp values so the enemy has a way of seeing what the current health value is.
      let playerHealthObject = {
        playerHealth: null
      };

      //gets the hp value using a emitter
      healthEmitter.emit(healthEvent.returnHealth,playerHealthObject);

      //save the value in the scene so we know if the player should be allowed to struggle free of knockdown.
      this.knockdownPlayerHealth = playerHealthObject.playerHealth;

      //if the players hp isnt zero
      if(this.knockdownPlayerHealth > 0){

        //makes the struggle bar visible
        struggleEmitter.emit(struggleEvent.activateStruggleBar, true);
        struggleEmitter.emit(struggleEvent.updateStruggleBarCap,this.playerStuckGrabCap);
        struggleEmitter.emit(struggleEvent.updateStruggleBar,this.playerStuckGrabCap);
      }
      
      this.playerStuckGrabActivated = true;

      //sets the delay to fals upon stucklgrabactivation for cursed heart
      if(this.playerStuckGrabbedBy === "cursed_heart_projectile"){
        this.cursedHeartDelay = false;
        this.cursedHeartDelayPlayed = false
      }

      //sets the delay to falls upon stucklgrabactivation for cursed heart
      if(this.playerStuckGrabbedBy === "knockdown"){
        this.knockdownLaunchedUp = false;
        this.knockdownDelay = false;
        this.knockdownDelayPlayed = false;

        //play hit sound effect for when the enemy hits the player
        this.initSoundEffect('woodBarrierSFX','woodHit',0.5);

        //make an object which is passed by refrence to the emitter to update the hp values so the enemy has a way of seeing what the current health value is.
        let playerHealthObject = {
          playerHealth: null
      };

      //gets the hp value using a emitter
      healthEmitter.emit(healthEvent.returnHealth,playerHealthObject);

        if(playerHealthObject.playerHealth-5 > 0){
          healthEmitter.emit(healthEvent.loseHealth,5);
        }
      }

      //plays sfx for player being stuck
      console.log("this.PlayerStuckSFXTimer: ",this.PlayerStuckSFXTimer);
      if(this.PlayerStuckSFXTimer === false){
        console.log("this.playerStuckGrabbedBy: ",this.playerStuckGrabbedBy);
        if(this.playerStuckGrabbedBy === "slime_projectile"){

          //stops the players velocity during the initial grab.
          this.player1.mainHitbox.setVelocityX(0);

          

          this.initSoundEffect('blueSlimeSFX','1',0.3);
          this.PlayerStuckSFXTimer = true;

          let thisScene = this;
          setTimeout(function(){
            thisScene.PlayerStuckSFXTimer = false;
          },800);

        //otherwise if projectile is a cursed heart.
        }
      }
    }
    //makes sure the key display follows the player incase they where grabbed in air.
    this.KeyDisplay.x = this.player1.x;
    this.KeyDisplay.y = this.player1.y+55;

    this.player1.x = this.player1.mainHitbox.x;
    this.player1.y = this.player1.mainHitbox.y; 
    
    //if the player is w then
    if(this.checkWPressed() === true && this.playerStuckGrabCap > 0){
      //reduce the stuck cap counter
      this.playerStuckGrabCap-=10;
      //update the struggle bar
      struggleEmitter.emit(struggleEvent.updateStruggleBar,this.playerStuckGrabCap);
    }
    // if the player broke free, then
    if(this.playerStuckGrabCap <= 0 && this.knockdownPlayerHealth > 0){
      //reset the grab values
      this.playerStuckGrab = false;
      this.playerStuckGrabActivated = false;
      this.playerStuckGrabbedBy = "";
      this.player1.resetAttack();
      this.playerStuckGrabCap = 0;
      this.KeyDisplay.visible = false;
      struggleEmitter.emit(struggleEvent.activateStruggleBar, false);
    }
    //if this is a slime projectile, then.
    if(this.playerStuckGrabbedBy === "slime_projectile"){

      //stops the players velocity during the initial grab.
      this.player1.mainHitbox.setVelocityX(0);
    }

    //apply movement logic if there is any. controls player movement to have them walk toward the enemy that they got infatuated by.
    //only use this logic if we are done having the player huff and puff.
    if(this.playerStuckGrabbedBy ==="cursed_heart_projectile" && this.cursedHeartDelay === true){

        //if the player is on the ground and the enemy is to the left
        if(this.player1.mainHitbox.body.blocked.down && this.enemyThatInfatuatedPlayer.x+20 < this.player1.x){

          console.log("infatuated player moving left?");
          //apply velocity to the left
          this.player1.mainHitbox.setVelocityX(-200 * this.player1.speedBoost/2);
          this.player1.StuckRepeat('cursedHeartInfatuatedWalk');
          this.player1.flipXcontainer(true);


        }else if(this.player1.mainHitbox.body.blocked.down && this.enemyThatInfatuatedPlayer.x-20 >= this.player1.x){

          console.log("infatuated player moving right?");
          this.player1.mainHitbox.setVelocityX(200 * this.player1.speedBoost/2);
          this.player1.StuckRepeat('cursedHeartInfatuatedWalk');
          this.player1.flipXcontainer(false);

        
        //otherwise if the player is falling
        }else if(!this.player1.mainHitbox.body.blocked.down && this.playerStuckGrabbedBy ==="cursed_heart_projectile"){
          //play falling animation.
          this.player1.Stuck('cursedHeartInfatuatedFalling');
        }else if(this.playerStuckGrabbedBy ==="cursed_heart_projectile"){
          this.player1.mainHitbox.setVelocityX(0);
          this.player1.StuckRepeat('cursedHeartInfatuated');

        }

        //special case. if cat gets mad while player is infatuated, release the cursed heart stuckgrab.
        if(this.enemyThatInfatuatedPlayer.angry === true || this.enemyThatInfatuatedPlayer.eaten === true){
          //reset the grab values
          this.playerStuckGrab = false;
          this.playerStuckGrabActivated = false;
          this.playerStuckGrabbedBy = "";
          this.player1.resetAttack();
          this.playerStuckGrabCap = 0;
          this.KeyDisplay.visible = false;
          struggleEmitter.emit(struggleEvent.activateStruggleBar, false);
        }

    //otherwise have the player huff and puff.
    }else if(this.playerStuckGrabbedBy ==="cursed_heart_projectile" && this.cursedHeartDelay === false){
      this.player1.mainHitbox.setVelocityX(0);

      //simple stopper so the huff puff animation plays.
      if(this.cursedHeartDelayPlayed === false && this.player1.mainHitbox.body.blocked.down){

        //special case. if cat gets mad while player is infatuated, release the cursed heart stuckgrab.
        // another special case, if the cat is eaten, then also release the player
        if(this.enemyThatInfatuatedPlayer.angry === true || this.enemyThatInfatuatedPlayer.eaten === true){
          //reset the grab values
          this.playerStuckGrab = false;
          this.playerStuckGrabActivated = false;
          this.playerStuckGrabbedBy = "";
          this.player1.resetAttack();
          this.playerStuckGrabCap = 0;
          this.KeyDisplay.visible = false;
          struggleEmitter.emit(struggleEvent.activateStruggleBar, false);
        }
        
        //play animation of player infatuated and standing still.
        this.cursedHeartDelayPlayed = true;
        this.player1.setStuckVisiblity();
        this.player1.mainBodySprite5.anims.play('cursedHeartInfatuatedRepeat').once('animationcomplete', () => {
          this.cursedHeartDelay = true;
        });

      }else if(!this.player1.mainHitbox.body.blocked.down && this.playerStuckGrabbedBy ==="cursed_heart_projectile"){
        this.player1.Stuck('cursedHeartInfatuatedFalling');
      }

    }

    //apply movement logic if there is any. controls player movement to have them walk toward the enemy that they got infatuated by.
    //only use this logic if we are done having the player huff and puff.
    //console.log("this.player1.mainHitbox.body.blocked.down :",this.player1.mainHitbox.body.blocked.down,"this.knockdownDelay: ",this.knockdownDelay );
    if(this.playerStuckGrabbedBy ==="knockdown" && this.knockdownDelay === true){
      this.player1.StuckRepeat('knockdownStruggle');
      this.player1.mainHitbox.setVelocityX(0);

    }else if(this.playerStuckGrabbedBy ==="knockdown" && this.knockdownDelay === false){

      if(this.knockdownLaunchedUp === false){
        this.knockdownLaunchedUp = true;
        this.player1.mainHitbox.setVelocityY(-200);

      }
      //use the enemy to tell where the player should be flung
      if(this.enemyThatknockdownPlayer.knockdownDirection === false && this.player1.mainHitbox.body.blocked.down === false){
        //fling player left
        this.player1.flipXcontainer(false);
        this.player1.mainHitbox.setVelocityX(-140);
      }if(this.enemyThatknockdownPlayer.knockdownDirection === true && this.player1.mainHitbox.body.blocked.down === false){
        //fling player left
        this.player1.flipXcontainer(true);
        this.player1.mainHitbox.setVelocityX(140);
      }else if(this.player1.mainHitbox.body.blocked.down === true && this.knockdownLaunchedUp === true){
        this.player1.mainHitbox.setVelocityX(0);
      }

      //simple stopper so the huff puff animation plays.
      if(this.knockdownDelayPlayed === false && this.player1.mainHitbox.body.blocked.down){

        this.knockdownDelayPlayed = true;
        this.player1.setStuckVisiblity();
        this.player1.mainBodySprite5.anims.play('knockdown').once('animationcomplete', () => {
          this.knockdownDelay = true;
        });

      }

    }


    //plays sfx for player being stuck
    if(this.PlayerStuckSFXTimer === false){
      if(this.playerStuckGrabbedBy === "slime_projectile"){
        this.initSoundEffect('blueSlimeSFX','3',0.3);
        this.PlayerStuckSFXTimer = true;

        let thisScene = this;
        setTimeout(function(){
          thisScene.PlayerStuckSFXTimer = false;
        },800);
      } 
    }

   }  
  }

  //pauses enemy animations when the player is paused. calles function in enemy base class
  checkEnemyAnimationPause() {

    //pauses enemy animations when game is paused and resumes them if player is unpaused.
    this.enemys.children.each(function (tempEnemy) {
      tempEnemy.pauseAnimations(this);
    }, this);
    
  }

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
          tempSlime.damage(this.player1);
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
          tempSlime.damage(this.player1);
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
          tempSlime.damage(this.player1);
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
          tempTiger.damage(this.player1);
        
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
        tempRabbits.damage(this.player1);

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
          tempBeeDrone.damage(this.player1);
        
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
          tempBat.damage(this.player1);
        
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
          tempMimic.damage(this.player1);
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
          tempCat.damage(this.player1);

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
      if(this.objectsInRangeX(tempMushrooms,this.player1,3000) && this.objectsInRangeY(tempMushrooms,this.player1,3000) && tempMushrooms.inSafeMode === false){

        if(scene.player1.idleTimer !== 2000){
          tempMushrooms.move(scene.player1,scene);
        }else{
          tempMushrooms.moveIdle();
        }
        
        //if the mushroom is not in moving between nodes, is hiding or is in transition to be out of hiding, then allow for the mushroom to be damagedd
        if(tempMushrooms.hitboxOverlaps === true) {
          tempMushrooms.damage(this.player1);
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
          tempMushrooms.damage(this.player1);
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