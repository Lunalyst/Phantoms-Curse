//savestone that allows players to save there progress.
class lockwoodDrawBridge extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, xPos, yPos,bridgePosition){
        //super() calls the constructor() from the parent class we are extending
        super(scene, xPos, yPos, 'lockwoodDrawBridge');
        //then we add new instance into the scene. 
        scene.add.existing(this);
        //then we call this next line to give it collision
        scene.physics.add.existing(this);
        //now we can perform any specalized set ups for this object
        
        this.setPushable(false);

        this.usingCustomLocation = true;
        this.customLocX = this.x-193;
        this.customLocY = this.y+35;

        //this object creates its own key prompts which it uses to tell the play if it can be acessed
        this.saveStoneKeyPrompts = new keyPrompts(scene,this.customLocX, this.customLocY + 70,'keyPrompts');
        this.saveStoneKeyPrompts.setDepth(10);
        this.saveStoneKeyPrompts.visible = false;
        this.promptCooldown = false;
        this.saveStoneId;
        
        //defines player animations
        this.anims.create({key: 'bridgeDown',frames: this.anims.generateFrameNames('lockwoodDrawBridge', { start: 0, end: 0}),frameRate: 5,repeat: -1});
        this.anims.create({key: 'bridgeRaising',frames: this.anims.generateFrameNames('lockwoodDrawBridge', { start: 0, end: 8}),frameRate: 6,repeat: 0});
        this.anims.create({key: 'bridgeUp',frames: this.anims.generateFrameNames('lockwoodDrawBridge', { start: 8, end: 8}),frameRate: 6,repeat: -1});
        this.anims.create({key: 'bridgeLowering',frames: this.anims.generateFrameNames('lockwoodDrawBridge', { start: 8, end: 16}),frameRate: 6,repeat: 0});
        
        //variables use to protect the object from being called at the wrong time.
        this.safeToSave = false;
        this.saveCoolDown = false;

        this.scene = scene;

        this.bridgePosition = bridgePosition;
        this.bridgeAnimationLoc = false;
    
        this.setSize(800, 170, true);
        this.setOffset(0, 576);

        //sets scale
        this.setScale(1/3);

        this.anims.play("bridgeDown",true);


    }

    //function which saves the game to the hard memory file when the boject is interacted with
    savePointSaveGame(scene1,keyW,activeId,saveX,saveY){
        //console.log("checking bridge bridge");
        //if the player is withing the correct range, and the press w and the cooldown is false then save the game
        //console.log(this.safeToSave," ",activeId ," ", this.saveStoneId ," ",this.promptCooldown," ", scene1.isPaused )
        if(this.safeToSave === true && scene1.checkWPressed() && this.saveCoolDown === false && scene1.isPaused === false){
            console.log("activating bridge")
            this.saveStoneKeyPrompts.visible = false;
            this.promptCooldown = false;

            if(this.bridgePosition === "up" && this.bridgeAnimationLoc === false){
                this.bridgeAnimationLoc = true;

                this.anims.play('bridgeLowering').once('animationcomplete', () => {
                    this.bridgeAnimationLoc = false;
                    this.setSize(800, 170, true);
                    this.setOffset(0, 576);
                    this.anims.play("bridgeDown",true);
                    this.bridgePosition ="down";

                   

                });
            }else if(this.bridgePosition === "down" && this.bridgeAnimationLoc === false){
                this.bridgeAnimationLoc = true;
                    this.setSize(620, 2000, true);
                    this.setOffset(105, -1000);
                this.anims.play('bridgeRaising').once('animationcomplete', () => {
                    this.bridgeAnimationLoc = false;

                    this.anims.play("bridgeUp",true);
                     this.bridgePosition ="up";

                });
            }



        //this code plays the animation for the w key under the save stone
        }else if(this.safeToSave === true && activeId === this.saveStoneId && this.promptCooldown === false && scene1.isPaused === false){
            console.log("prompts active");
            this.saveStoneKeyPrompts.visible = true;
            this.saveStoneKeyPrompts.playWKey();
            this.promptCooldown = true;       
        }

        //set w key prompt to be invisible if the play is not over it.
        if(this.safeToSave === false){
            this.saveStoneKeyPrompts.visible = false;
            this.promptCooldown = false;
        }
          
    }

  
}