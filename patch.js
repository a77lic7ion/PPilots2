const fs = require('fs');
let content = fs.readFileSync('paper_plane_game.html', 'utf-8');

const targetStr = `        const musicTracks = [
            'First Stage Intromusic.mp3',
            'trance_fight.mp3',
            'techno_fight.mp3',
            'metal_fight.mp3',
            'Blue Sky Bullet Hell (Intense Mix).mp3',
            'Neon Storm 2.mp3',
            'Neon Storm 5.mp3',
            'Sky Fire 1942 Phase.mp3',
            'Sega Speedster 2.mp3',
            'Infinite Sprint 1.mp3',
            'Zone 5_ Core Breach.mp3',
            'Zone 9_ Pixel Sprint.mp3'
        ];
        let currentTrackIndex = -1;
        let trackQueue = [];
        function shuffleQueue() {
            // Build a full rotation of all tracks, then rotate so the just-played track is NOT first.
            // Guarantees variety: every track plays before any repeats, and the previous track never repeats immediately.
            do {
                trackQueue = [...Array(musicTracks.length).keys()];
                for (let i = trackQueue.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [trackQueue[i], trackQueue[j]] = [trackQueue[j], trackQueue[i]]; }
            } while (trackQueue[0] === currentTrackIndex && musicTracks.length > 1);
        }
        function playMusic(src) {
            if (muted) return;
            if (currentMusic) { currentMusic.pause(); currentMusic.currentTime = 0; }
            currentMusic = new Audio(src);
            currentMusic.loop = true;
            currentMusic.volume = musicVolume / 100;
            currentMusic.play().catch(() => {});
        }
        function playRandomGameplayTrack() {
            if (trackQueue.length === 0) shuffleQueue();
            currentTrackIndex = trackQueue.pop();
            playMusic(musicTracks[currentTrackIndex]);
        }
        function stopMusic() {
            if (currentMusic) { currentMusic.pause(); currentMusic.currentTime = 0; currentMusic = null; }
            if (bossMusic) { bossMusic.pause(); bossMusic.currentTime = 0; bossMusic = null; }
            if (fadeInterval) { clearInterval(fadeInterval); fadeInterval = null; }
        }`;

const replacement = `        let musicTracks = ['Blue Sky Bullet Hell (Intense Mix).mp3'];
        fetch('/api/music-tracks').then(r => r.json()).then(data => {
            if (data && data.length > 0) {
                musicTracks = data;
                shuffleQueue();
            }
        }).catch(() => {});

        let currentTrackIndex = -1;
        let trackQueue = [];
        function shuffleQueue() {
            if (musicTracks.length === 0) return;
            do {
                trackQueue = [...Array(musicTracks.length).keys()];
                for (let i = trackQueue.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [trackQueue[i], trackQueue[j]] = [trackQueue[j], trackQueue[i]]; }
            } while (trackQueue[0] === currentTrackIndex && musicTracks.length > 1);
        }
        
        let fadingTracks = [];
        function playMusic(src, isGameplay = false, crossfade = false) {
            if (muted) return;
            let targetVol = musicVolume / 100;
            let nextMusic = new Audio(src);
            nextMusic.loop = !isGameplay; // loop if not gameplay
            
            if (crossfade && currentMusic) {
                nextMusic.volume = 0;
                let oldMusic = currentMusic;
                fadingTracks.push(oldMusic);
                let steps = 50, dur = 5000, stepDur = dur / steps;
                let outVolStep = oldMusic.volume / steps;
                let outInt = setInterval(() => {
                    if (oldMusic && oldMusic.volume > outVolStep) oldMusic.volume -= outVolStep;
                    else {
                        clearInterval(outInt);
                        if (oldMusic) { oldMusic.pause(); oldMusic.currentTime = 0; fadingTracks = fadingTracks.filter(t => t !== oldMusic); }
                    }
                }, stepDur);
                let inVolStep = targetVol / steps;
                let inInt = setInterval(() => {
                    if (nextMusic && nextMusic.volume + inVolStep < targetVol) nextMusic.volume += inVolStep;
                    else if (nextMusic) { nextMusic.volume = targetVol; clearInterval(inInt); }
                }, stepDur);
            } else {
                if (currentMusic) { currentMusic.pause(); currentMusic.currentTime = 0; }
                nextMusic.volume = targetVol;
            }
            
            currentMusic = nextMusic;
            
            if (isGameplay) {
                let fadeOutStarted = false;
                currentMusic.addEventListener('timeupdate', () => {
                    if (currentMusic === nextMusic && currentMusicState === 'gameplay' && gameState === 'playing') {
                        if (!fadeOutStarted && currentMusic.duration && (currentMusic.duration - currentMusic.currentTime <= 5)) {
                            fadeOutStarted = true;
                            playRandomGameplayTrack(true);
                        }
                    }
                });
                currentMusic.addEventListener('ended', () => {
                    if (currentMusic === nextMusic && !fadeOutStarted) {
                        playRandomGameplayTrack(false);
                    }
                });
            }
            currentMusic.play().catch(() => {});
        }
        
        function playRandomGameplayTrack(crossfade = false) {
            if (musicTracks.length === 0) return;
            if (trackQueue.length === 0) shuffleQueue();
            currentTrackIndex = trackQueue.pop();
            playMusic(musicTracks[currentTrackIndex], true, crossfade);
        }
        
        function stopMusic() {
            if (currentMusic) { currentMusic.pause(); currentMusic.currentTime = 0; currentMusic = null; }
            if (bossMusic) { bossMusic.pause(); bossMusic.currentTime = 0; bossMusic = null; }
            if (fadeInterval) { clearInterval(fadeInterval); fadeInterval = null; }
            fadingTracks.forEach(t => { t.pause(); t.currentTime = 0; });
            fadingTracks = [];
        }`;

if (content.includes(targetStr)) {
    fs.writeFileSync('paper_plane_game.html', content.replace(targetStr, replacement));
    console.log("Replaced successfully!");
} else {
    console.log("Target string not found.");
}
