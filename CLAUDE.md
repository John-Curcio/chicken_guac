# Claude Memory - Chicken Guacamole Pants

## Project Overview
This is a simple browser-based game called "Chicken Guacamole Pants" created as a gift for a nephew to learn game development with Claude. The game is intentionally simple (Google Doodle complexity) but well-organized for easy modification.

## Game Mechanics
- **Player**: Chicken with momentum-based physics (acceleration, max speed, friction)
- **Collectibles**: Guacamole (🥑) - gives +10 points, +0.5 max speed, +0.1 acceleration
- **Enemies**: 
  - Static bombs (💣) - instant death on contact
  - Zombie (🧟‍♂️) - appears at 50+ points, follows player at speed 2, instant death on contact
- **Arena**: Torus/wrap-around (like Pac-Man) - going off one edge teleports to opposite edge
- **Controls**: WASD/Arrow keys for acceleration (not direct movement)

## Technical Details
- **Files**: index.html, styles.css, game.js, chicken.png, README.md, CLAUDE.md
- **Graphics**: Uses chicken.png custom image + emojis for other sprites
- **Physics**: Object-oriented design with velocity, acceleration, friction, and max speed
- **Rendering**: Canvas 2D context with emoji/image drawing

## Development Philosophy
- **Beginner-friendly**: Code is well-commented for learning
- **Easy to modify**: Simple parameter changes for big effects
- **No dependencies**: Vanilla HTML/CSS/JS only
- **Extensible**: Clean architecture for adding features

## Common Modifications
- **Physics**: Adjust chicken.acceleration, chicken.maxSpeed, chicken.friction
- **Difficulty**: Change zombie.speed, spawn rates, spawn thresholds
- **Visuals**: Replace chicken.png, change emojis, adjust CSS colors
- **Features**: Add power-ups, new enemy types, sound effects

## Testing Commands
- Open `index.html` in browser to test
- No build process needed - just refresh browser after changes

## Claude Instructions
- Always use TodoWrite for multi-step tasks
- Keep code simple and well-commented for educational purposes
- Prefer modifying existing code over creating new files
- Test suggestions should be browser-based (no complex tooling)
- Maintain the fun, approachable tone for a young developer