class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.wave = 0; // Start at wave 0
    this.nextWaveCountdown = 20; // Initial delay of 20 seconds for first wave
    this.running = true;
    this.lastTime = null;

    // Define the game loop as an arrow function to preserve 'this' and accept timestamp
    this.loop = (timestamp) => {
      if (!this.running) return;

      // Initialize lastTime on first frame
      if (!this.lastTime) this.lastTime = timestamp;
      const delta = (timestamp - this.lastTime) / 1000; // Convert ms to seconds
      this.lastTime = timestamp;

      // Decrease timer by elapsed time
      this.nextWaveCountdown -= delta;
      if (this.nextWaveCountdown <= 0) {
        this.wave++; // Increment wave number
        this.nextWaveCountdown = 10; // 10 seconds between subsequent waves
        this.spawnWave();
      }

      // Clear canvas and update game state
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // Add other update logic here (e.g., update enemies, towers)

      this.updateUI();
      requestAnimationFrame(this.loop); // Continue the loop
    };

    // Start the game loop
    requestAnimationFrame(this.loop);
  }

  spawnWave() {
    // Spawn enemies based on wave number, starting lighter
    const enemyCount = 3 + this.wave * 2; // Wave 1: 5, Wave 2: 7, Wave 3: 9, etc.
    let spawned = 0;
    const spawnInterval = setInterval(() => {
      if (spawned < enemyCount) {
        // Spawn an enemy (implementation depends on your Enemy class)
        // e.g., this.enemies.push(new Enemy(...));
        spawned++;
      } else {
        clearInterval(spawnInterval);
      }
    }, 1000); // Spawn every 1 second
  }

  updateUI() {
    // Update wave timer display
    document.getElementById('waveTimer').textContent = Math.ceil(this.nextWaveCountdown);
    document.getElementById('wave').textContent = this.wave;
  }

  // Other methods (e.g., update enemies, towers) would go here
}
