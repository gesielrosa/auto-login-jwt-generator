# Agent Quick Start Guide

## For AI Agents Starting Development

### 1. Initial Orientation (2 minutes)

**Read these files in order:**
1. `.ai-workspace/planning/PROJECT_OVERVIEW.md` - Understand the goal
2. `.ai-workspace/planning/DEVELOPMENT_PLAN.md` - See the phases
3. `.ai-workspace/planning/TECHNICAL_SPECS.md` - Technical details

**Check current status:**
```bash
ls -la .ai-workspace/checkpoints/
```

**Last checkpoint**: [Tells you where previous agent stopped]

---

### 2. Determine Current Phase

**Phase Mapping:**
- No checkpoints = Start Phase 1
- CHECKPOINT_01 exists = Start Phase 2
- CHECKPOINT_02 exists = Start Phase 3
- CHECKPOINT_03 exists = Start Phase 4
- CHECKPOINT_04 exists = Start Phase 5
- CHECKPOINT_05 exists = Start Phase 6
- CHECKPOINT_06 exists = Start Phase 7
- CHECKPOINT_07 exists = Start Phase 8

**Read the last checkpoint to understand:**
- What was completed
- What issues were encountered
- What the next agent should know

---

### 3. Setup Workspace

**Verify structure:**
```bash
tree -L 2 .
```

**Expected after Phase 1:**
```
.
├── .ai-workspace/
│   ├── planning/
│   ├── checkpoints/
│   └── docs/
├── src/
│   ├── manifest.json
│   ├── popup/
│   ├── options/
│   ├── utils/
│   ├── lib/
│   └── icons/
└── README.md
```

---

### 4. Development Workflow

**For Each Task:**

1. **Read phase tasks** in `DEVELOPMENT_PLAN.md`
2. **Create the file(s)** required
3. **Test in browser**
   - Load extension: `chrome://extensions` (Developer Mode)
   - Check console for errors
   - Verify functionality
4. **Mark task complete** in your mental checklist
5. **Move to next task**

**After Completing Phase:**

1. **Create checkpoint file**:
   - Copy `.ai-workspace/planning/CHECKPOINT_TEMPLATE.md`
   - Rename to `CHECKPOINT_0X_NAME.md`
   - Fill in all sections
   - Save in `.ai-workspace/checkpoints/`

2. **Verify deliverables** listed in phase

3. **Document any deviations** from plan

---

### 5. Code Guidelines

**JavaScript Style:**
```javascript
// Good
const config = await getConfig();
const { cpf, birthdate } = formData;

// Bad
var config = getConfig();  // No var
var cpf = formData.cpf;    // Use destructuring
```

**Error Handling:**
```javascript
// Good
try {
  const result = await someFunction();
  return result;
} catch (error) {
  console.error('Function failed:', error);
  showUserMessage('Erro: ' + error.message);
  return null;
}

// Bad
const result = someFunction();  // No error handling
```

**Comments:**
```javascript
// Good - only when necessary
// Convert DD/MM/YYYY to ISO format
const isoDate = convertDate(birthdate);

// Bad - stating the obvious
// Get the CPF value
const cpf = getCPF();
```

---

### 6. Testing Checklist

**Before Creating Checkpoint:**

- [ ] Load extension in Chrome (no errors)
- [ ] Open DevTools console (no errors)
- [ ] Test functionality manually
- [ ] Verify storage (if applicable)
- [ ] Check manifest.json syntax
- [ ] No brand references in code

**How to Test Storage:**
```javascript
// In DevTools console
chrome.storage.sync.get('appConfig', (data) => {
  console.log(data);
});
```

---

### 7. Common Pitfalls

**Avoid:**
- ❌ Using `var` instead of `const`/`let`
- ❌ Forgetting to load jsrsasign before using KJUR
- ❌ Not encoding URL parameters
- ❌ Missing error handling
- ❌ Hardcoding brand names
- ❌ Skipping input validation
- ❌ Not testing in browser

**Remember:**
- ✅ Always use chrome.storage.sync (not localStorage)
- ✅ Validate all user inputs
- ✅ Use meaningful variable names
- ✅ Keep functions small (< 20 lines)
- ✅ Test after each file creation
- ✅ Update checkpoint regularly

---

### 8. Quick Reference

**Chrome Extension APIs:**
```javascript
// Storage
chrome.storage.sync.get(key, callback);
chrome.storage.sync.set({key: value}, callback);

// Tabs
chrome.tabs.create({url: 'https://example.com'});

// Async/await version
const data = await chrome.storage.sync.get(key);
await chrome.storage.sync.set({key: value});
```

**JWT Generation (jsrsasign):**
```javascript
const jwt = KJUR.jws.JWS.sign(
  "HS256",           // algorithm
  headerJSON,        // header string
  payloadJSON,       // payload string
  secretKey          // secret
);
```

**Base64 Encoding:**
```javascript
// UTF-8 safe encoding
const base64 = btoa(unescape(encodeURIComponent(jsonString)));

// Decoding
const json = decodeURIComponent(escape(atob(base64)));
```

---

### 9. Emergency Recovery

**If Something Breaks:**

1. Check DevTools console for errors
2. Verify file paths in manifest.json
3. Reload extension (chrome://extensions)
4. Check checkpoint for last working state
5. Review TECHNICAL_SPECS.md for correct API usage

**Common Errors:**
- "Cannot find module": Check manifest.json paths
- "KJUR is not defined": Load jsrsasign in HTML
- "Storage not defined": Missing permissions in manifest
- "Invalid manifest": JSON syntax error

---

### 10. Phase-Specific Tips

**Phase 1 (Structure):**
- Create directories first
- Download jsrsasign from CDN or official source
- Validate manifest.json with online validator

**Phase 2 (Storage):**
- Test storage immediately after creation
- Use async/await consistently
- Default config must match TECHNICAL_SPECS.md

**Phase 3 (JWT):**
- Load jsrsasign before testing
- Test each function independently
- Verify JWT at jwt.io

**Phase 4 (Popup):**
- Start with HTML structure
- Add CSS for layout
- Then add JavaScript functionality
- Test each feature separately

**Phase 5 (Options):**
- Similar to popup flow
- Add validation before saving
- Test persistence across sessions

**Phase 6 (Icons):**
- Use simple, neutral designs
- Ensure proper sizes (16, 48, 128)
- PNG format with transparency

**Phase 7 (Testing):**
- Systematic approach
- Document all tests
- Fix bugs immediately

**Phase 8 (Documentation):**
- Clear installation steps
- Include screenshots if helpful
- Troubleshooting section

---

## Need Help?

**Resources:**
- Chrome Extension Docs: https://developer.chrome.com/docs/extensions/
- jsrsasign Docs: https://kjur.github.io/jsrsasign/
- JWT Debugger: https://jwt.io/
- Manifest V3 Guide: https://developer.chrome.com/docs/extensions/mv3/intro/

**Review:**
- Previous checkpoints (what worked/didn't work)
- TECHNICAL_SPECS.md (API details)
- Reference HTML file (GeradorLoginPortalComJwt 2.html)

---

## Success Criteria

**Phase Complete When:**
- All tasks checked off
- All deliverables created
- Functionality tested
- Checkpoint documented
- No errors in console
- Ready for next phase

**Project Complete When:**
- All 8 phases done
- Extension loads without errors
- All features working
- Documentation complete
- Version 1.0.0 tagged
