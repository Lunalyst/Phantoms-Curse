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
        this.groupType = "default";
      
        this.anims.create({key: 'volumeOnActive',frames: this.anims.generateFrameNames('buttons', { start: 7, end: 7 }),frameRate: 1,repeat: -1});
        this.anims.create({key: 'volumeOnInActive',frames: this.anims.generateFrameNames('buttons', { start: 6, end: 6 }),frameRate: 1,repeat: -1});
        this.anims.create({key: 'volumeOffActive',frames: this.anims.generateFrameNames('buttons', { start: 9, end: 9 }),frameRate: 1,repeat: -1});
        this.anims.create({key: 'volumeOffInActive',frames: this.anims.generateFrameNames('buttons', { start: 8, end: 8 }),frameRate: 1,repeat: -1}); 
        
        //need to get volume from scene
        this.anims.play('volumeOnInActive');

        this.scene = scene;

        this.optionsMenu = optionsMenu;
      
    }

    //set button value
    setValue(value){
        this.isOn = value;
        console.log(" this.isOn:", this.isOn);
        if(this.isOn){
            this.anims.play("volumeOnInActive");
            this.optionsMenu.volumeSlider.setValue(value);
            this.optionsMenu.newSoundValue = value;
            this.scene.sound.setVolume(value);
            this.scene.currentSoundValue = value;
        }else{
            this.anims.play("volumeOffInActive");
            this.optionsMenu.volumeSlider.setValue(0);
            this.optionsMenu.newSoundValue = 0;
            this.scene.sound.setVolume(0);
            this.scene.currentSoundValue = 0;
        }
    }

    //set button value
    setValueGroup(value){

        this.isOn = value;
        console.log(" this.isOn:", this.isOn);
        if(this.isOn){
            this.anims.play("volumeOnInActive");
            //this.optionsMenu.volumeSlider.setValue(value);

            //set sound volume in scene
            if(this.groupType === "music"){
                this.scene.sound.soundGroups[this.groupType].forEach((soundKey) => soundKey.setVolume(value * musicDampen));
                this.optionsMenu.currentSoundMusicValue = value;
                this.scene.sound.soundGroupVolumes["music"] = value;

            }else if(this.groupType === "ambience"){
                this.scene.sound.soundGroups[this.groupType].forEach((soundKey) => soundKey.setVolume(value * ambienceDampen));
                this.optionsMenu.currentSoundAmbienceValue = value;
                this.scene.sound.soundGroupVolumes["ambience"] = value;
            }
              
        }else{
            this.anims.play("volumeOffInActive");
            //this.optionsMenu.volumeSlider.setValue(0);
           
            this.scene.sound.soundGroups[this.groupType].forEach((soundKey) => soundKey.setVolume(0));

            //set sound volume in scene
            if(this.groupType === "music"){
                this.optionsMenu.currentSoundMusicValue = 0;
                this.scene.sound.soundGroupVolumes["music"] = 0;
            }else if(this.groupType === "ambience"){
                this.optionsMenu.currentSoundAmbienceValue = 0;
                this.scene.sound.soundGroupVolumes["ambience"] = 0;
            }

           
        }
    }

    setupVolumeButton(){

        let that = this;

        this.on('pointerover',function(pointer){
            that.scene.initSoundEffect('buttonSFX','1',0.05);
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
            that.scene.initSoundEffect('buttonSFX','2',0.05);
                //button mutes sound or chenges volume to max.
                if(that.isOn){
                    that.isOn = false;
                    that.optionsMenu.volumeSlider.setValue(0);
                    that.optionsMenu.newSoundValue = 0;
                    that.anims.play("volumeOffActive");
                    that.scene.sound.setVolume(0);
                    that.optionsMenu.currentSoundValue = 0;
                }else{
                    that.isOn = true;
                    that.optionsMenu.volumeSlider.setValue(1);
                    that.optionsMenu.newSoundValue = 1;
                    that.anims.play("volumeOnActive");
                    that.scene.sound.setVolume(1);
                    that.optionsMenu.currentSoundValue = 1;
                }
                   
        });

    }

    setupVolumeGroupButton(group){

        let that = this;

        this.groupType = group;

        this.on('pointerover',function(pointer){
            that.scene.initSoundEffect('buttonSFX','1',0.05);
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
            that.scene.initSoundEffect('buttonSFX','2',0.05);
                //button mutes sound or chenges volume to max.
                if(that.isOn){
                    that.isOn = false;
                    //that.optionsMenu.volumeSlider.setValue(0);
                    that.anims.play("volumeOffActive");

                    //set sound volume in scene
                    that.scene.sound.soundGroups[that.groupType].forEach((soundKey) => soundKey.setVolume(0));

                    if(that.groupType === "music"){
                        that.optionsMenu.volumeMusicSlider.setValue(0);
                        that.optionsMenu.currentSoundMusicValue = 0;
                        //apply volume groups changes
                        that.scene.sound.soundGroupVolumes["music"] = 0;
                    }else if(that.groupType === "ambience"){
                        that.optionsMenu.volumeAmbienceSlider.setValue(0);
                        that.optionsMenu.currentSoundAmbienceValue = 0;
                        //apply volume groups changes
                        that.scene.sound.soundGroupVolumes["ambience"] = 0;
                    }


                }else{
                    that.isOn = true;
                    //that.optionsMenu.volumeSlider.setValue(1);
                    that.anims.play("volumeOnActive");
                    //set sound volume in scene
                    
                    if(that.groupType === "music"){
                        that.scene.sound.soundGroups[that.groupType].forEach((soundKey) => soundKey.setVolume(1 * musicDampen));
                        that.optionsMenu.volumeMusicSlider.setValue(1);
                        that.optionsMenu.currentSoundMusicValue = 1;

                        //apply volume groups changes
                        that.scene.sound.soundGroupVolumes["music"] = 1;
                         
                    }else if(that.groupType === "ambience"){
                        that.scene.sound.soundGroups[that.groupType].forEach((soundKey) => soundKey.setVolume(1 * ambienceDampen));
                        that.optionsMenu.volumeAmbienceSlider.setValue(1);
                        that.optionsMenu.currentSoundAmbienceValue = 1 ;

                        //apply volume groups changes
                        that.scene.sound.soundGroupVolumes["ambience"] = 1;
                    }

                }
                   
        });

    }
}