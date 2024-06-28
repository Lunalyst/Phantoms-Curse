
/*
communicate between scenes
https://phaser.io/news/2021/07/how-to-communicate-between-scenes-in-phaser-3
*/

class itemContainer extends Phaser.Physics.Arcade.Sprite{

    // is passed in the scene,x&y position for the scene, item id and its details,a flag to tell if it should be opened once, and a bool to tell if the chest can be opened up multiple times.
    constructor(scene, xPos, yPos,item,openOnlyOnce,flag){
        //super() calls the constructor() from the parent class we are extending
        super(scene, xPos, yPos, 'chest');
        //then we add new instance into the scene. 
        scene.add.existing(this);
        //then we call this next line to give it collision box
        scene.physics.add.existing(this);
        //now we can perform any specalized set ups for this object
        
        this.setPushable(false);
        //this object creates its own key prompts which it uses to tell the play if it can be acessed
        this.containerKeyPrompts = new keyPrompts(scene, xPos, yPos + 70,'keyPrompts');
        this.containerKeyPrompts.visible = false;
        this.promptCooldown = false;
        this.containerId;
        this.alreadyOpened = false;
        this.setScale(1/3);

        


        
        //defines animations
        this.anims.create({key: 'closed',frames: this.anims.generateFrameNames('chest', { start: 0, end: 0}),frameRate: 3.5,repeat: -1});
        this.anims.create({key: 'opening',frames: this.anims.generateFrameNames('chest', { start: 0, end: 4}),frameRate: 7,repeat: 0});
        this.anims.create({key: 'opened',frames: this.anims.generateFrameNames('chest', { start: 4, end: 4}),frameRate: 7,repeat: -1});
        this.anims.create({key: 'closing',frames: this.anims.generateFrameNames('chest', { start: 4, end: 8}),frameRate: 7,repeat: 0});

        //special id which will be pushed into the containers data in the save slot object. that way player can only open up the chest once. if desired.
        this.flag = flag;
        this.openOnlyOnce = openOnlyOnce;

        //if openOnlyOnce is true then 
        if(this.openOnlyOnce === true){

            //make a temp object
            let object = {
              flagToFind: this.flag,
              foundFlag: false,
            };

            // call the emitter to check if the value already was picked up.
            inventoryKeyEmitter.emit(inventoryKey.checkContainerFlag, object);

            //if so then set this.allReadyOpened to true
            if(object.foundFlag === true){
                //set variable alreadyOpened to true
                this.alreadyOpened = true;
                //play open animation
                this.anims.play('opened',true);
            //otherwise play closed animation.
            }else{
                this.anims.play('closed',true);
            }
            
        }

        //variables use to protect the object from being called at the wrong time.
        this.safeToOpen = false;
        this.openCoolDown= false;
        this.itemRecieved = false;

        //item that the container holds.
        this.containerItemObject = item;
        
        
    }

    //function which saves the game to the hard memory file when the boject is interacted with
    activateContainer(scene1,keyW,activeId){
        
        //console.log("this.safeToOpen: ",this.safeToOpen, " keyW.isDown: ", keyW.isDown," this.openCoolDown: ",this.openCoolDown," scene1.isPaused: ",scene1.isPaused," this.allReadyOpened: ",this.alreadyOpened);

        //if the player is withing the correct range, and the press w and the cooldown is false then save the game
        if( this.safeToOpen === true && keyW.isDown && this.openCoolDown === false && scene1.isPaused === false && this.alreadyOpened === false){
            
            //create a temp variable to hold our item that is passed to the player
            let item = this.containerItemObject;

            //used to tell if the item was added
            let addedToInventory = {
                added: false
            };

            //plays creek sound effect 
            scene1.initSoundEffect('creakSFX','wood',0.05);

            if(this.itemRecieved === false){

                //if within this scope then player has recieved the item.
                this.itemRecieved = true;
                
                //emitter to add object to inventory.
                inventoryKeyEmitter.emit(inventoryKey.addItem,item, addedToInventory);
        
                //now to add the flag to the player data so the player cant open this container multiple times.
                inventoryKeyEmitter.emit(inventoryKey.addContainerFlag,this.flag);

                //if the item was added then
                if(addedToInventory.added === true){

                    //set variable open to true
                    this.alreadyOpened = true;

                    //hides the key prompts
                    this.containerKeyPrompts.visible = false;
                    this.promptCooldown = false;
                    //plays animation to open chect then once that completes play static animation.
                    this.anims.play('opening').once('animationcomplete', () => {

                        this.anims.play('opened',true);
        
                    });
                }
            }

            //create a refrence to the object so it can be accesed in our time out function
            let currentContainer = this;

            // functions been activated so create set save cooldown to true
            this.openCoolDown = true; 

            //after a second set savecooldown back to false
            setTimeout(function () {
                currentContainer.openCoolDown = false;    
            }, 1000);

        //this code plays the animation for the w key under the save stone
        }else if( this.safeToOpen === true && activeId === this.containerId && this.promptCooldown === false && scene1.isPaused === false && this.alreadyOpened === false){
            console.log("prompts active");
            this.containerKeyPrompts.visible = true;
            this.containerKeyPrompts.playWKey();
            this.promptCooldown = true;       
        }

        //set w key prompt to be invisible if the play is not over it.
        if(this.safeToOpen === false){
            this.containerKeyPrompts.visible = false;
            this.promptCooldown = false;
        }
          
    }

  
}