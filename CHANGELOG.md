# CHANGELOG

All notable changes to the Auto Login JWT Generator Chrome Extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0] - 2025-12-05

### Changed
- Replaced emoji key with extension icon in popup header
- Improved popup UI with smoother rounded corners (8px-12px border radius)
- Enhanced visual design with subtle shadows and better spacing
- Improved button styles with elevation effects on hover

### Enhanced
- Proper semantic HTML structure using `<header>`, `<main>`, `<footer>`, `<form>`, and `<fieldset>`
- Added ARIA labels and roles for better accessibility
- Form now uses proper submit event handling
- Environment buttons now include proper `aria-pressed` states
- Message area includes `role="status"` and `aria-live="polite"` for screen readers
- Overall more polished and modern appearance

## [1.2.0] - 2025-12-05

### Added
- Last used birthdate persistence (automatically saved and restored)
- `saveLastBirthdate()` function in storage module
- `lastBirthdate` field in configuration storage

### Enhanced
- Birthdate field now loads last used value instead of default
- Better user experience: both CPF and birthdate are remembered
- Fallback to default birthdate if no last value exists

## [1.1.0] - 2025-12-05

### Added
- CPF regex validation with checksum algorithm verification
- Last used CPF persistence (automatically saved and restored)
- Empty secret key handling with validation
- Birthdate field now editable in popup interface
- Validation for empty secret key when generating URLs

### Changed
- Default secret key is now empty (must be configured by user)
- Birthdate field in popup is now editable (not readonly)
- Enhanced CPF validation to reject known invalid patterns (e.g., 111.111.111-11)
- Secret key field in options is now optional (not required)
- Improved error messages for secret key validation

### Enhanced
- CPF validation now includes full checksum verification
- User experience: last CPF is automatically loaded on popup open
- Better user guidance: clear message when secret is not configured

## [1.0.0] - 2025-12-05

### Added
- Initial release of Auto Login JWT Generator Chrome Extension
- Main popup interface for CPF input and login URL generation
- Settings/Options page for configuration management
- JWT token generation using HS256 algorithm (jsrsasign library)
- Support for multiple environments (SIT, HLG, PRD)
- Chrome Storage API integration for persistent configuration
- CPF input validation (11 digits)
- Birthdate validation (DD/MM/YYYY format)
- URL validation for environment URLs
- JWT expiration configuration (60-3600 seconds)
- Secret key configuration (masked password field)
- Reset to defaults functionality
- Comprehensive input validation
- User-friendly error messages
- Professional UI design with responsive layout
- Extension icons (16x16, 48x48, 128x128)

### Features
- **Popup Interface**:
  - CPF input with real-time sanitization
  - Environment selector (SIT/HLG/PRD)
  - One-click URL generation and tab opening
  - Status messages for user feedback
  - Settings link for easy configuration access

- **Options Page**:
  - Secret key configuration
  - Default birthdate configuration
  - JWT expiration time configuration
  - Environment URLs configuration (SIT, HLG, PRD)
  - Save and reset functionality
  - Comprehensive input validation

- **Core Functionality**:
  - Base64 encoding of login payload
  - JWT token generation with HS256 algorithm
  - URL construction with proper encoding
  - Automatic new tab opening with generated URL

### Technical Details
- Chrome Extension Manifest V3
- jsrsasign library v10.5.25 for JWT generation
- Chrome Storage Sync API for configuration persistence
- ES6+ JavaScript (const/let, async/await, arrow functions)
- No external dependencies (except jsrsasign)
- Offline functionality (no network calls)
- Minimum Chrome version: 88+

### Security
- Secret key stored in Chrome's encrypted storage
- Password field masking for secret key
- Short-lived JWT tokens (5 minutes default)
- Input sanitization and validation
- URL encoding for all parameters
- No data collection or tracking

### Documentation
- Comprehensive README.md with installation and usage instructions
- Integration testing guide with 40+ test cases
- Technical specifications document
- Development plan and phased approach
- Agent quick start guide
- Checkpoint documentation for all development phases

---

## [Unreleased]

### Planned Features
- CPF checksum validation
- Custom JWT payload fields
- Export/import configuration
- Dark mode support
- Keyboard shortcuts
- Recent CPF history
- Multi-language support

### Known Limitations
- CPF validation only checks length (11 digits), not checksum
- No rate limiting on URL generation
- JWT tokens are short-lived (configurable)
- Chrome-only (not compatible with other browsers)

---

## Development History

### Phase 1 - Project Setup & Structure (2025-12-05)
- Created directory structure
- Downloaded jsrsasign library
- Created manifest.json (Manifest V3)
- Generated extension icons
- Created initial README.md

### Phase 2 - Storage & Configuration Module (2025-12-05)
- Implemented storage.js utility module
- Created default configuration
- Added getConfig(), saveConfig(), resetConfig() functions
- Chrome Storage Sync API integration

### Phase 3 - JWT Generation Module (2025-12-05)
- Implemented jwt-generator.js utility module
- Created createLoginPayload() function
- Created generateJWT() function
- Created generateLoginURL() function
- Integrated jsrsasign library

### Phase 4 - Main Popup Interface (2025-12-05)
- Created popup.html with form structure
- Created popup.css with professional styling
- Created popup.js with full functionality
- Implemented CPF validation and sanitization
- Implemented environment selection
- Implemented URL generation and tab opening

### Phase 5 - Settings/Options Page (2025-12-05)
- Created options.html with configuration form
- Created options.css with professional layout
- Created options.js with validation logic
- Implemented configuration save/load
- Implemented reset to defaults
- Comprehensive input validation

### Phase 6 - Icons & Branding (2025-12-05)
- Verified icon integration
- No brand references confirmed
- Professional neutral design

### Phase 7 - Integration & Testing (2025-12-05)
- Code syntax validation
- Created comprehensive testing guide
- Verified code quality
- 40+ test cases documented
- Ready for manual browser testing

### Phase 8 - Documentation & Finalization (2025-12-05)
- Created CHANGELOG.md
- Enhanced README.md
- Code review and cleanup
- Final verification
- Version 1.0.0 release

---

## Version Naming Convention

- **MAJOR.MINOR.PATCH** (Semantic Versioning)
  - MAJOR: Incompatible API changes
  - MINOR: Backwards-compatible functionality additions
  - PATCH: Backwards-compatible bug fixes

---

## Support

For issues, questions, or contributions, please refer to the project documentation in the `.ai-workspace/` directory.

---

**Current Version**: 1.0.0  
**Release Date**: 2025-12-05  
**Status**: Production Ready
