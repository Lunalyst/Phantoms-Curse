
class hpBarAnimations extends Phaser.GameObjects.Container{

    //set up animations for hpbar face.
    setFaceAnimations(){

        //male animations
        this.face.anims.create({key: '0playerGreen',frames: this.face.anims.generateFrameNames('hpBarFaceMale', { start: 0, end: 0 }),frameRate: 1,repeat: -1});
        this.face.anims.create({key: '0playerYellow',frames: this.face.anims.generateFrameNames('hpBarFaceMale', { start: 1, end: 1 }),frameRate: 1,repeat: -1});
        this.face.anims.create({key: '0playerRed',frames: this.face.anims.generateFrameNames('hpBarFaceMale', { start: 2, end: 2 }),frameRate: 1,repeat: -1});
        this.face.anims.create({key: '0playerZero',frames: this.face.anims.generateFrameNames('hpBarFaceMale', { start: 3, end: 6 }),frameRate: 6,repeat: -1}); 

        this.face.anims.create({key: '0playerDigest',frames: this.face.anims.generateFrameNames('hpBarFaceMale', { start: 7, end: 19 }),frameRate: 8,repeat: 0});
        this.face.anims.create({key: '0playerDigested',frames: this.face.anims.generateFrameNames('hpBarFaceMale', { start: 19, end: 19 }),frameRate: 8,repeat: -1});
        
        this.face.anims.create({key: '0playerUnbirth',frames: this.face.anims.generateFrameNames('hpBarFaceMale', { start: 20, end: 32 }),frameRate: 8,repeat: 0});
        this.face.anims.create({key: '0playerUnbirthed',frames: this.face.anims.generateFrameNames('hpBarFaceMale', { start: 32, end: 32 }),frameRate: 8,repeat: -1});               
        
        this.face.anims.create({key: '0playerRebirth',frames: this.face.anims.generateFrameNames('hpBarFaceMale', { start: 33, end: 48 }),frameRate: 8,repeat: 0}); 
        this.face.anims.create({key: '0playerRebirthed',frames: this.face.anims.generateFrameNames('hpBarFaceMale', { start: 48, end: 48 }),frameRate: 8,repeat: -1});              
            
        this.face.anims.create({key: '0playerBlueSlimed',frames: this.face.anims.generateFrameNames('hpBarFaceMale', { start: 49, end: 63 }),frameRate: 8,repeat: 0});              
        this.face.anims.create({key: '0playerBlueSlime',frames: this.face.anims.generateFrameNames('hpBarFaceMale', { start: 63, end: 63 }),frameRate: 8,repeat: -1});              
        
        this.face.anims.create({key: '0playerBatTF',frames: this.face.anims.generateFrameNames('hpBarFaceMale', { start: 64, end: 64 }),frameRate: 8,repeat: -1});              
        this.face.anims.create({key: '0playerBeeDroneTF',frames: this.face.anims.generateFrameNames('hpBarFaceMale', { start: 65, end: 65 }),frameRate: 8,repeat: -1});              
        this.face.anims.create({key: '0playerWhiteCatTF',frames: this.face.anims.generateFrameNames('hpBarFaceMale', { start: 66, end: 66 }),frameRate: 8,repeat: -1});              
        this.face.anims.create({key: '0playerShadowTF',frames: this.face.anims.generateFrameNames('hpBarFaceMale', { start: 67, end: 67 }),frameRate: 8,repeat: -1});              
        this.face.anims.create({key: '0playerMimicTF',frames: this.face.anims.generateFrameNames('hpBarFaceMale', { start: 68, end: 68 }),frameRate: 8,repeat: -1});              
        this.face.anims.create({key: '0playerMushroomTF',frames: this.face.anims.generateFrameNames('hpBarFaceMale', { start: 69, end: 69 }),frameRate: 8,repeat: -1});              
        this.face.anims.create({key: '0playerRabbitTF',frames: this.face.anims.generateFrameNames('hpBarFaceMale', { start: 70, end: 70 }),frameRate: 8,repeat: -1});              
        this.face.anims.create({key: '0playerTigerTF',frames: this.face.anims.generateFrameNames('hpBarFaceMale', { start: 71, end: 71 }),frameRate: 8,repeat: -1});              
        this.face.anims.create({key: '0playerVivianTF',frames: this.face.anims.generateFrameNames('hpBarFaceMale', { start: 72, end: 72 }),frameRate: 8,repeat: -1});              
        this.face.anims.create({key: '0playerPumpkinTF',frames: this.face.anims.generateFrameNames('hpBarFaceMale', { start: 73, end: 73 }),frameRate: 8,repeat: -1});              
        this.face.anims.create({key: '0playerRabbitFutaTF',frames: this.face.anims.generateFrameNames('hpBarFaceMale', { start: 74, end: 74 }),frameRate: 8,repeat: -1});              
        
        //female animations.
        this.face.anims.create({key: '1playerGreen',frames: this.face.anims.generateFrameNames('hpBarFaceFemale', { start: 0, end: 0 }),frameRate: 1,repeat: -1});
        this.face.anims.create({key: '1playerYellow',frames: this.face.anims.generateFrameNames('hpBarFaceFemale', { start: 1, end: 1 }),frameRate: 1,repeat: -1});
        this.face.anims.create({key: '1playerRed',frames: this.face.anims.generateFrameNames('hpBarFaceFemale', { start: 2, end: 2 }),frameRate: 1,repeat: -1});  
        this.face.anims.create({key: '1playerZero',frames: this.face.anims.generateFrameNames('hpBarFaceFemale', { start: 3, end: 6 }),frameRate: 6,repeat: -1});  

       
    }

    //set up a map to be called for special phbarface animations
    setSpecialFaceMap(){
        let tempBar = this;

        this.specialFaceMap = {
        // default if the player has no rings equipt
        "unbirth": function unbirthFuct(animationText,nameText) {
             console.log("activating unbirth animation. ");
            tempBar.face.anims.play(tempBar.scene.playerSex+'playerUnbirth').once('animationcomplete', () => {

                tempBar.face.anims.play(tempBar.scene.playerSex+'playerUnbirthed', true);

                tempBar.playerName.destroy();
                tempBar.playerName = new makeText(tempBar.scene,-260 ,-10,'charBubble',"WOLF GOO");
                tempBar.add(tempBar.playerName);

            });
        },
        "wolfRebirth": function wolfRebirthFuct(animationText,nameText) {
             console.log("activating rebirth animation. ");
            tempBar.face.anims.play(tempBar.scene.playerSex+'playerRebirth').once('animationcomplete', () => {

                tempBar.face.anims.play(tempBar.scene.playerSex+'playerRebirthed', true);

                tempBar.playerName.destroy();

                /*if(tempBar.scene.playerSex === 0){
                    tempBar.playerName = new makeText(tempBar.scene,-260 ,-10,'charBubble',"Evan");
                }else{
                    tempBar.playerName = new makeText(tempBar.scene,-260 ,-10,'charBubble',"Evelyn");
                }*/

                tempBar.playerName = new makeText(tempBar.scene,-260 ,-10,'charBubble',"Wolf\'s Mate");
                
                tempBar.add(tempBar.playerName);

            });
        },
        "genericDigest": function unbirthFuct(animationText,nameText) {

            console.log("genericDigest : ", animationText , ", ",nameText)

            tempBar.face.anims.play(tempBar.scene.playerSex+'playerDigest').once('animationcomplete', () => {

                tempBar.face.anims.play(tempBar.scene.playerSex+'playerDigested', true);

                tempBar.playerName.destroy();
                tempBar.playerName = new makeText(tempBar.scene,-260 ,-10,'charBubble',nameText);
                tempBar.add(tempBar.playerName);

            });
        },
        "genericTF": function unbirthFuct(animationText,nameText) {
            
            console.log("generic tf : ", animationText , ", ",nameText)
            tempBar.face.anims.play(tempBar.scene.playerSex+animationText, true);
            tempBar.playerName.destroy();
            tempBar.playerName = new makeText(tempBar.scene,-260 ,-10,'charBubble',nameText);
            tempBar.add(tempBar.playerName);

        },
        
        }
    }





}

