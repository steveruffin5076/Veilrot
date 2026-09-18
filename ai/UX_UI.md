# UX_UI.md — User Experience & Interface Specification

**Purpose:** Everything the player sees, touches, and feels. Claude Code implements UI strictly from this document plus `PRODUCT_REQUIREMENTS.md`.

**Status:** ⚠️ BLOCKED on concept intake and on D-07 (camera/perspective) and D-03 (platform), since input scheme and UI scale depend on both. The *framework*, *conventions* and *checklists* below are established.

---

## 1. Experience goals

> ⏳ OPEN. To be written after intake as 3–5 goals in the form: *"The player should feel ___ within the first ___ seconds of ___."*

Every screen and every interaction must be justifiable against these goals. If it cannot be, it is cut.

---

## 2. Screen inventory

| ID | Screen | Purpose | Reached from | Exits to | Status |
|---|---|---|---|---|---|
| SCR-01 | Boot / splash | Engine + publisher cards, asset warm-up | Launch | SCR-02 | ⏳ |
| SCR-02 | Main menu | Play · Continue · Settings · Credits · Quit | SCR-01 | SCR-03+ | ⏳ |
| SCR-03 | Save / slot select | Choose or create a profile | SCR-02 | SCR-10 | ⏳ |
| SCR-04 | Settings | Audio · Video · Controls · Accessibility · Language | SCR-02, pause | back | ⏳ |
| SCR-05 | Pause menu | Resume · Settings · Restart · Quit to menu | In-game | back / SCR-02 | ⏳ |
| SCR-06 | HUD | In-game status readout | Gameplay | — | ⏳ |
| SCR-07 | Results / summary | Post-run or post-level outcome | Gameplay end | next level / SCR-02 | ⏳ |
| SCR-08 | Dialogue / narrative overlay | Story delivery (pending D-11) | Gameplay | back | ⏳ |
| SCR-09 | Credits | Attribution + licence compliance | SCR-02 | back | ⏳ |
| SCR-10 | Gameplay | The game itself | SCR-03 | SCR-05, SCR-07 | ⏳ |

*This table will be finalised after intake; screens are added only when a requirement needs them.*

---

## 3. Navigation flow

```
Launch → SCR-01 Boot → SCR-02 Main Menu
                          ├─ Play / Continue → SCR-03 Slot Select → SCR-10 Gameplay
                          ├─ Settings        → SCR-04 (modal over SCR-02)
                          ├─ Credits         → SCR-09
                          └─ Quit            → exit

SCR-10 Gameplay
   ├─ pause input → SCR-05 Pause (game state frozen)
   └─ level complete / fail → SCR-07 Results → SCR-10 (next) | SCR-02

Rules:
- Every screen must be reachable in ≤ 3 inputs from boot.
- ESC / B / back must always do the expected thing and must never soft-lock.
- No screen may exist without a defined exit.
```

**Focus & input rules (engine-independent, 🔵 PROPOSAL):** every menu has a default-focused element; keyboard/controller navigation never traps focus; mouse and gamepad can be mixed freely; UI must be fully operable without a mouse if the platform has gamepad support.

---

## 4. HUD specification

> ⏳ OPEN — the HUD's contents are a direct function of the core loop and are therefore undefined until intake.

For each HUD element, this document will record: element name · what it communicates · screen anchor · update frequency · failure visual (what it looks like when low/empty) · priority (what gets hidden first if the layout crowds).

**HUD design rules (🔵 PROPOSAL):**
- Nothing on screen unless it changes a player decision within the next 5 seconds.
- Critical state must be readable at a glance using **shape/size first, colour second** (accessibility requirement NFR-10).
- HUD must not occlude the player's focus area.
- Every HUD element must be individually hideable for clean screenshots.

---

## 5. Input & controls

> ⏳ OPEN — depends on D-03 (platform) and D-07 (camera).

| Action | Keyboard/Mouse | Gamepad | Touch | Remappable |
|---|---|---|---|---|
| ⏳ | ⏳ | ⏳ | ⏳ | Yes (NFR-10) |

**Rules:** all bindings remappable and persisted; default bindings must avoid OS/steam-overlay conflicts; prompt icons must switch glyph set instantly on input-device change; no action may be bound to a non-remappable key except system-level ones (pause/back).

---

## 6. Feedback & "juice" conventions

🔵 PROPOSAL — these are craft conventions that can be locked before the concept is known, because they improve any game.

| Event class | Required feedback channels | Timing rule |
|---|---|---|
| Player input accepted | Visual + (audio if it has an effect) | Same frame — never deferred |
| Meaningful action landed | Visual pop + sound + optional controller/haptic | Feedback begins ≤ 1 frame after resolution |
| Damage taken (player) | Distinct screen-edge treatment + audio | Must be distinguishable from damage dealt |
| Death / failure | Definite, unmissable, non-lingering | State change readable in ≤ 0.5 s |
| Reward / pickup | Escalating feedback for escalating value | Rarity must be legible by shape, not colour alone |
| Blocked / invalid action | Negative feedback (no click, dull thud) | Must never be silent |

**Rule:** no player action may ever produce *zero* feedback. Silence reads as a bug.

---

## 7. Accessibility checklist

Applied at implementation time of every UI task; not a post-launch patch. 🔵 PROPOSAL to lock the list, ⏳ to set per-item targets.

- [ ] All controls remappable
- [ ] No information conveyed by colour alone
- [ ] Minimum text size floor defined and enforced
- [ ] Contrast ratio standard chosen and enforced
- [ ] Subtitles/captions if any voice audio exists (with size & background options)
- [ ] Screenshake / flashing intensity reducible, including a full "reduce motion" mode
- [ ] No unavoidable QTE-style inputs without a hold-to-skip alternative
- [ ] Pause available at any time except during non-interruptible saves
- [ ] Difficulty/assist options (scope pending D-17)
- [ ] UI scales for the chosen platform without clipping

---

## 8. UI state matrix

For every interactive element, implementation must define: **normal · hover/focused · pressed · disabled · selected · error**. A UI task card is not complete until all six states exist for its elements.

---

## 9. Wireframe / layout spec format

Every screen gets a written spec before implementation, containing: layout grid and safe areas per platform, anchor points, element sizes in reference resolution, text strings (from the localisation table), all six interaction states, transition in/out, and the mobile/touch variant if applicable.

**Reference resolution:** ⏳ to be set with D-03.

---

## 10. Open questions

| # | Question | Blocks |
|---|---|---|
| Q-01 | Which screens does the core loop actually need? | Screen inventory finalisation |
| Q-02 | HUD contents? | SCR-06 implementation |
| Q-03 | Target input device priority (mouse+pads / gamepad-first / touch-first)? | All input work |
| Q-04 | Is there any voiced audio requiring subtitles? | Accessibility scope |

---

## 11. Change log

| Date | Change | Author |
|---|---|---|
| 2026-09-18 | Document created. Navigation rules, HUD principles, feedback conventions, accessibility checklist and UI state matrix established; screen contents ⏳ OPEN pending intake | Agent |
