
// class that creates the saveslot in the title screen.
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
    this.slotElements = new Phaser.GameObjects.Group(scene);
    this.setInteractive();
    this.visible = false;

    //title slot elements.
    this.sexIcon = new sexMark(scene, this.x - 340, this.y - 10);
    this.slotElements.add(this.sexIcon);
    this.healthIcon = new healthMark(scene, this.x - 340, this.y + 45);
    this.slotElements.add(this.healthIcon);
    this.bestiaryIcon = new bestiaryMark(scene, this.x - 260, this.y - 10);
    this.slotElements.add(this.bestiaryIcon);
    this.shellIcon = new shellMark(scene, this.x - 260, this.y + 45);
    this.slotElements.add(this.shellIcon);

    // controls the slot text on saveslot.
    let startingX = -375;
    let startingY = -40;
    let spacing = 0;
    let rows = 0;

    this.scene = scene;
    
    this.slotLetters = [];
    let slotLetterString = "SLOT:?";
    for (let counter = 0; counter < slotLetterString.length; counter++) {
      this.slotLetters.push(new textBoxCharacter(scene, this.x + startingX, this.y + startingY,'charBlack'));
      this.slotLetters[counter].anims.play(slotLetterString.charAt(counter));
      this.slotLetters[counter].setScale(1/6);
      this.slotLetters[counter].x = this.slotLetters[counter].x + spacing;
      this.slotLetters[counter].y = this.slotLetters[counter].y - 23;
      this.slotElements.add(this.slotLetters[counter]);
      spacing = spacing + 15;
    }

     // controls the skillmarks on saveslot.
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

    for (let counter = 0; counter < this.skillMarks.length; counter++) {
      this.skillMarks[counter].visible = false;
    }

    // controls the skill letters on saveslot.
    startingX = -120;
    startingY = -40;
    spacing = 0;
    rows = 0;


    this.skillLetters = [];
    let skillString = "SKILLS:";
    for (let counter = 0; counter < skillString.length; counter++) {
      this.skillLetters.push(new textBoxCharacter(scene, this.x + startingX, this.y + startingY,'charBlack'));
      this.slotElements.add(this.skillLetters[counter]);
      this.skillLetters[counter].setScale(1/6);
      this.skillLetters[counter].anims.play(skillString.charAt(counter));
      this.skillLetters[counter].x = this.skillLetters[counter].x + spacing;
      this.skillLetters[counter].y = this.skillLetters[counter].y - 23;
      spacing = spacing + 15;

    }

    // controls the shell currency numbers on saveslot.
    this.shellLetters = new makeText(scene,this.x -220,this.y + 30,'charBlack',""+0,true);
    this.shellLetters.visible = false;
    // controls the bestiary characters on saveslot.
    startingX = -220;
    startingY = 12;
    spacing = 0;
    rows = 0;

   // controls the shell currency numbers on saveslot.
   this.bestiaryLetters = new makeText(scene,this.x -220,this.y + 12,'charBlack',"000%",true);
   this.bestiaryLetters.visible = false;

    /*this.bestiaryLetters = [];
    let bestiaryString = "000%";
    for (let counter = 0; counter < bestiaryString.length; counter++) {
      this.bestiaryLetters.push(new textBoxCharacter(scene, this.x + startingX, this.y + startingY,'charBlack'));
      //this.slotElements.add(this.bestiaryLetters[counter]);
      this.bestiaryLetters[counter].setScale(1/6);
      this.bestiaryLetters[counter].anims.play(bestiaryString.charAt(counter));
      this.bestiaryLetters[counter].x = this.bestiaryLetters[counter].x + spacing;
      this.bestiaryLetters[counter].y = this.bestiaryLetters[counter].y - 23;
      spacing = spacing + 25;

    }*/
    

    //this.setDepth(70);
    this.setScale(.61);
    //connects the sprite to the camera so that it sticks with the player.
    this.setScrollFactor(0);
    //this.openDelay = false;

  }

  //sets the visibility of the save slot
  showSlot() {
    this.slotElements.toggleVisible();
    if (this.visible === true) {
     
      this.shellLetters.visible = true;
      this.bestiaryLetters.visible = true

    } else {
      this.shellLetters.visible = false;
      for (let counter = 0; counter < this.skillMarks.length; counter++) {
        this.skillMarks[counter].visible = false;
      }
      this.bestiaryLetters.visible = false;
    }
  }

  // function sets the skills from the savedata of the current slot.
  setSkillDisplay() {
    // sets the skills from the savefile to be displayed.
    let animationNumber = "";
    if (this.scene.playerSaveSlotData !== undefined && this.scene.playerSkillsData !== null) {

      let skillCounter = 0;
      for(let [key,value] of Object.entries(this.scene.playerSkillsData)){
        if(value !== 0){
          console.log("value: ",value);
          this.skillMarks[skillCounter].anims.play(value.toString());
          this.skillMarks[skillCounter].visible = true;
        }else{
          
          this.skillMarks[skillCounter].visible = false;
          console.log("this.skillMarks[skillCounter].visible: ",this.skillMarks[skillCounter].visible);
        }
        skillCounter++;
      }
    }
    // sets the sexicon to reflect the save data
    //undefined when comparing with object does explicit type conversions which can be true when they should be false. to get around this we use the explicit !== operator.
    if (this.scene.playerSex !== undefined && this.scene.playerSex !== null) {
      this.sexIcon.anims.play(this.scene.playerSex.toString());
    } else {
      this.sexIcon.anims.play("2");
    }

    //sets the slot number character to be correct.
    if (this.scene.tempNewGameSlotID !== undefined) {

      //console.log("seting sexicon to animationNumber: "+animationNumber);
      this.slotLetters[5].anims.play(this.scene.tempNewGameSlotID.toString());
    } else {
      this.slotLetters[5].anims.play("?");
    }

    if (this.scene.playerHealth !== undefined) {
      animationNumber = "";
      animationNumber = animationNumber + this.scene.playerSaveSlotData.playerHealthUpgrades;
      console.log("animationNumber for hp: " + animationNumber);
      this.healthIcon.anims.play(animationNumber);
    } else {
      this.healthIcon.anims.play("0");
    }

    if (this.scene.playerSaveSlotData !== undefined) {
      animationNumber = "";
      animationNumber += this.scene.playerSaveSlotData.currency;
      console.log("animationNumber for currency: " + animationNumber);
      this.shellLetters.destroy();
      this.shellLetters = new makeText(this.scene,this.x -220,this.y + 40,'charBlack',""+animationNumber,true);
      this.shellLetters.setScale(1.1);

    }
    // displays
    if (this.scene.playerSaveSlotData !== undefined) {
      animationNumber = "";
      animationNumber += Math.floor(this.scene.playerSaveSlotData.bestiaryCompletionPercent);
      //console.log("animationNumber for bestiary percent: " +animationNumber);
      this.bestiaryLetters.destroy();
      this.bestiaryLetters = new makeText(this.scene,this.x -220,this.y -15,'charBlack',animationNumber + "%",true);
      this.bestiaryLetters.setScale(1.1);
    }

  }

}