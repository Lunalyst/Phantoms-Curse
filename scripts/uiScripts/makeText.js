/*
https://photonstorm.github.io/phaser3-docs/Phaser.Types.Physics.Arcade.html
//https://phaser.io/examples/v3/view/game-objects/graphics/health-bars-demo
use classes tab as a guide for how to set up the header. each object has different phaser.physics.arcade
*/

class makeText extends Phaser.GameObjects.Container{

    constructor(scene, xPos, yPos,font,text){

        super(scene, xPos, yPos);

        //this.setScrollFactor(0);

        //this.setDepth(70);
        // creates text
        let startingX = 0-xPos;
        let startingY = 0-yPos;
        let spacing = 0;

    
        this.scene = scene;

        // creates a array of sprites which are letters
        this.letters = [];
        this.letterString = text;
        let specialCharacter = false;
        let closingFound = false;
        let specialCharText = "";

        //fills the array fill of textboxcharacters
        for (let counter = 0; counter < this.letterString.length; counter++) {
          //set the character like normal unless we have a @ to denote a special character
          if(this.letterString.charAt(counter) !== '@' && specialCharacter === false){
            this.letters.push(new textBoxCharacter(scene, this.x + startingX, this.y + startingY,font));
            this.letters[this.letters.length-1].anims.play(this.letterString.charAt(counter));
            this.letters[this.letters.length-1].setScale(1/6);
            

          // if the character is a @ then we set specialchar to true
          }else if(this.letterString.charAt(counter) === '@' && specialCharacter === false){
            specialCharText += this.letterString.charAt(counter);
            specialCharacter = true;
            console.log("special char found!");

          //if we wind a @ and special char is true then set it to false and play animation of special char. 
          }else if(this.letterString.charAt(counter) === '@' && specialCharacter === true){
            specialCharacter = false;

            specialCharText += this.letterString.charAt(counter);
            this.letters.push(new textBoxCharacter(scene, this.x + startingX, this.y + startingY,font));
            this.letters[this.letters.length-1].anims.play(specialCharText);
            this.letters[this.letters.length-1].setScale(1/3);
           
            
            console.log("special char completed! ",specialCharText );
            specialCharText = "";
          }
          
          // if a special char is found and specialchar is true then put that special char as a string that is grabbed until we reach another @
          if(specialCharacter === true && this.letterString.charAt(counter) !== '@'){
            specialCharText += this.letterString.charAt(counter);
          }

          
        }

        //forloop to set position of chars in the maketext object
        for (let counter = 0; counter < this.letters.length; counter++) {
            this.letters[counter].x = this.letters[counter].x + spacing;
            this.letters[counter].y = this.letters[counter].y - 23;
            this.letters[counter].visible = true;
            this.add(this.letters[counter]);
            spacing = spacing + 15;

        }
        
        scene.add.existing(this);
      
    }

    //function to apply a wave to text
    textWave(){

      //loop to apply tween to text
      for(let counter = 0; counter < this.letters.length; counter++){
        // applys effect to every character.
        this.scene.tweens.add({
          targets: this.letters[counter],
          props : {
            //x : { value : '-='+Math.cos(100)*10},
            y: { value : '-='+10},
            angle:360,
            rotation: 0
          }, 
          ease: 'linear',
          duration: 300,
          delay: counter*100,
          repeat: -1,
          yoyo: true
      });
      }
    }

    textWob(){

      //loop to apply tween to text
      for(let counter = 0; counter < this.letters.length; counter++){
        // applys effect to every character.
        //this.letters[counter].setRotation(180);
        this.scene.tweens.add({
          targets: this.letters[counter],
          props : {
            //x : { value : '-='+Math.cos(100)*10},
            x: { value : '-='+10},
            //angle:60,
            //rotation: 0
          }, 
          ease: 'linear',
          duration: 600,
          delay: counter*10,
          repeat: -1,
          yoyo: true
      });
      }
    }

    textBuldgeUp(){
      //loop to apply tween to text
      for(let counter = 0; counter < this.letters.length; counter++){
        // applys effect to every character.
        if(counter <= (this.letters.length/2)){

          this.scene.tweens.add({
            targets: this.letters[counter],
            props : {
              //x : { value : '-='+Math.cos(100)*10},
              y: { value : '-='+(counter+1)*5},
              angle:360,
              rotation: 0
            }, 
            ease: 'linear',
            duration: 600,
            repeat: 0,
            yoyo: true
        });
        }else{
          this.scene.tweens.add({
            targets: this.letters[counter],
            props : {
              //x : { value : '-='+Math.cos(100)*10},
              y: { value : '-='+(this.letterString.length-(counter))*5},
              angle:360,
              rotation: 0
            }, 
            ease: 'linear',
            duration: 600,
            repeat: 0,
            yoyo: true
        });
        }
      }
    }

    textBuldgeDown(time){
      //loop to apply tween to text
      for(let counter = 0; counter < this.letters.length; counter++){
        // applys effect to every character.
        if(counter <= (this.letters.length/2)){

          this.scene.tweens.add({
            targets: this.letters[counter],
            props : {
              //x : { value : '-='+Math.cos(100)*10},
              y: { value : '+='+(counter+1)*5},
              angle:360,
              rotation: 0
            }, 
            ease: 'linear',
            duration: time,
            repeat: 0,
            yoyo: true
        });
        }else{
          this.scene.tweens.add({
            targets: this.letters[counter],
            props : {
              //x : { value : '-='+Math.cos(100)*10},
              y: { value : '+='+(this.letterString.length-(counter))*5},
              angle:360,
              rotation: 0
            }, 
            ease: 'linear',
            duration: time,
            repeat: 0,
            yoyo: true
        });
        }
      }
    }

    textSlosh(){
      //loop to apply tween to text
      for(let counter = 0; counter < this.letters.length; counter++){
        // applys effect to every character.
        if(counter <= (this.letters.length/2)){

          this.scene.tweens.add({
            targets: this.letters[counter],
            props : {
              //x : { value : '-='+Math.cos(100)*10},
              x: { value : '-='+(this.letterString.length-(counter+1))*3},
              angle:360,
              rotation: 0
            }, 
            ease: 'linear',
            duration: 600,
            repeat: -1,
            yoyo: true
        });
        }else{
          this.scene.tweens.add({
            targets: this.letters[counter],
            props : {
              //x : { value : '-='+Math.cos(100)*10},
              x: { value : '-='+(counter)*3},
              angle:360,
              rotation: 0
            }, 
            ease: 'linear',
            duration: 600,
            repeat: -1,
            yoyo: true
        });
        }
      }
    }

    textSquishLeft(){
      //loop to apply tween to text
      for(let counter = 0; counter < this.letters.length; counter++){
        // applys effect to every character.
        

          this.scene.tweens.add({
            targets: this.letters[counter],
            props : {
              //x : { value : '-='+Math.cos(100)*10},
              x: { value : '-='+(counter)*3},
              angle:360,
              rotation: 0
            }, 
            ease: 'linear',
            duration: 600,
            repeat: -1,
            yoyo: true
        });

      }
    }

     textSquishRight(){
      //loop to apply tween to text
      for(let counter = 0; counter < this.letters.length; counter++){
        // applys effect to every character.
        
          this.scene.tweens.add({
            targets: this.letters[counter],
            props : {
              //x : { value : '-='+Math.cos(100)*10},
              x: { value : '+='+(this.letters.length-counter)*3},
              angle:360,
              rotation: 0
            }, 
            ease: 'linear',
            duration: 600,
            repeat: -1,
            yoyo: true
        });

      }
    }

    //increase
    increaseRight(time){
      let top = 1
      let bottom = 1
      for(let counter = 0; counter < this.letters.length; counter++){
        this.letters[counter].x += counter*3;
        var tween = this.scene.tweens.add({
          targets: this.letters[counter],
          duration: time,
          x: { value : '+='+(counter)*5},
          scale: (top/(bottom)/6),
          ease: 'Sine.InOut',
          repeat: 0,  
          onComplete: this. textFadeOutAndDestroy(time*3)
        });


        top+=2;
        bottom++;
      }
    }

    textFadeIn(time){
      for(let counter = 0; counter < this.letters.length; counter++){
        this.scene.tweens.add({
          targets: this.letters[counter],
          duration: time,
          alpha: { from: 0, to: 1 },
          ease: 'Sine.InOut',
          repeat: 0,
        });
      }
    }

    textFadeOut(time){
      for(let counter = 0; counter < this.letters.length; counter++){
        this.scene.tweens.add({
          targets: this.letters[counter],
          duration: time,
          alpha: { from: 1, to: 0 },
          ease: 'Sine.InOut',
          repeat: 0,
        });
      }
    }

    textFadeOutAndDestroy(time){
      for(let counter = 0; counter < this.letters.length; counter++){
        let tween = this.scene.tweens.add({
          targets: this.letters[counter],
          duration: time,
          alpha: { from: 1, to: 0 },
          ease: 'Sine.InOut',
          repeat: 0,
          onComplete: this.remove(time)
        });
      }
    }

    

    //removes this object
    remove(timeDelay){
      console.log('destroying text');
      let text = this;
      setTimeout(function(){
        text.destroy();
      },timeDelay);
    }
    

}