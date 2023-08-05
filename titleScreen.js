
/*
https://phaser.io/examples/v3/view/input/mouse/click-sprite
https://phaser.io/examples/v2/input/pointer-over
https://braelynnn.medium.com/phaser-game-settings-using-localstorage-1cf6a9fa6f2c
 */
class titleScreen extends Phaser.Scene {
    constructor(){
        // scene settings
        super({key: 'titleScreen',active: true,physics:{default:'arcade'}});
        //variables attached to the scene
        this.newGame;
        this.loadGame;
        this.allFunctions;
        this.backround;
        this.titleLogo;
        this.title;
        this.warpToX;
        this.warpToY;
        this.playerHealth;
        this.inventoryDataArray;
        this.playerSex;
        this.activateFunctions;
        this.flagValues;
        this.playerLocation;
        }
        preload(){
            //this.load.spritesheet('backgroundForest', 'assets/titleScreenBackground.png',{frameWidth: 1000 , frameHeight: 664});
            this.load.spritesheet('backgroundForest', 'assets/title-backround.png',{frameWidth: 1000 , frameHeight: 667});
            this.load.spritesheet("newGame" , "assets/NewGame.png" , {frameWidth: 100 , frameHeight: 11 });
            this.load.spritesheet("newGame" , "assets/NewGame.png" , {frameWidth: 100 , frameHeight: 11 });
            this.load.spritesheet("loadGame" , "assets/LoadGame.png" , {frameWidth: 100 , frameHeight: 11 });
            this.load.spritesheet("title" , "assets/Phantom's Curse.png" , {frameWidth: 1050 , frameHeight: 100 });
            this.load.spritesheet("titleLogo" , "assets/title screen logo.png" , {frameWidth: 300 , frameHeight: 320 });
            
        }

        create(){
            let that = this;
            this.anims.create({key: 'newActive',frames: this.anims.generateFrameNames('newGame', { start: 1, end: 1 }),frameRate: 1,repeat: -1});
            this.anims.create({key: 'newInActive',frames: this.anims.generateFrameNames('newGame', { start: 0, end: 0 }),frameRate: 1,repeat: -1});
            this.anims.create({key: 'loadActive',frames: this.anims.generateFrameNames('loadGame', { start: 1, end: 1 }),frameRate: 1,repeat: -1});
            this.anims.create({key: 'loadInActive',frames: this.anims.generateFrameNames('loadGame', { start: 0, end: 0 }),frameRate: 1,repeat: -1});
            this.anims.create({key: 'backroundLoop',frames: this.anims.generateFrameNames('backgroundForest', { start: 0, end: 8 }),frameRate: 4,repeat: -1});
            this.anims.create({key: 'titleLogoLoop',frames: this.anims.generateFrameNames('titleLogo', { start: 0, end: 5 }),frameRate: 2,repeat: -1});
            this.anims.create({key: 'titleLoop',frames: this.anims.generateFrameNames('title', { start: 0, end: 9 }),frameRate: 15,repeat: -1});
            this.anims.create({key: 'titleLoop1',frames: this.anims.generateFrameNames('title', { start: 4, end: 4 }),frameRate: 1,repeat: -1});
            this.backround = this.add.sprite(450, 450, "backgroundForest");
            this.backround.setScale(1.6);
            this.backround.setTint(0x4b4b4b);
            this.titleLogo = this.add.sprite(450, 430, "titleLogo");
            this.titleLogo.anims.play("titleLogoLoop");
            this.titleLogo.setScale(2);
            this.title =this.add.sprite(450, 50, "title");
            this.title.anims.play("titleLoop1");
            this.title.setScale(.8);
            this.activateFunctions = new allSceneFunctions;
           
            //this.backround.anims.play("backroundLoop");
            this.newGame =  this.add.sprite(180, 600, "newGame").setInteractive();
            this.newGame.setScale(3);
            this.loadGame =  this.add.sprite(180, 650, "loadGame").setInteractive();
            this.loadGame.setScale(3);
            

            this.allFunctions = new allSceneFunctions;

            this.input.mouse.capture = true;

            this.newGame.on('pointerdown', function (pointer) {

       
                that.allFunctions.saveGame(1650,542,1,[2,4,6,8,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],0);
                that.scene.start('forestHome');
        
            });

            this.loadGame.on('pointerdown', function (pointer) {

                that.activateFunctions.loadGameFile(that);
                if(that.warpToX != undefined){
                    that.allFunctions.saveGame( that.warpToX, that.warpToY, that.playerHealth, that.inventoryDataArray, that.playerSex,that.flagValues);
                    that.scene.start(that.playerLocation); 
                }
                
        
            });

            this.newGame.on('pointerover',function(pointer){
                that.newGame.anims.play("newActive");
            })
            this.newGame.on('pointerout',function(pointer){
                that.newGame.anims.play("newInActive");
            })

            this.loadGame.on('pointerover',function(pointer){
                that.loadGame.anims.play("loadActive");
            })
            this.loadGame.on('pointerout',function(pointer){
                that.loadGame.anims.play("loadInActive");
            })
            

        }

        update(){
            
        }

}