# ARCHITECTURE.md — Technical Architecture & Project Structure

**Purpose:** Tells Claude Code how the project is organised, what the systems are, and where code goes. Prevents architecture drift across many implementation sessions.

**Status:** ⚠️ BLOCKED on **D-02 (engine)**. Folder structure, systems breakdown and data conventions below are 🔵 PROPOSAL and engine-agnostic; they will be finalised the moment the engine is chosen.

---

## 1. Engine / technology decision support

> ⚠️ **This is research for the owner, NOT a decision.** The agent does not choose the engine. Comparision is provided so the owner (D-02) can decide with costs visible.

| Option | Best when… | Strengths | Costs / risks | Agent note |
|---|---|---|---|---|
| **Godot 4** | 2D or mid-scope 3D, small team, no licence fees wanted | Free & MIT, tiny install, excellent 2D, GDScript is fast to iterate, easy CI, great for solo + Claude Code workflow | Smaller 3D ecosystem than Unreal; console export needs third-party help; fewer ready-made 3D assets | Lowest friction for a small, fast-moving project |
| **Unity 6** | Broad platform reach incl. consoles, big asset store | Massive ecosystem, C#, strong mobile + console tooling, lots of tutorials | Licence/seat considerations, heavier editor, more boilerplate | Safest all-round platform reach |
| **Unreal 5** | High-fidelity 3D, cinematic visuals | Best-in-class rendering, Blueprints + C++, strong for realistic art | Heavy for 2D/small scope; steeper C++ path; longer builds; 5% royalty above threshold | Overkill unless the concept is high-fidelity 3D |
| **Web (Three.js / Phaser / Godot Web export)** | Instant play, no install, itch.io/web portals | Zero-install distribution, fastest iteration, agent-friendly | Weaker performance ceiling, monetization limits, store support weaker | Best for prototyping and small scopes |
| **Custom / framework (e.g. Love2D, Raylib, MonoGame)** | Very specific mechanics, total control | No engine overhead, full control | You build everything: tools, editor, pipeline | Only if a mechanic fights every engine |

**Recommendation pending owner review:** if the concept is 2D or mid-scope 3D and the team is small, Godot 4 gives the highest speed-of-iteration per hour invested. If console or mobile-store reach is required, Unity 6 lowers that risk substantially. **Owner decides (D-02).**

---

## 2. Repository layout

```
Veilrot/
├── README.md                 # Front door → points at /ai
├── ai/                       # ALL design & planning documentation (this folder)
│   ├── PROJECT.md … ASSET_PIPELINE.md
│   └── tasks/                # Atomic Claude Code task cards
├── assets/                   # ALL art, audio, font, data assets
│   ├── art/                  # sprites, models, textures, animation
│   ├── audio/                # music, sfx, ambience
│   ├── fonts/
│   ├── ui/                   # UI atlas, icons, 9-slices
│   └── _reference/           # mood boards, style refs (NOT shipped)
├── src/                      # ⏳ to be confirmed with engine (D-02)
│   ├── core/                 # bootstrapping, state machine, service locator
│   ├── gameplay/             # mechanics, systems
│   ├── entities/             # actors, characters
│   ├── ui/                   # screens, HUD, widgets
│   ├── data/                 # tunable data files (JSON/CSV/resources)
│   ├── audio/
│   └── util/
├── tests/                    # automated tests
└── docs/                     # (reserved) player-facing or generated docs
```

**Rule:** design intent lives in `/ai`; assets in `/assets`; code in `/src`. Claude Code must never place tunable values inline in code — they belong in `/src/data` or the engine's resource files.

---

## 3. System breakdown

> ⏳ Systems listed below are the *expected* skeleton of any game; the specific systems will be derived from the concept after intake. Each becomes a module with a single owner file.

| System | Responsibility | Depends on | Status |
|---|---|---|---|
| Bootstrapper / Game state machine | App lifecycle: boot → menu → play → pause → results | — | ⏳ |
| Input service | Device detection, remapping, action mapping | UX_UI §5 | ⏳ |
| Asset service | Loading, caching, placeholder substitution | ASSET_PIPELINE §mock protocol | ⏳ |
| Save service | Versioned save/load, migration, corruption guards | PR-7xx | ⏳ |
| Settings service | Persisted player preferences, applied on boot | UX_UI §4 | ⏳ |
| Audio service | Bus routing (music/sfx/ambience/UI), ducking | PR-8xx | ⏳ |
| UI framework | Screen stack, focus management, transitions, six states | UX_UI §2, §8 | ⏳ |
| Localization | String table lookup, no hard-coded text | NFR-11 | ⏳ |
| Core gameplay systems | ⏳ pending concept | — | ⏳ |
| Progression system | ⏳ pending concept | — | ⏳ |
| Debug / dev tools | Overlays, spawn menus, cheat toggles, frame budget readout | — | 🔵 PROPOSAL |

---

## 4. Data & configuration conventions

- **Tunables live in data, not code.** Damage numbers, speeds, spawn rates, timings — all in data files so balancing never requires a code change.
- **Naming:** `snake_case` for data keys, `PascalCase` for types/classes, `camelCase` for variables and functions, `SCREAMING_SNAKE_CASE` for constants. Prefix private members consistently within the chosen language.
- **Data format:** engine-native resources preferred; JSON/CSV as the interchange format for anything the agent or an external tool must generate.
- **Schema versioning:** every data file carries a `version` field; the save service carries an explicit migration table.

---

## 5. Save system requirements

Even before knowing the game, these are non-negotiable (they prevent the worst class of bug):

1. Saves are versioned and migration is explicit — never assume the schema is stable.
2. Writes are atomic: write to a temp file, then swap. Never overwrite in place.
3. Corruption is *detected* and reported, never loaded blindly.
4. Save data is human-inspectable for debugging.
5. What is saved is listed explicitly in this doc once gameplay exists (player state, world state, progression, settings).

---

## 6. Asset & placeholder policy (see also ASSET_PIPELINE.md)

**Missing-art-tool protocol — the project is never blocked by missing art.**

1. Every asset that does not yet exist gets a **spec entry** in `ASSET_PIPELINE.md` with an ID.
2. Code loads by **asset ID**, never by hard-coded path.
3. If the file is absent, the asset service substitutes a **procedural/mock placeholder** (primitive shape, flat colour from a deterministic palette, label text of the asset ID, or silence for audio).
4. Placeholders are visually obvious and must be trivially identifiable in screenshots.
5. Design, logic, math and systems continue to be built and tested against placeholders.
6. When the real asset lands in `/assets`, it is integrated **without code changes** beyond the registry entry.

**Consequence:** no task card may be marked blocked solely because art is missing.

---

## 7. Testing hooks

- Game logic must be testable headlessly, without rendering.
- Systems expose deterministic entry points so tests can drive them frame-by-frame.
- Randomness goes through a single seeded RNG service (crucial for reproducible tests and bug reports).
- Debug overlays toggled by a single flag/command, stripped or hidden in release.

---

## 8. Performance budgets

Per `PRODUCT_REQUIREMENTS.md` §4: 60 fps target, 16.6 ms frame budget, render ≤ 10 ms, logic ≤ 4 ms. Claude Code must include a frame-time readout in the debug overlay so regressions are visible immediately rather than discovered at polish time.

---

## 9. Open decisions

| # | Decision | Blocks | Status |
|---|---|---|---|
| D-02 | Engine | Everything technical | ⏳ OWNER |
| D-03 | Platform → memory/build budgets, input | NFR-05, NFR-06 | ⏳ OWNER |
| D-12 | Multiplayer → netcode layer | Systems breakdown | ⏳ OWNER |
| D-16 | Save slots | Save service | ⏳ OWNER |
| D-21 | CI provider & build automation | Milestone 1 | 🔵 agent proposal after engine choice |
| D-22 | Source-control branching model & review rules | All code work | 🔵 agent proposal after engine choice |

---

## 10. Change log

| Date | Change | Author |
|---|---|---|
| 2026-09-18 | Document created. Engine comparison researched and presented (no choice made). Repo layout, data conventions, save requirements, placeholder protocol and testing hooks established. | Agent |
