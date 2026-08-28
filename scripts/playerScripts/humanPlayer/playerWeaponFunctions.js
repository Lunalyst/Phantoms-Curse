class playerWeaponFunctions extends playerItemMaps{
  
  lightAttackSwitch(){
    
    switch(this.playerDataObject.playerInventoryData[0].itemID) {
      case (2):
      console.log("starting Oar Attack.");
      if(this.playedAttackAnimation === false){

        this.playedAttackAnimation = true;
        this.scene.initSoundEffect('weaponSFX','medium',0.1);
        this.playerBonkAnimation9FPS();

        this.weaponLayer9.anims.play("weapon-start-oar").once('animationcomplete', () => {
                  
          this.attackHitboxState = true;
          this.fixAnimationVariable();

          this.weaponLayer9.anims.play("weapon-middle-oar").once('animationcomplete', () => {

            this.attackHitboxState = false;
            this.fixAnimationVariable();

            this.weaponLayer9.anims.play("weapon-finish-oar").once('animationcomplete', () => {

              this.isAttacking = false;
              this.playedAttackAnimation = false;
              console.log("attack is over so stoping");
              this.bluntDamage = 0;

            });
          });

        });
      }

      this.bluntDamage = 3;
      this.setAttackHitboxSize(25,40);
      this.hitboxX = 23;
      this.hitboxY = 10;
      break;

    case (4):
      console.log("starting Knife Attack.");     
              
      if(this.playedAttackAnimation === false){

        this.playedAttackAnimation = true;
        this.scene.initSoundEffect('weaponSFX','high2',0.1);
        this.playerSwipeAnimation12FPS(); 

        this.weaponLayer9.anims.play("weapon-start-knife").once('animationcomplete', () => {
          //sends the weapon layer to the back
          this.sendToBack(this.weaponLayer9);
          this.moveUpXTimes(this.weaponPositionBack);

          this.attackHitboxState = true;
          this.fixAnimationVariable();

          this.weaponLayer9.anims.play("weapon-middle-knife").once('animationcomplete', () => {

            this.attackHitboxState = false;
            this.fixAnimationVariable();

            this.weaponLayer9.anims.play("weapon-finish-knife").once('animationcomplete', () => {
              
              this.moveUpXTimes(this.weaponPositionfront-1);
              this.isAttacking = false;
              this.playedAttackAnimation = false;
              console.log("attack is over so stoping");
              this.sliceDamage = 0;
            });
          });
        });
      }

      this.sliceDamage = 4;
      this.setAttackHitboxSize(25,40);
      this.hitboxX = 18;
      this.hitboxY = 10;  
      break;

    case (10):
    if(this.playedAttackAnimation === false){
      this.playedAttackAnimation = true;
      this.scene.initSoundEffect('weaponSFX','heavy',0.1);
      this.playerSwipeAnimation9FPS();
                
      this.weaponLayer9.anims.play("weapon-start-axe").once('animationcomplete', () => {
        //sends the weapon layer to the back
          this.sendToBack(this.weaponLayer9);
          this.moveUpXTimes(this.weaponPositionBack);
          this.attackHitboxState = true;
          this.fixAnimationVariable();

          this.weaponLayer9.anims.play("weapon-middle-axe").once('animationcomplete', () => {

            this.attackHitboxState = false;
            this.fixAnimationVariable();

            this.weaponLayer9.anims.play("weapon-finish-axe").once('animationcomplete', () => {
              this.moveUpXTimes(this.weaponPositionfront);

              this.isAttacking = false;
              this.playedAttackAnimation = false;
              console.log("attack is over so stoping");
              this.sliceDamage = 0;

            });
        });
      });
    }
    this.sliceDamage = 8;
    this.setAttackHitboxSize(20,30);
    this.hitboxX = 23;
    this.hitboxY = 10;

    break;
    case (27):

      if(this.playedAttackAnimation === false){

        this.playedAttackAnimation = true;
        this.scene.initSoundEffect('weaponSFX','heavy',0.1);
        this.playerSwipeAnimation9FPS();
                
        this.weaponLayer9.anims.play("weapon-start-wax-axe").once('animationcomplete', () => {
          //sends the weapon layer to the back
          this.sendToBack(this.weaponLayer9);
          this.moveUpXTimes(this.weaponPositionBack);
          this.attackHitboxState = true;
          this.fixAnimationVariable();

          this.weaponLayer9.anims.play("weapon-middle-wax-axe").once('animationcomplete', () => {

            this.attackHitboxState = false;
            this.fixAnimationVariable();

            this.weaponLayer9.anims.play("weapon-finish-wax-axe").once('animationcomplete', () => {
              this.moveUpXTimes(this.weaponPositionfront);

              this.isAttacking = false;
              this.playedAttackAnimation = false;
              console.log("attack is over so stoping");
              this.sliceDamage = 0;
              this.curseDamage = 0;
            });
          });
        });
      }

      this.sliceDamage = 6;
      this.curseDamage = 4;
      this.setAttackHitboxSize(20,30);
      this.hitboxX = 23;
      this.hitboxY = 10;
      break;

    case (1):
      if(this.playedAttackAnimation === false){

        this.playedAttackAnimation = true;
        this.scene.initSoundEffect('weaponSFX','high2',0.1);
        this.playerPokeAnimation12FPS();

        this.weaponLayer9.anims.play("weapon-start-rapier").once('animationcomplete', () => {

          this.attackHitboxState = true;
          this.fixAnimationVariable();

          this.weaponLayer9.anims.play("weapon-middle-rapier").once('animationcomplete', () => {
            
            this.attackHitboxState = false;
            this.fixAnimationVariable();

            this.weaponLayer9.anims.play("weapon-end-rapier").once('animationcomplete', () => {

              this.isAttacking = false;
              this.playedAttackAnimation = false;
              console.log("attack is over so stoping");
              this.pierceDamage = 0;
            });
          });
        });

      }
      this.pierceDamage = 6;
      this.setAttackHitboxSize(60,30);
      this.hitboxX = 33;
      this.hitboxY = 10;
      break;
    case (3):

    if(this.playedAttackAnimation === false){

      this.playedAttackAnimation = true;
      this.scene.initSoundEffect('weaponSFX','high2',0.1);
      this.playerPokeAnimation12FPS();

      this.weaponLayer9.anims.play("weapon-start-mimicRapier").once('animationcomplete', () => {
        
        this.attackHitboxState = true;
        this.fixAnimationVariable(); 

        this.weaponLayer9.anims.play("weapon-middle-mimicRapier").once('animationcomplete', () => {
          
          this.attackHitboxState = false;
          this.fixAnimationVariable();

          this.weaponLayer9.anims.play("weapon-end-mimicRapier").once('animationcomplete', () => {
            this.isAttacking = false;
            this.playedAttackAnimation = false;
            console.log("attack is over so stoping");
            this.pierceDamage = 0;
            this.curseDamage = 0;
          });
        });
      });
    }
    this.pierceDamage = 4;
    this.curseDamage = 4;
    this.setAttackHitboxSize(60,30);
    this.hitboxX = 33;
    this.hitboxY = 10;
    break;
  case (24):

  if(this.playedAttackAnimation === false){

      this.playedAttackAnimation = true;
      this.scene.initSoundEffect('weaponSFX','medium',0.1);
      this.playerBonkAnimation9FPS();

      this.weaponLayer9.anims.play("weapon-start-mourning-star").once('animationcomplete', () => {

        this.attackHitboxState = true;
        this.fixAnimationVariable(); 

        this.weaponLayer9.anims.play("weapon-middle-mourning-star").once('animationcomplete', () => {

          this.attackHitboxState = false;
          this.fixAnimationVariable(); 

          this.weaponLayer9.anims.play("weapon-end-mourning-star").once('animationcomplete', () => {

            this.isAttacking = false;
            this.playedAttackAnimation = false;
            console.log("attack is over so stoping");
            this.bluntDamage = 0;
            this.pierceDamage = 0;

          });

        });

      });
    }
  this.bluntDamage = 6;
  this.pierceDamage = 2;
  this.setAttackHitboxSize(20,40);
  this.hitboxX = 29;
  this.hitboxY = 10;
  break;
  case (25):
  if(this.playedAttackAnimation === false){
    this.playedAttackAnimation = true;
    this.scene.initSoundEffect('weaponSFX','medium',0.1);
    this.playerBonkAnimation9FPS();

    //make an object which is passed by refrence to the emitter to update the hp values so the enemy has a way of seeing what the current health value is.
    let playerHealthObject = {
      playerHealth: null,
      playerMaxHealth: null
    };

    //gets the hp value using a emitter
    healthEmitter.emit(healthEvent.returnHealth,playerHealthObject);

    if(this.scene.lightingSystemActive === true){ 

      this.curseLight.visible = true;
      if(this.mainBodySprite5.flipX === true){

        this.curseLight.x = this.mainHitbox.x-20;

      }else{
        this.curseLight.x = this.mainHitbox.x+20;
      }

      this.curseLight.y = this.mainHitbox.y-20;
                
    }

    this.weaponLayer9.anims.play("weapon-conidia-caster1").once('animationcomplete', () => {
      if(this.scene.lightingSystemActive === true){ 

        if(this.mainBodySprite5.flipX === true){

          this.curseLight.x = this.mainHitbox.x-30;

        }else{
          this.curseLight.x = this.mainHitbox.x+30;
        }

        this.curseLight.y = this.mainHitbox.y;
                  
      }

      if(playerHealthObject.playerCurse > 1){

        healthEmitter.emit(healthEvent.reduceCurse,3);

        if(this.mainBodySprite5.flipX === false){
          this.scene.initPlayerProjectile(this.x+45,this.y,"sporeCloud","left",30,0,1500,0);
        }else{
          this.scene.initPlayerProjectile(this.x-45,this.y,"sporeCloud","right",30,0,1500,0);
        }

      }

      this.attackHitboxState = true;
      this.fixAnimationVariable(); 

      this.weaponLayer9.anims.play("weapon-conidia-caster2").once('animationcomplete', () => {

          this.attackHitboxState = false;
          this.fixAnimationVariable(); 

          if(this.scene.lightingSystemActive === true){ 

            if(this.mainBodySprite5.flipX === true){

              this.curseLight.x = this.mainHitbox.x-10;

            }else{
              this.curseLight.x = this.mainHitbox.x+10;
            }

            this.curseLight.y = this.mainHitbox.y+30;
                        
          }

          this.weaponLayer9.anims.play("weapon-conidia-caster3").once('animationcomplete', () => {

            this.isAttacking = false;
            this.playedAttackAnimation = false;
            console.log("attack is over so stoping");
            this.bluntDamage = 0;
            this.curseDamage = 0;

            if(this.scene.lightingSystemActive === true){ 

              this.curseLight.visible = false;
                          
                            
            }

          });

        });

      });
    }
    
  this.bluntDamage = 2;
  this.curseDamage = 2;

  this.setAttackHitboxSize(20,40);
  this.hitboxX = 29;
  this.hitboxY = 10;
  break;

  default:
              console.log("attacking animation unarmed");

              if(this.playedAttackAnimation === false){

                this.playedAttackAnimation = true;
                this.scene.initSoundEffect('weaponSFX','high1',0.1);

                this.playerUnarmedAnimation();
                this.weaponLayer9.anims.play("weapon-start-unarmed").once('animationcomplete', () => {

                  this.attackHitboxState = true;
                  this.fixAnimationVariable();

                  this.weaponLayer9.anims.play("weapon-middle-unarmed").once('animationcomplete', () => {

                    //sends the weapon layer to the back
                    this.sendToBack(this.weaponLayer9);
                    this.moveUpXTimes(this.weaponPositionBack);
                    this.attackHitboxState = false;
                    this.fixAnimationVariable();

                    this.weaponLayer9.anims.play("weapon-finish-unarmed").once('animationcomplete', () => {
                      //sends weapon layer back to front -1
                      this.moveUpXTimes(this.weaponPositionfront);
                      console.log("unarmed finished way point");

                      this.backLeg1.visible = false;
                      this.backLegCloths2.visible = false;

                      this.isAttacking = false;
                      this.playedAttackAnimation = false;
                      console.log("attack is over so stoping");
                      this.bluntDamage = 0;
                    });
                  });
                });
              
              }

              this.bluntDamage = 1;
              this.setAttackHitboxSize(10,20);
              this.hitboxX = 14;
              this.hitboxY = 10;
            }
  }

  consumableSwitch(){
    //grab player health object
            let playerHealthObject = {
              playerHealth: null
            };

            //gets the hp value using a emitter
            healthEmitter.emit(healthEvent.returnHealth,playerHealthObject);

            switch(this.playerDataObject.playerInventoryData[4].itemID) {

            case (28):  
              //case to check if item use is valid.
              if(playerHealthObject.playerCurse < playerHealthObject.playerCurseMax-1){
                if(this.playedAttackAnimation === false){

                  this.playedAttackAnimation = true;
                  //this.scene.initSoundEffect('weaponSFX','high1',0.1);

                  this.playerConsumeStartAnimation();

                  this.mainBodySprite5.anims.play("main-body-consume-start").once('animationcomplete', () => {
                    
                      this.fixAnimationVariable();

                      //if the players curse bar would be below the max then add to the curse build up
                      if(playerHealthObject.playerCurse + 10 < playerHealthObject.playerCurseMax){

                        healthEmitter.emit(healthEvent.curseBuildUp,10);

                        //then remove one item off the consumable stack.
                        inventoryKeyEmitter.emit(inventoryKey.reduceItemAmount,4,1);

                      //otherwise 
                      }else{

                        //take the difference of the current curse amoubtr from the max. then subtract that by 1 to get the amount of curse build up to add to the player without maxing it out
                        healthEmitter.emit(healthEvent.curseBuildUp,(playerHealthObject.playerCurseMax-playerHealthObject.playerCurse)-1);

                        //then remove one item off the consumable stack.
                        inventoryKeyEmitter.emit(inventoryKey.reduceItemAmount,4,1);

                      }

                      this.playerConsumeEndAnimation();

                      this.mainBodySprite5.anims.play("main-body-consume-end").once('animationcomplete', () => {

                        this.isAttacking = false;
                        this.playedAttackAnimation = false;

                        console.log("consume is over so stoping");
                      });
                  });
                
                } 
              //if the player cursebar is one point below max, then do shrug instead.
              }else{
                this.consumeFailAnimation();
              }

            break;
            case (29):
            if(playerHealthObject.playerHealth !== playerHealthObject.playerMaxHealth){
                if(this.playedAttackAnimation === false){
                  this.playedAttackAnimation = true;
                  this.scene.initSoundEffect('weaponSFX','medium',0.1);
                  this.playerBonkAnimation9FPS();
                  this.weaponLayer9.anims.play("weapon-oar").once('animationcomplete', () => {
                    this.isAttacking = false;
                    this.playedAttackAnimation = false;
                    console.log("attack is over so stoping");

                    //need to heal the player,
                    healthEmitter.emit(healthEvent.gainHealth,10);

                    //then remove one item off the consumable stack.
                    inventoryKeyEmitter.emit(inventoryKey.reduceItemAmount,4,1);


                  
                  });
                }
                
            }
            break;
            case (29):
            if(playerHealthObject.playerHealth !== playerHealthObject.playerMaxHealth){
                if(this.playedAttackAnimation === false){
                  this.playedAttackAnimation = true;
                  this.scene.initSoundEffect('weaponSFX','medium',0.1);
                  this.playerBonkAnimation9FPS();
                  this.weaponLayer9.anims.play("weapon-oar").once('animationcomplete', () => {
                    this.isAttacking = false;
                    this.playedAttackAnimation = false;
                    console.log("attack is over so stoping");

                    //need to heal the player,
                    healthEmitter.emit(healthEvent.gainHealth,10);

                    //then remove one item off the consumable stack.
                    inventoryKeyEmitter.emit(inventoryKey.reduceItemAmount,4,1);


                  
                  });
                }
                
            }
            break;
            default:
              this.consumeFailAnimation();
            }
  }

  consumeFailAnimation(){
    //default case being empty means we get oftlocked
      if(this.playedAttackAnimation === false){

        this.playedAttackAnimation = true;
        //this.scene.initSoundEffect('weaponSFX','high1',0.1);

        this.playerConsumeFailStartAnimation();

        this.mainBodySprite5.anims.play("main-body-consume-fail-start").once('animationcomplete', () => {
                   
          this.fixAnimationVariable();

          this.playerConsumeFailEndAnimation();

          this.mainBodySprite5.anims.play("main-body-consume-fail-end").once('animationcomplete', () => {

            this.isAttacking = false;
            this.playedAttackAnimation = false;

          console.log("consume is over so stoping");
        });
      });
              
    }
  }
 
}


