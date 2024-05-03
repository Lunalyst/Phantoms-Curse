/*
https://photonstorm.github.io/phaser3-docs/Phaser.Types.Physics.Arcade.html
//https://phaser.io/examples/v3/view/game-objects/graphics/health-bars-demo
use classes tab as a guide for how to set up the header. each object has different phaser.physics.arcade
*/

class optionsMenu extends Phaser.GameObjects.Container{

    constructor(scene, xPos, yPos){

        super(scene, xPos, yPos);

        this.setScrollFactor(0);

        this.currentSoundValue = 1;
        this.newSoundValue = 1;

        this.soundText = new makeText(scene,0,100,'charBubble',"VOLUME ");
        this.add(this.soundText);

        this.volumeButton = new volumeButton(scene,this,-50,190);
        this.volumeButton.setupVolumeButton();
        this.add(this.volumeButton);

        this.onomatText = new makeText(scene,0,140,'charBubble',"ONOMATOPOEIA ");
        this.add(this.onomatText);


        this.preferanceText = new makeText(scene,0,180,'charBubble',"PREFERANCE ");
        this.add(this.preferanceText);


        this.sexText = new makeText(scene,0,220,'charBubble',"SEX ");
        this.add(this.sexText);



        //this.print0 = scene.add.text(200, 180, '');
        //this.add(this.print0);
        console.log('scene.rexUI: ',scene.rexUI);

        let that = this;

        this.volumeSlider = new RexPlugins.UI.Slider(scene,{
                //formula to conver screen x and y to pixel x and y
               
                x: 90,
                y: 200,
                width: 200,
                height: 20,
                orientation: 'x',
    
                track: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0x000000),
                indicator: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0x808080),
                thumb: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, 0xffffff),
    
                valuechangeCallback: function (value) {

                    //if the value is zero, set the volume button to 
                    if(value === 0){
                        that.volumeButton.isOn = false;
                        that.volumeButton.anims.play("volumeOffInActive");
                    }else{
                        that.volumeButton.isOn = true;
                        that.volumeButton.anims.play("volumeOnInActive");
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

        this.scene = scene;

       
        scene.add.existing(this);

        this.visible = false;
    }
    

}