class sexSelectButton extends Phaser.Physics.Arcade.Sprite{
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
      
        this.anims.create({key: 'preMaleActive',frames: this.anims.generateFrameNames('buttons', { start: 1, end: 1 }),frameRate: 1,repeat: -1});
        this.anims.create({key: 'preMaleInActive',frames: this.anims.generateFrameNames('buttons', { start: 0, end: 0 }),frameRate: 1,repeat: -1});
        this.anims.create({key: 'preFemaleActive',frames: this.anims.generateFrameNames('buttons', { start: 3, end: 3 }),frameRate: 1,repeat: -1});
        this.anims.create({key: 'preFemaleInActive',frames: this.anims.generateFrameNames('buttons', { start: 2, end: 2 }),frameRate: 1,repeat: -1}); 
        
        //need to get volume from scene
        this.anims.play('preMaleInActive');

        this.scene = scene;

        this.optionsMenu = optionsMenu;
      
    }

    //set button value
    setValue(value){
        this.sex = value;
        if(this.sex === 0){
            this.anims.play("preMaleInActive");
        }else{
            this.anims.play("preFemaleInActive");
        }
    }

    setupSexButton(){

        let that = this;

        this.on('pointerover',function(pointer){
            that.scene.initSoundEffect('buttonSFX','1',0.05);
            if(that.sex === 0){
                that.anims.play("preMaleActive");
            }else{
                that.anims.play("preFemaleActive");
            }
            
        })
        this.on('pointerout',function(pointer){
           
            if(that.sex === 0){
                that.anims.play("preMaleInActive");
            }else{
                that.anims.play("preFemaleInActive");
            }
        })

        this.on('pointerdown', function (pointer) {
            that.scene.initSoundEffect('buttonSFX','2',0.05);
                if(that.sex === 1){
                    that.sex = 0;
                    that.optionsMenu.newSexValue = 0;
                    that.anims.play("preMaleActive");
                    

                }else{
                    that.sex = 1;
                    that.optionsMenu.newSexValue = 1;
                    that.anims.play("preFemaleActive");
                }
                   
        });

    }
}