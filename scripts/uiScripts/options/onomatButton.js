class onomatButton extends Phaser.Physics.Arcade.Sprite{
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
      
        this.anims.create({key: 'onomatOnActive',frames: this.anims.generateFrameNames('buttons', { start: 11, end: 11 }),frameRate: 1,repeat: -1});
        this.anims.create({key: 'onomatOnInActive',frames: this.anims.generateFrameNames('buttons', { start: 10, end: 10 }),frameRate: 1,repeat: -1});
        this.anims.create({key: 'onomatOffActive',frames: this.anims.generateFrameNames('buttons', { start: 13, end: 13 }),frameRate: 1,repeat: -1});
        this.anims.create({key: 'onomatOffInActive',frames: this.anims.generateFrameNames('buttons', { start: 12, end: 12 }),frameRate: 1,repeat: -1}); 
        
        //need to get volume from scene
        this.anims.play('onomatOnInActive');

        this.scene = scene;

        this.optionsMenu = optionsMenu;
      
    }

    //set button value
    setValue(value){
        this.isOn = value;
        if(this.isOn){
            this.anims.play("onomatOnInActive");
        }else{
            this.anims.play("onomatOffInActive");
        }
    }

    setupOnomatButton(){

        let that = this;

        this.on('pointerover',function(pointer){
            if(that.isOn){
                that.anims.play("onomatOnActive");
            }else{
                that.anims.play("onomatOffActive");
            }
            
        })
        this.on('pointerout',function(pointer){
           
            if(that.isOn){
                that.anims.play("onomatOnInActive");
            }else{
                that.anims.play("onomatOffInActive");
            }
        })

        this.on('pointerdown', function (pointer) {
            
                if(that.isOn){
                    that.isOn = false;
                    that.optionsMenu.currentOnomatValue = false;
                    that.anims.play("onomatOffActive");
                    

                }else{
                    that.isOn = true;
                    that.optionsMenu.currentOnomatValue = true;
                    that.anims.play("onomatOnActive");
                }
                   
        });

    }
}