// here are the event emmiter definitions and key definitions

healthEvent = {
    loseHealth: 'lose_health',
    gainHealth: 'gain_health',
    returnHealth: 'return_health',
    maxHealth:'max_health',
    upgradeHealth:'upgrade_Health'
};

healthEmitter = new Phaser.Events.EventEmitter();

struggleEvent = {
    activateStruggleBar: 'activate_struggle_bar',
    updateStruggleBar: 'update_struggle_bar',
    updateStruggleBarCap: 'update_struggle_bar_cap'
};

struggleEmitter = new Phaser.Events.EventEmitter();

controlKeyEvent = {
    activateWKey: 'activate_w_key',
    activateAKey: 'activate_a_key',
    activateSKey: 'activate_s_key',
    activateDKey: 'activate_d_key',
    activateSpaceKey: 'activate_space_key',
    activateATKKey: 'activate_atk_key',

    activateSkipIndicatorKey: 'activate_skip_indicator_key',
    activateGiveUpIndicatorKey: 'activate_give_up_indicator_key',
    activateInventoryIndicatorKey: 'activate_inventory_indicator_key',

    justDownWKey: 'just_down_w_key',
    justDownAKey: 'just_down_a_key',
    justDownSKey: 'just_down_s_key',
    justDownDKey: 'just_down_d_key',
    justDownSpaceKey:'just_down_space_key',
    justDownATKKey: 'just_down_atk_key',

    toggleForTextBox:'toggle_for_text_box',
    toggleForStruggle:'toggle_for_Struggle'
};

controlKeyEmitter = new Phaser.Events.EventEmitter();

SceneTransitionLoad = {
    loadValues: 'load_values',
    reloadGame: 'reload_game',
};

loadSceneTransitionLoad = new Phaser.Events.EventEmitter();

tabKey = {
    isTabDown: 'tab_is_down',
};

accessTabKey = new Phaser.Events.EventEmitter();

inventoryKey = {
    activateWindow: 'activate_window',
    activateStorage: 'activate_storage',
    activateShop: 'activate_shop',
    activateWindowWithContainer: 'activate_window_with_container',
    isWindowOpen: 'is_window_open',
    getSaveSlot: 'get_save_slot',
    getCurrentData: 'get_current_data',
    getInventory:'get_inventory',
    setLocation:'set_location',
    isInventoryOpen: 'is_inventory_open',
    addItem: 'add_item',
    addContainerFlag: 'add_container_flag',
    checkContainerFlag: 'check_container_flag',
    checkBestiaryFlag: 'check_bestiary_flag',
    updateOnomat: 'update_onomat',
    playGameSaved: 'play_game_saved'
};

inventoryKeyEmitter = new Phaser.Events.EventEmitter();

playerSkills = {
    getJump: 'get_jump',
};

playerSkillsEmitter = new Phaser.Events.EventEmitter();

playerSaveSlot = {
    getSaveSlot: 'get_save_slot',
};

playerSaveSlotEmitter = new Phaser.Events.EventEmitter();

skipIndicator = {
    activateSkipIndicator: 'activate_skip_indicator',
};

skipIndicatorEmitter = new Phaser.Events.EventEmitter();

giveUpIndicator = {
    activateGiveUpIndicator: 'activate_Give_Up_indicator',
    deactivateGiveUpIndicator: 'deactivate_Give_Up_indicator'
};

giveUpIndicatorEmitter = new Phaser.Events.EventEmitter();


hudDepth = {
    toTop: 'to_top'
};

hudDepthEmitter = new Phaser.Events.EventEmitter();




