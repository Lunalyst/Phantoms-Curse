class keyBindsMenu extends Phaser.GameObjects.Container{

    constructor(scene, xPos, yPos){

        super(scene, xPos, yPos);

        scene.add.existing(this);

        this.setScrollFactor(0);
        //sets up inner andf outer menu interior and exterior
        this.optionMenuInterior = scene.add.sprite(0, 385, 'keyBindsMenu');
        this.optionMenuInterior.setScale(.6);
        //this.optionMenuInterior.setAlpha(0.5);
        this.add(this.optionMenuInterior);


        //refrences to the scene for some use later
        let that = this;

        this.scene = scene;

        this.activelySelecting = false;

        //add option menu elements and buttons
        this.title = new makeText(scene,-50,130,'charBubble',"KEYBINDS");
        this.add(this.title);

        console.log("menu is done:",this.x," ",this.y);

        this.bindArray = [];

        //need an array of active binds so that one button is not bound to multiple actions.
        this.setKeysInUse();

        let tempArray = [170];
        for(let index = 0;index < 7;index++){
            
            tempArray.push((170) + ((index+1) * 60) );
        }

        this.interact = new keyBindUnit(scene,-40,tempArray[0],"Interact",this.scene.bindSettings.keyWBind,this);
        this.add(this.interact);
        this.bindArray.push(this.interact);

        this.left = new keyBindUnit(scene,-40,tempArray[1],"Move Left",this.scene.bindSettings.keyABind,this);
        this.add(this.left);
        this.bindArray.push(this.left);
        
        this.right = new keyBindUnit(scene,-40,tempArray[2],"Move Right",this.scene.bindSettings.keyDBind,this);
        this.add(this.right);
        this.bindArray.push(this.right);

        this.down = new keyBindUnit(scene,-40,tempArray[3],"Move Down",this.scene.bindSettings.keySBind,this);
        this.add(this.down);
        this.bindArray.push(this.down);

        this.space = new keyBindUnit(scene,-40,tempArray[4],"Jump",this.scene.bindSettings.spaceBind,this);
        this.add(this.space);
        this.bindArray.push(this.space);

        this.inventory = new keyBindUnit(scene,-40,tempArray[5],"Inventory",this.scene.bindSettings.keyTABBind,this);
        this.add(this.inventory);
        this.bindArray.push(this.inventory);
        
        this.attack = new keyBindUnit(scene,-40,tempArray[6],"Attack",this.scene.bindSettings.shiftBind,this);
        this.add(this.attack);
        this.bindArray.push(this.attack);

        this.defaultButton = new makeText(scene,-160,685,'charBubble',"Default");
        this.defaultButton.addHitboxBinds();
        this.add(this.defaultButton);

        this.defaultButton.on('pointerover',function(pointer){
        
            this.scene.initSoundEffect('buttonSFX','1',0.05);
            this.defaultButton.setTextTint(0xff7a7a);
    
        },this);

        this.defaultButton.on('pointerout',function(pointer){
           
            this.defaultButton.clearTextTint();
           
        },this);

        this.defaultButton.on('pointerdown', function (pointer) {

            this.resetMenu();

            this.scene.initSoundEffect('buttonSFX','2',0.05);
            
            this.defaultKeys();
            

        },this);

              
    }

    setKeysInUse(){

        this.activeBindsArray = [];
        this.activeBindsArray.push(this.scene.bindSettings.keyWBind);
        this.activeBindsArray.push(this.scene.bindSettings.keyABind);
        this.activeBindsArray.push(this.scene.bindSettings.keyDBind);
        this.activeBindsArray.push(this.scene.bindSettings.keySBind);
        this.activeBindsArray.push(this.scene.bindSettings.spaceBind);
        this.activeBindsArray.push(this.scene.bindSettings.keyTABBind);
        this.activeBindsArray.push(this.scene.bindSettings.shiftBind);

        console.log("current keys in use: ",this.activeBindsArray);

    }
    //function to set new keybind after button has been pressed
    setKeyPress(newKey){
        //this.tempArray.push(newKey);
        //console.log("this.tempArray: ",this.tempArray)

        if(this.visible === true && this.activelySelecting === true && this.validateKey(newKey) && !this.isKeyInUse(newKey)){
           this.bindArray.forEach((bind) =>{
                if(bind.isSelected === true){
                    bind.updateUnitKey(newKey);
                    bind.keyDisplay.clearTint();
                }
                
            });
        }
    }

    //checks our array of valid keys, and if we find it then return true, else false
    validateKey(newKey){

        let keyFound = false;
         validKeys.forEach((key) =>{
                if(key === newKey){
                  keyFound = true;
                }
                
            });

        return keyFound;
    }

    //function which is used to check fi the key presses is already in use.
     isKeyInUse(newKey){

        let keyFound = false;
         this.activeBindsArray.forEach((key) =>{
                if(key === newKey){
                  keyFound = true;
                }
                
            });

        return keyFound;
    }

    resetMenu(){
        this.activelySelecting = false;
        this.bindArray.forEach((bind) =>{
                if(bind.isSelected === true){
                    bind.isSelected = false;
                    bind.title.clearTextTint();
                    bind.keyDisplay.clearTint();
                }
                
            });
    }

    defaultKeys(){
        //this.tempArray.push(newKey);
        //console.log("this.tempArray: ",this.tempArray)

       
           this.bindArray.forEach((bind) =>{

                if(bind.unitName === "Interact"){
                    this.scene.bindSettings.keyWBind = 'KeyW';
                    bind.unitKey = 'KeyW'; 
                    bind.keyDisplay.playKey('KeyW'+"-S"); 
                }else if(bind.unitName === "Move Left"){
                    this.scene.bindSettings.keyABind = 'KeyA';
                    bind.unitKey = 'KeyA'; 
                    bind.keyDisplay.playKey('KeyA'+"-S"); 
                }else if(bind.unitName === "Move Right"){
                    this.scene.bindSettings.keyDBind = 'KeyD';
                    bind.unitKey = 'KeyD'; 
                    bind.keyDisplay.playKey('KeyD'+"-S"); 
                }else if(bind.unitName === "Move Down"){
                    this.scene.bindSettings.keySBind = 'KeyS';
                    bind.unitKey = 'KeyS'; 
                    bind.keyDisplay.playKey('KeyS'+"-S"); 
                }else if(bind.unitName === "Jump"){
                    this.scene.bindSettings.spaceBind = 'Space';
                    bind.unitKey = 'Space'; 
                    bind.keyDisplay.playKey('Space'+"-S");
                }else if(bind.unitName === "Inventory"){
                    this.scene.bindSettings.keyTABBind = 'Tab';
                    bind.unitKey = 'Tab'; 
                    bind.keyDisplay.playKey('Tab'+"-S");
                }else if(bind.unitName === "Attack"){
                    this.scene.bindSettings.shiftBind = 'ShiftLeft';
                    bind.unitKey = 'ShiftLeft'; 
                    bind.keyDisplay.playKey('ShiftLeft'+"-S");
                }
                
            });

        let tempObject = {
            titleLogoType: this.scene.titleLogoType,
            bindSettings:{
            keyABind:this.scene.bindSettings.keyABind,
            keyWBind:this.scene.bindSettings.keyWBind,
            keyDBind:this.scene.bindSettings.keyDBind,
            keySBind:this.scene.bindSettings.keySBind,
            keyTABBind:this.scene.bindSettings.keyTABBind,
            spaceBind:this.scene.bindSettings.spaceBind,
            shiftBind:this.scene.bindSettings.shiftBind,
            healBind:"KeyH",
            specialBind:"KeyF",
            blockBind:"KeyR"
            }

            };

        this.scene.secretSave(tempObject);
        
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
        
        this.unitKey = unitKey;
        this.keyDisplay = new keyPrompts(scene,-70,0);
        this.keyDisplay.setScale(1);
        this.add(this.keyDisplay);
        this.keyDisplay.playKey(unitKey+"-S");

        //add option menu elements and buttons
        this.unitName = unitName;
        this.title = new makeText(scene,0,25,'charBubble',unitName);
        this.title.addHitboxBinds();
        this.add(this.title);

        this.title.on('pointerover',function(pointer){
            if(this.menu.activelySelecting === false && this.isSelected === false){
                this.scene.initSoundEffect('buttonSFX','1',0.05);
                this.title.setTextTint(0xff7a7a);
                this.keyDisplay.playKey(this.unitKey);
            }
        },this);

        this.title.on('pointerout',function(pointer){
            if(this.menu.activelySelecting === false && this.isSelected === false){
                this.title.clearTextTint();
                this.keyDisplay.playKey(this.unitKey+"-S");
            }
        },this);

        this.title.on('pointerdown', function (pointer) {

            

            if(this.menu.activelySelecting === false && this.isSelected === false){
                this.menu.activelySelecting = true;
                this.isSelected = true;
                this.title.setTextTint(0xff7a7a);
                this.keyDisplay.playKey(this.unitKey+"-S");
                this.keyDisplay.setTint(0xff7a7a);
                this.scene.initSoundEffect('buttonSFX','2',0.05);
            }else if(this.menu.activelySelecting === true && this.isSelected === true){
                this.menu.activelySelecting = false;
                this.isSelected = false;
                this.title.clearTextTint();
                this.keyDisplay.playKey(this.unitKey);
                this.keyDisplay.clearTint();
                this.scene.initSoundEffect('buttonSFX','2',0.05);
            } 
            
            

        },this);

       
        
    }

    updateUnitKey(newKey){
        this.unitKey = newKey; 
        this.keyDisplay.playKey(newKey +'-S'); 
        this.menu.activelySelecting = false;
        this.isSelected = false;
        this.title.clearTextTint();

        this.scene.initSoundEffect('buttonSFX','2',0.05);

        if(this.unitName === "Interact"){
            this.scene.bindSettings.keyWBind = newKey;
        }else if(this.unitName === "Move Left"){
            this.scene.bindSettings.keyABind = newKey;
        }else if(this.unitName === "Move Right"){
            this.scene.bindSettings.keyDBind = newKey;
        }else if(this.unitName === "Move Down"){
            this.scene.bindSettings.keySBind = newKey;
        }else if(this.unitName === "Jump"){
            this.scene.bindSettings.spaceBind = newKey;
        }else if(this.unitName === "Inventory"){
            this.scene.bindSettings.keyTABBind = newKey;
        }else if(this.unitName === "Attack"){
            this.scene.bindSettings.shiftBind = newKey;
        }

        let tempObject = {
            titleLogoType: this.scene.titleLogoType,
            bindSettings:{
            keyABind:this.scene.bindSettings.keyABind,
            keyWBind:this.scene.bindSettings.keyWBind,
            keyDBind:this.scene.bindSettings.keyDBind,
            keySBind:this.scene.bindSettings.keySBind,
            keyTABBind:this.scene.bindSettings.keyTABBind,
            spaceBind:this.scene.bindSettings.spaceBind,
            shiftBind:this.scene.bindSettings.shiftBind,
            healBind:"KeyH",
            specialBind:"KeyF",
            blockBind:"KeyR"
            }

        };

        this.scene.secretSave(tempObject);

        this.menu.setKeysInUse();
    }

 
    
    

}