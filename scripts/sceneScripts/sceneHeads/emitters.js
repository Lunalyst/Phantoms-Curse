

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

//make format consistant for all bestiary keys
//species - sex - trait - vore/tf
const bestiaryKey = {
    blueSlimeTF:"blueSlime-tf",
    blueSlimeLargeTF:"blueSlime-large-tf",
    blueSlimeHSVore:"blueSlime-hs-vore",
    blueSlimeMaleHMVore:"blueSlime-male-hm-vore",
    blueSlimeFemaleHMVore:"blueSlime-female-hm-vore",

    tigerMaleVore:"tiger-male-vore",
    tigerFemaleVore:"tiger-female-vore",
    tigerMaleTF:"tiger-male-tf",
    tigerFemaleTF:"tiger-female-tf",

    rabbitMaleTF:"rabbit-male-tf",
    rabbitFemaleTF:"rabbit-female-tf",
    rabbitMaleVore:"rabbit-male-vore",
    rabbitFemaleVore:"rabbit-female-vore",

    beeDroneMaleTF:"beeDrone-male-tf",
    beeDroneFemaleTF:"beeDrone-female-tf",

    batMaleVore:"bat-male-vore",
    batFemaleVore:"bat-female-vore",

    mimicMaleTF:"mimic-male-tf",
    mimicFemaleTF:"mimic-female-tf",
    mimicMaleVore:"mimic-male-vore",
    mimicFemaleVore:"mimic-female-vore",

    whiteCatMaleTF:"whiteCat-male-tf",
    whiteCatFemaleTF:"whiteCat-female-tf",
    whiteCatMaleVore:"whiteCat-male-vore",
    whiteCatFemaleVore:"whiteCat-female-vore",

    curseShadowMaleVore:"whiteCat-male-vore",
    whiteCatFemaleVore:"whiteCat-female-vore",

    npcIstaraUnbirth:"npc-istara-unbirth",
    npcIstaraUnbirth:"npc-vivian-vore",

    curseShadowVore:"curseShadow-vore",
    earieShadowTF:"earieShadow-tf",
    

}

//BESTIARY DATA VARIABLE
const bestiaryTextList = {
      blueSlime: {
        title: "BLUE SLIME",
        summary: "THIS SMALL SLIME IS THE MOST COMMON OF SLIME TYPES. IT HAS BASIC INSTINCTS AND WILL BLINDLY JUMP TOWARDS PREY. THIS SLIME IS MOSTLY MADE OF WATER AND CAN BE FOUND MOST PLACES. SINCE THEIR WHOLE BODY IS A SENSORY ORGAN THEY ARE PARTICULARLY WEAK TO BLUNT DAMAGE.",
      },
      largeBlueSlime: {
        title: "BLUE SLIME LARGE",
        summary: "THIS SLIME ACTS VERY SIMILAR TO ITS SMALLER COUNTERPART. HOWEVER, THIS SLIME IS MUCH LARGER AND MORE DANGEROUS. IT IS ABLE TO DISSOLVE PREY AT A FASTER RATE.",
      },
      femaleTiger: {
        title: "FEMALE TIGER",
        summary: "THIS LARGE CARNIVORE IS AN AMBUSH PREDATOR. OPTING TO HIDE UNTIL IT SPOTS PREY BEFORE CHASING THEM DOWN AND DEVOURING THEM WHOLE. HOWEVER, IT IS MORE DOCILE IF IT HAS ALREADY FED ON SOMETHING.",
      },
      femaleTigerBooba: {
        title: "FED FEMALE TIGER",
        summary: "ONCE THE TIGER HAS HAD A GOOD MEAL THIS VORACIOUS PREDATOR SEEKS OUT HUMANS TO CURSE. ONCE THIS PREDATOR CURSES AN UNSUSPECTING HUMAN, SHE WILL LOOK OVER THEM AS HER NEW CUB. ",
      },
      maleTiger: {
        title: "MALE TIGER",
        summary: "THIS HUNGRY PREDATOR OFTEN LIES IN WAIT TO SUPRISE PREY. AFTER THERE PREY HAS BEEN WEAKENED IT WILL SWALLOW THEM WHOLE. SOME TOUGH PREY MIGHT BE ABLE TO STRUGGLE FREE, BUT WEAKER PREY ARLE LIKELY TO END UP AS PADDING FOR THIS STRONG CARNIVORE. ",
      },
      maleTigerBenis: {
        title: "FED MALE TIGER",
        summary: "AFTER FINDING A FILLING MEAL THIS TIGER BECOMES INCREDABLY HORNY. SEEKING TO PENETRATE HUMANS AND RELEASE LARGE AMOUNTS OF THERE SEED INTO THEM. THE NEWLY FORMED CURSE ARE LIKELY TO GROW BIG FROM THE EXTRA NOURISHMENT AFTER THE CURSING PROCESS. ",
      },
      maleRabbit: {
        title: "MALE RABBIT",
        summary: "THIS HERBIVORE CAN BE FOUND IN PLACES WHERE CARROTS GROW. ABLE TO JUMP DECENTLY HIGH, THE MALES OF THIS GROUP USE TO PENETRATION AS THEIR MAIN MEANS OF APPLYING THEIR CURSE.  ",
      },
      femaleRabbit: {
        title: "FEMALE RABBIT",
        summary: "THIS HERBIVORE CAN BE FOUND IN PLACES WHERE CARROTS GROW. ABLE TO JUMP DECENTLY HIGH, THE FEMALES OF THIS GROUP OFTEN TACKLE THEIR VICTIMS AND HUMP THEM TO APPLY THEIR CURSE. ",
      },
      maleBeeDrone: {
        title: "MALE BEE DRONE",
        summary: "THIS LARGE INSECT OFTEN SPENDS ITS TIME COLLECTING POLLEN IN PLACES WITH LARGE AMOUNTS OF FLOWERS. HOWEVER, THIS INSECT WILL QUICKLY DEVOUR AN UNSUSPECTING HUMAN WITH THEIR MASSIVE ABDOMENS.",
      },
      femaleBeeDrone: {
        title: "FEMALE BEE DRONE",
        summary: "OFTEN THESE BEES WILL SWARM A HUMAN WHO IS NOT CURSED. HOWEVER, THEY ARE UNABLE TO PASS ON THEIR CURSE DIRECTLY, INSTEAD USING THEIR ABDOMEN TO CAPTURE HUMANS TO BRING BACK TO THEIR NEST... ",
      },
      maleBat: {
        title: "MALE BAT",
        summary: "LURKING IN CAVES, THIS MONSTER SLEEPS DURING THE DAY. WANDERING HUMANS SHOULD TRY TO BE QUIET AROUND THIS MONSTER, AS WAKING THEM IS NOT ADVISED UNLESS THEY WISH TO BE TURNED INTO PUDGE. ",
      },
      femaleBat: {
        title: "FEMALE BAT",
        summary: "IF THEY ARE SPOOKED WHILE SLEEPING THIS NOCTURNAL PREDATOR WILL CHASE DOWN WHAT EVER SPOOKED IT AND TRY TO DEVOUR THEM WITH THEIR REAR END. THESE VORACIOUS BATS ARE QUICK TO DIGEST THEIR PREY IN THIS STATE, ADDING THEM TO THEIR PUDGE. ",
      },
      blueSlimeHS: {
        title: "BLUE SLIME HUMANOID",
        summary: "THESE VARIATIONS OF THE BLUE SLIME TAKE THE APPEARANCE OF A PERSON, AS BEST THEY CAN WITH THE MASS THEY HAVE. MORE AGGRESSIVE THAN THEIR REGULAR COUNTERPART. THESE SLIMES SEEK HUMANOIDS TO ABSORB SO THAT THEY CAN GROW THEIR MASS AND SHAPE.",
      },
      blueSlimeMaleHM: {
        title: "BLUE SLIME MALE",
        summary: "AFTER GROWING TO ITS SECOND STAGE, IT TAKES ON A MASCULINE APPEARANCE BASED ON THE LARGEST THING IT ABSORBED. WITH ITS NEW MALE FORM, IT IS ABLE TO USE ITS SLIME PHALLUS TO CONSUME MORE PREY. WHILE IT DOES NOT EXCLUSIVELY DO THIS, IT SEEMS TO PREFER THIS FORM OF INGESTION.",
      },
      blueSlimeFemaleHM: {
        title: "BLUE SLIME FEMALE",
        summary: "AFTER GROWING TO ITS SECOND STAGE, IT TAKES ON A FEMININE APPEARANCE BASED ON THE LARGEST THING IT ABSORBED. WITH ITS NEW FEMALE FORM, IT IS NOT AS RAVENOUS AND PREFERS TO PLAY WITH ITS FOOD. IF THIS SLIME GROWS LARGE ENOUGH IT CAN PRODUCE SMALLER SLIMES TO SPREAD THEIR CURSE.",
      },
      femaleChestMimic: {
        title: "CHEST MIMIC FEMALE",
        summary: "LURKING INSIDE CHESTS, THESE SLUGS USE CONTAINERS AS HOMES THAT DOUBLE AS A TRAP TO AMBUSH PREY. WHEN PREY IS NEAR, THEY ARE KNOW TO GET IMPATIENT AND PEEK OUT OF THEIR HOME IF IT GETS TOO QUIET. ",
      },
      femaleChestMimicVore: {
        title: "CHEST MIMIC FEMALE LARGE",
        summary: "A SLIGHTLY LARGE MIMIC AFTER SHE HAS DEVOURED SOME PREY. THEY OFTEN ENJOY COVETING ITEMS THAT THEIR PREY HAD. IF DEFEATED THEY MAY DROP AN ITEM, THOUGH IT MIGHT BE INFUSED WITH THEIR CURSE...",
      },
      maleChestMimic: {
        title: "CHEST MIMIC MALE",
        summary: "THESE GASTROPODS ARE AMBUSH PREDATORS. HOWEVER, THEIR PREY IS NOT JUST FOR SUSTENANCE, AS THOSE CURSED BY THIS MONSTER BECOME ASSIMILATED INTO THE CREATURES MASS. EVENTUALLY BUDDING OFF THE ORIGINAL WHEN A NEW HOME IS FOUND.",
      },
      maleChestMimicVore: {
        title: "CHEST MIMIC MALE LARGE",
        summary: "THE MIMICS CURSE WAS CREATED FROM THE DESIRES OF AVARICE. BECAUSE OF THIS THEY COVET THE ITEMS OF THEIR PREY, AS WELL AS THE NEW MASS THEIR PREY BECOMES AFTER DIGESTION.",
      },
      istaraUnbirth: {
        title: "ISTARA",
        summary: "A FRIENDLY COBRA DRAGON NAMED ISTARA, HAPPENS TO BE MAKING HER RESIDENCE IN ONE OF THE MANY CAVES ON THIS ISLAND. CURRENTLY SHE IS LOOKING TO EXPAND HER HOARD OF PLUSHIES AND COBRABOLDS. ",
      },
      whiteCatMaleTF: {
        title: "WHITE CAT MALE",
        summary: "THIS KITTY CAN BUILD UP CURSED ENERGY WHICH IT CAN RELEASE IN ITS ROAR FORMING CURSED HEART. THE HEART PRODUCED BY THIS ROAR WILL SLOWLY TRACK CREATURES IT FINDS SUITABLE TO KISS AND TRANSFORM. YOU`RE A SILLY LITTLE BOY KISSER AREN`T YOU? ",
      },
      whiteCatFemaleTF: {
        title: "WHITE CAT FEMALE",
        summary: "THOSE WHO COME IN CONTACT WITH THIS CATS CURSED HEARTS WILL BE INFATUATED AND COMPELLED TO MAKE OUT WITH THE CAT WHO CREATED THE CURSED HEART. IT`S AS IF THE DESIRES OF THE CAT ARE BEING IMPRINTED ONTO ITS TARGETED CREATURE. YOU`RE A SILLY LITTLE GIRL KISSER AREN`T YOU?",
      },
      whiteCatMaleVore: {
        title: "CHUBBY CAT MALE",
        summary: "WHEN A CAT BECOMES FRUSTRATED WITH A CREATURE IT`S TRYING TO CURSE, IT WILL GET FED UP AND ATTEMPT TO CONSUME THE CREATURE. USING ITS POWERFUL PAWS TO KNOCK ITS PREY DOWN. YOU LIKE BEING BOY BELLY FAT DON`T YOU? :3",
      },
      whiteCatFemaleVore: {
        title: "CHUBBY CAT FEMALE",
        summary: "ONCE ITS PREY HAS BEEN COMPLETELY SWALLOWED, IT LOVES RUBBING ITS ENGORGED TUMMY UNTIL ITS PREY IS NOTHING MORE THAN BELLY FAT. YOU LIKE BEING GIRL BELLY FAT DON`T YOU? :3 ",
      },
      curseShadow: {
        title: "STRANGE SHADOW",
        summary: "THIS STRANGE ENEMY, LURKS IN CAVES CONSUMED BY DENSE SHADOW. SUCKING UNSUSPECTING PREY INTO ITS BODY, WHERE IT ABSORBS THEM FOR A UNKNOWN PURPOSE...",
      },
      earieShadow:{
        title: "",
        summary: "WHERE THE WATER FLOWS AND THE ROOTS CREEP, THE SEELS KEEP ME PRISONER IN THE DEEP. COME FIND ME,COME SET ME FREE, SO YOU CAN BECOME APART OF ME...",
      },
      maleRabbitVore: {
        title: "FED MALE RABBIT",
        summary: "OVERCOME BY HUNGER THIS RABBIT CONSUMED THE BODY OF ANOTHER. CAUSING ITS BODY TO GROW AND CHANGE SLIGHTLY. IT NOW DOMINATES SMALLER RABBITS WITH ITS NEW FOUND STRENGTH. ",
      },
      femaleRabbitVore: {
        title: "FED FEMALE RABBIT",
        summary: "OVERCOME BY HUNGER THIS RABBIT CONSUMED THE BODY OF ANOTHER. CAUSING ITS BODY TO GROW AND CHANGE SLIGHTLY. IT NOW ENJOYS SQUISHING SMALLER RABBITS BETWEEN HER BREASTS. ",
      },
      vivianVore: {
        title: "FULL VIVIAN",
        summary: "VIVIAN LOVES WEARING HER PREYS CLOTHING, AND STRECHES IT OVER HER NEW BODYSIZE. SOMEHOW THE CLOTHS NEVER RIP, AND SHE HAS A VAST COLLECTION OF CLOTHING FROM PREVIOUS MEALS. ALL MAGICALLY MADE TO FIT VIVIAN. ",
      },

      back: {
        title: "BESTIARY INFO",
        summary: "THIS BOOK CAN RECORD INFORMATION ABOUT ENEMIES YOU HAVE ENCOUNTERED. WHEN YOU ARE DEFEATED BY THEM, YOU CAN FIND A NEW ENTRY ABOUT THAT ENEMY HERE. ENEMIES HAVE ELEMENTAL WEAKNESSES WHICH ARE DISPLAYED IN THEIR STATS SECTION."
      }
    };




