class keyBindsMenu extends Phaser.GameObjects.Container{

    constructor(scene, xPos, yPos){

        super(scene, xPos, yPos);

        scene.add.existing(this);

        this.setScrollFactor(0);
        //sets up inner andf outer menu interior and exterior
        this.optionMenuInterior = scene.add.sprite(0, 385, 'keyBindsMenu');
        this.optionMenuInterior.setScale(0.26);
        this.optionMenuInterior.setAlpha(0.5);
        this.add(this.optionMenuInterior);

        this.optionMenuBorder = scene.add.sprite(0, 385, 'keyBindsMenu');
        this.optionMenuBorder.anims.create({key: 'border',frames: this.optionMenuBorder.anims.generateFrameNames('keyBindsMenu', { start: 1, end: 1 }),frameRate: 10,repeat: -1});
        this.optionMenuBorder.anims.play('border');
        this.optionMenuBorder.setScale(0.26);
        this.add(this.optionMenuBorder);

        //refrences to the scene for some use later
        let that = this;

        this.scene = scene;

        this.activelySelecting = false;

        //add option menu elements and buttons
        this.title = new makeText(scene,-50,75*2,'charBubble',"KEYBINDS");
        this.add(this.title);

        console.log("menu is done:",this.x," ",this.y);

        this.interact = new keyBindUnit(scene,-40,250,"interact","W",this);
        this.add(this.interact);

        this.left = new keyBindUnit(scene,-40,300,"move left","A",this);
        this.add(this.left);
        
        this.right = new keyBindUnit(scene,-40,350,"move right","D",this);
        this.add(this.right);

        this.down = new keyBindUnit(scene,-40,400,"move down","S",this);
        this.add(this.down);

        this.space = new keyBindUnit(scene,-40,450,"jump","SPACE",this);
        this.add(this.space);

        this.inventory = new keyBindUnit(scene,-40,500,"inventory","TAB",this);
        this.add(this.inventory);
        
        this.attack = new keyBindUnit(scene,-40,550,"attack","SHI",this);
        this.add(this.attack);

        
        
    }

 
    //if the menu is closed without saving then, reset changes.
    resetSettings(){

        

    }

    //save settings 
    saveSettings(){

       
    }
    

}

class keyBindUnit extends Phaser.GameObjects.Container{

    constructor(scene, xPos, yPos,unitName,unitKey,menu){

        super(scene, xPos, yPos);

        scene.add.existing(this);

        this.setScrollFactor(0);

        this.menu = menu;
        
        //refrences to the scene for some use later
        let that = this;

        this.scene = scene;

        this.isSelected = false;

        //add option menu elements and buttons
        this.title = new makeText(scene,0,25,'charBubble',unitName);
        this.title.addHitboxBinds();
        this.add(this.title);

        this.title.on('pointerover',function(pointer){
            if(this.menu.activelySelecting === false && this.isSelected === false){
                this.scene.initSoundEffect('buttonSFX','1',0.05);
                this.title.setTextTint(0xff7a7a);
            }
        },this);

        this.title.on('pointerout',function(pointer){
            if(this.menu.activelySelecting === false && this.isSelected === false){
                this.title.clearTextTint();
            }
        },this);

        this.title.on('pointerdown', function (pointer) {

            if(this.menu.activelySelecting === false && this.isSelected === false){
                this.menu.activelySelecting = true;
                this.isSelected = true;
                this.title.setTextTint(0xff7a7a);
            }else if(this.menu.activelySelecting === true && this.isSelected === true){
                this.menu.activelySelecting = false;
                this.isSelected = false;
                this.title.clearTextTint();
            } 
            
            

        },this);

        this.keyDisplay = new keyPrompts(scene,-70,0);
        this.keyDisplay.setScale(1);
        this.add(this.keyDisplay);
        this.keyDisplay.playKey(unitKey);
        
    }

 
    
    

}