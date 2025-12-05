# Development Plan - Phased Approach

## Phase 1: Project Setup & Structure
**Objective**: Create foundation and directory structure

### Tasks:
- [ ] Create `/src` directory structure
- [ ] Create `/src/icons` with placeholder icons
- [ ] Download and add jsrsasign library to `/src/lib/`
- [ ] Create manifest.json (Chrome Extension Manifest V3)
- [ ] Create README.md with installation instructions

**Deliverables**:
- Complete directory structure
- Basic manifest.json
- Required libraries in place

**Checkpoint**: `CHECKPOINT_01_STRUCTURE.md`

---

## Phase 2: Storage & Configuration Module
**Objective**: Implement configuration management

### Tasks:
- [ ] Create `/src/utils/storage.js`
  - [ ] Function to get configuration
  - [ ] Function to save configuration
  - [ ] Function to reset to defaults
  - [ ] Default configuration object
- [ ] Test storage module in browser console

**Deliverables**:
- Fully functional storage utility
- Default configuration loaded on first run

**Checkpoint**: `CHECKPOINT_02_STORAGE.md`

---

## Phase 3: JWT Generation Module
**Objective**: Extract and modularize JWT generation logic

### Tasks:
- [ ] Create `/src/utils/jwt-generator.js`
  - [ ] Function to create base64 payload
  - [ ] Function to generate JWT token
  - [ ] Function to construct final URL
  - [ ] Export all functions
- [ ] Ensure jsrsasign library is properly loaded

**Deliverables**:
- Reusable JWT generation module
- Clean API for URL generation

**Checkpoint**: `CHECKPOINT_03_JWT.md`

---

## Phase 4: Main Popup Interface
**Objective**: Create user-facing form

### Tasks:
- [ ] Create `/src/popup/popup.html`
  - [ ] CPF input field
  - [ ] Birthdate field (readonly, from config)
  - [ ] Environment selector buttons (SIT/HLG/PRD)
  - [ ] Generate button
  - [ ] Status message area
  - [ ] Link to settings
- [ ] Create `/src/popup/popup.css`
  - [ ] Clean, modern design
  - [ ] Responsive layout (320px min width)
  - [ ] Button states and hover effects
- [ ] Create `/src/popup/popup.js`
  - [ ] Load configuration on init
  - [ ] CPF input validation (11 digits)
  - [ ] Environment selection logic
  - [ ] Generate and open URL
  - [ ] Error handling and user feedback

**Deliverables**:
- Fully functional main popup
- Input validation
- URL generation and navigation

**Checkpoint**: `CHECKPOINT_04_POPUP.md`

---

## Phase 5: Settings/Options Page
**Objective**: Create configuration interface

### Tasks:
- [ ] Create `/src/options/options.html`
  - [ ] Secret key input (password field)
  - [ ] Birthdate input (date picker)
  - [ ] Environment URLs (3 text inputs)
  - [ ] JWT expiration (number input)
  - [ ] Save button
  - [ ] Reset to defaults button
  - [ ] Success/error messages
- [ ] Create `/src/options/options.css`
  - [ ] Professional settings layout
  - [ ] Form organization
  - [ ] Visual feedback
- [ ] Create `/src/options/options.js`
  - [ ] Load current configuration
  - [ ] Validate inputs
  - [ ] Save configuration
  - [ ] Reset to defaults
  - [ ] User feedback

**Deliverables**:
- Complete settings page
- Configuration persistence
- Input validation

**Checkpoint**: `CHECKPOINT_05_OPTIONS.md`

---

## Phase 6: Icons & Branding
**Objective**: Create neutral visual identity

### Tasks:
- [ ] Design/generate icon16.png (neutral key/lock icon)
- [ ] Design/generate icon48.png
- [ ] Design/generate icon128.png
- [ ] Update manifest.json with icon paths
- [ ] Ensure no brand references

**Deliverables**:
- Complete icon set
- Professional appearance

**Checkpoint**: `CHECKPOINT_06_ICONS.md`

---

## Phase 7: Integration & Testing
**Objective**: End-to-end validation

### Tasks:
- [ ] Load extension in Chrome (Developer Mode)
- [ ] Test main popup flow
  - [ ] CPF input validation
  - [ ] Environment selection
  - [ ] URL generation
  - [ ] Tab opening
- [ ] Test settings page
  - [ ] Load configuration
  - [ ] Save configuration
  - [ ] Reset functionality
  - [ ] Persistence verification
- [ ] Test edge cases
  - [ ] Invalid CPF
  - [ ] Empty fields
  - [ ] Invalid URLs
  - [ ] Network issues
- [ ] Verify no brand references in code

**Deliverables**:
- Fully tested extension
- Bug fixes applied
- Edge cases handled

**Checkpoint**: `CHECKPOINT_07_TESTING.md`

---

## Phase 8: Documentation & Finalization
**Objective**: Complete user and developer documentation

### Tasks:
- [ ] Create comprehensive README.md
  - [ ] Installation instructions
  - [ ] Usage guide
  - [ ] Configuration guide
  - [ ] Troubleshooting
- [ ] Add code comments where needed
- [ ] Create CHANGELOG.md
- [ ] Final code review
- [ ] Version 1.0.0 tag

**Deliverables**:
- Complete documentation
- Production-ready extension

**Checkpoint**: `CHECKPOINT_08_FINAL.md`

---

## Development Guidelines for AI Agents

### Before Starting Each Phase:
1. Read the phase objective and tasks
2. Review previous checkpoint (if exists)
3. Verify file structure
4. Check dependencies

### During Development:
1. Follow file structure exactly
2. Use meaningful variable names
3. Keep functions small and focused
4. Add minimal comments for clarity
5. Validate inputs rigorously
6. Handle errors gracefully

### After Completing Each Phase:
1. Create checkpoint file in `.ai-workspace/checkpoints/`
2. Document completed tasks
3. Note any deviations from plan
4. List files created/modified
5. Verify deliverables

### Code Style:
- **JavaScript**: ES6+ syntax, const/let (no var)
- **HTML**: Semantic tags, accessible
- **CSS**: Mobile-first, BEM naming optional
- **Formatting**: 2-space indentation
- **Comments**: Only when necessary for clarity

### Testing Approach:
- Manual testing in Chrome browser
- Developer console for debugging
- Test in Developer Mode before packaging
- No automated tests required

### Key Principles:
- **Simplicity**: Avoid over-engineering
- **Clarity**: Code should be self-explanatory
- **Compatibility**: Use standard Web APIs
- **Security**: Validate all inputs
- **Privacy**: No data collection or tracking
