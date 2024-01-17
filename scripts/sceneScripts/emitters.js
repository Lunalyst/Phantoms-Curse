// here are the event emmiter definitions and key definitions
//these keys are use to tell 
healthEvent = {
    loseHealth: 'lose_health',
    gainHealth: 'gain_health',
    returnHealth: 'return_health',
    maxHealth:'max_health'
};

healthEmitter = new Phaser.Events.EventEmitter();




SceneTransitionLoad = {
    loadValues: 'load_values',
    
};

loadSceneTransitionLoad = new Phaser.Events.EventEmitter();

tabKey = {
    isTabDown: 'tab_is_down',
};

accessTabKey = new Phaser.Events.EventEmitter();

inventoryKey = {
    activateWindow: 'activate_window',
    activateWindowWithContainer: 'activate_window_with_container',
    isWindowOpen: 'is_window_open',
    getSaveData: 'get_save_data',
    getInventory:'get_inventory',
    isInventoryOpen: 'is_inventory_open',
    addItem: 'add_item'
};

inventoryKeyEmitter = new Phaser.Events.EventEmitter();

playerSkills = {
    getJump: 'get_jump',
};

playerSkillsEmitter = new Phaser.Events.EventEmitter();

playerSaveSlot = {
    getSaveSlot: 'get_save_slot',
};

playerSaveSlot = new Phaser.Events.EventEmitter();

skipIndicator = {
    activateSkipIndicator: 'activate_skip_indicator',
};

skipIndicatorEmitter = new Phaser.Events.EventEmitter();


hudDepth = {
    toTop: 'to_top'
};

hudDepthEmitter = new Phaser.Events.EventEmitter();



