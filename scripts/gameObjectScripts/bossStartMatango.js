//savestone that allows players to save there progress.
class bossStartMatango extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, xPos, yPos){
        //super() calls the constructor() from the parent class we are extending
        super(scene, xPos, yPos, 'bossStartMatango');
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
        this.usedUp = false;
        this.saveStoneId;
        
        //defines player animations
        this.anims.create({key: 'idle',frames: this.anims.generateFrameNames('bossStartMatango', { start: 0, end: 3}),frameRate: 5,repeat: -1});
        this.anims.create({key: 'kill',frames: this.anims.generateFrameNames('bossStartMatango', { start: 4, end: 5}),frameRate: 7,repeat: 0});
        
        //variables use to protect the object from being called at the wrong time.
        this.safeToSave = false;
        this.saveCoolDown = false;

        this.scene = scene;

        this.curseLight;
        
        //sets scale
        this.setScale(1/3);

        //if lighting system is on then
        if(this.scene.lightingSystemActive === true){
            this.curseLight = this.scene.lights.addLight(this.x,this.y+4, 65, 0xb317ff);
            //this.curseLight.visible = false;
        }

         this.anims.play("idle",true);
    }

    //function which saves the game to the hard memory file when the boject is interacted with
    savePointSaveGame(scene1,keyW,activeId,saveX,saveY){
        
        //if the player is withing the correct range, and the press w and the cooldown is false then save the game
        if(this.safeToSave === true && scene1.checkWPressed() && this.saveCoolDown === false && scene1.isPaused === false && this.usedUp === false){
            

        this.scene.mushrooms.children.each(function (tempMushroom) {
            tempMushroom.visible = false;
            tempMushroom.enemyDefeated = true;
            tempMushroom.movingToNewNode = true;
        },this);

        this.usedUp = true;
        this.anims.play("kill").once('animationcomplete', () => {
            
            this.visible = false;
            this.curseLight.visible = false;
        });

        this.saveStoneKeyPrompts.visible = false;
        this.promptCooldown = false;

        //this code plays the animation for the w key under the save stone
        }else if( this.safeToSave === true && activeId === this.saveStoneId && this.promptCooldown === false && scene1.isPaused === false && this.usedUp === false){
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