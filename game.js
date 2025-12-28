class ChickenGuacamolePants {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.score = 0;
        this.gameRunning = false;
        this.gameOver = false;
        
        // Image storage for custom sprites
        this.images = {};
        
        // Game objects
        this.chicken = {
            x: 400,
            y: 300,
            size: 50,
            vx: 0,  // velocity x
            vy: 0,  // velocity y
            acceleration: 0.5,
            maxSpeed: 8,
            friction: 0.92,
            emoji: 'img:chicken.png'
        };
        
        this.guacamoles = [];
        this.bombs = [];
        this.zombie = null;
        
        // Spawn timers
        this.guacamoleSpawnTimer = 0;
        this.bombSpawnTimer = 0;
        
        // Game settings
        this.guacamoleSpawnRate = 120; // frames
        this.bombSpawnRate = 180; // frames
        this.maxGuacamoles = 8;
        this.maxBombs = 5;
        
        this.setupEventListeners();
        this.startGame();
    }
    
    setupEventListeners() {
        // Keyboard controls
        this.keys = {};
        
        document.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
            e.preventDefault();
        });
        
        document.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
            e.preventDefault();
        });
        
        // Restart button
        document.getElementById('restart-btn').addEventListener('click', () => {
            this.restartGame();
        });
    }
    
    startGame() {
        this.gameRunning = true;
        this.gameOver = false;
        this.score = 0;
        this.updateScore();
        
        // Reset chicken position, velocity, speed, and acceleration
        this.chicken.x = 400;
        this.chicken.y = 300;
        this.chicken.vx = 0;
        this.chicken.vy = 0;
        this.chicken.maxSpeed = 8;
        this.chicken.acceleration = 0.5;
        
        // Clear arrays
        this.guacamoles = [];
        this.bombs = [];
        this.zombie = null;
        
        // Reset timers
        this.guacamoleSpawnTimer = 0;
        this.bombSpawnTimer = 0;
        
        // Hide game over screen
        document.getElementById('game-over-screen').classList.add('hidden');
        
        // Start game loop
        this.gameLoop();
    }
    
    restartGame() {
        this.startGame();
    }
    
    gameLoop() {
        if (!this.gameRunning || this.gameOver) return;
        
        this.update();
        this.draw();
        
        requestAnimationFrame(() => this.gameLoop());
    }
    
    update() {
        this.updateChicken();
        this.spawnGuacamole();
        this.spawnBombs();
        this.spawnZombie();
        this.updateGuacamoles();
        this.updateBombs();
        this.updateZombie();
        this.checkCollisions();
    }
    
    updateChicken() {
        // Apply acceleration based on input
        if (this.keys['KeyW'] || this.keys['ArrowUp']) {
            this.chicken.vy -= this.chicken.acceleration;
        }
        if (this.keys['KeyS'] || this.keys['ArrowDown']) {
            this.chicken.vy += this.chicken.acceleration;
        }
        if (this.keys['KeyA'] || this.keys['ArrowLeft']) {
            this.chicken.vx -= this.chicken.acceleration;
        }
        if (this.keys['KeyD'] || this.keys['ArrowRight']) {
            this.chicken.vx += this.chicken.acceleration;
        }
        
        // Apply friction when no keys are pressed
        if (!(this.keys['KeyA'] || this.keys['ArrowLeft'] || this.keys['KeyD'] || this.keys['ArrowRight'])) {
            this.chicken.vx *= this.chicken.friction;
        }
        if (!(this.keys['KeyW'] || this.keys['ArrowUp'] || this.keys['KeyS'] || this.keys['ArrowDown'])) {
            this.chicken.vy *= this.chicken.friction;
        }
        
        // Cap velocity at maxSpeed
        const speed = Math.sqrt(this.chicken.vx * this.chicken.vx + this.chicken.vy * this.chicken.vy);
        if (speed > this.chicken.maxSpeed) {
            this.chicken.vx = (this.chicken.vx / speed) * this.chicken.maxSpeed;
            this.chicken.vy = (this.chicken.vy / speed) * this.chicken.maxSpeed;
        }
        
        // Update position based on velocity
        this.chicken.x += this.chicken.vx;
        this.chicken.y += this.chicken.vy;
        
        // Torus/wrap-around behavior (like Pac-Man)
        if (this.chicken.x < 0) {
            this.chicken.x = this.canvas.width;
        } else if (this.chicken.x > this.canvas.width) {
            this.chicken.x = 0;
        }
        
        if (this.chicken.y < 0) {
            this.chicken.y = this.canvas.height;
        } else if (this.chicken.y > this.canvas.height) {
            this.chicken.y = 0;
        }
    }
    
    spawnGuacamole() {
        this.guacamoleSpawnTimer++;
        
        if (this.guacamoleSpawnTimer >= this.guacamoleSpawnRate && this.guacamoles.length < this.maxGuacamoles) {
            this.guacamoles.push({
                x: Math.random() * (this.canvas.width - 40) + 20,
                y: Math.random() * (this.canvas.height - 40) + 20,
                size: 25,
                emoji: '🥑',
                collected: false
            });
            this.guacamoleSpawnTimer = 0;
        }
    }
    
    spawnBombs() {
        this.bombSpawnTimer++;
        
        if (this.bombSpawnTimer >= this.bombSpawnRate && this.bombs.length < this.maxBombs) {
            let bomb;
            do {
                bomb = {
                    x: Math.random() * (this.canvas.width - 40) + 20,
                    y: Math.random() * (this.canvas.height - 40) + 20,
                    size: 20,
                    emoji: '💣'
                };
            } while (this.getDistance(bomb, this.chicken) < 100); // Don't spawn too close to chicken
            
            this.bombs.push(bomb);
            this.bombSpawnTimer = 0;
        }
    }
    
    updateGuacamoles() {
        // Remove collected guacamoles
        this.guacamoles = this.guacamoles.filter(guac => !guac.collected);
    }
    
    updateBombs() {
        // Bombs don't move, they just stay where they are
    }
    
    spawnZombie() {
        // Spawn zombie when score reaches 50
        if (this.score >= 50 && !this.zombie) {
            this.zombie = {
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: 40,
                speed: 2,
                emoji: '🧟‍♂️'
            };
        }
    }
    
    updateZombie() {
        if (!this.zombie) return;
        
        // Simple AI: move toward the chicken
        const dx = this.chicken.x - this.zombie.x;
        const dy = this.chicken.y - this.zombie.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0) {
            // Normalize direction and apply zombie speed
            const moveX = (dx / distance) * this.zombie.speed;
            const moveY = (dy / distance) * this.zombie.speed;
            
            this.zombie.x += moveX;
            this.zombie.y += moveY;
            
            // Handle torus wrapping for zombie too
            if (this.zombie.x < 0) {
                this.zombie.x = this.canvas.width;
            } else if (this.zombie.x > this.canvas.width) {
                this.zombie.x = 0;
            }
            
            if (this.zombie.y < 0) {
                this.zombie.y = this.canvas.height;
            } else if (this.zombie.y > this.canvas.height) {
                this.zombie.y = 0;
            }
        }
    }
    
    checkCollisions() {
        // Check guacamole collection
        this.guacamoles.forEach(guac => {
            if (this.getDistance(this.chicken, guac) < (this.chicken.size + guac.size) / 2) {
                guac.collected = true;
                this.score += 10;
                // Increase max speed and acceleration with each guacamole!
                this.chicken.maxSpeed += 0.5;
                this.chicken.acceleration += 0.1;
                this.updateScore();
            }
        });
        
        // Check bomb collisions
        this.bombs.forEach(bomb => {
            if (this.getDistance(this.chicken, bomb) < (this.chicken.size + bomb.size) / 2) {
                this.endGame();
            }
        });
        
        // Check zombie collision
        if (this.zombie && this.getDistance(this.chicken, this.zombie) < (this.chicken.size + this.zombie.size) / 2) {
            this.endGame();
        }
    }
    
    getDistance(obj1, obj2) {
        return Math.sqrt(Math.pow(obj1.x - obj2.x, 2) + Math.pow(obj1.y - obj2.y, 2));
    }
    
    updateScore() {
        document.getElementById('score-value').textContent = this.score;
    }
    
    endGame() {
        this.gameOver = true;
        this.gameRunning = false;
        
        // Show game over screen
        document.getElementById('final-score').textContent = this.score;
        document.getElementById('game-over-screen').classList.remove('hidden');
    }
    
    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw background pattern
        this.drawBackground();
        
        // Draw guacamoles
        this.guacamoles.forEach(guac => {
            this.drawEmoji(guac.emoji, guac.x, guac.y, guac.size);
        });
        
        // Draw bombs
        this.bombs.forEach(bomb => {
            this.drawEmoji(bomb.emoji, bomb.x, bomb.y, bomb.size);
        });
        
        // Draw zombie
        if (this.zombie) {
            this.drawEmoji(this.zombie.emoji, this.zombie.x, this.zombie.y, this.zombie.size);
        }
        
        // Draw chicken
        this.drawEmoji(this.chicken.emoji, this.chicken.x, this.chicken.y, this.chicken.size);
    }
    
    drawBackground() {
        // Clean light background for better visibility
        this.ctx.fillStyle = '#F0F8FF';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Add subtle grid pattern
        this.ctx.strokeStyle = 'rgba(173, 216, 230, 0.3)';
        this.ctx.lineWidth = 1;
        
        // Draw grid lines
        for (let x = 0; x <= this.canvas.width; x += 40) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        
        for (let y = 0; y <= this.canvas.height; y += 40) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
    }
    
    drawEmoji(emoji, x, y, size) {
        if (emoji.startsWith('img:')) {
            // Draw custom image
            const imagePath = emoji.replace('img:', '');
            if (!this.images[imagePath]) {
                this.images[imagePath] = new Image();
                this.images[imagePath].src = imagePath;
            }
            if (this.images[imagePath].complete) {
                this.ctx.drawImage(this.images[imagePath], x - size/2, y - size/2, size, size);
            } else {
                // Fallback to emoji while image loads
                this.ctx.font = `${size}px Arial`;
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText('🐔', x, y);
            }
        } else {
            // Draw emoji (original code)
            this.ctx.font = `${size}px Arial`;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(emoji, x, y);
        }
    }
}

// Start the game when the page loads
window.addEventListener('load', () => {
    new ChickenGuacamolePants();
});