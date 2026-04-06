// script.js

/**
 * Countdown Timer to April 20, 2026
 * Author: prashantpandey13
 * Date: 2023-10-05
 */

// Set the target countdown date
const countdownDate = new Date('2026-04-20T00:00:00Z').getTime();

// Update the countdown every second
const countdownFunction = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    // Time calculations for days, hours, minutes, and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="countdown"
    document.getElementById('countdown').innerHTML = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';

    // If the countdown is finished, display a message
    if (distance < 0) {
        clearInterval(countdownFunction);
        document.getElementById('countdown').innerHTML = 'Celebration Time!';
        showConfetti();
    }
}, 1000);

/**
 * Dark Mode Toggle with Local Storage
 */
const darkModeToggle = document.getElementById('dark-mode-toggle');

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// Check local storage for dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

/**
 * Background Music Player Controls
 */
const musicPlayer = document.getElementById('music-player');
const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');

playButton.addEventListener('click', () => {
    musicPlayer.play();
});

pauseButton.addEventListener('click', () => {
    musicPlayer.pause();
});

/**
 * Show Confetti Animation
 */
function showConfetti() {
    // Implementation of confetti animation goes here
}

/**
 * Scroll-triggered Animations using Intersection Observer
 */
const elementsToAnimate = document.querySelectorAll('.animate');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

elementsToAnimate.forEach(el => observer.observe(el));