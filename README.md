# Breaking & Entering: A Business Major Simulator
**Repository for a Phaser top-down adventure style game | Created by Calvin Richards and Claire Buck**
---

## KEY STRUCTURES:
    
- The central structure of the game is the player inventory system, which also handles how player data
    is passed between scenes.

- There will be a DOOR object that has a value tied to one of the houses. Corresponding function in the 
city class that takes in the door value. 

## FILES:

* ### SCENES:

    - City.js - the central scene from which other scenes can be launched, although City does not end 
    until the end of the game. 

    - Player_Lair.js - the home of the player where you can change outfit and store items*
        
    - House_1-4.js - the homes that the player can enter within the town. 
    
    - UI.js - the UI/Inventory file that runs externally to the main scenes. It manages state so that you don't
    have to deal with passing tons of variables / objects between the main scenes.

* ### OBJECTS:

    - Player.js - 


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
        These categories are technically two separate things, but I have chosen to combine them because of the way that our team tackled this issue. Claire created all of the visual elements of the game

    