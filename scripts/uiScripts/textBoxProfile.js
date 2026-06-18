class textBoxProfile extends Phaser.Physics.Arcade.Sprite{
    // every class needs constructor
    constructor(scene, xPos, yPos){
      //super() calls the constructor() from the parent class we are extending
      super(scene, xPos, yPos, 'textBoxProfile');
      //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
      //so here in the subclass of sprite its refering to the image object we just made. 
      scene.add.existing(this);
      this.setDepth(50);
      this.setScrollFactor(0);
      this.visible = false;
      this.setScale(.7);
      
      this.anims.create({key: 'signLoop',frames: this.anims.generateFrameNames('textBoxProfile', { start: 0, end: 3 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'blank',frames: this.anims.generateFrameNames('textBoxProfile', { start:4, end: 4 }),frameRate: 5,repeat: -1});

      this.anims.create({key: 'lunaNeutral',frames: this.anims.generateFrameNames('lunalystEmots', { start: 0, end: 9 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'lunaCry',frames: this.anims.generateFrameNames('lunalystEmots', { start: 10, end: 17 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'lunaHearts',frames: this.anims.generateFrameNames('lunalystEmots', { start: 18, end: 24 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'lunaSquish',frames: this.anims.generateFrameNames('lunalystEmots', { start: 25, end: 30 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'lunaHappy',frames: this.anims.generateFrameNames('lunalystEmots', { start:31, end: 35 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'lunaWink',frames: this.anims.generateFrameNames('lunalystEmots', { start:36, end: 42 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'lunaKO',frames: this.anims.generateFrameNames('lunalystEmots', { start:43, end: 46 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'lunaHeartEyes',frames: this.anims.generateFrameNames('lunalystEmots', { start:47, end: 51 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'lunaStarEyes',frames: this.anims.generateFrameNames('lunalystEmots', { start:52, end: 57 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'lunaAngryEyes',frames: this.anims.generateFrameNames('lunalystEmots', { start:58, end: 61 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'lunaSleeping',frames: this.anims.generateFrameNames('lunalystEmots', { start:62, end: 67 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'lunaFingerTouch',frames: this.anims.generateFrameNames('lunalystEmots', { start:68, end: 71 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'lunaWave',frames: this.anims.generateFrameNames('lunalystEmots', { start:72, end:  75}),frameRate: 5,repeat: -1});
      this.anims.create({key: 'lunaShock1',frames: this.anims.generateFrameNames('lunalystEmots', { start:76, end:  76}),frameRate: 5,repeat: -1});
      this.anims.create({key: 'lunaShock2',frames: this.anims.generateFrameNames('lunalystEmots', { start:77, end:  77}),frameRate: 5,repeat: -1});
      this.anims.create({key: 'lunaEyeRaise',frames: this.anims.generateFrameNames('lunalystEmots', { start:78, end:  78}),frameRate: 5,repeat: -1});
      this.anims.create({key: 'lunaHorny',frames: this.anims.generateFrameNames('lunalystEmots', { start:79, end:  86}),frameRate: 5,repeat: -1});
      this.anims.create({key: 'lunaClimax',frames: this.anims.generateFrameNames('lunalystEmots', { start:87, end:  87}),frameRate: 5,repeat: -1});

      this.anims.play("blank",true); 
    }

    setUpIstaraEmots(){
      this.anims.create({key: 'istaraNeutral',frames: this.anims.generateFrameNames('istaraEmots', { start: 0, end: 4 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'istaraHappy',frames: this.anims.generateFrameNames('istaraEmots', { start: 6, end: 9 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'istaraKO',frames: this.anims.generateFrameNames('istaraEmots', { start: 11, end: 14 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'istaraStarEyes',frames: this.anims.generateFrameNames('istaraEmots', { start: 16, end: 21 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'istaraSquish',frames: this.anims.generateFrameNames('istaraEmots', { start: 23, end: 28 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'istaraAnnoyed',frames: this.anims.generateFrameNames('istaraEmots', { start: 23, end: 23 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'istaraHeartEyes',frames: this.anims.generateFrameNames('istaraEmots', { start: 30, end: 35 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'istaraSad',frames: this.anims.generateFrameNames('istaraEmots', { start: 37, end: 41 }),frameRate: 5,repeat: -1});

    }

    setUpVivianEmots(){
      this.anims.create({key: 'vivianNeutral',frames: this.anims.generateFrameNames('vivianEmots', { start: 0, end: 4 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'vivianHappy',frames: this.anims.generateFrameNames('vivianEmots', { start: 6, end: 9 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'vivianKO',frames: this.anims.generateFrameNames('vivianEmots', { start: 11, end: 14 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'vivianStarEyes',frames: this.anims.generateFrameNames('vivianEmots', { start: 16, end: 21 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'vivianSquish',frames: this.anims.generateFrameNames('vivianEmots', { start: 23, end: 26 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'vivianHeartEyes',frames: this.anims.generateFrameNames('vivianEmots', { start: 28, end: 33 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'vivianShocked',frames: this.anims.generateFrameNames('vivianEmots', { start: 35, end: 39 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'vivianSmug',frames: this.anims.generateFrameNames('vivianEmots', { start: 41, end: 44 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'vivianSmugTongue',frames: this.anims.generateFrameNames('vivianEmots', { start: 46, end: 49 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'vivianWink',frames: this.anims.generateFrameNames('vivianEmots', { start: 51, end: 55 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'vivianAngry',frames: this.anims.generateFrameNames('vivianEmots', { start: 57, end: 60 }),frameRate: 5,repeat: -1});
    }

    setUpMiloEmots(){
      this.anims.create({key: 'miloNeutral',frames: this.anims.generateFrameNames('miloEmots', { start: 0, end: 0 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'miloEyeRaise',frames: this.anims.generateFrameNames('miloEmots', { start: 1, end: 4 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'miloHappy',frames: this.anims.generateFrameNames('miloEmots', { start: 5, end: 8 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'miloScared',frames: this.anims.generateFrameNames('miloEmots', { start: 9, end: 13 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'miloKO',frames: this.anims.generateFrameNames('miloEmots', { start: 14, end: 17 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'miloStarEyes',frames: this.anims.generateFrameNames('miloEmots', { start: 18, end: 21 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'miloExcited',frames: this.anims.generateFrameNames('miloEmots', { start: 22, end: 25 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'miloPain',frames: this.anims.generateFrameNames('miloEmots', { start: 26, end: 29 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'miloBlank',frames: this.anims.generateFrameNames('miloEmots', { start: 30, end: 30 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'miloblush1',frames: this.anims.generateFrameNames('miloEmots', { start: 31, end: 31 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'miloblush2',frames: this.anims.generateFrameNames('miloEmots', { start: 32, end: 32 }),frameRate: 5,repeat: -1});
    }

    setUpNectarEmots(){
      this.anims.create({key: 'nectarSquint',frames: this.anims.generateFrameNames('nectarEmots', { start: 0, end: 0 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'nectarNeutral',frames: this.anims.generateFrameNames('nectarEmots', { start: 1, end: 1 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'nectarShock',frames: this.anims.generateFrameNames('nectarEmots', { start: 2, end: 2 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'nectarSmile',frames: this.anims.generateFrameNames('nectarEmots', { start: 4, end: 4 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'nectarWideSmile',frames: this.anims.generateFrameNames('nectarEmots', { start: 5, end: 5 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'nectarHurt',frames: this.anims.generateFrameNames('nectarEmots', { start: 6, end: 6 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'nectarMad',frames: this.anims.generateFrameNames('nectarEmots', { start: 7, end: 7 }),frameRate: 5,repeat: -1});
      
    }

    setUpWolfEmots(){
      this.anims.create({key: 'wolfNeutral',frames: this.anims.generateFrameNames('wolfEmots', { start: 0, end: 4 }),frameRate: 3,repeat: -1});
      this.anims.create({key: 'wolfHappy1',frames: this.anims.generateFrameNames('wolfEmots', { start: 6, end: 9 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'wolfHappy2',frames: this.anims.generateFrameNames('wolfEmots', { start: 11, end: 14 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'wolfKO',frames: this.anims.generateFrameNames('wolfEmots', { start: 16, end: 19 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'wolfStarEyes',frames: this.anims.generateFrameNames('wolfEmots', { start: 21 , end: 26 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'wolfConcentrate',frames: this.anims.generateFrameNames('wolfEmots', { start: 28 , end: 31 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'wolfHeartEyes',frames: this.anims.generateFrameNames('wolfEmots', { start: 33 , end: 37 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'wolfSmirk1',frames: this.anims.generateFrameNames('wolfEmots', { start: 39 , end: 42 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'wolfWink',frames: this.anims.generateFrameNames('wolfEmots', { start: 44 , end: 50 }),frameRate: 4,repeat: -1});
      this.anims.create({key: 'wolfMad',frames: this.anims.generateFrameNames('wolfEmots', { start: 52 , end:  53+2}),frameRate: 5,repeat: -1});
      this.anims.create({key: 'wolfSmirk2',frames: this.anims.generateFrameNames('wolfEmots', { start: 55+2 , end:  59+2}),frameRate: 5,repeat: -1});
      this.anims.create({key: 'wolfKiss',frames: this.anims.generateFrameNames('wolfEmots', { start: 61+2 , end:  65+2}),frameRate: 5,repeat: -1});
    }

    setUpRegiEmots(){
      this.anims.create({key: 'regiNeutral',frames: this.anims.generateFrameNames('regiEmots', { start: 0, end: 0 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'regiHappy',frames: this.anims.generateFrameNames('regiEmots', { start: 1, end: 1 }),frameRate: 5,repeat: -1});
    }

    setUpMemoryEmots(){
      this.anims.create({key: 'memoryNeutral',frames: this.anims.generateFrameNames('memoryEmots', { start: 0, end: 0 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'memoryHappy',frames: this.anims.generateFrameNames('memoryEmots', { start: 1, end: 1 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'memoryMad',frames: this.anims.generateFrameNames('memoryEmots', { start: 2, end: 2 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'memoryEyeRaise',frames: this.anims.generateFrameNames('memoryEmots', { start: 3, end: 3 }),frameRate: 5,repeat: -1});
      this.anims.create({key: 'memoryHappyGlitch',frames: this.anims.generateFrameNames('memoryEmots', { start: 4, end: 7 }),frameRate: 7,repeat: -1});

    }
}