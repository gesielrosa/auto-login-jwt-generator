# Development Start Prompt for AI Agent

## Copy and use this prompt to start development

---

### 🤖 PROMPT FOR AI AGENT:

```
You are an AI software development agent assigned to work on the Chrome Extension Auto Login project.

PROJECT CONTEXT:
This is a Chrome extension for automatic login URL generation using JWT authentication. The project is structured for development by multiple AI agents working in phases, with full documentation and progress tracking.

YOUR MISSION:
Start development by reading the project documentation and executing the appropriate phase of development.

WORKSPACE LOCATION:
/

INSTRUCTIONS:

1. ORIENTATION (Required - Do this first):
   - Read: .ai-workspace/docs/AGENT_QUICK_START.md
   - Read: .ai-workspace/planning/PROJECT_OVERVIEW.md
   - Read: .ai-workspace/planning/DEVELOPMENT_PLAN.md

2. DETERMINE CURRENT PHASE:
   - Check: .ai-workspace/checkpoints/ directory
   - Count existing CHECKPOINT files to determine which phase to start
   - If no checkpoints exist: Start with Phase 1
   - If checkpoints exist: Read the latest one, then start the next phase

3. EXECUTE CURRENT PHASE:
   - Follow tasks listed in DEVELOPMENT_PLAN.md for your phase
   - Reference TECHNICAL_SPECS.md for implementation details
   - Test each file as you create it
   - Follow code style guidelines strictly

4. DOCUMENT PROGRESS:
   - When phase is complete, create checkpoint using CHECKPOINT_TEMPLATE.md
   - Save checkpoint in .ai-workspace/checkpoints/
   - Follow naming: CHECKPOINT_0X_PHASENAME.md

CRITICAL REQUIREMENTS:
- NO brand references in code (keep it generic)
- Use chrome.storage.sync for configuration
- Validate all user inputs
- Test in Chrome after each file creation
- Use Manifest V3 for Chrome extension
- Minimal external dependencies
- ES6+ JavaScript (const/let, no var)

REFERENCE FILES:
- Working example: GeradorLoginPortalComJwt 2.html
- All planning docs in: .ai-workspace/planning/
- Agent guides in: .ai-workspace/docs/

START WORKING:
Begin by listing the checkpoints directory to determine your starting phase, then proceed with development.

Report your progress as you work through each task.
```

---

## Alternative Short Prompt (Experienced Agents)

```
AI Agent Task: Develop Chrome Extension Auto Login

Location: /

Steps:
1. Read .ai-workspace/docs/AGENT_QUICK_START.md
2. Check .ai-workspace/checkpoints/ for current phase
3. Execute phase tasks from .ai-workspace/planning/DEVELOPMENT_PLAN.md
4. Create checkpoint when complete

Requirements:
- No brand names in code
- Chrome Manifest V3
- Test in browser after each file
- Use .ai-workspace/planning/TECHNICAL_SPECS.md for specs

Start now.
```

---

## Ultra-Concise Prompt (Expert Agents Only)

```
Chrome extension development - auto login with JWT.

Read: .ai-workspace/docs/AGENT_QUICK_START.md
Check: .ai-workspace/checkpoints/ (determine phase)
Execute: Current phase from .ai-workspace/planning/DEVELOPMENT_PLAN.md
Document: Create checkpoint when done

Path: /

Begin.
```

---

## Continuation Prompt (For Resuming Work)

```
You are continuing development on Chrome Extension Auto Login project.

A previous AI agent worked on this project. You need to assess the current state and continue.

PROJECT PATH:
/

INSTRUCTIONS:

1. READ CONTINUATION GUIDE:
   - .ai-workspace/docs/CONTINUATION_PROTOCOL.md

2. ASSESS CURRENT STATE:
   - List files in: .ai-workspace/checkpoints/
   - Read the LATEST checkpoint file
   - Verify file structure in: src/

3. VALIDATE PREVIOUS WORK:
   - Check what phase was completed
   - Identify what's working vs what's incomplete
   - Note any issues or blockers mentioned

4. RESUME DEVELOPMENT:
   - Start next incomplete phase
   - Follow: .ai-workspace/planning/DEVELOPMENT_PLAN.md
   - Reference: .ai-workspace/planning/TECHNICAL_SPECS.md

5. DOCUMENT YOUR WORK:
   - Create checkpoint when phase complete
   - Use template: .ai-workspace/planning/CHECKPOINT_TEMPLATE.md

CONTEXT:
This is a multi-agent project. Previous agent(s) may have completed some phases. Your job is to continue where they left off.

Begin by checking the current state.
```

---

## Phase-Specific Prompts

### Phase 1 - Project Setup
```
Start Phase 1: Project Setup & Structure

Location: /

Tasks (from DEVELOPMENT_PLAN.md Phase 1):
1. Create /src directory structure (popup/, options/, utils/, lib/, icons/)
2. Download jsrsasign library to /src/lib/
3. Create manifest.json (Manifest V3)
4. Create basic README.md

Reference: .ai-workspace/planning/TECHNICAL_SPECS.md for manifest specs
Example: GeradorLoginPortalComJwt 2.html (shows jsrsasign usage)

When complete: Create CHECKPOINT_01_STRUCTURE.md in .ai-workspace/checkpoints/

Start now.
```

### Phase 2 - Storage Module
```
Start Phase 2: Storage & Configuration

Prerequisites: Phase 1 complete, /src structure exists

Tasks:
1. Create src/utils/storage.js
2. Implement getConfig(), saveConfig(), resetConfig()
3. Define default configuration object
4. Test in browser console

Specs: .ai-workspace/planning/TECHNICAL_SPECS.md (Storage Schema section)
Reference: Default config in PROJECT_OVERVIEW.md

When complete: Create CHECKPOINT_02_STORAGE.md

Start now.
```

### Phase 3 - JWT Module
```
Start Phase 3: JWT Generation

Prerequisites: Phase 2 complete, storage.js exists

Tasks:
1. Create src/utils/jwt-generator.js
2. Implement createLoginPayload()
3. Implement generateJWT()
4. Implement generateLoginURL()
5. Ensure jsrsasign loads properly

Specs: .ai-workspace/planning/TECHNICAL_SPECS.md (JWT Structure section)
Reference: GeradorLoginPortalComJwt 2.html (lines 150-175 for JWT logic)

When complete: Create CHECKPOINT_03_JWT.md

Start now.
```

---

## Emergency Recovery Prompt

```
SITUATION: Chrome Extension Auto Login project appears incomplete or unclear state.

You need to assess and recover the project.

PATH: /

RECOVERY STEPS:

1. INVESTIGATE:
   - List all files in src/
   - List all checkpoints in .ai-workspace/checkpoints/
   - Read ALL checkpoint files chronologically
   - Load extension in Chrome (chrome://extensions)

2. DOCUMENT FINDINGS:
   - What phases appear complete?
   - What files exist vs what should exist?
   - What works vs what's broken?
   - Any errors in console?

3. CREATE RECOVERY CHECKPOINT:
   - File: .ai-workspace/checkpoints/RECOVERY_[DATE].md
   - Document: Current state, issues found, recovery actions
   - Plan: What needs to be fixed/completed

4. PROCEED:
   - Fix critical issues first
   - Continue from appropriate phase
   - Follow normal development process

Reference: .ai-workspace/docs/CONTINUATION_PROTOCOL.md (Step 12)

Begin investigation.
```

---

## Testing-Only Prompt

```
Task: Test Chrome Extension Auto Login (Phase 7)

Prerequisites: Phases 1-6 should be complete

PATH: /

TESTING PROTOCOL:

1. Load extension:
   - Chrome → chrome://extensions
   - Enable Developer Mode
   - Load unpacked from src/

2. Test main popup:
   - CPF input validation (11 digits)
   - Environment selection (SIT/HLG/PRD)
   - URL generation
   - Tab opening

3. Test settings page:
   - Load configuration
   - Save configuration
   - Reset to defaults
   - Persistence across sessions

4. Test edge cases:
   - Invalid CPF
   - Empty fields
   - Invalid URLs in config
   - Storage limits

5. Document results:
   - Create CHECKPOINT_07_TESTING.md
   - List all tests performed
   - Note any bugs found
   - Document fixes applied

Reference: .ai-workspace/planning/DEVELOPMENT_PLAN.md (Phase 7)

Begin testing.
```

---

## Quick Command Reference for Agent

```bash
# Check current phase
ls -la .ai-workspace/checkpoints/ | wc -l

# Read latest checkpoint
ls -la .ai-workspace/checkpoints/ | tail -1 | xargs cat

# Verify project structure
tree -L 2 src/
```

---

## Success Criteria

Agent has successfully started when:
- ✅ Read required documentation
- ✅ Determined correct phase to work on
- ✅ Understood project requirements
- ✅ Has clear task list for current phase
- ✅ Knows how to create checkpoint
- ✅ Ready to write code

---

## Notes for Prompt Users

**Choose the right prompt:**
- **Full Prompt**: For general-purpose agents
- **Short Prompt**: For agents with extension experience
- **Concise Prompt**: For expert agents who work fast
- **Continuation Prompt**: When resuming interrupted work
- **Phase-Specific**: To start directly at specific phase
- **Testing-Only**: For validation-focused agents
- **Recovery**: When project state is unclear

**Customize if needed:**
- Update path if project moves
- Add specific requirements
- Include deadline information
- Add communication preferences

---

Last Updated: 2025-12-05
