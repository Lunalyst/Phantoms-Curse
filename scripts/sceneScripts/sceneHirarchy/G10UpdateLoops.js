class G10UpdateLoops extends G9CheckEnemys{

  //does the default interaction needed for the update loop. need to factor out slime interaction from this loop and make a seperate update for the slimes.
  defaultUpdate(){
    //checks to see if player has been grabbed.if not grabbed, move player and check if collisions between player and slime.
    this.checkPlayerOutOfBounds();

      //checks to see if items dropped can be picked up
      this.checkItemPickUp();

      //checks to see if containers can be opened.
      this.checkContainerPickUp();

      if(this.usingWoodenBarriers === true){
        this.checkWoodenBarriers();
      }

      if(this.usingRockPiles === true){
        this.checkRockPiles();
      }

      if(this.usingSlimeSpikes === true){
        this.checkSlimeSpikes();
      }

      if(this.usingSlimeProjectiles === true){
        this.checkSlimeProjectiles();
      }

      if(this.usingCursedHearts === true){
        this.checkCursedHeartProjectiles();
      }

      if(this.usingLocker === true){
        this.checkLocker();
      }

      //not sure what thes are for. saftey net when loading in?
      if(this.loadCoolDown === true){
        this.checkWarp(this.playerLocation);
      }
      if(this.saveCoolDown === true){
        this.checkSave(this.playerLocation);
      }
      
      if(this.signCoolDown === true){
        this.checkSign(this);
        this.checkNpc(this);
      }

      //if tab is press while the player isnt grabbed or in the pause menue then
      if(this.checkInventoryIsDown() && this.grabbed === false &&this.playerStuckGrab === false && this.pausedInTextBox === false){
        //activate inventory
        inventoryKeyEmitter.emit(inventoryKey.activateWindow,this); 
      }

      //if the player is paused in text and the delay is false then
      if(this.pausedInTextBox === true && this.gameStartedDelay === false){

        //activate the scene text box
        this.sceneTextBox.activateTextBox(this,this.keyW,this.isPaused,this.pausedInTextBox);
        //pause physics of scene
        this.physics.pause();
        //pauses the player animations
        //this.player1.pausePlayerAnimations();

        //makes a temp object
        let isWindowObject = {
          isOpen: null
        };
        
        //that is transfered to the emitter
        inventoryKeyEmitter.emit(inventoryKey.isWindowOpen,isWindowObject);

        //which we then use to see if the inventory is open.
        if(isWindowObject.isOpen === true){

          //and if its open then close the inventory.
          inventoryKeyEmitter.emit(inventoryKey.activateWindow,this);
        }

      //if we are not paused in a text box and we arnt paused , and the gameplay delay is false then.
      }else if(this.pausedInTextBox === false && this.isPaused === false && this.gameStartedDelay === false){

        //resume physics
        this.physics.resume();
        //and the player animations
        //this.player1.resumePlayerAnimations()
      }

      //if we arnt paused
      if(this.isPaused === false){

        //and the player isnt grabbed
        if(this.grabbed === false && this.playerStuckGrab === false){ 

          //and the player isnt using shift to attack
          if(!this.shift.isDown){

          //as long as thep layer isnt wapring.
          //console.log("player warping: ",this.playerWarping);
          if(this.playerWarping === false){
            // then move the player
            this.player1.movePlayer(this.keyA,this.keyD,this.space, this.player1.playerPreviousY,this);
          //otherwise kill player x velocity
          }else{
            this.player1.mainHitbox.setVelocityX(0);
            this.player1.playerIdleAnimation();
          }
          
          //cry. for lighting entity it needs to stay at the correct position so manualy do so. i hate this.
            if(this.lightingSystemActive === true){ 

              this.player1.lightSource.x = this.player1.x;
              this.player1.lightSource.y = this.player1.y;
          
            }
          }
          
          //sets the camera to follow the player and changes the scale as well
          this.mycamera.startFollow(this.player1);
          this.cameras.main.zoom = 2;
          this.cameras.main.followOffset.set(0,70);

          //call player function to see if there attacking
          this.player1.attackPlayer(this);

        //however if the player is grabbed
        }else if(this.grabbed === true || this.playerStuckGrab === true){
  
          if(this.playerStuckGrab === true){
            this.checkStuckGrab();
          }
          
          //make a temp object
          let isWindowObject = {
            isOpen: null
          };
          
          //which we pass to the emitter
          inventoryKeyEmitter.emit(inventoryKey.isWindowOpen,isWindowObject);

          //so we can check if the inventory is open
          if(isWindowObject.isOpen === true){
            //and if it is then close it.
            inventoryKeyEmitter.emit(inventoryKey.activateWindow,scene);
          }
        }
      //if we are paused
      }else if(this.isPaused === true){
        //do nothing :3
      }

      //updates the previous y value. used to animate the falling animation of the player.
      this.player1.playerPreviousY = this.player1.y;
      //update the damage cool down if player takes damage.
      
    
    }
    
    //updates enemy apart of scene in the update loop
    enemyUpdate(enemyGroupArray){
     
      //if the player opens the inventory by pressing tab, while they are not grabbed and they are not in a text box then
      if(this.checkInventoryIsDown() && this.grabbed === false && this.pausedInTextBox === false){
        //check to see if the slime animations need to be paused.
        this.checkEnemyAnimationPause();
      }else{
        this.checkEnemyAnimationPause();
      }
        
      //if we are paused in a text box then
      if(this.pausedInTextBox === true && this.gameStartedDelay === false){
        //pause enemy animations. physics is paused in defaultupdate.
        this.checkEnemyAnimationPause();
          
         
      //otherwise if these are false then
      }else if(this.pausedInTextBox === false && this.isPaused === false && this.gameStartedDelay === false){
        //resume slime animations
        this.checkEnemyAnimationPause();
      }
  
      //if the game is not paused
      if(this.isPaused === false){
          //and the player has not been grabbed
          if(this.grabbed === false){ 

            //loops through our enemy groups, and applies our interactions to these groups.
            for(let counter = 0; counter < enemyGroupArray.length;counter++){

              if(enemyGroupArray[counter] === 'blueSlimes'){
                this.checkBlueSlimeInteractions(this);
              }
              if(enemyGroupArray[counter] === 'tigers'){
                this.checkTigerInteractions(this);
              }
              if(enemyGroupArray[counter] === 'rabbits'){
                this.checkRabbitInteractions(this);
              }
              if(enemyGroupArray[counter] === 'beeDrones'){
                this.checkBeeDroneInteractions(this);
              }
              if(enemyGroupArray[counter] === 'bats'){
                this.checkBatInteractions(this);
              }
              if(enemyGroupArray[counter] === 'blueSlimeHSs'){
                this.checkBlueSlimeHSInteractions(this);
              }
              if(enemyGroupArray[counter] === 'blueSlimeHMs'){
                this.checkBlueSlimeHMInteractions(this);
              }
              if(enemyGroupArray[counter] === 'chestMimics'){
                this.checkChestMimicsInteractions(this);
              }
              if(enemyGroupArray[counter] === 'whiteCats'){
                this.checkWhiteCatInteractions(this);
              }
            }

          //otherwise if the player has been grabbed then
          }else if(this.grabbed === true){
            //stops the player from moving. saftey check if the player was attacking and then got grabbed in the attack animation.
            this.player1.mainHitbox.setVelocityX(0);
            //calls grab function.
            this.checkEnemyGrab();
          }
    
      }else if(this.isPaused === true){
    
      }
          
    } 

    //updates enemy apart of scene in the update loop
    enemyUpdateAnimationView(enemyGroupArray){
     
      //if the player opens the inventory by pressing tab, while they are not grabbed and they are not in a text box then
      if(this.checkInventoryIsDown() && this.grabbed === false && this.pausedInTextBox === false){
        //check to see if the slime animations need to be paused.
        this.checkEnemyAnimationPause();
      }else{
        this.checkEnemyAnimationPause();
      }
        
      //if we are paused in a text box then
      if(this.pausedInTextBox === true && this.gameStartedDelay === false){
        //pause enemy animations. physics is paused in defaultupdate.
        this.checkEnemyAnimationPause();
          
         
      //otherwise if these are false then
      }else if(this.pausedInTextBox === false && this.isPaused === false && this.gameStartedDelay === false){
        //resume slime animations
        this.checkEnemyAnimationPause();
      }
  
      //if the game is not paused
      if(this.isPaused === false){
          //and the player has not been grabbed
          if(this.grabbed === false){ 

            //loops through our enemy groups, and applies our interactions to these groups.
            for(let counter = 0; counter < enemyGroupArray.length;counter++){

              if(enemyGroupArray[counter] === 'blueSlimes'){
                this.checkBlueSlimeInteractions(this);
              }
              if(enemyGroupArray[counter] === 'tigers'){
                this.checkTigerInteractions(this);
              }
              if(enemyGroupArray[counter] === 'rabbits'){
                this.checkRabbitInteractions(this);
              }
              if(enemyGroupArray[counter] === 'beeDrones'){
                this.checkBeeDroneInteractions(this);
              }
              if(enemyGroupArray[counter] === 'bats'){
                this.checkBatInteractions(this);
              }
            }

          //otherwise if the player has been grabbed then
          }else if(this.grabbed === true){
            //call check function for slimes.
            this.checkEnemyGrab();
          }
    
      }else if(this.isPaused === true){
    
      }
          
    } 

}