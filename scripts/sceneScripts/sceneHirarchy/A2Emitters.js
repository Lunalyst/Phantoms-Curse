/****************************************************************************** 
description: this class contains important methods for viewing and clearing 
emitters. its important that all scenes have acess to this class, to emitters,
can be viewed or cleared.
*******************************************************************************/
class A2Emitters extends A1SaveAndLoad {

  //function that prints listeners
  printActiveEmitter(){

    //creates two arrays to hold keys and emitters, same code is in gameover function in default scene.
    let emitterArray = [];
    let keyArray = [];

    keyArray.push(healthEvent);
    emitterArray.push(healthEmitter);

    keyArray.push(controlKeyEvent);
    emitterArray.push(controlKeyEmitter);
    
    keyArray.push(SceneTransitionLoad);
    emitterArray.push(loadSceneTransitionLoad);

    keyArray.push(tabKey);
    emitterArray.push(accessTabKey);

    keyArray.push(inventoryKey);
    emitterArray.push(inventoryKeyEmitter);

    keyArray.push(playerSkills);
    emitterArray.push(playerSkillsEmitter);

    keyArray.push(playerSaveSlot);
    emitterArray.push(playerSaveSlotEmitter);

    keyArray.push(skipIndicator);
    emitterArray.push(skipIndicatorEmitter);

    keyArray.push(hudDepth);
    emitterArray.push(hudDepthEmitter);
    

    let emitterTotal = 0;
    //loops through the arrays
    for(let counter = 0; counter < emitterArray.length; counter++){
      //for each key add the emitter totals
      for(const property in keyArray[counter]){
        //console.log(`emitter: ${property}: ${healthEvent[property]}`);
        emitterTotal = emitterTotal + emitterArray[counter].listenerCount(keyArray[counter][property]);
        //healthEmitter.removeAllListeners(healthEvent[property]);
      }
      //print the emitter listeners
      //console.log(keyArray[counter]," current listeners: ",emitterTotal);
      emitterTotal = 0;

    }  
  }

  //clears all emitters
  clearAllEmmitters(){

    console.log("removing listeners");

    let emitterArray = [];
    let keyArray = [];

    keyArray.push(healthEvent);
    emitterArray.push(healthEmitter);

    keyArray.push(controlKeyEvent);
    emitterArray.push(controlKeyEmitter);

    keyArray.push(struggleEvent);
    emitterArray.push(struggleEmitter);
    
    keyArray.push(SceneTransitionLoad);
    emitterArray.push(loadSceneTransitionLoad);

    keyArray.push(tabKey);
    emitterArray.push(accessTabKey);

    keyArray.push(inventoryKey);
    emitterArray.push(inventoryKeyEmitter);

    keyArray.push(playerSkills);
    emitterArray.push(playerSkillsEmitter);

    keyArray.push(playerSaveSlot);
    emitterArray.push(playerSaveSlotEmitter);

    keyArray.push(skipIndicator);
    emitterArray.push(skipIndicatorEmitter);

    keyArray.push(giveUpIndicator);
    emitterArray.push(giveUpIndicatorEmitter);

    keyArray.push(hudDepth);
    emitterArray.push(hudDepthEmitter);
    

    //same code is in gameover function in default scene.

    for(let counter = 0; counter < emitterArray.length; counter++){

      for(const property in keyArray[counter]){
        
      emitterArray[counter].removeAllListeners(keyArray[counter][property]);
        
      }

    }  

    

  }

  //clears all emitters
  clearGameplayEmmitters(){

    console.log("removing gameplay listeners");

    let emitterArray = [];
    let keyArray = [];

    keyArray.push(SceneTransitionLoad);
    emitterArray.push(loadSceneTransitionLoad);

    //same code is in gameover function in default scene.

    for(let counter = 0; counter < emitterArray.length; counter++){

      for(const property in keyArray[counter]){
        
      emitterArray[counter].removeAllListeners(keyArray[counter][property]);
        
      }

    }  

    

  }

  

}
