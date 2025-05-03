

//timer function to test runtime of 
let startTime;
let endTime;
let storedLabel;

//const variables for textbox entities.
const lineLength = 24;
const textEnd = 75;

//simple time tester functions.
function startTimeTest(label){
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
    console.log("starting time test for "+label);
    storedLabel = label;
    startTime = performance.now();
}

function endTimeTest(){
    endTime = performance.now();
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
    console.log("ending time test for"+storedLabel);
    console.log(`Execution time: ${endTime - startTime} milliseconds`);
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
}

// here are the event emmiter definitions and key definitions
healthEvent = {
    loseHealth: 'lose_health',
    gainHealth: 'gain_health',
    returnHealth: 'return_health',
    maxHealth:'max_health',
    upgradeHealth:'upgrade_Health',
    reduceCurse:'reduce_curse',
    curseBuildUp:'curse_build_up',
    maxCurse:'max_curse',
    clearCurse:'clear_curse',

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
    makeStorage: 'make_storage',
    destroyStorage: 'destroy_storage',
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
    playGameSaved: 'play_game_saved',
    playCustomMessage: 'play_custom_message',
    isItemInInventory: 'is_item_in_inventory',
    setUpBuyArray: 'set_up_buy_array',
    destroyBuyArray: 'destroy_buy_array',
    reduceItemAmount: 'reduce_item_amount'

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

//ultimate object key for one time drops. key is the flag
//uses as a easy way to set the onetime object in levels as well as special enemy drops
//but main use is a conviernient place to acess the item data for buyback shop functionality.
const oneTimeItemArray = {
    cave_tutorial_chest_with_oar: {
        itemID: 2,
        itemName: 'OAR',
        itemDescription: 'A WOOD PADDLE WHICH CAN BE USED AS A CLUB.',
        itemStackable: 0,
        itemAmount: 1,
        itemType: "weapon",
        sellValue: 5
    },

    cave_chest_with_axe: axe = {
        itemID: 10,
        itemName: 'AXE',
        itemDescription: 'CAN BE USED TO CUT MONSTERS AND WOOD.',
        itemStackable: 0,
        itemAmount: 1,
        itemType: "weapon",
        sellValue: 20
    },

    cave_chest_with_knife: {
        itemID: 4,
        itemName: 'KNIFE',
        itemDescription: 'GOOD FOR SLASHING MONSTERS.',
        itemStackable: 0,
        itemAmount: 1,
        itemType: "weapon",
        sellValue: 15
      }, 

    cave_chest_with_speedRing: {
        itemID: 8,
        itemName: 'SPEED RING',
        itemDescription: 'INCREASES YOUR MOVEMENT SPEED SLIGHTLY.',
        itemStackable: 0,
        itemAmount: 1,
        itemType: "ring",
        sellValue: 30
      },

    cave_chest_with_rapier: {
        itemID: 1,
        itemName: 'RAPIER',
        itemDescription: 'GOOD AT POKING HOLES IN THINGS.',
        itemStackable: 0,
        itemAmount: 1,
        itemType: "weapon",
        sellValue: 35
        
      },

    obtained_mimic_ring:{
        itemID: 6,
        itemName: 'MIMIC RING',
        itemDescription: 'COVETED BY THOSE CURSED BY AVARICE...',
        itemStackable: 0,
        itemAmount: 1,
        itemType: "ring",
        sellValue: 50
    },

    obtained_mimic_rapier: {
        itemID: 3,
        itemName: 'MIMIC RAPIER',
        itemDescription: 'INFUSED WITH THE CURSED ENERGY OF AVARICE...',
        itemStackable: 0,
        itemAmount: 1,
        itemType: "weapon",
        sellValue: 75
    }
    
    };




