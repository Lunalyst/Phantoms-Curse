//savestone that allows players to save there progress.
class secretRemover extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, xPos, yPos){
        //super() calls the constructor() from the parent class we are extending
        super(scene, xPos, yPos, 'secretRemover');
        //then we add new instance into the scene. 
        scene.add.existing(this);
        //then we call this next line to give it collision
        scene.physics.add.existing(this);
        //now we can perform any specalized set ups for this object
        
        this.setPushable(false);
        //this object creates its own key prompts which it uses to tell the play if it can be acessed
        this.saveStoneKeyPrompts = new keyPrompts(scene, xPos, yPos + 70,'keyPrompts');
        this.saveStoneKeyPrompts.visible = false;
        this.promptCooldown = false;
        this.saveStoneId;
        
        //defines player animations
        this.anims.create({key: 'idle',frames: this.anims.generateFrameNames('secretRemover', { start: 0, end: 3}),frameRate: 7,repeat: -1});
        this.anims.create({key: 'pop',frames: this.anims.generateFrameNames('secretRemover', { start: 4, end: 6}),frameRate: 7,repeat: 0});
        this.anims.play('idle',true);
        //variables use to protect the object from being called at the wrong time.
        this.safeToSave = false;
        this.saveCoolDown= false;

        this.scene = scene;

        this.curseLight;
        
        //sets scale
        this.setScale(1/3);

    }

    //function which saves the game to the hard memory file when the boject is interacted with
    savePointSaveGame(scene1,keyW,activeId,saveX,saveY){
        
        //if the player is withing the correct range, and the press w and the cooldown is false then save the game
        if( this.safeToSave === true && scene1.checkWPressed() && this.saveCoolDown === false && scene1.isPaused === false){
            
            //play save sound
            scene1.initSoundEffect('curseSFX','curse',0.3);

            let secret = {
                titleLogoType: "default"
            };

            this.scene.secretSave(secret);

            inventoryKeyEmitter.emit(inventoryKey.playCustomMessage,"YOUR MIND IS AT EASE....");

            //once we play the save animation once, then we set the animation back to nothing.
            this.anims.play('pop').once('animationcomplete', () => {
                this.destroy();
                this.saveStoneKeyPrompts.destroy();
            });

        //this code plays the animation for the w key under the save stone
        }else if( this.safeToSave === true && activeId === this.saveStoneId && this.promptCooldown === false && scene1.isPaused === false){
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