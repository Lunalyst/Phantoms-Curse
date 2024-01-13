class inventorySlots extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'inventorySlots');
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
      scene.add.existing(this);
      this.setDepth(50);
      this.setScrollFactor(0);
      this.anims.create({key: '0',frames: this.anims.generateFrameNames('inventorySlots', { start: 0, end: 0 }),frameRate: 10,repeat: -1});
      this.anims.create({key: '1',frames: this.anims.generateFrameNames('inventorySlots', { start: 1, end: 1 }),frameRate: 10,repeat: -1});
      this.anims.create({key: '2',frames: this.anims.generateFrameNames('inventorySlots', { start: 2, end: 2 }),frameRate: 10,repeat: -1});
      this.anims.create({key: '3',frames: this.anims.generateFrameNames('inventorySlots', { start: 3, end: 3 }),frameRate: 10,repeat: -1});
      this.anims.create({key: '4',frames: this.anims.generateFrameNames('inventorySlots', { start: 4, end: 4 }),frameRate: 10,repeat: -1});
      this.anims.create({key: '5',frames: this.anims.generateFrameNames('inventorySlots', { start: 5, end: 5 }),frameRate: 10,repeat: -1});
      this.anims.create({key: '6',frames: this.anims.generateFrameNames('inventorySlots', { start: 6, end: 6 }),frameRate: 10,repeat: -1});
      this.anims.create({key: '7',frames: this.anims.generateFrameNames('inventorySlots', { start: 7, end: 7 }),frameRate: 10,repeat: -1});
      this.anims.create({key: '8',frames: this.anims.generateFrameNames('inventorySlots', { start: 8, end: 8 }),frameRate: 10,repeat: -1});
      this.anims.create({key: '9',frames: this.anims.generateFrameNames('inventorySlots', { start: 9, end: 9 }),frameRate: 10,repeat: -1});
      this.anims.create({key: '10',frames: this.anims.generateFrameNames('inventorySlots', { start: 10, end: 10 }),frameRate: 10,repeat: -1});
      this.anims.create({key: '11',frames: this.anims.generateFrameNames('inventorySlots', { start: 11, end: 11 }),frameRate: 10,repeat: -1});
      this.anims.play("empty");
      this.animsNumber = 0;
      this.slotId = 0;
      this.isLitUp = false;
      this.visible = false;
      this.setScale(1.5);

      //sets up slot inventory amount object.
      this.number1 = new textBoxCharacter(scene, xPos+7, yPos+12);
      this.number1.anims.play('0');

      this.number2 = new textBoxCharacter(scene, xPos+12, yPos+12);
      this.number2.anims.play('0');

      
    }

    // sets the inventory numbers to be correctly displayed
    setSlotNumber(number){

      //convert incoming number to a string
      let numberString = number.toString();

      // if number is less than one hide both numbers
      if(number < 1){

        this.number1.visible = false;
        this.number2.visible = false;
        this.number1.anims.play(numberString);

      //else if the number is less than ten, display the first number only.
      }else if(number < 10){
  
        this.number1.visible = true;
        this.number2.visible = false;
        this.number1.anims.play(numberString);
  
        //return 0;
        
      //else if the number is less than 65 set both numbers accordingly.
      }else if(number < 65){
  
        this.number1.visible = true;
        this.number2.visible = true;
        this.number1.anims.play(numberString.charAt(0));
        this.number2.anims.play(numberString.charAt(1));
  
        //return 0;

      //else if the number is larger than 64 display error message.
      }else{
  
        Console.log("item overflow detected");
        this.number1.anims.play("6");
        this.number2.anims.play("4");
  
        //return(number - 64);
  
      }
  
    }
  
}