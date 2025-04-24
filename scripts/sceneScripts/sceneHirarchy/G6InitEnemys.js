/****************************************************************************** 
description: initiation of enemys, as well as functions related to enemy
behavior.
*******************************************************************************/
class G6InitEnemys extends G5InitNPCs{

  //sets up colliders for enemys. enemys have the same colliders at the player.
  setUpEnemyCollider(enemyGroupArray){

    //array storing all the enemy groups present. currently empty
    //loop which searches array of enemys, then allocates those groups.
    for(let counter = 0; counter < enemyGroupArray.length; counter++){
      if(enemyGroupArray[counter] === 'blueSlimes'){

        console.log("adding blueSlimes group");
        this.blueSlimes = this.physics.add.group();
      }
      if(enemyGroupArray[counter] === 'tigers'){

        console.log("adding Tigers group");
        this.tigers = this.physics.add.group();
      }
      if(enemyGroupArray[counter] === 'rabbits'){

        console.log("adding rabbits group");
        this.rabbits = this.physics.add.group();
      }
      if(enemyGroupArray[counter] === 'beeDrones'){

        console.log("adding beeDrones group");
        this.beeDrones = this.physics.add.group();
      }
      if(enemyGroupArray[counter] === 'bats'){

        console.log("adding bats group");
        this.bats = this.physics.add.group();
      }
      if(enemyGroupArray[counter] === 'blueSlimeHSs'){

        console.log("adding blueSlimeHSs group");
        this.blueSlimeHSs = this.physics.add.group();
      }
      if(enemyGroupArray[counter] === 'blueSlimeHMs'){

        console.log("adding blueSlimeHMs group");
        this.blueSlimeHMs = this.physics.add.group();
      }
      if(enemyGroupArray[counter] === 'chestMimics'){

        console.log("adding chestMimics group");
        this.chestMimics = this.physics.add.group();
      }if(enemyGroupArray[counter] === 'whiteCats'){

        console.log("adding whiteCats group");
        this.whiteCats = this.physics.add.group();
      }
      if(enemyGroupArray[counter] === 'curseShadows'){
        console.log("adding curseShadows group");
        this.curseShadows = this.physics.add.group();
      }
      if(enemyGroupArray[counter] === 'earieShadow'){
        console.log("adding earieShadow group");
        this.earieShadows = this.physics.add.group();
      }

      //this.chestMimics
    }
    //creates enemys group that can apply geberic functions to all enemys
    this.enemys = this.physics.add.group();

    //this.tigers = this.physics.add.group();
    //this.blueSlimes = this.physics.add.group();
    //creates id so scene can work with multiple enemys
    this.enemyId = 0;
    this.physics.add.collider(this.processMap.layer1, this.enemys);
    this.physics.add.collider(this.processMap.layer0, this.enemys); 
  }
  
  //creates a enemy. enemytype determines what enemy is spawned
  initEnemy(startX, startY, playerSex, enemyType,inSafeMode,soundSFX) {
    console.log("enemy spawned: ",enemyType);

  
    //creates a enemy based on enemyType passed in.
    if(enemyType === 'blueSlime'){
      
      //creates a secondary group to handle enemy specific interactions which we will use later
      let slime1 = new blueSlime(this, startX, startY, playerSex,this.enemyId,inSafeMode);
      console.log("blueSlime.enemyId: ",slime1.enemyId);
      this.enemyId++;
      //adds the enemy to both groups.
      this.enemys.add(slime1);
      this.blueSlimes.add(slime1);

    }else if(enemyType === 'blueSlimeLarge'){
      
      //creates a secondary group to handle enemy specific interactions which we will use later
      let slime1 = new blueSlime(this, startX, startY, playerSex,this.enemyId,inSafeMode);
      console.log("blueSlime.enemyId: ",slime1.enemyId);
      this.enemyId++;
      slime1.slimeSize = 2;
      slime1.anims.play("slimeLargeIdle",true);
      //adds the enemy to both groups.
      this.enemys.add(slime1);
      this.blueSlimes.add(slime1);

    }else if(enemyType === 'tiger'){
      let tiger1 = new tiger(this, startX, startY, playerSex,this.enemyId,inSafeMode);
      console.log("tiger1.enemyId: ",tiger1.enemyId);
      this.enemyId++;
      this.enemys.add(tiger1);  
      this.tigers.add(tiger1);

    }else if(enemyType === 'tigerBooba'){
      let tiger1 = new tiger(this, startX, startY, playerSex,this.enemyId,inSafeMode);
      console.log("tiger1.enemyId: ",tiger1.enemyId);
      this.enemyId++;
      tiger1.tigerHasEatenRabbit = true;
      if(tiger1.enemySex ===1){
        tiger1.anims.play('tigerTummybreastSquish',true);
      }else{
        tiger1.anims.play('tigerTummyShaftStroke',true);
      }
      this.enemys.add(tiger1);  
      this.tigers.add(tiger1);

    }else if(enemyType === 'rabbit'){
      
      let rabbit1 = new rabbit(this, startX, startY, playerSex,this.enemyId,inSafeMode);
      console.log("rabbit1.enemyId: ",rabbit1.enemyId);
      this.enemyId++;
      this.enemys.add(rabbit1);  
      this.rabbits.add(rabbit1);

    }else if(enemyType === 'beeDrone'){
      
      let beeDrone1 = new beeDrone(this, startX, startY, playerSex,this.enemyId,inSafeMode,soundSFX);
      console.log("beeDrone.enemyId: ",beeDrone1.enemyId);
      this.enemyId++;
      this.enemys.add(beeDrone1);  
      this.beeDrones.add(beeDrone1);
    }else if(enemyType === 'bat'){
      console.log("inSafeMode: ",inSafeMode)
      let bat1 = new bat(this, startX, startY, playerSex,this.enemyId,inSafeMode,soundSFX);
      console.log("bat1.enemyId: ",bat1.enemyId);
      this.enemyId++;
      this.enemys.add(bat1);  
      this.bats.add(bat1);
    }else if(enemyType === 'blueSlimeHS'){
      
      //creates a secondary group to handle enemy specific interactions which we will use later
      let slime1 = new blueSlimeHS(this, startX, startY, playerSex,this.enemyId,inSafeMode);

      console.log("blueSlimeHS.enemyId: ",slime1.enemyId);
      this.enemyId++;
      //adds the enemy to both groups.
      this.enemys.add(slime1);
      this.blueSlimeHSs.add(slime1);

    }else if(enemyType === 'blueSlimeHM'){
      
      //creates a secondary group to handle enemy specific interactions which we will use later
      let slime1 = new blueSlimeHM(this, startX, startY, playerSex,this.enemyId,inSafeMode);

      console.log("blueSlimeHM.enemyId: ",slime1.enemyId);
      this.enemyId++;
      //adds the enemy to both groups.
      this.enemys.add(slime1);
      this.blueSlimeHMs.add(slime1);
    }else if(enemyType === 'chestMimic'){
      
      //creates a secondary group to handle enemy specific interactions which we will use later
      let mimic = new chestMimic(this, startX, startY, playerSex,this.enemyId,inSafeMode,soundSFX);

      console.log("mimic.enemyId: ",mimic.enemyId);
      this.enemyId++;
      //adds the enemy to both groups.
      this.enemys.add(mimic);
      this.chestMimics.add(mimic);
    }else if(enemyType === 'chestMimicAngry'){
      
      //creates a secondary group to handle enemy specific interactions which we will use later
      let mimic = new chestMimic(this, startX, startY, playerSex,this.enemyId,inSafeMode,soundSFX);
      mimic.angry = true;
      mimic.anims.play('mimicAngryIdle',true);
      console.log("mimic.enemyId: ",mimic.enemyId);
      this.enemyId++;
      //adds the enemy to both groups.
      this.enemys.add(mimic);
      this.chestMimics.add(mimic);
    }else if(enemyType === 'whiteCat'){
      
      //creates a secondary group to handle enemy specific interactions which we will use later
      let cat = new whiteCat(this, startX, startY, playerSex,this.enemyId,inSafeMode);
      console.log("cat.enemyId: ",cat.enemyId);
      this.enemyId++;
      //adds the enemy to both groups.
      this.enemys.add(cat);
      this.whiteCats.add(cat);
    }else if(enemyType === 'angryWhiteCat'){
      
      //creates a secondary group to handle enemy specific interactions which we will use later
      let cat = new whiteCat(this, startX, startY, playerSex,this.enemyId,inSafeMode);
      cat.angry = true;
      cat.anims.play('catAngryidleViewer',true);
      console.log("cat.enemyId: ",cat.enemyId);
      this.enemyId++;
      //adds the enemy to both groups.
      this.enemys.add(cat);
      this.whiteCats.add(cat);
    }else if(enemyType === 'curseShadow'){
      
      //creates a secondary group to handle enemy specific interactions which we will use later
      let shadow = new curseShadow(this, startX, startY, playerSex,this.enemyId,inSafeMode);
      
      this.enemyId++;
      //adds the enemy to both groups.
      this.enemys.add(shadow);
      this.curseShadows.add(shadow);
    }else if(enemyType === 'earieShadow'){
      //creates a secondary group to handle enemy specific interactions which we will use later
      let earieShadow = new earieShadow(this, startX, startY, playerSex,this.enemyId);
      
      this.enemyId++;
      //adds the enemy to both groups.
      this.enemys.add(earieShadow);
      this.earieShadow.add(earieShadow);
    }else{
      console.log("UNKNOWN enemyType: ",enemyType);
      /*let enemy = new enemyTemplate(this, startX, startY, playerSex,this.enemyId);
      console.log("enemy.enemyId: ",enemy.enemyId);
      this.enemyId++;
      this.enemys.add(enemy); */
    }
    
  }

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
    this.KeyDisplay.y = this.player1.y+50;

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
        if(this.enemyThatInfatuatedPlayer.angry === true){
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
        if(this.enemyThatInfatuatedPlayer.angry === true){
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
      if(this.enemyThatknockdownPlayer.flipX === true && this.player1.mainHitbox.body.blocked.down === false){
        //fling player left
        this.player1.mainHitbox.setVelocityX(-140);
      }if(this.enemyThatknockdownPlayer.flipX === false && this.player1.mainHitbox.body.blocked.down === false){
        //fling player left
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
    this.enemys.children.each(function (tempEnemy) {
      tempEnemy.pauseAnimations(this);
    }, this);
  }

  objectsInRangeX(object1,object2, width){

    if ((object1.x > object2.x - width && object1.x < object2.x + width)){
      return true;
    }else{
      return false;
    }
  }

  objectsInRangeY(object1,object2, height){

    if ((object1.y > object2.y - height && object1.y < object2.y + height)){
      return true;
    }else{
      return false;
    }
  }

  startGrabCoolDown(){
    let that = this;
    setTimeout(function () {
      that.grabCoolDown = false;
  }, 1500);
  }

  viewAnimationLogic(enemy){
    //check if the player presses w while in range   
    if(this.checkWPressed() === true){
        
      //stop the velocity of the player
      enemy.setVelocityX(0);
      enemy.setVelocityY(0);
      this.player1.mainHitbox.setVelocityX(0);
      //calls the grab function
      enemy.animationGrab();
    
      //sets the scene grab value to true since the player has been grabbed
      enemy.playerGrabbed = true;
      enemy.grabCoolDown = true;
      this.grabbed = true;
      this.grabCoolDown = true;
      enemy.safePrompts.visible = false;

    //otherwise show prompts so the player knows what button to press to enter the animation
    }else{

      //safety check to make sure that animation is played only once
      if(enemy.playedSafePrompts === false){
        enemy.safePrompts.visible = true;
        enemy.playedSafePrompts = true;
        enemy.safePrompts.playWKey();
      }
    }
  // otherwise hid the prompt from the player.
  }


  

}