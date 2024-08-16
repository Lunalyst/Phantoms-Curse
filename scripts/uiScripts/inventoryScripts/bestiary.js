let bestiaryThat;

const bestiaryLineLength = 14;
class bestiary extends Phaser.Physics.Arcade.Sprite {
  // every class needs constructor
  constructor(scene, xPos, yPos,xOpen,yOpen ) {
    //super() calls the constructor() from the parent class we are extending
    super(scene, xPos, yPos, 'bestiary');
    //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
    //so here in the subclass of sprite its refering to the image object we just made. 

    //adds this object to the scene.
    scene.add.existing(this);

    this.anims.create({ key: 'closed', frames: this.anims.generateFrameNames('bestiary', { start: 0, end: 0 }), frameRate: 10, repeat: -1 });
    this.anims.create({ key: 'cover', frames: this.anims.generateFrameNames('bestiary', { start: 1, end: 1 }), frameRate: 10, repeat: -1 });
    this.anims.create({ key: 'back', frames: this.anims.generateFrameNames('bestiary', { start: 2, end: 2 }), frameRate: 10, repeat: -1 });
    this.anims.create({ key: 'blueSlime', frames: this.anims.generateFrameNames('bestiary', { start: 3, end: 3 }), frameRate: 7, repeat: -1 });
    this.anims.create({ key: 'largeBlueSlime', frames: this.anims.generateFrameNames('bestiary', { start: 4, end: 4 }), frameRate: 7, repeat: -1 });
    this.anims.create({ key: 'femaleTiger', frames: this.anims.generateFrameNames('bestiary', { start: 5, end: 5 }), frameRate: 7, repeat: -1 });
    this.anims.create({ key: 'maleRabbit', frames: this.anims.generateFrameNames('bestiary', { start: 6, end: 6 }), frameRate: 7, repeat: -1 });
    this.anims.create({ key: 'femaleRabbit', frames: this.anims.generateFrameNames('bestiary', { start: 7, end: 7 }), frameRate: 7, repeat: -1 });
    this.anims.create({ key: 'maleBeeDrone', frames: this.anims.generateFrameNames('bestiary', { start: 8, end: 8 }), frameRate: 7, repeat: -1 });
    this.anims.create({ key: 'femaleBeeDrone', frames: this.anims.generateFrameNames('bestiary', { start: 9, end: 9 }), frameRate: 7, repeat: -1 });
    this.anims.create({ key: 'femaleTigerBooba', frames: this.anims.generateFrameNames('bestiary', { start: 10, end: 10 }), frameRate: 7, repeat: -1 });
    this.anims.create({ key: 'maleBat', frames: this.anims.generateFrameNames('bestiary', { start: 11, end: 11 }), frameRate: 7, repeat: -1 });
    this.anims.create({ key: 'femaleBat', frames: this.anims.generateFrameNames('bestiary', { start: 12, end: 12 }), frameRate: 7, repeat: -1 });
    // the default animation for bestiary should be closed.
    this.anims.play("closed");

    this.setDepth(52);
    //connects the sprite to the camera so that it sticks with the player.
    this.setScrollFactor(0);
    this.isOpen = false;
    this.index = 0;
    this.visible = false;
    this.openDelay = false;

    this.originalX = xPos;
    this.originalY = yPos;

    this.openX = xOpen;
    this.openY = yOpen;

    console.log("this.originalX: ",this.originalX," this.originalY :",this.originalY);
    console.log("this.openX: ",this.openX," this.openY :",this.openY);

    bestiaryThat = this;
    this.pageNumber = 0;
    this.setScale(1/6);

    //object contains the text data for the bestiary.
    this.bestiaryTextList = {
      blueSlime: {
        title: "BLUE SLIME",
        summary: "THIS SMALL SLIME IS THE MOST COMMON OF SLIME TYPES. IT HAS BASIC INSTINCTS AND WILL BLINDLY JUMP TOWARDS PREY. THIS SLIME IS MOSTLY MADE OF WATER AND CAN BE FOUND MOST PLACES. SINCE THERE WHOLE BODY IS A SENSORY ORGAN THEY ARE PERTICULARLY WEAK TO BLUNT DAMAGE.",
      },
      largeBlueSlime: {
        title: "BLUE SLIME LARGE",
        summary: "THIS SLIME ACTS VERY SIMILIAR TO IT`S SMALLER COUNTERPART. HOWEVER THIS SLIME IS MUCH LARGER AND MORE DAGEROUS.IT IS ABLE TO DISOLVE PREY AT A FASTER RATE.",
      },
      femaleTiger: {
        title: "FEMALE TIGER",
        summary: "THIS LARGE CARIVORE IS AN AMBUSH PREDATOR. OPTING TO HIDE UNTIL IT SPOTS PREY BEFORE CHASING THEM DOWN AND DEVOWERING THEM WHOLE. HOWEVER IT IS MORE DOCILE IF IT HAS ALREADY FEAD ON SOMETHING.",
      },
      maleRabbit: {
        title: "MALE RABBIT",
        summary: "THIS HERBAVORE CAN BE FOUND IN PLACES WHERE CARROTS GROW. ABLE TO JUMP DECENTLY HIGH, THE MALES OF THIS GROUP USE TO PENITRATION AS THERE MAIN MEANS OF APPLYING THERE CURSE.  ",
      },
      femaleRabbit: {
        title: "FEMALE RABBIT",
        summary: "THIS HERBAVORE CAN BE FOUND IN PLACES WHERE CARROTS GROW. ABLE TO JUMP DECENTLY HIGH, THE FEMALES OF THIS GROUP OFTEN TACKLE THERE VICTIMS AND HUMP THEM TO APPLY THERE CURSE. ",
      },

      maleBeeDrone: {
        title: "MALE BEE DRONE",
        summary: "THIS LARGE INSECT OFTEN SPENDS IT TIME COLLECTING POLLEN IN PLACES WITH LARGE AMOUNTS OF FLOWERS.HOWEVER THIS INSECT WILL QUICKLY DEVOWER A UNSUSPECTING HUMAN WITH THERE MASSIVE ABDOMENS.",
      },

      femaleBeeDrone: {
        title: "FEMALE BEE DRONE",
        summary: "OFTEN THESE BEES WILL SWARM A HUMAN WHO IS NOT CURSED, HOWEVER THE ARE UNABLE TO PASS ON THERE CURSE DIRECTLY. INSTEAD USING THERE ABDOMEN TO CAPTURE HUMANS TO BRING BACK TO THERE NEST... ",
      },

      femaleTigerBooba: {
        title: "FED FEMALE TIGER",
        summary: "ONCE THE TIGER HAS HAD A GOOD MEAL THIS VORACIOUS PREDATOR SEEKS OUT HUMANS TO CURSE. ONCE THIS PREDATOR CURSES A UNSUSPECTING HUMAN, SHE WILL LOOK OVER THEM AS HER NEW CUB. ",
      },

      maleBat: {
        title: "MALE BAT",
        summary: "LURKING IN CAVES THIS MONSTER SLEEPS DURING THE DAY. WANDERING HUMANS SHOULD TRY TO BE QUIET AROUND THIS MONSTER, AS WAKING THEM IS NOT ADVISED UNLESS THEY WISH TO BE TURNED INTO PUDGE. ",
      },

      femaleBat: {
        title: "FEMALE BAT",
        summary: "IF THEY ARE SpOOKED WHILE SLEEPING THIS NOCTERNAL PREDATOR WITH CHASE DOWN WHAT EVER SPOOKED IT AND TRY TO DEVOWER THEM WITH THERE REAR END. THESE VORACIOUS BATS ARE QUICK TO DIGEST THERE PREY IN THIS STATE, ADDING THEM TO THERE PUDGE. ",
      },

      back: {
        title: "BESTIARY INFO",
        summary: "THIS BOOK CAN RECORD INFORMATION ABOUT ENEMYS YOU HAVE ENCOUNTERED. WHEN YOU ARE DEFEATED BY THEM, YOU CAN FIND A NEW ENTRY ABOUT THAT ENEMY HERE. ENEMYS HAVE ELEMENTAL WEAKNESSES WHICH ARE DISPLAYED. ON THERE STATS SECTION."
      }
    };
    
    //creates the buttons on the left and right of the bestiary menu when its open.
    this.bestiaryLeft;
    this.bestiaryRight;
    this.bestiaryLeft = new UIControls(scene, this.openX - 185, this.openY + 235, "UIControls").setInteractive();
    this.bestiaryLeft.anims.play("pointLeft");
    this.bestiaryLeft.visible = false;
    this.bestiaryRight = new UIControls(scene, this.openX + 185, this.openY + 235, "UIControls").setInteractive();
    this.bestiaryRight.anims.play("pointRight");
    this.bestiaryRight.visible = false;

    // when the scene is loaded, the bestiary fills this.activeBestiaryPages with the correct values from the scene.playerBestiaryData
    // so that the pages are displayed in the correct order.
    this.activeBestiaryPages = [];
    this.activeBestiaryPages.push('cover');
    for (let [key, value] of Object.entries(scene.playerBestiaryData)) {
      console.log("key: ", key, " value: ", value);
      if (value === 1) {
        this.activeBestiaryPages.push(key.toString());
      }
    }
    this.activeBestiaryPages.push('back');
    console.log(this.activeBestiaryPages);

    //handles the positioning of the title text sprites.
    let startingX = -190;
    let startingY = -215;
    let spacing = 0;

    let titleSize = "PLACEHOLDER MONSTER TITLE";
    this.titleCharacters = new Phaser.GameObjects.Group(scene);
    this.bestiaryTitle = [];
    for (let counter = 0; counter < titleSize.length; counter++) {
      this.bestiaryTitle.push(new textBoxCharacter(scene, this.openX + startingX, this.openY + startingY,'charBubble'));
      this.titleCharacters.add(this.bestiaryTitle[counter]);
      this.bestiaryTitle[counter].setScale(1/6);
      this.bestiaryTitle[counter].setDepth(70);
      this.bestiaryTitle[counter].anims.play(titleSize.charAt(counter));
      this.bestiaryTitle[counter].x = this.bestiaryTitle[counter].x + spacing;
      this.bestiaryTitle[counter].y = this.bestiaryTitle[counter].y + 9;
      spacing = spacing + 16;
    }

    //handles the summary character text sprites.
    startingX = -35;
    startingY = -180;
    spacing = 0;
    let rowSpacing = 0;
    let rowCounter = 0;

    this.summarySize = "+_______________++_______________++_______________++_______________++_______________++_______________++_______________++_______________++_______________++_______________++_______________++_______________++_______________++_______________++_______________++_______________++_______________++_______________++_______________++_______________++_______________++_______________++_______________++_______________++_______________+";
    this.formattedString = "";
    this.summaryCharacters = new Phaser.GameObjects.Group(scene);
    this.bestiarySummary = [];
    for (let counter = 0; counter < this.summarySize.length; counter++) {
      this.bestiarySummary.push(new textBoxCharacter(scene,this.openX + startingX, this.openY + startingY,'charBlack'));
      this.summaryCharacters.add(this.bestiarySummary[counter]);
      this.bestiarySummary[counter].setScale(1/6);
      this.bestiarySummary[counter].setDepth(70);
      this.bestiarySummary[counter].anims.play(this.summarySize.charAt(counter));
      this.bestiarySummary[counter].x = this.bestiarySummary[counter].x + spacing;
      this.bestiarySummary[counter].y = this.bestiarySummary[counter].y + rowSpacing;
      spacing = spacing + 16;
      rowCounter++;
      if (rowCounter === 15) {
        rowCounter = 0;
        spacing = 0;
        rowSpacing += 20;

      }
    }

    


  }

  //function opens the bestiary so the proper page is displayed when clicked on in the inventory.
  openBestiary(scene) {

    //if bestiary is close then open it and set open delay.
    if (this.isOpen === false && this.openDelay === false) {
      this.isOpen = true;
      console.log("this.isOpen from bestiary " + this.isOpen);
      this.anims.play(this.activeBestiaryPages[this.pageNumber]);
      this.openDelay = true;
      this.setScale(0.45);
      this.setDepth(60);

      this.x = this.openX;
      this.y = this.openY;

      //this.x = 200;
      //this.y = 360;

      /*this.bestiaryLeft.x = this.x - 100;
      this.bestiaryLeft.y = this.y + 120;
      this.bestiaryRight.x = this.x + 100;
      this.bestiaryRight.y = this.y + 120;*/

      // delays how quickly the player can open the inventory.
      setTimeout(function () {
        bestiaryThat.openDelay = false;
      }, 250);

      if (this.pageNumber === 0) {
        this.bestiaryLeft.visible = false;
        this.bestiaryRight.visible = true;
        this.displayBestiaryText(false);
      } else if (this.pageNumber === this.activeBestiaryPages.length - 1) {
        this.bestiaryLeft.visible = true;
        this.bestiaryRight.visible = false;
        this.setBestiaryInfo();
        this.displayBestiaryText(true);
      } else {
        this.bestiaryLeft.visible = true;
        this.bestiaryRight.visible = true;
        this.setBestiaryInfo();
        this.displayBestiaryText(true);

      }
      //if bestiary is open then close it and set open delay.
    } else if (this.isOpen === true && this.openDelay === false) {
      this.isOpen = false;
      this.setScale(.21);
      this.setDepth(52);

      this.x = this.originalX;
      this.y = this.originalY;

      this.anims.play("closed");
      this.openDelay = true;
      this.displayBestiaryText(false);

      // delays how quickly the player can open the inventory.
      setTimeout(function () {
        bestiaryThat.openDelay = false;
      }, 250);

      this.bestiaryLeft.visible = false;
      this.bestiaryRight.visible = false;
    }

  }
  // applys functionality to the buttons for the bestiary.
  applyUIControlElements() {

    this.bestiaryRight.on('pointerdown', function (pointer) {
      console.log(" activating bestiary turn page right. scene.bestiaryUI.pageNumber" + bestiaryThat.pageNumber);
      console.log(" pageID: ", bestiaryThat.activeBestiaryPages[bestiaryThat.pageNumber]);
      bestiaryThat.displayBestiaryText(true);
      if (bestiaryThat.pageNumber >= 0 && bestiaryThat.pageNumber < bestiaryThat.activeBestiaryPages.length) {
        bestiaryThat.pageNumber++;
        bestiaryThat.setBestiaryInfo();
        bestiaryThat.anims.play(bestiaryThat.activeBestiaryPages[bestiaryThat.pageNumber]);
        if (bestiaryThat.pageNumber === bestiaryThat.activeBestiaryPages.length - 1) {
          console.log(" hiding right bestiary arrow");
          bestiaryThat.bestiaryRight.visible = false;
          bestiaryThat.bestiaryLeft.visible = true;
        } else {
          bestiaryThat.bestiaryLeft.visible = true;
          bestiaryThat.bestiaryRight.visible = true;
        }
      }



    });
    this.bestiaryLeft.on('pointerdown', function (pointer) {
      console.log(" activating bestiary turn page left scene.bestiaryUI.pageNumber" + bestiaryThat.pageNumber);
      if (bestiaryThat.pageNumber > 0 && bestiaryThat.pageNumber <= bestiaryThat.activeBestiaryPages.length) {
        bestiaryThat.pageNumber--;
        bestiaryThat.setBestiaryInfo();
        bestiaryThat.anims.play(bestiaryThat.activeBestiaryPages[bestiaryThat.pageNumber]);
        if (bestiaryThat.pageNumber === 0) {
          console.log(" hiding left bestiary arrow");
          bestiaryThat.displayBestiaryText(false);
          bestiaryThat.bestiaryLeft.visible = false;
          bestiaryThat.bestiaryRight.visible = true;
        } else {
          bestiaryThat.displayBestiaryText(true);
          bestiaryThat.bestiaryLeft.visible = true;
          bestiaryThat.bestiaryRight.visible = true;
        }
      }


    });

  }
  //function that sets the visibility of the text character groups correctly.
  displayBestiaryText(isVisible) {
    console.log("setting text tovisible: ", isVisible);

    if (isVisible === true && this.bestiaryTitle[0].visible === false || isVisible === false && this.bestiaryTitle[0].visible === true) {
      this.titleCharacters.toggleVisible();
      this.summaryCharacters.toggleVisible();
    }





  }
  // changes the animation of the characters to reflect the correct summary and title info
  setBestiaryInfo() {

    for (let [mainKey, value] of Object.entries(this.bestiaryTextList)) {
      if (this.activeBestiaryPages[this.pageNumber] === mainKey) {
        for (let counter = 0; counter < this.bestiaryTitle.length; counter++) {

          if (counter < value.title.length) {
            this.bestiaryTitle[counter].anims.play(value.title.charAt(counter));
          } else {
            this.bestiaryTitle[counter].anims.play(" ");
          }

        }

        this.formattedString = value.summary;
        this.formatSummary();

        for (let counter = 0; counter < this.bestiarySummary.length; counter++) {

          if (counter < this.formattedString.length) {
            //this.summarySize.charAt(counter) = value.summary.charAt(counter);
            this.bestiarySummary[counter].anims.play(this.formattedString.charAt(counter));
          } else {
            this.bestiarySummary[counter].anims.play(" ");
          }

        }

      }

    }

  }

  // function which formats the text string so that it properly fits within the summary character lines.
  /*formatSummary() {
    let tempString = "";
    let formatingCounter = 0;
    let BackPetal = 0;
    let BackPetalString = "";
    let spacing = "";
    let FrontPetalString = "";
    let backString = "";
    for (let counter = 0; counter < this.formattedString.length; counter++) {

      // if the line has letters or symbols that get cut of to the next line we want to add spaces.
      //
      if (formatingCounter === 15 && this.formattedString.charAt(counter) !== ' ') {
        for (let index = tempString.length; index > 0; index--) {
          if (tempString.charAt(index) !== ' ') {
            BackPetal++;
            BackPetalString = tempString.charAt(index) + BackPetalString;
            if (index === 1) {

            }
          } else if (tempString.charAt(index) === ' ') {
            for (let coun = 0; coun < BackPetal - 1; coun++) {
              spacing += " ";

            }
            for (let coun = counter; coun < this.formattedString.length; coun++) {
              FrontPetalString += this.formattedString.charAt(coun);
            }
            for (let coun = counter - BackPetal; coun >= 0; coun--) {
              backString = this.formattedString.charAt(coun) + backString;
            }

            this.formattedString = backString + spacing + BackPetalString + FrontPetalString;
           
            BackPetal = 0;
            BackPetalString = "";
            backString = "";
            spacing = "";
            FrontPetalString = "";


            break;
          }

        }

        tempString = "";
        formatingCounter = 0;
      } else if (formatingCounter === 15) {
        formatingCounter = 0;
      }
      
      formatingCounter++;
      tempString += this.formattedString.charAt(counter);
    }


  }*/

  formatSummary(){
    //temp array for testing used to check if all the line align with each other.
    let tempArray = [];

    //string to store new formatted string.
    let formattedString = "";
    //temp string to store data
    let tempString = "";
    //variable to keep track fo line positioning.
    let tempLineCounter = 0;

    //loop through the text in the object
    for(let counter = 0;counter < this.formattedString.length+1;counter++){
    
      //if the templinecounter reaches 24 then 
      //check to see if the current char is a space. if not then 
      if(tempLineCounter === bestiaryLineLength+1 && this.formattedString.charAt(counter) !== ' '){
        
        //reverse through the temp string
        for(let tempStringPosition = tempString.length;tempStringPosition > 0;tempStringPosition--){


          //if the char in tempstring is a space then 
          if(tempString.charAt(tempStringPosition) === ' '){
            //slice off the extra word getting cut off 
            tempString = tempString.slice(0,tempStringPosition);

            //add spaces back to the tempstring until it is the correct line size
            while(tempString.length < bestiaryLineLength+1){
              tempString+= ' ';
            }

            //array for testing purposes
            tempArray.push(tempString);

            formattedString += tempString;
            //reset the templinecounter variable
            tempLineCounter = 0;
            //empty out string
            tempString = "";
            //moves the counter forward one so it doesnt pick up the space at the end of the line.
            counter+=2;
            //kills loop
            tempStringPosition = 0;
          }

          //keeps position in outer loop so that word being removed is not lost
          counter--;
          
        }      
      }else if(tempLineCounter === bestiaryLineLength+1 && this.formattedString.charAt(counter) === ' '){

        //add spaces back to the tempstring until it is the correct line size
        while(tempString.length < bestiaryLineLength+1){
          tempString+= ' ';
        }
        //array for testing purposes
        tempArray.push(tempString);

        formattedString += tempString;
        //reset the templinecounter variable
        tempLineCounter = 0;
        //empty out string
        tempString = "";
        //moves the counter forward one so it doesnt pick up the space at the end of the line.
        counter++;
      }
       
      //adds to the temp ling
      tempString += this.formattedString.charAt(counter);
      //increment line every character.
      tempLineCounter++;
    }

    //for testing purposes
    tempArray.push(tempString);
    console.log("tempArray: ", tempArray);

    //adds the last line to the string and sets our text object to it.
    formattedString += tempString;
    this.formattedString = formattedString;

  }
}