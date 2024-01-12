class InventorySlotContainer extends Phaser.GameObjects.Container{

  constructor(scene, xPos, yPos){

      super(scene, xPos, yPos);

      console.log("setting slot characters in inventory number slots.");
      this.number1 = new textBoxCharacter(scene,this.x, this.y);
      this.number1.anims.play('0');
      this.number1.visible = true;
      
      this.setDepth(51);

      this.setScrollFactor(0);


      this.add(this.number1);
      this.add(this.number2);
      

      scene.add.existing(this);
      //this.setScale(.7);

      console.log("created slot numbers: ", this)
      
  }
  //function sets the number sprites correctly.
  setSlotNumber(number){

    //convert incoming number to a string
    numberString = parseInt(number);

    if(number < 10){

      this.number1.visible = true;
      this.number2.visible = false;
      this.number1.anims.play(numberString);

      return 0;

    }else if(number < 65){

      this.number1.visible = true;
      this.number2.visible = true;
      this.number1.anims.play(numberString.charAt(0));
      this.number2.anims.play(numberString.charAt(1));

      return 0;

    }else{

      Console.log("item overflow detected");
      this.number1.anims.play("6");
      this.number2.anims.play("4");

      return(number - 64);

    }

  }



}