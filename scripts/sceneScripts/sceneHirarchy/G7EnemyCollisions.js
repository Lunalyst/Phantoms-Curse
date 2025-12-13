/****************************************************************************** 
description: initiation of enemys, as well as functions related to enemy
behavior.
*******************************************************************************/
class G7EnemyCollisions extends G6PreloadEnemys{

  //sets up enemy collision functions.
  setUpEnemyCollisionFunctions(){

    let tempSceneRef = this;

        /* note about map of functions. make sure name of function is unique as it will
         overwrite any other function or class with the same name and cause a recursive loop that crashes the browser */
        this.mapOfEnemyCollisionFunctions = {
          blueSlimes: function blueSlimesFunction() {
            console.log("adding blueSlimes group");
            tempSceneRef.blueSlimes = tempSceneRef.add.group();
            tempSceneRef.physics.add.collider(tempSceneRef.processMap.layer1, tempSceneRef.blueSlimes);
            //since layer 3 is rarely used, we will be using it as the layer where enemy collisions take place so we can have a more clean and effecient barrier thats less resource intensive.
            tempSceneRef.physics.add.collider(tempSceneRef.processMap.layer3, tempSceneRef.blueSlimes); 
          },
          tigers: function tigersFunction() {
            console.log("adding Tigers group");
            tempSceneRef.tigers = tempSceneRef.add.group();
            tempSceneRef.physics.add.collider(tempSceneRef.processMap.layer1, tempSceneRef.tigers);
            //since layer 3 is rarely used, we will be using it as the layer where enemy collisions take place so we can have a more clean and effecient barrier thats less resource intensive.
            tempSceneRef.physics.add.collider(tempSceneRef.processMap.layer3, tempSceneRef.tigers); 
          
          },
          rabbits: function rabbitsFunction() {
            console.log("adding rabbits group");
            tempSceneRef.rabbits = tempSceneRef.add.group();
            tempSceneRef.physics.add.collider(tempSceneRef.processMap.layer1, tempSceneRef.rabbits);
            //since layer 3 is rarely used, we will be using it as the layer where enemy collisions take place so we can have a more clean and effecient barrier thats less resource intensive.
            tempSceneRef.physics.add.collider(tempSceneRef.processMap.layer3, tempSceneRef.rabbits); 
          
          },
          beeDrones: function beeDronesFunction() {
            console.log("adding beeDrones group");
            tempSceneRef.beeDrones = tempSceneRef.add.group();
            tempSceneRef.physics.add.collider(tempSceneRef.processMap.layer1, tempSceneRef.beeDrones);
            //since layer 3 is rarely used, we will be using it as the layer where enemy collisions take place so we can have a more clean and effecient barrier thats less resource intensive.
            tempSceneRef.physics.add.collider(tempSceneRef.processMap.layer3, tempSceneRef.beeDrones); 
          
          },
          bats: function batsFunction() {
            console.log("adding bats group");
            tempSceneRef.bats = tempSceneRef.add.group();
            tempSceneRef.physics.add.collider(tempSceneRef.processMap.layer1, tempSceneRef.bats );
            //since layer 3 is rarely used, we will be using it as the layer where enemy collisions take place so we can have a more clean and effecient barrier thats less resource intensive.
            //tempSceneRef.physics.add.collider(tempSceneRef.processMap.layer3, tempSceneRef.bats ); 
          
          },
          blueSlimeHSs: function blueSlimeHSsFunction() {
            console.log("adding blueSlimeHSs group");
            tempSceneRef.blueSlimeHSs = tempSceneRef.add.group();
            tempSceneRef.physics.add.collider(tempSceneRef.processMap.layer1, tempSceneRef.blueSlimeHSs );
            //since layer 3 is rarely used, we will be using it as the layer where enemy collisions take place so we can have a more clean and effecient barrier thats less resource intensive.
            //tempSceneRef.physics.add.collider(tempSceneRef.processMap.layer3, tempSceneRef.blueSlimeHSs ); 
          
          },
          blueSlimeHMs: function blueSlimeHMsFunction() {
            console.log("adding blueSlimeHMs group");
            tempSceneRef.blueSlimeHMs = tempSceneRef.add.group();
            tempSceneRef.physics.add.collider(tempSceneRef.processMap.layer1, tempSceneRef.blueSlimeHMs );
            //since layer 3 is rarely used, we will be using it as the layer where enemy collisions take place so we can have a more clean and effecient barrier thats less resource intensive.
            //tempSceneRef.physics.add.collider(tempSceneRef.processMap.layer3, tempSceneRef.blueSlimeHMs ); 
          
          },
          chestMimics: function chestMimicsFunction() {
            console.log("adding chestMimics group");
            tempSceneRef.chestMimics = tempSceneRef.add.group();
            tempSceneRef.physics.add.collider(tempSceneRef.processMap.layer1, tempSceneRef.chestMimics );
            //since layer 3 is rarely used, we will be using it as the layer where enemy collisions take place so we can have a more clean and effecient barrier thats less resource intensive.
            tempSceneRef.physics.add.collider(tempSceneRef.processMap.layer3, tempSceneRef.chestMimics ); 
          
          },
          whiteCats: function whiteCatsFunction() {
            console.log("adding whiteCats group");
            tempSceneRef.whiteCats = tempSceneRef.add.group();
            tempSceneRef.physics.add.collider(tempSceneRef.processMap.layer1, tempSceneRef.whiteCats );
            //since layer 3 is rarely used, we will be using it as the layer where enemy collisions take place so we can have a more clean and effecient barrier thats less resource intensive.
            tempSceneRef.physics.add.collider(tempSceneRef.processMap.layer3, tempSceneRef.whiteCats ); 
          
          },
          curseShadows: function curseShadowsFunction() {
            console.log("adding curseShadows group");
            tempSceneRef.curseShadows = tempSceneRef.add.group();
            tempSceneRef.physics.add.collider(tempSceneRef.processMap.layer1, tempSceneRef.curseShadows);
            //since layer 3 is rarely used, we will be using it as the layer where enemy collisions take place so we can have a more clean and effecient barrier thats less resource intensive.
            //tempSceneRef.physics.add.collider(tempSceneRef.processMap.layer3, tempSceneRef.curseShadows); 
          
          },
          earieShadows: function earieShadowsFunction() {
            console.log("adding earieShadows group");
            tempSceneRef.earieShadows = tempSceneRef.add.group();
            tempSceneRef.physics.add.collider(tempSceneRef.processMap.layer1, tempSceneRef.earieShadows);
            //since layer 3 is rarely used, we will be using it as the layer where enemy collisions take place so we can have a more clean and effecient barrier thats less resource intensive.
            //tempSceneRef.physics.add.collider(tempSceneRef.processMap.layer3, tempSceneRef.earieShadows); 
          
          },
          mushrooms: function mushroomsFunction() {
            console.log("adding mushrooms group");
            tempSceneRef.mushrooms = tempSceneRef.physics.add.group();
          },
          mushroomDefeats: function mushroomDefeatsFunction() {
            console.log("adding mushrooms group");
            tempSceneRef.mushroomDefeats = tempSceneRef.add.group();
          },
          matangoRoot: function matangoRootFunction() {
            console.log("adding matangoRoot group");
            tempSceneRef.matangoRoots = tempSceneRef.physics.add.group();
            tempSceneRef.matangoRootHands = tempSceneRef.add.group();

            
          },
          
        };
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
    this.enemys = this.add.group();
      

    //creates id so scene can work with multiple enemys
    this.enemyId = 0;
    

  }

}