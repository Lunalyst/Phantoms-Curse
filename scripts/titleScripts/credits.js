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

         this.xAxis = -70

         this.playing = false;

         this.activeNames = [];
         this.activeNameSprites = [];

         this.finishedPlaying = false;

         this.resetTimeOut = null;

        this.backround = this.scene.add.sprite(400, 240, "creditBackdrop");
        this.add(this.backround);

        this.textColor = 0xb016fa;
        this.textType = "charWhite";

        this.form = new makeEcrus(this.scene,this.xAxis, -40,"@01110@ @11000@ @100@ @1101@ @1011@ @00@ @0110@ @100@ @0101@ @1101@ @1011@ @100@ @0101@ @00@ @1010@ @11001@ @01000@ @100@ @00@ @11111@ @01111@ @00@ @1010@ @1110@ @00@ @01001@ @11110@ @0110@ @1110@");
        this.add(this.form);
        this.form.visible = false;
            

         //this.title = new makeText( this.scene, 0, -70,'charBubble','CREDITS');
        this.thankYou1 = new makeText(this.scene, this.xAxis, -50,this.textType,'Thank you to everyone who has helped me improve');
        this.thankYou1.setTextTint(this.textColor);
        this.add(this.thankYou1);
        this.thankYou2 = new makeText(this.scene, this.xAxis, -30,this.textType,'and evolve this project. I am forever grateful.');
        this.thankYou2.setTextTint(this.textColor);
        this.add(this.thankYou2);
        this.thankYou3 = new makeText(this.scene, this.xAxis, -10,this.textType,'------------------------------------------------------');
        this.thankYou3.setTextTint(this.textColor);
        this.add(this.thankYou3);
        this.thankYou4 = new makeText(this.scene, this.xAxis, 510,this.textType,'------------------------------------------------------');
        this.thankYou4.setTextTint(this.textColor);
        this.add(this.thankYou4);
        this.thankYou5 = new makeText(this.scene, this.xAxis, 530,this.textType,'If you would like your name here along with these');
        this.thankYou5.setTextTint(this.textColor);
        this.add(this.thankYou5);
        this.thankYou6 = new makeText(this.scene, this.xAxis, 550,this.textType,'wonderful folks, then feel free to join our community.');
        this.thankYou6.setTextTint(this.textColor);
        this.add(this.thankYou6);
        //this.thankYou7 = new makeText(this.scene, this.xAxis, 570,this.textType,'through the discord link.');
        //this.thankYou7.setTextTint(this.textColor);
        //this.add(this.thankYou7);

        this.thankYou7 = new makeText(this.scene, 795, 25,this.textType,'Discord');
        this.thankYou7.setTextTint(0x5865f2);
        this.add(this.thankYou7);

        this.discordIcon = this.scene.add.sprite(760, 0, "linkSprites");
        this.add(this.discordIcon);
        this.scene.anims.create({key: 'discord',frames: this.scene.anims.generateFrameNames('linkSprites', { start: 1, end: 1 }),frameRate: 1,repeat: -1});
        this.discordIcon.setScale(.4);
        this.discordIcon.anims.play("discord");

        this.discordServer = this.scene.add.sprite(820, 95, "discordServerQR");
        this.add(this.discordServer);
        this.discordServer.setScale(.7);

        this.form1 = new makeEcrus(this.scene,this.xAxis, 540,"@0111@ @110@ @101@ @1001@ @0110@ @111@ @0101@ @110@ @000@ @111@ @1000@ @110@ @0011@ @101@ @111@ @000@ @0100@ @0010@");
        this.add(this.form1);
        this.form1.visible = false;

        this.thankYou8 = new makeText(this.scene, 795, 225,this.textType,'Patreon');
        this.thankYou8.setTextTint(0xfe6a00);
        this.add(this.thankYou8);

        this.patreonIcon = this.scene.add.sprite(760, 200, "linkSprites");
        this.add(this.patreonIcon);
        this.scene.anims.create({key: 'patreon',frames: this.scene.anims.generateFrameNames('linkSprites', { start: 0, end: 0 }),frameRate: 1,repeat: -1});
        this.patreonIcon.setScale(.4);
        this.patreonIcon.anims.play("patreon");

        this.patreonQR = this.scene.add.sprite(820, 295, "patreonQR");
        this.add(this.patreonQR);
        this.patreonQR.setScale(.7);

        //this.lunaArt = this.scene.add.sprite(800, 488, "smugLunalyst");
        //this.add(this.lunaArt);
        //this.lunaArt.setScale(1/5);


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
                    if(tempCredits.scene !== undefined && tempCredits !== null && tempCredits.visible === true ){
                        console.log("displaying name: ", tempCredits.credits[counter]);
                        let name = new makeText(tempCredits.scene,tempCredits.xAxis,0,tempCredits.textType,tempCredits.credits[counter]);
                        name.setTextTint(tempCredits.textColor);
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
                        let name = new makeText(tempCredits.scene,tempCredits.xAxis,0,tempCredits.textType,tempCredits.credits[counter]);
                        name.setTextTint(tempCredits.textColor);
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
