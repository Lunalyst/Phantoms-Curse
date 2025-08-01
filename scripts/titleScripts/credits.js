class credits extends Phaser.GameObjects.Container{
    // every class needs constructor
    constructor(scene, xPos, yPos,credits){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos);
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
        scene.add.existing(this);
        //this.setDepth(50);
        this.setScrollFactor(0);
        this.visible = false;

        this.credits = credits;
    
        this.scene = scene;

         this.position = 0;

         this.playing = false;

         this.activeNames = [];
         this.activeNameSprites = [];

         this.finishedPlaying = false;

         this.resetTimeOut = null;

         //this.title = new makeText( this.scene, 0, -70,'charBubble','CREDITS');
        this.thankYou1 = new makeText(this.scene, 0, -50,'charBubble','Thank you to everyone who has helped me improve');
        this.thankYou1.setTextTint(0x000000);
        this.add(this.thankYou1);
        this.thankYou2 = new makeText(this.scene, 0, -30,'charBubble','and evolve this project. I am forever grateful.');
        this.thankYou2.setTextTint(0x000000);
        this.add(this.thankYou2);
        this.thankYou3 = new makeText(this.scene, 0, -10,'charBubble','------------------------------------------------------');
        this.thankYou3.setTextTint(0x000000);
        this.add(this.thankYou3);
        this.thankYou4 = new makeText(this.scene, 0, 510,'charBubble','------------------------------------------------------');
        this.thankYou4.setTextTint(0x000000);
        this.add(this.thankYou4);
        this.thankYou5 = new makeText(this.scene, 0, 530,'charBubble','If you would like your name here along with these');
        this.thankYou5.setTextTint(0x000000);
        this.add(this.thankYou5);
        this.thankYou6 = new makeText(this.scene, 0, 550,'charBubble','wonderful folks, then feel free to join our community,');
        this.thankYou6.setTextTint(0x000000);
        this.add(this.thankYou6);
        this.thankYou7 = new makeText(this.scene, 0, 570,'charBubble','through the discord link.');
        this.thankYou7.setTextTint(0x000000);
        this.add(this.thankYou7);

    }

    activateCredits(){
        //if we are still on the title screen.
        // loop through all the names
        for(let counter = 0; counter < this.credits.length;counter++){
            console.log("");
            
            //by creating a object after a delay 
            if(counter === this.credits.length-1){
                let tempCredits = this;

                let resetTimeOut = setTimeout(function () {
                    
                    //after delay make names and call credits function apart of make texttext.
                    if(tempCredits.scene !== undefined && tempCredits !== null ){
                        console.log("displaying name: ", tempCredits.credits[counter]);
                        let name = new makeText(tempCredits.scene,0,0,'charBubble',tempCredits.credits[counter]);
                        name.setTextTint(0x000000);
                        tempCredits.add(name);
                        name.textCredits(20000,500,true,this);
                        //add current sprite to the list 
                        tempCredits.activeNameSprites.push(name);
                 
                    }
            
                }, counter*1200);

                this.activeNames.push(resetTimeOut);
            }else{
                let tempCredits = this;
                let resetTimeOut = setTimeout(function () {
                    //after delay make names and call credits function apart of make texttext.
                    if(tempCredits.scene !== undefined && tempCredits !== null ){

                        console.log("displaying name: ", tempCredits.credits[counter]);
                        let name = new makeText(tempCredits.scene,0,0,'charBubble',tempCredits.credits[counter]);
                        name.setTextTint(0x000000);
                        tempCredits.add(name);
                        name.textCredits(20000,500,false,this);

                        //add current sprite to the list 
                        tempCredits.activeNameSprites.push(name);
                    }
            
                }, counter*1200);

                this.activeNames.push(resetTimeOut);
            }
            
        }
        //console.log("this..activeNames: ",this.activeNames);

    }

    stopCredits(){

        //clears timeout functions
        for(let counter = 0; counter < this.activeNames.length;counter++){
            //console.log("stopping settime out at this.activeNames[counter]: ", this.activeNames[counter]);
            clearTimeout(this.activeNames[counter]);
        }

        //destory active text sprites for credits.
        for(let counter = 0; counter < this.activeNameSprites.length;counter++){
            //console.log("stopping settime out at this.activeNames[counter]: ", this.activeNameSprites[counter]);
            this.activeNameSprites[counter].remove(0)
        }
        //truncade array to remove element id we no longer need.
        this.activeNames.length = 0;
    }


    
}
