/****************************************************************************** 
description: initiation of enemys, as well as functions related to enemy
behavior.
*******************************************************************************/
class G8InitEnemys extends G7EnemyCollisions{
  
  //sets up enemy init functions to be called.
  setUpInitEnemyFunctions(){

    let tempSceneRef = this;

    this.mapOfInitEnemyFunctions = {
      blueSlime: function blueSlimeFunction(startX, startY, playerSex,inSafeMode,soundSFX) {
        let slime1 = new blueSlime(tempSceneRef, startX, startY, playerSex,tempSceneRef.enemyId,inSafeMode);
        console.log("created blue slime small id: ",slime1.enemyId);
        tempSceneRef.enemyId++;
        tempSceneRef.enemys.add(slime1);
        tempSceneRef.blueSlimes.add(slime1);

        if(inSafeMode === false){

          //overlap function for slime being attacked
          let collider = tempSceneRef.physics.add.overlap(tempSceneRef.attackHitBox, slime1, function () {
            slime1.hitboxOverlaps = true;
          });

          slime1.addColliderRef(collider);

          //overlap function for slime grabbing player.
          collider = tempSceneRef.physics.add.overlap(tempSceneRef.player1.mainHitbox, slime1.grabHitBox, function () {
            let isWindowObject = {
              isOpen: null
            };
            
            inventoryKeyEmitter.emit(inventoryKey.isWindowOpen,isWindowObject);

            if (isWindowObject.isOpen === true) {
              inventoryKeyEmitter.emit(inventoryKey.activateWindow,tempSceneRef);
            }

            if (slime1.grabCoolDown === false && slime1.mitosing === false && tempSceneRef.grabCoolDown === false) {
              //stop the velocity of the player
              slime1.setVelocityX(0);
              tempSceneRef.player1.mainHitbox.setVelocityX(0);
              //calls the grab function
              slime1.grab();
              //sets the scene grab value to true since the player has been grabbed
              // tells instance of slime that it has grabbed player
              slime1.playerGrabbed = true;
              slime1.grabCoolDown = true;
              tempSceneRef.grabbed = true;
              tempSceneRef.grabCoolDown = true;
              console.log('player grabbed by slime');
            }
          });

          slime1.addColliderRef(collider);

          //special slime functionality overlap with eachother so they can combine.
            tempSceneRef.blueSlimes.children.each(function (tempSlime1) {
              // collider used to detect a collision between two slimes
              collider = tempSceneRef.physics.add.overlap(tempSlime1, slime1, function () {
                // if both slimes are of size 1 then call combine function
                console.log("slime1: ",slime1.slimeSize, " tempSlime1: ",tempSlime1.slimeSize)
                if (slime1.slimeSize === 1 && tempSlime1.slimeSize === 1) {
                  slime1.slimeCombine(tempSlime1, tempSceneRef.grabbed);
                }
              });
            }, this);

          slime1.addColliderRef(collider);
        }

        

      },
      blueSlimeLarge: function blueSlimeLargeFunction(startX, startY, playerSex,inSafeMode,soundSFX) {

        let slime1 = new blueSlime(tempSceneRef, startX, startY, playerSex,tempSceneRef.enemyId,inSafeMode);
        console.log("created blue slime large id: ",slime1.enemyId);
        tempSceneRef.enemyId++;
        slime1.slimeSize = 2;
        slime1.anims.play("slimeLargeIdle",true);
        tempSceneRef.enemys.add(slime1);
        tempSceneRef.blueSlimes.add(slime1);

        if(inSafeMode === false){
          //overlap function for slime being attacked
          let collider = tempSceneRef.physics.add.overlap(tempSceneRef.attackHitBox, slime1, function () {
            slime1.hitboxOverlaps = true;
          });

          slime1.addColliderRef(collider);

          //overlap function for slime grabbing player.
          collider = tempSceneRef.physics.add.overlap(tempSceneRef.player1.mainHitbox, slime1.grabHitBox, function () {
            let isWindowObject = {
              isOpen: null
            };
            
            inventoryKeyEmitter.emit(inventoryKey.isWindowOpen,isWindowObject);

            if (isWindowObject.isOpen === true) {
              inventoryKeyEmitter.emit(inventoryKey.activateWindow,tempSceneRef);
            }

            if (slime1.grabCoolDown === false && slime1.mitosing === false && tempSceneRef.grabCoolDown === false) {
              //stop the velocity of the player
              slime1.setVelocityX(0);
              tempSceneRef.player1.mainHitbox.setVelocityX(0);
              //calls the grab function
              slime1.grab();
              //sets the scene grab value to true since the player has been grabbed
              // tells instance of slime that it has grabbed player
              slime1.playerGrabbed = true;
              slime1.grabCoolDown = true;
              tempSceneRef.grabbed = true;
              tempSceneRef.grabCoolDown = true;
              console.log('player grabbed by slime');
            }
          });

          slime1.addColliderRef(collider);
      }

      },
      tiger: function tigerFunction(startX, startY, playerSex,inSafeMode,soundSFX) {

        let tempTiger = new tiger(tempSceneRef, startX, startY, playerSex,tempSceneRef.enemyId,inSafeMode);
        console.log("created tiger id: ",tempTiger.enemyId);
        tempSceneRef.enemyId++;
        tempSceneRef.enemys.add(tempTiger);  
        tempSceneRef.tigers.add(tempTiger);

        if(inSafeMode === false){
          //checks if the attack hitbox is overlapping the tiger to deal damage.
          let collider = tempSceneRef.physics.add.overlap(tempSceneRef.attackHitBox, tempTiger, function () {
          
            //sets overlap to be true
            if(tempTiger.tigerIsEating === false){
              tempTiger.hitboxOverlaps = true;
            }
          });

          tempTiger.addColliderRef(collider);

          //apply overlap  to all rabbits. note, need to spawn tigers after rabbits, otherwise collider will not be applied to rabbits.
          tempSceneRef.rabbits.children.each(function (tempRabbit) {

            //where this tiger and the rabbit have a overlap.
             collider = tempSceneRef.physics.add.overlap(tempTiger, tempRabbit, function () {

            //protection check to see if the tiger hasn't eaten or is eating
            if(tempTiger.isHidding === false && tempTiger.tigerHasEatenRabbit === false){

                //if the tiger isnt in the air. 
                if(tempTiger.body.blocked.down){
                  
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
                }
            }
          });
        });

        tempTiger.addColliderRef(collider);

        //adds collider between player and slime. then if they collide it plays the grab sequence but only if the player was not grabbed already
        collider = tempSceneRef.physics.add.overlap(tempSceneRef.player1.mainHitbox, tempTiger.grabHitBox, function () {
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
              inventoryKeyEmitter.emit(inventoryKey.activateWindow,tempSceneRef);
              
            }
            
            //if the grab cooldowns are clear then
            if (tempTiger.grabCoolDown === false && tempSceneRef.grabCoolDown === false && tempTiger.isHidding === false) {
              
              console.log(" grabing the player?");
              //stop the velocity of the player
              tempTiger.setVelocityX(0);
              tempSceneRef.player1.mainHitbox.setVelocityX(0);
              //calls the grab function
              tempTiger.grab();
            
              //sets the scene grab value to true since the player has been grabbed
              tempTiger.playerGrabbed = true;
              tempTiger.grabCoolDown = true;
              tempSceneRef.grabbed = true;
              tempSceneRef.grabCoolDown = true;
              console.log('player grabbed by tiger');
          
            }
          }
          
        });

        tempTiger.addColliderRef(collider);
       }

      },
      tigerBooba: function tigerBoobaFunction(startX, startY, playerSex, inSafeMode,soundSFX) {
        let tiger1 = new tiger(tempSceneRef, startX, startY, playerSex,tempSceneRef.enemyId,inSafeMode);
        console.log("created tiger ate rabbit id:",tiger1.enemyId);
        tempSceneRef.enemyId++;
        tiger1.tigerHasEatenRabbit = true;
        if(tiger1.enemySex ===1){
          tiger1.anims.play('tigerTummybreastSquish',true);
        }else{
          tiger1.anims.play('tigerTummyShaftStroke',true);
        }
        tempSceneRef.enemys.add(tiger1);  
        tempSceneRef.tigers.add(tiger1);

      },
      rabbit: function rabbitFunction(startX, startY, playerSex,inSafeMode,soundSFX) {
        let tempRabbits = new rabbit(tempSceneRef, startX, startY, playerSex,tempSceneRef.enemyId,inSafeMode);
        console.log("created rabbit id: ",tempRabbits.enemyId);
        tempSceneRef.enemyId++;
        tempSceneRef.enemys.add(tempRabbits);  
        tempSceneRef.rabbits.add(tempRabbits);

        if(inSafeMode === false){
          //checks if the attack hitbox is overlapping the rabbit to deal damage.
          let collider = tempSceneRef.physics.add.overlap(tempSceneRef.attackHitBox, tempRabbits, function () {
          
            //sets overlap to be true
            tempRabbits.hitboxOverlaps = true;
          });
          tempRabbits.addColliderRef(collider);

          //adds collider between player and rabbit. then if they collide it plays the grab sequence but only if the player was not grabbed already
           collider = tempSceneRef.physics.add.overlap(tempSceneRef.player1.mainHitbox, tempRabbits.grabHitBox, function () {
          
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
            
            //if the grab cooldowns are clear then
            if (tempRabbits.grabCoolDown === false && tempSceneRef.grabCoolDown === false) {
              
              console.log(" grabing the player?");
              //stop the velocity of the player
              tempRabbits.setVelocityX(0);
              tempSceneRef.player1.mainHitbox.setVelocityX(0);
              //calls the grab function
              tempRabbits.grab();
            
              //sets the scene grab value to true since the player has been grabbed
              tempRabbits.playerGrabbed = true;
              tempRabbits.grabCoolDown = true;
              tempSceneRef.grabbed = true;
              tempSceneRef.grabCoolDown = true;
              console.log('player grabbed by tempRabbits');
          
            }
          });

          tempRabbits.addColliderRef(collider);

          //attack hitbox logic
          collider = tempSceneRef.physics.add.overlap(tempSceneRef.player1.mainHitbox, tempRabbits.attackHitBox, function () {
              let isWindowObject = {
                isOpen: null
              };
            
              inventoryKeyEmitter.emit(inventoryKey.isWindowOpen,isWindowObject);

              if (isWindowObject.isOpen === true) {
                inventoryKeyEmitter.emit(inventoryKey.activateWindow,tempSceneRef);
              }

              //apply stuckgrab logic.
              tempSceneRef.playerStuckGrab = true;
              tempSceneRef.playerStuckGrabbedBy = "knockdown";
              tempSceneRef.playerStuckGrabCap = 40;
              tempSceneRef.enemyThatknockdownPlayer = tempRabbits;

          });
          tempRabbits.addColliderRef(collider);

        }
       
      },
      rabbitHungry: function rabbitFunction(startX, startY, playerSex,inSafeMode,soundSFX) {
        let tempRabbits = new rabbit(tempSceneRef, startX, startY, playerSex,tempSceneRef.enemyId,inSafeMode);
        console.log("created rabbit id: ",tempRabbits.enemyId);
        tempRabbits.rabbitIsHungry = true;
        tempRabbits.rabbitIsHungryStart = true;
        tempRabbits.anims.play('rabbitHungerIdleLoop',tempSceneRef);
        tempSceneRef.enemyId++;
        tempSceneRef.enemys.add(tempRabbits);  
        tempSceneRef.rabbits.add(tempRabbits);

      },
      beeDrone: function beeDroneFunction(startX, startY, playerSex,inSafeMode,soundSFX) {

        let tempBeeDrone = new beeDrone(tempSceneRef, startX, startY, playerSex,tempSceneRef.enemyId,inSafeMode,'wingFlapSFX'+tempSceneRef.enemyId);
        console.log("created beeDrone id: ",tempBeeDrone.enemyId);
        tempSceneRef.enemyId++;
        tempSceneRef.enemys.add(tempBeeDrone);  
        tempSceneRef.beeDrones.add(tempBeeDrone);

        if(inSafeMode === false){
          //checks if the attack hitbox is overlapping the beedrone to deal damage.
          let collider = tempSceneRef.physics.add.overlap(tempSceneRef.attackHitBox, tempBeeDrone, function () {
          
            //sets overlap to be true 
            tempBeeDrone.hitboxOverlaps = true;
          });
          tempBeeDrone.addColliderRef(collider);

          //checks to see if the beedrones attack hitbox overlaps the players hitbox
          collider = tempSceneRef.physics.add.overlap(tempSceneRef.player1.mainHitbox, tempBeeDrone.grabHitBox, function () {
            if(tempBeeDrone.grabTimer === true){
              //make a temp object
              let isWindowObject = {
                isOpen: null
              };
              
              //that is passed into a emitter
              inventoryKeyEmitter.emit(inventoryKey.isWindowOpen,isWindowObject);
            
              //to tell if the window is open
              if (isWindowObject.isOpen === true) {
                //and if it is, then close the window
                inventoryKeyEmitter.emit(inventoryKey.activateWindow,tempSceneRef);
                
              }
              
              //if the grab cooldowns are clear then
              if (tempBeeDrone.grabCoolDown === false && tempSceneRef.grabCoolDown === false) {
                
                console.log(" grabing the player?");
                //stop the velocity of the player
                tempBeeDrone.setVelocityX(0);
                tempBeeDrone.setVelocityY(0);
                tempSceneRef.player1.mainHitbox.setVelocityX(0);
                //calls the grab function
                tempBeeDrone.grab();
              
                //sets the scene grab value to true since the player has been grabbed
                tempBeeDrone.playerGrabbed = true;
                tempBeeDrone.grabCoolDown = true;
                tempSceneRef.grabbed = true;
                tempSceneRef.grabCoolDown = true;
                console.log('player grabbed by tempBeeDrone');
            
              }
            }
          });
          tempBeeDrone.addColliderRef(collider);
        }
      },
      bat: function batFunction(startX, startY, playerSex,inSafeMode) {
         
        let tempBat = new bat(tempSceneRef, startX, startY, playerSex,tempSceneRef.enemyId,inSafeMode,'wingFlapSFX'+tempSceneRef.enemyId);
        console.log("created bat id: ",tempBat.enemyId);
        tempSceneRef.enemyId++;
        tempSceneRef.enemys.add(tempBat);  
        tempSceneRef.bats.add(tempBat);

        if(inSafeMode === false){
          let collider = tempSceneRef.physics.add.overlap(tempSceneRef.attackHitBox, tempBat, function () {
          
            //sets overlap to be true 
            tempBat.hitboxOverlaps = true;

          });
          tempBat.addColliderRef(collider);

          //collider for when the player is the target.
          let collider1 = tempSceneRef.physics.add.overlap(tempSceneRef.player1.mainHitbox, tempBat.grabHitBox, function () {
            console.log("activating bat attack overlap")
            if(tempBat.targetString === "player"){
              //make a temp object
              let isWindowObject = {
                isOpen: null
              };
              
              //that is passed into a emitter
              inventoryKeyEmitter.emit(inventoryKey.isWindowOpen,isWindowObject);
            
              //to tell if the window is open
              if (isWindowObject.isOpen === true) {
                //and if it is, then close the window
                inventoryKeyEmitter.emit(inventoryKey.activateWindow,tempSceneRef);
                
              }
              
              //if the grab cooldowns are clear then
              if (tempBat.grabCoolDown === false && tempSceneRef.grabCoolDown === false) {
                
                console.log(" grabing the player?");
                //stop the velocity of the player
                tempBat.setVelocityX(0);
                tempBat.setVelocityY(0);
                tempSceneRef.player1.mainHitbox.setVelocityX(0);
                //calls the grab function
                tempBat.grab();
              
                //sets the scene grab value to true since the player has been grabbed
                tempBat.playerGrabbed = true;
                tempBat.grabCoolDown = true;
                tempSceneRef.grabbed = true;
                tempSceneRef.grabCoolDown = true;
                console.log('player grabbed by bat');
            
              }
            }
          });
          tempBat.addColliderRef(collider1);

          //attack hitbox logic for player
          let collider2 = tempSceneRef.physics.add.overlap(tempSceneRef.player1.mainHitbox, tempBat.attackHitBox, function () {

            if(tempBat.targetString === "player" ){
              let isWindowObject = {
                isOpen: null
              };
            
              inventoryKeyEmitter.emit(inventoryKey.isWindowOpen,isWindowObject);

              if (isWindowObject.isOpen === true) {
                inventoryKeyEmitter.emit(inventoryKey.activateWindow,scene);
                //scene.playerInventory.setView(scene);
              }

              //apply stuckgrab logic.
              tempSceneRef.playerStuckGrab = true;
              tempSceneRef.playerStuckGrabbedBy = "knockdown";
              tempSceneRef.playerStuckGrabCap = 40;
              tempSceneRef.enemyThatknockdownPlayer = tempBat;
            }

          });
          tempBat.addColliderRef(collider2);

          if(tempSceneRef.whiteCats !== undefined){
            tempSceneRef.whiteCats.children.each(function (tempCat) {
              let collider3 = tempSceneRef.physics.add.overlap(tempCat, tempBat.grabHitBox, function () {
                  //console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
                    if(tempBat.targetString === "whitecat"){
                        if(tempBat.playerGrabbed === false && tempCat.playerGrabbed === false && tempBat.enemyDefeated === false){
                          // move the bats grab box out of the way just in case.
                          tempCat.attackHitBox.x = this.x;
                          tempCat.attackHitBox.y = this.y + 3000; 
                          tempCat.grabHitBox.x = this.x;
                          tempCat.grabHitBox.y = this.y + 3000;

                          //call logic for bat to eat
                          tempBat.batEatsCat(tempCat.enemySex);
              
                          //"destroy" cat. just hide them. if we destroy them, then it breaks inivisble barrier collision. 
                          tempCat.visible = true;
                          tempCat.enemyInDefeatedLogic = true;
                          
                          //set a variable apart of the cat to true so the function in G8enemy.js can free the player ofthe infatuated state as the target is no longer valid to follow. 
                          tempCat.eaten = true;

                          console.log("bat.target: ", tempCat);

                          //set bat target to player.
                          tempBat.targetString = "player";
                          tempBat.target = this.player1;
                      
                      }   
                    }
                    
              });
              tempBat.addColliderRef(collider3);
            });
          }
          
        }

      },
      batFed: function batFedFunction(startX, startY, playerSex,inSafeMode) {
       
        let tempBat = new bat(tempSceneRef, startX, startY, playerSex,tempSceneRef.enemyId,inSafeMode,'wingFlapSFX'+tempSceneRef.enemyId);
        tempBat.batHasEatenCat = true;
        tempBat.anims.play('batFatTemptingLookLoop',true);
        console.log("created bat id: ",tempBat.enemyId);
        tempSceneRef.enemyId++;
        tempSceneRef.enemys.add(tempBat);  
        tempSceneRef.bats.add(tempBat);
      },
      blueSlimeHS: function blueSlimeHSFunction(startX, startY, playerSex,inSafeMode,soundSFX) {
        let tempSlime = new blueSlimeHS(tempSceneRef, startX, startY, playerSex,tempSceneRef.enemyId,inSafeMode);
        console.log("created blueSlimeHS id: ",tempSlime.enemyId);
        tempSceneRef.enemyId++;
        tempSceneRef.enemys.add(tempSlime);
        tempSceneRef.blueSlimeHSs.add(tempSlime);

        if(inSafeMode === false){

          let collider = tempSceneRef.physics.add.overlap( tempSceneRef.attackHitBox, tempSlime, function () {
            tempSlime.hitboxOverlaps = true;
          });
          tempSlime.addColliderRef(collider);

          //adds collider between player and slime. then if they collide it plays the grab sequence but only if the player was not grabbed already
          let collider1 = tempSceneRef.physics.add.overlap(tempSceneRef.player1.mainHitbox, tempSlime, function () {
            let isWindowObject = {
              isOpen: null
            };
            
            inventoryKeyEmitter.emit(inventoryKey.isWindowOpen,isWindowObject);

            if (isWindowObject.isOpen === true) {
              inventoryKeyEmitter.emit(inventoryKey.activateWindow,tempSceneRef);
              //scene.playerInventory.setView(scene);
            }
            //console.log("player overlaps slime");
            //checks if the slimes grab cool down is zero and that it isnt in the mitosis animation
            //console.log("tempSlime.grabCoolDown:"+tempSlime.grabCoolDown+"scene.grabCoolDown === 0"+scene.grabCoolDown)
            if (tempSlime.grabCoolDown === false && tempSceneRef.grabCoolDown === false) {
              //stop the velocity of the player
              tempSlime.setVelocityX(0);
              tempSceneRef.player1.mainHitbox.setVelocityX(0);
              //calls the grab function
              tempSlime.grab();
              //sets the scene grab value to true since the player has been grabbed
              // tells instance of slime that it has grabbed player
              tempSlime.playerGrabbed = true;
              tempSlime.grabCoolDown = true;
              tempSceneRef.grabbed = true;
              tempSceneRef.grabCoolDown = true;
              console.log('player grabbed by slime');
            }
          });
          tempSlime.addColliderRef(collider1);

        }

      },
      blueSlimeHM: function blueSlimeHMFunction(startX, startY, playerSex,inSafeMode,soundSFX) {
        let tempSlime = new blueSlimeHM(tempSceneRef, startX, startY, playerSex,tempSceneRef.enemyId,inSafeMode);
        console.log("created blueSlimeHM id: ",tempSlime.enemyId);
        tempSceneRef.enemyId++;
        tempSceneRef.enemys.add(tempSlime);
        tempSceneRef.blueSlimeHMs.add(tempSlime);

        if(inSafeMode === false){

          let collider = tempSceneRef.physics.add.overlap(tempSceneRef.attackHitBox, tempSlime, function () {
            tempSlime.hitboxOverlaps = true;
          });
          tempSlime.addColliderRef(collider);

          //adds collider between player and slime. then if they collide it plays the grab sequence but only if the player was not grabbed already
          let collider1 = tempSceneRef.physics.add.overlap(tempSceneRef.player1.mainHitbox, tempSlime.grabHitBox, function () {
            let isWindowObject = {
              isOpen: null
            };
            
            inventoryKeyEmitter.emit(inventoryKey.isWindowOpen,isWindowObject);

            if (isWindowObject.isOpen === true) {
              inventoryKeyEmitter.emit(inventoryKey.activateWindow,tempSceneRef);
              //scene.playerInventory.setView(scene);
            }
            //console.log("player overlaps slime");
            //checks if the slimes grab cool down is zero and that it isnt in the mitosis animation
            //console.log("tempSlime.grabCoolDown:"+tempSlime.grabCoolDown+"scene.grabCoolDown === 0"+scene.grabCoolDown)
            if (tempSlime.grabCoolDown === false && tempSceneRef.grabCoolDown === false) {
              //stop the velocity of the player
              tempSlime.setVelocityX(0);
              tempSceneRef.player1.mainHitbox.setVelocityX(0);
              //calls the grab function
              tempSlime.grab();
              //sets the scene grab value to true since the player has been grabbed
              // tells instance of slime that it has grabbed player
              tempSlime.playerGrabbed = true;
              tempSlime.grabCoolDown = true;
              tempSceneRef.grabbed = true;
              tempSceneRef.grabCoolDown = true;
              console.log('player grabbed by slime');
            }
          });
          tempSlime.addColliderRef(collider1);
        
        }
      },
      chestMimic: function chestMimicFunction(startX, startY, playerSex,inSafeMode,soundSFX) {
        let tempMimic = new chestMimic(tempSceneRef, startX, startY, playerSex,tempSceneRef.enemyId,inSafeMode,soundSFX);
        console.log("created chestMimic id: ",tempMimic.enemyId);
        tempSceneRef.enemyId++;
        tempSceneRef.enemys.add(tempMimic);
        tempSceneRef.chestMimics.add(tempMimic);

         if(inSafeMode === false){
          //damage fuctions
          let collider1 = tempSceneRef.physics.add.overlap(tempSceneRef.attackHitBox, tempMimic, function () {
            tempMimic.hitboxOverlaps = true;
          });
          tempMimic.addColliderRef(collider1);

          //adds collider between player and mimic attack hitbox. then if they collide it plays the grab sequence but only if the player was not grabbed already
          let collider2 = tempSceneRef.physics.add.overlap(tempSceneRef.player1.mainHitbox, tempMimic.grabHitBox, function () {
            let isWindowObject = {
              isOpen: null
            };
            
            inventoryKeyEmitter.emit(inventoryKey.isWindowOpen,isWindowObject);

            if (isWindowObject.isOpen === true) {
              inventoryKeyEmitter.emit(inventoryKey.activateWindow,tempSceneRef);
            }

            if (tempMimic.grabCoolDown === false && tempSceneRef.grabCoolDown === false) {
              //stop the velocity of the player
              tempMimic.setVelocityX(0);
              tempSceneRef.player1.mainHitbox.setVelocityX(0);
              //calls the grab function
              tempMimic.grab();
              //sets the scene grab value to true since the player has been grabbed
              // tells instance of slime that it has grabbed player
              tempMimic.playerGrabbed = true;
              tempMimic.grabCoolDown = true;
              tempSceneRef.grabbed = true;
              tempSceneRef.grabCoolDown = true;
              console.log('player grabbed by mimic');
            }
          });
          tempMimic.addColliderRef(collider2);

         }
        
      },
      chestMimicAngry: function chestMimicAngryFunction(startX, startY, playerSex,inSafeMode,soundSFX) {
        let mimic = new chestMimic(tempSceneRef, startX, startY, playerSex,tempSceneRef.enemyId,inSafeMode,soundSFX);
        mimic.angry = true;
        mimic.anims.play('mimicAngryIdle',tempSceneRef);
        console.log("created chestMimicAngry id: ",mimic.enemyId);
        tempSceneRef.enemyId++;
        tempSceneRef.enemys.add(mimic);
        tempSceneRef.chestMimics.add(mimic);
      },
      whiteCat: function whiteCatFunction(startX, startY, playerSex,inSafeMode,soundSFX) {
        let tempCat = new whiteCat(tempSceneRef, startX, startY, playerSex,tempSceneRef.enemyId,inSafeMode);
        console.log("created whiteCat id: ",tempCat.enemyId);
        tempSceneRef.enemyId++;
        tempSceneRef.enemys.add(tempCat);
        tempSceneRef.whiteCats.add(tempCat);

        if(inSafeMode === false){
          
          let collider1 = tempSceneRef.physics.add.overlap(tempSceneRef.attackHitBox, tempCat, function () {
            tempCat.hitboxOverlaps = true;
          });
          tempCat.addColliderRef(collider1);

          //adds collider between player and slime. then if they collide it plays the grab sequence but only if the player was not grabbed already
          collider1 = tempSceneRef.physics.add.overlap(tempSceneRef.player1.mainHitbox, tempCat.grabHitBox, function () {
            let isWindowObject = {
              isOpen: null
            };
          
            inventoryKeyEmitter.emit(inventoryKey.isWindowOpen,isWindowObject);

            if (isWindowObject.isOpen === true) {
              inventoryKeyEmitter.emit(inventoryKey.activateWindow,tempSceneRef);
              
            }

            if (tempCat.grabCoolDown === false && tempSceneRef.grabCoolDown === false) {
              //stop the velocity of the player
              tempCat.setVelocityX(0);
              tempSceneRef.player1.mainHitbox.setVelocityX(0);
              //calls the grab function
              tempCat.grab();
              //sets the scene grab value to true since the player has been grabbed
              // tells instance of slime that it has grabbed player
              tempCat.grabCoolDown = true;
              tempCat.playerGrabbed = true;
              tempSceneRef.grabbed = true;
              tempSceneRef.grabCoolDown = true;
              console.log('player grabbed by cat');
            }
          });

          tempCat.addColliderRef(collider1);

          //attack hitbox logic
          collider1 = tempSceneRef.physics.add.overlap(tempSceneRef.player1.mainHitbox, tempCat.attackHitBox, function () {
            let isWindowObject = {
              isOpen: null
            };
          
            inventoryKeyEmitter.emit(inventoryKey.isWindowOpen,isWindowObject);

            if (isWindowObject.isOpen === true) {
              inventoryKeyEmitter.emit(inventoryKey.activateWindow,scene);
            }

            //apply stuckgrab logic.
            tempSceneRef.playerStuckGrab = true;
            tempSceneRef.playerStuckGrabbedBy = "knockdown";
            tempSceneRef.playerStuckGrabCap = 40;
            tempSceneRef.enemyThatknockdownPlayer = tempCat;

          });
          tempCat.addColliderRef(collider1);

        }else{
          tempCat.setDepth(4);
        }
      },
      angryWhiteCat: function angryWhiteCatFunction(startX, startY, playerSex,inSafeMode,soundSFX) {
        let cat = new whiteCat(tempSceneRef, startX, startY, playerSex,tempSceneRef.enemyId,inSafeMode);
        cat.angry = true;
        cat.anims.play('catAngryidleViewer',true);
        cat.setDepth(4);
        console.log("created angryWhiteCat id: ",cat.enemyId);
        tempSceneRef.enemyId++;
        tempSceneRef.enemys.add(cat);
        tempSceneRef.whiteCats.add(cat);
        
      },
      curseShadow: function curseShadowFunction(startX, startY, playerSex,inSafeMode) {
        let shadow = new curseShadow(tempSceneRef, startX, startY, playerSex,tempSceneRef.enemyId,inSafeMode);
        tempSceneRef.enemyId++;
        console.log("created curseShadow id: ",shadow.enemyId);
        tempSceneRef.enemys.add(shadow);
        tempSceneRef.curseShadows.add(shadow);

        if(inSafeMode === false){

          tempSceneRef.physics.add.overlap(tempSceneRef.player1.mainHitbox, shadow.grabHitBox, function () {

            let isWindowObject = {
              isOpen: null
            };
          
            inventoryKeyEmitter.emit(inventoryKey.isWindowOpen,isWindowObject);

            if (isWindowObject.isOpen === true) {
              inventoryKeyEmitter.emit(inventoryKey.activateWindow,tempSceneRef);

            }

            if (shadow.grabCoolDown === false && tempSceneRef.grabCoolDown === false && tempSceneRef.player1.lanturnFlicker === null) {
              //stop the velocity of the player
              shadow.setVelocityX(0);
              tempSceneRef.player1.mainHitbox.setVelocityX(0);
              //calls the grab function
              shadow.grab();
              //sets the scene grab value to true since the player has been grabbed
              // tells instance of slime that it has grabbed player
              shadow.grabCoolDown = true;
              shadow.playerGrabbed = true;
              tempSceneRef.grabbed = true;
              tempSceneRef.grabCoolDown = true;
              console.log('player grabbed by shadow');
            }
          });
        }

      },
      earieShadow: function earieShadowFunction(startX, startY, playerSex,inSafeMode) {
        let shadow = new EarieShadow(tempSceneRef, startX, startY, playerSex,tempSceneRef.enemyId,inSafeMode);
        tempSceneRef.enemyId++;
        console.log("created earieShadows id: ",shadow.enemyId);
        tempSceneRef.enemys.add(shadow);
        tempSceneRef.earieShadows.add(shadow);

        if(inSafeMode === false){

          tempSceneRef.physics.add.overlap(tempSceneRef.player1.mainHitbox, shadow.grabHitBox, function () {

            let isWindowObject = {
              isOpen: null
            };
          
            inventoryKeyEmitter.emit(inventoryKey.isWindowOpen,isWindowObject);

            if (isWindowObject.isOpen === true) {
              inventoryKeyEmitter.emit(inventoryKey.activateWindow,tempSceneRef);

            }

            if (shadow.grabCoolDown === false && tempSceneRef.grabCoolDown === false && tempSceneRef.player1.lanturnFlicker === null) {
              //stop the velocity of the player
              //shadow.setVelocityX(0);
              tempSceneRef.player1.mainHitbox.setVelocityX(0);
              //calls the grab function
              shadow.grab();
              //sets the scene grab value to true since the player has been grabbed
              // tells instance of slime that it has grabbed player
              shadow.grabCoolDown = true;
              shadow.playerGrabbed = true;
              tempSceneRef.grabbed = true;
              tempSceneRef.grabCoolDown = true;
              console.log('player grabbed by shadow');
            }
          });
        }

      },

      mushroom: function mushroomFunction(startX, startY, playerSex,inSafeMode,rootNode) {
        let mush = new mushroom(tempSceneRef, startX, startY, playerSex,tempSceneRef.enemyId,inSafeMode);
        mush.curNode = rootNode;
        tempSceneRef.enemyId++;
        console.log("created mush id: ",mush.enemyId);
        tempSceneRef.enemys.add(mush);
        tempSceneRef.mushrooms.add(mush);
        //happens too soon?

        console.log("tempSceneRef.attackHitBox: ",tempSceneRef.attackHitBox);
        console.log("mush: ",mush);
        tempSceneRef.physics.add.overlap(tempSceneRef.attackHitBox, mush, function () {
            console.log("overlap with mushroom occuring!");
            mush.hitboxOverlaps = true;
        });

      },
      mushroomDefeat: function mushroomDefeatsFunction(startX, startY, playerSex,inSafeMode) {

        let mush = new mushroomDefeat(tempSceneRef, startX, startY, playerSex,tempSceneRef.enemyId,inSafeMode);
        tempSceneRef.enemyId++;
        console.log("created mushdefeat id: ",mush.enemyId);
        tempSceneRef.enemys.add(mush);
        tempSceneRef.mushroomDefeats.add(mush);

      },

      matangoRoot: function matangoRootFunction(startX, startY, playerSex,inSafeMode,rootNode) {

        let mush = new matangoRoot(tempSceneRef, startX, startY, playerSex,tempSceneRef.enemyId,inSafeMode);
        mush.rootNode = rootNode;
        tempSceneRef.enemyId++;
        console.log("created mushdefeat id: ",mush.enemyId);
        tempSceneRef.enemys.add(mush);
        tempSceneRef.matangoRoots.add(mush);


        if(inSafeMode === false){

          let  collider1 = tempSceneRef.physics.add.overlap(tempSceneRef.attackHitBox, mush, function () {
              console.log("overlap with mushroom occuring!");
              mush.hitboxOverlaps = true;
          });
          mush.addColliderRef(collider1);

          collider1 = tempSceneRef.physics.add.overlap(tempSceneRef.player1.mainHitbox, mush.grabHitBox, function () {

              let isWindowObject = {
                isOpen: null
              };
            
              inventoryKeyEmitter.emit(inventoryKey.isWindowOpen,isWindowObject);

              if (isWindowObject.isOpen === true) {
                inventoryKeyEmitter.emit(inventoryKey.activateWindow,tempSceneRef);
                
              }

              if (mush.grabCoolDown === false && tempSceneRef.grabCoolDown === false) {
                //stop the velocity of the player
                tempSceneRef.player1.mainHitbox.setVelocityX(0);
                //calls the grab function
                mush.grab();
                //sets the scene grab value to true since the player has been grabbed
                // tells instance of slime that it has grabbed player
                mush.grabCoolDown = true;
                mush.playerGrabbed = true;
                tempSceneRef.grabbed = true;
                tempSceneRef.grabCoolDown = true;
                console.log('player grabbed by mush');
              }
          });
          mush.addColliderRef(collider1);
          //attack hitbox logic
          collider1 = tempSceneRef.physics.add.overlap(tempSceneRef.player1.mainHitbox, mush.attackHitBox, function () {
            let isWindowObject = {
              isOpen: null
            };
            console.log("mushroom attack collider overlaping with player!");
            inventoryKeyEmitter.emit(inventoryKey.isWindowOpen,isWindowObject);

            if (isWindowObject.isOpen === true) {
              inventoryKeyEmitter.emit(inventoryKey.activateWindow,scene);
            }

            //apply stuckgrab logic.
            tempSceneRef.playerStuckGrab = true;
            tempSceneRef.playerStuckGrabbedBy = "knockdown";
            tempSceneRef.playerStuckGrabCap = 40;
            tempSceneRef.enemyThatknockdownPlayer = mush;

          });
          mush.addColliderRef(collider1);
        }
      },
      matangoRootUnbirth: function matangoRootUnbirthFunction(startX, startY, playerSex,inSafeMode,rootNode) {

        let mush = new matangoRoot(tempSceneRef, startX, startY, playerSex,tempSceneRef.enemyId,inSafeMode);
        mush.rootNode = rootNode;
        tempSceneRef.enemyId++;
        console.log("created mushdefeat id: ",mush.enemyId);
        tempSceneRef.enemys.add(mush);
        tempSceneRef.matangoRoots.add(mush);

        mush.anims.play('sideIdleLoop',true);

        mush.grabType = "unbirth";

      },
      matangoRootAbsorb: function matangoRootAbsorbFunction(startX, startY, playerSex,inSafeMode,rootNode) {

        let mush = new matangoRoot(tempSceneRef, startX, startY, playerSex,tempSceneRef.enemyId,inSafeMode);
        mush.rootNode = rootNode;
        tempSceneRef.enemyId++;
        console.log("created mushdefeat id: ",mush.enemyId);
        tempSceneRef.enemys.add(mush);
        tempSceneRef.matangoRoots.add(mush);

        mush.anims.play('AngleIdleLoop',true);

        mush.grabType = "absorb";
        

      },
      matangoRootOral: function matangoRootOralFunction(startX, startY, playerSex,inSafeMode,rootNode) {

        let mush = new matangoRoot(tempSceneRef, startX, startY, playerSex,tempSceneRef.enemyId,inSafeMode);
        mush.rootNode = rootNode;
        tempSceneRef.enemyId++;
        console.log("created mushdefeat id: ",mush.enemyId);
        tempSceneRef.enemys.add(mush);
        tempSceneRef.matangoRoots.add(mush);

        mush.anims.play('forwardIdleEyesDownDreamView',true);

        mush.grabType = "oral";

      }

      
    };
  }

  //creates a enemy. enemytype determines what enemy is spawned
  initEnemy(startX, startY, playerSex, enemyType,inSafeMode,soundSFX) {
    console.log("enemy spawned: ",enemyType);

    if(this.mapOfInitEnemyFunctions === null || this.mapOfInitEnemyFunctions === undefined){
      console.log("enemy init map not created, now creating it.");
      this.setUpInitEnemyFunctions();
    }

    this.mapOfInitEnemyFunctions[enemyType](startX, startY, playerSex,inSafeMode,soundSFX);

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