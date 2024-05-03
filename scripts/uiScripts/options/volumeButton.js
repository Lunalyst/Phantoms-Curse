class volumeButton extends Phaser.Physics.Arcade.Sprite{
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
      
        this.anims.create({key: 'volumeOnActive',frames: this.anims.generateFrameNames('buttons', { start: 7, end: 7 }),frameRate: 1,repeat: -1});
        this.anims.create({key: 'volumeOnInActive',frames: this.anims.generateFrameNames('buttons', { start: 6, end: 6 }),frameRate: 1,repeat: -1});
        this.anims.create({key: 'volumeOffActive',frames: this.anims.generateFrameNames('buttons', { start: 9, end: 9 }),frameRate: 1,repeat: -1});
        this.anims.create({key: 'volumeOffInActive',frames: this.anims.generateFrameNames('buttons', { start: 8, end: 8 }),frameRate: 1,repeat: -1}); 
        
        //need to get volume from scene
        this.anims.play('volumeOnInActive');

        this.scene = scene;

        this.optionsMenu = optionsMenu;
      
    }

    setupVolumeButton(){

        let that = this;

        this.on('pointerover',function(pointer){
            if(that.isOn){
                that.anims.play("volumeOnActive");
            }else{
                that.anims.play("volumeOffActive");
            }
            
        })
        this.on('pointerout',function(pointer){
           
            if(that.isOn){
                that.anims.play("volumeOnInActive");
            }else{
                that.anims.play("volumeOffInActive");
            }
        })

        this.on('pointerdown', function (pointer) {
            
                if(that.isOn){
                    that.isOn = false;
                    that.optionsMenu.volumeSlider.setValue(0);
                    that.anims.play("volumeOffActive");
                    

                }else{
                    that.isOn = true;
                    that.optionsMenu.volumeSlider.setValue(1);
                    that.anims.play("volumeOnActive");
                }
                   
        });

    }
}