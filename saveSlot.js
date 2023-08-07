class saveSlot extends Phaser.Physics.Arcade.Sprite {
  // every class needs constructor
  constructor(scene, xPos, yPos) {
    //super() calls the constructor() from the parent class we are extending
    super(scene, xPos, yPos, 'saveSlot');
    //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
    //so here in the subclass of sprite its refering to the image object we just made. 
    scene.add.existing(this);
    this.characterSexSlot;
    this.visible = false;

    this.sexIcon = new sexMark(scene, this.x - 340, this.y - 10);
    this.healthIcon = new healthMark(scene, this.x - 340, this.y + 45);
    this.bestiaryIcon = new bestiaryMark(scene, this.x - 260, this.y - 10);
    this.shellIcon = new shellMark(scene, this.x - 260, this.y + 45);



    let startingX = -375;
    let startingY = -40;
    let spacing = 0;
    let rows = 0;

    this.slotLetters = [];
    let slotLetterString = "SLOT:?";
    for (let counter = 0; counter < slotLetterString.length; counter++) {
      this.slotLetters.push(new textBoxCharacter(scene, this.x + startingX, this.y + startingY));
      this.slotLetters[counter].anims.play(slotLetterString.charAt(counter));
      this.slotLetters[counter].x = this.slotLetters[counter].x + spacing;
      this.slotLetters[counter].y = this.slotLetters[counter].y - 23;
      spacing = spacing + 15;
    }


    startingX = -110;
    startingY = -0;
    spacing = 0;
    rows = 0;


    this.skillMarks = [];


    for (let counter = 0; counter < 11; counter++) {

      this.skillMarks.push(new skillMark(scene, this.x + startingX, this.y + startingY));

      if (counter === 5) {
        rows++;
        spacing = 0;
      }

      if (rows === 0) {
        this.skillMarks[counter].x = this.skillMarks[counter].x + spacing;
        this.skillMarks[counter].y = this.skillMarks[counter].y - 23;
        spacing = spacing + 40;
      } else if (rows === 1) {
        this.skillMarks[counter].x = this.skillMarks[counter].x + spacing;
        this.skillMarks[counter].y = this.skillMarks[counter].y + 23;
        spacing = spacing + 40;
      }


    }

    startingX = -120;
    startingY = -40;
    spacing = 0;
    rows = 0;


    this.skillLetters = [];
    let skillString = "SKILLS:";
    for (let counter = 0; counter < skillString.length; counter++) {
      this.skillLetters.push(new textBoxCharacter(scene, this.x + startingX, this.y + startingY));
      this.skillLetters[counter].anims.play(skillString.charAt(counter));
      this.skillLetters[counter].x = this.skillLetters[counter].x + spacing;
      this.skillLetters[counter].y = this.skillLetters[counter].y - 23;
      spacing = spacing + 15;

    }


    startingX = -220;
    startingY = 70;
    spacing = 0;
    rows = 0;

    this.shellLetters = [];
    let shellString = "000";
    for (let counter = 0; counter < shellString.length; counter++) {
      this.shellLetters.push(new textBoxCharacter(scene, this.x + startingX, this.y + startingY));
      this.shellLetters[counter].anims.play(shellString.charAt(counter));
      this.shellLetters[counter].x = this.shellLetters[counter].x + spacing;
      this.shellLetters[counter].y = this.shellLetters[counter].y - 23;
      spacing = spacing + 25;

    }


    startingX = -220;
    startingY = 12;
    spacing = 0;
    rows = 0;

   

    this.bestiaryLetters = [];
    let bestiaryString = "000%";
    for (let counter = 0; counter < bestiaryString.length; counter++) {
      this.bestiaryLetters.push(new textBoxCharacter(scene, this.x + startingX, this.y + startingY));
      this.bestiaryLetters[counter].anims.play(bestiaryString.charAt(counter));
      this.bestiaryLetters[counter].x = this.bestiaryLetters[counter].x + spacing;
      this.bestiaryLetters[counter].y = this.bestiaryLetters[counter].y - 23;
      spacing = spacing + 25;

    }
    

    //this.setDepth(70);
    this.setScale(.6);
    //connects the sprite to the camera so that it sticks with the player.
    this.setScrollFactor(0);
    //this.openDelay = false;

  }

  showSlot() {
    if (this.visible === true) {
      this.sexIcon.visible = true;
      this.healthIcon.visible = true;
      this.bestiaryIcon.visible = true;
      this.shellIcon.visible = true;
      for (let counter = 0; counter < this.slotLetters.length; counter++) {
        this.slotLetters[counter].visible = true;
        this.slotLetters[counter].setScale(.3);
      }
      for (let counter = 0; counter < this.skillLetters.length; counter++) {
        this.skillLetters[counter].visible = true;
        this.skillLetters[counter].setScale(.3);
      }
      for (let counter = 0; counter < this.shellLetters.length; counter++) {
        this.shellLetters[counter].visible = true;
        this.shellLetters[counter].setScale(.5);
      }
      for (let counter = 0; counter < this.bestiaryLetters.length; counter++) {
        this.bestiaryLetters[counter].visible = true;
        this.bestiaryLetters[counter].setScale(.5);
      }
    } else {
      this.sexIcon.visible = false;
      this.healthIcon.visible = false;
      this.bestiaryIcon.visible = false;
      this.shellIcon.visible = false;
      for (let counter = 0; counter < this.skillMarks.length; counter++) {
        this.skillMarks[counter].visible = false;
      }
      for (let counter = 0; counter < this.slotLetters.length; counter++) {
        this.slotLetters[counter].visible = false;
      }
      for (let counter = 0; counter < this.skillLetters.length; counter++) {
        this.skillLetters[counter].visible = false;
      }
      for (let counter = 0; counter < this.shellLetters.length; counter++) {
        this.shellLetters[counter].visible = false;
      }
      for (let counter = 0; counter < this.bestiaryLetters.length; counter++) {
        this.bestiaryLetters[counter].visible = false;
      }
    }
  }

  setSkillDisplay(scene) {
    // sets the skills from the savefile to be displayed.
    let animationNumber = "";
    if (scene.playerSaveSlotData !== undefined && scene.playerSkillsData !== undefined) {

      let skillCounter = 0;
      for(let [key,value] of Object.entries(scene.playerSkillsData)){
        if(value !== 0){
          this.skillMarks[skillCounter].anims.play(value.toString());
          this.skillMarks[skillCounter].visible = true;
        }else{
          this.skillMarks[skillCounter].visible = false;
        }
        skillCounter++;
      }
    }
    // sets the sexicon to reflect the save data
    //undefined when comparing with object does explicit type conversions which can be true when they should be false. to get around this we use the explicit !== operator.
    if (scene.playerSex !== undefined) {
      //animationNumber = scene.playerSaveSlotData[0];
      //console.log("scene.playerSaveSlotData[0]: "+scene.playerSaveSlotData[0]);
      //console.log("seting sexicon to animationNumber: "+animationNumber);
      this.sexIcon.anims.play(scene.playerSex.toString());
    } else {
      this.sexIcon.anims.play("2");
    }

    //sets the slot number character to be correct.
    if (scene.tempNewGameSlotID !== undefined) {

      //console.log("seting sexicon to animationNumber: "+animationNumber);
      this.slotLetters[5].anims.play(scene.tempNewGameSlotID.toString());
    } else {
      this.slotLetters[5].anims.play("?");
    }

    if (scene.playerHealth !== undefined) {
      animationNumber = "";
      animationNumber = animationNumber + scene.playerHealth;
      console.log("animationNumber for hp: " + animationNumber);
      this.healthIcon.anims.play(animationNumber);
    } else {
      this.healthIcon.anims.play("6");
    }

    if (scene.playerSaveSlotData !== undefined) {
      animationNumber = "";
      animationNumber += scene.playerSaveSlotData.currency;
      console.log("animationNumber for currency: " + animationNumber);
      for (let counter = 0; counter < this.shellLetters.length; counter++) {
        if (counter < animationNumber.length) {
          this.shellLetters[counter].anims.play(animationNumber.charAt(counter));
        } else {
          this.shellLetters[counter].visible = false;
        }
      }

    }
    // displays
    if (scene.playerSaveSlotData !== undefined) {
      animationNumber = "";
      animationNumber += scene.playerSaveSlotData.bestiaryCompletionPercent;
      //console.log("animationNumber for bestiary percent: " +animationNumber);
      if (scene.playerSaveSlotData.bestiaryCompletionPercent > 9 && scene.playerSaveSlotData.bestiaryCompletionPercent < 100 ) {
        for (let counter = 0; counter < this.bestiaryLetters.length - 1; counter++) {

          this.bestiaryLetters[counter].anims.play(animationNumber.charAt(counter));

        }
        this.bestiaryLetters[3].visible = false;
        this.bestiaryLetters[2].anims.play("%");
      } else if (scene.playerSaveSlotData.bestiaryCompletionPercent < 10) {
        this.bestiaryLetters[3].visible = false;
        this.bestiaryLetters[2].visible = false;
        this.bestiaryLetters[1].anims.play("%");
        this.bestiaryLetters[0].anims.play(animationNumber.charAt(0));
       
      }else if(scene.playerSaveSlotData.bestiaryCompletionPercent === 100){
        this.bestiaryLetters[3].anims.play("%");
        this.bestiaryLetters[2].anims.play("0");
        this.bestiaryLetters[1].anims.play("0");
        this.bestiaryLetters[0].anims.play("1");
        
      }

    }





    /* animationNumber = "";
     animationNumber = animationNumber + scene.playerSaveSlotData[2];
     for(let counter = 0; counter < this.bestiaryLetters.length; counter++){
       
     }*/


  }

}