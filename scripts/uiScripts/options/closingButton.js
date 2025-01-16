class closingButton extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene,inventory,optionsMenu,xPos, yPos){
        //super() calls the constructor() from the parent class we are extending
        super(scene, xPos, yPos, 'closingButton');
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
        scene.add.existing(this);
        this.setDepth(51);
        this.setScrollFactor(0);
        //this.visible = false;
        this.setInteractive();
        this.setScale(.6);
      
        this.anims.create({key: 'closingButtonActive',frames: this.anims.generateFrameNames('closingButton', { start: 1, end: 1 }),frameRate: 1,repeat: -1});
        this.anims.create({key: 'closingButtonInActive',frames: this.anims.generateFrameNames('closingButton', { start: 0, end: 0 }),frameRate: 1,repeat: -1});
        
        
        //need to get volume from scene
        this.anims.play('closingButtonInActive');

        this.scene = scene;

        this.inventory = inventory;

        this.optionsMenu = optionsMenu;
      
    }


    setupClosingButton(){

        let that = this;

        this.on('pointerover',function(pointer){
            that.scene.initSoundEffect('buttonSFX','1',0.05);
            that.anims.play("closingButtonActive");  
        })

        this.on('pointerout',function(pointer){
            that.anims.play("closingButtonInActive");
        })

        this.on('pointerdown', function (pointer) {
            //plays button sound
            that.scene.initSoundEffect('buttonSFX','2',0.05);
            //if the player alters a setting that needs a game reload, then
            if(this.optionsMenu.reloadNeeded === true){
                //calls textbox and displays text
                that.optionsMenu.optionsTextBox.activateTitleScreenTextbox(
                    this.scene,//scene
                    true,// is the text box visible?
                    ["sign"],// sets profile array
                    "some settings require a reload. progress will be lost. is that ok? "//text sent to the text box.
                );
                //shows yes/no buttons
                that.optionsMenu.yes.visible = true;
                that.optionsMenu.no.visible = true;

            }else{
                that.optionsMenu.visible = false;
                that.inventory.settingsOpen = false;
                that.inventory.settingsButton.visible = true;
                
                console.log("closing settings: ");
            }  
        });

    }

    setupClosingButtonShop(){

        this.on('pointerover',function(pointer){
            this.scene.initSoundEffect('buttonSFX','1',0.05);
            this.anims.play("closingButtonActive");  
        },this);

        this.on('pointerout',function(pointer){
            this.anims.play("closingButtonInActive");
        },this);

        this.on('pointerdown', function (pointer) {
            //plays button sound
            this.scene.initSoundEffect('buttonSFX','2',0.05);
            
            let object = {
                NPCRef: this.inventory.npc,
              };

              
            //call emitter to close shop
            //inventoryKeyEmitter.emit(inventoryKey.activateShop,this.inventory.npc.scene,object);

            //call emiter to destroy shop and free up some resources.
            inventoryKeyEmitter.emit(inventoryKey.destroyBuyArray);

            //call npc to progress dialogue
            this.inventory.npc.scene.sceneTextBox.progressDialogue();
            this.inventory.npc.scene.sceneTextBox.textInterupt = false;


        },this);

    }
}