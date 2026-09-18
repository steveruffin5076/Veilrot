# ARCHITECTURAL & CREATIVE DECISION LOG (ADR)

> **Maintained By:** User (Final Authority) & Claude Cowork / Arena.ai  
> **Rule:** Every major decision must be logged here to maintain historical context and prevent regression.

---

## Decision Record Format
- **DEC-ID:** Sequential Identifier (e.g., `DEC-001`)
- **Date:** YYYY-MM-DD
- **Decision:** What choice was made?
- **Authority:** `USER_APPROVED` / `PROPOSAL_ACCEPTED`
- **Context & Rationale:** Why was this chosen over alternatives?
- **Consequences:** What systems or workflows are affected?

---

## Decision Log

### DEC-001: Separation of Concerns (Claude Cowork + Cursor + GitHub)
- **Date:** YYYY-MM-DD
- **Authority:** `USER_APPROVED`
- **Decision:** Claude Cowork is strictly designated for planning, game design, UX/UI, and documentation management. Cursor AI (or Claude Code) is strictly designated for code implementation.
- **Context:** Previous attempts led to code duplication, lost context, and tool confusion.
- **Consequences:** Claude Cowork will not output raw source code unless explicitly requested. Implementation tasks are defined as task cards in `ai/CURRENT_STATE.md`.

---

### DEC-002: Missing Art Tool Protocol (Non-Blocking Development)
- **Date:** YYYY-MM-DD
- **Authority:** `USER_APPROVED`
- **Decision:** Lack of immediate artwork or art tools will never block game logic or engine implementation.
- **Context:** Media creation happens in parallel or externally via specialized AI tools or artists.
- **Consequences:** Cursor AI / Claude Code will use procedural geometry or colored placeholders and continue coding math, input, and state machines.

---

### DEC-003: Height Advantage Combat Multiplier
- **Date:** YYYY-MM-DD
- **Authority:** `USER_APPROVED`
- **Decision:** Attacking from a higher elevation grants +10% physical damage per elevation tier difference; attacking uphill incurs a -10% accuracy penalty.
- **Context:** Encourages tactical positioning and vertical map exploration.
- **Consequences:** Grid tiles must track integer elevation values (0, 1, 2, 3), and combat calculations must query tile height.
