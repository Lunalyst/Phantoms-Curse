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

         this.finishedPlaying = false;

         //this.title = new makeText( this.scene, 0, -70,'charBubble','CREDITS');
         this.thankYou1 = new makeText(this.scene, 0, -50,'charBubble','THANK YOU TO EVERYONE WHO HAS HELPED ME IMPROVE');
         this.add(this.thankYou1);
         this.thankYou2 = new makeText(this.scene, 0, -30,'charBubble','AND EVOLVE THIS PROJECT. I AM FOREVER GRATEFUL.');
         this.add(this.thankYou2);
         this.thankYou3 = new makeText(this.scene, 0, -10,'charBubble','------------------------------------------------------');
         this.add(this.thankYou3);
         this.thankYou4 = new makeText(this.scene, 0, 510,'charBubble','------------------------------------------------------');
         this.add(this.thankYou4);
         this.thankYou5 = new makeText(this.scene, 0, 530,'charBubble','IF YOU WOULD LIKE YOUR NAME HERE ALONG WITH THESE');
         this.add(this.thankYou5);
         this.thankYou6 = new makeText(this.scene, 0, 550,'charBubble','WONDERFUL FOLKS, THEN FEEL FREE TO JOIN OUR COMMUNITY,');
         this.add(this.thankYou6);
         this.thankYou7 = new makeText(this.scene, 0, 570,'charBubble','THROUGH THE DISCORD LINK.');
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
                setTimeout(function () {
                    
                    //after delay make names and call credits function apart of make texttext.
                    if(tempCredits.scene !== undefined && tempCredits !== null ){
                        console.log("displaying name: ", tempCredits.credits[counter]);
                        let name = new makeText(tempCredits.scene,0,0,'charBubble',tempCredits.credits[counter]);
                        tempCredits.add(name);
                        tempCredits.activeNames.push(name);
                        name.textCredits(20000,500,true,this);
                 
                    }
            
                }, counter*1200);
            }else{
                let tempCredits = this;
                setTimeout(function () {
                    //after delay make names and call credits function apart of make texttext.
                    if(tempCredits.scene !== undefined && tempCredits !== null ){
                        console.log("displaying name: ", tempCredits.credits[counter]);
                        let name = new makeText(tempCredits.scene,0,0,'charBubble',tempCredits.credits[counter]);
                        tempCredits.add(name);
                        tempCredits.activeNames.push(name);
                        name.textCredits(20000,500,false,this);
                    }
            
                }, counter*1200);
            }
            
        }

    }


    
}
