class ercus extends Phaser.GameObjects.Container{

    constructor(scene, xPos, yPos,digit){

      super(scene, xPos, yPos);

      scene.add.existing(this);
      this.setDepth(50);
      //this.visible = false;
      this.setScale(1/12);

      this.repeats = 0;
      this.frames = 20;

      //array for displaying all symbols
      this.array = []; 

      this.digit = digit;
      this.zero = 0;
      this.one = 1;

      //loop through the length of the digit string.
      console.log("digit: ", digit );
      for(let counter = 0; counter < digit.length; counter++){

        //this.backround = scene.add.sprite(600, 600, "ercusParts");

        if(digit.charAt(counter) === '0'){
          //make compoenent sprite.
          let part = new ercusComp(scene,0 ,0,''+this.zero);
          this.add(part);
          this.array.push(part);

          this.zero+= 2;

        }else if(digit.charAt(counter) === '1'){
          //make compoenent sprite.
          let part = new ercusComp(scene,0 ,0,''+this.one);
          this.add(part);
          this.array.push(part);

          this.one+= 2;
        }

      }

      //console.log("ecrus object: ", this.array);
    }


  }
    