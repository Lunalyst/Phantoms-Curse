class textBoxCharacter extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos,font){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, font);
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
      scene.add.existing(this);
      this.setDepth(50);
      this.setScrollFactor(0);
      this.visible = false;
      this.setScale(1/12);

      //console.log('font ',font);
      
      this.anims.create({key: 'A',frames: this.anims.generateFrameNames(font, { start: 0, end: 0 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'B',frames: this.anims.generateFrameNames(font, { start: 1, end: 1 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'C',frames: this.anims.generateFrameNames(font, { start: 2, end: 2 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'D',frames: this.anims.generateFrameNames(font, { start: 3, end: 3 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'E',frames: this.anims.generateFrameNames(font, { start: 4, end: 4 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'F',frames: this.anims.generateFrameNames(font, { start: 5, end: 5 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'G',frames: this.anims.generateFrameNames(font, { start: 6, end: 6 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'H',frames: this.anims.generateFrameNames(font, { start: 7, end: 7 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'I',frames: this.anims.generateFrameNames(font, { start: 8, end: 8 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'J',frames: this.anims.generateFrameNames(font, { start: 9, end: 9 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'K',frames: this.anims.generateFrameNames(font, { start: 10, end: 10 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'L',frames: this.anims.generateFrameNames(font, { start: 11, end: 11 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'M',frames: this.anims.generateFrameNames(font, { start: 12, end: 12 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'N',frames: this.anims.generateFrameNames(font, { start: 13, end: 13 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'O',frames: this.anims.generateFrameNames(font, { start: 14, end: 14}),frameRate: 1,repeat: -1});
      this.anims.create({key: 'P',frames: this.anims.generateFrameNames(font, { start: 15, end: 15 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'Q',frames: this.anims.generateFrameNames(font, { start: 16, end: 16 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'R',frames: this.anims.generateFrameNames(font, { start: 17, end: 17 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'S',frames: this.anims.generateFrameNames(font, { start: 18, end: 18}),frameRate: 1,repeat: -1});
      this.anims.create({key: 'T',frames: this.anims.generateFrameNames(font, { start: 19, end: 19 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'U',frames: this.anims.generateFrameNames(font, { start: 20, end: 20 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'V',frames: this.anims.generateFrameNames(font, { start: 21, end: 21 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'W',frames: this.anims.generateFrameNames(font, { start: 22, end: 22 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'X',frames: this.anims.generateFrameNames(font, { start: 23, end: 23 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'Y',frames: this.anims.generateFrameNames(font, { start: 24, end: 24 }),frameRate: 1,repeat: -1});
      this.anims.create({key: 'Z',frames: this.anims.generateFrameNames(font, { start: 25, end: 25 }),frameRate: 1,repeat: -1});
      this.anims.create({key: '1',frames: this.anims.generateFrameNames(font, { start: 26, end: 26 }),frameRate: 1,repeat: -1});
      this.anims.create({key: '2',frames: this.anims.generateFrameNames(font, { start: 27, end: 27 }),frameRate: 1,repeat: -1});
      this.anims.create({key: '3',frames: this.anims.generateFrameNames(font, { start: 28, end: 28 }),frameRate: 1,repeat: -1});
      this.anims.create({key: '4',frames: this.anims.generateFrameNames(font, { start: 29, end: 29 }),frameRate: 1,repeat: -1});
      this.anims.create({key: '5',frames: this.anims.generateFrameNames(font, { start: 30, end: 30 }),frameRate: 1,repeat: -1});
      this.anims.create({key: '6',frames: this.anims.generateFrameNames(font, { start: 31, end: 31 }),frameRate: 1,repeat: -1});
      this.anims.create({key: '7',frames: this.anims.generateFrameNames(font, { start: 32, end: 32 }),frameRate: 1,repeat: -1});
      this.anims.create({key: '8',frames: this.anims.generateFrameNames(font, { start: 33, end: 33 }),frameRate: 1,repeat: -1});
      this.anims.create({key: '9',frames: this.anims.generateFrameNames(font, { start: 34, end: 34 }),frameRate: 1,repeat: -1});
      this.anims.create({key: '0',frames: this.anims.generateFrameNames(font, { start: 35, end: 35 }),frameRate: 1,repeat: -1});
      this.anims.create({key: '*',frames: this.anims.generateFrameNames(font, { start: 36, end:36 }),frameRate: 1,repeat: -1});
      this.anims.create({key: '+',frames: this.anims.generateFrameNames(font, { start: 37, end: 37 }),frameRate: 1,repeat: -1});
      this.anims.create({key: '-',frames: this.anims.generateFrameNames(font, { start: 38, end: 38 }),frameRate: 1,repeat: -1});
      this.anims.create({key: '=',frames: this.anims.generateFrameNames(font, { start: 39, end: 39 }),frameRate: 1,repeat: -1});
      this.anims.create({key: '$',frames: this.anims.generateFrameNames(font, { start: 40, end: 40 }),frameRate: 1,repeat: -1});
      this.anims.create({key: '%',frames: this.anims.generateFrameNames(font, { start: 41, end: 41 }),frameRate: 1,repeat: -1});
      this.anims.create({key: '/',frames: this.anims.generateFrameNames(font, { start: 42, end: 42 }),frameRate: 1,repeat: -1});
      this.anims.create({key: '\'',frames: this.anims.generateFrameNames(font, { start: 43, end: 43 }),frameRate: 1,repeat: -1});
      this.anims.create({key: '#',frames: this.anims.generateFrameNames(font, { start: 44, end: 44 }),frameRate: 1,repeat: -1});
      this.anims.create({key: '.',frames: this.anims.generateFrameNames(font, { start: 45, end: 45 }),frameRate: 1,repeat: -1});
      this.anims.create({key: ',',frames: this.anims.generateFrameNames(font, { start: 46, end: 46 }),frameRate: 1,repeat: -1});
      this.anims.create({key: ':',frames: this.anims.generateFrameNames(font, { start: 47, end: 47 }),frameRate: 1,repeat: -1});
      this.anims.create({key: ';',frames: this.anims.generateFrameNames(font, { start: 48, end: 48 }),frameRate: 1,repeat: -1});
      this.anims.create({key: '?',frames: this.anims.generateFrameNames(font, { start: 49, end: 49 }),frameRate: 1,repeat: -1});
      this.anims.create({key: '!',frames: this.anims.generateFrameNames(font, { start: 50, end: 50 }),frameRate: 1,repeat: -1});
      this.anims.create({key: '`',frames: this.anims.generateFrameNames(font, { start: 51, end: 51 }),frameRate: 1,repeat: -1});
      this.anims.create({key: '"',frames: this.anims.generateFrameNames(font, { start: 52, end: 52 }),frameRate: 1,repeat: -1});
      this.anims.create({key: '^',frames: this.anims.generateFrameNames(font, { start: 53, end: 53 }),frameRate: 1,repeat: -1});
      this.anims.create({key: '&',frames: this.anims.generateFrameNames(font, { start: 54, end: 54 }),frameRate: 1,repeat: -1});
      this.anims.create({key: '(',frames: this.anims.generateFrameNames(font, { start: 55, end: 55 }),frameRate: 1,repeat: -1});
      this.anims.create({key: ')',frames: this.anims.generateFrameNames(font, { start: 56, end: 56 }),frameRate: 1,repeat: -1});
      this.anims.create({key: '[',frames: this.anims.generateFrameNames(font, { start: 57, end: 57 }),frameRate: 1,repeat: -1});
      this.anims.create({key: ']',frames: this.anims.generateFrameNames(font, { start: 58, end: 58 }),frameRate: 1,repeat: -1});
      this.anims.create({key: '{',frames: this.anims.generateFrameNames(font, { start: 59, end: 59 }),frameRate: 1,repeat: -1});
      this.anims.create({key: '}',frames: this.anims.generateFrameNames(font, { start: 60, end: 60 }),frameRate: 1,repeat: -1});
      this.anims.create({key: '<"',frames: this.anims.generateFrameNames(font, { start: 61, end: 61 }),frameRate: 1,repeat: -1});
      this.anims.create({key: '>',frames: this.anims.generateFrameNames(font, { start: 62, end: 62 }),frameRate: 1,repeat: -1});
      this.anims.create({key: '_',frames: this.anims.generateFrameNames(font, { start: 63, end: 63 }),frameRate: 1,repeat: -1});
      this.anims.create({key: '|',frames: this.anims.generateFrameNames(font, { start: 64, end: 64 }),frameRate: 1,repeat: -1});
      this.anims.create({key: ' ',frames: this.anims.generateFrameNames(font, { start: 65, end: 65 }),frameRate: 1,repeat: -1});


      this.anims.play(' ');
      
    }
}