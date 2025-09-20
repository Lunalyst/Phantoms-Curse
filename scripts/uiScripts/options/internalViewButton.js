class internalViewButton extends Phaser.Physics.Arcade.Sprite{
    //internalViewButton
    // every class needs constructor
    constructor(scene,optionsMenu,xPos, yPos){
        //super() calls the constructor() from the parent class we are extending
        super(scene, xPos, yPos, 'buttons');
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
        scene.add.existing(this);
        this.setDepth(51);
        this.setScrollFactor(0);
        //this.visible = false;
        this.setInteractive();
        this.setScale(.6);
        this.isOn = true;
      
        this.anims.create({key: 'internalViewOnActive',frames: this.anims.generateFrameNames('buttons', { start: 23, end: 23 }),frameRate: 1,repeat: -1});
        this.anims.create({key: 'internalViewOnInActive',frames: this.anims.generateFrameNames('buttons', { start: 22, end: 22 }),frameRate: 1,repeat: -1});
        this.anims.create({key: 'internalViewOffActive',frames: this.anims.generateFrameNames('buttons', { start: 25, end: 25 }),frameRate: 1,repeat: -1});
        this.anims.create({key: 'internalViewOffInActive',frames: this.anims.generateFrameNames('buttons', { start: 24, end: 24 }),frameRate: 1,repeat: -1}); 
        
        //need to get volume from scene
        this.anims.play('internalViewOnInActive');

        this.scene = scene;

        this.optionsMenu = optionsMenu;
      
    }

    //set button value
    setValue(value){
        this.isOn = value;
        if(this.isOn){
            this.anims.play("internalViewOnInActive");
            
        }else{
            this.anims.play("internalViewOffInActive");
        }

        //temp object to update the onomat value
        let internalView = {
            value: this.optionsMenu.currentInternalViewValue
        };
        
        //updates the onomat variable using gameplay scene emitter.
        inventoryKeyEmitter.emit(inventoryKey.updateInternalView,internalView);
    
    }

    setupInternalViewButton(){

        let that = this;

        this.on('pointerover',function(pointer){
            that.scene.initSoundEffect('buttonSFX','1',0.05);
            if(that.isOn){
                that.anims.play("internalViewOnActive");
            }else{
                that.anims.play("internalViewOffActive");
            }
            
        })
        this.on('pointerout',function(pointer){
           
            if(that.isOn){
                that.anims.play("internalViewOnInActive");
            }else{
                that.anims.play("internalViewOffInActive");
            }
        })

        this.on('pointerdown', function (pointer) {
            that.scene.initSoundEffect('buttonSFX','2',0.05);
                if(that.isOn){
                    that.isOn = false;
                    that.optionsMenu.currentInternalViewValue = false;
                    that.anims.play("internalViewOffActive");
                    

                }else{
                    that.isOn = true;
                    that.optionsMenu.currentInternalViewValue = true;
                    that.anims.play("internalViewOnActive");
                }
                   
        });

    }
}