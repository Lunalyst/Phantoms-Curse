/****************************************************************************** 
description: check enemy logic during gameplay. handles checks for hitboxes, 
and other collisions.
*******************************************************************************/
class G9CheckEnemys extends G8InitEnemys {

  //function keeps track of slime interactions
  checkBlueSlimeInteractions(scene) {

    //console.log("checking slime interactions");
    //applies functions to all slimes in the group.
    scene.blueSlimes.children.each(function (tempSlime) {

      //safty check to improve performance. only does overlap if in range.
      if(this.objectsInRangeX(tempSlime,this.player1,600) && this.objectsInRangeY(tempSlime,this.player1,600) && tempSlime.inSafeMode === false){
        //calls to make each instance of a slime move.
        tempSlime.move(scene.player1,scene);
        scene.physics.add.overlap(scene.attackHitBox, tempSlime, function () {
          tempSlime.hitboxOverlaps = true;
        });
        if(tempSlime.hitboxOverlaps === true) {
          console.log("slime taking damage, slime hp:" + tempSlime.slimeHp);
          tempSlime.damage(scene);
          tempSlime.hitboxOverlaps = false;
        }
        //adds collider between player and slime. then if they collide it plays the grab sequence but only if the player was not grabbed already
        scene.physics.add.overlap(scene.player1.mainHitbox, tempSlime.grabHitBox, function () {
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
            scene.player1.mainHitbox.setVelocityX(0);
            //calls the grab function
            tempSlime.grab();
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
          scene.blueSlimes.children.each(function (tempSlime1) {
            // collider used to detect a collision between two slimes
            scene.physics.add.overlap(tempSlime1, tempSlime, function () {
              // if both slimes are of size 1 then call combine function
              if (tempSlime.slimeSize === 1 && tempSlime1.slimeSize === 1) {
                tempSlime.slimeCombine(tempSlime1, scene.grabbed,scene);
              }
            });
          }, this);
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
        //calls to make each instance of a slime move.
        tempSlime.move(scene.player1,scene);
        scene.physics.add.overlap(scene.attackHitBox, tempSlime, function () {
          tempSlime.hitboxOverlaps = true;
        });
        if(tempSlime.hitboxOverlaps === true) {
          console.log("slime taking damage, slime hp:" + tempSlime.slimeHp);
          tempSlime.damage(scene);
          tempSlime.hitboxOverlaps = false;
        }
        //adds collider between player and slime. then if they collide it plays the grab sequence but only if the player was not grabbed already
        scene.physics.add.overlap(scene.player1.mainHitbox, tempSlime, function () {
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
          if (tempSlime.grabCoolDown === false && scene.grabCoolDown === false) {
            //stop the velocity of the player
            tempSlime.setVelocityX(0);
            scene.player1.mainHitbox.setVelocityX(0);
            //calls the grab function
            tempSlime.grab();
            //sets the scene grab value to true since the player has been grabbed
            // tells instance of slime that it has grabbed player
            tempSlime.playerGrabbed = true;
            tempSlime.grabCoolDown = true;
            scene.grabbed = true;
            scene.grabCoolDown = true;
            console.log('player grabbed by slime');
          }
        });
        
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
        //calls to make each instance of a slime move.
        tempSlime.move(scene.player1,scene);
        scene.physics.add.overlap(scene.attackHitBox, tempSlime, function () {
          tempSlime.hitboxOverlaps = true;
        });
        if(tempSlime.hitboxOverlaps === true) {
          console.log("slime taking damage, slime hp:" + tempSlime.slimeHp);
          tempSlime.damage(scene);
          tempSlime.hitboxOverlaps = false;
        }
        //adds collider between player and slime. then if they collide it plays the grab sequence but only if the player was not grabbed already
        scene.physics.add.overlap(scene.player1.mainHitbox, tempSlime.grabHitBox, function () {
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
          if (tempSlime.grabCoolDown === false && scene.grabCoolDown === false) {
            //stop the velocity of the player
            tempSlime.setVelocityX(0);
            scene.player1.mainHitbox.setVelocityX(0);
            //calls the grab function
            tempSlime.grab();
            //sets the scene grab value to true since the player has been grabbed
            // tells instance of slime that it has grabbed player
            tempSlime.playerGrabbed = true;
            tempSlime.grabCoolDown = true;
            scene.grabbed = true;
            scene.grabCoolDown = true;
            console.log('player grabbed by slime');
          }
        });
        
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
      //function to check rabbits and see if the tiger can grab one
      scene.rabbits.children.each(function (tempRabbit) {

        //console.log('tempTiger.isHidding: ',tempTiger.isHidding,'tempTiger.tigerHasEatenRabbit', tempTiger.tigerHasEatenRabbit);

        //protection check to see if the tiger hasn't eaten or is eating
        if(tempTiger.isHidding === false && tempTiger.tigerHasEatenRabbit === false){

          //safty check to improve performance. only does overlap if in range.
          if(scene.objectsInRangeX(tempTiger,tempRabbit,200) && scene.objectsInRangeY(tempTiger,tempRabbit,200)){
            //if the tiger isnt in the air. 
            if(tempTiger.body.blocked.down){
              
              //checks if the tiger overlaps a rabbit
              scene.physics.add.overlap(tempTiger, tempRabbit, function () {
                
                //if neither party has grabbed the player, then tiger eats the rabbit.
                if(tempTiger.playerGrabbed === false && tempRabbit.playerGrabbed === false && tempTiger.enemyDefeated === false){
                  // move the rabbits grab box out of the way just in case.
                  tempRabbit.attackHitBox.x = this.x;
                  tempRabbit.attackHitBox.y = this.y + 3000; 
                  tempRabbit.grabHitBox.x = this.x;
                  tempRabbit.grabHitBox.y = this.y + 3000;
                  tempTiger.tigerEatsRabbit(tempRabbit.enemySex);
                  tempRabbit.destroy();
                
                }   
              });
            }
          }
        }
      });
      
      if(tempTiger.enemyInDefeatedLogic === true){
        tempTiger.enemyDefeatedLogic();
      }else{
        //calls tiger function to move
        tempTiger.move(scene.player1,scene);
      }
      
      
        //checks if the attack hitbox is overlapping the tiger to deal damage.
        scene.physics.add.overlap(scene.attackHitBox, tempTiger, function () {
        
          //sets overlap to be true
          if(tempTiger.tigerIsEating === false){
            tempTiger.hitboxOverlaps = true;
          }
        });
      
        //if the hitbox overlaps the tiger, then  deal damage to that tiger
        if(tempTiger.hitboxOverlaps === true) {
        
          console.log("tiger taking damage, tiger hp:" + tempTiger.enemyHP);
        
          //inflict damage to tiger
          tempTiger.damage(scene);
        
          //clear overlap verable in tiger.
          tempTiger.hitboxOverlaps = false;
        
        }
      

      //adds collider between player and slime. then if they collide it plays the grab sequence but only if the player was not grabbed already
      scene.physics.add.overlap(scene.player1.mainHitbox, tempTiger.grabHitBox, function () {
        if(tempTiger.tigerIsEating === false){
          //make a temp object
          let isWindowObject = {
            isOpen: null
          };
          
          //that is passed into a emitter
          inventoryKeyEmitter.emit(inventoryKey.isWindowOpen,isWindowObject);
        
          //to tell if the window is open
          if (isWindowObject.isOpen === true) {
            //and if it is, then close the window
            inventoryKeyEmitter.emit(inventoryKey.activateWindow,scene);
            
          }
          
        
          //console.log("tempSlime.grabCoolDown:"+tempSlime.grabCoolDown+"scene.grabCoolDown === 0"+scene.grabCoolDown)
          //if the grab cooldowns are clear then
          if (tempTiger.grabCoolDown === false && scene.grabCoolDown === false && tempTiger.isHidding === false) {
            
            console.log(" grabing the player?");
            //stop the velocity of the player
            tempTiger.setVelocityX(0);
            scene.player1.mainHitbox.setVelocityX(0);
            //calls the grab function
            tempTiger.grab();
          
            //sets the scene grab value to true since the player has been grabbed
            tempTiger.playerGrabbed = true;
            tempTiger.grabCoolDown = true;
            scene.grabbed = true;
            scene.grabCoolDown = true;
            console.log('player grabbed by tiger');
        
          }
        }
        
      });
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
        //calls tiger function to move
        tempRabbits.move(scene.player1,scene);
      }

      //checks if the attack hitbox is overlapping the tiger to deal damage.
      scene.physics.add.overlap(scene.attackHitBox, tempRabbits, function () {
      
        //sets overlap to be true
        tempRabbits.hitboxOverlaps = true;
      });
      
      //if the hitbox overlaps the tiger, then  deal damage to that tiger
      if(tempRabbits.hitboxOverlaps === true) {
      
        console.log("tiger taking damage, tiger hp:" + tempRabbits.enemyHP);
      
        //inflict damage to tiger
        tempRabbits.damage(scene);

        tempRabbits.setVelocityX(0);
      
        //clear overlap verable in tiger.
        tempRabbits.hitboxOverlaps = false;
      
      }
      //adds collider between player and rabbit. then if they collide it plays the grab sequence but only if the player was not grabbed already
      scene.physics.add.overlap(scene.player1.mainHitbox, tempRabbits.grabHitBox, function () {
      
        //make a temp object
        let isWindowObject = {
          isOpen: null
        };
        
        //that is passed into a emitter
        inventoryKeyEmitter.emit(inventoryKey.isWindowOpen,isWindowObject);
      
        //to tell if the window is open
        if (isWindowObject.isOpen === true) {
          //and if it is, then close the window
          inventoryKeyEmitter.emit(inventoryKey.activateWindow,scene);
          
        }
        
      
        //console.log("tempSlime.grabCoolDown:"+tempSlime.grabCoolDown+"scene.grabCoolDown === 0"+scene.grabCoolDown)
        //if the grab cooldowns are clear then
        if (tempRabbits.grabCoolDown === false && scene.grabCoolDown === false) {
          
          console.log(" grabing the player?");
          //stop the velocity of the player
          tempRabbits.setVelocityX(0);
          scene.player1.mainHitbox.setVelocityX(0);
          //calls the grab function
          tempRabbits.grab();
        
          //sets the scene grab value to true since the player has been grabbed
          tempRabbits.playerGrabbed = true;
          tempRabbits.grabCoolDown = true;
          scene.grabbed = true;
          scene.grabCoolDown = true;
          console.log('player grabbed by tempRabbits');
      
        }
      });

      //attack hitbox logic
        scene.physics.add.overlap(scene.player1.mainHitbox, tempRabbits.attackHitBox, function () {
          let isWindowObject = {
            isOpen: null
          };
        
          inventoryKeyEmitter.emit(inventoryKey.isWindowOpen,isWindowObject);

          if (isWindowObject.isOpen === true) {
            inventoryKeyEmitter.emit(inventoryKey.activateWindow,scene);
            //scene.playerInventory.setView(scene);
          }

          //apply stuckgrab logic.
          scene.playerStuckGrab = true;
          scene.playerStuckGrabbedBy = "knockdown";
          scene.playerStuckGrabCap = 40;
          scene.enemyThatknockdownPlayer = tempRabbits;

        });
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
        tempBeeDrone.move(scene.player1,scene);
        
        //checks if the attack hitbox is overlapping the beedrone to deal damage.
        scene.physics.add.overlap(scene.attackHitBox, tempBeeDrone, function () {
        
          //sets overlap to be true 
          tempBeeDrone.hitboxOverlaps = true;
        });
        
        //if the hitbox overlaps the drone, then  deal damage to that drone
        if(tempBeeDrone.hitboxOverlaps === true) {
        
          console.log("beeDrone taking damage, beedrone hp:" + tempBeeDrone.enemyHP);
        
          //inflict damage to tiger
          tempBeeDrone.damage(scene);
        
          //clear overlap verable in tiger.
          tempBeeDrone.hitboxOverlaps = false;
        
        }
      //if the bat is trying to grab the player then check overlap
    if(tempBeeDrone.grabTimer === true){

      //checks to see if the beedrones attack hitbox overlaps the players hitbox
      scene.physics.add.overlap(scene.player1.mainHitbox, tempBeeDrone.grabHitBox, function () {
      
        //make a temp object
        let isWindowObject = {
          isOpen: null
        };
        
        //that is passed into a emitter
        inventoryKeyEmitter.emit(inventoryKey.isWindowOpen,isWindowObject);
      
        //to tell if the window is open
        if (isWindowObject.isOpen === true) {
          //and if it is, then close the window
          inventoryKeyEmitter.emit(inventoryKey.activateWindow,scene);
          
        }
        
      
        //console.log("tempSlime.grabCoolDown:"+tempSlime.grabCoolDown+"scene.grabCoolDown === 0"+scene.grabCoolDown)
        //if the grab cooldowns are clear then
        if (tempBeeDrone.grabCoolDown === false && scene.grabCoolDown === false) {
          
          console.log(" grabing the player?");
          //stop the velocity of the player
          tempBeeDrone.setVelocityX(0);
          tempBeeDrone.setVelocityY(0);
          scene.player1.mainHitbox.setVelocityX(0);
          //calls the grab function
          tempBeeDrone.grab();
        
          //sets the scene grab value to true since the player has been grabbed
          tempBeeDrone.playerGrabbed = true;
          tempBeeDrone.grabCoolDown = true;
          scene.grabbed = true;
          scene.grabCoolDown = true;
          console.log('player grabbed by tempBeeDrone');
      
        }
      });
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

   //function keeps track of beeDrones interactions
   checkBatInteractions(scene) {
    
    //applys a function to all tigers
    scene.bats.children.each(function (bat) {
    
    //safty check to improve performance. only does overlap if in range.
    //console.log('bat.inSafeMode: ',bat.inSafeMode);
    if(this.objectsInRangeX(bat,scene.player1,450) && bat.inSafeMode === false ){

      if(bat.enemyInDefeatedLogic === true){
        bat.enemyDefeatedLogic();
      }else{
        bat.move(scene.player1,scene);
      }
      //if player is attacking
      if(this.player1.isAttacking === true){
        //checks if the attack hitbox is overlapping the beedrone to deal damage.
        scene.physics.add.overlap(scene.attackHitBox, bat, function () {
        
          //sets overlap to be true 
          bat.hitboxOverlaps = true;
        });
        
        //if the hitbox overlaps the drone, then  deal damage to that drone
        if(bat.hitboxOverlaps === true) {
        
          //inflict damage to tiger
          bat.damage(scene);
        
          //clear overlap verable in tiger.
          bat.hitboxOverlaps = false;
        }
      }
      
      //if the bat is trying to grab the player then check overlap
      if(bat.grabTimer === true){
        //checks to see if the beedrones attack hitbox overlaps the players hitbox
        scene.physics.add.overlap(scene.player1.mainHitbox, bat.grabHitBox, function () {
          
          //make a temp object
          let isWindowObject = {
            isOpen: null
          };
          
          //that is passed into a emitter
          inventoryKeyEmitter.emit(inventoryKey.isWindowOpen,isWindowObject);
        
          //to tell if the window is open
          if (isWindowObject.isOpen === true) {
            //and if it is, then close the window
            inventoryKeyEmitter.emit(inventoryKey.activateWindow,scene);
            
          }
          
        
          //console.log("tempSlime.grabCoolDown:"+tempSlime.grabCoolDown+"scene.grabCoolDown === 0"+scene.grabCoolDown)
          //if the grab cooldowns are clear then
          if (bat.grabCoolDown === false && scene.grabCoolDown === false) {
            
            console.log(" grabing the player?");
            //stop the velocity of the player
            bat.setVelocityX(0);
            bat.setVelocityY(0);
            scene.player1.mainHitbox.setVelocityX(0);
            //calls the grab function
            bat.grab();
          
            //sets the scene grab value to true since the player has been grabbed
            bat.playerGrabbed = true;
            bat.grabCoolDown = true;
            scene.grabbed = true;
            scene.grabCoolDown = true;
            console.log('player grabbed by bat');
        
          }
        });
      }
      
    //if the bat is in safe mode, and in range of the player then 
    }else if(this.objectsInRangeX(bat,scene.player1,30) && this.objectsInRangeY(bat,scene.player1,30)){
      
      this.viewAnimationLogic(bat);

    // otherwise hid the prompt from the player.
    }else{
      bat.safePrompts.visible = false;
      bat.playedSafePrompts = false;
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
        tempMimic.move(scene.player1,scene);

        //damage fuctions
        scene.physics.add.overlap(scene.attackHitBox, tempMimic, function () {
          tempMimic.hitboxOverlaps = true;
        });

        if(tempMimic.hitboxOverlaps === true) {
          console.log("mimic taking damage, mimic hp:" + tempMimic.enemyHP);
          tempMimic.damage(scene);
          tempMimic.hitboxOverlaps = false;

          //if the mimic is attacked then set the value so it can jump out and get angry.
          tempMimic.attacked = true;
        }

        //adds collider between player and mimic attack hitbox. then if they collide it plays the grab sequence but only if the player was not grabbed already
        scene.physics.add.overlap(scene.player1.mainHitbox, tempMimic.grabHitBox, function () {
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
          if (tempMimic.grabCoolDown === false && scene.grabCoolDown === false) {
            //stop the velocity of the player
            tempMimic.setVelocityX(0);
            scene.player1.mainHitbox.setVelocityX(0);
            //calls the grab function
            tempMimic.grab();
            //sets the scene grab value to true since the player has been grabbed
            // tells instance of slime that it has grabbed player
            tempMimic.playerGrabbed = true;
            tempMimic.grabCoolDown = true;
            scene.grabbed = true;
            scene.grabCoolDown = true;
            console.log('player grabbed by slime');
          }
        });
        
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
        tempCat.move(scene.player1,scene);
        scene.physics.add.overlap(scene.attackHitBox, tempCat, function () {
          tempCat.hitboxOverlaps = true;
        });
        if(tempCat.hitboxOverlaps === true) {
          tempCat.damage(scene);
          tempCat.hitboxOverlaps = false;
        }

        //adds collider between player and slime. then if they collide it plays the grab sequence but only if the player was not grabbed already
        scene.physics.add.overlap(scene.player1.mainHitbox, tempCat.grabHitBox, function () {
          let isWindowObject = {
            isOpen: null
          };
        
          inventoryKeyEmitter.emit(inventoryKey.isWindowOpen,isWindowObject);

          if (isWindowObject.isOpen === true) {
            inventoryKeyEmitter.emit(inventoryKey.activateWindow,scene);
            //scene.playerInventory.setView(scene);
          }

          if (tempCat.grabCoolDown === false && scene.grabCoolDown === false) {
            //stop the velocity of the player
            tempCat.setVelocityX(0);
            scene.player1.mainHitbox.setVelocityX(0);
            //calls the grab function
            tempCat.grab();
            //sets the scene grab value to true since the player has been grabbed
            // tells instance of slime that it has grabbed player
            tempCat.grabCoolDown = true;
            tempCat.playerGrabbed = true;
            scene.grabbed = true;
            scene.grabCoolDown = true;
            console.log('player grabbed by cat');
          }
        });

        //attack hitbox logic
        scene.physics.add.overlap(scene.player1.mainHitbox, tempCat.attackHitBox, function () {
          let isWindowObject = {
            isOpen: null
          };
        
          inventoryKeyEmitter.emit(inventoryKey.isWindowOpen,isWindowObject);

          if (isWindowObject.isOpen === true) {
            inventoryKeyEmitter.emit(inventoryKey.activateWindow,scene);
            //scene.playerInventory.setView(scene);
          }

          //apply stuckgrab logic.
          scene.playerStuckGrab = true;
          scene.playerStuckGrabbedBy = "knockdown";
          scene.playerStuckGrabCap = 40;
          scene.enemyThatknockdownPlayer = tempCat;

        });
        
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
        //calls to make each instance of a slime move.
        tempShadows.move(scene.player1,scene);

        //adds collider between player and slime. then if they collide it plays the grab sequence but only if the player was not grabbed already
        scene.physics.add.overlap(scene.player1.mainHitbox, tempShadows.grabHitBox, function () {
          let isWindowObject = {
            isOpen: null
          };
        
          inventoryKeyEmitter.emit(inventoryKey.isWindowOpen,isWindowObject);

          if (isWindowObject.isOpen === true) {
            inventoryKeyEmitter.emit(inventoryKey.activateWindow,scene);
            //scene.playerInventory.setView(scene);
          }

          if (tempShadows.grabCoolDown === false && scene.grabCoolDown === false && scene.player1.lanturnFlicker === null) {
            //stop the velocity of the player
            tempShadows.setVelocityX(0);
            scene.player1.mainHitbox.setVelocityX(0);
            //calls the grab function
            tempShadows.grab();
            //sets the scene grab value to true since the player has been grabbed
            // tells instance of slime that it has grabbed player
            tempShadows.grabCoolDown = true;
            tempShadows.playerGrabbed = true;
            scene.grabbed = true;
            scene.grabCoolDown = true;
            console.log('player grabbed by shadow');
          }
        });
       
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

        //adds collider between player and slime. then if they collide it plays the grab sequence but only if the player was not grabbed already
        scene.physics.add.overlap(scene.player1.mainHitbox, tempShadows.grabHitBox, function () {
          let isWindowObject = {
            isOpen: null
          };
        
          inventoryKeyEmitter.emit(inventoryKey.isWindowOpen,isWindowObject);

          if (isWindowObject.isOpen === true) {
            inventoryKeyEmitter.emit(inventoryKey.activateWindow,scene);
            //scene.playerInventory.setView(scene);
          }

          if (tempShadows.grabCoolDown === false && scene.grabCoolDown === false && scene.player1.lanturnFlicker === null) {
            //stop the velocity of the player
            tempShadows.setVelocityX(0);
            scene.player1.mainHitbox.setVelocityX(0);
            //calls the grab function
            tempShadows.grab();
            //sets the scene grab value to true since the player has been grabbed
            // tells instance of slime that it has grabbed player
            tempShadows.grabCoolDown = true;
            tempShadows.playerGrabbed = true;
            scene.grabbed = true;
            scene.grabCoolDown = true;
            console.log('player grabbed by shadow');
          }
        });
       
      // creates a overlap between the damage hitbox and the slime so that slime can take damage
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

  

}