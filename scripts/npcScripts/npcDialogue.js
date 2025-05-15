const npcDialogue = {

        "cutscenes":{
            "intro":{
                "intro1":{
                    "node1":{
                        "dialogue": "Its finally time to begin...",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":["node2"]
                    },"node2":{
                        "dialogue": "You awake in you re bed knowing that todays special...",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":["node3"]
                    },
                    "node3":{
                        "dialogue": "You re leaving home, In search of an adventure...",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":["node4"]
                    },
                    "node4":{
                        "dialogue": "You re destination, the Ruinous Rombus...",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":["node5"]
                    },
                    "node5":{
                        "dialogue": "Where many have disappeared Over the past two centuries...",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":["node6"]
                    },
                    "node6":{
                        "dialogue": "On the edges of this sea, it is calm and peaceful.",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":["node7"]
                    },
                    "node7":{
                        "dialogue": "But Towards the center a powerful Storm always seems to be brewing...",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":["node8"]
                    },
                    "node8":{
                        "dialogue": "Many believe it to be a cursed By evil spirits...",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":["node9"]
                    },
                    "node9":{
                        "dialogue": "But you believe there is something special hiding Past the malestrom... ",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":["node10"]
                    },
                    "node10":{
                        "dialogue": "something worth Risking You re life for...",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":["node11"]
                    },
                    "node11":{
                        "dialogue": "...",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":["node12"]
                    },
                    "node12":{
                        "dialogue": "...",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":[]
                    },
                }
            }
        },

        "tutorial":{
            "beach":{
                "movement":{
                    "node1":{
                        "dialogue": "Welcome to the island beyond the storm. you can progress dialogue with W button on screen.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node2"]
                    },
                    "node2":{
                        "dialogue": "to move left or right use the a or d key.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node3"]
                    },
                    "node3":{
                        "dialogue": "if something is interactable, then a Key prompt will apear below it.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":[]
                    },
                },
                "platforms":{
                    "node1":{
                        "dialogue": "some surfaces can be jumped through but not back down. so be careful.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":[]
                    },
                },
                "worldDrops":{
                    "node1":{
                        "dialogue": "sometimes items will appear on the ground, or be dropped by a monster. you can walk over these items to pick them up and add them to You re inventory. ",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node2"]
                    },
                    "node2":{
                        "dialogue": "so keep an eye out for items that glow.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":[]
                    },
                  
                },
                "warps":{
                    "node1":{
                        "dialogue": "interactable doors, and passages will lead to new places. keep an eye out for them.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":[]
                    },
                },
                "containers":{
                    "node1":{
                        "dialogue": "some interactables will give you a item.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node2"]
                    },
                    "node2":{
                        "dialogue": "you can open You re inventory with tab, or use the inventory button on the right of the screen.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node3"]
                    },
                    "node3":{
                        "dialogue": "You re inventory has equip slots which allow you to change You re equipment.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node4"]
                    },
                    "node4":{
                        "dialogue": "You re weapon slot allows you to use active items with shift. by default You re attack is a weak hand swipe.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node5"]
                    },
                    "node5":{
                        "dialogue": "You re ring slot allows you to have a special effect. what that special effect is depends on the item.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node6"]
                    },
                    "node6":{
                        "dialogue": "if You re ever confused about what an item does, simply hover over the item in You re inventory, as it displays the item name, info, and sell price.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node7"]
                    },
                    "node7":{
                        "dialogue": "try opening that chest, and testing out the weapon by putting it in You re weapon slot, then use shift to attack, or the atk button on the right.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":[]
                    },
                }
                ,"saveStones":{

                    "node1":{
                        "dialogue": "use these shrines to save You re progress. you will find them scattered all over the island.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node2"]
                    },
                    "node2":{
                        "dialogue": "these shrines are special and will restore You re strength as well.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node3"]
                    },
                    "node3":{
                        "dialogue": "in You re inventory you have a settings button. by clicking on it, it opens up the game settings. ",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node4"]
                    },
                    "node4":{
                        "dialogue": "here you can change various aspect of phantoms curse such as volume, and turning off or on the mobile control buttons.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node5"]
                    },
                    "node5":{
                        "dialogue": "but most importantly you can change You re sexual preference so enemys reflect You re desires.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node6"]
                    },
                    "node6":{
                        "dialogue": "as well as You re player sex. just be aware that changing some setting requires the game to reload, so make sure to save at a save stone.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":[]
                    },
                }
                ,"combat":{

                    "node1":{
                        "dialogue": "be wary of monsters on this island. they are dangerous, and will try to curse, or eat you.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node2"]
                    },
                    "node2":{
                        "dialogue": "enemys will try to grab you, and if they do then you need to struggle free, based on the button prompts.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node3"]
                    },
                    "node3":{
                        "dialogue": "some enemys will reduce You re hp while others will build up You re cursed energy. in most cases cursed energy is built up from sexual acts.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node4"]
                    },
                    "node4":{
                        "dialogue": "if You re curse bar maxes out, then the monster will transform you intro a monster, resulting in a gameover.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node5"]
                    },
                    "node5":{
                        "dialogue": "if you run out of health, then You re probably going to get trapped in a monsters stomach and digested.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node6"]
                    },
                    "node6":{
                        "dialogue": "when monsters are defeated, they will drop items.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node7"]
                    },
                    "node7":{
                        "dialogue": "some enemys might even have special animations if you defeat them, which can reduce You re cursed energy.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node8"]
                    },
                    "node8":{
                        "dialogue": "if You re defeated by a enemy, then check the bestiary. its full if useful information about what damage types an enemy is weak too, along with some information about that enemy.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":[]
                    },
                }
                ,"safe":{
                    "node1":{
                        "dialogue": "safe zones usually contain a bed, and a storage container.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node2"]
                    },"node2":{
                        "dialogue": "the storage locker can be used to store You re items. it is open and closed with w",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node3"]
                    },"node3":{
                        "dialogue": "it can expand if you fill it up, and can be acessed from any storage locker.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node4"]
                    },"node4":{
                        "dialogue": "the bed is a place for you to rest. when you lay down you enter the dreamscape, a place where you can re experience memorys of your victory, and defeat.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":[]
                    }
                }
            }

        },

        "sign":{
            "soul":{
                "rejection":{
                    "node1":{
                        "dialogue": "Ever since i was young, this world has rejected me. I have always felt like a outcast. even despite the thing i have acomplished, it all feels meaningless. but that not true. because what i have achieved here... is more than they could ever imagine. on this island,I can make my own future. what give them the right",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":[]
                    },
                }
            }

        },

        "istara":{
            "Behavior1":{
                "istaraCaveDialogue1":{
                    "node1":{
                        "dialogue": "OH? ",
                        "profile":"istaraNeutral",
                        "textvoice":"mediumVoice",
                        "children":["node2"]
                    },
                    "node2":{
                        "dialogue": "LUCKY ME, IT SEEMS I HAVE A UNINVITED GUEST TO MY LAIR.",
                        "profile":"istaraStarEyes",
                        "textvoice":"mediumVoice",
                        "children":["node3"]
                    },
                    "node3":{
                        "dialogue": "FEEL FREE TO STAY A WHILE, ITS NICE TO HAVE SOME COMPANY.  ",
                        "profile":"istaraHappy",
                        "textvoice":"mediumVoice",
                        "children":["node4"]
                    },
                    "node4":{
                        "dialogue": "I HOPE YOU DONT FIND ME TOO INTIMIDATING.",
                        "profile":"istaraHappy",
                        "textvoice":"mediumVoice",
                        "children":["node5"]
                    },
                    "node5":{
                        "dialogue": "SHAME MY LAIR IS QUITE SPARSE. IM IN THE PROCESS OF MOVING IN.  ",
                        "profile":"istaraKO",
                        "textvoice":"mediumVoice",
                        "children":[]
                    },

                },
                "istaraCaveDialogue2":{
                    "node1":{
                        "dialogue": "OH? ",
                        "profile":"istaraNeutral",
                        "textvoice":"mediumVoice",
                        "children":["node2"]
                    },
                    "node2":{
                        "dialogue": "IM GLAD YOUR STICKING AROUND. ITS NICE TO HAVE SOME COMPANY. ",
                        "profile":"istaraHappy",
                        "textvoice":"mediumVoice",
                        "children":["node3"]
                    },
                    "node3":{
                        "dialogue": "IM IN THE PROCESS OF MOVING WHICH IS A PAIN.",
                        "profile":"istaraKO",
                        "textvoice":"mediumVoice",
                        "children":["node4"]
                    },
                    "node4":{
                        "dialogue": "I REALLY WISH I HAD SOME LOYAL COBRABOLDS TO HELP ME GET SETTLED.",
                        "profile":"istaraNeutral",
                        "textvoice":"mediumVoice",
                        "children":["node5"]
                    },
                    "node5":{
                        "dialogue": "SADDLY I HAVENT HAD TIME TO GO ON A HUNT FOR FERAL CURSED. ",
                        "profile":"istaraSquish",
                        "textvoice":"mediumVoice",
                        "children":["node6"]
                    },
                    "node6":{
                        "dialogue": "I CAN CURSE THEM SO THAT THEY BECOME MY SWEET LOYAL COBRABOLDS.   ",
                        "profile":"istaraNeutral",
                        "textvoice":"mediumVoice",
                        "children":["node7"]
                    },
                    "node7":{
                        "dialogue": "HMMM. YOURE NOT CURSED. WOULD YOU LIKE TO BECOME ONE OF MY COBRABOLDS? ",
                        "profile":"istaraStarEyes",
                        "textvoice":"mediumVoice",
                        "children":["node8"]
                    },
                    "node8":{
                        "dialogue": "EVEN THOUGH YOU WILL SERVE ME, I PROMISE THAT I WILL KEEP YOU SAFE. ",
                        "profile":"istaraHappy",
                        "textvoice":"mediumVoice",
                        "children":["node9"]
                    },
                    "node9":{
                        "dialogue": "MY COBRABOLDS ARE VERY PRECIOUS TO ME. ",
                        "profile":"istaraHeartEyes",
                        "textvoice":"mediumVoice",
                        "children":["node10"]
                    },
                    "node10":{
                        "dialogue": "I PROMISE YOU WILL BE WELL TAKEN CARE OF.  ",
                        "profile":"istaraHappy",
                        "textvoice":"mediumVoice",
                        "children":[ "node11","node27"]
                    },
                    "node11":{
                        "dialogue": "EEEEEEE! ",
                        "profile":"istaraHeartEyes",
                        "textvoice":"mediumVoice",
                        "children":["node12"]
                    },
                    "node12":{
                        "dialogue": "IM SO HAPPY TO HEAR THAT YOU SHOULD GET UNDRESSED. ",
                        "profile":"istaraHappy",
                        "textvoice":"mediumVoice",
                        "children":[ "node13"]
                    },
                    "node13":{
                        "dialogue": "YOURE THE PERFECT SIZE TO FIT CONFORTABLY IN MY WOMB.",
                        "profile":"istaraHappy",
                        "textvoice":"mediumVoice",
                        "children":["node14"]
                    },
                    "node14":{
                        "dialogue": "JUST RELAX AND SLIDE INTO YOUR NEW MISTRESSES BELLY. ",
                        "profile":"istaraHeartEyes",
                        "textvoice":"mediumVoice",
                        "children":["node15"]
                    },
                    "node15":{
                        "dialogue": "ITLL WORK ITS MAGIC AND YOU WILL BE A CUTE COBRABOLD IN NO TIME. ",
                        "profile":"istaraHappy",
                        "textvoice":"mediumVoice",
                        "children":["node16"]
                    },
                    "node16":{
                        "dialogue": "AWWW YOUR SO CUTE DOWN THERE. ",
                        "profile":"istaraHappy",
                        "textvoice":"mediumVoice",
                        "children":["node17"]
                    },
                    "node17":{
                        "dialogue": "JUST RELAX, ILL PUSH YOU YOU INTO ME.",
                        "profile":"istaraHappy",
                        "textvoice":"mediumVoice",
                        "children":["node18"]
                    },
                    "node18":{
                        "dialogue": "HUFFFF SO FULL... ",
                        "profile":"istaraSquish",
                        "textvoice":"mediumVoice",
                        "children":["node19"]
                    },
                    "node19":{
                        "dialogue": "OHHHHHHH...... HUFF... I WAS A BIT TIGHTER THAN I THOUGHT. ",
                        "profile":"istaraHeartEyes",
                        "textvoice":"mediumVoice",
                        "children":["node20"]
                    },
                    "node20":{
                        "dialogue": "HUFFFFFF....",
                        "profile":"istaraHappy",
                        "textvoice":"mediumVoice",
                        "children":["node21"]
                    },
                    "node21":{
                        "dialogue": "AAAHHHHH..... I FEEL YOU SETTLING INTO MY WOMB. ",
                        "profile":"istaraHeartEyes",
                        "textvoice":"mediumVoice",
                        "children":["node22"]
                    },
                    "node22":{
                        "dialogue": "YOU LOOK SO CUTE ON ME I MIGHT JUST KEEP YOU IN THERE A WHILE....",
                        "profile":"istaraSquish",
                        "textvoice":"mediumVoice",
                        "children":["node23"]
                    },
                    "node23":{
                        "dialogue": "THATS IT GIVE YOURSELF UP TO YOUR NEW MISTRESS I CAN FEEL YOU CHANGING. ",
                        "profile":"istaraSquish",
                        "textvoice":"mediumVoice",
                        "children":["node24"]
                    },
                    "node24":{
                        "dialogue": "HUFFFFFF.... ",
                        "profile":"istaraSquish",
                        "textvoice":"mediumVoice",
                        "children":["node25"]
                    },
                    "node25":{
                        "dialogue": "OHHHHHHH...... ",
                        "profile":"istaraHappy",
                        "textvoice":"mediumVoice",
                        "children":["node26"]
                    },
                    "node26":{
                        "dialogue": "ILL KEEP YOU SAFE MY PRECIOUS CHILD. ",
                        "profile":"istaraHappy",
                        "textvoice":"mediumVoice",
                        "children":[]
                    },
                    "node27":{
                        "dialogue": "SUCH A SHAME...  ",
                        "profile":"istaraAnnoyed",
                        "textvoice":"mediumVoice",
                        "children":["node28"]
                    },
                    "node28":{
                        "dialogue": "ILL BE HERE IF YOU CHANGE YOUR MIND.... ",
                        "profile":"istaraSad",
                        "textvoice":"mediumVoice",
                        "children":[]
                    },
                }
            },
            "Behavior2":{
                
                "dreamView":{
                    "node1":{
                        "dialogue": "HMMM. YOURE NOT CURSED. WOULD YOU LIKE TO BECOME ONE OF MY COBRABOLDS? ",
                        "profile":"istaraHappy",
                        "textvoice":"mediumVoice",
                        "children":[ "node11","node27"]
                    },
                    "node11":{
                        "dialogue": "EEEEEEE! ",
                        "profile":"istaraHeartEyes",
                        "textvoice":"mediumVoice",
                        "children":["node12"]
                    },
                    "node12":{
                        "dialogue": "IM SO HAPPY TO HEAR THAT YOU SHOULD GET UNDRESSED. ",
                        "profile":"istaraHappy",
                        "textvoice":"mediumVoice",
                        "children":[ "node13"]
                    },
                    "node13":{
                        "dialogue": "YOURE THE PERFECT SIZE TO FIT CONFORTABLY IN MY WOMB.",
                        "profile":"istaraHappy",
                        "textvoice":"mediumVoice",
                        "children":["node14"]
                    },
                    "node14":{
                        "dialogue": "JUST RELAX AND SLIDE INTO YOUR NEW MISTRESSES BELLY. ",
                        "profile":"istaraHeartEyes",
                        "textvoice":"mediumVoice",
                        "children":["node15"]
                    },
                    "node15":{
                        "dialogue": "ITLL WORK ITS MAGIC AND YOU WILL BE A CUTE COBRABOLD IN NO TIME. ",
                        "profile":"istaraHappy",
                        "textvoice":"mediumVoice",
                        "children":["node16"]
                    },
                    "node16":{
                        "dialogue": "AWWW YOUR SO CUTE DOWN THERE. ",
                        "profile":"istaraHappy",
                        "textvoice":"mediumVoice",
                        "children":["node17"]
                    },
                    "node17":{
                        "dialogue": "JUST RELAX, ILL PUSH YOU YOU INTO ME.",
                        "profile":"istaraHappy",
                        "textvoice":"mediumVoice",
                        "children":["node18"]
                    },
                    "node18":{
                        "dialogue": "HUFFFF SO FULL... ",
                        "profile":"istaraSquish",
                        "textvoice":"mediumVoice",
                        "children":["node19"]
                    },
                    "node19":{
                        "dialogue": "OHHHHHHH...... HUFF... I WAS A BIT TIGHTER THAN I THOUGHT. ",
                        "profile":"istaraHeartEyes",
                        "textvoice":"mediumVoice",
                        "children":["node20"]
                    },
                    "node20":{
                        "dialogue": "HUFFFFFF....",
                        "profile":"istaraHappy",
                        "textvoice":"mediumVoice",
                        "children":["node21"]
                    },
                    "node21":{
                        "dialogue": "AAAHHHHH..... I FEEL YOU SETTLING INTO MY WOMB. ",
                        "profile":"istaraHeartEyes",
                        "textvoice":"mediumVoice",
                        "children":["node22"]
                    },
                    "node22":{
                        "dialogue": "YOU LOOK SO CUTE ON ME I MIGHT JUST KEEP YOU IN THERE A WHILE....",
                        "profile":"istaraSquish",
                        "textvoice":"mediumVoice",
                        "children":["node23"]
                    },
                    "node23":{
                        "dialogue": "THATS IT GIVE YOURSELF UP TO YOUR NEW MISTRESS I CAN FEEL YOU CHANGING. ",
                        "profile":"istaraSquish",
                        "textvoice":"mediumVoice",
                        "children":["node24"]
                    },
                    "node24":{
                        "dialogue": "HUFFFFFF.... ",
                        "profile":"istaraSquish",
                        "textvoice":"mediumVoice",
                        "children":["node25"]
                    },
                    "node25":{
                        "dialogue": "OHHHHHHH...... ",
                        "profile":"istaraHappy",
                        "textvoice":"mediumVoice",
                        "children":["node26"]
                    },
                    "node26":{
                        "dialogue": "ILL KEEP YOU SAFE MY PRECIOUS CHILD. ",
                        "profile":"istaraHappy",
                        "textvoice":"mediumVoice",
                        "children":[]
                    },
                    "node27":{
                        "dialogue": "SUCH A SHAME...  ",
                        "profile":"istaraAnnoyed",
                        "textvoice":"mediumVoice",
                        "children":["node28"]
                    },
                    "node28":{
                        "dialogue": "ILL BE HERE IF YOU CHANGE YOUR MIND.... ",
                        "profile":"istaraSad",
                        "textvoice":"mediumVoice",
                        "children":[]
                    },
                }
            }
        },
        "lunalyst":{
            "Behavior1":{
                "lunaDevDialogue1Start":{
                    "node1":{
                        "dialogue": "",
                        "profile":"lunaSleeping",
                        "textvoice":"lightVoice",
                        "children":["node2"]
                    },"node2":{
                        "dialogue": "WHAT THE..... HOW DID YOU GET IN HERE? ",
                        "profile":"lunaNeutral",
                        "textvoice":"lightVoice",
                        "children":["node3"]
                    },"node3":{
                        "dialogue": "YOU SHOULD, PROBABLY TELL ME HOW GOT IN HERE.",
                        "profile":"lunaKO",
                        "textvoice":"lightVoice",
                        "children":["node4"]
                    },"node4":{
                        "dialogue": "THIS PLACE IS A LITTLE HARD TO REACH.",
                        "profile":"lunaHappy",
                        "textvoice":"lightVoice",
                        "children":["node5"]
                    },"node5":{
                        "dialogue": "OH AND DONT WORRY, IM NOT IM NOT OPPOSED TO VISITERS THOUGH. ",
                        "profile":"lunaFingerTouch",
                        "textvoice":"lightVoice",
                        "children":["node6"]
                    },"node6":{
                        "dialogue": "ANYWAY, I GOT TO GET BACK TO MY RESEARCH. EXITS BY THE HEATER. ",
                        "profile":"lunaStarEyes",
                        "textvoice":"lightVoice",
                        "children":[]
                    },
                },

                "lunaDevDialogueMale1":{
                    "node1":{
                        "dialogue": "OH? STILL STICKING AROUND?  ",
                        "profile":"lunaNeutral",
                        "textvoice":"lightVoice",
                        "children":["node2"]
                    },"node2":{
                        "dialogue": "YOUR QUITE THE CUTE BOY YOU SHOULD BE CAREFUL. ",
                        "profile":"lunaFingerTouch",
                        "textvoice":"lightVoice",
                        "children":["node3"]
                    },"node3":{
                        "dialogue": "THE CURSED LOVE EATING AND TRANSFORMING HUMANS LIKE YOUR SELF.",
                        "profile":"lunaNeutral",
                        "textvoice":"lightVoice",
                        "children":["node4"]
                    },"node4":{
                        "dialogue": "I WAS HUMAN ONCE WHEN I WASHED UP HERE. ",
                        "profile":"lunaNeutral",
                        "textvoice":"lightVoice",
                        "children":["node5"]
                    },"node5":{
                        "dialogue": "ONE OF THE BATS GOT ME A WHILE BACK. BUT THANKFULLY I MANAGED ",
                        "profile":"lunaFingerTouch",
                        "textvoice":"lightVoice",
                        "children":["node6"]
                    },"node6":{
                        "dialogue": "TO GET LUCKY, AND NOT LOSE MY MIND.",
                        "profile":"lunaStarEyes",
                        "textvoice":"lightVoice",
                        "children":["node7"]
                    },"node7":{
                        "dialogue": "MY APPEARANCE IS ALSO SLIGHTLY DIFFERENT FROM THEM. ",
                        "profile":"lunaNeutral",
                        "textvoice":"lightVoice",
                        "children":["node8"]
                    },"node8":{
                        "dialogue": "WONDER WHY THAT IS. ",
                        "profile":"lunaHappy",
                        "textvoice":"lightVoice",
                        "children":[]
                    },
                },

                "lunaDevDialogueFemale1":{
                    "node1":{
                        "dialogue": "OH? STILL STICKING AROUND?  ",
                        "profile":"lunaNeutral",
                        "textvoice":"lightVoice",
                        "children":["node2"]
                    },"node2":{
                        "dialogue": "YOUR QUITE THE CUTE GIRL YOU SHOULD BE CAREFUL. ",
                        "profile":"lunaFingerTouch",
                        "textvoice":"lightVoice",
                        "children":["node3"]
                    },"node3":{
                        "dialogue": "THE CURSED LOVE EATING AND TRANSFORMING HUMANS LIKE YOUR SELF.",
                        "profile":"lunaNeutral",
                        "textvoice":"lightVoice",
                        "children":["node4"]
                    },"node4":{
                        "dialogue": "I WAS HUMAN ONCE WHEN I WASHED UP HERE. ",
                        "profile":"lunaNeutral",
                        "textvoice":"lightVoice",
                        "children":["node5"]
                    },"node5":{
                        "dialogue": "ONE OF THE BATS GOT ME A WHILE BACK. BUT THANKFULLY I MANAGED ",
                        "profile":"lunaFingerTouch",
                        "textvoice":"lightVoice",
                        "children":["node6"]
                    },"node6":{
                        "dialogue": "TO GET LUCKY, AND NOT LOSE MY MIND.",
                        "profile":"lunaStarEyes",
                        "textvoice":"lightVoice",
                        "children":["node7"]
                    },"node7":{
                        "dialogue": "MY APPEARANCE IS ALSO SLIGHTLY DIFFERENT FROM THEM. ",
                        "profile":"lunaNeutral",
                        "textvoice":"lightVoice",
                        "children":["node8"]
                    },"node8":{
                        "dialogue": "WONDER WHY THAT IS. ",
                        "profile":"lunaHappy",
                        "textvoice":"lightVoice",
                        "children":[]
                    },
                },
                "lunaDevDialogue2Start":{
                    "node1":{
                        "dialogue": "",
                        "profile":"lunaSleeping",
                        "textvoice":"lightVoice",
                        "children":["node2"]
                    },"node2":{
                        "dialogue": "WHAT THE..... OH NO YOUR BACK. ",
                        "profile":"lunaNeutral",
                        "textvoice":"lightVoice",
                        "children":["node3"]
                    },"node3":{
                        "dialogue": "YOU SHOULD, PROBABLY TELL ME HOW GOT IN HERE AGIAN. IM WORRIED.",
                        "profile":"lunaKO",
                        "textvoice":"lightVoice",
                        "children":["node4"]
                    },"node4":{
                        "dialogue": "THIS PLACE SHOULD BE HARD TO REACH, BUT MIGHT NOT BE CURRENTLY.",
                        "profile":"lunaHappy",
                        "textvoice":"lightVoice",
                        "children":["node5"]
                    },"node5":{
                        "dialogue": "IF YOU CAN GET IN HERE THE CURSED LIKELY CAN AS WELL. ",
                        "profile":"lunaFingerTouch",
                        "textvoice":"lightVoice",
                        "children":["node6"]
                    },"node6":{
                        "dialogue": "ANYWAY, MAKE YOURSELF CONFORTABLE IF YOU WISH. EXITS BY THE HEATER. ",
                        "profile":"lunaStarEyes",
                        "textvoice":"lightVoice",
                        "children":[]
                    },
                },
                "lunaDevDialogue2":{
                    "node1":{
                        "dialogue": "OH? STILL STICKING AROUND?  ",
                        "profile":"lunaNeutral",
                        "textvoice":"lightVoice",
                        "children":["node2"]
                    },"node2":{
                        "dialogue": "MAKE YOUR SELF COMFORTABLE. ",
                        "profile":"lunaHappy",
                        "textvoice":"lightVoice",
                        "children":["node3"]
                    },"node3":{
                        "dialogue": "I HAVE BEEN TRYING TO CLEAR A PATH TO LOCKWOOD IN MY SPARE TIME.",
                        "profile":"lunaKO",
                        "textvoice":"lightVoice",
                        "children":["node4"]
                    },"node4":{
                        "dialogue": "ITS A NICE TOWN IN THE TREES. MOST CURSED HAVE TOUGH TIME REACHING IT. ",
                        "profile":"lunaHappy",
                        "textvoice":"lightVoice",
                        "children":["node5"]
                    },"node5":{
                        "dialogue": "EVEN THOUGH IM CURSED OTHER WILD CURSED STILL TRY TO EAT ME. ",
                        "profile":"lunaAngryEyes",
                        "textvoice":"lightVoice",
                        "children":["node6"]
                    },"node6":{
                        "dialogue": "ITS ALMOST AS IF THEY KNOW IM NOT ONE OF THEM. ",
                        "profile":"lunaCry",
                        "textvoice":"lightVoice",
                        "children":[]
                    }
                },
                
               

                

            },
            "Behavior2":{
                "flags":{
                    "children": ["lunaCTWDialogue1", "lunaCTWDialogue2"]
                    },

                "lunaCTWDialogue1":{
                    "node1":{
                        "dialogue": "OH A HUMAN! HELLO! ",
                        "profile":"lunaStarEyes",
                        "textvoice":"lightVoice",
                        "children":["node2"]
                    },"node2":{
                        "dialogue": "MY NAME IS LUNALYST, AND IM SURE YOU CAN TELL IM NOT QUITE HUMAN ANYMORE.",
                        "profile":"lunaHappy",
                        "textvoice":"lightVoice",
                        "children":["node3"]
                    },"node3":{
                        "dialogue": "HOWEVER IM NOT GONA TRY AND EAT OR FORNICATE WITH YOU, PROMISE.",
                        "profile":"lunaKO",
                        "textvoice":"lightVoice",
                        "children":["node4"]
                    },"node4":{
                        "dialogue": "IM JUST A HUMBLE MAID TRYING TO GET BACK TO LOCKWOOD VILLAGE. ",
                        "profile":"lunaFingerTouch",
                        "textvoice":"lightVoice",
                        "children":["node5"]
                    },"node5":{
                        "dialogue": "LOTS OF CAVE INS SO IM DOING MY BEST TO CLEAR THE WAY. ",
                        "profile":"lunaKO",
                        "textvoice":"lightVoice",
                        "children":["node6"]
                    },"node6":{
                        "dialogue": "ANYWAY, I GOT TO GET BACK TO IT. STAY SAFE OUT THERE. ^_^ ",
                        "profile":"lunaStarEyes",
                        "textvoice":"lightVoice",
                        "children":[]
                    },
                },
                "lunaCTWDialogue2":{
                    "node1":{
                        "dialogue": "HELLO AGIAN. ",
                        "profile":"lunaHappy",
                        "textvoice":"lightVoice",
                        "children":["node2"]
                    },"node2":{
                        "dialogue": "IM STILL BUSY OVER HERE CLEARING THE WAY. ",
                        "profile":"lunaKO",
                        "textvoice":"lightVoice",
                        "children":["node3"]
                    },"node3":{
                        "dialogue": "THOUGH I COULD USE A BREAK.",
                        "profile":"lunaFingerTouch",
                        "textvoice":"lightVoice",
                        "children":["node4"]
                    },"node4":{
                        "dialogue": "HOW CAN I ASSIST YOU? ",
                        "profile":"lunaHappy",
                        "textvoice":"lightVoice",
                        "children":["node5","node10","node12"]
                    },"node5":{
                        "dialogue": "OH? OF COURSE! ",
                        "profile":"lunaHappy",
                        "textvoice":"lightVoice",
                        "children":["node6"]
                    },"node6":{
                        "dialogue": "COME HERE. EVERYTHINGS GOING TO BE ALRIGHT. ",
                        "profile":"lunaHappy",
                        "textvoice":"lightVoice",
                        "children":["node7"]
                    },"node7":{
                        "dialogue": "",
                        "profile":"lunaHearts",
                        "textvoice":"lightVoice",
                        "children":["node8"]
                    },"node8":{
                        "dialogue": "",
                        "profile":"lunaFingerTouch",
                        "textvoice":"lightVoice",
                        "children":["node9"]
                    },"node9":{
                        "dialogue": "STAY SAFE OUT THERE. ^_^ ",
                        "profile":"lunaFingerTouch",
                        "textvoice":"lightVoice",
                        "children":[]
                    },"node10":{
                        "dialogue": "SUPPLIES? SURE WE CAN DO SOME TRADING.",
                        "profile":"lunaHappy",
                        "textvoice":"lightVoice",
                        "children":["node11"]
                    },"node11":{
                        "dialogue": "HERES WHAT I GOT. ",
                        "profile":"lunaHappy",
                        "textvoice":"lightVoice",
                        "children":[]
                    },"node12":{
                        "dialogue": "GOODBYE ^_^ ",
                        "profile":"lunaHappy",
                        "textvoice":"lightVoice",
                        "children":[]
                    }
                }
               

                

            },
            "clearingTheWay":{
                
            }

        },
        "gameover":{

            "eaten":{
                "default":{
                    "node1":{
                        "dialogue": "you were eaten, but i have no clue what ate you or how it happened x3.",
                        "profile":"",
                        "textvoice":"digest",
                        "children":[]
                    }
                },
                "femaleTiger":{
                    "node1":{
                        "dialogue": "This island is inhabited by quite a few dangerous predators, so perhaps some caution would have helped you survive. For you, however, there will never be a second chance. The tiger ambushed you and quickly devoured you with all the skill youd expect from such a predator. The tigers powerful stomach quickly sloshed you into a nutritious stew like the weak meal you were. The good news is, the tiger enjoyed you very much. In fact, she thought you were grrrrrrrrrreat!",
                        "profile":"",
                        "textvoice":"digest",
                        "children":[]
                    }
                },
                "maleTiger":{
                    "node1":{
                        "dialogue": "This island is inhabited by quite a few dangerous predators, so perhaps some caution would have helped you survive. For you, however, there will never be a second chance. The tiger ambushed you and quickly devoured you with all the skill youd expect from such a predator. The tigers powerful stomach quickly sloshed you into a nutritious stew like the weak meal you were. as your body melted, you could feel yourself being absorbed into the tigers body. the rest of your existance will be spent as padding on the tigers torso. at least on the bright side, when the tiger pleaures himself, you feel it too.",
                        "profile":"",
                        "textvoice":"digest",
                        "children":[]
                    }
                },
                "maleBat":{
                    "node1":{
                        "dialogue": "A swooshing sound was all that announced your fate. You were caught unaware, and swiftly ended up stuffed into a bats bowels. You couldnt even scream within the warm, smothering chamber, and instead you simply whimpered. Within a few minutes, your body was mere liquid within the bats intestines. Ultimately, your life came to a end, your entire existence only remembered as ass fat",
                        "profile":"",
                        "textvoice":"digest",
                        "children":[]
                    }
                },
                "blueSlimeHS":{
                    "node1":{
                        "dialogue": "the face should have been a dead give away that this slime was different. as it latched on to your face, you struggled to break free. once you were exausted, it coated your body with its slime.  now you were under its control. it enjoyed playing with you intul you climaxed.",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":[]
                    }
                },
                "blueSlimeFemaleHM":{
                    "node1":{
                        "dialogue": "you where caught of guard, the strength of the slime overpowered you. helpless to stop it, the slime engulfed you with there chest. enjoying playing with you, it squished you into her stomache, then moved you to here now engourged breasts. moving you between the now massive sacks of soft slime.once she had her fun, you where absorbed into her body. now you will spend the rest of your days padding out the breasts of a engourged slime girl.",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":[]
                    }
                },
                "blueSlimeMaleHM":{
                    "node1":{
                        "dialogue": "you where caught of guard, the strength of the slime overpowered you. helpless to stop it, the slime engulfed you with there engourged penis. quickly squeesing you through its urithra and into its large balls. as the slime began to pleasure itsself you felt your body throbbing with pleasure as you melted. when the slime climaxed you could feel what little of you was left rise quickly out the slimes massive cock. only to be swalled and reabsorbed. now you will spend the rest of your days as slimey pudge on this engourged slime boy. ",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":[]
                    }
                },
                "maleChestMimicVore":{
                    "node1":{
                        "dialogue": "Greed. A five-letter word that can spell doom for even the most seasoned of adventurers, and you were far from seasoned. A single moment of greed was all it took for you to cause your own doom. Your last thoughts as your body melted in the guts of the mimic were of regret. All the treasure in the world couldn’t save you now. Your death was simply an open-and-shut case.",
                        "profile":"",
                        "textvoice":"digest",
                        "children":[]
                    }
                },
                "whiteCatFemaleVore":{
                    "node1":{
                        "dialogue": "Your short-lived adventure has come to an unfortunate, though not undeserved, ending. You were quickly overpowered by an angry feline, forcefully shoved into its ravinous rear. Your exploratory trip into a cat’s bowels was one-way trip to an eternity as cat pudge, though it seems that your soul is going to stay around for a while. It turns out you really are a girl kisser, or at least, you’re part of one.",
                        "profile":"",
                        "textvoice":"digest",
                        "children":[]
                    }
                },
                "whiteCatMaleVore":{
                    "node1":{
                        "dialogue": "Your short-lived adventure has come to an unfortunate, though not undeserved, ending. You were quickly overpowered by an angry feline, forcefully shoved into its ravinous rear. Your exploratory trip into a cat’s bowels was one-way trip to an eternity as cat pudge, though it seems that your soul is going to stay around for a while. It turns out you really are a boy kisser, or at least, you’re part of one.",
                        "profile":"",
                        "textvoice":"digest",
                        "children":[]
                    }
                },
                "curseShadow":{
                    "node1":{
                        "dialogue": "the darkiness of the cave didnt dicourage you at all from entering. as you stubbled around something grabbed the lower half of your body. pulling you partially into the floor this creature began to suck you in. despite your best efforts to struggle free, it tired you out, and sucked you completely inside is dark body. as you wiggled you could feel the shadow restrain you, with tendrils of black shadow. more tendrils formed with the intent of filling your body with some unknown substance. as it began to pump your body full, you could feel your chest become heavier, and your genitalia swell. once it had spread its self completely through you body, it was finally able to fully absorb you into its form. now that you became one with the shadow, it began to pleasure itself... ",
                        "profile":"",
                        "textvoice":"digest",
                        "children":[]
                    }
                },
                "template":{
                    "node1":{
                        "dialogue": "",
                        "profile":"",
                        "textvoice":"digest",
                        "children":[]
                    }
                },
            },
            "cursed":{
                "default":{
                    "node1":{
                        "dialogue": "you were cursed, but i have no clue what got you or how it happened x3.",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":[]
                    }
                },
                "blueSlime":{
                    "node1":{
                        "dialogue": "Theres no way you would lose to a slime, right? As much as you told yourself this, one small misstep, and that weak slime has engulfed your leg, and then quickly moved up to your torso. To your surprise, it began to pleasure you. Feeling your strength weaken, you ultimately lie back in defeat as you climax. You then feel a filling sensation as you realize the slime is now within you. It doesnt take long before your skin is changed into blue slime. But you actually feel... glad? You have a second chance now, no, a second life. A simple life as a humanoid slime.",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":[]
                    }
                },
                "largeBlueSlime":{
                    "node1":{
                        "dialogue": "Its larger, but still a slime. Unfortunately the easy thing to defeat was you, as you are brought to the ground and encased in the blue slime. It decided to play with its prey, and invaded your lower body. Before long, it fills you up with slime and your consciousness fades, along with any traces of your body. However, you wake up soon after, but bigger, and less human. Your adventure ends as a human, but now you have a brand new life as a large slime ahead of you.",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":[]
                    }
                },
                "femaleTigerBooba":{
                    "node1":{
                        "dialogue": "the tiger was satisfied from her previous meal, which was lucky for you. she was quite slow due to her fulliness and yet she still got her hands on you, smothering you with her enlarged breasts. your will to struggle faded as she layed down, with you on top of her. as she forced your body onto hers. you could feel yourself transforming as you climaxed. now your her precious tiger cub. you might be cursed, but atleast your tiger momma will keep you safe.",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":[]
                    }
                },
                "maleRabbit":{
                    "node1":{
                        "dialogue": "In a humiliating turn of events, you suddenly get to experience how rabbits multiply so quickly as you are bent over at the mercy of the male rabbit that caught you. Before long, he penetrates your rear and goes to town with many loud PLAPS. As the two of you both climax in pleasure, you see your body change, growing fur and paws. As the male rabbit finishes and wanders off to find a new partner, youre left alone with your new rabbit body. You feel very warm as your crotch gets hot and twitches. Its time to start helping the rabbits multiply more.",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":[]
                    }
                },
                "femaleRabbit":{
                    "node1":{
                        "dialogue": "Before you can react, youre knocked down, and a female rabbit hops on top of you. Giving you no time to recover, she begins to hump you, occasionally smothering you with her breasts. Her bounces get faster and faster before you realize your body looks like hers now. Satisfied, the rabbit jumps off and leaves you be. You stand up, still unsatisfied, panting and squeezing your boob. Perhaps that female rabbit was on to something, and you take after her lead and find a proper mate of your own to bounce on.",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":[]
                    }
                },
                "maleBeeDrone":{
                    "node1":{
                        "dialogue": "the flap of wings should have been a indicator to run. tryed to stand your ground. clearly that didnt work out very well for you. the bee grabbed you. you were lifted of the ground, struggling agianst the streangth of the cursed insect. when it could tell you were exausted, it opened up its large abdomin to swallow you, packing you tightly. happy to have caught a human, it took you back to its hive, where a lucky larva could swallow you. all you fell now is the rythmic wiggle of the grub as your powerless to stop it from absorbing you. its warm walls masaging your body as your mind is clouded with pleasure.",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":[]
                    }
                },
                "femaleBeeDrone":{
                    "node1":{
                        "dialogue": "the flap of wings should have been a indicator to run. tryed to stand your ground. clearly that didnt work out very well for you. the bee grabbed you. you were lifted of the ground, struggling agianst the strength of the cursed insect. when it could tell you were exausted, it opened up its large abdomin to swallow you, packing you tightly. happy to have caught a human, it took you back to its hive, where a lucky larva could swallow you. all you fell now is the rythmic wiggle of the grub as your powerless to stop it from absorbing you. its warm walls masaging your body as your mind is clouded with pleasure.",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":[]
                    }
                },
                "femaleChestMimic":{
                    "node1":{
                        "dialogue": "Thinking you found something, you instead were found BY something. Grabbed by a mimic, she pulls you into the chest and the lid closes after. Surrounded by squishy pink flesh, youre face to face with the mimic as she has her long tongue going down your throat. As her motions get faster, your skin gets pinker, and before you know it, your entire vision is pink. As the chest opens once more, it appears you DID get something from the chest. A loving mama that will care for you until youre ready for a chest of your own.",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":[]
                    }
                },
                "maleChestMimic":{
                    "node1":{
                        "dialogue": "As you open the chest, youre immediately grabbed by the mimic that was waiting for you. You can only hear the lid closing as youre faced down, surrounded by pink flesh. It actually feels comfy, but you dont have time to enjoy it as you feel something being inserted into your butt. Of course, the mimic is here with you, and he proceeds to violate your rear rhythmically to the pulsating flesh around you. It doesnt take long to start enjoying as you then become a loving member of the mimics family. Dont worry, hes very proud of you.",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":[]
                    }
                },
                "istaraUnbirth":{
                    "node1":{
                        "dialogue": "The little human willingly gives themselves to the cobra dragoness to forever feel the joys of being close to their mistress, adored by her for all eternity, and always looking to please. Occasionally going out to get whatever mistress deems them to, sometimes these requests require the rare human or common beast to grow her following. The new followers having different features to their Cobrabold selves retaining some small semblance of their former selves. It fills the former human with pride that they look the most like mistress the most pure the closest to mistress her main Cobold. The little Cobrabold knows that they will always be the first and most cherished. Forever safe in her ever expanding lair among their new brothers and sisters that are growing in number as the weeks go on. All hail Istara the Cobra Queen",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":[]
                    }
                },
                "whiteCatMaleTF":{
                    "node1":{
                        "dialogue": "Enamored by its cute roar, you willingly get closer to the male cat. Close enough for it to grab and give a big smooch, and then hold you up as it inserts its penis into you. Despite the insertion, you cant seem to be mad at him as hes just way too cute. You offer no resistance and let him do what he wants, as the cat gets faster and faster. When you both reach your peaks, your body becomes like his, along with your very own cat shaft. Now partners for life, you await for his return for your next session with a little self deserved cat nap.",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":[]
                    }
                },
                "whiteCatFemaleTF":{
                    "node1":{
                        "dialogue": "Your head starts to get fuzzy, similar to the female cats fur in front of you. With only that on your mind, you rush forward to try to nestle your head in her fur. But she gives you a loving hug first, along with a very passionate kiss to set the mood. Your desire is made true as the cat shoves your head in between her breasts, nearing covering your entire head with how big and furry they are. The cat satisfies her own desires too, as she nuzzles her lower half against yours. As you both get your fill, you realize that you now have a pair of fuzzy breasts of you own, along with a loving mate for eternity. But for now, a little cat nap as a reward for all your hard work.",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":[]
                    }
                },
                "curseShadowSecret1":{
                    "node1":{
                        "dialogue": "Oh?",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":["node2"]
                    },
                    "node2":{
                        "dialogue": "Where do you think your going?",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":["node3"]
                    },
                    "node3":{
                        "dialogue": "...",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":["node4"]
                    },
                    "node4":{
                        "dialogue": "ahhh... i see. a gift for me?",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":["node5"]
                    },
                    "node5":{
                        "dialogue": "I happily accept...",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":["node6"]
                    },
                    "node6":{
                        "dialogue": "i will consume all of your desires...",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":[]
                    }
                },
                "earieShadow":{
                    "node1":{
                        "dialogue": "your all mine now....",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":["node2"]
                    },
                    "node2":{
                        "dialogue": "i can feel you squirming inside me....",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":["node3"]
                    },
                    "node3":{
                        "dialogue": "lets fix that. ",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":["node4"]
                    },
                    "node4":{
                        "dialogue": "much better. im going to enjoy playing with you. ",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":["node5"]
                    }, 
                    "node5":{
                        "dialogue": "is this what your heart desired? ",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":["node6"]
                    },
                    "node6":{
                        "dialogue": "how interesting...",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":["node7"]
                    },
                    "node7":{
                        "dialogue": "my cute toy, i will enjoy consuming your every desire...",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":["node8"]
                    },
                    "node8":{
                        "dialogue": "now cum for me...",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":["node9"]
                    },
                    "node9":{
                        "dialogue": "very good...",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":[]
                    },
                },
                
                "template":{
                    "node1":{
                        "dialogue": "",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":[]
                    }
                },
            }
        }
}