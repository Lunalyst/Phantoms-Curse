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

   //creates a sign object in the scene
  initSigns(x, y, text , textKey,visible) {

      let sign1 = new sign(this, x, y, text, textKey);
      sign1.npcId = this.npcId;
      this.signId++;

      this.npcs.add(sign1);

      if(visible !== undefined && visible !== null){
        sign1.visible = visible;
      }

      //if we are using dark lighting
      if(this.lightingSystemActive === true){ 
        sign1.setPipeline('Light2D');
      }
      
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
    //this.npcTriggers.add(tutorial);

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
      this.npcTriggers.add(Vivian);
      this.npcs.add(Vivian);  
    }else{
      this.npcs.add(Vivian);
    }

    //if we are using dark lighting
    if(this.lightingSystemActive === true){ 
       Vivian.setPipeline('Light2D');
    }
  }

  initMilo(x, y, type){

    //sets up the special text box object for istara
    this.sceneTextBox.textBoxProfileImage.setUpMiloEmots();

    this.Milo = new milo(this, x, y, type);

    this.Milo.npcId = this.npcId;
    this.npcId++;

    this.npcs.add(this.Milo);

  }

  initNectar(x, y, type){

    //sets up the special text box object for nectar
    this.sceneTextBox.textBoxProfileImage.setUpNectarEmots();
    //create istara npc
    let Nectar = new nectar(this, x, y, type);

    Nectar.npcId = this.npcId;
    this.npcId++;

    //notice, we add vivian to both the trigger npcs group and the regular npc group
    //this is so that the trigger dialogue always occurs first
    //we then flag in the npc logic to changer the dialogue after the trigger version

    if(type === "ambush"){
      this.npcTriggers.add(Nectar);
      this.npcs.add(Nectar);  
    }else{
      this.npcs.add(Nectar);
    }

  }

}