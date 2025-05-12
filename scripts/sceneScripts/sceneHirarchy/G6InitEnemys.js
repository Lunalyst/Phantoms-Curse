/****************************************************************************** 
description: initiation of enemys, as well as functions related to enemy
behavior.
*******************************************************************************/
class G6InitEnemys extends G5InitNPCs{

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
        
        tempSceneRef.load.spritesheet('rabbitMale', 'assets/enemys/rabbit-male-all.png',{frameWidth: 429, frameHeight: 300 });
        tempSceneRef.load.spritesheet('rabbitFemale', 'assets/enemys/rabbit female-all.png',{frameWidth: 429, frameHeight: 300 });
        tempSceneRef.load.spritesheet('rabbitPenning', 'assets/internalViews/rabbitPenning.png',{frameWidth: 213, frameHeight: 213});
        tempSceneRef.load.spritesheet('rabbitPenned', 'assets/internalViews/rabbitPenned.png',{frameWidth: 213, frameHeight: 213});
        
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

      },
      bats: function batsFunction() {

        tempSceneRef.load.spritesheet('batMale', 'assets/enemys/batMaleAll.png',{frameWidth: 273, frameHeight: 435 });
        tempSceneRef.load.spritesheet('batFemale', 'assets/enemys/batFemaleAll.png',{frameWidth: 273, frameHeight: 435  });


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

    };

  }

  //sets up enemy collision functions.
  setUpEnemyCollisionFunctions(){

    let tempSceneRef = this;

        /* note about map of functions. make sure name of function is unique as it will
         overwrite any other function or class with the same name and cause a recursive loop that crashes the browser */
        this.mapOfEnemyCollisionFunctions = {
          blueSlimes: function blueSlimesFunction() {
            console.log("adding blueSlimes group");
            tempSceneRef.blueSlimes = tempSceneRef.physics.add.group();
          },
          tigers: function tigersFunction() {
            console.log("adding Tigers group");
            tempSceneRef.tigers = tempSceneRef.physics.add.group();
          },
          rabbits: function rabbitsFunction() {
            console.log("adding rabbits group");
            tempSceneRef.rabbits = tempSceneRef.physics.add.group();
          },
          beeDrones: function beeDronesFunction() {
            console.log("adding beeDrones group");
            tempSceneRef.beeDrones = tempSceneRef.physics.add.group();
          },
          bats: function batsFunction() {
            console.log("adding bats group");
            tempSceneRef.bats = tempSceneRef.physics.add.group();
          },
          blueSlimeHSs: function blueSlimeHSsFunction() {
            console.log("adding blueSlimeHSs group");
            tempSceneRef.blueSlimeHSs = tempSceneRef.physics.add.group();
          },
          blueSlimeHMs: function blueSlimeHMsFunction() {
            console.log("adding blueSlimeHMs group");
            tempSceneRef.blueSlimeHMs = tempSceneRef.physics.add.group();
          },
          chestMimics: function chestMimicsFunction() {
            console.log("adding chestMimics group");
            tempSceneRef.chestMimics = tempSceneRef.physics.add.group();
          },
          whiteCats: function whiteCatsFunction() {
            console.log("adding whiteCats group");
            tempSceneRef.whiteCats = tempSceneRef.physics.add.group();
          },
          curseShadows: function curseShadowsFunction() {
            console.log("adding curseShadows group");
            tempSceneRef.curseShadows = tempSceneRef.physics.add.group();
          },
          earieShadows: function earieShadowsFunction() {
            console.log("adding earieShadows group");
            tempSceneRef.earieShadows = tempSceneRef.physics.add.group();
          },
          
        };
  }
  
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
      },
      blueSlimeLarge: function blueSlimeLargeFunction(startX, startY, playerSex,inSafeMode,soundSFX) {
        let slime1 = new blueSlime(tempSceneRef, startX, startY, playerSex,tempSceneRef.enemyId,inSafeMode);
        console.log("created blue slime large id: ",slime1.enemyId);
        tempSceneRef.enemyId++;
        slime1.slimeSize = 2;
        slime1.anims.play("slimeLargeIdle",true);
        tempSceneRef.enemys.add(slime1);
        tempSceneRef.blueSlimes.add(slime1);
      },
      tiger: function tigerFunction(startX, startY, playerSex,inSafeMode,soundSFX) {
        let tiger1 = new tiger(tempSceneRef, startX, startY, playerSex,tempSceneRef.enemyId,inSafeMode);
        console.log("created tiger id: ",tiger1.enemyId);
        tempSceneRef.enemyId++;
        tempSceneRef.enemys.add(tiger1);  
        tempSceneRef.tigers.add(tiger1);
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
        let rabbit1 = new rabbit(tempSceneRef, startX, startY, playerSex,tempSceneRef.enemyId,inSafeMode);
        console.log("created rabbit id: ",rabbit1.enemyId);
        tempSceneRef.enemyId++;
        tempSceneRef.enemys.add(rabbit1);  
        tempSceneRef.rabbits.add(rabbit1);
      },
      beeDrone: function beeDroneFunction(startX, startY, playerSex,inSafeMode,soundSFX) {
        let beeDrone1 = new beeDrone(tempSceneRef, startX, startY, playerSex,tempSceneRef.enemyId,inSafeMode,soundSFX);
        console.log("created beeDrone id: ",beeDrone1.enemyId);
        tempSceneRef.enemyId++;
        tempSceneRef.enemys.add(beeDrone1);  
        tempSceneRef.beeDrones.add(beeDrone1);
      },
      bat: function batFunction(startX, startY, playerSex,inSafeMode,soundSFX) {
        console.log("inSafeMode: ",inSafeMode)
        let bat1 = new bat(tempSceneRef, startX, startY, playerSex,tempSceneRef.enemyId,inSafeMode,soundSFX);
        console.log("created bat id: ",bat1.enemyId);
        tempSceneRef.enemyId++;
        tempSceneRef.enemys.add(bat1);  
        tempSceneRef.bats.add(bat1);
      },
      blueSlimeHS: function blueSlimeHSFunction(startX, startY, playerSex,inSafeMode,soundSFX) {
        let slime1 = new blueSlimeHS(tempSceneRef, startX, startY, playerSex,tempSceneRef.enemyId,inSafeMode);
        console.log("created blueSlimeHS id: ",slime1.enemyId);
        tempSceneRef.enemyId++;
        tempSceneRef.enemys.add(slime1);
        tempSceneRef.blueSlimeHSs.add(slime1);
      },
      blueSlimeHM: function blueSlimeHMFunction(startX, startY, playerSex,inSafeMode,soundSFX) {
        let slime1 = new blueSlimeHM(tempSceneRef, startX, startY, playerSex,tempSceneRef.enemyId,inSafeMode);
        console.log("created blueSlimeHM id: ",slime1.enemyId);
        tempSceneRef.enemyId++;
        tempSceneRef.enemys.add(slime1);
        tempSceneRef.blueSlimeHMs.add(slime1);
      },
      chestMimic: function chestMimicFunction(startX, startY, playerSex,inSafeMode,soundSFX) {
        let mimic = new chestMimic(tempSceneRef, startX, startY, playerSex,tempSceneRef.enemyId,inSafeMode,soundSFX);
        console.log("created chestMimic id: ",mimic.enemyId);
        tempSceneRef.enemyId++;
        tempSceneRef.enemys.add(mimic);
        tempSceneRef.chestMimics.add(mimic);
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
        let cat = new whiteCat(tempSceneRef, startX, startY, playerSex,tempSceneRef.enemyId,inSafeMode);
        console.log("created whiteCat id: ",cat.enemyId);
        tempSceneRef.enemyId++;
        tempSceneRef.enemys.add(cat);
        tempSceneRef.whiteCats.add(cat);
      },
      angryWhiteCat: function angryWhiteCatFunction(startX, startY, playerSex,inSafeMode,soundSFX) {
        let cat = new whiteCat(tempSceneRef, startX, startY, playerSex,tempSceneRef.enemyId,inSafeMode);
        cat.angry = true;
        cat.anims.play('catAngryidleViewer',true);
        console.log("created angryWhiteCat id: ",cat.enemyId);
        tempSceneRef.enemyId++;
        tempSceneRef.enemys.add(cat);
        tempSceneRef.whiteCats.add(cat);
      },
      curseShadow: function curseShadowFunction(startX, startY, playerSex,inSafeMode,soundSFX) {
        let shadow = new curseShadow(tempSceneRef, startX, startY, playerSex,tempSceneRef.enemyId,inSafeMode);
        tempSceneRef.enemyId++;
        console.log("created curseShadow id: ",shadow.enemyId);
        tempSceneRef.enemys.add(shadow);
        tempSceneRef.curseShadows.add(shadow);
      },
      earieShadow: function earieShadowFunction(startX, startY, playerSex,inSafeMode,soundSFX) {
        let earieS = new EarieShadow(tempSceneRef, startX, startY, playerSex,tempSceneRef.enemyId,inSafeMode);
        tempSceneRef.enemyId++;
        console.log("created earieShadows id: ",earieS.enemyId);
        tempSceneRef.enemys.add(earieS);
        tempSceneRef.earieShadows.add(earieS);
      },
      
    };
  }

  //sets up colliders for enemys using a map of collider functions
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

  //sets up colliders for enemys using a map of collider functions
  setUpEnemyCollider(enemyGroupArray){

    //call function to create a map of enemy collider functions if its not define, so i dont need to define it in every scene.
    if(this.mapOfEnemyCollisionFunctions === null || this.mapOfEnemyCollisionFunctions === undefined){
      console.log("enemy collider map missing, calling function to create");
      this.setUpEnemyCollisionFunctions();
    }

    //if the enemyGroupArray is not defined
    if(enemyGroupArray === null || enemyGroupArray === undefined){
      this.enemyGroupArray = [];
    }

    if(enemyGroupArray.length > 0){
      console.log("enemyGroupArray: ",enemyGroupArray);
        //array storing all the enemy groups present. currently empty
        //loop which searches array of enemys, then allocates those groups.
        for(let counter = 0; counter < enemyGroupArray.length; counter++){
          
          //call our map of enemy collision functions.
          this.mapOfEnemyCollisionFunctions[enemyGroupArray[counter]]();
        }
      
      }

    //creates enemys group that can apply geberic functions to all enemys
    this.enemys = this.physics.add.group();
      

    //creates id so scene can work with multiple enemys
    this.enemyId = 0;
    this.physics.add.collider(this.processMap.layer1, this.enemys);
    this.physics.add.collider(this.processMap.layer0, this.enemys); 

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