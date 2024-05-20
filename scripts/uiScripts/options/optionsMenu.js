/*
https://photonstorm.github.io/phaser3-docs/Phaser.Types.Physics.Arcade.html
//https://phaser.io/examples/v3/view/game-objects/graphics/health-bars-demo
use classes tab as a guide for how to set up the header. each object has different phaser.physics.arcade
*/

class optionsMenu extends Phaser.GameObjects.Container{

    constructor(scene, xPos, yPos){

        super(scene, xPos, yPos);

        this.setScrollFactor(0);

        this.optionMenuInterior = scene.add.sprite(50, 300, 'optionsMenu');
        this.optionMenuInterior.setScale(0.26);
        this.optionMenuInterior.setAlpha(0.5);
        this.add(this.optionMenuInterior);

        this.optionMenuBorder = scene.add.sprite(50, 300, 'optionsMenu');
        this.optionMenuBorder.anims.create({key: 'border',frames: this.optionMenuBorder.anims.generateFrameNames('optionsMenu', { start: 1, end: 1 }),frameRate: 10,repeat: -1});
        this.optionMenuBorder.anims.play('border');
        this.optionMenuBorder.setScale(0.26);
        this.add(this.optionMenuBorder);

        this.currentSoundValue = 1;

        this.currentOnomatValue = 1;
        this.newOnomatValue = 1;

        this.currentPrefValue = 3;
        this.newPrefValue = 3;

        this.currentSexValue = 0;
        this.newSexValue = 0;

        this.title = new makeText(scene,0,75,'charBubble',"SETTINGS");
        this.add(this.title);

        this.soundText = new makeText(scene,-10,100,'charBubble',"VOLUME ");
        this.add(this.soundText);

        this.volumeButton = new volumeButton(scene,this,-70,190);
        this.volumeButton.setupVolumeButton();
        this.add(this.volumeButton);

        this.onomatText = new makeText(scene,-10,130,'charBubble',"ONOMATOPOEIA ");
        this.add(this.onomatText);

        this.onomatButton = new onomatButton(scene,this,-70,240);
        this.onomatButton.setupOnomatButton();
        this.add(this.onomatButton);


        this.preferanceText = new makeText(scene,-10,155,'charBubble',"PREFERENCE ");
        this.add(this.preferanceText);

        this.prefButton = new preferenceButton(scene,this,-70,290);
        this.prefButton.setupPrefButton();
        this.add(this.prefButton);


        this.sexText = new makeText(scene,-10,180,'charBubble',"SEX ");
        this.add(this.sexText);

        this.sexButton = new sexSelectButton(scene,this,-70,340);
        this.sexButton.setupSexButton();
        this.add(this.sexButton);

        console.log('scene.rexUI: ',scene.rexUI);

        let that = this;

        this.scene = scene;

        this.volumeSlider = new RexPlugins.UI.Slider(scene,{
                //formula to conver screen x and y to pixel x and y
               
                x: 65,
                y: 200,
                width: 200,
                height: 20,
                orientation: 'x',
    
                track: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0x000000),
                indicator: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0x808080),
                thumb: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0xffffff),
    
                valuechangeCallback: function (value) {

                    //if the value is zero, mute volume. else set volume to value
                    if(value === 0){
                        that.volumeButton.isOn = false;
                        that.volumeButton.anims.play("volumeOffInActive");
                        that.scene.sound.setVolume(0);  
                        that.currentSoundValue = 0; 
                    
                    }else{
                        that.volumeButton.isOn = true;
                        that.volumeButton.anims.play("volumeOnInActive");
                        that.scene.sound.setVolume(value);
                        that.currentSoundValue = value; 
                    }
                },
                space: {
                    top: 4,
                    bottom: 4
                },
                input: 'drag', // 'drag'|'click'
            }).layout();
            this.add(this.volumeSlider);
            console.log('this.volumeSlider: ',this.volumeSlider);

        

       
        scene.add.existing(this);

        this.visible = false;
    }

    //if the menu is closed without saving then, reset changes.
    resetSettings(){

        //sets the values apart of the main object
        this.newOnomatValue = this.currentOnomatValue;
        this.newPrefValue = this.currentPrefValue;
        this.newSexValue = this.currentSexValue;

        //resets the value in the button objects
        this.volumeSlider.setValue(this.currentSoundValue);
        this.onomatButton.setValue(this.currentOnomatValue);
        this.prefButton.setValue(this.currentPrefValue);
        this.sexButton.setValue(this.currentSexValue);


    }

    //save settings 
    saveSettings(){

        


    }
    

}