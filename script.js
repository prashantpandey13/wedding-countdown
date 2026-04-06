// ===== CONFIGURATION =====
const CONFIG = {
  weddingDate: new Date("April 20, 2026 00:00:00").getTime(),
  updateInterval: 1000,
  heartInterval: 3000,
  sparkleInterval: 2000
};

// ===== COUNTDOWN FUNCTIONALITY =====
class CountdownTimer {
  constructor() {
    this.elements = {
      days: document.getElementById('days'),
      hours: document.getElementById('hours'),
      minutes: document.getElementById('minutes'),
      seconds: document.getElementById('seconds')
    };
    this.previousValues = { days: null, hours: null, minutes: null, seconds: null };
    this.init();
  }

  init() {
    this.update();
    setInterval(() => this.update(), CONFIG.updateInterval);
  }

  update() {
    const now = new Date().getTime();
    const timeLeft = CONFIG.weddingDate - now;

    if (timeLeft < 0) {
      this.showWeddingMessage();
      return;
    }

    const timeUnits = {
      days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
      hours: Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((timeLeft % (1000 * 60)) / 1000)
    };

    Object.keys(timeUnits).forEach(unit => {
      this.animateChange(unit, timeUnits[unit]);
    });
  }

  animateChange(unit, newValue) {
    const element = this.elements[unit];
    const formattedValue = newValue.toString().padStart(2, '0');
    
    if (this.previousValues[unit] !== formattedValue) {
      element.style.transform = 'scale(1.2)';
      element.style.color = '#ff6b9d';
      
      setTimeout(() => {
        element.textContent = formattedValue;
        element.style.transform = 'scale(1)';
        element.style.color = '';
      }, 150);
      
      this.previousValues[unit] = formattedValue;
    }
  }

  showWeddingMessage() {
    document.querySelector('.countdown-section h3').textContent = '🎉 The Big Day is Here! 🎉';
    document.querySelector('.countdown').innerHTML = `
      <div class="wedding-celebration">
        <h2>Congratulations Prashant & Pratiksha!</h2>
        <p>Wishing you a lifetime of love and happiness! 💕</p>
      </div>
    `;
  }
}

// ===== IMAGE OPTIMIZATION =====
class ImageLoader {
  constructor() {
    this.images = document.querySelectorAll('.photo-frame img');
    this.loadedCount = 0;
    this.init();
  }

  init() {
    this.images.forEach((img, index) => {
      // Create a new image element for preloading
      const tempImg = new Image();
      tempImg.onload = () => this.handleImageLoad(img, index);
      tempImg.onerror = () => this.handleImageError(img, index);
      
      // Start loading with optimized attributes
      tempImg.src = img.src;
      img.loading = 'lazy';
      img.decoding = 'async';
    });
  }

  handleImageLoad(img, index) {
    this.loadedCount++;
    
    // Add loaded class with staggered animation
    setTimeout(() => {
      img.classList.add('loaded');
      const frame = img.parentElement;
      
      // Add special entrance animation
      frame.style.animationDelay = `${index * 0.3}s`;
      frame.style.animation = 'photoFloat 1.2s ease-out forwards';
      
      // Add subtle continuous animation after entrance
      setTimeout(() => {
        frame.style.animation = 'photoFloat 1.2s ease-out forwards, subtlePulse 6s ease-in-out infinite';
      }, 1200);
      
    }, index * 300);

    // Show all images when loading is complete
    if (this.loadedCount === this.images.length) {
      this.onAllImagesLoaded();
    }
  }

  handleImageError(img, index) {
    console.warn(`Failed to load image: ${img.src}`);
    img.style.display = 'none';
    this.loadedCount++;
  }

  onAllImagesLoaded() {
    document.body.classList.add('images-loaded');
    this.startPhotoAnimations();
    this.addMagicalEffects();
  }

  startPhotoAnimations() {
    const frames = document.querySelectorAll('.photo-frame');
    
    frames.forEach((frame, index) => {
      frame.addEventListener('mouseenter', () => {
        // Pause all auto-hover animations when user hovers
        frames.forEach(f => {
          f.style.animationPlayState = 'paused';
        });
        frame.style.zIndex = '15';
        // Add magical sparkle effect on hover
        this.createSparkleEffect(frame);
      });
      
      frame.addEventListener('mouseleave', () => {
        // Resume auto-hover animations when user stops hovering
        frames.forEach(f => {
          f.style.animationPlayState = 'running';
        });
        frame.style.zIndex = index === 1 ? '4' : '3';
      });
    });

    // Add sparkle effects during auto-hover
    this.addAutoHoverSparkles();
  }

  addMagicalEffects() {
    // Add floating hearts around the photo gallery
    setInterval(() => {
      this.createPhotoHeart();
    }, 4000);
  }

  addAutoHoverSparkles() {
    const frames = document.querySelectorAll('.photo-frame');
    
    // Create sparkles during auto-hover cycles - ONE BY ONE
    setInterval(() => {
      frames.forEach((frame, index) => {
        // Calculate if this frame should be "auto-hovered" right now
        const cycleTime = 6000; // 6 seconds total cycle
        const currentTime = Date.now() % cycleTime;
        
        let isAutoHovered = false;
        
        // Photo 1: Active from 0% to 33.33% (0ms to 2000ms)
        if (index === 0) {
          isAutoHovered = currentTime >= 0 && currentTime <= 2000;
        }
        // Photo 2: Active from 33.33% to 66.66% (2000ms to 4000ms)
        else if (index === 1) {
          isAutoHovered = currentTime >= 2000 && currentTime <= 4000;
        }
        // Photo 3: Active from 66.66% to 100% (4000ms to 6000ms)
        else if (index === 2) {
          isAutoHovered = currentTime >= 4000 && currentTime <= 6000;
        }
        
        if (isAutoHovered && !frame.matches(':hover')) {
          this.createSparkleEffect(frame);
        }
      });
    }, 500); // Check every 500ms for more frequent sparkles during active period
  }

  createSparkleEffect(frame) {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.cssText = `
          position: absolute;
          top: ${Math.random() * 100}%;
          left: ${Math.random() * 100}%;
          font-size: ${10 + Math.random() * 8}px;
          pointer-events: none;
          z-index: 15;
          animation: sparkleDisappear 1s ease-out forwards;
        `;
        
        frame.appendChild(sparkle);
        
        setTimeout(() => {
          if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
          }
        }, 1000);
      }, i * 100);
    }
  }

  createPhotoHeart() {
    const gallery = document.querySelector('.photo-gallery');
    if (!gallery) return;
    
    const heart = document.createElement('div');
    heart.innerHTML = '💕';
    heart.style.cssText = `
      position: absolute;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      font-size: ${15 + Math.random() * 10}px;
      pointer-events: none;
      z-index: 1;
      opacity: 0.7;
      animation: photoHeartFloat 3s ease-out forwards;
    `;
    
    gallery.appendChild(heart);
    
    setTimeout(() => {
      if (heart.parentNode) {
        heart.parentNode.removeChild(heart);
      }
    }, 3000);
  }
}

// ===== FLOATING ANIMATIONS =====
class FloatingAnimations {
  constructor() {
    this.heartsContainer = document.querySelector('.floating-hearts');
    this.init();
  }

  init() {
    this.createFloatingHearts();
    setInterval(() => this.createFloatingHearts(), CONFIG.heartInterval);
  }

  createFloatingHearts() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = this.getRandomHeart();
    
    // Random positioning and styling
    heart.style.cssText = `
      position: absolute;
      left: ${Math.random() * 100}vw;
      bottom: -50px;
      font-size: ${12 + Math.random() * 15}px;
      animation: floatUp ${10 + Math.random() * 5}s linear forwards;
      pointer-events: none;
      z-index: 0;
      opacity: ${0.4 + Math.random() * 0.3};
      color: ${this.getRandomColor()};
    `;

    this.heartsContainer.appendChild(heart);

    // Clean up after animation
    setTimeout(() => {
      if (heart.parentNode) {
        heart.parentNode.removeChild(heart);
      }
    }, 15000);
  }

  getRandomHeart() {
    const hearts = ['💕', '💖', '💗', '💝', '💘', '💞', '💓', '❤️', '🌸', '🌺'];
    return hearts[Math.floor(Math.random() * hearts.length)];
  }

  getRandomColor() {
    const colors = ['#ff6b9d', '#ff8a80', '#ffb3ba', '#ffc0cb', '#ff69b4', '#ff1493'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}

// ===== MUSIC CONTROLLER WITH 3-STATE TOGGLE =====
class MusicController {
  constructor() {
    this.audio = document.getElementById('bgMusic');
    this.button = document.getElementById('musicToggle');
    this.icon = this.button.querySelector('.music-icon');
    this.progressBar = document.querySelector('.music-progress');
    
    // Three-state toggle: 0 = first segment, 1 = second segment, 2 = muted
    this.currentState = 0;
    this.isPlaying = false;
    this.hasAutoStarted = false; // Prevent multiple auto-starts
    this.hasUserInteracted = false; // Track if user has interacted with page
    
    // Define the three segments (in seconds)
    this.segments = [
      { start: 0, end: 69, name: "Opening Romance" },      // 0:00 to 1:09
      { start: 115, end: 207, name: "Heart of Kesariya" }, // 1:55 to 3:27
      { start: 0, end: 0, name: "Muted" }                  // Muted state
    ];
    
    this.init();
  }

  init() {
    this.button.addEventListener('click', () => this.toggleState());
    
    // Handle audio events
    this.audio.addEventListener('loadstart', () => {
      console.log('Kesariya loading...');
    });
    
    this.audio.addEventListener('canplay', () => {
      if (!this.hasAutoStarted) {
        console.log('Kesariya ready to play');
        this.button.style.opacity = '1';
        // Try multiple autostart attempts
        this.attemptAutoStart();
        this.hasAutoStarted = true;
      }
    });
    
    this.audio.addEventListener('loadeddata', () => {
      // Another attempt when more data is loaded
      if (!this.isPlaying && !this.hasAutoStarted) {
        this.attemptAutoStart();
      }
    });
    
    this.audio.addEventListener('error', (e) => {
      console.log('Kesariya file not found - add "Kesariya Brahmastra 128 Kbps.mp3" to enable music.');
      this.button.style.opacity = '0.5';
      this.button.title = 'Add Kesariya file to enable music';
    });

    // Handle segment looping and progress
    this.audio.addEventListener('timeupdate', () => {
      if (this.isPlaying && this.currentState < 2) {
        const segment = this.segments[this.currentState];
        const progress = ((this.audio.currentTime - segment.start) / (segment.end - segment.start)) * 100;
        this.progressBar.style.height = `${Math.min(Math.max(progress, 0), 100)}%`;
        
        // Loop when reaching end of current segment
        if (this.audio.currentTime >= segment.end) {
          this.audio.currentTime = segment.start;
        }
      }
    });

    // Handle when audio ends naturally (fallback)
    this.audio.addEventListener('ended', () => {
      if (this.isPlaying && this.currentState < 2) {
        const segment = this.segments[this.currentState];
        this.audio.currentTime = segment.start;
        this.audio.play();
      }
    });

    // Reset progress when paused
    this.audio.addEventListener('pause', () => {
      if (this.currentState === 2) {
        this.progressBar.style.height = '0%';
      }
    });

    // Try autostart on any user interaction with the page
    document.addEventListener('click', () => {
      if (!this.isPlaying && !this.hasUserInteracted) {
        this.hasUserInteracted = true;
        this.attemptAutoStart();
      }
    }, { once: true });

    // Initialize button appearance for state 0
    this.updateButtonAppearance();
  }

  attemptAutoStart() {
    // Set to first segment and try to play
    this.currentState = 0;
    this.audio.currentTime = this.segments[0].start; // Start at 0:00
    
    // Unmute and set volume
    this.audio.muted = false;
    this.audio.volume = 0.7;
    
    // Try to play with promise handling
    const playPromise = this.audio.play();
    
    if (playPromise !== undefined) {
      playPromise.then(() => {
        this.isPlaying = true;
        this.updateButtonAppearance();
        console.log('✅ Auto-started first segment (0:00-1:09)');
        // Remove any pulse animation
        this.button.classList.remove('needs-click');
      }).catch(error => {
        // Autoplay blocked - show clear visual indication
        console.log('❌ Autoplay blocked:', error.name);
        this.showAutoplayBlocked();
      });
    } else {
      // Fallback for older browsers
      try {
        this.audio.play();
        this.isPlaying = true;
        this.updateButtonAppearance();
        console.log('✅ Auto-started (fallback method)');
      } catch (error) {
        console.log('❌ Fallback autoplay failed:', error);
        this.showAutoplayBlocked();
      }
    }
  }

  showAutoplayBlocked() {
    this.button.classList.add('needs-click');
    this.button.title = '🎵 Click to start our romantic song! (0:00-1:09)';
    
    // Make the button more prominent
    this.button.style.transform = 'scale(1.1)';
    this.button.style.boxShadow = '0 0 20px rgba(255, 107, 157, 0.6)';
    
    // Add a subtle bounce animation
    setTimeout(() => {
      this.button.style.transform = 'scale(1)';
    }, 300);
    
    this.updateButtonAppearance();
  }

  toggleState() {
    // If first click and autoplay was blocked, start from beginning
    if (!this.isPlaying && this.currentState === 0) {
      this.playCurrentSegment();
      this.addRippleEffect();
      return;
    }
    
    // Cycle through states: 0 -> 1 -> 2 -> 0
    this.currentState = (this.currentState + 1) % 3;
    
    if (this.currentState === 2) {
      // Mute state
      this.pause();
      this.updateButtonAppearance();
    } else {
      // Play the current segment
      this.playCurrentSegment();
    }
    
    this.addRippleEffect();
  }

  playCurrentSegment() {
    if (this.currentState === 2) return; // Don't play if muted
    
    const segment = this.segments[this.currentState];
    this.audio.currentTime = segment.start;
    
    this.audio.play().then(() => {
      this.isPlaying = true;
      this.updateButtonAppearance();
    }).catch(error => {
      // Silently handle autoplay restrictions
      if (error.name === 'NotAllowedError') {
        console.log('Autoplay prevented by browser - click music button to start');
        this.updateButtonAppearance();
      } else {
        console.warn('Audio play failed:', error);
      }
    });
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
    this.updateButtonAppearance();
  }

  updateButtonAppearance() {
    const segment = this.segments[this.currentState];
    
    // Remove all state classes
    this.button.classList.remove('state-0', 'state-1', 'state-2', 'needs-click');
    // Add current state class
    this.button.classList.add(`state-${this.currentState}`);
    
    switch(this.currentState) {
      case 0: // First segment
        this.icon.textContent = '🎵';
        this.button.classList.toggle('playing', this.isPlaying);
        this.button.style.background = this.isPlaying 
          ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
          : 'linear-gradient(135deg, #ff6b9d 0%, #c44569 100%)';
        this.button.title = this.isPlaying 
          ? `Playing: ${segment.name} (0:00-1:09) - Click for next segment`
          : `Click to play: ${segment.name} (0:00-1:09)`;
        break;
        
      case 1: // Second segment  
        this.icon.textContent = '🎶';
        this.button.classList.toggle('playing', this.isPlaying);
        this.button.style.background = this.isPlaying
          ? 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
          : 'linear-gradient(135deg, #ff8a80 0%, #ff5722 100%)';
        this.button.title = this.isPlaying
          ? `Playing: ${segment.name} (1:55-3:27) - Click to mute`
          : `Play: ${segment.name} (1:55-3:27)`;
        break;
        
      case 2: // Muted
        this.icon.textContent = '🔇';
        this.button.classList.remove('playing');
        this.button.style.background = 'linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%)';
        this.button.title = 'Muted - Click to play first segment (0:00-1:09)';
        break;
    }
  }

  addRippleEffect() {
    this.button.classList.add('clicked');
    setTimeout(() => {
      this.button.classList.remove('clicked');
    }, 600);
  }

  // Method to manually set segment (for testing)
  setSegment(segmentIndex) {
    if (segmentIndex >= 0 && segmentIndex < this.segments.length) {
      this.currentState = segmentIndex;
      if (segmentIndex < 2) {
        this.playCurrentSegment();
      } else {
        this.pause();
      }
    }
  }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    // Optimize animations for better performance
    this.optimizeAnimations();
    
    // Add intersection observer for lazy animations
    this.setupIntersectionObserver();
    
    // Debounce resize events
    this.setupResizeHandler();
  }

  optimizeAnimations() {
    // Add will-change property to animated elements
    const animatedElements = document.querySelectorAll('.photo-frame, .time-value, .heart-icon');
    animatedElements.forEach(el => {
      el.style.willChange = 'transform';
    });
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.timeline-item').forEach(item => {
      observer.observe(item);
    });
  }

  setupResizeHandler() {
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.handleResize();
      }, 250);
    });
  }

  handleResize() {
    // Recalculate positions if needed
    const hearts = document.querySelectorAll('.floating-heart');
    hearts.forEach(heart => {
      if (parseFloat(heart.style.left) > window.innerWidth) {
        heart.style.left = Math.random() * window.innerWidth + 'px';
      }
    });
  }
}

// ===== CSS ANIMATIONS (Added via JavaScript for better control) =====
const addCustomStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatUp {
      0% {
        transform: translateY(0) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-100vh) rotate(360deg);
        opacity: 0;
      }
    }

    @keyframes sparkleDisappear {
      0% {
        opacity: 0;
        transform: scale(0) rotate(0deg);
      }
      50% {
        opacity: 1;
        transform: scale(1.2) rotate(180deg);
      }
      100% {
        opacity: 0;
        transform: scale(0) rotate(360deg);
      }
    }

    @keyframes photoHeartFloat {
      0% {
        opacity: 0;
        transform: translateY(0) scale(0.5);
      }
      20% {
        opacity: 0.7;
        transform: translateY(-10px) scale(1);
      }
      100% {
        opacity: 0;
        transform: translateY(-50px) scale(1.2) rotate(15deg);
      }
    }

    .animate-in {
      animation: slideInFromLeft 0.8s ease-out forwards;
    }

    @keyframes slideInFromLeft {
      from {
        opacity: 0;
        transform: translateX(-50px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .wedding-celebration {
      text-align: center;
      padding: 2rem;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(15px);
      border-radius: 20px;
      animation: celebrationPulse 2s ease-in-out infinite;
    }

    @keyframes celebrationPulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
  `;
  document.head.appendChild(style);
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  // Add custom styles
  addCustomStyles();
  
  // Initialize all components
  new CountdownTimer();
  new ImageLoader();
  new FloatingAnimations();
  const musicController = new MusicController();
  new PerformanceOptimizer();
  
  // Try immediate autoplay attempt
  setTimeout(() => {
    if (!musicController.isPlaying) {
      musicController.attemptAutoStart();
    }
  }, 500);
  
  // Add loading complete class
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 1000);
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
  console.warn('JavaScript error:', e.error);
});

// ===== ACCESSIBILITY ENHANCEMENTS =====
document.addEventListener('keydown', (e) => {
  if (e.key === ' ' && e.target === document.body) {
    e.preventDefault();
    document.getElementById('musicToggle').click();
  }
});

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CountdownTimer, ImageLoader, FloatingAnimations, MusicController };
}