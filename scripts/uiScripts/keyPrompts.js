class keyPrompts extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, xPos, yPos){
        //super() calls the constructor() from the parent class we are extending
        super(scene, xPos, yPos, 'keyPrompts');
        //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
        //so here in the subclass of sprite its refering to the image object we just made. 
        scene.add.existing(this);
        //sets the depth of the ui sprite so that it isnt obscured by other game sprites.
        this.anims.create({key: 'A',frames: this.anims.generateFrameNames('keyPrompts', { start: 0, end: 2 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'B',frames: this.anims.generateFrameNames('keyPrompts', { start: 3, end: 5 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'C',frames: this.anims.generateFrameNames('keyPrompts', { start: 6, end: 8 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'D',frames: this.anims.generateFrameNames('keyPrompts', { start: 9, end: 11 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'E',frames: this.anims.generateFrameNames('keyPrompts', { start: 12, end: 14 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'F',frames: this.anims.generateFrameNames('keyPrompts', { start: 15, end: 17 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'G',frames: this.anims.generateFrameNames('keyPrompts', { start: 18, end: 20 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'H',frames: this.anims.generateFrameNames('keyPrompts', { start: 21, end: 23 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'I',frames: this.anims.generateFrameNames('keyPrompts', { start: 24, end: 26 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'J',frames: this.anims.generateFrameNames('keyPrompts', { start: 27, end: 29 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'K',frames: this.anims.generateFrameNames('keyPrompts', { start: 30, end: 32 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'L',frames: this.anims.generateFrameNames('keyPrompts', { start: 33, end: 35 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'M',frames: this.anims.generateFrameNames('keyPrompts', { start: 36, end: 38 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'N',frames: this.anims.generateFrameNames('keyPrompts', { start: 39, end: 41 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'O',frames: this.anims.generateFrameNames('keyPrompts', { start: 42, end: 44 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'P',frames: this.anims.generateFrameNames('keyPrompts', { start: 45, end: 47 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'Q',frames: this.anims.generateFrameNames('keyPrompts', { start: 48, end: 50 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'R',frames: this.anims.generateFrameNames('keyPrompts', { start: 51, end: 53 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'S',frames: this.anims.generateFrameNames('keyPrompts', { start: 54, end: 56 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'T',frames: this.anims.generateFrameNames('keyPrompts', { start: 57, end: 59 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'U',frames: this.anims.generateFrameNames('keyPrompts', { start: 60, end: 62 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'V',frames: this.anims.generateFrameNames('keyPrompts', { start: 63, end: 65 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'W',frames: this.anims.generateFrameNames('keyPrompts', { start: 66, end: 68 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'X',frames: this.anims.generateFrameNames('keyPrompts', { start: 69, end: 71 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'Y',frames: this.anims.generateFrameNames('keyPrompts', { start: 72, end: 74 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'Z',frames: this.anims.generateFrameNames('keyPrompts', { start: 75, end: 77 }),frameRate: 7,repeat: -1});
        this.anims.create({key: '1',frames: this.anims.generateFrameNames('keyPrompts', { start: 78, end: 80 }),frameRate: 7,repeat: -1});
        this.anims.create({key: '2',frames: this.anims.generateFrameNames('keyPrompts', { start: 81, end: 83 }),frameRate: 7,repeat: -1});
        this.anims.create({key: '3',frames: this.anims.generateFrameNames('keyPrompts', { start: 84, end: 86 }),frameRate: 7,repeat: -1});
        this.anims.create({key: '4',frames: this.anims.generateFrameNames('keyPrompts', { start: 87, end: 89 }),frameRate: 7,repeat: -1});
        this.anims.create({key: '5',frames: this.anims.generateFrameNames('keyPrompts', { start: 90, end: 92 }),frameRate: 7,repeat: -1});
        this.anims.create({key: '6',frames: this.anims.generateFrameNames('keyPrompts', { start: 93, end: 95 }),frameRate: 7,repeat: -1});
        this.anims.create({key: '7',frames: this.anims.generateFrameNames('keyPrompts', { start: 96, end: 98 }),frameRate: 7,repeat: -1});
        this.anims.create({key: '8',frames: this.anims.generateFrameNames('keyPrompts', { start: 99, end: 101 }),frameRate: 7,repeat: -1});
        this.anims.create({key: '9',frames: this.anims.generateFrameNames('keyPrompts', { start: 102, end: 104 }),frameRate: 7,repeat: -1});
        this.anims.create({key: '0',frames: this.anims.generateFrameNames('keyPrompts', { start: 105, end: 107 }),frameRate: 7,repeat: -1});
        this.anims.create({key: '*',frames: this.anims.generateFrameNames('keyPrompts', { start: 108, end: 110 }),frameRate: 7,repeat: -1});
        this.anims.create({key: '+',frames: this.anims.generateFrameNames('keyPrompts', { start: 111, end: 113 }),frameRate: 7,repeat: -1});
        this.anims.create({key: '-',frames: this.anims.generateFrameNames('keyPrompts', { start: 114, end: 116 }),frameRate: 7,repeat: -1});
        this.anims.create({key: '/',frames: this.anims.generateFrameNames('keyPrompts', { start: 117, end: 119 }),frameRate: 7,repeat: -1});
        this.anims.create({key: '[',frames: this.anims.generateFrameNames('keyPrompts', { start: 120, end: 122 }),frameRate: 7,repeat: -1});
        this.anims.create({key: ']',frames: this.anims.generateFrameNames('keyPrompts', { start: 123, end: 125 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "\\",frames: this.anims.generateFrameNames('keyPrompts', { start: 126, end: 128 }),frameRate: 7,repeat: -1});
        this.anims.create({key: ";",frames: this.anims.generateFrameNames('keyPrompts', { start: 129, end: 131 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "\'",frames: this.anims.generateFrameNames('keyPrompts', { start: 132, end: 134 }),frameRate: 7,repeat: -1});
        this.anims.create({key: ",",frames: this.anims.generateFrameNames('keyPrompts', { start: 135, end: 137 }),frameRate: 7,repeat: -1});
        this.anims.create({key: ".",frames: this.anims.generateFrameNames('keyPrompts', { start: 138, end: 140 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "BAC",frames: this.anims.generateFrameNames('keyPrompts', { start: 142, end: 144 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "NUM",frames: this.anims.generateFrameNames('keyPrompts', { start: 145, end: 147 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "NU1",frames: this.anims.generateFrameNames('keyPrompts', { start: 148, end: 150 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "NU2",frames: this.anims.generateFrameNames('keyPrompts', { start: 151, end: 153 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "NU3",frames: this.anims.generateFrameNames('keyPrompts', { start: 154, end: 156 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "NU4",frames: this.anims.generateFrameNames('keyPrompts', { start: 157, end: 159 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "NU5",frames: this.anims.generateFrameNames('keyPrompts', { start: 160, end: 162 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "NU6",frames: this.anims.generateFrameNames('keyPrompts', { start: 163, end: 165 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "NU7",frames: this.anims.generateFrameNames('keyPrompts', { start: 166, end: 168 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "NU8",frames: this.anims.generateFrameNames('keyPrompts', { start: 169, end: 171 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "NU9",frames: this.anims.generateFrameNames('keyPrompts', { start: 172, end: 174 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "TAB",frames: this.anims.generateFrameNames('keyPrompts', { start: 175, end: 177 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "SHI",frames: this.anims.generateFrameNames('keyPrompts', { start: 178, end: 180 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "CTR",frames: this.anims.generateFrameNames('keyPrompts', { start: 181, end: 183 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "ALT",frames: this.anims.generateFrameNames('keyPrompts', { start: 184, end: 186 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "JMP",frames: this.anims.generateFrameNames('keyPrompts', { start: 187, end: 189 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "ATK",frames: this.anims.generateFrameNames('keyPrompts', { start: 190, end: 192 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "ENTER",frames: this.anims.generateFrameNames('keyPrompts', { start: 193, end: 195 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "?",frames: this.anims.generateFrameNames('keyPrompts', { start: 196, end: 198 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "INVENTORY",frames: this.anims.generateFrameNames('keyPrompts', { start: 199, end: 201 }),frameRate: 7,repeat: -1});
       
        //connects the sprite to the camera so that it sticks with the player.
        //this.setScrollFactor(0);
        this.setDepth(6);

        //sets scale
        this.setScale(1/3);
    }
    //simple function using if statements to update display using animations defined above.
    

    playAKey(){
        this.anims.play("A");
    }
    playSKey(){
        this.anims.play("S");
    }
    playDKey(){
        this.anims.play("D");
    }
    playWKey(){
        this.anims.play("W");
    }
    playQuestionKey(){
        this.anims.play("?");
    }


}