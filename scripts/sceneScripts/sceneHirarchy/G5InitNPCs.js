/****************************************************************************** 
description: set up functions for npcs
*******************************************************************************/
class G5InitNPCs extends G4InitGameObjects {

  //creates a tutorial NPC
  initTutorialPrompt(x, y,text) {

    //create generic npc for tutorial object
    let tutorial = new Tutorial(this, x, y, text);

    //increment npcid
    tutorial.npcId = this.npcId;
    this.npcId++;

    //need to set up the tutorial dialogue from file.
    this.npcTriggers.add(tutorial);

  }

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
    //need to set up the tutorial dialogue from file.
    this.npcTriggers.add(tutorial);

    this.npcs.add(Istara);

    //if we are using dark lighting
    if(this.lightingSystemActive === true){ 
      Istara.setPipeline('Light2D');
    }

  }

  initVivian(x, y, type) {
    //sets up the special text box object for istara
    this.sceneTextBox.textBoxProfileImage.setUpVivianEmots();

    //create istara npc
    let Vivian = new vivian(this, x, y, type);

    //special case with vivian, if she is in one of her three minigame logics
    if(type === 'voreSequence' || type === 'tfSequence' || type === 'playerWinsLantern' || type === 'playerWinsShell' ){
      this.vivianArray.push(Vivian);
    }
    

    Vivian.npcId = this.npcId;
    this.npcId++;
    //notice, we add vivian to both the trigger npcs group and the regular npc group
    //this is so that the trigger dialogue always occurs first
    //we then flag in the npc logic to changer the dialogue after the trigger version
    if(type === "rummaging"){
      this.npcTriggers.add( Vivian);
      this.npcs.add(Vivian);  
    }else{
      
      this.npcs.add(Vivian);
    }

    //if we are using dark lighting
    if(this.lightingSystemActive === true){ 
       Vivian.setPipeline('Light2D');
    }
  }

}