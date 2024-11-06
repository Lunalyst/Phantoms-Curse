class mobileSettingsButton extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene,optionsMenu, xPos, yPos){
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
        this.sex = 0;

        this.isOn = false;
      
        this.anims.create({key: 'mobileOnActive',frames: this.anims.generateFrameNames('buttons', { start: 19, end: 19 }),frameRate: 1,repeat: -1});
        this.anims.create({key: 'mobileOnInActive',frames: this.anims.generateFrameNames('buttons', { start:18, end: 18 }),frameRate: 1,repeat: -1});
        
        this.anims.create({key: 'mobileOffActive',frames: this.anims.generateFrameNames('buttons', { start: 21, end: 21 }),frameRate: 1,repeat: -1});
        this.anims.create({key: 'mobileOffInActive',frames: this.anims.generateFrameNames('buttons', { start:20, end: 20 }),frameRate: 1,repeat: -1});
       

        //need to get volume from scene
        this.anims.play('mobileOffInActive');

        this.scene = scene;

        this.optionsMenu = optionsMenu;
      
    }

    setValue(value){
        this.isOn = value;
        console.log(" this.isOn:", this.isOn);
        if(this.isOn){
            this.anims.play("mobileOnInActive");
            this.optionsMenu.newSoundValue = value;
            this.scene.currentSoundValue = value;
        }else{
            this.anims.play("mobileOffInActive");
            this.optionsMenu.newSoundValue = 0;
            this.scene.currentSoundValue = 0;
        }
    }

    setupMobileButton(){

        let that = this;

        this.on('pointerover',function(pointer){
            that.scene.initSoundEffect('buttonSFX','1',0.05);
            if(that.isOn){
                that.anims.play("mobileOnActive");
            }else{
                that.anims.play("mobileOffActive");
            }
            
        })
        
        this.on('pointerout',function(pointer){
           
            if(that.isOn){
                that.anims.play("mobileOnInActive");
            }else{
                that.anims.play("mobileOffInActive");
            }
        })

        this.on('pointerdown', function (pointer) {
     
            //button mutes sound or chenges volume to max.
            if(that.isOn){
                that.isOn = false;
                that.optionsMenu.currentMobileControls = false;
                that.anims.play("mobileOffActive");
            }else{
                that.isOn = true;
                that.optionsMenu.currentMobileControls = true;
                that.anims.play("mobileOnActive");
            }

            that.scene.mobileGroup.toggleVisible();
                   
        });

    }
}