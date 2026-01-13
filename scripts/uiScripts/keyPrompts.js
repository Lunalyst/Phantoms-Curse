class keyPrompts extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, xPos, yPos){
        //super() calls the constructor() from the parent class we are extending
        super(scene, xPos, yPos, 'keyPrompts');
        //then we add new instance into the scene. when ising this inside a class definition is refering to the instance of the class
        //so here in the subclass of sprite its refering to the image object we just made. 
        scene.add.existing(this);
        //sets the depth of the ui sprite so that it isnt obscured by other game sprites.
        this.anims.create({key: 'KeyA',frames: this.anims.generateFrameNames('keyPrompts', { start: 0, end: 2 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyB',frames: this.anims.generateFrameNames('keyPrompts', { start: 3, end: 5 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyC',frames: this.anims.generateFrameNames('keyPrompts', { start: 6, end: 8 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyD',frames: this.anims.generateFrameNames('keyPrompts', { start: 9, end: 11 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyE',frames: this.anims.generateFrameNames('keyPrompts', { start: 12, end: 14 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyF',frames: this.anims.generateFrameNames('keyPrompts', { start: 15, end: 17 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyG',frames: this.anims.generateFrameNames('keyPrompts', { start: 18, end: 20 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyH',frames: this.anims.generateFrameNames('keyPrompts', { start: 21, end: 23 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyI',frames: this.anims.generateFrameNames('keyPrompts', { start: 24, end: 26 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyJ',frames: this.anims.generateFrameNames('keyPrompts', { start: 27, end: 29 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyK',frames: this.anims.generateFrameNames('keyPrompts', { start: 30, end: 32 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyL',frames: this.anims.generateFrameNames('keyPrompts', { start: 33, end: 35 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyM',frames: this.anims.generateFrameNames('keyPrompts', { start: 36, end: 38 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyN',frames: this.anims.generateFrameNames('keyPrompts', { start: 39, end: 41 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyO',frames: this.anims.generateFrameNames('keyPrompts', { start: 42, end: 44 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyP',frames: this.anims.generateFrameNames('keyPrompts', { start: 45, end: 47 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyQ',frames: this.anims.generateFrameNames('keyPrompts', { start: 48, end: 50 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyR',frames: this.anims.generateFrameNames('keyPrompts', { start: 51, end: 53 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyS',frames: this.anims.generateFrameNames('keyPrompts', { start: 54, end: 56 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyT',frames: this.anims.generateFrameNames('keyPrompts', { start: 57, end: 59 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyU',frames: this.anims.generateFrameNames('keyPrompts', { start: 60, end: 62 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyV',frames: this.anims.generateFrameNames('keyPrompts', { start: 63, end: 65 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyW',frames: this.anims.generateFrameNames('keyPrompts', { start: 66, end: 68 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyX',frames: this.anims.generateFrameNames('keyPrompts', { start: 69, end: 71 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyY',frames: this.anims.generateFrameNames('keyPrompts', { start: 72, end: 74 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyZ',frames: this.anims.generateFrameNames('keyPrompts', { start: 75, end: 77 }),frameRate: 7,repeat: -1});
        
        this.anims.create({key: 'Digit1',frames: this.anims.generateFrameNames('keyPrompts', { start: 78, end: 80 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'Digit2',frames: this.anims.generateFrameNames('keyPrompts', { start: 81, end: 83 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'Digit3',frames: this.anims.generateFrameNames('keyPrompts', { start: 84, end: 86 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'Digit4',frames: this.anims.generateFrameNames('keyPrompts', { start: 87, end: 89 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'Digit5',frames: this.anims.generateFrameNames('keyPrompts', { start: 90, end: 92 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'Digit6',frames: this.anims.generateFrameNames('keyPrompts', { start: 93, end: 95 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'Digit7',frames: this.anims.generateFrameNames('keyPrompts', { start: 96, end: 98 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'Digit8',frames: this.anims.generateFrameNames('keyPrompts', { start: 99, end: 101 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'Digit9',frames: this.anims.generateFrameNames('keyPrompts', { start: 102, end: 104 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'Digit0',frames: this.anims.generateFrameNames('keyPrompts', { start: 105, end: 107 }),frameRate: 7,repeat: -1});


        this.anims.create({key: 'NumpadMultiply',frames: this.anims.generateFrameNames('keyPrompts', { start: 108, end: 110 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'NumpadAdd',frames: this.anims.generateFrameNames('keyPrompts', { start: 111, end: 113 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'NumpadSubtract',frames: this.anims.generateFrameNames('keyPrompts', { start: 114, end: 116 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "Minus",frames: this.anims.generateFrameNames('keyPrompts', { start: 114, end: 116 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'NumpadDivide',frames: this.anims.generateFrameNames('keyPrompts', { start: 117, end: 119 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "Slash",frames: this.anims.generateFrameNames('keyPrompts', { start: 117, end: 119 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'BracketLeft',frames: this.anims.generateFrameNames('keyPrompts', { start: 120, end: 122 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'BracketRight',frames: this.anims.generateFrameNames('keyPrompts', { start: 123, end: 125 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "Backslash",frames: this.anims.generateFrameNames('keyPrompts', { start: 126, end: 128 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "Semicolon",frames: this.anims.generateFrameNames('keyPrompts', { start: 129, end: 131 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "Quote",frames: this.anims.generateFrameNames('keyPrompts', { start: 132, end: 134 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "Comma",frames: this.anims.generateFrameNames('keyPrompts', { start: 135, end: 137 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "Period",frames: this.anims.generateFrameNames('keyPrompts', { start: 138, end: 140 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "Backspace",frames: this.anims.generateFrameNames('keyPrompts', { start: 141, end: 143 }),frameRate: 7,repeat: -1});
        
        
        this.anims.create({key: "NumLock",frames: this.anims.generateFrameNames('keyPrompts', { start: 144, end: 146 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "Numpad1",frames: this.anims.generateFrameNames('keyPrompts', { start: 147, end: 149 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "Numpad2",frames: this.anims.generateFrameNames('keyPrompts', { start: 150, end: 152 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "Numpad3",frames: this.anims.generateFrameNames('keyPrompts', { start: 153, end: 155 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "Numpad4",frames: this.anims.generateFrameNames('keyPrompts', { start: 156, end: 158 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "Numpad5",frames: this.anims.generateFrameNames('keyPrompts', { start: 159, end: 161 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "Numpad6",frames: this.anims.generateFrameNames('keyPrompts', { start: 162, end: 164 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "Numpad7",frames: this.anims.generateFrameNames('keyPrompts', { start: 165, end: 167 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "Numpad8",frames: this.anims.generateFrameNames('keyPrompts', { start: 168, end: 170 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "Numpad9",frames: this.anims.generateFrameNames('keyPrompts', { start: 171, end: 173 }),frameRate: 7,repeat: -1});

        
        this.anims.create({key: "Tab",frames: this.anims.generateFrameNames('keyPrompts', { start: 174, end: 176 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "ShiftLeft",frames: this.anims.generateFrameNames('keyPrompts', { start: 177, end: 179 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "ShiftRight",frames: this.anims.generateFrameNames('keyPrompts', { start: 177, end: 179 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "ControlLeft",frames: this.anims.generateFrameNames('keyPrompts', { start: 180, end: 182 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "ControlRight",frames: this.anims.generateFrameNames('keyPrompts', { start: 180, end: 182 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "AltLeft",frames: this.anims.generateFrameNames('keyPrompts', { start: 183, end: 185 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "AltRight",frames: this.anims.generateFrameNames('keyPrompts', { start: 183, end: 185 }),frameRate: 7,repeat: -1});

        this.anims.create({key: "JMP",frames: this.anims.generateFrameNames('keyPrompts', { start: 187, end: 189 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "ATK",frames: this.anims.generateFrameNames('keyPrompts', { start: 190, end: 192 }),frameRate: 7,repeat: -1});
        
        this.anims.create({key: "Enter",frames: this.anims.generateFrameNames('keyPrompts', { start: 193, end: 195 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "NumpadEnter",frames: this.anims.generateFrameNames('keyPrompts', { start: 193, end: 195 }),frameRate: 7,repeat: -1});
        
        this.anims.create({key: "?",frames: this.anims.generateFrameNames('keyPrompts', { start: 196, end: 198 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "INVENTORY",frames: this.anims.generateFrameNames('keyPrompts', { start: 199, end: 201 }),frameRate: 7,repeat: -1});

        this.anims.create({key: "Space",frames: this.anims.generateFrameNames('keyPrompts', { start: 201, end: 203 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "Equal",frames: this.anims.generateFrameNames('keyPrompts', { start: 204, end: 206 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "Numpad0",frames: this.anims.generateFrameNames('keyPrompts', { start: 207, end: 209 }),frameRate: 7,repeat: -1});

        this.anims.create({key: "ArrowUp",frames: this.anims.generateFrameNames('keyPrompts', { start: 210, end: 212 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "ArrowDown",frames: this.anims.generateFrameNames('keyPrompts', { start: 213, end: 215 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "ArrowLeft",frames: this.anims.generateFrameNames('keyPrompts', { start: 216, end: 218 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "ArrowRight",frames: this.anims.generateFrameNames('keyPrompts', { start: 219, end: 221 }),frameRate: 7,repeat: -1});
        

        //static animations for keys.
        this.anims.create({key: 'KeyA-S',frames: this.anims.generateFrameNames('keyPrompts', { start: 0, end: 0 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyB-S',frames: this.anims.generateFrameNames('keyPrompts', { start: 3, end: 3 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyC-S',frames: this.anims.generateFrameNames('keyPrompts', { start: 6, end: 6 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyD-S',frames: this.anims.generateFrameNames('keyPrompts', { start: 9, end: 9 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyE-S',frames: this.anims.generateFrameNames('keyPrompts', { start: 12, end: 12 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyF-S',frames: this.anims.generateFrameNames('keyPrompts', { start: 15, end: 15 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyG-S',frames: this.anims.generateFrameNames('keyPrompts', { start: 18, end: 18 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyH-S',frames: this.anims.generateFrameNames('keyPrompts', { start: 21, end: 21 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyI-S',frames: this.anims.generateFrameNames('keyPrompts', { start: 24, end: 24 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyJ-S',frames: this.anims.generateFrameNames('keyPrompts', { start: 27, end: 27 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyK-S',frames: this.anims.generateFrameNames('keyPrompts', { start: 30, end: 30 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyL-S',frames: this.anims.generateFrameNames('keyPrompts', { start: 33, end: 33 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyM-S',frames: this.anims.generateFrameNames('keyPrompts', { start: 36, end: 36 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyN-S',frames: this.anims.generateFrameNames('keyPrompts', { start: 39, end: 39 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyO-S',frames: this.anims.generateFrameNames('keyPrompts', { start: 42, end: 42 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyP-S',frames: this.anims.generateFrameNames('keyPrompts', { start: 45, end: 45 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyQ-S',frames: this.anims.generateFrameNames('keyPrompts', { start: 48, end: 48 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyR-S',frames: this.anims.generateFrameNames('keyPrompts', { start: 51, end: 51 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyS-S',frames: this.anims.generateFrameNames('keyPrompts', { start: 54, end: 54 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyT-S',frames: this.anims.generateFrameNames('keyPrompts', { start: 57, end: 57 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyU-S',frames: this.anims.generateFrameNames('keyPrompts', { start: 60, end: 60 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyV-S',frames: this.anims.generateFrameNames('keyPrompts', { start: 63, end: 63 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyW-S',frames: this.anims.generateFrameNames('keyPrompts', { start: 66, end: 66 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyX-S',frames: this.anims.generateFrameNames('keyPrompts', { start: 69, end: 69 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyY-S',frames: this.anims.generateFrameNames('keyPrompts', { start: 72, end: 72 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'KeyZ-S',frames: this.anims.generateFrameNames('keyPrompts', { start: 75, end: 75 }),frameRate: 7,repeat: -1});
        
        this.anims.create({key: 'Digit1-S',frames: this.anims.generateFrameNames('keyPrompts', { start: 78, end: 78 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'Digit2-S',frames: this.anims.generateFrameNames('keyPrompts', { start: 81, end: 81 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'Digit3-S',frames: this.anims.generateFrameNames('keyPrompts', { start: 84, end: 84 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'Digit4-S',frames: this.anims.generateFrameNames('keyPrompts', { start: 87, end: 87 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'Digit5-S',frames: this.anims.generateFrameNames('keyPrompts', { start: 90, end: 90 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'Digit6-S',frames: this.anims.generateFrameNames('keyPrompts', { start: 93, end: 93 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'Digit7-S',frames: this.anims.generateFrameNames('keyPrompts', { start: 96, end: 96 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'Digit8-S',frames: this.anims.generateFrameNames('keyPrompts', { start: 99, end: 99 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'Digit9-S',frames: this.anims.generateFrameNames('keyPrompts', { start: 102, end: 102 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'Digit0-S',frames: this.anims.generateFrameNames('keyPrompts', { start: 105, end: 105 }),frameRate: 7,repeat: -1});


        this.anims.create({key: 'NumpadMultiply-S',frames: this.anims.generateFrameNames('keyPrompts', { start: 108, end: 108 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'NumpadAdd-S',frames: this.anims.generateFrameNames('keyPrompts', { start: 111, end: 111 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'NumpadSubtract-S',frames: this.anims.generateFrameNames('keyPrompts', { start: 114, end: 114 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "Minus-S",frames: this.anims.generateFrameNames('keyPrompts', { start: 114, end: 114 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'NumpadDivide-S',frames: this.anims.generateFrameNames('keyPrompts', { start: 117, end: 117 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "Slash-S",frames: this.anims.generateFrameNames('keyPrompts', { start: 117, end: 117 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'BracketLeft-S',frames: this.anims.generateFrameNames('keyPrompts', { start: 120, end: 120 }),frameRate: 7,repeat: -1});
        this.anims.create({key: 'BracketRight-S',frames: this.anims.generateFrameNames('keyPrompts', { start: 123, end: 123 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "Backslash-S",frames: this.anims.generateFrameNames('keyPrompts', { start: 126, end: 126 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "Semicolon-S",frames: this.anims.generateFrameNames('keyPrompts', { start: 129, end: 129 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "Quote-S",frames: this.anims.generateFrameNames('keyPrompts', { start: 132, end: 132 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "Comma-S",frames: this.anims.generateFrameNames('keyPrompts', { start: 135, end: 135 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "Period-S",frames: this.anims.generateFrameNames('keyPrompts', { start: 138, end: 138 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "Backspace-S",frames: this.anims.generateFrameNames('keyPrompts', { start: 141, end: 141 }),frameRate: 7,repeat: -1});
        
        
        this.anims.create({key: "NumLock-S",frames: this.anims.generateFrameNames('keyPrompts', { start: 144, end: 144 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "Numpad1-S",frames: this.anims.generateFrameNames('keyPrompts', { start: 147, end: 147 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "Numpad2-S",frames: this.anims.generateFrameNames('keyPrompts', { start: 150, end: 150 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "Numpad3-S",frames: this.anims.generateFrameNames('keyPrompts', { start: 153, end: 153 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "Numpad4-S",frames: this.anims.generateFrameNames('keyPrompts', { start: 156, end: 156 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "Numpad5-S",frames: this.anims.generateFrameNames('keyPrompts', { start: 159, end: 159 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "Numpad6-S",frames: this.anims.generateFrameNames('keyPrompts', { start: 162, end: 162 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "Numpad7-S",frames: this.anims.generateFrameNames('keyPrompts', { start: 165, end: 165 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "Numpad8-S",frames: this.anims.generateFrameNames('keyPrompts', { start: 168, end: 168 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "Numpad9-S",frames: this.anims.generateFrameNames('keyPrompts', { start: 171, end: 171 }),frameRate: 7,repeat: -1});

        
        this.anims.create({key: "Tab-S",frames: this.anims.generateFrameNames('keyPrompts', { start: 174, end: 174 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "ShiftLeft-S",frames: this.anims.generateFrameNames('keyPrompts', { start: 177, end: 177 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "ShiftRight-S",frames: this.anims.generateFrameNames('keyPrompts', { start: 177, end: 177 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "ControlLeft-S",frames: this.anims.generateFrameNames('keyPrompts', { start: 180, end: 180 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "ControlRight-S",frames: this.anims.generateFrameNames('keyPrompts', { start: 180, end: 180 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "AltLeft-S",frames: this.anims.generateFrameNames('keyPrompts', { start: 183, end: 183 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "AltRight-S",frames: this.anims.generateFrameNames('keyPrompts', { start: 183, end: 183 }),frameRate: 7,repeat: -1});
        
        this.anims.create({key: "Enter-S",frames: this.anims.generateFrameNames('keyPrompts', { start: 193, end: 193 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "NumpadEnter-S",frames: this.anims.generateFrameNames('keyPrompts', { start: 193, end: 193 }),frameRate: 7,repeat: -1});
        
        this.anims.create({key: "Space-S",frames: this.anims.generateFrameNames('keyPrompts', { start: 201, end: 201 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "Equal-S",frames: this.anims.generateFrameNames('keyPrompts', { start: 204, end: 204 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "Numpad0-S",frames: this.anims.generateFrameNames('keyPrompts', { start: 207, end: 207 }),frameRate: 7,repeat: -1});

        this.anims.create({key: "ArrowUp-S",frames: this.anims.generateFrameNames('keyPrompts', { start: 210, end: 210 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "ArrowDown-S",frames: this.anims.generateFrameNames('keyPrompts', { start: 213, end: 213 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "ArrowLeft-S",frames: this.anims.generateFrameNames('keyPrompts', { start: 216, end: 216 }),frameRate: 7,repeat: -1});
        this.anims.create({key: "ArrowRight-S",frames: this.anims.generateFrameNames('keyPrompts', { start: 219, end: 219 }),frameRate: 7,repeat: -1});
       
        //connects the sprite to the camera so that it sticks with the player.
        //this.setScrollFactor(0);
        this.setDepth(6);

        //sets scale
        this.setScale(1/3);
        let tempKey = this;

        this.scene = scene;
        


    }
    //simple function using if statements to update display using animations defined above.
    

    playAKey(){
        this.anims.play(this.scene.bindSettings.keyABind);
    }
    playSKey(){
         this.anims.play(this.scene.bindSettings.keySBind);
    }
    playDKey(){
         this.anims.play(this.scene.bindSettings.keyDBind);
    }
    playWKey(){
         this.anims.play(this.scene.bindSettings.keyWBind);
    }
    playQuestionKey(){
        this.anims.play("?");
    }

    playKey(key){
         this.anims.play(key);
    }


}