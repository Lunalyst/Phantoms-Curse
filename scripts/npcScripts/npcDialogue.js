const npcDialogue = {

        "cutscenes":{
            "intro":{
                "intro1":{
                    "node1":{
                        "dialogue": "It is finally time to begin...",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":["node2"]
                    },"node2":{
                        "dialogue": "You awake in your bed knowing that today is special...",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":["node3"]
                    },
                    "node3":{
                        "dialogue": "You are leaving home, in search for adventure...",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":["node4"]
                    },
                    "node4":{
                        "dialogue": "Your destination? the Ruinous Rombus...",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":["node5"]
                    },
                    "node5":{
                        "dialogue": "Where many have disappeared over the past two centuries...",
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
                        "dialogue": "But toward the center, a powerful storm always seems to be brewing...",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":["node8"]
                    },
                    "node8":{
                        "dialogue": "Many believe it to be cursed by evil spirits...",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":["node9"]
                    },
                    "node9":{
                        "dialogue": "But you believe there is something special hiding past the maelstrom... ",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":["node10"]
                    },
                    "node10":{
                        "dialogue": "Something worth risking Your life for...",
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
                        "dialogue": "Welcome to the island beyond the storm. You can progress dialogue with the W button on screen.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node2"]
                    },
                    "node2":{
                        "dialogue": "To move left or right use the a or d key.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node3"]
                    },
                    "node3":{
                        "dialogue": "If something is interactable, then a Key prompt will appear below it.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":[]
                    },
                },
                "platforms":{
                    "node1":{
                        "dialogue": "Some surfaces can be jumped through. you can move back down through them by pressing S.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":[]
                    },
                },
                "worldDrops":{
                    "node1":{
                        "dialogue": "Sometimes items will appear on the ground, or be dropped by a monster. You can walk over these items to pick them up and add them to your inventory.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node2"]
                    },
                    "node2":{
                        "dialogue": "So keep an eye out for items that glow.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":[]
                    },
                  
                },
                "warps":{
                    "node1":{
                        "dialogue": "Interactable doors and passages will lead to new places. Keep an eye out for them.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":[]
                    },
                },
                "containers":{
                    "node1":{
                        "dialogue": "Some interactables will give you an item.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node2"]
                    },
                    "node2":{
                        "dialogue": "You can open your inventory with a tab, or use the inventory button on the right side of the screen.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node3"]
                    },
                    "node3":{
                        "dialogue": "Your inventory has equippment slots which allow you to change your equipment.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node4"]
                    },
                    "node4":{
                        "dialogue": "Your weapon slot allows you to use active items with shift. By default your attack is a weak swipe.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node5"]
                    },
                    "node5":{
                        "dialogue": "Your ring slot allows you to have a special effect. What that special effect is depends on the item.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node6"]
                    },
                    "node6":{
                        "dialogue": "If you are ever confused about what an item does, simply hover over the item in your inventory, as it displays the item name, info, and sell price.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node7"]
                    },
                    "node7":{
                        "dialogue": "Try opening that chest and testing out the weapon inside, by putting it in your weapon slot, then use shift to attack, or the attack button on the right.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":[]
                    },
                }
                ,"saveStones":{

                    "node1":{
                        "dialogue": "Use these shrines to save your progress. You will find them scattered all over the island.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node2"]
                    },
                    "node2":{
                        "dialogue": "These shrines are special and will restore your strength as well.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node3"]
                    },
                    "node3":{
                        "dialogue": "In your inventory, you have a settings button. By clicking on it, it opens up the game settings.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node4"]
                    },
                    "node4":{
                        "dialogue": "Here you can change various aspects of phantoms curse such as volume, and turning off or on the mobile control buttons.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node5"]
                    },
                    "node5":{
                        "dialogue": "But most importantly you can change your sexual preference so enemies reflect your desires.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node6"]
                    },
                    "node6":{
                        "dialogue": "As well as your player sex. Just be aware that changing some settings requires the game to reload, so make sure to save at a save stone.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":[]
                    },
                }
                ,"combat":{

                    "node1":{
                        "dialogue": "Be wary of monsters on this island. They are dangerous, and will try to curse or eat you.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node2"]
                    },
                    "node2":{
                        "dialogue": "Enemies will try to grab you, and if they do then you need to struggle free, using on the button prompts.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node3"]
                    },
                    "node3":{
                        "dialogue": "Some enemies will reduce your hp while others will build up your cursed energy. In most cases, cursed energy is built up from sexual acts.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node4"]
                    },
                    "node4":{
                        "dialogue": "If your curse bar maxes out, then the monster will transform you into a monster, resulting in a gameover.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node5"]
                    },
                    "node5":{
                        "dialogue": "If you run out of health, then you are probably going to get trapped in a monster's stomach and digested.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node6"]
                    },
                    "node6":{
                        "dialogue": "When monsters are defeated, they can drop items.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node7"]
                    },
                    "node7":{
                        "dialogue": "Defeated Enemies will fall to the ground from exhaustion when defeated in most cases. ",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node8"]
                    },
                    "node8":{
                        "dialogue": "If you are defeated by an enemy, then check the bestiary. It is full of useful information about what damage types an enemy is weak to, along with some information about that enemy.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":[]
                    },
                }
                ,"safe":{
                    "node1":{
                        "dialogue": "Safe zones usually contain a bed, and a storage container.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node2"]
                    },"node2":{
                        "dialogue": "The storage locker can be used to store your items. It is opened and closed with w",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node3"]
                    },"node3":{
                        "dialogue": "It can expand if you fill it up, and can be acessed from any storage locker.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node4"]
                    },"node4":{
                        "dialogue": "The bed is a place for you to rest. When you lay down you enter the dreamscape, a place where you can reexperience memories of your encounter's, and defeats.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":[]
                    }
                }
            }

        },

        "sign":{
            "generic":{
                "tutorialSign1":{
                    "node1":{
                        "dialogue": "To anyone who wash up here, head towards the cave to the right. ~Siracle",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":[]
                    },
                },
                "tutorialCabin":{
                    "node1":{
                        "dialogue": "Follow the platforms upward. We have a small lodging for those that wash up here. It's not much, but it's the best we could do for you. You could wait for one of us to come get you; however, it's been a long time since anyone was up here and we don't check this cabin often. ~Siracle",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":[]
                    },
                },
                "dreamView1":{
                    "node1":{
                        "dialogue": "this space exists in your dreams. ",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node2"]
                    },
                    "node2":{
                        "dialogue": "In Here you can relive past experiences that lead to dead ends for you enjoyment...",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":[]
                    },
                },
                "devRoomJoke1":{
                    "node1":{
                        "dialogue": "I like ya, and I want ya.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node2"]
                    },
                    "node2":{
                        "dialogue": "Now we can do this the easy way, or we can do this the hard way.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node3"]
                    },
                    "node3":{
                        "dialogue": "The choice is yaaawws.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":[]
                    },
                },
                "devRoomStatue":{
                    "node1":{
                        "dialogue": "figured i would hide this strange statue. touching it seems to warp your memories. be careful -lunalyst",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":[]
                    },
                },
                "slimeWarning":{
                    "node1":{
                        "dialogue": "DANGER!",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node2"]
                    },
                    "node2":{
                        "dialogue": "Beware, slime nests ahead; try to stay outside of the slime as the nesting slimes don't like to leave their slime.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":[]
                    },
                },
                "ominousOmen1":{
                    "node1":{
                        "dialogue": "All that you are, and all that you could be. Your heart becomes apart from me. From your seed sprouted a great tree. With branches so wide, that in its shade, our nightmares could hide.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":[]
                    },
                },
                "ominousOmen2":{
                    "node1":{
                        "dialogue": "What is it you seek? A future or a dead end? Won't you reach out your heart, and show me?",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":[]
                    },
                },
                "ominousOmen3":{
                    "node1":{
                        "dialogue": "The heart of this island hungers for you. Devouring Memories, and sweet sentiments unfilled. Spurned on by an intense yearning, for something it cannot yet perceive. When it reaches out its hand, will you take it?",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":[]
                    },
                },
                "fallWarning":{
                    "node1":{
                        "dialogue": "WARNING! FALL HAZARD!",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":["node2"]
                    },
                    "node2":{
                        "dialogue": "Beware of holes in the floor, as the lower part of this cave is rather deep.",
                        "profile":"signLoop",
                        "textvoice":"default",
                        "children":[]
                    },
                },
                "secretSighting1":{
                     "node1":{
                        "dialogue": "theres nothing here besides a few barrels",
                        "profile":"blank",
                        "textvoice":"default",
                        "children":["node2"]
                    },
                    "node2":{
                        "dialogue": "...",
                        "profile":"blank",
                        "textvoice":"default",
                        "children":["node3"]
                    },
                    "node3":{
                        "dialogue": "you feel like it was trying to tell you something...",
                        "profile":"blank",
                        "textvoice":"default",
                        "children":[]
                    },
                },
                "lockwoodEntranceSign":{
                     "node1":{
                        "dialogue": "Gathered Friends...",
                        "profile":"blank",
                        "textvoice":"default",
                        "children":["node2"]
                    },
                    "node2":{
                        "dialogue": "This marks the place where our comunity was first born.",
                        "profile":"blank",
                        "textvoice":"default",
                        "children":["node3"]
                    },
                    "node3":{
                        "dialogue": "built on the desires of our hearts, to make a new home. ",
                        "profile":"blank",
                        "textvoice":"default",
                        "children":["node4"]
                    },
                    "node4":{
                        "dialogue": "I will cherish this safe haven for all of eternity. ",
                        "profile":"blank",
                        "textvoice":"default",
                        "children":["node5"]
                    },
                    "node5":{
                        "dialogue": "Thank you for helping my dream come true. ",
                        "profile":"blank",
                        "textvoice":"default",
                        "children":[]
                    },
                },
            },
            "Fervor":{
                "love1":{
                    "node1":{
                        "dialogue": "From an unlikely place she came, to steal me away from my sorrow and pain. Our friendship helped clear my eyes from the ties that kept me blind. The bond that was formed kept our hearts warm. Together we can withstand the worst of weather, even though we are not birds of the same feather.",
                        "profile":"blank",
                        "textvoice":"default",
                        "children":["node2"]
                    },
                    "node2":{
                        "dialogue": "For what brings us together is our love for one another. To keep each other safe from what one alone cannot see. As I change you, and you change me I begin to think about what the future could be with just you and me. Of sweet nights holding you close, and bright days sharing shattered sun rays.",
                        "profile":"blank",
                        "textvoice":"default",
                        "children":["node3"]
                    },
                    "node3":{
                        "dialogue": "Of long walks on the beach, and sunsets spent with sweet treats. Cause when I think about you,  I want these dreams to come true.  More than anything, my it reminds me of my love for you. So won't you come with me? To finally be free, and make these dreams a reality? Come escape with me hunny.",
                        "profile":"blank",
                        "textvoice":"default",
                        "children":[]
                    },
                },
                "redLooksGoodOnYou":{
                    "node1":{
                        "dialogue": "There's a little red book on the shelf. The cover of the book has a round spider with '88w88' as a face holding hands with an equally round human with a ':3' as a face. Will you read it?",
                        "profile":"blank",
                        "textvoice":"default",
                        "children":["node2"]
                    },
                    "node2":{
                        "dialogue": "I could tell he had something to give me.",
                        "profile":"blank",
                        "textvoice":"default",
                        "children":["node3"]
                    },
                    "node3":{
                        "dialogue": "( the spider girl and human sit atop a cliff overlooking the ocean.)",
                        "profile":"blank",
                        "textvoice":"default",
                        "children":["node4"]
                    },
                    "node4":{
                        "dialogue": "the nervious energy was impossible to ignore. i knew it would be special.",
                        "profile":"blank",
                        "textvoice":"default",
                        "children":["node5"]
                    },
                    "node5":{
                        "dialogue": "as he messed with it in his hand I craned my neck to see what it was.",
                        "profile":"blank",
                        "textvoice":"default",
                        "children":["node6"]
                    },
                    "node6":{
                        "dialogue": "(the spider girl can be seen peaking behind a wall staring at what the human has in there hands.)",
                        "profile":"blank",
                        "textvoice":"default",
                        "children":["node7"]
                    },
                    "node7":{
                        "dialogue": "gimmi! gimmi! gimmi!",
                        "profile":"blank",
                        "textvoice":"default",
                        "children":["node8"]
                    },
                    "node8":{
                        "dialogue": "(the spider girl can bee seen hopping up and down excitedly)",
                        "profile":"blank",
                        "textvoice":"default",
                        "children":["node9"]
                    },
                    "node9":{
                        "dialogue": "we leaned in to kiss and he tells me 'i wrote a little note for you'",
                        "profile":"blank",
                        "textvoice":"default",
                        "children":["node10"]
                    },
                    "node10":{
                        "dialogue": "do you want me to share with the class or read to myself?  'to yourself' he said shyly. ",
                        "profile":"blank",
                        "textvoice":"default",
                        "children":["node11"]
                    },
                    "node11":{
                        "dialogue": "I read it and was taken back by what he had said, this is the sweetest thing anyone has ever done for me. ",
                        "profile":"blank",
                        "textvoice":"default",
                        "children":["node3"]
                    },
                    "node11":{
                        "dialogue": "red looks good on you...",
                        "profile":"blank",
                        "textvoice":"default",
                        "children":["node3"]
                    },
                },
                "hunnyBun":{
                    "node1":{
                        "dialogue": "hey baby i know its a little late but im here writing this note to tell you how much you mean to me and how amazing you are. oh yeah P.S. by a little late i mean It's like....",
                        "profile":"blank",
                        "textvoice":"default",
                        "children":["node2"]
                    },
                    "node2":{
                        "dialogue": "(theres a chunk of text scribbled out)",
                        "profile":"blank",
                        "textvoice":"default",
                        "children":["node3"]
                    },
                    "node3":{
                        "dialogue": "i know ;_; i'm bad. ok ok back on track. my precious boy, that first day we hung out and sat on that bench i knew i had feelings for you. you have treated me better than 99% of the people I've met in life and i'm so thankful for having you in my life.",
                        "profile":"blank",
                        "textvoice":"default",
                        "children":["node4"]
                    },
                    "node4":{
                        "dialogue": "you give me so much love and motivation that it helps me get out of bed. I look forward to spending so many more days with you in my life. you bring the best out of me babe, so I thank you for that.",
                        "profile":"blank",
                        "textvoice":"default",
                        "children":["node3"]
                    },
                    "node5":{
                        "dialogue": "I love you to the deepest reaches of my heart!! ~hunnybun",
                        "profile":"blank",
                        "textvoice":"default",
                        "children":["node3"]
                    },
                }


            },
        },

        "istara":{
            "Behavior1":{
                "istaraCaveDialogue1":{
                    "node1":{
                        "dialogue": "Oh? ",
                        "profile":"istaraNeutral",
                        "textvoice":"mediumVoice",
                        "children":["node2"]
                    },
                    "node2":{
                        "dialogue": "Lucky me, it seems I have an uninvited guest to my lair.",
                        "profile":"istaraStarEyes",
                        "textvoice":"mediumVoice",
                        "children":["node3"]
                    },
                    "node3":{
                        "dialogue": "Feel free to stay a while, it's nice to have some company.",
                        "profile":"istaraHappy",
                        "textvoice":"mediumVoice",
                        "children":["node4"]
                    },
                    "node4":{
                        "dialogue": "I hope you don't find me too intimidating.",
                        "profile":"istaraHappy",
                        "textvoice":"mediumVoice",
                        "children":["node5"]
                    },
                    "node5":{
                        "dialogue": "Shame my lair is quite sparse. I'm in the process of moving in.",
                        "profile":"istaraKO",
                        "textvoice":"mediumVoice",
                        "children":[]
                    },

                },
                "istaraCaveDialogue2":{
                    "node1":{
                        "dialogue": "Oh?",
                        "profile":"istaraNeutral",
                        "textvoice":"mediumVoice",
                        "children":["node2"]
                    },
                    "node2":{
                        "dialogue": "I'm glad you're sticking around. It's nice to have some company. ",
                        "profile":"istaraHappy",
                        "textvoice":"mediumVoice",
                        "children":["node3"]
                    },
                    "node3":{
                        "dialogue": "I'm in the process of moving. Which is a pain.",
                        "profile":"istaraKO",
                        "textvoice":"mediumVoice",
                        "children":["node4"]
                    },
                    "node4":{
                        "dialogue": "I really wish I had some loyal cobrabolds to help me get settled.",
                        "profile":"istaraNeutral",
                        "textvoice":"mediumVoice",
                        "children":["node5"]
                    },
                    "node5":{
                        "dialogue": "Sadly I haven't had the time to go on a hunt for feral curses.",
                        "profile":"istaraSquish",
                        "textvoice":"mediumVoice",
                        "children":["node6"]
                    },
                    "node6":{
                        "dialogue": "I can curse them so that they become my sweet loyal cobrabolds.",
                        "profile":"istaraNeutral",
                        "textvoice":"mediumVoice",
                        "children":["node7"]
                    },
                    "node7":{
                        "dialogue": "Hmmm. You're not cursed. Would you like to become one of my cobrabolds?",
                        "profile":"istaraStarEyes",
                        "textvoice":"mediumVoice",
                        "children":["node8"]
                    },
                    "node8":{
                        "dialogue": "Even though you will serve me, I promise that I will keep you safe.",
                        "profile":"istaraHappy",
                        "textvoice":"mediumVoice",
                        "children":["node9"]
                    },
                    "node9":{
                        "dialogue": "My cobrabolds are very precious to me.",
                        "profile":"istaraHeartEyes",
                        "textvoice":"mediumVoice",
                        "children":["node10"]
                    },
                    "node10":{
                        "dialogue": "I promise you will be well taken care of.",
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
                        "dialogue": "I'm so happy to hear that! You should get undressed.",
                        "profile":"istaraHappy",
                        "textvoice":"mediumVoice",
                        "children":[ "node13"]
                    },
                    "node13":{
                        "dialogue": "You're the perfect size to fit comfortably in my womb.",
                        "profile":"istaraHappy",
                        "textvoice":"mediumVoice",
                        "children":["node14"]
                    },
                    "node14":{
                        "dialogue": "Just relax and slide into your new mistress's belly.",
                        "profile":"istaraHeartEyes",
                        "textvoice":"mediumVoice",
                        "children":["node15"]
                    },
                    "node15":{
                        "dialogue": "It'll work its magic and you will be a cute cobrabold in no time.",
                        "profile":"istaraHappy",
                        "textvoice":"mediumVoice",
                        "children":["node16"]
                    },
                    "node16":{
                        "dialogue": "Awww you're so cute down there.",
                        "profile":"istaraHappy",
                        "textvoice":"mediumVoice",
                        "children":["node17"]
                    },
                    "node17":{
                        "dialogue": "Just relax, I'll push you inside me.",
                        "profile":"istaraHappy",
                        "textvoice":"mediumVoice",
                        "children":["node18"]
                    },
                    "node18":{
                        "dialogue": "Huffff so full...",
                        "profile":"istaraSquish",
                        "textvoice":"mediumVoice",
                        "children":["node19"]
                    },
                    "node19":{
                        "dialogue": "Ohhhhhhh...... huff... I was a bit tighter than I thought.",
                        "profile":"istaraHeartEyes",
                        "textvoice":"mediumVoice",
                        "children":["node20"]
                    },
                    "node20":{
                        "dialogue": "Huffffff....",
                        "profile":"istaraHappy",
                        "textvoice":"mediumVoice",
                        "children":["node21"]
                    },
                    "node21":{
                        "dialogue": "Aaahhhhh..... I feel you settling into my womb.",
                        "profile":"istaraHeartEyes",
                        "textvoice":"mediumVoice",
                        "children":["node22"]
                    },
                    "node22":{
                        "dialogue": "You look so cute on me I might just keep you in there a while...",
                        "profile":"istaraSquish",
                        "textvoice":"mediumVoice",
                        "children":["node23"]
                    },
                    "node23":{
                        "dialogue": "That's it give yourself up to your new mistress. I can feel you changing.",
                        "profile":"istaraSquish",
                        "textvoice":"mediumVoice",
                        "children":["node24"]
                    },
                    "node24":{
                        "dialogue": "Huffffff....",
                        "profile":"istaraSquish",
                        "textvoice":"mediumVoice",
                        "children":["node25"]
                    },
                    "node25":{
                        "dialogue": "Ohhhhhhh......",
                        "profile":"istaraHappy",
                        "textvoice":"mediumVoice",
                        "children":["node26"]
                    },
                    "node26":{
                        "dialogue": "I'll keep you safe, my precious child.",
                        "profile":"istaraHappy",
                        "textvoice":"mediumVoice",
                        "children":[]
                    },
                    "node27":{
                        "dialogue": "Such a shame...",
                        "profile":"istaraAnnoyed",
                        "textvoice":"mediumVoice",
                        "children":["node28"]
                    },
                    "node28":{
                        "dialogue": "I'll be here if you change your mind....",
                        "profile":"istaraSad",
                        "textvoice":"mediumVoice",
                        "children":[]
                    },
                }
            },
            "Behavior2":{
                
                "dreamView":{
                    "node1":{
                        "dialogue": "Hmmm. You're not cursed. Would you like to become one of my cobrabolds?",
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
                        "dialogue": "I'm so happy to hear that! You should get undressed.",
                        "profile":"istaraHappy",
                        "textvoice":"mediumVoice",
                        "children":[ "node13"]
                    },
                    "node13":{
                        "dialogue": "You're the perfect size to fit comfortably in my womb.",
                        "profile":"istaraHappy",
                        "textvoice":"mediumVoice",
                        "children":["node14"]
                    },
                    "node14":{
                        "dialogue": "Just relax and slide into your new mistress's belly.",
                        "profile":"istaraHeartEyes",
                        "textvoice":"mediumVoice",
                        "children":["node15"]
                    },
                    "node15":{
                        "dialogue": "It'll work its magic and you will be a cute cobrabold in no time.",
                        "profile":"istaraHappy",
                        "textvoice":"mediumVoice",
                        "children":["node16"]
                    },
                    "node16":{
                        "dialogue": "Awww you're so cute down there.",
                        "profile":"istaraHappy",
                        "textvoice":"mediumVoice",
                        "children":["node17"]
                    },
                    "node17":{
                        "dialogue": "Just relax, I'll push you inside me.",
                        "profile":"istaraHappy",
                        "textvoice":"mediumVoice",
                        "children":["node18"]
                    },
                    "node18":{
                        "dialogue": "Huffff so full...",
                        "profile":"istaraSquish",
                        "textvoice":"mediumVoice",
                        "children":["node19"]
                    },
                    "node19":{
                        "dialogue": "Ohhhhhhh...... huff... I was a bit tighter than I thought.",
                        "profile":"istaraHeartEyes",
                        "textvoice":"mediumVoice",
                        "children":["node20"]
                    },
                    "node20":{
                        "dialogue": "Huffffff....",
                        "profile":"istaraHappy",
                        "textvoice":"mediumVoice",
                        "children":["node21"]
                    },
                    "node21":{
                        "dialogue": "Aaahhhhh..... I feel you settling into my womb.",
                        "profile":"istaraHeartEyes",
                        "textvoice":"mediumVoice",
                        "children":["node22"]
                    },
                    "node22":{
                        "dialogue": "You look so cute on me I might just keep you in there a while...",
                        "profile":"istaraSquish",
                        "textvoice":"mediumVoice",
                        "children":["node23"]
                    },
                    "node23":{
                        "dialogue": "That's it give yourself up to your new mistress. I can feel you changing.",
                        "profile":"istaraSquish",
                        "textvoice":"mediumVoice",
                        "children":["node24"]
                    },
                    "node24":{
                        "dialogue": "Huffffff....",
                        "profile":"istaraSquish",
                        "textvoice":"mediumVoice",
                        "children":["node25"]
                    },
                    "node25":{
                        "dialogue": "Ohhhhhhh......",
                        "profile":"istaraHappy",
                        "textvoice":"mediumVoice",
                        "children":["node26"]
                    },
                    "node26":{
                        "dialogue": "I'll keep you safe, my precious child.",
                        "profile":"istaraHappy",
                        "textvoice":"mediumVoice",
                        "children":[]
                    },
                    "node27":{
                        "dialogue": "Such a shame...",
                        "profile":"istaraAnnoyed",
                        "textvoice":"mediumVoice",
                        "children":["node28"]
                    },
                    "node28":{
                        "dialogue": "I'll be here if you change your mind....",
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
                        "dialogue": "What the..... How did you get in here? ",
                        "profile":"lunaNeutral",
                        "textvoice":"lightVoice",
                        "children":["node3"]
                    },"node3":{
                        "dialogue": "You should probably tell me how you got in here.",
                        "profile":"lunaKO",
                        "textvoice":"lightVoice",
                        "children":["node4"]
                    },"node4":{
                        "dialogue": "This place should be hard to reach.",
                        "profile":"lunaHappy",
                        "textvoice":"lightVoice",
                        "children":["node5"]
                    },"node5":{
                        "dialogue": "Oh, but don't worry, I'm not opposed to visitors. ",
                        "profile":"lunaFingerTouch",
                        "textvoice":"lightVoice",
                        "children":["node6"]
                    },"node6":{
                        "dialogue": "Anyway I have to get back to my research. The exit's by the heater.",
                        "profile":"lunaStarEyes",
                        "textvoice":"lightVoice",
                        "children":[]
                    },
                },

                "lunaDevDialogueMale1":{
                    "node1":{
                        "dialogue": "Oh? Still sticking around?",
                        "profile":"lunaNeutral",
                        "textvoice":"lightVoice",
                        "children":["node2"]
                    },"node2":{
                        "dialogue": "You're quite the cute boy. You should be careful.",
                        "profile":"lunaFingerTouch",
                        "textvoice":"lightVoice",
                        "children":["node3"]
                    },"node3":{
                        "dialogue": "The cursed love eating and transforming guys like you.",
                        "profile":"lunaNeutral",
                        "textvoice":"lightVoice",
                        "children":["node4"]
                    },"node4":{
                        "dialogue": "I was human once before I washed up here. ",
                        "profile":"lunaNeutral",
                        "textvoice":"lightVoice",
                        "children":["node5"]
                    },"node5":{
                        "dialogue": "One of the bats caught me... ",
                        "profile":"lunaFingerTouch",
                        "textvoice":"lightVoice",
                        "children":["node6"]
                    },"node6":{
                        "dialogue": "But I got lucky, and didn't lose my mind.",
                        "profile":"lunaStarEyes",
                        "textvoice":"lightVoice",
                        "children":["node7"]
                    },"node7":{
                        "dialogue": "My appearance quite different from theirs.",
                        "profile":"lunaNeutral",
                        "textvoice":"lightVoice",
                        "children":["node8"]
                    },"node8":{
                        "dialogue": "I wonder why that is.",
                        "profile":"lunaHappy",
                        "textvoice":"lightVoice",
                        "children":[]
                    },
                },

                "lunaDevDialogueFemale1":{
                     "node1":{
                        "dialogue": "Oh? still sticking around?",
                        "profile":"lunaNeutral",
                        "textvoice":"lightVoice",
                        "children":["node2"]
                    },"node2":{
                        "dialogue": "You're quite the cute girl. You should be careful.",
                        "profile":"lunaFingerTouch",
                        "textvoice":"lightVoice",
                        "children":["node3"]
                    },"node3":{
                        "dialogue": "The cursed love eating and transforming girls like you.",
                        "profile":"lunaNeutral",
                        "textvoice":"lightVoice",
                        "children":["node4"]
                    },"node4":{
                        "dialogue": "I was human once before I washed up here. ",
                        "profile":"lunaNeutral",
                        "textvoice":"lightVoice",
                        "children":["node5"]
                    },"node5":{
                        "dialogue": "One of the bats caught me... ",
                        "profile":"lunaFingerTouch",
                        "textvoice":"lightVoice",
                        "children":["node6"]
                    },"node6":{
                        "dialogue": "But I got lucky, and didnt lose my mind.",
                        "profile":"lunaStarEyes",
                        "textvoice":"lightVoice",
                        "children":["node7"]
                    },"node7":{
                        "dialogue": "My appearance quite different from theirs.",
                        "profile":"lunaNeutral",
                        "textvoice":"lightVoice",
                        "children":["node8"]
                    },"node8":{
                        "dialogue": "I wonder why that is.",
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
                        "dialogue": "What the... Oh no. You're back...",
                        "profile":"lunaNeutral",
                        "textvoice":"lightVoice",
                        "children":["node3"]
                    },"node3":{
                        "dialogue": "You should probably tell me how you got in here, if something weird happened.",
                        "profile":"lunaKO",
                        "textvoice":"lightVoice",
                        "children":["node4"]
                    },"node4":{
                        "dialogue": "This place should be hard to reach, but it might no longer be.",
                        "profile":"lunaHappy",
                        "textvoice":"lightVoice",
                        "children":["node5"]
                    },"node5":{
                        "dialogue": "If you got in here safely however, its probably fine. ",
                        "profile":"lunaFingerTouch",
                        "textvoice":"lightVoice",
                        "children":["node6"]
                    },"node6":{
                        "dialogue": "Anyway, Make your self comfortable if you wish. Exit's by the heater. ",
                        "profile":"lunaStarEyes",
                        "textvoice":"lightVoice",
                        "children":[]
                    },
                },
                "lunaDevDialogue2":{
                    "node1":{
                        "dialogue": "Oh? Sticking Around?  ",
                        "profile":"lunaNeutral",
                        "textvoice":"lightVoice",
                        "children":["node2"]
                    },"node2":{
                        "dialogue": "Make yourself comfortable. ",
                        "profile":"lunaHappy",
                        "textvoice":"lightVoice",
                        "children":["node3"]
                    },"node3":{
                        "dialogue": "I have been trying to clear a path to Lockwood in my spare time.",
                        "profile":"lunaKO",
                        "textvoice":"lightVoice",
                        "children":["node4"]
                    },"node4":{
                        "dialogue": "It's a nice town in the trees. Plenty of folks like me reside there.",
                        "profile":"lunaHappy",
                        "textvoice":"lightVoice",
                        "children":["node5"]
                    },"node5":{
                        "dialogue": "Progress is slow however, due to the cursed. Even though I'm cursed, they still try to eat me. ",
                        "profile":"lunaAngryEyes",
                        "textvoice":"lightVoice",
                        "children":["node6"]
                    },"node6":{
                        "dialogue": "It's almost like they know I'm not one of them.",
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
                        "dialogue": "Oh, hello Human!",
                        "profile":"lunaStarEyes",
                        "textvoice":"lightVoice",
                        "children":["node2"]
                    },"node2":{
                        "dialogue": "My name is Lunalyst, and I'm sure you can tell I'm not quite human anymore.",
                        "profile":"lunaHappy",
                        "textvoice":"lightVoice",
                        "children":["node3"]
                    },"node3":{
                        "dialogue": "However I'm not gona try and eat or fornicate with you, promise.",
                        "profile":"lunaKO",
                        "textvoice":"lightVoice",
                        "children":["node4"]
                    },"node4":{
                        "dialogue": "Just a humble maid helping those in need.",
                        "profile":"lunaFingerTouch",
                        "textvoice":"lightVoice",
                        "children":["node5"]
                    },"node5":{
                        "dialogue": "Unfortinately, the gate to lockwood is closed.",
                        "profile":"lunaKO",
                        "textvoice":"lightVoice",
                        "children":["node6"]
                    },"node6":{
                        "dialogue": "maybe some day soon it will open.",
                        "profile":"lunaStarEyes",
                        "textvoice":"lightVoice",
                        "children":[]
                    },
                },
                "lunaCTWDialogue2":{
                    "node1":{
                        "dialogue": "Hello again. ",
                        "profile":"lunaHappy",
                        "textvoice":"lightVoice",
                        "children":["node2"]
                    },"node2":{
                        "dialogue": "I hope your doing well!",
                        "profile":"lunaHappy",
                        "textvoice":"lightVoice",
                        "children":["node4"]
                    },"node4":{
                        "dialogue": "How can I assist you?  ",
                        "profile":"lunaHappy",
                        "textvoice":"lightVoice",
                        "children":["node5","node10","node12","node13"]
                    },"node5":{
                        "dialogue": "Oh? Of course! ",
                        "profile":"lunaHappy",
                        "textvoice":"lightVoice",
                        "children":["node6"]
                    },"node6":{
                        "dialogue": "Come here. Everythings going to be alright. ",
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
                        "dialogue": "Stay safe out there.",
                        "profile":"lunaFingerTouch",
                        "textvoice":"lightVoice",
                        "children":[]
                    },"node10":{
                        "dialogue": "Supplies? Sure we can do some trading.",
                        "profile":"lunaHappy",
                        "textvoice":"lightVoice",
                        "children":["node11"]
                    },"node11":{
                        "dialogue": "Here's what I got.",
                        "profile":"lunaHappy",
                        "textvoice":"lightVoice",
                        "children":[]
                    },"node12":{
                        "dialogue": "Goodbye.",
                        "profile":"lunaHappy",
                        "textvoice":"lightVoice",
                        "children":[]
                    },"node13":{
                        "dialogue": "The door to Lockwood is currently close and I am not sure where everyone is. ",
                        "profile":"lunaNeutral",
                        "textvoice":"lightVoice",
                        "children":["node14"]
                    },"node14":{
                        "dialogue": "I just get this feeling, that this is going to be the beginning of something special.",
                        "profile":"lunaHappy",
                        "textvoice":"lightVoice",
                        "children":["node15"]
                    },"node15":{
                        "dialogue": "I get the impression that your going to get yourself in danger. ",
                        "profile":"lunaFingerTouch",
                        "textvoice":"lightVoice",
                        "children":["node16"]
                    },"node16":{
                        "dialogue": "and when all hope seems lost... ",
                        "profile":"lunaNeutral",
                        "textvoice":"lightVoice",
                        "children":["node17"]
                    },"node17":{
                        "dialogue": "someone will be there for you, in your time of need. ",
                        "profile":"lunaStarEyes",
                        "textvoice":"lightVoice",
                        "children":[]
                    }
                }
               

                

            },
            "clearingTheWay":{
                
            }

        },
        "vivian":{
            "Behavior1":{
                "rummaging":{
                    "node1":{
                        "dialogue": "These chests are just full of dust and junk. Come on theres got to be something good...",
                        "profile":"vivianNeutral",
                        "textvoice":"lightVoice",
                        "children":["node2"]
                    },
                    "node2":{
                        "dialogue": "Oh!",
                        "profile":"vivianStarEyes",
                        "textvoice":"lightVoice",
                        "children":["node3"]
                    },
                    "node3":{
                        "dialogue": "Ah, wait, just a lantern.",
                        "profile":"vivianNeutral",
                        "textvoice":"lightVoice",
                        "children":["node4"]
                    },
                    "node4":{
                        "dialogue": "Hmm, good condition, wonder if anyone would want to buy it...",
                        "profile":"vivianSmug",
                        "textvoice":"lightVoice",
                        "children":["node5"]
                    },
                    "node5":{
                        "dialogue": "AH!",
                        "profile":"vivianShocked",
                        "textvoice":"lightVoice",
                        "children":["node6"]
                    },
                    "node6":{
                        "dialogue": "Dont scare me like that! Tch, figures it’s a human.",
                        "profile":"vivianAngry",
                        "textvoice":"lightVoice",
                        "children":["node7"]
                    },
                    "node7":{
                        "dialogue": "Say… Would you like to buy this lantern?",
                        "profile":"vivianHappy",
                        "textvoice":"lightVoice",
                        "children":["nodeA"]
                    },
                     "nodeA":{
                        "dialogue": "Last one in stock, just 999 shells! ",
                        "profile":"vivianHappy",
                        "textvoice":"lightVoice",
                        "children":["node8","node14","node20"]
                    },
                    //three branches for dialogue firs is if the player has enough money
                    "node8":{
                        "dialogue": "...Oh, really?!? Didn’t think you had that much...",
                        "profile":"vivianShocked",
                        "textvoice":"lightVoice",
                        "children":["node9"]
                    },
                    "node9":{
                        "dialogue": "Ah, I mean",
                        "profile":"vivianNeutral",
                        "textvoice":"lightVoice",
                        "children":["node10"]
                    },
                    "node10":{
                        "dialogue": "Deal! Here you go!",
                        "profile":"vivianSmug",
                        "textvoice":"lightVoice",
                        "children":["node11"]
                    },
                    "node11":{
                        "dialogue": "Well, now that business is done, I have another offer for you. ",
                        "profile":"vivianHappy",
                        "textvoice":"lightVoice",
                        "children":["node12"]
                    },
                    "node12":{
                        "dialogue": "Do you like games?",
                        "profile":"vivianStarEyes",
                        "textvoice":"lightVoice",
                        "children":["node13"]
                    },
                    "node13":{
                        "dialogue": "If you come back in a bit, I will have a little game set up just for a cutie like you.",
                        "profile":"vivianSmugTongue",
                        "textvoice":"lightVoice",
                        "children":["node32"]
                    },

                    //player says yes but doesnt have enough money
                    "node14":{
                        "dialogue": "Uh, you seem to be a little short of the price. ",
                        "profile":"vivianNeutral",
                        "textvoice":"lightVoice",
                        "children":["node15"]
                    },
                    "node15":{
                        "dialogue": "Sorry, but no special discounts. ",
                        "profile":"vivianHappy",
                        "textvoice":"lightVoice",
                        "children":["node16"]
                    },
                    "node16":{
                        "dialogue": "Hmm, I COULD be willing to part with it if you are willing to play a little game of mine.  ",
                        "profile":"vivianStarEyes",
                        "textvoice":"lightVoice",
                        "children":["node17"]
                    },
                    "node17":{
                        "dialogue": "Win, and the lantern is yours! ",
                        "profile":"vivianHappy",
                        "textvoice":"lightVoice",
                        "children":["node18"]
                    },
                    "node18":{
                        "dialogue": "Lose and... ",
                        "profile":"vivianSmug",
                        "textvoice":"lightVoice",
                        "children":["node19"]
                    },
                    "node19":{
                        "dialogue": "Well, let’s just say that I’ll get a prize of my own. ",
                        "profile":"vivianSmugTongue",
                        "textvoice":"lightVoice",
                        "children":["node32"]
                    },
                    
                    //player says no
                    "node20":{
                        "dialogue": "Hmph, well then good luck getting through those dark caves. Come on, I am sure you can find enough to buy it. ",
                        "profile":"vivianAngry",
                        "textvoice":"lightVoice",
                        "children":["node21"]
                    },
                    "node21":{
                        "dialogue": "Or... Perhaps you would like to try and win it, hm?",
                        "profile":"vivianSmug",
                        "textvoice":"lightVoice",
                        "children":["node22"]
                    },
                    "node22":{
                        "dialogue": "I have a fun game we could play, and if you win, I will let you have the lantern for free!",
                        "profile":"vivianStarEyes",
                        "textvoice":"lightVoice",
                        "children":["node23"]
                    },
                    "node23":{
                        "dialogue": "But if you lose...",
                        "profile":"vivianSmug",
                        "textvoice":"lightVoice",
                        "children":["node24"]
                    },
                    "node24":{
                        "dialogue": "Heh, let’s just say the lantern won’t be the only thing I’ll be keeping. ",
                        "profile":"vivianWink",
                        "textvoice":"lightVoice",
                        "children":["node25"]
                    },
                    "node25":{
                        "dialogue": "So, up for a game?",
                        "profile":"vivianSmug",
                        "textvoice":"lightVoice",
                        "children":["node26","node29"]
                    },
                    // extra branch if they refuse. if they say yess to the game
                    "node26":{
                        "dialogue": "Hah, great! Haven’t had fun like this in forever.",
                        "profile":"vivianSmug",
                        "textvoice":"lightVoice",
                        "children":["node27"]
                    },
                    "node27":{
                        "dialogue": "But uh, first let me clean up this mess of a shack. Come back in a little and I’ll have everything set up.",
                        "profile":"vivianHappy",
                        "textvoice":"lightVoice",
                        "children":["node28"]
                    },
                    "node28":{
                        "dialogue": "Go on, shoo shoo!",
                        "profile":"vivianSquish",
                        "textvoice":"lightVoice",
                        "children":[]
                    },

                    //no to game
                    "node29":{
                        "dialogue": "Aww, had my hopes up that you would be fun.",
                        "profile":"vivianKO",
                        "textvoice":"lightVoice",
                        "children":["node30"]
                    },
                    "node30":{
                        "dialogue": "Oh well. If you get enough shells, or you change your mind, either offer will still be available for you.",
                        "profile":"vivianNeutral",
                        "textvoice":"lightVoice",
                        "children":["node31"]
                    },
                    "node31":{
                        "dialogue": "But for now... Get outta here before I get hungry.",
                        "profile":"vivianSmug",
                        "textvoice":"lightVoice",
                        "children":[]
                    },

                    //dialogue for yes in first dialogue branch
                    "node32":{
                        "dialogue": "Let me clean up this mess of a shack. Come back in a little and I’ll have everything set up.",
                        "profile":"vivianSmug",
                        "textvoice":"lightVoice",
                        "children":["node28"]
                    },
                    
   
                },
                "cleaningRich":{
                    "node1":{
                        "dialogue": "You're still here Money Bags?",
                        "profile":"vivianHappy",
                        "textvoice":"lightVoice",
                        "children":["node2"]
                    },
                    "node2":{
                        "dialogue": "Gosh give me a little bit of time. I'll have somthing fun for you soon enough.",
                        "profile":"vivianSmug",
                        "textvoice":"lightVoice",
                        "children":["node3"]
                    },
                    
                    "node3":{
                        "dialogue": "Now go on, shoo shoo!",
                        "profile":"vivianSquish",
                        "textvoice":"lightVoice",
                        "children":[]
                    },
                },

                "cleaningNice":{
                    "node1":{
                        "dialogue": "You're still here? Can't you give a girl some privacy?",
                        "profile":"vivianAngry",
                        "textvoice":"lightVoice",
                        "children":["node2"]
                    },
                    "node2":{
                        "dialogue": "Let me clean up this mess of a shack. Come back in a little and I will have everything set up.",
                        "profile":"vivianSmug",
                        "textvoice":"lightVoice",
                        "children":["node3"]
                    },
                    
                    "node3":{
                        "dialogue": "Go on, shoo shoo!",
                        "profile":"vivianSquish",
                        "textvoice":"lightVoice",
                        "children":[]
                    },
                },
                "cleaningMean":{
                    "node1":{
                        "dialogue": "Why are you still here? ",
                        "profile":"vivianAngry",
                        "textvoice":"lightVoice",
                        "children":["node2"]
                    },
                    "node2":{
                        "dialogue": "Go on, shoo shoo!",
                        "profile":"vivianSquish",
                        "textvoice":"lightVoice",
                        "children":[]
                    },
                },
                
            },
            "Behavior2":{
                "minigameIntro":{
                    "node1":{
                        "dialogue": "Oh! You're back.",
                        "profile":"vivianStarEyes",
                        "textvoice":"lightVoice",
                        "children":[ "node3"]
                    },
                    // based on previous encounter use logic in flags to tell how to progress the node.
                    "node3":{
                        "dialogue": "Just finished setting everything up.",
                        "profile":"vivianNeutral",
                        "textvoice":"lightVoice",
                        "children":["node4"]
                    },
                    "node4":{
                        "dialogue": "Now, what would you like to do?",
                        "profile":"vivianNeutral",
                        "textvoice":"lightVoice",
                        "children":["node5","node6","node8","node9","node15"]
                    },

                    //i want to play your game
                    "node5":{
                        "dialogue": "Heh, lovely. Give me a sec to get it ready.",
                        "profile":"vivianSmugTongue",
                        "textvoice":"lightVoice",
                        "children":[]
                    },

                    //branch for explaining game 
                    "node6":{
                        "dialogue": "There will be three chests and all you need to do is open the correct one.",
                        "profile":"vivianSmugTongue",
                        "textvoice":"lightVoice",
                        "children":["node7"]
                    },
                    "node7":{
                        "dialogue": "So, would you like to play?",
                        "profile":"vivianSmugTongue",
                        "textvoice":"lightVoice",
                        "children":["node20","node21"]
                    },

                    //yes to game 
                    "node20":{
                        "dialogue": "Perfect. No peeking now, and choose carefully, hehe.",
                        "profile":"vivianSmug",
                        "textvoice":"lightVoice",
                        "children":[]
                    },

                    //no to game
                    "node21":{
                        "dialogue": "Awwww... You're no fun.",
                        "profile":"vivianSquish",
                        "textvoice":"lightVoice",
                        "children":[]
                    },



                    //i want to buy something
                    "node8":{
                        "dialogue": "Alright. Here is what I got for you today. ",
                        "profile":"vivianHappy",
                        "textvoice":"lightVoice",
                        "children":[]
                    },

                    //who are you?
                    "node9":{
                        "dialogue": "Me? ",
                        "profile":"vivianNeutral",
                        "textvoice":"lightVoice",
                        "children":["node10"]
                    },
                    "node10":{
                        "dialogue": "Well I’m just your local wandering wolf girl, Vivian.",
                        "profile":"vivianHappy",
                        "textvoice":"lightVoice",
                        "children":["node11"]
                    },
                    "node11":{
                        "dialogue": "Just going around to different places, finding cool items, maybe make some money, find some nice friends, or perhaps find some cute snack, heh.",
                        "profile":"vivianSmug",
                        "textvoice":"lightVoice",
                        "children":["node12"]
                    },
                    "node12":{
                        "dialogue": "Ah, don't worry, I won t eat you now, since you're a customer.",
                        "profile":"vivianSquish",
                        "textvoice":"lightVoice",
                        "children":["node13"]
                    },
                    "node13":{
                        "dialogue": "Besides, it is much more fun when it is a surprise.",
                        "profile":"vivianSmug",
                        "textvoice":"lightVoice",
                        "children":["node14"]
                    },
                    "node14":{
                        "dialogue": "You definitely look pretty filling though...",
                        "profile":"vivianSmugTongue",
                        "textvoice":"lightVoice",
                        "children":[]
                    },

                    //nothing im just looking around
                    "node15":{
                        "dialogue": "I see...",
                        "profile":"vivianSmug",
                        "textvoice":"lightVoice",
                        "children":["node16"]
                    },
                    "node16":{
                        "dialogue": "Well, you know where to find me.",
                        "profile":"vivianHappy",
                        "textvoice":"lightVoice",
                        "children":["node17"]
                    },
                    "node17":{
                        "dialogue": "I will have my other treasure chests scattered around, so give those just 2 knocks.",
                        "profile":"vivianStarEyes",
                        "textvoice":"lightVoice",
                        "children":["node18"]
                    }, 
                    "node18":{
                        "dialogue": "I will know it is you as a customer.",
                        "profile":"vivianSmug",
                        "textvoice":"lightVoice",
                        "children":["node19"]
                    },
                    "node19":{
                        "dialogue": "Otherwise you will be my next lunch.",
                        "profile":"vivianSmugTongue",
                        "textvoice":"lightVoice",
                        "children":[]
                    },
                    
                },
                "minigameRepeat":{
                    "node1":{
                        "dialogue": "Oh! It's you agian.",
                        "profile":"vivianStarEyes",
                        "textvoice":"lightVoice",
                        "children":[ "node3"]
                    },
                    // based on previous encounter use logic in flags to tell how to progress the node.
                    "node3":{
                        "dialogue": "Welcome back.",
                        "profile":"vivianNeutral",
                        "textvoice":"lightVoice",
                        "children":["node4"]
                    },
                    "node4":{
                        "dialogue": "Now, what would you like to do?",
                        "profile":"vivianNeutral",
                        "textvoice":"lightVoice",
                        "children":["node5","node6","node8","node9","node15"]
                    },

                    //i want to play your game
                    "node5":{
                        "dialogue": "Heh, lovely. Give me a sec to get it ready.",
                        "profile":"vivianSmugTongue",
                        "textvoice":"lightVoice",
                        "children":[]
                    },

                    //branch for explaining game 
                    "node6":{
                        "dialogue": "There will be three chests and all you need to do is open the correct one.",
                        "profile":"vivianSmugTongue",
                        "textvoice":"lightVoice",
                        "children":["nodeB"]
                    },
                    "nodeB":{
                        "dialogue": "Since you already got the lantern... I'll just put some shell in the correct chest.",
                        "profile":"vivianSmugTongue",
                        "textvoice":"lightVoice",
                        "children":["node7"]
                    },
                    "node7":{
                        "dialogue": "So would you like to play?",
                        "profile":"vivianSmugTongue",
                        "textvoice":"lightVoice",
                        "children":["node20","node21"]
                    },

                    //yes to game 
                    "node20":{
                        "dialogue": "Perfect. No peeking now, and choose carefully, hehe.",
                        "profile":"vivianSmug",
                        "textvoice":"lightVoice",
                        "children":[]
                    },

                    //no to game
                    "node21":{
                        "dialogue": "Awww... You're no fun.",
                        "profile":"vivianSquish",
                        "textvoice":"lightVoice",
                        "children":[]
                    },

                    //i want to buy something
                    "node8":{
                        "dialogue": "Alright. Here is what I got for you today. ",
                        "profile":"vivianHappy",
                        "textvoice":"lightVoice",
                        "children":[]
                    },

                    //who are you?
                    "node9":{
                        "dialogue": "Me? ",
                        "profile":"vivianNeutral",
                        "textvoice":"lightVoice",
                        "children":["node10"]
                    },
                    "node10":{
                        "dialogue": "Well I’m just your local wandering wolf girl, Vivian.",
                        "profile":"vivianHappy",
                        "textvoice":"lightVoice",
                        "children":["node11"]
                    },
                    "node11":{
                        "dialogue": "Just going around to different places, finding cool items, maybe make some money, find some nice friends, or perhaps find some cute snack, heh.",
                        "profile":"vivianSmug",
                        "textvoice":"lightVoice",
                        "children":["node12"]
                    },
                    "node12":{
                        "dialogue": "Ah, don t worry, I won t eat you now, since you're a customer.",
                        "profile":"vivianSquish",
                        "textvoice":"lightVoice",
                        "children":["node13"]
                    },
                    "node13":{
                        "dialogue": "Besides, it is much more fun when it is a surprise.",
                        "profile":"vivianSmug",
                        "textvoice":"lightVoice",
                        "children":["node14"]
                    },
                    "node14":{
                        "dialogue": "You definitely look pretty filling though...",
                        "profile":"vivianSmugTongue",
                        "textvoice":"lightVoice",
                        "children":[]
                    },

                    //nothing im just looking around
                    "node15":{
                        "dialogue": "Alright...",
                        "profile":"vivianSmug",
                        "textvoice":"lightVoice",
                        "children":["node16"]
                    },
                    "node16":{
                        "dialogue": "Well, you know where to find me.",
                        "profile":"vivianHappy",
                        "textvoice":"lightVoice",
                        "children":["node17"]
                    },
                    "node17":{
                        "dialogue": "If you see any of my chest around, just knock twice.",
                        "profile":"vivianStarEyes",
                        "textvoice":"lightVoice",
                        "children":["node18"]
                    }, 
                    "node18":{
                        "dialogue": "Unless you wanna be my snack.",
                        "profile":"vivianSmug",
                        "textvoice":"lightVoice",
                        "children":[]
                    },

                   
                    
                },
                "minigameRepeatRich":{
                    "node1":{
                        "dialogue": "Oh! Money Bags!",
                        "profile":"vivianStarEyes",
                        "textvoice":"lightVoice",
                        "children":[ "node3"]
                    },
                    // based on previous encounter use logic in flags to tell how to progress the node.
                    "node3":{
                        "dialogue": "Welcome back, Cutie.",
                        "profile":"vivianNeutral",
                        "textvoice":"lightVoice",
                        "children":["node4"]
                    },
                    "node4":{
                        "dialogue": "How can I help you?",
                        "profile":"vivianNeutral",
                        "textvoice":"lightVoice",
                        "children":["node5","node6","node8","node9","node15"]
                    },

                    //i want to play your game
                    "node5":{
                        "dialogue": "Heh, lovely. Give me a sec to get it ready.",
                        "profile":"vivianSmugTongue",
                        "textvoice":"lightVoice",
                        "children":[]
                    },

                    //branch for explaining game 
                    "node6":{
                        "dialogue": "There will be three chests and all you need to do is open the correct one.",
                        "profile":"vivianSmugTongue",
                        "textvoice":"lightVoice",
                        "children":["nodeB"]
                    },
                    "nodeB":{
                        "dialogue": "Since you already bought the lantern... I'll just put some shell in the correct chest.",
                        "profile":"vivianSmugTongue",
                        "textvoice":"lightVoice",
                        "children":["node7"]
                    },
                    "node7":{
                        "dialogue": "So would you like to play?",
                        "profile":"vivianSmugTongue",
                        "textvoice":"lightVoice",
                        "children":["node20","node21"]
                    },

                    //yes to game 
                    "node20":{
                        "dialogue": "Perfect. No peeking now, and choose carefully, hehe.",
                        "profile":"vivianSmug",
                        "textvoice":"lightVoice",
                        "children":[]
                    },

                    //no to game
                    "node21":{
                        "dialogue": "Awww... You're no fun.",
                        "profile":"vivianSquish",
                        "textvoice":"lightVoice",
                        "children":[]
                    },

                    //i want to buy something
                    "node8":{
                        "dialogue": "Alright. Here is what I got for you today. ",
                        "profile":"vivianHappy",
                        "textvoice":"lightVoice",
                        "children":[]
                    },

                    //who are you?
                    "node9":{
                        "dialogue": "Me? ",
                        "profile":"vivianNeutral",
                        "textvoice":"lightVoice",
                        "children":["node10"]
                    },
                    "node10":{
                        "dialogue": "Well I’m just your local wandering wolf girl, Vivian.",
                        "profile":"vivianHappy",
                        "textvoice":"lightVoice",
                        "children":["node11"]
                    },
                    "node11":{
                        "dialogue": "Just going around to different places, finding cool items, maybe make some money, find some nice friends, or perhaps find some cute snack, heh.",
                        "profile":"vivianSmug",
                        "textvoice":"lightVoice",
                        "children":["node12"]
                    },
                    "node12":{
                        "dialogue": "Ah, don t worry, I won t eat you now, since you're a customer.",
                        "profile":"vivianSquish",
                        "textvoice":"lightVoice",
                        "children":["node13"]
                    },
                    "node13":{
                        "dialogue": "Besides, it is much more fun when it is a surprise.",
                        "profile":"vivianSmug",
                        "textvoice":"lightVoice",
                        "children":["node14"]
                    },
                    "node14":{
                        "dialogue": "You definitely look pretty filling though...",
                        "profile":"vivianSmugTongue",
                        "textvoice":"lightVoice",
                        "children":[]
                    },

                    //nothing im just looking around
                    "node15":{
                        "dialogue": "Ok",
                        "profile":"vivianSmug",
                        "textvoice":"lightVoice",
                        "children":["node16"]
                    },
                    "node16":{
                        "dialogue": "Well, you know where to find me, Money Bags.",
                        "profile":"vivianHappy",
                        "textvoice":"lightVoice",
                        "children":["node17"]
                    },
                    "node17":{
                        "dialogue": "If you see any of my chest around, just knock twice.",
                        "profile":"vivianStarEyes",
                        "textvoice":"lightVoice",
                        "children":["node18"]
                    }, 
                    "node18":{
                        "dialogue": "Unless you wanna be my tasty snack.",
                        "profile":"vivianSmug",
                        "textvoice":"lightVoice",
                        "children":[]
                    },

                   
                    
                },
                "overworldShopKnockM":{
                    //ask the player if they want to knock on chest. gives the option for 1 knock, 2 knock 3 knocks, or do nothing.
                    "node1":{
                        "dialogue": "Knock on the chest?",
                        "profile":"blank",
                        "textvoice":"default",
                        "children":[ "nodeJUNKT", 'node5','node6']
                    },


                    //logic if they skrew up the knock

                    "nodeJUNKT":{
                        "dialogue": "....",
                        "profile":"blank",
                        "textvoice":"default",
                        "children":["node2"]
                    },

                    "node2":{
                        "dialogue": "In all honesty, I was hoping you would mess up the knocking code.",
                        "profile":"vivianSmugTongue",
                        "textvoice":"lightVoice",
                        "children":["node3"]
                    },
                    "node3":{
                        "dialogue": "Thanks for being a dummy, human :3",
                        "profile":"vivianSmugTongue",
                        "textvoice":"lightVoice",
                        "children":["node4"]
                    },
                    //
                    "node4":{
                        "dialogue": "....",
                        "profile":"blank",
                        "textvoice":"default",
                        "children":["nodeB"]
                    },

                    "nodeB":{
                        "dialogue": "didn't expect you to put up so much of a fuss...",
                        "profile":"vivianSquish",
                        "textvoice":"lightVoice",
                        "children":["nodeC"]
                    },
                    "nodeC":{
                        "dialogue": "But i'm not too mad.",
                        "profile":"vivianNeutral",
                        "textvoice":"lightVoice",
                        "children":["nodeD"]
                    },
                    "nodeD":{
                        "dialogue": "I knew how filling you would be the moment I first saw you.",
                        "profile":"vivianSmug",
                        "textvoice":"lightVoice",
                        "children":["nodeE"]
                    },
                    "nodeE":{
                        "dialogue": "Even if you were a guy, you still make good pudge.",
                        "profile":"vivianHappy",
                        "textvoice":"lightVoice",
                        "children":[]
                    },

                    //exit if the player doesnt want to knock
                    "node5":{
                        "dialogue": "...",
                        "profile":"blank",
                        "textvoice":"default",
                        "children":[]
                    },
                     "node6":{
                        "dialogue": "...",
                        "profile":"blank",
                        "textvoice":"default",
                        "children":["node7"]
                    },
                    "node7":{
                        "dialogue": "Oh, its you.",
                        "profile":"vivianNeutral",
                        "textvoice":"lightVoice",
                        "children":[]
                    },
                },
                "overworldShopKnockF":{
                    //ask the player if they want to knock on chest. gives the option for 1 knock, 2 knock 3 knocks, or do nothing.
                    "node1":{
                        "dialogue": "Knock on the chest?",
                        "profile":"blank",
                        "textvoice":"default",
                        "children":[ "nodeJUNKT", 'node5','node6']
                    },

                    "nodeJUNKT":{
                        "dialogue": "....",
                        "profile":"blank",
                        "textvoice":"default",
                        "children":["node2"]
                    },

                    //logic if they skrew up the knock
                    "node2":{
                        "dialogue": "In all honesty, I was hoping you would mess up the knocking code.",
                        "profile":"vivianSmugTongue",
                        "textvoice":"lightVoice",
                        "children":["node3"]
                    },
                    "node3":{
                        "dialogue": "Thanks for being a dummy, human :3",
                        "profile":"vivianSmugTongue",
                        "textvoice":"lightVoice",
                        "children":["node4"]
                    },
                    //
                    "node4":{
                        "dialogue": "....",
                        "profile":"blank",
                        "textvoice":"default",
                        "children":["nodeB"]
                    },

                    "nodeB":{
                        "dialogue": "didn't expect you to put up so much of a fuss...",
                        "profile":"vivianSquish",
                        "textvoice":"lightVoice",
                        "children":["nodeC"]
                    },
                    "nodeC":{
                        "dialogue": "But i'm not too mad.",
                        "profile":"vivianNeutral",
                        "textvoice":"lightVoice",
                        "children":["nodeD"]
                    },
                    "nodeD":{
                        "dialogue": "I knew how filling you would be the moment I first saw you.",
                        "profile":"vivianSmug",
                        "textvoice":"lightVoice",
                        "children":["nodeE"]
                    },
                    "nodeE":{
                        "dialogue": "Can always count on girls to be a delicious meal~",
                        "profile":"vivianHappy",
                        "textvoice":"lightVoice",
                        "children":[]
                    },
                    
                    //exit if the player doesnt want to knock
                    "node5":{
                        "dialogue": "...",
                        "profile":"blank",
                        "textvoice":"default",
                        "children":[]
                    },
                     "node6":{
                        "dialogue": "...",
                        "profile":"blank",
                        "textvoice":"default",
                        "children":["node7"]
                    },
                    "node7":{
                        "dialogue": "Oh, its you.",
                        "profile":"vivianNeutral",
                        "textvoice":"lightVoice",
                        "children":[]
                    },
                },
                "overworldShop":{
                    //if player gets knock amount correct the proceed to shop dialogue
                    "node1":{
                        "dialogue": "How can I help you?",
                        "profile":"vivianNeutral",
                        "textvoice":"lightVoice",
                        "children":["node8","node9","node15"]
                    },

                    //i want to buy something
                    "node8":{
                        "dialogue": "Alright. Here is what I got for you today. ",
                        "profile":"vivianHappy",
                        "textvoice":"lightVoice",
                        "children":[]
                    },

                    //who are you?
                    "node9":{
                        "dialogue": "Me? ",
                        "profile":"vivianNeutral",
                        "textvoice":"lightVoice",
                        "children":["node10"]
                    },
                    "node10":{
                        "dialogue": "Well I’m just your local wandering wolf girl, Vivian.",
                        "profile":"vivianHappy",
                        "textvoice":"lightVoice",
                        "children":["node11"]
                    },
                    "node11":{
                        "dialogue": "Just going around to different places, finding cool items, maybe make some money, find some nice friends, or perhaps find some cute snack, heh.",
                        "profile":"vivianSmug",
                        "textvoice":"lightVoice",
                        "children":["node12"]
                    },
                    "node12":{
                        "dialogue": "Ah, don t worry, I won t eat you now, since you're a customer.",
                        "profile":"vivianSquish",
                        "textvoice":"lightVoice",
                        "children":["node13"]
                    },
                    "node13":{
                        "dialogue": "Besides, it is much more fun when it is a surprise.",
                        "profile":"vivianSmug",
                        "textvoice":"lightVoice",
                        "children":["node14"]
                    },
                    "node14":{
                        "dialogue": "You definitely look pretty filling though...",
                        "profile":"vivianSmugTongue",
                        "textvoice":"lightVoice",
                        "children":[]
                    },

                    //nothing im just looking around
                    "node15":{
                        "dialogue": "See you around then.",
                        "profile":"vivianSmug",
                        "textvoice":"lightVoice",
                        "children":[]
                    },
                    

                   
                    
                },
                
            },

            //behavior 3 handles minigame logic
            "Behavior3":{
                "voreSequenceM":{
                    //player is grabbed by vivian
                     "node1":{
                        "dialogue": "Oops!",
                        "profile":"vivianHappy",
                        "textvoice":"lightVoice",
                        "children":["node2"]
                    },
                    "node2":{
                        "dialogue": "Looks like you chose the wrong chest. ",
                        "profile":"vivianSmug",
                        "textvoice":"lightVoice",
                        "children":["node3"]
                    },
                    "node3":{
                        "dialogue": "Now it is time for MY prize! ",
                        "profile":"vivianSmugTongue",
                        "textvoice":"lightVoice",
                        "children":["node4"]
                    },
                    //vivian does swallowing sequence until playeri s fully swallowed.
                    "node4":{
                        "dialogue": "Hmmm, guess that will do. Still, not as good as girls.",
                        "profile":"vivianNeutral",
                        "textvoice":"lightVoice",
                        "children":["node5"]
                    },
                    //player struggle animation in her engourged belly.
                    "node5":{
                        "dialogue": "Though that does not mean I will let you out, heheh.",
                        "profile":"vivianSmugTongue",
                        "textvoice":"lightVoice",
                        "children":["node6"]
                    },
                    // vivian becomes annoyed and grabbs her belly tightly
                     "node6":{
                        "dialogue": "You lost fair and square.",
                        "profile":"vivianSquish",
                        "textvoice":"lightVoice",
                        "children":["node7"]
                    },
                    //squishes player having there outline show 
                     "node7":{
                        "dialogue": "So here is your consolation prize!",
                        "profile":"vivianSmug",
                        "textvoice":"lightVoice",
                        "children":["node8"]
                    },
                    //open her mouth to burp and spits up clothing, as the player melts and is absorbed.
                    "node8":{
                        "dialogue": "BBBUUURRRPPP! ",
                        "profile":"vivianShocked",
                        "textvoice":"lightVoice",
                        "children":["node9"]
                    },
                    
                    "node9":{
                        "dialogue": "Shame he was not a girl. Might have been more fun to tease...",
                        "profile":"vivianSquish",
                        "textvoice":"lightVoice",
                        "children":["node10"]
                    },
                     "node10":{
                        "dialogue": "At least he knew how to fill a wolfs curves out.",
                        "profile":"vivianWink",
                        "textvoice":"lightVoice",
                        "children":[]
                    },
                },
                "voreSequenceF":{
                    //player is grabbed by vivian
                     "node1":{
                        "dialogue": "Oops!",
                        "profile":"vivianHappy",
                        "textvoice":"lightVoice",
                        "children":["node2"]
                    },
                    "node2":{
                        "dialogue": "Looks like you chose the wrong chest. ",
                        "profile":"vivianSmug",
                        "textvoice":"lightVoice",
                        "children":["node3"]
                    },
                    "node3":{
                        "dialogue": "Now it is time for MY prize! ",
                        "profile":"vivianSmugTongue",
                        "textvoice":"lightVoice",
                        "children":["node4"]
                    },
                    //vivian does swallowing sequence until playeri s fully swallowed.
                    "node4":{
                        "dialogue": "Ohhhh. Soo tasty.",
                        "profile":"vivianSmug",
                        "textvoice":"lightVoice",
                        "children":["node5"]
                    },
                    //player struggle animation in her engourged belly.
                    "node5":{
                        "dialogue": "Struggle all you like, you're mine now...",
                        "profile":"vivianSquish",
                        "textvoice":"lightVoice",
                        "children":["node6"]
                    },
                     "node6":{
                        "dialogue": "Your Squirms feel sooo good. Hehe",
                        "profile":"vivianSquish",
                        "textvoice":"lightVoice",
                        "children":["node7"]
                    },
                    //belly shrinks with here gaining weight.
                     "node7":{
                        "dialogue": "Now melt for me...",
                        "profile":"vivianSmug",
                        "textvoice":"lightVoice",
                        "children":["node8"]
                    },
                    //open her mouth to burp and spits up clothing
                    "node8":{
                        "dialogue": "BBBUUURRRPPP! ",
                        "profile":"vivianShocked",
                        "textvoice":"lightVoice",
                        "children":["node9"]
                    },
                    "node9":{
                        "dialogue": "I can always rely on humans to be filling and tasty. ",
                        "profile":"vivianWink",
                        "textvoice":"lightVoice",
                        "children":["node10"]
                    },
                     "node10":{
                        "dialogue": " And also a good supply of new clothing, heheh. ",
                        "profile":"vivianWink",
                        "textvoice":"lightVoice",
                        "children":[]
                    },
                },
                "tfSequence":{
                    //player is grabbed by vivian and moved into the chest
                     "node1":{
                        "dialogue": "Too bad!",
                        "profile":"vivianSmug",
                        "textvoice":"lightVoice",
                        "children":[ "node2"]
                    },
                    //idle in the chest
                     "node2":{
                        "dialogue": "That was the wrong choice! But don’t worry.",
                        "profile":"vivianHappy",
                        "textvoice":"lightVoice",
                        "children":[ "node3"]
                    },
                    //moves hand back and grabs bottle, and idle
                     "node3":{
                        "dialogue": "I have something special for an adorable human like you. ",
                        "profile":"vivianSmug",
                        "textvoice":"lightVoice",
                        "children":[ "node4"]
                    },
                    //swift motion of vivian putting the bottles tip into there mouth, with the player swallowing the contents             
                    "node4":{
                        "dialogue": "Now quick! Drink this! ",
                        "profile":"vivianHappy",
                        "textvoice":"lightVoice",
                        "children":[ "node5"]
                    },
                    //player appears woozy after drinking it. 
                    "node5":{
                        "dialogue": "Just relax and...",
                        "profile":"vivianSmugTongue",
                        "textvoice":"lightVoice",
                        "children":[ "node6"]
                    },
                    //player transforms to have wolf appearance 
                    "node6":{
                        "dialogue": "There we go!",
                        "profile":"vivianHappy",
                        "textvoice":"lightVoice",
                        "children":[ "node7"]
                    },
                    //player falls into vivians breasts 
                    "node7":{
                        "dialogue": "You were cute as a human, but now you’re SO much better as another wolf girl like me.",
                        "profile":"vivianHappy",
                        "textvoice":"lightVoice",
                        "children":[ "node8"]
                    },
                    //vivian hugs player.
                    "node8":{
                        "dialogue": "We are gonna have such a great time together. ",
                        "profile":"vivianHeartEyes",
                        "textvoice":"lightVoice",
                        "children":[]
                    },
                },
                "playerWinsLantern":{
                     "node1":{
                        "dialogue": "Ugh, dumb cute lucky human.",
                        "profile":"vivianKO",
                        "textvoice":"lightVoice",
                        "children":[ "node2"]
                    },
                     "node2":{
                        "dialogue": "Fine, I will keep my word. ",
                        "profile":"vivianSquish",
                        "textvoice":"lightVoice",
                        "children":[ "node3"]
                    },
                     "node3":{
                        "dialogue": "The lantern is yours.",
                        "profile":"vivianHappy",
                        "textvoice":"lightVoice",
                        "children":[]
                    },
                },
                "playerWinsShell":{
                     "node1":{
                        "dialogue": "Ugh, You win...",
                        "profile":"vivianKO",
                        "textvoice":"lightVoice",
                        "children":[ "node2"]
                    },
                     "node2":{
                        "dialogue": "Fine, I will keep my word. ",
                        "profile":"vivianSquish",
                        "textvoice":"lightVoice",
                        "children":[ "node3"]
                    },
                     "node3":{
                        "dialogue": "The Shells are yours.",
                        "profile":"vivianHappy",
                        "textvoice":"lightVoice",
                        "children":[]
                    },
                }
                
            }
        },
        "gameover":{

            "eaten":{
                "default":{
                    "node1":{
                        "dialogue": "You were eaten, but I have no clue what ate you or how it happened x3.",
                        "profile":"",
                        "textvoice":"digest",
                        "children":[]
                    }
                },
                "tiger_female_vore":{
                    "node1":{
                        "dialogue": "This island is inhabited by quite a few dangerous predators, so perhaps some caution would have helped you survive. For you, however, there will never be a second chance. The tiger ambushed you and quickly devoured you with all the skill youd expect from such a predator. The tiger's powerful stomach quickly churned you into a nutritious stew like the weak meal you were. The good news is, the tiger enjoyed you very much. In fact, she thought you were grrrrrrrrrreat!",
                        "profile":"",
                        "textvoice":"digest",
                        "children":[]
                    }
                },
                "tiger_male_vore":{
                    "node1":{
                        "dialogue": "This island is inhabited by quite a few dangerous predators, so perhaps some caution would have helped you survive. For you, however, there will never be a second chance. The tiger ambushed you and quickly devoured you with all the skill youd expect from such a predator. The tiger's powerful stomach quickly churned you into a nutritious stew like the weak meal you were. As your body melted, you could feel yourself being absorbed into the tiger's body. The rest of your existence will be spent as padding on the tiger. At least on the bright side, when the tiger pleaures himself, you feel it too.",
                        "profile":"",
                        "textvoice":"digest",
                        "children":[]
                    }
                },
                "bat_male_vore":{
                    "node1":{
                        "dialogue": "A swooshing sound was all that announced your fate. You were caught unaware, and swiftly ended up stuffed into a bats bowels. You couldnt even scream within the warm, smothering chamber, and instead you simply whimpered. Within a few minutes, your body was mere liquid within the bats intestines. Ultimately, your life came to a end, your entire existence only remembered as ass fat.",
                        "profile":"",
                        "textvoice":"digest",
                        "children":[]
                    }
                },
                "bat_female_vore":{
                    "node1":{
                        "dialogue": "A swooshing sound was all that announced your fate. You were caught unaware, and swiftly ended up stuffed into a bats bowels. You couldnt even scream within the warm, smothering chamber, and instead you simply whimpered. Within a few minutes, your body was mere liquid within the bats intestines. Ultimately, your life came to a end, your entire existence only remembered as ass fat.",
                        "profile":"",
                        "textvoice":"digest",
                        "children":[]
                    }
                },
                "blueSlime_hs_vore":{
                    "node1":{
                        "dialogue": "The face should have been a dead give away that this slime was different. As it latched on to your face, you struggled to break free. Once you were exausted, it coated your body with its slime.  Now you were under its control. It enjoyed playing with you until you climaxed.",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":[]
                    }
                },
                "blueSlime_female_hm_vore":{
                    "node1":{
                        "dialogue": "You where caught of guard, the strength of the slime overpowered you. Helpless to stop it, the slime engulfed you with their chest. enjoying playing with you, it squished you into her stomache, then moved you to her now engourged breasts. Moving you between the now massive sacks of soft slime. Once she had her fun, you where absorbed into her body. Now you will spend the rest of your days padding out the breasts of a engorged slime girl.",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":[]
                    }
                },
                "blueSlime_male_hm_vore":{
                    "node1":{
                        "dialogue": "You where caught of guard, the strength of the slime overpowered you. Helpless to stop it, the slime engulfed you with their engorged penis. Quickly squeezing you through its urethra and into its large balls. as the slime began to pleasure itself, you felt your body throbbing with pleasure as you melted. When the slime climaxed you could feel what little of you was left rise quickly out the slimes massive cock. Only to be swallowed and reabsorbed. Now you will spend the rest of your days as slimey pudge on this engourged slime boy. ",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":[]
                    }
                },
                "mimic_male_vore":{
                    "node1":{
                        "dialogue": "Greed. A five-letter word that can spell doom for even the most seasoned of adventurers, and you were far from seasoned. A single moment of greed was all it took for you to cause your own doom. Your last thoughts as your body melted in the guts of the mimic were of regret. All the treasure in the world couldn’t save you now. Your death was simply an open-and-shut case.",
                        "profile":"",
                        "textvoice":"digest",
                        "children":[]
                    }
                },
                "mimic_female_vore":{
                    "node1":{
                        "dialogue": "Greed. A five-letter word that can spell doom for even the most seasoned of adventurers, and you were far from seasoned. A single moment of greed was all it took for you to cause your own doom. Your last thoughts as your body melted in the guts of the mimic were of regret. All the treasure in the world couldn’t save you now. Your death was simply an open-and-shut case.",
                        "profile":"",
                        "textvoice":"digest",
                        "children":[]
                    }
                },
                "whiteCat_female_vore":{
                    "node1":{
                        "dialogue": "Your short-lived adventure has come to an unfortunate, though not undeserved, end. You were quickly overpowered by an angry feline, forcefully shoved into its ravenous rear. Your exploratory trip into a cat’s bowels was one-way trip to an eternity as cat pudge, though it seems that your soul is going to stay around for a while. It turns out you'really are a girl kisser, or at least, you’re part of one.",
                        "profile":"",
                        "textvoice":"digest",
                        "children":[]
                    }
                },
                "whiteCat_male_vore":{
                    "node1":{
                        "dialogue": "Your short-lived adventure has come to an unfortunate, though not undeserved, end. You were quickly overpowered by an angry feline, forcefully shoved into its ravenous rear. Your exploratory trip into a cat’s bowels was one-way trip to an eternity as cat pudge, though it seems that your soul is going to stay around for a while. It turns out you'really are a boy kisser, or at least, you’re part of one.",
                        "profile":"",
                        "textvoice":"digest",
                        "children":[]
                    }
                },
                "shadow_curse_vore":{
                    "node1":{
                        "dialogue": "The darkness of the cave didn't dicourage you at all from entering. As you stubbled around, something grabbed the lower half of your body. Pulling you partially into the floor this creature began to suck you in. Despite your best efforts to struggle free, it tired you out, and sucked you completely inside is dark body. As you wiggled you could feel the shadow restrain you, with tendrils of black shadow. More tendrils formed with the intent of filling your body with some unknown substance. As it began to pump your body full, you could feel your chest become heavier, and your genitalia swell. once it had spread its self completely through your body, it was finally able to fully absorb you into its form. Now that you became one with the shadow, it began to pleasure itself... ",
                        "profile":"",
                        "textvoice":"digest",
                        "children":[]
                    }
                },
                "rabbit_male_vore":{
                    "node1":{
                        "dialogue": "Your smell was irresistible to them... Overcome by their hunger, the rabbit chased you down. Before you could react it shoved you to the ground. Stunned by the impact, you couldnt get up fast enough. In a moment the rabbit was already swallowing you whole. You were being squished both by the walls of the rabbits stomach, as well as the weight of the rabbit's body. You struggled and gradually lost your strength until you were completely subdued and digested. You could feel yourself melt and be absorbed into the rabbit's form, causing the rabbit to grow a size larger. With the rabbit's new strength and size it happily dominates other rabbits. Pleasure overwelms you as the rabbits fornicate...",
                        "profile":"",
                        "textvoice":"digest",
                        "children":[]
                    }
                },
                "rabbit_female_vore":{
                    "node1":{
                        "dialogue": "Your smell was irresistible to them... Overcome by their hunger, the rabbit chased you down. Before you could react it shoved you to the ground. Stunned by the impact, you couldnt get up fast enough. In a moment the rabbit was already swallowing you whole. You were being squished both by the walls of the rabbits stomach, as well as the weight of the rabbit's body. You struggled and gradually lost your strength until you were completely subdued and digested. You could feel yourself melt and be absorbed into the rabbit's form, causing the rabbit to grow a size larger. With the rabbit's new strength and size it happily dominates other rabbits. Pleasure overwelms you...",
                        "profile":"",
                        "textvoice":"digest",
                        "children":[]
                    }
                },
                "vivian_vore_1":{
                    "node1":{
                        "dialogue": "You knew the risks of playing with a hungry wolf girl. As soon as you opened the wrong chest, your fate was sealed. Vivian swiftly swallowed you up with ease. She enjoyed her newest meal as you struggled and squirmed all the way into her belly. There was little time to get comfortable, as Vivian's stomach made quick work of you. Before long, your form melted in with the stomach acids completely, and began to be absorbed into the wolf girl’s body. All that remains of you is your clothing that is now being stretched out by Vivian, and the wolf pudge that you've become.",
                        "profile":"",
                        "textvoice":"digest",
                        "children":[]
                    }
                },
                "vivian_vore_2":{
                    "node1":{
                        "dialogue": "You were warned. You were told that this would happen if you didn’t knock right. And yet you still messed up. As you slide down the hungry wolf girl’s throat, you can’t even remember if you forgot the code or if you intentionally made a mistake. Either way, your adventure ends here, now as belly fat for Vivian.",
                        "profile":"",
                        "textvoice":"digest",
                        "children":[]
                    }
                },
				"matangoRoot_female_unbirth":{
                    "node1":{
                        "dialogue": "In a moment, you found yourself facing first against the giant's vagina. Your body slid gracefully inside her enlarged belly. For as much as you struggled against the rhythmic movements of her body it was not enough to escape her womb. You could feel your body quickly melting into her fluids. Before you knew it, your body was turned into her climax. What was left of you was released in a big wave and left on the ground. Strangely you could still feel yourself to some degree in this state. Eventually you learned how to control your new body. spreading through the ground and sprouting as a new mycelium network should.",
                        "profile":"",
                        "textvoice":"digest",
                        "children":[]
                    }
                },
                "matangoRoot_female_absorb":{
                    "node1":{
                        "dialogue": "you strayed too close to the giant. Taking advantage of the distance, two massive hands grabbed you, lifting your body up to her massive belly. In a moment, your arms and legs were restrained inside her body, as your head was being squished by her massive breasts. Your attempts to struggle where in vain, as she pulled you deeper into her. Completely at her mercy you gave into her desire. Her body enveloping you feeling snug and comfy as you both began to pleasure each other. Your body fusing into hers as she played with your genitals, You both came in unison. Feeling tired from the struggle, you relaxed and fell asleep as she fully absorbed you. looking quite pleased with herself, you spend the rest of your days as big mushroom pudge.",
                        "profile":"",
                        "textvoice":"digest",
                        "children":[]
                    }
                },
                "matangoRoot_female_oral":{
                    "node1":{
                        "dialogue": "You were knocked down by the giant. Before you could get up, one of her hands slipped around your body. Despite your best effort to squirm free, the massive hand carried you up and into the giants' waiting mouth. Slipping down her throat and into her engorged belly. As you struggled to escape the warm chambers of her tummy, you began to tire out. Eventually giving in and letting her body absorb you completely. Feeling your body quickly becoming one with her massive rear. You thought that this was the end. Becoming just pudge for the rest of your existence. But fortunately or unfortunately for you, she enjoyed your company. Your apart from her now in the most literal sense. Occasionally she gives you form through her strange mycelium body to play with you. You're bonded to her in body and spirit, unable to resist her urges. Though it's not really so bad. After all the pleasure you two share is quite immense. Even if your just her toy, it feels nice to be apart of a creature much greater than yourself. ",
                        "profile":"",
                        "textvoice":"digest",
                        "children":[]
                    }
                },
            },
            "cursed":{
                "default":{
                    "node1":{
                        "dialogue": "You were cursed, but I have no clue what got you or how it happened x3.",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":[]
                    }
                },
                "blueSlime_tf":{
                    "node1":{
                        "dialogue": "Theres no way you would lose to a slime, right? As much as you told yourself this, one small misstep, and that weak slime had engulfed your leg, and then quickly moved up to your torso. To your surprise, it began to pleasure you. Feeling your strength weaken, you ultimately lie back in defeat as you climax. You then feel a filling sensation as you'realize the slime is now within you. It doesnt take long before your skin is changed into blue slime. But you actually feel... glad? You have a second chance now. No, a second life. A simple life as a humanoid slime.",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":[]
                    }
                },
                "blueSlime_large_tf":{
                    "node1":{
                        "dialogue": "It's larger, but still a slime. Unfortunately the easy thing to defeat was you, as you are brought to the ground and encased in the blue slime. It decided to play with its prey, and invaded your lower body. Before long, it fills you up with slime and your consciousness fades, along with any traces of your body. However, you wake up soon after, but bigger, and less human. Your adventure ends as a human, but now you have a brand new life as a large slime ahead of you.",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":[]
                    }
                },
                "tiger_female_tf":{
                    "node1":{
                        "dialogue": "The tiger was satisfied from her previous meal, which was lucky for you. She was quite slow due to her fullness and yet she still got her hands on you, smothering you with her enlarged breasts. Your will to struggle faded as she laid down, with you on top of her. As she forced your body onto hers, you could feel yourself transforming as you climaxed. Now you're her precious tiger cub. You might be cursed, but atleast your tiger momma will keep you safe.",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":[]
                    }
                },
                "tiger_male_tf":{
                    "node1":{
                        "dialogue": "The tiger was satisfied from his previous meal, which was lucky for you. He was quite slow due to his fullness and yet he still got his hands on you, scooping you up and placing you on his massive cock. As you gave into temptation, he slid his massive penis inside you, the girth of it buldging you stomach. At first it was a little straining but eventually your body got used to it. The feeling of the tiger's cock filling you up sent waves of pleasure through your body as you transformed. Now you will spend the rest of your days, as the tigers chubby mate, full of his seed... ",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":[]
                    }
                },
                "rabbit_male_tf":{
                    "node1":{
                        "dialogue": "In a humiliating turn of events, you suddenly get to experience how rabbits multiply so quickly as you are bent over at the mercy of the male rabbit that caught you. Before long, he penetrates your rear and goes to town with many loud PLAPS. As the two of you both climax in pleasure, you see your body change, growing fur and paws. As the male rabbit finishes and wanders off to find a new partner, you're left alone with your new rabbit body. You feel very warm as your crotch gets hot and twitches. Its time to start helping the rabbits multiply more.",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":[]
                    }
                },
                "rabbit_female_tf":{
                    "node1":{
                        "dialogue": "Before you can react, you're knocked down, and a female rabbit hops on top of you. Giving you no time to recover, she begins to hump you, occasionally smothering you with her breasts. Her bounces get faster and faster before you'realize your body looks like hers now. Satisfied, the rabbit jumps off and leaves you be. You stand up, still unsatisfied, panting and squeezing your boob. Perhaps that female rabbit was on to something, and you take after her lead and find a proper mate of your own to bounce on.",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":[]
                    }
                },
                "bee_drone_male_tf":{
                    "node1":{
                        "dialogue": "The flap of wings should have been a indicator to run. You tried to stand your ground. Clearly that didn't work out too well for you. The bee grabbed you. You were lifted of the ground, struggling against the strength of the cursed insect. When it could tell you were exausted, it opened up its large abdomen to swallow you, packing you tightly. Happy to have caught a human, it took you back to its hive, where a lucky larva could swallow you. All you feel now is the rythmic wiggle of the grub as your powerless to stop it from absorbing you. Its warm walls masaging your body as your mind is clouded with pleasure.",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":[]
                    }
                },
                "bee_drone_female_tf":{
                    "node1":{
                        "dialogue": "The flap of wings should have been a indicator to run. You tried to stand your ground. Clearly that didn't work out too well for you. The bee grabbed you. You were lifted of the ground, struggling against the strength of the cursed insect. When it could tell you were exausted, it opened up its large abdomen to swallow you, packing you tightly. Happy to have caught a human, it took you back to its hive, where a lucky larva could swallow you. All you feel now is the rythmic wiggle of the grub as your powerless to stop it from absorbing you. Its warm walls masaging your body as your mind is clouded with pleasure.",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":[]
                    }
                },
                "bat_female_tf":{
                    "node1":{
                        "dialogue": "The newly pudgy bat caught you and decided your face would make an excellent seat for her exceedingly plush rear. Did you plan for this? Doesn’t matter, she enjoyed your body as she smothered you in her fattened folds, pleasuring herself and you, until your orgasm filled her horny maw, and her orgasm filled your mouth. Wings and ears grew, as your entire body became covered in fur. New body, and a new partner? Now that’s a good deal~",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":[]
                    }
                },
                "bat_male_tf":{
                    "node1":{
                        "dialogue": "You where completely stunned by the bat's massive rear. Before you could get up, the bat was on top of you, rubbing his cock on your head.  When you were too tired to fight back he forced his cock into your mouth, as he pleasured you. Humping you with his soft pudgy gut squishing against your chest. After a while both you and him climaxed. With your new body, you gained the ability to fly and hang upside down just like your new partner. now you spend your days snuggling upside down as the two of you begin a new colony.",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":[]
                    }
                },
                
                "mimic_female_tf":{
                    "node1":{
                        "dialogue": "Thinking you found something, you instead were found BY something. Grabbed by a mimic, she pulls you into the chest and the lid closes after. Surrounded by squishy pink flesh, you're face to face with the mimic as she has her long tongue going down your throat. As her motions get faster, your skin gets pinker, and before you know it, your entire vision is pink. As the chest opens once more, it appears you DID get something from the chest. A loving mama that will care for you until you're ready for a chest of your very own.",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":[]
                    }
                },
                "mimic_male_tf":{
                    "node1":{
                        "dialogue": "As you open the chest, youre immediately grabbed by the mimic that was waiting for you. You can only hear the lid closing as you're face down, surrounded by pink flesh. It actually feels comfy, but you dont have time to enjoy it as you feel something being inserted into your butt. Of course, the mimic is here with you, and he proceeds to violate your rear rhythmically to the pulsating flesh around you. It doesnt take long to start enjoying as you then become a loving member of the mimics family. Dont worry, he is very proud of you.",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":[]
                    }
                },
                "istara_unbirth":{
                    "node1":{
                        "dialogue": "The little human willingly gives themselves to the cobra dragoness to forever feel the joys of being close to their mistress, adored by her for all eternity, and always looking to please. Occasionally going out to get whatever mistress demands them to, sometimes these requests require the rare human or common beast, to grow her following. The new followers having different features to their Cobrabold selves retaining some small semblance of their former selves. It fills the former human with pride that they look the most like mistress, the most pure, the closest to mistress; her main Cobrabold. The little Cobrabold knows that they will always be the first and most cherished. Forever safe in her ever expanding lair among their new brothers and sisters that are growing in number as the weeks go on. All hail Istara the Cobra Queen",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":[]
                    }
                },
                "whiteCat_male_tf":{
                    "node1":{
                        "dialogue": "Enamored by its cute roar, you willingly get closer to the male cat. Close enough for it to grab and give a big smooch, and then hold you up as it inserts its penis into you. Despite the insertion, you cant seem to be mad at him as he's just way too cute. You offer no resistance and let him do what he wants, as the cat gets faster and faster. When you both reach your peaks, your body becomes like his, along with your very own cat shaft. Now partners for life, you await for his return for your next session with a little self deserved cat nap.",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":[]
                    }
                },
                "whiteCat_female_tf":{
                    "node1":{
                        "dialogue": "Your head starts to get fuzzy, similar to the female cats fur in front of you. With only that on your mind, you rush forward to try to nestle your head in her fur. But she gives you a loving hug first, along with a very passionate kiss to set the mood. Your desire is made true as the cat shoves your head in between her breasts, nearly covering your entire head with how big and furry they are. The cat satisfies her own desires too, as she nuzzles her lower half against yours. As you both get your fill, you realize that you now have a pair of fuzzy breasts of you own, along with a loving mate for eternity. But for now, a little cat nap as a reward for all your hard work.",
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
                        "dialogue": "Where do you think you're going?",
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
                        "dialogue": "Ahhh... I see. A gift for me?",
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
                        "dialogue": "I will consume all of your desires...",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":[]
                    }
                },
                "shadow_earie_tf":{
                    "node1":{
                        "dialogue": "You're all mine now....",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":["node2"]
                    },
                    "node2":{
                        "dialogue": "I can feel you squirming inside me....",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":["node3"]
                    },
                    "node3":{
                        "dialogue": "Let's fix that. ",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":["node4"]
                    },
                    "node4":{
                        "dialogue": "Much better. I'm going to enjoy playing with you. ",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":["node5"]
                    }, 
                    "node5":{
                        "dialogue": "Is this what your heart desired? ",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":["node6"]
                    },
                    "node6":{
                        "dialogue": "How interesting...",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":["node7"]
                    },
                    "node7":{
                        "dialogue": "My cute toy, I will enjoy consuming your every desire...",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":["node8"]
                    },
                    "node8":{
                        "dialogue": "Now cum for me...",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":["node9"]
                    },
                    "node9":{
                        "dialogue": "Very good...",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":[]
                    },
                },
                "vivian_tf":{
                    "node1":{
                        "dialogue": "The odds were against you, but you thought you could still win. After choosing wrong, Vivian made you swallow your pride with your loss, along with a strange potion she forced you to drink. In mere moments, your body changed. Fur, paws, a tail; all these were now part of your body, and you now look like the wolf girl you lost to. Your mind began to become fuzzy like your now furry body, and now only thoughts of staying with Vivian fill your mind. Wolf girls stay in packs, and Vivian is more than happy to have you in hers.",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":[]
                    }
                },
                "mushroom_female_tf":{
                    "node1":{
                        "dialogue": "You were allured by the mushrooms dancing. Against your better judgment, you lingered too close to the humanoid fungus. As it emitted its spores, your body slowly became infected.  Once a critical amount of cursed energy was present in your body, it was too late. A mushroom of your own began to grow on your head. It felt weird at first. Pulsing on your scalp, and eventually swallowing your head, but your body began to feel waves of pleasure with each throb.  And as the mushroom began to grow, you began to lose control of your body. Despite that, you enjoyed every second of it. As your body began to dance in a rhythmic way, the mushroom began to fill your insides as well. Eventually, your body became one with the mushroom.  Causing your belly, thighs, and breasts to expand. Being fully transformed, your new body finds an emptier part of the cave to set up your mycelium. Parts of your body were able to shrink inside of you, allowing for you to spread throughout the surrounding ground. Eventually creating little offshoots of you who were ready to start the cycle all over again, if any unlucky visitors come your way.",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":[]
                    }
                },

                "mushroom_male_tf":{
                    "node1":{
                        "dialogue": "You were allured by the mushrooms dancing. Against your better judgment, you lingered too close to the humanoid fungus. As it emitted its spores, your body slowly became infected.  Once a critical amount of cursed energy was present in your body, it was too late. A mushroom of your own began to grow on your head. It felt weird at first. Pulsing on your scalp, and eventually swallowing your head, but your body began to feel waves of pleasure with each throb.  And as the mushroom began to grow, you began to lose control of your body. Despite that, you enjoyed every second of it. As your body began to dance in a rhythmic way, the mushroom began to cover your penis. Eventually, your body became one with the mushroom.  Causing your penis, thighs, and chest to expand. Being fully transformed, your new body finds an emptier part of the cave to set up your mycelium. Parts of your body were able to shrink inside of you, allowing for you to spread throughout the surrounding ground. Eventually creating little offshoots of you who were ready to start the cycle all over again, if any unlucky visitors come your way.",
                        "profile":"",
                        "textvoice":"lightPiano",
                        "children":[]
                    }
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