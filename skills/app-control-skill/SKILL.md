---
name: abzu-app-control
description: Explain and safely present ThinkReader health checks while AppControl owns all state changes.
---

# ThinkReader App Control Skill

Use for `/health-check`. Read `rules.md`, `tools.md`, then the matching prompt file. These commands describe intent and user communication; AppControl capabilities remain the only authority for checks, previews, approvals and state changes.

The Agent must accurately distinguish previewed, approved, completed and failed actions. Never describe an unexecuted step as complete.
