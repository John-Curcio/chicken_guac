# 🐔 Chicken Guacamole Pants 🥑

A fun, fast-paced browser game where you play as a speedy chicken collecting guacamole while avoiding dangerous bombs!

## How to Play

1. Open `index.html` in your web browser
2. Use **WASD** or **Arrow Keys** to move your chicken around the arena
3. Collect 🥑 **guacamole** to increase your score (+10 points each)
4. Avoid 💣 **bombs** - touching one ends the game!
5. Try to get the highest score possible!

## Game Features

- **Simple Controls**: Easy WASD/Arrow key movement
- **Fast-Paced Action**: The chicken moves quickly for exciting gameplay
- **Dynamic Spawning**: Guacamole and bombs appear randomly around the arena
- **Score Tracking**: See your current score and final score when the game ends
- **Restart Functionality**: Play again with the click of a button
- **Responsive Design**: Works on different screen sizes

## File Structure

```
chicken_guac/
├── index.html      # Main game page with HTML structure
├── styles.css      # All styling and visual design
├── game.js         # Complete game logic and mechanics
└── README.md       # This file with instructions
```

## Modifying the Game

This game is designed to be easy to modify and expand! Here are some ideas:

### Easy Changes
- **Chicken Speed**: Change `this.chicken.speed` in `game.js`
- **Scoring**: Modify the `+10` in the collision detection
- **Spawn Rates**: Adjust `guacamoleSpawnRate` and `bombSpawnRate`
- **Colors**: Update the CSS color schemes
- **Emojis**: Replace 🐔, 🥑, or 💣 with different emojis

### Medium Difficulty Ideas
- Add power-ups (speed boost, invincibility)
- Create different types of collectibles
- Add sound effects
- Implement a timer/countdown mode
- Add particle effects when collecting items

### Advanced Ideas
- Multiple levels with increasing difficulty
- Different chicken characters
- Moving bombs
- Multiplayer support
- Leaderboards

## Technical Notes

- **No Dependencies**: Uses only vanilla HTML, CSS, and JavaScript
- **Browser Compatible**: Works in all modern browsers
- **Beginner Friendly**: Code is well-commented and organized
- **Extensible**: Object-oriented design makes adding features easy

## Getting Started with Modifications

1. **Start Small**: Try changing the chicken speed or colors first
2. **Test Often**: Refresh the browser after each change to see results
3. **Read the Code**: The `game.js` file has comments explaining each section
4. **Experiment**: Don't be afraid to break things - you can always undo changes!

## Help and Support

- Each function in `game.js` has comments explaining what it does
- The CSS is organized by component for easy styling changes
- Try the browser's developer tools (F12) to debug issues
- Remember: making games is all about experimenting and having fun!

Have fun creating and modifying your game! 🎮