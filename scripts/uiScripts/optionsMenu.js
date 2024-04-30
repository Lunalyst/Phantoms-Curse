/*
https://photonstorm.github.io/phaser3-docs/Phaser.Types.Physics.Arcade.html
//https://phaser.io/examples/v3/view/game-objects/graphics/health-bars-demo
use classes tab as a guide for how to set up the header. each object has different phaser.physics.arcade
*/

class optionsMenu extends Phaser.GameObjects.Container{

    constructor(scene, xPos, yPos){

        super(scene, xPos, yPos);

        this.setScrollFactor(0);

        this.soundText = new makeText(scene,0,100,"VOLUME: ");
        this.add(this.soundText);
        this.onomatText = new makeText(scene,0,140,"ONOMATOPOEIA: ");
        this.add(this.onomatText);
        this.preferanceText = new makeText(scene,0,180,"PREFERANCE: ");
        this.add(this.preferanceText);
        this.sexText = new makeText(scene,0,220,"SEX: ");
        this.add(this.sexText);

        //this.print0 = scene.add.text(200, 180, '');
        //this.add(this.print0);
        this.volumeSlider = new RexPlugins.UI.Slider(scene,{
                //formula to conver screen x and y to pixel x and y
                x: ((this.x - scene.cameras.main.worldView.x) * scene.cameras.main.zoom)+45,
                y: ((this.y - scene.cameras.main.worldView.y) * scene.cameras.main.zoom)+50,
                width: 200,
                height: 20,
                orientation: 'x',
    
                track: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 6, COLOR_DARK),
                thumb: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),
    
                valuechangeCallback: function (value) {
                  //this.print0.text = value;
                },
                space: {
                    top: 4,
                    bottom: 4
                },
                input: 'drag', // 'drag'|'click'
            }).layout();
            this.add(this.volumeSlider);

            console.log("scene.rexUI",scene.rexUI);

        this.scene = scene;

       
        scene.add.existing(this);

        this.visible = false;
    }
    

}