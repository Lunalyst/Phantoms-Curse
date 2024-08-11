class curse extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'curses');
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
      scene.add.existing(this);
      this.setDepth(50);
      this.setScrollFactor(0);
      this.visible = true;
      this.animationComplete = false;

      this.randomCurse = Math.floor((Math.random() * 4)+1);
      
      
      this.anims.create({key: '0',frames: this.anims.generateFrameNames('curses', { start: 0, end: 0 }),frameRate: 4,repeat: -1});
      this.anims.create({key: '1',frames: this.anims.generateFrameNames('curses', { start: 1, end: 7 }),frameRate: 4,repeat: 0});
      this.anims.create({key: '2',frames: this.anims.generateFrameNames('curses', { start: 8, end: 14 }),frameRate: 4,repeat: 0});
      this.anims.create({key: '3',frames: this.anims.generateFrameNames('curses', { start: 15, end: 21 }),frameRate: 4,repeat: 0});
      this.anims.create({key: '4',frames: this.anims.generateFrameNames('curses', { start: 22, end: 28 }),frameRate: 4,repeat: 0});
      this.anims.create({key: '5',frames: this.anims.generateFrameNames('curses', { start: 29, end: 35 }),frameRate: 4,repeat: 0});

      this.setScale(1);
      
    }

    switchCurse(){

      this.randomCurse = Math.floor((Math.random() * 5)+1);
       let temp = ''+ this.randomCurse;
       //console.log("temp: ", temp);

        this.anims.play(temp).once('animationcomplete' , () =>{
          this.visible = false;
          return false;
        });
    }

      
      
    
}