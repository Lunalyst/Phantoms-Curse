/****************************************************************************** 
description: set up functions for npcs
*******************************************************************************/
class G5InitNPCs extends G4InitGameObjects {

  //creates a lunalyst NPC
  initLunalyst(x, y, text) {
    let luna = new lunalyst(this, x, y, text);

    luna.npcId = this.npcId;
    this.npcId++;

    this.npcs.add(luna);

    //if we are using dark lighting
    if(this.lightingSystemActive === true){ 
      luna.setPipeline('Light2D');
    }

  }

  initIstara(x, y, type) {

    //sets up the special text box object for istara
    this.sceneTextBox.textBoxProfileImage.setUpIstaraEmots();

    //create istara npc
    let Istara = new istara(this, x, y, type);

    Istara.npcId = this.npcId;
    this.npcId++;
    this.npcs.add(Istara);

    //if we are using dark lighting
    if(this.lightingSystemActive === true){ 
      Istara.setPipeline('Light2D');
    }

  }

}