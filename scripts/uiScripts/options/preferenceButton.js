class preferenceButton extends Phaser.Physics.Arcade.Sprite{
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
        this.preference = 3;
      
        this.anims.create({key: 'preMaleActive',frames: this.anims.generateFrameNames('buttons', { start: 1, end: 1 }),frameRate: 1,repeat: -1});
        this.anims.create({key: 'preMaleInActive',frames: this.anims.generateFrameNames('buttons', { start: 0, end: 0 }),frameRate: 1,repeat: -1});
        this.anims.create({key: 'preFemaleActive',frames: this.anims.generateFrameNames('buttons', { start: 3, end: 3 }),frameRate: 1,repeat: -1});
        this.anims.create({key: 'preFemaleInActive',frames: this.anims.generateFrameNames('buttons', { start: 2, end: 2 }),frameRate: 1,repeat: -1}); 
        this.anims.create({key: 'preNeutralActive',frames: this.anims.generateFrameNames('buttons', { start: 5, end: 5 }),frameRate: 1,repeat: -1});
        this.anims.create({key: 'preNeutralInActive',frames: this.anims.generateFrameNames('buttons', { start: 4, end: 4 }),frameRate: 1,repeat: -1}); 
        
        //need to get volume from scene
        this.anims.play('preNeutralInActive');

        this.scene = scene;

        this.optionsMenu = optionsMenu;
      
    }

    //set button value
    setValue(value){
        this.preference = value;
        if(this.preference === 0){
            this.anims.play("preMaleInActive");
        }else if(this.preference === 1){
            this.anims.play("preFemaleInActive");
        }else{
            this.anims.play("preNeutralInActive");
        }
    }

    setupPrefButton(){

        let that = this;

        this.on('pointerover',function(pointer){
            that.scene.initSoundEffect('buttonSFX','1',0.05);
            if(that.preference === 0){
                that.anims.play("preMaleActive");
            }else if(that.preference === 1){
                that.anims.play("preFemaleActive");
            }else{
                that.anims.play("preNeutralActive");
            }
            
        })
        this.on('pointerout',function(pointer){
            if(that.preference === 0){
                that.anims.play("preMaleInActive");
            }else if(that.preference === 1){
                that.anims.play("preFemaleInActive");
            }else{
                that.anims.play("preNeutralInActive");
            }
        })

        this.on('pointerdown', function (pointer) {
            
            that.optionsMenu.reloadNeeded = true;
            //plays sound and updates preference temp value
            that.scene.initSoundEffect('buttonSFX','2',0.05);
            if(that.preference === 0){
                that.anims.play("preFemaleActive");
                that.preference = 1;
                that.optionsMenu.newPrefValue = 1;
            }else if(that.preference === 1){
                that.anims.play("preNeutralActive");
                that.preference = 2;
                that.optionsMenu.newPrefValue = 2;
            }else{
                that.anims.play("preMaleActive");
                that.preference = 0;
                that.optionsMenu.newPrefValue = 0;
            }
           
        });

    }
}