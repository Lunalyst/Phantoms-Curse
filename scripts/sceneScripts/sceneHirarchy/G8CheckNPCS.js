/****************************************************************************** 
description: handles gameplay logic for npc during gameplay?
*******************************************************************************/
class G8CheckNPCS extends G7CheckGameObjects {

  //checks to see if the player can activate a npc object
  checkNpc(scene) {
    //applies a function to each portal object in the scene
    scene.npcs.children.each(function (tempNpc) {
      if ((scene.player1.x > tempNpc.x - 40 && scene.player1.x < tempNpc.x + 40) && (scene.player1.y > tempNpc.y - 40 && scene.player1.y < tempNpc.y + 40) && scene.grabbed === false) {
        console.log("within npc range");
        tempNpc.safeToSpeak = true;
        scene.activatedNpcId = tempNpc.npcId;
      } else {
        //console.log("outside save point");
        tempNpc.safeToSpeak = false;
      }
      tempNpc.activateNpc();

    }, scene);
  }

  //function to check npc that trigger 
  checkNpcTriggers(scene) {

    
    //applies a function to each trigger npc object in the scene
    
    scene.npcTriggers.children.each(function (tempNpc) {
        //if the player is within x range., the trigger wasnt already finished, and that the player isnt grabbed?
      
      if ((scene.player1.x > tempNpc.x - 20 && scene.player1.x < tempNpc.x + 20) && (scene.player1.y > tempNpc.y - 300 && scene.player1.y < tempNpc.y +70) && scene.grabbed === false && tempNpc.triggerNpcFinished === false) {
        
        console.log("in range");
        //set id to this object.
        this.activatedNpcId = tempNpc.npcId;
        tempNpc.overlapActivateNpc();
        
      } 

    }, scene);
  }
}


