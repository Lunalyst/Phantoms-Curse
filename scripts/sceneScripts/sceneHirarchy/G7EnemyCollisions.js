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
    //since layer 3 is rarely used, we will be using it as the layer where enemy collisions take place so we can have a more clean and effecient barrier thats less resource intensive.
    this.physics.add.collider(this.processMap.layer3, this.enemys); 

  }

}