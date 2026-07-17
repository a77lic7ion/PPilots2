# PaperPilots
A premium, offline-first 2D SHMUP (Shoot 'Em Up) arcade game featuring retro-modern aesthetics, highly polished paper-plane flight mechanics, dynamic weapon systems, and strategic player progressions.

## Recent Updates & Enhancements

### 1. Endless Progression & Dynamic Boss Scaling
- **Removed Round 10 Hard Stop**: Defeating the Round 10 boss no longer triggers a hard termination victory screen. The campaign now proceeds infinitely, allowing players to test their endurance.
- **Dynamic Boss HP Calculation**: Replaced the static health scaling logic with an intelligent system using `getThreat(round)`. Bosses now scale dynamically and progressively to maintain intense, engaging combat encounters.
- **Code Clean-up**: Pruned old, redundant code paths like the legacy static `bossHP()` function.

### 2. Streamlined Combat & Convenience Balance
- **Refined Difficulty Softening Formula**: Updated the `calcPlayerPower()` metric to exclude non-combat utility upgrades (such as **Magnet** range, **Auto-Collector** salvage, and **Hull Repair/Health**) from reducing dynamic enemy reflex scaling. This ensures that purchasing convenience features does not artificialy soften combat challenge, reserving softening strictly for true combat damage and weapon-speed advancements.

### 3. Touchscreen Accessibility & Inputs
- **Mobile Bomb Button**: Implemented a responsive, thumb-friendly physical button on touch screens. This large, styled overlay (`💣`) displays only during active gameplay alongside the pause menu button, enabling easy, high-reflex bomb execution on mobile devices without relying on keyboard or gamepad shortcuts.

### 4. Strategic Itemization & Drops Curating
- **Wave-Scoped Curated Pool**: Restructured power-up drops to utilize a dynamic curated rotation pool containing only 2 distinct power-up types, refreshing automatically on wave transitions.
- **Controlled Drop Cadence**: Drops are strictly limited to waves divisible by 4 (`currentWave % 4 === 0`), enhancing pacing and tactical planning.
- **Elite Drops Convergence**: Retained the guaranteed Veteran/Elite drops, but adapted them to draw strictly from the current wave's curated 2-item pool to enforce thematic gameplay constraints.
- **Emergency Rescue Drops**: Maintained the emergency drop system separate from the main pool—ensuring that essential HP repairs only trigger dynamically when player health drops below 60%.
- **Unique Round-Wave Cache Invalidation**: Resolved an issue where the wave-scoped drop pool cached using only `currentWave` as the key. We introduced a compound key (`currentRound * 100 + currentWave`) to ensure the curated pool invalidates correctly on round transitions. This enables higher-tier power-ups (rare, epic, legendary) that unlock in later rounds to appear in wave 4/8 drops instead of being frozen in a state cached from Round 1.

### 5. Seamless UI/UX Scrolling & Fixed Layouts
- **Double Scroll Resolution**: Cleaned up conflicting CSS on `#start-screen` and `#settings-screen`. Removing nested container scrolling prevents double scroll locking on mobile and viewport-constrained containers.
- **Sticky Layout Integrity**: Ensured that header navigation panels (`.af-topbar`) and bottom control decks (`.af-bottomnav`) remain perfectly anchored, while only the main menu/armory content scrolls smoothly within `.af-main`, eliminating out-of-bounds cutoffs.
- **Enhanced Screen Scrollability**: Applied `overflow-y: auto`, `-webkit-overflow-scrolling: touch`, and explicit `height: 100% / max-height: 100%` bounds specifically to the `.af-main` container inside all menu screens (including shop and settings). This forces browsers to strictly constrain the inner scroll container to the viewport boundaries, enabling perfect native scrolling and guaranteeing all shop items and footer controls remain fully reachable on mobile devices.
- **Improved Mobile Scroll Responsiveness**: Configured `touch-action: pan-y` on main scrollable containers (`.af-main` and screen panels) to elevate scroll responsiveness on touch-first platforms without interfering with the custom canvas gameplay swipes (which maintain strict `touch-action: none`).

### 6. Daily Challenge & Mission System
- **Deterministic Day-Based Objectives**: Created a dynamic "Daily Challenge" generator leveraging date-hashed seed logic, ensuring all players worldwide receive the identical themed challenge on any given day.
- **Durable Mission State Persistence**: Seamlessly integrated the daily mission state (`dailyMissionState`) into the player's core profile saving flow (`pp_save_v3`) for offline-first reliability.
- **Diverse Objective Templates**: Configured 7 engaging daily objective templates (Origami Hunter, Core Harvester, Wave Surfer, Tactical Bomber, Power Overwhelming, Survival Expert, Origami Slayer) targeting diverse mechanics like enemy kills, cores collected, wave progression, bomb use, power-ups, survival time, and bosses defeated.
- **In-Game Completion Notifications**: Built a custom, elegant slider toast overlay (`.af-toast`) that slides in from the top to reward player focus and notify them immediately mid-flight when they hit their objective.
- **Polished Hangar Claim Interface**: Added a gold-pulsing card in the hangar menu with progress bars and claiming controls, allowing players to secure a valuable **+200 Cores** bounty upon mission completion (capped securely at 200 cores per day).
