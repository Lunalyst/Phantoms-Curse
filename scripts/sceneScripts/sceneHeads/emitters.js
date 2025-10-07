

//timer function to test runtime of 
let startTime;
let endTime;
let storedLabel;

//const variables for textbox entities.
const lineLength = 24;
const textEnd = 75;

const musicDampen = 0.15;
const ambienceDampen = 0.15;

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
const healthEvent = {
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
    toggleForStruggle:'toggle_for_Struggle',

    forcedScheduling: 'forced_scheduling'
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
    debugSceneRef: 'debug_scene_ref',
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
    updateInternalView: 'update_internal_view',
    playGameSaved: 'play_game_saved',
    playCustomMessage: 'play_custom_message',
    isItemInInventory: 'is_item_in_inventory',
    setUpBuyArray: 'set_up_buy_array',
    destroyBuyArray: 'destroy_buy_array',
    reduceItemAmount: 'reduce_item_amount',
    getCurrency:'get_currency',
    changeCurrency: 'change_currency',
    displayCurrency:'display_currency',



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
    empty_chest: {
        itemID: 0,
        itemName: '',
        itemDescription: '',
        itemStackable: 0,
        itemAmount: 0,
        itemType: "",
        sellValue: 0
    },

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
        itemName: 'CARROT RING',
        itemDescription: '1.2X MOVEMENT SPEED, BUT MAKES SOME CURSED HUNGRY',
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
    },
    
    obtained_lantern:{
        itemID: 21,
        itemName: 'LANTURN',
        itemDescription: 'PROVIDES LIGHT IF FUEL IS EQUIPT. TAKES UP RING SLOT.',
        itemStackable: 0,
        itemAmount: 1,
        itemType: "ring",
        sellValue: 40
    }
    
    };

//each catigory for the bestiary groupings.
const Groupings = [
"blueSlime",
"tiger",
"rabbit",
"bee",
"bat",
"mimic",
"whiteCat",
"shadow",
"istara",
"vivian"
];
//process to convert bestiary entries.
/*
- in emitters change the bestiary flag in bestiaryTextList here to reflect new values
complete

-change bestiary animations to properly reflect new flag values

- in gameovermanager.js Replace function names for enemy setup and update loop to reflect new name in gameover scripts
complete

-in npc dialogue change the gameover flag to refrence the same string using bestiaryKey.blueSlimeTF
complete

- in driemviewer level replace the dream viewer flag to check the new one based on bestiaryKey.blueSlimeTF object
complete

- in enemy.js change value in enemy -> this.scene.enemyThatDefeatedPlayer to = new key below
complete


testing enemys
check bestiary book for flag
check gameover is using correct flag
check gameover dialogue
check dream viewer for all enemy spawns
check enemy to see if it gives the right flags.

afterward, we need to create a variable in the save file, validate. its a int that is defined as 0.
if this values is undefined, then add it and wipe bestiary data,

also sort bestiaryTextList to reflect group
*/

const bestiaryKey = {

  blueSlimeTF:"blueSlime_tf",
  blueSlimeLargeTF:"blueSlime_large_tf",
  blueSlimeHSVore:"blueSlime_hs_vore",
  blueSlimeMaleHMVore:"blueSlime_male_hm_vore",
  blueSlimeFemaleHMVore:"blueSlime_female_hm_vore",

  tigerMaleTF:"tiger_male_tf",
  tigerFemaleTF:"tiger_female_tf",
  tigerMaleVore:"tiger_male_vore",
  tigerFemaleVore:"tiger_female_vore",
  
  rabbitMaleTF:"rabbit_male_tf",
  rabbitFemaleTF:"rabbit_female_tf",
  rabbitMaleVore:"rabbit_male_vore",
  rabbitFemaleVore:"rabbit_female_vore",

  beeDroneMaleTF:"bee_drone_male_tf",
  beeDroneFemaleTF:"bee_drone_female_tf",

  batMaleTF:"bat_male_tf",
  batFemaleTF:"bat_female_tf",  
  batMaleVore:"bat_male_vore",
  batFemaleVore:"bat_female_vore",  

  mimicMaleTF:"mimic_male_tf",
  mimicFemaleTF:"mimic_female_tf",
  mimicMaleVore:"mimic_male_vore",
  mimicFemaleVore:"mimic_female_vore",

  whiteCatMaleTF:"whiteCat_male_tf",
  whiteCatFemaleTF:"whiteCat_female_tf",
  whiteCatMaleVore:"whiteCat_male_vore",
  whiteCatFemaleVore:"whiteCat_female_vore",
    
  shadowCurse:"shadow_curse_vore",
  shadowEarie:"shadow_earie_tf",

  mushroomFemaleTF:"mushroom_female_tf",
  mushroomMaleTF:"mushroom_male_tf",

  istaraUnbirth:"istara_unbirth",

  vivianTF:"vivian_tf",
  vivianVore1:"vivian_vore_1",
  vivianVore2:"vivian_vore_2",
 
}

//bestiary keys and flags. 
const bestiaryTextList = {
      blueSlime_tf: {
        title: "BLUE SLIME",
        summary: "This small slime is the most common of slime types. It has basic instincts and will blindly jump towards prey. This slime is mostly made of water and can be found in most places. Since their whole body is a sensory organ, they are particularly weak to blunt damage.",
      },
      blueSlime_large_tf: {
        title: "BLUE SLIME LARGE",
        summary: "This slime acts very similar to its smaller counterpart. However, this slime is much larger and more dangerous. It is able to dissolve prey at a faster rate.",
      },
      blueSlime_hs_vore: {
        title: "BLUE SLIME HUMANOID",
        summary: "These variations of the blue slime take the appearance of a person, as best they can with the mass they have. More aggressive than their regular counterparts. These slimes seek humanoids to absorb so that they can grow their mass and shape.",
      },
      blueSlime_female_hm_vore: {
        title: "BLUE SLIME FEMALE",
        summary: "After growing to its second stage, it takes on a feminine appearance based on the largest thing it absorbed. With its new female form, it is not as ravenous and prefers to play with its food. If this slime grows large enough it can produce smaller slimes to spread their curse.",
      },
      blueSlime_male_hm_vore: {
        title: "BLUE SLIME MALE",
        summary: "After growing to its second stage, it takes on a masculine appearance based on the largest thing it absorbed. With its new male form, it is able to use its slime phallus to consume more prey. While it does not exclusively do this, it seems to prefer this form of ingestion.",
      },
      tiger_female_tf: {
        title: "FED FEMALE TIGER",
        summary: "Once the tiger has had a good meal, this voracious predator seeks out humans to curse. Once this predator curses an unsuspecting human, she will look over them as her new cub.",
      },
      tiger_female_vore: {
        title: "FEMALE TIGER",
        summary: "This large carnivore is an ambush predator. Opting to hide until it spots prey before chasing them down and devouring them whole. However, it is more docile if it has already fed on something.",
      },
      tiger_male_tf: {
        title: "FED MALE TIGER",
        summary: "After finding a filling meal, this tiger becomes incredibly horny. Seeking to penetrate humans and release large amounts of their seed into them. The newly formed curse is likely to grow big from the extra nourishment after the cursing process.",
      },
      tiger_male_vore: {
        title: "MALE TIGER",
        summary: "This hungry predator often lies in wait to surprise prey. After their prey has been weakened it will swallow them whole. Some tough prey might be able to struggle free, but weaker prey are likely to end up as padding for this strong carnivore.",
      },
      rabbit_female_tf: {
        title: "FEMALE RABBIT",
        summary: "This herbivore can be found in places where carrots grow. Able to jump decently high, the females of this group often tackle their victims and hump them to apply their curse.",
      },
      rabbit_female_vore: {
        title: "FED FEMALE RABBIT",
        summary: "Overcome by hunger, this rabbit consumed the body of another. Causing its body to grow and change slightly. It now enjoys squishing smaller rabbits between her breasts.",
      },
      rabbit_male_tf: {
        title: "MALE RABBIT",
        summary: "This herbivore can be found in places where carrots grow. Able to jump decently high, the males of this group use penetration as their main means of applying their curse.",
      },
      rabbit_male_vore: {
        title: "FED MALE RABBIT",
        summary: "Overcome by hunger, this rabbit consumed the body of another. Causing its body to grow and change slightly. It now dominates smaller rabbits with its newfound strength.",
      },
      bee_drone_female_tf: {
        title: "FEMALE BEE DRONE",
        summary: "Often these bees will swarm a human who is not cursed. However, they are unable to pass on their curse directly, instead using their abdomen to capture humans to bring back to their nest...",
      },
      bee_drone_male_tf: {
        title: "MALE BEE DRONE",
        summary: "This large insect often spends its time collecting pollen in places with large amounts of flowers. However, this insect will quickly devour an unsuspecting human with its massive abdomens.",
      },
      bat_female_tf: {
        title: "FEMALE BAT FED",
        summary: "These bats are very voracious, often eating prey and other predators. Resulting in periods of time when the bat is unable to fly until it loses weight. That being said, it's happy to transform others by pleasuring them. often subduing targets using its engorged butt.",
      },
      bat_male_tf: {
        title: "MALE BAT FED",
        summary: "After the bat's hunger is satisfied, it seeks out others to transform. Knocking down its target, so it has ample opportunity to subdue them. The target, now trapped under the pudgy weight of the bat, is forced to pleasure the bat with there mouth, as the bat pleasures them.",
      },
      bat_female_vore: {
        title: "FEMALE BAT",
        summary: "If they are spooked while sleeping, this nocturnal predator will chase down whatever is spooked and try to devour them with its rear end. These voracious bats are quick to digest their prey in this state, adding them to their pudge.",
      },
      bat_male_vore: {
        title: "MALE BAT",
        summary: "Lurking in caves, this monster sleeps during the day. Wandering humans should try to be quiet around this monster, as waking them is not advised unless they wish to be turned into pudge.",
      },
      mimic_female_tf: {
        title: "CHEST MIMIC FEMALE",
        summary: "Lurking inside chests, these slugs use containers as homes that double as a trap to ambush prey. When prey is near, they are known to get impatient and peek out of their home if it gets too quiet.",
      },
      mimic_female_vore: {
        title: "CHEST MIMIC FEMALE LARGE",
        summary: "A slightly large mimic after she has devoured some prey. They often enjoy coveting items that their prey had. If defeated they may drop an item, though it might be infused with their curse...",
      },
      mimic_male_tf: {
        title: "CHEST MIMIC MALE",
        summary: "These gastropods are ambush predators. However, their prey is not just for sustenance, as those cursed by this monster become assimilated into the creatures' mass. Eventually budding off the original when a new home is found.",
      },
      mimic_male_vore: {
        title: "CHEST MIMIC MALE LARGE",
        summary: "The mimics curse was created from the desires of avarice. Because of this they covet the items of their prey, as well as the new mass their prey becomes after digestion.",
      },
      istara_unbirth: {
        title: "ISTARA",
        summary: "A friendly cobra dragon named istara happens to be making her residence in one of the many caves on this island. Currently she is looking to expand her hoard of plushies and cobrabolds.",
      },
      whiteCat_female_tf: {
        title: "WHITE CAT FEMALE",
        summary: "Those who come in contact with this cat's cursed hearts will be infatuated and compelled to make out with the cat who created the cursed heart. It's as if the desires of the cat are being imprinted onto its targeted creature. You're a silly little girl kisser, aren't you?",
      },
      whiteCat_female_vore: {
        title: "CHUBBY CAT FEMALE",
        summary: "Once its prey has been completely swallowed, it loves rubbing its engorged tummy until its prey is nothing more than belly fat. You like being a girl belly fat, don't you? :3",
      },
      whiteCat_male_tf: {
        title: "WHITE CAT MALE",
        summary: "This kitty can build up cursed energy which it can release in its roar forming cursed heart. The heart produced by this roar will slowly track creatures it finds suitable to kiss and transform. You're a silly little boy kisser, aren't you?",
      },
      whiteCat_male_vore: {
        title: "CHUBBY CAT MALE",
        summary: "When a cat becomes frustrated with a creature it's trying to curse, it will get fed up and attempt to consume the creature. Using its powerful paws to knock its prey down. You like being boy belly fat, don't you? :3",
      },
      shadow_curse_vore: {
        title: "STRANGE SHADOW",
        summary: "This strange enemy lurks in caves consumed by dense shadow. Sucking unsuspecting prey into its body, where it absorbs them for an unknown purpose...",
      },
      shadow_earie_tf:{
        title: "",
        summary: "Where the water flows and the roots creep, the seals keep me prisoner in the deep. Come find me, come set me free, so you can become a part of me...",
      },
      vivian_tf: {
        title: "VIVIAN",
        summary: "A cute, yet devious wolf girl merchant. By marking a medium-sized container with her symbol, she can travel between them, which she often uses to trick her future meals. While she isn't too fond of humans, she sure enjoys eating and occasionally cursing them.",
      },
      vivian_vore_1: {
        title: "FULL VIVIAN",
        summary: "Vivian loves wearing her prey's clothing, and stretches it over her new body size. Somehow the clothes never rip, and she has a vast collection of clothing from previous meals. All magically made to fit Vivian.",
      },
      vivian_vore_2: {
        title: "VIVIAN'S CODE",
        summary: "Vivian has a network of chests she can travel through to provide her services and catch prey. If you don't want to be eaten, then you should knock on one of her marked chests twice. No more, no less.",
      },
      mushroom_female_tf:{
        title: "FEMALE MUSHROOM NODE",
        summary: " a female mushroom branch",
      },
      mushroom_male_tf:{
        title: "MALE MUSHROOM NODE",
        summary: " a male mushroom branch",
      },

      back: {
        title: "BESTIARY INFO",
        summary: "This book can record information about enemies you have encountered. When you are defeated by them, you can find a new entry about that enemy here. Enemies have elemental weaknesses which are displayed in their stats section."
      }
    };





