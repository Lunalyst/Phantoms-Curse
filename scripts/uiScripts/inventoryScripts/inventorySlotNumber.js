

//class which makes a container containing the number sprites used to show how much of an item the player has in there inventory.
class inventorySlotNumber extends Phaser.GameObjects.Container{

  constructor(scene, xPos, yPos){

      super(scene, xPos, yPos);


      this.number1 = new textBoxCharacter(scene,this.x, this.y);
      this.number1.anims.play('0');
      this.number2 = new textBoxCharacter(scene,this.x+20, this.y);
      this.number2.anims.play('0');

      
      this.setDepth(50);

      this.setScrollFactor(0);


      this.add(this.number1);
      this.add(this.number2);
      

      scene.add.existing(this);
      this.setScale(.4);
      
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