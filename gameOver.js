/*
https://phaser.io/examples/v3/view/input/mouse/click-sprite
https://phaser.io/examples/v2/input/pointer-over
 */
class gameOver extends Phaser.Scene {
    constructor(){
        // scene settings
        super({key: 'gameOverForest',active: false,physics:{default:'arcade'}});
        //variables attached to the scene
        this.newGame;
        this.processMap;
        this.enemy;
        this.gameOverSign;
        this.tryAgain;
        this.allFunctions;
        }

        preload(){
            this.load.image("gameOverbackground" , "assets/titleScreenBackground.png");
            this.load.image("source_map" , "assets/tiledMap/Tile Set V.0.8.png");
            this.load.image("gameOverSign" , "assets/gameoversign.png");
            this.load.image("tryAgianSign" , "assets/try agian.png");
             //load in the JSON file for the bitmap
            this.load.tilemapTiledJSON("mapGameover" , "assets/tiledMap/gameOverForest.json");
            this.load.spritesheet('blueSlime', 'assets/CommonBlueSlime.png',{frameWidth: 100, frameHeight: 100 });
           
            
        }

        create(){
            console.log("now in gameover scene");
            let backround = this.add.sprite(450, 0, "gameOverbackground");
            backround.setScale(1.5,1.5);
            this.tryAgian = this.add.sprite(450, 450, "tryAgianSign").setInteractive();
            this.tryAgian.setDepth(7);
            console.log("loading gameover tileset");
            let myMap = this.make.tilemap({ key: "mapGameover" });
            //creates a new level object which is used to display map. sends scene and mapdata
            this.processMap = new level(this,myMap);
            //calls function that loads the tiles from the json
            this.processMap.tilesetNameInTiled = "Tile Set V.0.8";
            this.processMap.setTiles();
            this.enemy = new blueSlime(this,450, 295);
            this.enemy.slimeGameOver();
            this.physics.add.collider(this.processMap.layer1, this.enemy);
            //sets up camera to follow player.
            this.mycamera = this.cameras.main;
            this.mycamera.startFollow(this.enemy);
            this.mycamera.setBounds( 0, 0, myMap.widthInPixels, myMap.HeightInPixels); 
            this.cameras.main.zoom = 1.7;
            this.gameOverSign = this.add.sprite(450,100,"gameOverSign");
            this.gameOverSign.setDepth(7);
            let that = this;
            this.allFunctions = new allSceneFunctions;
            /*
            this.anims.create({key: 'newActive',frames: this.anims.generateFrameNames('newGame', { start: 1, end: 1 }),frameRate: 1,repeat: -1});
            this.anims.create({key: 'newInActive',frames: this.anims.generateFrameNames('newGame', { start: 0, end: 0 }),frameRate: 1,repeat: -1});
            let backround = this.add.sprite(450, 450, "background");
            backround.setScale(1.5,1.5);
            this.newGame =  this.add.sprite(460, 500, "newGame").setInteractive();
            this.newGame.setScale(3,3);
            let loadGame =  this.add.sprite(460, 550, "loadGame").setInteractive();
            loadGame.setScale(3,3);

            this.input.mouse.capture = true;*/
            // adds a try agian buton that loads the player back into a scene if they die.
            this.tryAgian.on('pointerdown', function (pointer) {

                that.allFunctions.saveGame(1650,542,6,[2,4,6,8,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],0);
                that.scene.start('forestHome');
        
            });
            

        }

        update(){
            
        }

}