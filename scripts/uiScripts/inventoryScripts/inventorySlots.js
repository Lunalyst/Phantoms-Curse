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
      this.anims.create({key: '12',frames: this.anims.generateFrameNames('inventorySlots', { start: 12, end: 12 }),frameRate: 10,repeat: -1});
      this.anims.create({key: '13',frames: this.anims.generateFrameNames('inventorySlots', { start: 13, end: 13 }),frameRate: 10,repeat: -1});
      this.anims.create({key: '14',frames: this.anims.generateFrameNames('inventorySlots', { start: 14, end: 14 }),frameRate: 10,repeat: -1});
      this.anims.create({key: '15',frames: this.anims.generateFrameNames('inventorySlots', { start: 15, end: 15 }),frameRate: 10,repeat: -1});
      this.anims.create({key: '16',frames: this.anims.generateFrameNames('inventorySlots', { start: 16, end: 16 }),frameRate: 10,repeat: -1});
      this.anims.create({key: '17',frames: this.anims.generateFrameNames('inventorySlots', { start: 17, end: 17 }),frameRate: 10,repeat: -1});
      this.anims.create({key: '18',frames: this.anims.generateFrameNames('inventorySlots', { start: 18, end: 18 }),frameRate: 10,repeat: -1});
      this.anims.create({key: '19',frames: this.anims.generateFrameNames('inventorySlots', { start: 19, end: 19 }),frameRate: 10,repeat: -1});
      this.anims.create({key: '20',frames: this.anims.generateFrameNames('inventorySlots', { start: 20, end: 20 }),frameRate: 10,repeat: -1});
      this.anims.create({key: '21',frames: this.anims.generateFrameNames('inventorySlots', { start: 21, end: 21 }),frameRate: 10,repeat: -1});
      this.anims.create({key: '22',frames: this.anims.generateFrameNames('inventorySlots', { start: 22, end: 22 }),frameRate: 10,repeat: -1});
      this.anims.create({key: '23',frames: this.anims.generateFrameNames('inventorySlots', { start: 23, end: 23 }),frameRate: 10,repeat: -1});
      this.anims.create({key: '24',frames: this.anims.generateFrameNames('inventorySlots', { start: 24, end: 24 }),frameRate: 10,repeat: -1});
      this.anims.create({key: '25',frames: this.anims.generateFrameNames('inventorySlots', { start: 25, end: 25 }),frameRate: 10,repeat: -1});
      this.anims.play("empty");
      this.animsNumber = 0;
      this.slotId = 0;
      this.isLitUp = false;
      this.visible = false;
      this.setScale((1/3)+((1/3)/2));

      //sets up slot inventory amount object.
      this.number1 = new textBoxCharacter(scene, xPos+3, yPos+11,'charBlack');
      this.number1.setScale(.14);
      this.number1.anims.play('0');

      this.number2 = new textBoxCharacter(scene, xPos+13, yPos+11,'charBlack');
      this.number2.setScale(.14);
      this.number2.anims.play('0');

      
    }

    // sets the inventory numbers to be correctly displayed
    setSlotNumber(number){

      //convert incoming number to a string
      //console.log("number : ", number)

      // if number is less than one hide both numbers
      if(number < 1){

        this.number1.visible = false;
        this.number2.visible = false;
        this.number1.anims.play(""+number);

      //else if the number is less than ten, display the first number only.
      }else if(number < 10){
  
        this.number2.visible = true;
        this.number1.visible = false;
        this.number2.anims.play(""+number);
  
        //return 0;
        
      //else if the number is less than 65 set both numbers accordingly.
      }else if(number < 65){
  
        let temp = ""+number;
        this.number1.visible = true;
        this.number2.visible = true;
        this.number1.anims.play(temp.charAt(0));
        this.number2.anims.play(temp.charAt(1));
  
        //return 0;

      //else if the number is larger than 64 display error message.
      }else{
  
        console.log("item overflow detected");
        this.number1.anims.play("6");
        this.number2.anims.play("4");
  
        //return(number - 64);
  
      }
  
    }
  
}