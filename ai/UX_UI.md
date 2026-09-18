# UX / UI DESIGN SPECIFICATION

> **Status:** `DRAFT` — screen flow, HUD and tokens recovered from the template's worked example (Candidate Concept A)
> **Last Updated:** 2026-09-18
> **Maintained By:** Claude Cowork / Arena.ai
> **Target Consumer:** Cursor AI / Claude Code
> **Platform:** ✅ browser-first (**DEC-004**) — every screen owes **both a desktop and a touch layout**

---

## 1. Screen Flow & Navigation Architecture

```
[Title Screen] ───> [Main Menu] ───┬───> [Squad / Inventory Screen]
                                    ├───> [Mission Select Map] ───> [Battle Scene] ───┬───> [Victory Screen]
                                    ├───> [Settings Menu]                             └───> [Defeat Screen]
                                    └───> [Credits]
```

**Navigation rules**
- Every screen is reachable in ≤ 3 inputs from boot.
- Escape / B / back always does the expected thing and never soft-locks.
- No screen exists without a defined exit.
- **Audio-unlock gate** runs on first user interaction from the title screen (REQ-AUD-02) and must be designed as part of the art direction, not bolted on.

**Screen inventory & status**

| ID | Screen | Purpose | Status |
|---|---|---|---|
| SCR-01 | Title screen | Logo, New Game / Continue / Options / Exit; hosts the audio unlock gate | 🔵 |
| SCR-02 | Main menu | Hub navigation | 🔵 |
| SCR-03 | Squad / inventory | Unit selection, equipment, JP spending, job change | 🔵 |
| SCR-04 | Mission select map | Campaign progression | 🔵 |
| SCR-05 | Battle scene | The game | 🔵 |
| SCR-06 | Victory / defeat modal | XP, loot, continue | 🔵 |
| SCR-07 | Settings | Audio buses, controls/remap, accessibility, language | 🔵 |
| SCR-08 | Pause menu | Resume, restart battle, options, abandon to map | 🔵 |
| SCR-09 | Credits | Attribution + licence compliance | 🔵 |

---

## 2. In-Battle HUD Layout

*Adopted from the template. Layout must be re-derived for phone width — see §9.5.*

```
┌─────────────────────────────────────────────────────────────────────────┐
│ [Unit Turn Queue Timeline: Unit A > Unit B > Enemy X > Unit C]        [Pause]│
│                                                                         │
│                      ISOMETRIC TACTICAL MAP BATTLEFIELD                 │
│                                                                         │
│ ┌───────────────────────┐ ┌───────────────────┐ ┌─────────────────────┐ │
│ │ SELECTED UNIT CARD    │ │ ACTION MENU       │ │ TILE / TARGET INFO  │ │
│ │ Name: Knight Valen    │ │ [1] Move          │ │ Elevation: +2 Height│ │
│ │ HP: 120/120  MP: 30   │ │ [2] Attack        │ │ Defense Bonus: +10% │ │
│ │ Job: Squire (Lvl 3)   │ │ [3] Skill [JP]    │ │ Hit Chance: 85%     │ │
│ │ Status: Normal        │ │ [4] Item          │ │ Est. Damage: 28-34  │ │
│ │ Facing: NORTH         │ │ [5] Wait          │ │ Crit Chance: 12%    │ │
│ └───────────────────────┘ └───────────────────┘ └─────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
```

**HUD design rules**
- Nothing appears on screen unless it changes a player decision within the next 5 seconds.
- Critical state is readable by **shape and size first, colour second** (NFR-ACC-01).
- The HUD never occludes the player's focus area.
- Every element is individually hideable for clean screenshots.
- **The turn timeline is not optional** (REQ-TRN-04): the strategic value of a CT system is lost if the player cannot see the order.
- **Damage/hit/crit preview is not optional** (REQ-CBT-04): the player must see the consequences before committing.

---

## 3. UI Design Tokens

*Adopted from the template. Values are 🔵 proposals and should be re-validated against the accessibility contrast standard once D-08 (art direction) is set.*

### 3.1 Colour palette

| Token | Value | Use |
|---|---|---|
| Primary background | `#0F172A` | Deep slate obsidian |
| Panel surface | `#1E293B` | Dark slate blue |
| Panel border | `#334155` | Muted slate, 1 px |
| Primary accent / interactive | `#4F46E5` / `#6366F1` | Royal indigo |
| HP gauge | `#10B981` → `#EF4444` | Emerald green → low-HP red |
| MP gauge | `#3B82F6` | Electric blue |
| Selection highlight | `#F59E0B` | Amber gold |
| Move range overlay | `#3B82F680` | Semi-transparent blue, 50% alpha |
| Attack range overlay | `#EF444480` | Semi-transparent red, 50% alpha |

> ⚠️ **Accessibility conflict to resolve:** move/attack ranges are currently distinguished **by colour only**, which violates NFR-ACC-01 and REQ-IN-06. Required fix: add a pattern, outline or corner-marker difference so the two ranges are distinguishable in greyscale. This is a real requirement, not a nicety — roughly 1 in 12 male players has a colour-vision deficiency.

### 3.2 Typography

| Role | Spec |
|---|---|
| Heading | Pixel bold / clean sans — 16 px / 20 px |
| Body | High-legibility mono or sans — 12 px / 14 px |
| HUD micro-labels | 10 px bold (HP/MP values, CT indicators) |

**Rules:** a minimum text-size floor is enforced platform-wide; text scales without clipping; fonts must be **licensed for web embedding** (`ASSET_PIPELINE.md` §7).

---

## 4. Screen State Specifications

### 4.1 Title screen (SCR-01)
Logo banner with subtle floating animation. Buttons: `New Game`, `Continue` (disabled with no save), `Options`, `Exit`. Hosts the **audio unlock gate** on first interaction.

### 4.2 Pause menu (SCR-08)
Triggered by `Escape` / Start / an on-screen button (touch has no Escape key). Overlays the battle with a blurred dark backdrop (`#00000099`). Options: `Resume`, `Restart Battle`, `Options`, `Abandon to Map`.

### 4.3 Victory / defeat modal (SCR-06)
Appears on condition fulfilment with celebratory or dramatic SFX. Shows XP gained per surviving unit, loot acquired, and `Continue`.

### 4.4 UI state matrix (mandatory per interactive element)
Implementation must define all six states: **normal · hover/focused · pressed · disabled · selected · error.** A UI task card is not complete until all six exist for its elements.

---

## 5. Input & Controls

| Action | Keyboard/Mouse | Gamepad | Touch | Remappable |
|---|---|---|---|---|
| Move cursor | Mouse hover / WASD / arrows | D-pad / stick | Tap tile · drag to pan | Yes |
| Confirm | Left click / Enter / Space | A / Cross | Tap | Yes |
| Cancel / back | Right click / Escape / Backspace | B / Circle | On-screen back button | Yes |
| Open menu | Tab / M | Start | On-screen menu button | Yes |
| End turn / Wait | E / W | Select | On-screen button | Yes |

**Rules**
- All bindings remappable and persisted; defaults avoid OS and browser conflicts.
- Prompt glyphs switch instantly on input-device change (REQ-IN-05).
- **Touch parity is mandatory** (REQ-IN-04): no action may require hover, right-click, or precision dragging.
- Camera pan must not conflict with tile selection on touch — the gesture model needs an explicit decision.

---

## 6. Feedback & "Juice" Conventions

| Event class | Required feedback | Timing |
|---|---|---|
| Input accepted | Visual + audio if it has an effect | Same frame — never deferred |
| Attack landed | Impact VFX + sound + damage number + brief hit-stop | ≤1 frame after resolution |
| Critical hit | Distinct, stronger version of the above | Must be unmistakably different from a normal hit |
| Damage taken (player unit) | Distinct screen-edge treatment + audio | Distinguishable from damage dealt |
| Unit defeated | Definite, unmissable, non-lingering | State change readable in ≤0.5 s |
| Reward / level-up | Escalating feedback for escalating value | Rarity legible by shape, not colour alone |
| Blocked / invalid action | Negative feedback (dull thud, no click) | Never silent |

**Rule:** no player action may ever produce **zero** feedback. Silence reads as a bug.

---

## 7. Accessibility Checklist

Applied at implementation of every UI task — not as a post-launch patch.

- [ ] All controls remappable (NFR-ACC-01)
- [ ] **Move/attack ranges distinguishable without colour** (REQ-IN-06) — *known conflict with the current token design, see §3.1*
- [ ] Minimum text-size floor defined and enforced; text scales without clipping
- [ ] Contrast standard chosen and enforced
- [ ] Subtitles/captions if any voice audio exists (pending D-11)
- [ ] Screenshake / flashing reducible; a "reduce motion" mode exists
- [ ] No unavoidable QTE-style inputs without a hold-to-skip alternative
- [ ] Pause available at any time except during a non-interruptible save
- [ ] Difficulty/assist options (scope pending D-17)
- [ ] UI scales to phone width without clipping or overlap

---

## 8. UI State Matrix

*(Consolidated in §4.4 — six states required per interactive element: normal · hover/focused · pressed · disabled · selected · error.)*

---

## 9. Wireframe / Layout Spec Format

Every screen gets a written spec before implementation: layout grid and safe areas per device class · anchor points · element sizes at the reference resolution · text strings (from the localisation table) · all six interaction states · transition in/out · and the mobile/touch variant.

**Reference resolution** ⏳ OPEN — the template's task card used 1280×720 scaled to 1920×1080; needs confirmation with D-27 (and a decision on the phone layout: letterbox, reflow, or separate mobile composition).

---

## 9.5 Web / Mobile-Specific UX Requirements (mandated by DEC-004)

- **Touch targets:** minimum hit area sized for a thumb; hover states are decorative only, never required.
- **On-screen controls:** the game needs no virtual joystick (it is turn-based — a real advantage), but it does need persistent access to **pause, end-turn and cancel**, which have no touch equivalent by default.
- **Orientation:** ⏳ declare supported orientation(s). Landscape suits the HUD (three panels side by side); portrait needs a different composition (stacked panels, or a collapsible action bar). Decide before layout work begins.
- **Safe areas:** nothing interactive under notches, rounded corners, or the home-gesture zone.
- **Mobile viewport:** browser chrome reduces usable height and can hide the HUD; the layout must survive a resizing viewport mid-session.
- **Audio gate:** the first screen includes a tap/click-to-start interaction (see §1).
- **Text input:** none expected in normal play; if naming units is added, the mobile keyboard covers half the screen — design around it.
- **Performance is UX:** input latency on low-end phones degrades *feel*, and no amount of art fixes it (NFR-07).

---

## 10. Open Questions

| # | Question | Blocks | Ref |
|---|---|---|---|
| Q-01 | Confirm the screen list — does this game need a mission-select map at MVP scale, or is it linear stage → stage? | Screen inventory, M3 scope | D-09 |
| Q-02 | Which orientation(s) on mobile? Landscape-only vs both? | Every mobile layout | — |
| Q-03 | Camera control: fixed view, edge-pan, drag-pan, or zoom? How does it not fight tile selection on touch? | Input model | D-07 |
| Q-04 | Touch control scheme for pause/end-turn/cancel | Mobile UI | — |
| Q-05 | Damage preview depth: exact numbers, or ranges with hit-chance? | Legibility vs tension trade-off | D-06 |
| Q-06 | Is there voiced audio requiring subtitles? | Accessibility scope | D-11 |
| Q-07 | Reference resolution + phone layout strategy (letterbox vs reflow)? | All layout work | D-27 |

---

## 11. Change log

| Date | Change | Author |
|---|---|---|
| 2026-09-18 | UX framework authored (screen inventory, HUD rules, feedback conventions, accessibility checklist) | Agent |
| 2026-09-18 | **Merged with the template's UX/UI document.** Adopted: the screen-flow diagram, the annotated in-battle HUD layout, the complete design-token palette and typography, and the title/pause/victory screen specifications. **Added:** navigation rules, the screen inventory, HUD design rules (including the non-optional turn timeline and damage preview), §4.4/§8 six-state UI matrix, §6 feedback conventions, §7 accessibility checklist, §9 wireframe spec format, and **§9.5 web/mobile UX requirements**. **Flagged a real accessibility conflict** in the template's token set: move/attack ranges are distinguished by colour alone, which violates NFR-ACC-01. | Agent |
