class mobileButton extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, xPos, yPos){
        //super() calls the constructor() from the parent class we are extending
        super(scene, xPos, yPos, 'mobileButtons');
        //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
        //so here in the subclass of sprite its refering to the image object we just made. 
        scene.add.existing(this);
        //sets the depth of the ui sprite so that it isnt obscured by other game sprites.
        this.anims.create({key: 'sButtonInactive',frames: this.anims.generateFrameNames('mobileButtons', { start: 1, end: 1 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'sButtonActive',frames: this.anims.generateFrameNames('mobileButtons', { start: 2, end: 2 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'dButtonInactive',frames: this.anims.generateFrameNames('mobileButtons', { start: 3, end: 3 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'dButtonActive',frames: this.anims.generateFrameNames('mobileButtons', { start: 4, end: 4 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'wButtonInactive',frames: this.anims.generateFrameNames('mobileButtons', { start: 5, end: 5 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'wButtonActive',frames: this.anims.generateFrameNames('mobileButtons', { start: 6, end: 6 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'aButtonInactive',frames: this.anims.generateFrameNames('mobileButtons', { start: 7, end: 7 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'aButtonActive',frames: this.anims.generateFrameNames('mobileButtons', { start: 8, end: 8 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'atkButtonInactive',frames: this.anims.generateFrameNames('mobileButtons', { start: 9, end: 9 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'atkButtonActive',frames: this.anims.generateFrameNames('mobileButtons', { start: 10, end: 10 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'jmpButtonInactive',frames: this.anims.generateFrameNames('mobileButtons', { start: 11, end: 11 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'jmpButtonActive',frames: this.anims.generateFrameNames('mobileButtons', { start: 12, end: 12 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'inventoryButtonActive',frames: this.anims.generateFrameNames('mobileButtons', { start: 13, end: 13 }),frameRate: 7,repeat: -1});
        
        //connects the sprite to the camera so that it sticks with the player.
        //this.setScrollFactor(0);
        this.setDepth(6);

        this.IsPressed = false;
        this.isJustDown = false;
        console.log("this.IsPressed: ",this.IsPressed);
        //sets scale
        //aathis.setScale(1/3);
    }
    //simple function using if statements to update display using animations defined above.
    

    playAKey(mode){
        if(mode === 1){
            this.anims.play("aButtonActive");
        }else{
            this.anims.play("aButtonInactive");
        }
    }
    playSKey(mode){
        if(mode === 1){
            this.anims.play("sButtonActive");
        }else{
            this.anims.play("sButtonInactive");
        }
    }
    playDKey(mode){
        if(mode === 1){
            this.anims.play("dButtonActive");
        }else{
            this.anims.play("dButtonInactive");
        }
    }
    playWKey(mode){
        if(mode === 1){
            this.anims.play("wButtonActive");
        }else{
            this.anims.play("wButtonInactive");
        }
        
    }

    playJMPKey(mode){
        if(mode === 1){
            this.anims.play("jmpButtonActive");
        }else{
            this.anims.play("jmpButtonInactive");
        }
    }

    playATKKey(mode){
        if(mode === 1){
            this.anims.play("atkButtonActive");
        }else{
            this.anims.play("atkButtonInactive");
        }
    }

    playInventoryKey(){
        this.anims.play("inventoryButtonActive");
    }


}