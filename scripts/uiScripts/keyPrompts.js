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
        this.anims.create({key: 'ONE',frames: this.anims.generateFrameNames('keyPrompts', { start: 78, end: 80 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'TWO',frames: this.anims.generateFrameNames('keyPrompts', { start: 81, end: 83 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'THREE',frames: this.anims.generateFrameNames('keyPrompts', { start: 84, end: 86 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'FOUR',frames: this.anims.generateFrameNames('keyPrompts', { start: 87, end: 89 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'FIVE',frames: this.anims.generateFrameNames('keyPrompts', { start: 90, end: 92 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'SIX',frames: this.anims.generateFrameNames('keyPrompts', { start: 93, end: 95 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'SEVEN',frames: this.anims.generateFrameNames('keyPrompts', { start: 96, end: 98 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'EIGHT',frames: this.anims.generateFrameNames('keyPrompts', { start: 99, end: 101 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'NINE',frames: this.anims.generateFrameNames('keyPrompts', { start: 102, end: 104 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'ZERO',frames: this.anims.generateFrameNames('keyPrompts', { start: 105, end: 107 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'ASTERISK',frames: this.anims.generateFrameNames('keyPrompts', { start: 108, end: 110 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'PLUS',frames: this.anims.generateFrameNames('keyPrompts', { start: 111, end: 113 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'MINUS',frames: this.anims.generateFrameNames('keyPrompts', { start: 114, end: 116 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'FORWARDSLASH',frames: this.anims.generateFrameNames('keyPrompts', { start: 117, end: 119 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'LBRAC',frames: this.anims.generateFrameNames('keyPrompts', { start: 120, end: 122 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'RBRAC',frames: this.anims.generateFrameNames('keyPrompts', { start: 123, end: 125 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "BACKSLASH",frames: this.anims.generateFrameNames('keyPrompts', { start: 126, end: 128 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "SEMICOLON",frames: this.anims.generateFrameNames('keyPrompts', { start: 129, end: 131 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "SINGLEQUOTE",frames: this.anims.generateFrameNames('keyPrompts', { start: 132, end: 134 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "COMMA",frames: this.anims.generateFrameNames('keyPrompts', { start: 135, end: 137 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "PERIOD",frames: this.anims.generateFrameNames('keyPrompts', { start: 138, end: 140 }),frameRate: 7,repeat: -1});
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
        this.anims.create({key: "TAB",frames: this.anims.generateFrameNames('keyPrompts', { start: 174, end: 176 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "SHI",frames: this.anims.generateFrameNames('keyPrompts', { start: 177, end: 179 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "CTR",frames: this.anims.generateFrameNames('keyPrompts', { start: 181, end: 183 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "ALT",frames: this.anims.generateFrameNames('keyPrompts', { start: 184, end: 186 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "JMP",frames: this.anims.generateFrameNames('keyPrompts', { start: 187, end: 189 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "ATK",frames: this.anims.generateFrameNames('keyPrompts', { start: 190, end: 192 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "ENTER",frames: this.anims.generateFrameNames('keyPrompts', { start: 193, end: 195 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "?",frames: this.anims.generateFrameNames('keyPrompts', { start: 196, end: 198 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "INVENTORY",frames: this.anims.generateFrameNames('keyPrompts', { start: 199, end: 201 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "SPACE",frames: this.anims.generateFrameNames('keyPrompts', { start: 201, end: 203 }),frameRate: 7,repeat: -1});
       
        //connects the sprite to the camera so that it sticks with the player.
        //this.setScrollFactor(0);
        this.setDepth(6);

        //sets scale
        this.setScale(1/3);
        let tempKey = this;
        this.MapOfKeyAnims = {
            A:function AFunct() {
                tempKey.anims.play("A");
            },
            B:function BFunct() {
                tempKey.anims.play("B");
            },
            C:function CFunct() {
                tempKey.anims.play("C");
            },
            D:function DFunct() {
                tempKey.anims.play("D");
            },
            E:function EFunct() {
                tempKey.anims.play("E");
            },
            F:function FFunct() {
                tempKey.anims.play("F");
            },
            G:function GFunct() {
                tempKey.anims.play("G");
            },
            H:function HFunct() {
                tempKey.anims.play("H");
            },
            I:function IFunct() {
                tempKey.anims.play("I");
            },
            J:function JFunct() {
                tempKey.anims.play("J");
            },
            K:function KFunct() {
                tempKey.anims.play("K");
            },
            L:function LFunct() {
                tempKey.anims.play("L");
            },
            M:function MFunct() {
                tempKey.anims.play("M");
            },
            N:function NFunct() {
                tempKey.anims.play("N");
            },
            O:function OFunct() {
                tempKey.anims.play("O");
            },
            P:function PFunct() {
                tempKey.anims.play("P");
            },
            Q:function QFunct() {
                tempKey.anims.play("Q");
            },
            R:function RFunct() {
                tempKey.anims.play("R");
            },
            S:function SFunct() {
                tempKey.anims.play("S");
            },
            T:function TFunct() {
                tempKey.anims.play("T");
            },
            U:function UFunct() {
                tempKey.anims.play("U");
            },
            V:function VFunct() {
                tempKey.anims.play("V");
            },
            W:function WFunct() {
                tempKey.anims.play("W");
            },
            X:function XFunct() {
                tempKey.anims.play("X");
            },
            Y:function YFunct() {
                tempKey.anims.play("Y");
            },
            Z:function ZFunct() {
                tempKey.anims.play("Z");
            },
            ONE:function oneFunct() {
                tempKey.anims.play("1");
            },
            TWO:function twoFunct() {
                tempKey.anims.play("2");
            },
            THREE:function threeFunct() {
                tempKey.anims.play("3");
            },
            FOUR:function fourFunct() {
                tempKey.anims.play("4");
            },
            FIVE:function fiveFunct() {
                tempKey.anims.play("5");
            },
            SIX:function sixFunct() {
                tempKey.anims.play("6");
            },
            SEVEN:function sevenFunct() {
                tempKey.anims.play("7");
            },
            EIGHT:function eightFunct() {
                tempKey.anims.play("8");
            },
            NINE:function nineFunct() {
                tempKey.anims.play("9");
            },
            ZERO:function zeroFunct() {
                tempKey.anims.play("0");
            },
            ASTERISK:function asteriskFunct() {
                tempKey.anims.play("*");
            },
            PLUS:function plusFunct() {
                tempKey.anims.play("+");
            },
            MINUS:function minusFunct() {
                tempKey.anims.play("-");
            },
            FORWARDSLASH:function forwardslashFunct() {
                tempKey.anims.play("/");
            },
            LBRAC:function lbracFunct() {
                tempKey.anims.play("[");
            },
            RBRAC:function rbracFunct() {
                tempKey.anims.play("]");
            },
            BACKSLASH:function backslashFunct() {
                tempKey.anims.play("\\");
            },
            SEMICOLON:function semicolonFunct() {
                tempKey.anims.play(";");
            },
            SINGLEQUOTE:function singlequoteFunct() {
                tempKey.anims.play("\'");
            },
            COMMA:function commaFunct() {
                tempKey.anims.play(",");
            },
            PERIOD:function periodFunct() {
                tempKey.anims.play(".");
            },
            BAC:function bacFunct() {
                tempKey.anims.play("BAC");
            },
            NUM:function numFunct() {
                tempKey.anims.play("NUM");
            },
            NU1:function nu1Funct() {
                tempKey.anims.play("NU1");
            },
            NU2:function nu2Funct() {
                tempKey.anims.play("NU2");
            },
            NU3:function nu3Funct() {
                tempKey.anims.play("NU3");
            },
            NU4:function nu4Funct() {
                tempKey.anims.play("NU4");
            },
            NU5:function nu5Funct() {
                tempKey.anims.play("NU5");
            },
            NU6:function nu6Funct() {
                tempKey.anims.play("NU6");
            },
            NU7:function nu7Funct() {
                tempKey.anims.play("NU7");
            },
            NU8:function nu8Funct() {
                tempKey.anims.play("NU8");
            },
            NU9:function nu9Funct() {
                tempKey.anims.play("NU9");
            },
            TAB:function TABFunct() {
                tempKey.anims.play("TAB");
            },
            SHI:function SHIFunct() {
                tempKey.anims.play("SHI");
            },
            CTR:function CTRFunct() {
                tempKey.anims.play("CTR");
            },
            ALT:function ALTFunct() {
                tempKey.anims.play("ALT");
            },
            ENTER:function ENTERFunct() {
                tempKey.anims.play("ENTER");
            },
            SPACE:function SPACEFunct() {
                tempKey.anims.play("SPACE");
            },

            
        };


    }
    //simple function using if statements to update display using animations defined above.
    

    playAKey(){
        this.MapOfKeyAnims[keyABind]();
    }
    playSKey(){
        this.MapOfKeyAnims[keySBind]();
    }
    playDKey(){
        this.MapOfKeyAnims[keyDBind]();
    }
    playWKey(){
        this.MapOfKeyAnims[keyWBind]();
    }
    playQuestionKey(){
        this.anims.play("?");
    }

    playKey(key){
        this.MapOfKeyAnims[key]();
    }


}