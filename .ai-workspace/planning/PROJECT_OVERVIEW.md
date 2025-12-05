# Project Overview - Chrome Extension Auto Login

## Project Goal
Create a Chrome extension for automatic login URL generation using JWT authentication. The extension must be practical, maintain state, and provide configuration options.

## Key Requirements
- **NO brand references** in code (generic implementation)
- Configuration UI for base URLs and secret key
- State persistence using Chrome Storage API
- Popup for main form (CPF + birthdate input)
- Separate popup for settings/configuration
- Maximum compatibility (minimal external dependencies)
- User-friendly and efficient interface
- No unit tests required

## Current State
- Reference implementation exists: `GeradorLoginPortalComJwt 2.html`
- Uses jsrsasign library for JWT generation
- Supports 3 environments (SIT, HLG, PRD)
- Fixed birthdate: 10/10/2020
- JWT expiration: 300 seconds (5 minutes)

## Core Functionality
1. **Input**: CPF (11 digits)
2. **Process**: 
   - Create JSON payload: `{cpf, dataNascimento}`
   - Base64 encode payload
   - Generate JWT with HS256 algorithm
   - Construct final URL with login and auth parameters
3. **Output**: Open generated URL in new tab

## Technical Stack
- **Manifest**: V3 (latest Chrome Extension standard)
- **JWT Library**: jsrsasign (already in use)
- **Storage**: chrome.storage.sync API
- **UI**: Vanilla HTML/CSS/JS (Bootstrap for styling)
- **Crypto**: HS256 algorithm

## File Structure
```
/
├── .ai-workspace/           # AI agent workspace
│   ├── planning/            # Planning documents
│   ├── checkpoints/         # Development checkpoints
│   └── docs/                # Technical documentation
├── src/                     # Extension source code
│   ├── manifest.json        # Extension manifest V3
│   ├── popup/               # Main popup (form)
│   │   ├── popup.html
│   │   ├── popup.css
│   │   └── popup.js
│   ├── options/             # Settings page
│   │   ├── options.html
│   │   ├── options.css
│   │   └── options.js
│   ├── lib/                 # External libraries
│   │   └── jsrsasign-all-min.js
│   ├── utils/               # Shared utilities
│   │   ├── storage.js       # Storage helpers
│   │   └── jwt-generator.js # JWT generation logic
│   └── icons/               # Extension icons
│       ├── icon16.png
│       ├── icon48.png
│       └── icon128.png
└── README.md                # User documentation
```

## Default Configuration
```json
{
  "secret": "",
  "birthdate": "10/10/2020",
  "environments": {
    "SIT": "",
    "HLG": "",
    "PRD": ""
  },
  "jwtExpiration": 300
}
```

## Security Considerations
- Secret stored in chrome.storage.sync (encrypted by Chrome)
- JWT short-lived (5 minutes default)
- No brand identifiers in code
- Configuration isolated in settings

## Development Philosophy
- Keep it simple (KISS principle)
- Minimal dependencies
- Clear separation of concerns
- Self-documenting code
- Agent-friendly structure
