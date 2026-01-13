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
      //console.log("digit: ", digit, " digit.length: ",digit.length);

      for(let counter = 1; counter < digit.length-1; counter++){
        //console.log("counter: ",counter);
        //this.backround = scene.add.sprite(600, 600, "ercusParts");

          if(digit.charAt(counter) === '0'){
            //console.log("this.zero: ",this.zero);
            //make compoenent sprite.
            let part = new ercusComp(scene,0 ,0,''+this.zero);
            this.add(part);
            this.array.push(part);
            
            this.zero+= 2;
            this.one+= 2;

          }else if(digit.charAt(counter) === '1'){
            //console.log("this.one: ",this.one);
            //make compoenent sprite.
            let part = new ercusComp(scene,0 ,0,''+this.one);
            this.add(part);
            this.array.push(part);

            this.one+= 2;
            this.zero+= 2;

          }else{
            console.log("found ???");
          }
          
        
        

      }

      //console.log("ecrus object: ", this.array);
    }


  }
    