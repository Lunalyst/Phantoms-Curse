/*
https://photonstorm.github.io/phaser3-docs/Phaser.Types.Physics.Arcade.html
//https://phaser.io/examples/v3/view/game-objects/graphics/health-bars-demo
use classes tab as a guide for how to set up the header. each object has different phaser.physics.arcade
*/

class makeText extends Phaser.GameObjects.Container{

    constructor(scene, xPos, yPos,text){

        super(scene, xPos, yPos);

        this.setScrollFactor(0);

        //this.setDepth(70);
        // creates text
        let startingX = this.x-xPos;
        let startingY = this.y-yPos;
        let spacing = 0;

    
        this.scene = scene;

        // creates a array of sprites which are letters
        this.letters = [];
        this.letterString = text;
        //fills the array fill of textboxcharacters
        for (let counter = 0; counter < this.letterString.length; counter++) {
          this.letters.push(new textBoxCharacter(scene, this.x + startingX, this.y + startingY));
          this.letters[counter].anims.play(this.letterString.charAt(counter));
          this.letters[counter].setScale(1/6);
          this.letters[counter].x = this.letters[counter].x + spacing;
          this.letters[counter].y = this.letters[counter].y - 23;
          this.letters[counter].visible = true;
          this.add(this.letters[counter]);
          spacing = spacing + 15;
        }
        
        scene.add.existing(this);
        console.log("maketext: ", this);
        //this.visible = true;
    }
    

}