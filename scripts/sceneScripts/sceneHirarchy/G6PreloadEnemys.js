/****************************************************************************** 
description: initiation of enemys, as well as functions related to enemy
behavior.
*******************************************************************************/
class G6PreloadEnemys extends G5InitNPCs{

  //powerful function to set up enemy spritesheet preload, by using the enemy array 
  setUpEnemyPreloads(){

    let tempSceneRef = this;

    this.mapOfEnemyPreloadFunctions = {

      blueSlimes: function blueSlimesFunction() {

        tempSceneRef.load.spritesheet('CommonBlueSlime-evan', 'assets/enemys/CommonBlueSlime-evan.png',{frameWidth: 291, frameHeight: 315 });
        tempSceneRef.load.spritesheet('CommonBlueSlime-evelyn', 'assets/enemys/CommonBlueSlime-evelyn.png',{frameWidth: 291, frameHeight: 315 });

        tempSceneRef.load.spritesheet('slimePenning', 'assets/internalViews/slimePenning.png',{frameWidth: 213, frameHeight: 213});
        
        tempSceneRef.load.audioSprite('blueSlimeSFX','audio/used-audio/blue-slime-sounds/blue-slime-sounds.json',[
          "audio/used-audio/blue-slime-sounds/blue-slime-sounds.mp3"
        ]);
      },
      tigers: function tigersFunction() {

        tempSceneRef.load.spritesheet('tigerFemale', 'assets/enemys/tigerFemaleAll.png',{frameWidth: 345, frameHeight: 279 });
        tempSceneRef.load.spritesheet('tigerFemaleDigestion', 'assets/enemys/tigerFemaleAllDigestion.png',{frameWidth: 345, frameHeight: 279 });
        tempSceneRef.load.spritesheet('tigerFemaleExtension', 'assets/enemys/tigerFemaleAllExtension.png',{frameWidth: 345, frameHeight: 279 });
        tempSceneRef.load.spritesheet('tigerFemaleDefeated', 'assets/enemys/tigerFemaleDefeated.png',{frameWidth: 345, frameHeight: 279 });

        tempSceneRef.load.spritesheet('tigerMale', 'assets/enemys/tigerMaleAll.png',{frameWidth: 345, frameHeight: 279 });
        tempSceneRef.load.spritesheet('tigerMaleDigestion', 'assets/enemys/tigerMaleAllDigestion.png',{frameWidth: 345, frameHeight: 279 });
        tempSceneRef.load.spritesheet('tigerMaleExtension', 'assets/enemys/tigerMaleAllExtension.png',{frameWidth: 345, frameHeight: 279 });
        tempSceneRef.load.spritesheet('tigerMaleDefeated', 'assets/enemys/tigerMaleDefeated.png',{frameWidth: 345, frameHeight: 279 });

        tempSceneRef.load.spritesheet('tigerPenned', 'assets/internalViews/tigerPenned.png',{frameWidth: 213, frameHeight: 213});
        
        tempSceneRef.load.audioSprite('bushSFX','audio/used-audio/bush-sounds/bush-sounds.json',[
          "audio/used-audio/bush-sounds/bush-sounds.mp3"
        ]);

      },
      rabbits: function rabbitsFunction() {
        
        tempSceneRef.load.spritesheet('rabbit-male-male', 'assets/enemys/rabbit-male-male.png',{frameWidth: 429, frameHeight: 300 });
        tempSceneRef.load.spritesheet('rabbit-male-female', 'assets/enemys/rabbit-male-female.png',{frameWidth: 429, frameHeight: 300 });
        tempSceneRef.load.spritesheet('rabbit-female-male', 'assets/enemys/rabbit-female-male.png',{frameWidth: 429, frameHeight: 300 });
        tempSceneRef.load.spritesheet('rabbit-female-female', 'assets/enemys/rabbit-female-female.png',{frameWidth: 429, frameHeight: 300 });

        tempSceneRef.load.spritesheet('rabbit-female-male-vore', 'assets/enemys/rabbit-female-male-vore.png',{frameWidth: 429, frameHeight: 300 });
        tempSceneRef.load.spritesheet('rabbit-male-male-vore', 'assets/enemys/rabbit-male-male-vore.png',{frameWidth: 429, frameHeight: 300 });
        tempSceneRef.load.spritesheet('rabbit-male-female-vore', 'assets/enemys/rabbit-male-female-vore.png',{frameWidth: 429, frameHeight: 300 });
        tempSceneRef.load.spritesheet('rabbit-female-female-vore', 'assets/enemys/rabbit-female-female-vore.png',{frameWidth: 429, frameHeight: 300 });
        
        tempSceneRef.load.spritesheet('rabbitPenning', 'assets/internalViews/rabbitPenning.png',{frameWidth: 213, frameHeight: 213});
        tempSceneRef.load.spritesheet('rabbitPenned', 'assets/internalViews/rabbitPenned.png',{frameWidth: 213, frameHeight: 213});
        
         tempSceneRef.load.audioSprite('woodBarrierSFX','audio/used-audio/wood-barrier-sounds/wood-barrier-sounds.json',[
          "audio/used-audio/wood-barrier-sounds/wood-barrier-sounds.mp3"
        ]);
      },
      beeDrones: function beeDronesFunction() {

        tempSceneRef.load.spritesheet('beeDroneMale1', 'assets/enemys/beeDroneMale1.png',{frameWidth: 789, frameHeight: 252 });
        tempSceneRef.load.spritesheet('beeDroneMale2', 'assets/enemys/beeDroneMale2.png',{frameWidth: 789, frameHeight: 252 });
        tempSceneRef.load.spritesheet('beeDroneFemale1', 'assets/enemys/beeDroneFemale1.png',{frameWidth: 789, frameHeight: 252 });
        tempSceneRef.load.spritesheet('beeDroneFemale2', 'assets/enemys/beeDroneFemale2.png',{frameWidth: 789, frameHeight: 252 });
        tempSceneRef.load.spritesheet('beeGrub', 'assets/enemys/beeGrub.png',{frameWidth: 525, frameHeight: 237 });
        
        tempSceneRef.load.audioSprite('blueSlimeSFX','audio/used-audio/blue-slime-sounds/blue-slime-sounds.json',[
          "audio/used-audio/blue-slime-sounds/blue-slime-sounds.mp3"
        ]);

        tempSceneRef.load.audioSprite('wingFlapSFX0','audio/used-audio/wing-flap-sounds/wing-flap-sounds.json',[
          "audio/used-audio/wing-flap-sounds/wing-flap-sounds.mp3"
        ]);
        tempSceneRef.load.audioSprite('wingFlapSFX1','audio/used-audio/wing-flap-sounds/wing-flap-sounds.json',[
          "audio/used-audio/wing-flap-sounds/wing-flap-sounds.mp3"
        ]);
        tempSceneRef.load.audioSprite('wingFlapSFX2','audio/used-audio/wing-flap-sounds/wing-flap-sounds.json',[
          "audio/used-audio/wing-flap-sounds/wing-flap-sounds.mp3"
        ]);
        tempSceneRef.load.audioSprite('wingFlapSFX3','audio/used-audio/wing-flap-sounds/wing-flap-sounds.json',[
          "audio/used-audio/wing-flap-sounds/wing-flap-sounds.mp3"
        ]);
        tempSceneRef.load.audioSprite('wingFlapSFX4','audio/used-audio/wing-flap-sounds/wing-flap-sounds.json',[
          "audio/used-audio/wing-flap-sounds/wing-flap-sounds.mp3"
        ]);

      },
      bats: function batsFunction() {

        tempSceneRef.load.spritesheet('batSuckingPlayer', 'assets/internalViews/batSuckingPlayer.png',{frameWidth: 213, frameHeight: 213});
        tempSceneRef.load.spritesheet('batTonguePlayer', 'assets/internalViews/batTonguePlayer.png',{frameWidth: 213, frameHeight: 213});
        tempSceneRef.load.spritesheet('playerSuckingBat', 'assets/internalViews/playerSuckingBat.png',{frameWidth: 213, frameHeight: 213});
        tempSceneRef.load.spritesheet('playerTongueBat', 'assets/internalViews/playerTongueBat.png',{frameWidth: 213, frameHeight: 213});
        
        tempSceneRef.load.spritesheet('batMale', 'assets/enemys/batMaleAll.png',{frameWidth: 273, frameHeight: 435 });
        tempSceneRef.load.spritesheet('batFemale', 'assets/enemys/batFemaleAll.png',{frameWidth: 273, frameHeight: 435  });
        tempSceneRef.load.spritesheet('batFemaleExtension', 'assets/enemys/batFemaleExtension.png',{frameWidth: 273, frameHeight: 435  });
        tempSceneRef.load.spritesheet('batMaleExtension', 'assets/enemys/batMaleExtension.png',{frameWidth: 273, frameHeight: 435  });
        tempSceneRef.load.spritesheet('batMaleExtensionMale', 'assets/enemys/batMaleExtensionMale.png',{frameWidth: 273, frameHeight: 435  });
        tempSceneRef.load.spritesheet('batFemaleExtensionMale', 'assets/enemys/batFemaleExtensionMale.png',{frameWidth: 273, frameHeight: 435  });
        
        tempSceneRef.load.audioSprite('lickSFX1','audio/used-audio/lick-sounds/lick-sounds.json',[
          "audio/used-audio/lick-sounds/lick.mp3"
        ]);

        tempSceneRef.load.audioSprite('lickSFX2','audio/used-audio/lick-sounds/lick-sounds.json',[
          "audio/used-audio/lick-sounds/lick.mp3"
        ]);

        tempSceneRef.load.audioSprite('wingFlapSFX0','audio/used-audio/wing-flap-sounds/wing-flap-sounds.json',[
          "audio/used-audio/wing-flap-sounds/wing-flap-sounds.mp3"
        ]);
        tempSceneRef.load.audioSprite('wingFlapSFX1','audio/used-audio/wing-flap-sounds/wing-flap-sounds.json',[
          "audio/used-audio/wing-flap-sounds/wing-flap-sounds.mp3"
        ]);
        tempSceneRef.load.audioSprite('wingFlapSFX2','audio/used-audio/wing-flap-sounds/wing-flap-sounds.json',[
          "audio/used-audio/wing-flap-sounds/wing-flap-sounds.mp3"
        ]);
        tempSceneRef.load.audioSprite('wingFlapSFX3','audio/used-audio/wing-flap-sounds/wing-flap-sounds.json',[
          "audio/used-audio/wing-flap-sounds/wing-flap-sounds.mp3"
        ]);
        tempSceneRef.load.audioSprite('wingFlapSFX4','audio/used-audio/wing-flap-sounds/wing-flap-sounds.json',[
          "audio/used-audio/wing-flap-sounds/wing-flap-sounds.mp3"
        ]);
      },
      blueSlimeHSs: function blueSlimeHSsFunction() {

        tempSceneRef.load.spritesheet('blue-slime-HNM', 'assets/enemys/blue-slime-humanoid-neutral-male.png',{frameWidth: 243, frameHeight: 363 });
        tempSceneRef.load.spritesheet('blue-slime-HNF', 'assets/enemys/blue-slime-humanoid-neutral-female.png',{frameWidth: 243, frameHeight: 363 });
        
        tempSceneRef.load.audioSprite('blueSlimeSFX','audio/used-audio/blue-slime-sounds/blue-slime-sounds.json',[
          "audio/used-audio/blue-slime-sounds/blue-slime-sounds.mp3"
        ]);
 
      },
      blueSlimeHMs: function blueSlimeHMsFunction() {

        tempSceneRef.load.spritesheet('blue-slime-HM-F', 'assets/enemys/blue-slime-humanoid-male-female.png',{frameWidth: 243, frameHeight: 393 });
        tempSceneRef.load.spritesheet('blue-slime-HM-M', 'assets/enemys/blue-slime-humanoid-male-male.png',{frameWidth: 243, frameHeight: 393 });
        tempSceneRef.load.spritesheet('blue-slime-HF-M', 'assets/enemys/blue-slime-humanoid-female-male.png',{frameWidth: 243, frameHeight: 393 });
        tempSceneRef.load.spritesheet('blue-slime-HF-F', 'assets/enemys/blue-slime-humanoid-female-female.png',{frameWidth: 243, frameHeight: 393 });

        tempSceneRef.load.audioSprite('blueSlimeSFX','audio/used-audio/blue-slime-sounds/blue-slime-sounds.json',[
          "audio/used-audio/blue-slime-sounds/blue-slime-sounds.mp3"
        ]);
        
      },
      chestMimics: function chestMimicsFunction() {

        tempSceneRef.load.spritesheet('mimicFemale-evan-TF', 'assets/enemys/mimic_female_male1.png',{frameWidth: 381, frameHeight: 303 });
        tempSceneRef.load.spritesheet('mimicFemale-evan-vore', 'assets/enemys/mimic_female_male2.png',{frameWidth: 381, frameHeight: 303 });
        tempSceneRef.load.spritesheet('mimicFemale-evelyn-TF', 'assets/enemys/mimic_female_female1.png',{frameWidth: 381, frameHeight: 303 });
        tempSceneRef.load.spritesheet('mimicFemale-evelyn-vore', 'assets/enemys/mimic_female_female2.png',{frameWidth: 381, frameHeight: 303 });
        
        tempSceneRef.load.spritesheet('mimicMale-evan-TF', 'assets/enemys/mimic_male_male1.png',{frameWidth: 381, frameHeight: 303 });
        tempSceneRef.load.spritesheet('mimicMale-evan-vore', 'assets/enemys/mimic_male_male2.png',{frameWidth: 381, frameHeight: 303 });
        tempSceneRef.load.spritesheet('mimicMale-evelyn-TF', 'assets/enemys/mimic_male_female1.png',{frameWidth: 381, frameHeight: 303 });
        tempSceneRef.load.spritesheet('mimicMale-evelyn-vore', 'assets/enemys/mimic_male_female2.png',{frameWidth: 381, frameHeight: 303 });
        
        tempSceneRef.load.spritesheet('mimicTongue', 'assets/internalViews/mimicTongue.png',{frameWidth: 213, frameHeight: 213});
        tempSceneRef.load.spritesheet('mimicPenned', 'assets/internalViews/mimicPenned.png',{frameWidth: 213, frameHeight: 213});
        tempSceneRef.load.spritesheet('mimicPenning', 'assets/internalViews/mimicPenning.png',{frameWidth: 213, frameHeight: 213});
        
        tempSceneRef.load.audioSprite('woodBarrierSFX','audio/used-audio/wood-barrier-sounds/wood-barrier-sounds.json',[
          "audio/used-audio/wood-barrier-sounds/wood-barrier-sounds.mp3"
        ]);

      },
      whiteCats: function whiteCatsFunction() {

        tempSceneRef.load.spritesheet('whitecat-male-male-tf', 'assets/enemys/whitecat-male-male-tf.png',{frameWidth: 273, frameHeight: 309 });
        tempSceneRef.load.spritesheet('whitecat-male-female-tf', 'assets/enemys/whitecat-male-female-tf.png',{frameWidth: 273, frameHeight: 309 });
        tempSceneRef.load.spritesheet('whitecat-female-male-tf', 'assets/enemys/whitecat-female-male-tf.png',{frameWidth: 273, frameHeight: 309 });
        tempSceneRef.load.spritesheet('whitecat-female-female-tf', 'assets/enemys/whitecat-female-female-tf.png',{frameWidth: 273, frameHeight: 309 });
          
        tempSceneRef.load.spritesheet('whitecat-female-male-vore', 'assets/enemys/whitecat-female-male-vore.png',{frameWidth: 273, frameHeight: 309 });
        tempSceneRef.load.spritesheet('whitecat-female-female-vore', 'assets/enemys/whitecat-female-female-vore.png',{frameWidth: 273, frameHeight: 309 });
        tempSceneRef.load.spritesheet('whitecat-male-male-vore', 'assets/enemys/whitecat-male-male-vore.png',{frameWidth: 273, frameHeight: 309 });
        tempSceneRef.load.spritesheet('whitecat-male-female-vore', 'assets/enemys/whitecat-male-female-vore.png',{frameWidth: 273, frameHeight: 309 });

        tempSceneRef.load.spritesheet('whitecatPenning', 'assets/internalViews/whitecatPenning.png',{frameWidth: 213, frameHeight: 213});
        tempSceneRef.load.spritesheet('whitecatPenned', 'assets/internalViews/whitecatPenned.png',{frameWidth: 213, frameHeight: 213});
      
        tempSceneRef.load.spritesheet('cursedHeartProjectile', 'assets/gameObjects/cursedHeart.png',{frameWidth: 99, frameHeight: 99 });

        //hit sfx for when player gets hit.
        tempSceneRef.load.audioSprite('woodBarrierSFX','audio/used-audio/wood-barrier-sounds/wood-barrier-sounds.json',[
          "audio/used-audio/wood-barrier-sounds/wood-barrier-sounds.mp3"
        ]);

        tempSceneRef.load.audioSprite('whiteCatSFX','audio/used-audio/white-cat-sounds/white-cat-sounds.json',[
          "audio/used-audio/white-cat-sounds/white-cat-sounds.mp3"
        ]);

      },
      curseShadows: function curseShadowFunction() {

        tempSceneRef.load.spritesheet('curseShadowMale', 'assets/enemys/curseShadowMale.png',{frameWidth: 303, frameHeight: 429 });
        tempSceneRef.load.spritesheet('curseShadowFemale', 'assets/enemys/curseShadowFemale.png',{frameWidth: 303, frameHeight: 429 });
        
        tempSceneRef.load.audioSprite('woodBarrierSFX','audio/used-audio/wood-barrier-sounds/wood-barrier-sounds.json',[
          "audio/used-audio/wood-barrier-sounds/wood-barrier-sounds.mp3"
        ]);
  
        tempSceneRef.load.audioSprite('pumpingSFX','audio/used-audio/pumping-sounds/pumping-sounds.json',[
          "audio/used-audio/pumping-sounds/pumping-sounds.mp3"
        ]);

      },
      earieShadows: function earieShadowsFunction() {
        
        tempSceneRef.load.spritesheet('TShadow', 'assets/enemys/TShadow.png',{frameWidth: 225, frameHeight: 378 });

        tempSceneRef.load.audioSprite('earieSFX','audio/used-audio/earie-sounds/earie-sounds.json',[
          "audio/used-audio/earie-sounds/earie-sounds.mp3"
        ]);
  
        tempSceneRef.load.audioSprite('woodBarrierSFX','audio/used-audio/wood-barrier-sounds/wood-barrier-sounds.json',[
          "audio/used-audio/wood-barrier-sounds/wood-barrier-sounds.mp3"
        ]);
  
        tempSceneRef.load.audioSprite('pumpingSFX','audio/used-audio/pumping-sounds/pumping-sounds.json',[
          "audio/used-audio/pumping-sounds/pumping-sounds.mp3"
        ]);
      },
      mushrooms: function mushroomsFunction() {

        tempSceneRef.load.spritesheet('mushroom-nodes', 'assets/gameObjects/mushroom-nodes.png',{frameWidth: 303, frameHeight: 303 });
        tempSceneRef.load.spritesheet('mycelium', 'assets/gameObjects/mycelium.png',{frameWidth: 99, frameHeight: 99 });
        tempSceneRef.load.spritesheet('sporeCloud', 'assets/gameObjects/sporeCloud.png',{frameWidth: 219, frameHeight: 219 });
        tempSceneRef.load.spritesheet('mushroom-female-tf', 'assets/enemys/mushroom-female-tf.png',{frameWidth: 303, frameHeight: 303 });
        tempSceneRef.load.spritesheet('mushroom-male-tf', 'assets/enemys/mushroom-male-tf.png',{frameWidth: 303, frameHeight: 303 });

        tempSceneRef.load.audioSprite('growSFX','audio/used-audio/growing-sounds/growing-sounds.json',[
          "audio/used-audio/growing-sounds/growing-sounds.mp3"
        ]);

        tempSceneRef.load.audioSprite('sporeCloudSFX1','audio/used-audio/spore-cloud-sounds/spore-cloud-sounds.json',[
          "audio/used-audio/spore-cloud-sounds/spore-cloud-sounds.mp3"
        ]);

         tempSceneRef.load.audioSprite('sporeCloudSFX2','audio/used-audio/spore-cloud-sounds/spore-cloud-sounds.json',[
          "audio/used-audio/spore-cloud-sounds/spore-cloud-sounds.mp3"
        ]);

         tempSceneRef.load.audioSprite('sporeCloudSFX3','audio/used-audio/spore-cloud-sounds/spore-cloud-sounds.json',[
          "audio/used-audio/spore-cloud-sounds/spore-cloud-sounds.mp3"
        ]);

      },
      mushroomDefeats: function mushroomsDefeatsFunction() {
        
        tempSceneRef.load.spritesheet('evelyn-mushroom-tf', 'assets/enemys/evelyn-mushroom-tf.png',{frameWidth:393, frameHeight: 243 });
        tempSceneRef.load.spritesheet('evan-mushroom-tf', 'assets/enemys/evan-mushroom-tf.png',{frameWidth:393, frameHeight: 243 });
        tempSceneRef.load.spritesheet('Mycelium Root', 'assets/enemys/Mycelium Root.png',{frameWidth:693, frameHeight: 693});

      },

      matangoRoot: function matangoRootFunction() {

        tempSceneRef.load.audioSprite('bossSFX','audio/used-audio/button-sounds/button-sounds.json',[
            "audio/used-audio/button-sounds/button-sounds.mp3"
        ]);

        tempSceneRef.load.audioSprite('bossRoarSFX','audio/used-audio/growing-sounds/growing-sounds.json',[
          "audio/used-audio/growing-sounds/growing-sounds.mp3"
        ]);

        tempSceneRef.load.spritesheet('bossStartMatango', 'assets/gameObjects/bossStartMatango.png',{frameWidth: 96, frameHeight: 96 });

        tempSceneRef.load.spritesheet('Matango-Root-F-1', 'assets/bosses/Matango-Root-F-1.png',{frameWidth: 693, frameHeight: 561 });
        tempSceneRef.load.spritesheet('Matango-Root-F-2', 'assets/bosses/Matango-Root-F-2.png',{frameWidth: 693, frameHeight: 561 });
        tempSceneRef.load.spritesheet('Matango-Root-F-3', 'assets/bosses/Matango-Root-F-3.png',{frameWidth: 693, frameHeight: 561 });
        tempSceneRef.load.spritesheet('Matango-Root-F-4', 'assets/bosses/Matango-Root-F-4.png',{frameWidth: 693, frameHeight: 561 });
        tempSceneRef.load.spritesheet('Matango-Root-F-5', 'assets/bosses/Matango-Root-F-5.png',{frameWidth: 693, frameHeight: 561 });
        tempSceneRef.load.spritesheet('Matango-Root-F-6', 'assets/bosses/Matango-Root-F-6.png',{frameWidth: 693, frameHeight: 561 });
        tempSceneRef.load.spritesheet('Matango-Root-F-7', 'assets/bosses/Matango-Root-F-7.png',{frameWidth: 693, frameHeight: 561 });
        tempSceneRef.load.spritesheet('Matango-Root-F-8', 'assets/bosses/Matango-Root-F-8.png',{frameWidth: 693, frameHeight: 561 });
        tempSceneRef.load.spritesheet('Matango-Root-F-9', 'assets/bosses/Matango-Root-F-9.png',{frameWidth: 693, frameHeight: 561 });

        tempSceneRef.load.spritesheet('Matango-Root-M-1', 'assets/bosses/Matango-Root-M-1.png',{frameWidth: 693, frameHeight: 561 });

        tempSceneRef.load.spritesheet('mushroom-hands-single', 'assets/bosses/mushroom-hands-single.png',{frameWidth: 393, frameHeight: 273 });
        tempSceneRef.load.spritesheet('mushroom-hands-double', 'assets/bosses/mushroom-hands-double.png',{frameWidth: 573, frameHeight: 273 });


      },

    };

    //after we finish preloading enemy assets, call the function in G9CheckEnemy.js to set up the map of enemy check functions
    this.setUpEnemyCheckMap();

  }
  
  //sets up colliders for enemys using a map of collider functions. DRIVER FUNCTION
  setUpEnemyPreload(enemyGroupArray){

    //if the enemyGroupArray is not defined
    if(enemyGroupArray === null || enemyGroupArray === undefined){
      this.enemyGroupArray = [];
    }

    //call function to create a map of enemy collider functions if its not define, so i dont need to define it in every scene.
    if(this.mapOfEnemyPreloadFunctions === null || this.mapOfEnemyPreloadFunctions === undefined){
      console.log("enemy preload map missing, calling function to create");
      this.setUpEnemyPreloads();
    }

    if(enemyGroupArray.length > 0){
      console.log("enemyGroupArray: ",enemyGroupArray);
        //array storing all the enemy groups present. currently empty
        //loop which searches array of enemys, then allocates those groups.
        for(let counter = 0; counter < enemyGroupArray.length; counter++){
          
          //call our map of enemy collision functions.
          this.mapOfEnemyPreloadFunctions[enemyGroupArray[counter]]();
        }
      
    }

  }

}