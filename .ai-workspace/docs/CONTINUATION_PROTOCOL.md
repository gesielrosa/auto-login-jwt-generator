# Continuation Protocol

## For Agents Continuing Work from Previous Session

### Step 1: Assess Current State (5 minutes)

**Execute in order:**

1. **List all checkpoints:**
```bash
ls -la .ai-workspace/checkpoints/ | sort
```

2. **Read the latest checkpoint:**
```bash
cat .ai-workspace/checkpoints/CHECKPOINT_XX_[NAME].md
```

3. **Check file structure:**
```bash
tree -L 3 src/
```

4. **Verify git status (if applicable):**
```bash
git status
```

---

### Step 2: Identify Context

**From Latest Checkpoint, Extract:**

- **Completed Tasks**: What's done
- **Current Phase**: Where we are
- **Next Steps**: What's next
- **Known Issues**: Problems to watch
- **Agent Notes**: Important context

**Create Mental Model:**
```
Last Phase: [X]
Current Phase: [X+1]
Next Major Milestone: [Description]
Blockers: [Yes/No - Description]
```

---

### Step 3: Validate Previous Work

**Quick Validation:**

1. **Load extension in Chrome:**
   - Open `chrome://extensions`
   - Enable Developer Mode
   - Click "Load unpacked"
   - Select `/src` folder

2. **Check console:**
   - Open extension popup
   - Open DevTools (F12)
   - Look for errors (red text)

3. **Test basic functionality:**
   - What should work at this stage?
   - Does it work?
   - Any degradation?

**If Issues Found:**
- Document in continuation notes
- Fix critical issues first
- Note in next checkpoint

---

### Step 4: Resume Development

**Before Writing Code:**

1. **Re-read current phase** in `DEVELOPMENT_PLAN.md`
2. **Review technical specs** for this phase
3. **Check previous agent's notes** for warnings
4. **Verify dependencies** are in place

**During Development:**

1. **Work on one task at a time**
2. **Test frequently** (after each file)
3. **Keep notes** of decisions made
4. **Document deviations** from plan

---

### Step 5: Handle Deviations

**If Plan Doesn't Match Reality:**

**Minor Deviation** (e.g., different file name):
- Document in checkpoint
- Continue with better approach
- Note reason for change

**Major Deviation** (e.g., different architecture):
- STOP and assess impact
- Document thoroughly
- Update DEVELOPMENT_PLAN.md if needed
- Create special note in checkpoint

**Blocking Issue**:
- Document clearly
- Mark checkpoint as BLOCKED
- Provide detailed context for next agent
- Suggest alternatives

---

### Step 6: Maintain Continuity

**Update Checkpoint Regularly:**

Not just at end of phase - update checkpoint draft as you go:
- Every 30 minutes of work
- After completing each task
- When making important decision
- Before taking break

**Checkpoint Draft Location:**
```
.ai-workspace/checkpoints/_DRAFT_CHECKPOINT_XX.md
```

**Benefits:**
- If session ends unexpectedly, work isn't lost
- Next agent has more context
- Easier to remember decisions

---

### Step 7: Cross-Agent Communication

**Leave Breadcrumbs:**

In code:
```javascript
// Note: Using btoa for Base64 - tested and working
// Previous agent tried Buffer but not available in browser
const base64 = btoa(unescape(encodeURIComponent(jsonStr)));
```

In checkpoint:
```markdown
## Important Notes for Next Agent

### Storage Implementation
- Using chrome.storage.sync (NOT localStorage)
- Tested: data persists across sessions
- Warning: Max 8KB per item - we're using ~2KB

### Known Issues
- None currently

### Next Agent Should Know
- JWT library loaded in popup.html and options.html
- Both pages need the script tag
```

---

### Step 8: Session End Protocol

**Before Ending Session:**

1. **Create/Update Checkpoint**
   - Fill all sections
   - Be thorough with notes
   - Mark completion status

2. **Test Current State**
   - Load extension
   - Test what exists
   - Note any regressions

3. **Clean Up**
   - Remove debug console.logs
   - Delete temp files
   - Organize code

4. **Document Next Steps**
   - What's the immediate next task?
   - Any preparation needed?
   - Blockers to resolve?

5. **Final Verification**
   - All files saved
   - Checkpoint complete
   - Code committed (if using git)

---

### Step 9: Common Scenarios

**Scenario: Previous Agent Left Mid-Phase**

```markdown
Actions:
1. Read checkpoint draft (if exists)
2. Review completed tasks
3. Test existing functionality
4. Continue from next incomplete task
5. Complete phase
6. Create final checkpoint
```

**Scenario: Previous Agent Hit Blocker**

```markdown
Actions:
1. Read blocker description
2. Research alternatives
3. Test proposed solution
4. If still blocked: escalate with details
5. If resolved: document solution
6. Continue development
```

**Scenario: No Checkpoint for Current Phase**

```markdown
Actions:
1. Verify files created (check directory)
2. Load extension and test
3. Infer what was completed
4. Create retroactive checkpoint
5. Continue from next task
```

**Scenario: Code Doesn't Match Plan**

```markdown
Actions:
1. Understand WHY it's different
2. Is current approach better? Keep it.
3. Is current approach broken? Fix it.
4. Document decision
5. Update plan if major change
```

---

### Step 10: Quality Checkpoints

**Every Checkpoint Should Answer:**

- ✅ What phase/tasks were completed?
- ✅ What files were created/modified?
- ✅ What works and what doesn't?
- ✅ What's next?
- ✅ Any blockers or warnings?
- ✅ Testing performed?
- ✅ Deviations from plan?

**Red Flags in Checkpoints:**

- ❌ "Phase complete" but tasks not checked
- ❌ No testing section
- ❌ No files listed
- ❌ Vague "next steps"
- ❌ No verification checklist

**If You Find Bad Checkpoint:**
- Create supplementary note
- Test everything
- Document actual state
- Proceed with caution

---

### Step 11: Handoff Excellence

**Perfect Handoff Includes:**

1. **Clear Status**
   ```markdown
   Phase 4: 75% Complete
   Tasks: 3/4 done
   Blocking: No
   Ready for next agent: Yes
   ```

2. **Context Map**
   ```markdown
   What Exists:
   - Popup HTML structure ✓
   - Popup CSS styling ✓
   - Popup JS (partial) - CPF validation done
   
   What's Missing:
   - JWT generation call
   - URL opening logic
   ```

3. **Testing Evidence**
   ```markdown
   Tested:
   - CPF input accepts only numbers ✓
   - 11 digit limit enforced ✓
   - Environment buttons toggle ✓
   
   Not Tested:
   - Full flow (not implemented yet)
   ```

4. **Clear Next Action**
   ```markdown
   Next Agent Should:
   1. Add generateLoginURL() call in popup.js
   2. Implement chrome.tabs.create()
   3. Test complete flow
   4. Complete Phase 4
   ```

---

### Step 12: Emergency Recovery

**If Project State is Unclear:**

1. **Start from scratch validation:**
   ```bash
   # Check all files exist
   find src/ -type f
   
   # Verify manifest
   cat src/manifest.json
   
   # List checkpoints
   ls .ai-workspace/checkpoints/
   ```

2. **Rebuild understanding:**
   - Read all checkpoints chronologically
   - Test extension loading
   - Map what works vs. what should work
   - Create master status document

3. **Create recovery checkpoint:**
   ```markdown
   # RECOVERY_CHECKPOINT_[DATE].md
   
   ## Situation
   Found project in unclear state...
   
   ## Investigation
   - Tested X, Y, Z
   - Found A works, B broken
   
   ## Recovery Actions
   - Fixed B by...
   - Verified with...
   
   ## Current State
   - Phase X complete
   - Phase Y in progress
   - Ready to continue
   ```

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────┐
│         AGENT CONTINUATION CHECKLIST            │
├─────────────────────────────────────────────────┤
│ □ Read latest checkpoint                        │
│ □ List all files in src/                        │
│ □ Load extension in Chrome                      │
│ □ Check DevTools console                        │
│ □ Test existing functionality                   │
│ □ Review current phase tasks                    │
│ □ Identify next task                            │
│ □ Code & test iteratively                       │
│ □ Update checkpoint draft                       │
│ □ Complete final checkpoint                     │
│ □ Verify for next agent                         │
└─────────────────────────────────────────────────┘
```

---

## Success Metrics

**Good Continuation When:**
- Found checkpoint quickly
- Understood state in < 10 minutes
- No time wasted re-doing work
- Smooth progression to next task
- Quality maintained or improved

**Poor Continuation When:**
- Unclear where to start
- Had to reverse engineer state
- Duplicated existing work
- Found unexpected bugs
- Broke existing functionality

**Prevent Poor Continuity:**
- Write excellent checkpoints
- Test before ending session
- Document thoroughly
- Clean up code
- Clear next steps
