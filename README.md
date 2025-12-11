# Breaking & Entering: A Business Major Simulator
**Repository for a Phaser top-down adventure style game | Created by Calvin Richards and Claire Buck**
---

## GAMEPLAY:
    The story behind our game is the idea that the player is both a robber and a business man. The goal is to break into people's houses, steal items from them, and then sell their items back to them. Part of the challenge is to do this without getting busted by the cops. If you let cops near enough to you, they can damage you, and if they lower your health to 0, it will count as an arrest. If you are arrested 3 times, the game will end. If you surpass a certain monetary goal, the game will end with you as a victor. (Also-helpful hint-it's important to head over to the lair for costume switches!)
    
    All the keys and controls for the game are presented on the title screen.

## FEATURES TO NOTICE:
    Our central system of the game is the player inventory system. It was one of the most challenging aspects of the game to code, and it also ties into the trading system. 

    The inventory is based off of the inventory from the Resident Evil games, with some additional inspiration from Minecraft. It is quite robust and should* be completely free of errors.
    There is a lot of interplay between the underlying data structure and what gets visually represented, and it feels pretty snappy and smooth.

    The house entering/exiting system is also of note, with seemless transitions that fade into one another (there's some juice right there). This system is aided by the UI which acts as a means
    of saving state across different scenes, helping maintain the flow of the game.

    Another key system of the game is the costume switching. Players can only rob houses while wearing the robber outfit, and can only trade while wearing the business suit. Additionally, cops will only go aggro if the player is wearing the robber suit, so it is important to be careful and time your sneaking around the cops!


## FILES:

* ### SCENES:

    - City.js - the central scene from which other scenes can be launched, although City does not end 
    until the end of the game. 

    - Player_Lair.js - the home of the player where you can change outfit and store items*
        
    - House_1-4.js - the homes that the player can enter within the town. 
    
    - UI.js - the UI/Inventory file that runs externally to the main scenes. It manages state so that you don't
    have to deal with passing tons of variables / objects between the main scenes.

* ### OBJECTS:

    - Player.js - the player character.

    - Cop.js - the cop enemies that roam the town.

    - NPC.js - the NPCs that you can trade with.

    - Inventory.js - the data structure behind the inventory system.

    - Item.js - a simple file for populating the inventory.


* ### RUBRIC EVALUATION:
    Robbing System (2 points): 
        Originally, this aspect of the game was worth 1 point in our rubric. However, we had to eliminate the Attack System catergory from our original rubric, because we did not have time to implement that idea into our final game, so the points from that have been moved here. The way our robbing system works is different from our original idea. We placed more emphasis on just having items out for stealing, and the fact that the player is only able to steal while wearing their robber outfit. 
        Despite the changes made to this system from our original idea, I would still give us 1.5/2. Our system works as intended and needed for our game, but with more time, more details, juice, and easter eggs could have been added to this mechanic.
    
    Trading System (2 points):
        While we did not implement creative NPC dialogue, we still did create a functioning and visually unique trading system. While the end trading system result does not function exactly how we thought it would at the start of the project, I am proud of us for overcoming the challenges with it, and still finding ways to make the trading system feel unique and highly immersive. I also like how we incorporated the clothing mechanic by making trading only possible if you are wearing the business suit.
        Because of the challenges presented by having to figure out how to tie trading into the inventory system, I believe we have earned the full 2 points for this system.
        
    Inventory System (2 points):
        The way that we structured the inventory system feels highly unique, and presented us (mostly Calvin) with a very difficult challenge of figuring out how to make our inventory system work. 
        Because of our creativity, uniqueness, and the experience gained from learning how to code a cool inventory system like this, I believe we have earned the full 2 points.

    Police Enemies (1 point):
        The police enemies function and look about the way we thought they should at the start of the project. I believe their behavior closely matches the guidelines we gave ourselves at the start of the project.
        I believe we have earned the full point for this category. 

    Indoor Design (3 points) & Outdoor Design (3 points):
        These categories are technically two separate things, but I have chosen to combine them because of the way that our team tackled this issue. Claire created all of the visual elements of the game (tilemaps and such). (Calvin was planning on creating some more indoor tilemaps, but didn't due to lack of time. But this was balanced out by him focusing on some of our most challenging code (inventory/trading system)). We did not create everything we had initially hoped to. We have less houses then planned, a smaller "city," and not really any easter eggs. Despite this, I am proud of the visual look of our game, and I believe its fun pixel art aesthetic is perfect for our silly game about stealing. 
        Thus, I would still give us 4/6 points for these categories combined, as our scope got a lot more drawn in as we continued making the game, but I am still proud of what we have completed. 

    LINK TO REPO: https://github.com/CalviRichi/Phaser-Adventure