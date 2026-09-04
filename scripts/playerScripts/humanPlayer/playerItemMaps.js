class playerItemMaps extends playerAnimationFunctions{
  
  //array of weapon effect functions
  setupWeaponPassivesMap(){
    let tempPlayer = this;

    this.weaponPassivesMap = {
      // default if the player has no rings equipt
      0: function Funct0() {
        tempPlayer.dropChance = 1;
      },
      //rapier
      1: function Funct1() {
        tempPlayer.dropChance = 1;
      },
      //oar
      2: function Funct2() {
        tempPlayer.dropChance = 1;
      },
      //mimic rapier
      3: function Funct3() {
        //console.log("activating mimic rapier bonus")
        tempPlayer.dropChance = 2;
      },
      //knife
      4: function Funct4() {
        tempPlayer.dropChance = 1;
      },
      //axe
      10: function Funct10() {
        tempPlayer.dropChance = 1;
      },
      24: function Funct24() {
        tempPlayer.dropChance = 1;
      },
      25: function Funct25() {
        tempPlayer.dropChance = 1;
      },
      27: function Funct27() {
        tempPlayer.dropChance = 1;
      },
      
    }

  }
  //array of ring effect functions
  setupRingPassivesMap(){
    let tempPlayer = this;

    this.ringPassivesMap = {
      // default if the player has no rings equipt
      0: function Funct0() {
         //console.log("no item equipt");
        tempPlayer.speedBoost = 1;
        tempPlayer.dropAmount = 1;
        tempPlayer.ringType = 0;

        tempPlayer.deactivatelight();

      },
      // if mimic ring is equipt
      6: function Funct6() {
        //console.log("activating mimic ring");
        tempPlayer.speedBoost = 1;
        tempPlayer.dropAmount = 2;
        tempPlayer.ringType = 6;

        tempPlayer.deactivatelight();
      },
      //if the player has the carrot ring equipt
      8: function Funct8() {
        //console.log("activating speed boost");
        tempPlayer.speedBoost = 1.2;
        tempPlayer.dropAmount = 1;
        tempPlayer.ringType = 8;

        tempPlayer.deactivatelight();
      },
      //if the player has the lantern
      21: function Funct21() {

        tempPlayer.speedBoost = 1;
        tempPlayer.dropAmount = 1;
        tempPlayer.ringType = 21;

          if(tempPlayer.scene.lightingSystemActive === true){ 

          //then check to see if the player has fuel.
          if(tempPlayer.playerDataObject.playerInventoryData[2].itemID === 16){

            //set a tween on the light source to make the lanturn flicker
            if(tempPlayer.lanturnFlicker === undefined || tempPlayer.lanturnFlicker === null ){

              tempPlayer.lightSource.setRadius(100);

              tempPlayer.lanturnFlicker = tempPlayer.scene.tweens.add({
                targets: tempPlayer.lightSource,
                props : {
                    radius: {value : '+=' +8},
                    intensity: {value : '+=' +.15},
      
                }, 
                ease: 'linear',
                duration: 800,
                repeat: -1,
                yoyo: true
              });
            }
            //console.log("this.fuelActivated: ", this.fuelActivated);
            //apply timer to fuel source and reduce fuel amount by 1 every 45 seconds.
            if(tempPlayer.fuelActivated === false){

              tempPlayer.fuelActivated = true;

              setTimeout(function(){
                if(tempPlayer !== undefined && tempPlayer !== null){

                  //calls emitter to reduce item amount at specific location
                  // in this case reduce slot 2 by 1.
                  inventoryKeyEmitter.emit(inventoryKey.reduceItemAmount,2,1);
            
                  tempPlayer.fuelActivated = false;


                }

              },10000);
    
          }


          //otherwise if there is no fuel to burn, set lanturn to be off.
          }else{
            tempPlayer.lightSource.setRadius(0);
            if(tempPlayer.lanturnFlicker !== undefined && tempPlayer.lanturnFlicker !== null ){
              tempPlayer.lanturnFlicker.stop();
              tempPlayer.lanturnFlicker = null;
            }

          }

        //otherwise turn the lightsource off
        }else if(tempPlayer.scene.lightingSystemActive === true){

          tempPlayer.lightSource.setRadius(0);

          if(tempPlayer.lanturnFlicker !== undefined && tempPlayer.lanturnFlicker !== null ){
              tempPlayer.lanturnFlicker.stop();
              tempPlayer.lanturnFlicker = null;
          }
        }
      },
      
    }

  }

  setupConsumablePassivesMap(){

    let tempPlayer = this;

    this.consumablePassivesMap = {
      // default if the player has no rings equipt
       0: function Funct0() {
        tempPlayer.consumeType = 0;
      },
      1: function Funct0() {
    
      },
      2: function Funct0() {
    
      },
      3: function Funct0() {
    
      },
      4: function Funct0() {
    
      },
      5: function Funct0() {
    
      },
      6: function Funct0() {
    
      },
      7: function Funct0() {
    
      },
      8: function Funct0() {
    
      },
      9: function Funct0() {
        tempPlayer.consumeType = 9;
      },
      10: function Funct0() {
    
      },
      11: function Funct0() {
        tempPlayer.consumeType = 11;
      },
      12: function Funct0() {
    
      },
      13: function Funct0() {
    
      },
      14: function Funct0() {
    
      },
      28: function Funct0() {
        tempPlayer.consumeType = 28;
      },
      29: function Funct0() {
        tempPlayer.consumeType = 29;
      },
      30: function Funct0() {
        tempPlayer.consumeType = 30;
      },
      32: function Funct0() {
        tempPlayer.consumeType = 32;
      },
      33: function Funct0() {
        tempPlayer.consumeType = 33;
      },
      34: function Funct0() {
        tempPlayer.consumeType = 34;
      },
      35: function Funct0() {
        tempPlayer.consumeType = 35;
      },
      36: function Funct0() {
        tempPlayer.consumeType = 36;
      },
      37: function Funct0() {
        tempPlayer.consumeType = 37;
      },
      
      
    }

  }
 
}


