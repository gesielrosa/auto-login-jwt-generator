# Technical Specifications

## Chrome Extension Manifest V3

### Required Permissions
```json
{
  "permissions": [
    "storage",
    "tabs"
  ]
}
```

- **storage**: For chrome.storage.sync API (configuration persistence)
- **tabs**: For opening generated URLs in new tabs

### Content Security Policy
```json
{
  "content_security_policy": {
    "extension_pages": "script-src 'self'; object-src 'self'"
  }
}
```

---

## Storage Schema

### Configuration Object
```typescript
interface Config {
  secret: string;              // JWT secret key (HS256)
  birthdate: string;           // Format: "DD/MM/YYYY"
  environments: {
    SIT: string;               // SIT environment URL
    HLG: string;               // HLG environment URL
    PRD: string;               // PRD environment URL
  };
  jwtExpiration: number;       // Expiration time in seconds
}
```

### Storage Key
- Primary key: `"appConfig"`
- Storage type: `chrome.storage.sync`
- Max size: 8KB per item (well within limits)

---

## JWT Structure

### Header
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

### Payload
```json
{
  "tipo": "LOGIN_AUTOMATICO",
  "iat": 1234567890,    // Unix timestamp (issued at)
  "exp": 1234568190     // Unix timestamp (expiration)
}
```

### Signing
- Algorithm: **HS256** (HMAC with SHA-256)
- Library: jsrsasign v10.5.25+
- Secret: Configurable via settings

---

## URL Generation Flow

### Step 1: Create Login Payload
```javascript
const loginPayload = {
  cpf: "12345678901",
  dataNascimento: "10/10/2020"
};
```

### Step 2: Base64 Encode
```javascript
const jsonStr = JSON.stringify(loginPayload);
const base64 = btoa(unescape(encodeURIComponent(jsonStr)));
```

### Step 3: Generate JWT
```javascript
const now = Math.floor(Date.now() / 1000);
const jwt = KJUR.jws.JWS.sign("HS256", header, payload, secret);
```

### Step 4: Construct Final URL
```javascript
const finalUrl = `${baseUrl}?login=${encodeURIComponent(base64)}&auth=${encodeURIComponent(jwt)}`;
```

### Example Output
```
https://example.com/#/?login=eyJjcGYiOiIxMjM0NTY3ODkwMSIsImRhdGFOYXNjaW1lbnRvIjoiMTAvMTAvMjAyMCJ9&auth=eyJhbGc...
```

---

## API Modules

### storage.js
```javascript
// Get configuration (returns Promise)
async function getConfig()

// Save configuration (returns Promise)
async function saveConfig(config)

// Reset to defaults (returns Promise)
async function resetConfig()

// Get default configuration (synchronous)
function getDefaultConfig()
```

### jwt-generator.js
```javascript
// Create base64 encoded login payload
function createLoginPayload(cpf, birthdate)

// Generate JWT token
function generateJWT(secret, expirationSeconds)

// Generate complete URL
function generateLoginURL(baseUrl, cpf, birthdate, secret, expirationSeconds)
```

---

## Input Validation Rules

### CPF
- **Type**: String (numeric only)
- **Length**: Exactly 11 digits
- **Pattern**: `/^\d{11}$/`
- **Sanitization**: Remove non-numeric characters
- **Display**: No formatting (plain digits)

### Birthdate
- **Format**: DD/MM/YYYY
- **Pattern**: `/^\d{2}\/\d{2}\/\d{4}$/`
- **Validation**: Must be valid calendar date
- **Default**: "10/10/2020" (readonly in popup)
- **Editable**: Only in settings

### Secret Key
- **Type**: String
- **Min Length**: 1 character
- **Default**: ""
- **Display**: Password field (masked)

### Environment URLs
- **Type**: String (URL)
- **Pattern**: Must start with http:// or https://
- **Validation**: Basic URL format check
- **Trailing slash**: Not enforced (handled in code)

### JWT Expiration
- **Type**: Number (integer)
- **Min**: 60 seconds (1 minute)
- **Max**: 3600 seconds (1 hour)
- **Default**: 300 seconds (5 minutes)
- **Unit**: Seconds

---

## UI/UX Specifications

### Popup Dimensions
- **Width**: 380px (fixed)
- **Height**: Auto (max 600px)
- **Min Width**: 320px

### Color Palette (Neutral)
```css
--primary-color: #0066cc;      /* Primary blue */
--secondary-color: #6c757d;    /* Gray */
--success-color: #28a745;      /* Green */
--warning-color: #ffc107;      /* Yellow */
--danger-color: #dc3545;       /* Red */
--dark-color: #343a40;         /* Dark gray */
--light-bg: #f8f9fa;           /* Light background */
--border-color: #dee2e6;       /* Border */
```

### Typography
- **Font Family**: System fonts (-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto)
- **Base Size**: 14px
- **Headings**: 18px (h4), bold

### Buttons
- **Height**: 38px
- **Border Radius**: 6px
- **Padding**: 8px 16px
- **Font Weight**: 500

### Form Inputs
- **Height**: 38px
- **Border**: 1px solid #dee2e6
- **Border Radius**: 4px
- **Padding**: 8px 12px
- **Focus**: Blue border (#0066cc)

### Environment Buttons
- SIT: Dark/Gray theme
- HLG: Warning/Yellow theme
- PRD: Danger/Red theme
- Active state: 2px border

---

## Error Handling

### User-Facing Errors
```javascript
// Invalid CPF
"CPF deve conter exatamente 11 dígitos"

// Invalid birthdate
"Data de nascimento inválida"

// Missing configuration
"Configuração não encontrada. Configure nas opções."

// URL generation failed
"Erro ao gerar URL. Verifique as configurações."

// Storage error
"Erro ao salvar configurações. Tente novamente."
```

### Console Logging
- Use `console.error()` for errors
- Use `console.warn()` for warnings
- Use `console.log()` for debugging (remove in production)

---

## Browser Compatibility

### Minimum Chrome Version
- **Version**: 88+ (Manifest V3 support)
- **Release Date**: January 2021

### Web APIs Used
- `chrome.storage.sync`
- `chrome.tabs.create`
- `window.localStorage` (fallback, not used)
- `btoa()` / `atob()` (Base64 encoding)
- `fetch()` (not used, but available)

### ES6+ Features Used
- `const` / `let`
- Arrow functions
- Template literals
- `async` / `await`
- Promises
- Destructuring
- Spread operator

---

## Performance Considerations

### Load Time
- Target: < 100ms popup open
- Minimize DOM manipulation
- Cache configuration in memory

### Storage Access
- Read on popup open (once)
- Write only on settings save
- Use sync for cross-device support

### JWT Generation
- Typically < 10ms
- Synchronous operation
- No network calls

### Memory Usage
- Target: < 5MB total
- Minimal DOM elements
- Clean up event listeners

---

## Security Best Practices

### Input Sanitization
- Strip HTML tags from inputs
- Validate CPF format strictly
- URL encode all parameters

### Secret Storage
- Use chrome.storage.sync (encrypted)
- Never log secret to console
- Mask in UI (password field)

### JWT Security
- Short expiration (5 minutes default)
- HS256 algorithm only
- Include timestamp validation

### No Data Leakage
- No analytics or tracking
- No external API calls
- No user data storage beyond config

---

## File Size Targets

### Total Extension Size
- Target: < 500KB unpacked
- With jsrsasign: ~300KB
- Icons: ~50KB total
- Code: ~50KB total

### Individual Files
- manifest.json: < 2KB
- popup.html: < 5KB
- popup.js: < 10KB
- options.html: < 8KB
- options.js: < 10KB
- CSS files: < 5KB each
- jsrsasign: ~200KB (external lib)

---

## Development Tools

### Required
- Chrome Browser (version 88+)
- Text editor (VS Code recommended)
- Chrome DevTools

### Optional
- JSON formatter/validator
- Base64 encoder/decoder (for testing)
- JWT debugger (jwt.io)

### Testing
- Chrome Developer Mode (chrome://extensions)
- Console logging
- Network tab (for URL verification)
- Storage inspector (DevTools > Application)
