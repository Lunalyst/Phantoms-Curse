/****************************************************************************** 
description: handles gameplay logic for npc during gameplay?
*******************************************************************************/
class G10CheckNPCS extends G9CheckEnemys {

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
      
        //default range of trigger npc
      if(this.npcTriggerRange === false){
        //alter here for the trigger of the trigger npc dialogue.
        if (this.objectsInRangeX(tempNpc,scene.player1,20) && this.objectsInRangeY(tempNpc,scene.player1,300) && scene.grabbed === false && tempNpc.triggerNpcFinished === false) {
          
          //console.log("in range");
          //set id to this object.
          this.activatedNpcId = tempNpc.npcId;
          tempNpc.overlapActivateNpc();
          
        } 
      //if special range is set, then use that range instead.
      }else{
        if (this.objectsInRangeX(tempNpc,scene.player1,tempNpc.npcTriggerRangeX) && this.objectsInRangeY(tempNpc,scene.player1,tempNpc.npcTriggerRangeY) && tempNpc.triggerNpcFinished === false) {
          
          //console.log("in range");
          //set id to this object.
          this.activatedNpcId = tempNpc.npcId;
          tempNpc.overlapActivateNpc();
          
        } 
      }
      

    }, scene);
  }
}


