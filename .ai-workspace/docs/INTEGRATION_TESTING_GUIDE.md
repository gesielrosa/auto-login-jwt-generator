# Integration Testing Guide

## Extension Loading Test

### Chrome Extension Installation
1. Open Chrome browser
2. Navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top-right)
4. Click "Load unpacked"
5. Select the `/src` folder
6. **Expected Result**: Extension loads without errors

### Verification Checklist
- [ ] Extension appears in extensions list
- [ ] Extension icon visible in toolbar
- [ ] No errors in extension details
- [ ] Version shows as 1.0.0

---

## Phase 1: Popup Interface Tests

### Test 1.1: Popup Opens
**Steps:**
1. Click extension icon in toolbar
2. **Expected**: Popup opens (380px width)
3. **Expected**: Title shows "🔑 Auto Login"

### Test 1.2: Default Configuration
**Steps:**
1. Open popup
2. Check birthdate field
3. **Expected**: Shows "10/10/2020" (readonly, gray background)
4. **Expected**: SIT button is active (blue border)
5. **Expected**: Message shows "Ambiente: SIT"

### Test 1.3: CPF Input Validation - Invalid
**Steps:**
1. Enter CPF: "123"
2. Click "Gerar e Entrar"
3. **Expected**: Error message "CPF deve conter exatamente 11 dígitos"

### Test 1.4: CPF Input Validation - Valid
**Steps:**
1. Enter CPF: "12345678901"
2. Click "Gerar e Entrar"
3. **Expected**: Message "🔄 Gerando URL..."
4. **Expected**: Message changes to "✅ URL gerada! Abrindo..."
5. **Expected**: New tab opens with URL

### Test 1.5: CPF Input Sanitization
**Steps:**
1. Enter CPF: "123-456-789-01"
2. **Expected**: Input auto-cleans to "12345678901"
3. **Expected**: No non-digit characters allowed

### Test 1.6: Environment Selection
**Steps:**
1. Click HLG button
2. **Expected**: HLG button becomes active (blue border)
3. **Expected**: SIT button loses active state
4. **Expected**: Message shows "Ambiente: HLG"
5. Repeat for PRD button

### Test 1.7: Settings Link
**Steps:**
1. Click "⚙️ Configurações" link
2. **Expected**: Options page opens in new tab

---

## Phase 2: Options Page Tests

### Test 2.1: Options Page Opens
**Steps:**
1. Right-click extension icon
2. Select "Options"
3. **Expected**: Options page opens
4. **Expected**: All fields populated with default values

### Test 2.2: Default Values Verification
**Steps:**
1. Open options page
2. Verify field values:
   - Secret: "" (masked)
   - Birthdate: "10/10/2020"
   - JWT Expiration: 300
   - URL SIT: ""
   - URL HLG: ""
   - URL PRD: ""

### Test 2.3: Birthdate Validation - Invalid Format
**Steps:**
1. Change birthdate to "2020-10-10"
2. Click "💾 Salvar Configurações"
3. **Expected**: Error "Formato inválido. Use DD/MM/AAAA"

### Test 2.4: Birthdate Validation - Invalid Date
**Steps:**
1. Change birthdate to "99/99/9999"
2. Click "💾 Salvar Configurações"
3. **Expected**: Error "Data inválida"

### Test 2.5: JWT Expiration Validation - Too Low
**Steps:**
1. Change JWT Expiration to 30
2. Click "💾 Salvar Configurações"
3. **Expected**: Error "Expiração deve estar entre 60 e 3600 segundos"

### Test 2.6: JWT Expiration Validation - Too High
**Steps:**
1. Change JWT Expiration to 5000
2. Click "💾 Salvar Configurações"
3. **Expected**: Error "Expiração deve estar entre 60 e 3600 segundos"

### Test 2.7: URL Validation - Invalid URL
**Steps:**
1. Change URL SIT to "not-a-url"
2. Click "💾 Salvar Configurações"
3. **Expected**: Error "URL SIT inválida"

### Test 2.8: Save Valid Configuration
**Steps:**
1. Change secret to "test-secret-key"
2. Change birthdate to "01/01/2000"
3. Change JWT Expiration to 600
4. Click "💾 Salvar Configurações"
5. **Expected**: Success message "✅ Configurações salvas com sucesso!"

### Test 2.9: Configuration Persistence
**Steps:**
1. Save custom configuration (Test 2.8)
2. Close options page
3. Reopen options page
4. **Expected**: All custom values still present

### Test 2.10: Reset to Defaults
**Steps:**
1. Click "🔄 Restaurar Padrões"
2. **Expected**: Confirmation dialog appears
3. Click "OK"
4. **Expected**: Success message "✅ Configurações restauradas para os padrões"
5. **Expected**: All fields reset to default values

---

## Phase 3: Integration Tests

### Test 3.1: Configuration Sync (Options → Popup)
**Steps:**
1. Open options, change birthdate to "15/05/1990"
2. Save configuration
3. Close options
4. Open popup
5. **Expected**: Birthdate field shows "15/05/1990"

### Test 3.2: URL Generation with Custom Config
**Steps:**
1. Open options
2. Change JWT Expiration to 600
3. Save configuration
4. Open popup
5. Enter CPF: "12345678901"
6. Click "Gerar e Entrar"
7. **Expected**: New tab opens
8. **Expected**: URL contains valid JWT with 600 second expiration

### Test 3.3: Multi-Environment URL Generation
**Steps:**
1. Open popup
2. Enter CPF: "98765432100"
3. Select SIT, click "Gerar e Entrar"
4. **Expected**: URL starts with SIT base URL
5. Repeat for HLG and PRD
6. **Expected**: URLs use correct base URLs

### Test 3.4: JWT Token Validation
**Steps:**
1. Generate URL with CPF "12345678901"
2. Copy JWT token from URL (auth parameter)
3. Paste into https://jwt.io/
4. **Expected**: Header shows `{"alg":"HS256","typ":"JWT"}`
5. **Expected**: Payload contains `{"tipo":"LOGIN_AUTOMATICO","iat":...,"exp":...}`
6. **Expected**: iat and exp are Unix timestamps
7. **Expected**: exp - iat = 300 (or configured value)

### Test 3.5: Login Payload Validation
**Steps:**
1. Generate URL with CPF "12345678901"
2. Copy login parameter from URL
3. Decode base64
4. **Expected**: JSON: `{"cpf":"12345678901","dataNascimento":"10/10/2020"}`

---

## Phase 4: Edge Case Tests

### Test 4.1: Empty CPF
**Steps:**
1. Open popup
2. Leave CPF empty
3. Click "Gerar e Entrar"
4. **Expected**: Error "CPF deve conter exatamente 11 dígitos"

### Test 4.2: Special Characters in CPF
**Steps:**
1. Enter CPF: "123.456.789-01"
2. **Expected**: Auto-sanitizes to "12345678901"

### Test 4.3: Empty Secret Key
**Steps:**
1. Open options
2. Clear secret key field
3. Click "💾 Salvar Configurações"
4. **Expected**: Error "Chave secreta é obrigatória"

### Test 4.4: Rapid Button Clicks
**Steps:**
1. Open popup
2. Enter valid CPF
3. Click "Gerar e Entrar" multiple times rapidly
4. **Expected**: Button disables during processing
5. **Expected**: Only one tab opens

### Test 4.5: Reset Without Confirmation
**Steps:**
1. Open options
2. Click "🔄 Restaurar Padrões"
3. Click "Cancel" in confirmation dialog
4. **Expected**: Configuration unchanged

---

## Phase 5: Browser Console Tests

### Test 5.1: No Console Errors on Load
**Steps:**
1. Open DevTools (F12)
2. Load extension
3. Open popup
4. **Expected**: No errors in console

### Test 5.2: No Console Errors on Options
**Steps:**
1. Open DevTools (F12)
2. Open options page
3. **Expected**: No errors in console

### Test 5.3: Storage Verification
**Steps:**
1. Open DevTools (F12)
2. Go to Application tab → Storage → Sync Storage
3. **Expected**: See "appConfig" key
4. **Expected**: Value contains all configuration fields

---

## Phase 6: Performance Tests

### Test 6.1: Popup Load Time
**Steps:**
1. Click extension icon
2. Measure time to full render
3. **Expected**: < 100ms

### Test 6.2: URL Generation Speed
**Steps:**
1. Enter CPF and click generate
2. Measure time to tab open
3. **Expected**: < 500ms

### Test 6.3: Storage Write Speed
**Steps:**
1. Save configuration
2. Measure time to success message
3. **Expected**: < 200ms

---

## Phase 7: Security Tests

### Test 7.1: Secret Key Masking
**Steps:**
1. Open options page
2. Check secret key field
3. **Expected**: Field type is "password"
4. **Expected**: Value is masked with dots

### Test 7.2: URL Encoding
**Steps:**
1. Generate URL
2. Check login and auth parameters
3. **Expected**: Both are properly URL-encoded
4. **Expected**: No unencoded special characters

### Test 7.3: XSS Prevention
**Steps:**
1. Enter CPF: `<script>alert('xss')</script>`
2. **Expected**: Auto-sanitized to digits only
3. **Expected**: No script execution

---

## Test Results Summary

### Critical Tests (Must Pass)
- [ ] Extension loads without errors
- [ ] Popup opens and displays correctly
- [ ] CPF validation works
- [ ] URL generation works
- [ ] Configuration saves and persists
- [ ] No console errors

### Important Tests (Should Pass)
- [ ] All environment buttons work
- [ ] All validation rules work
- [ ] Reset to defaults works
- [ ] Settings link works
- [ ] JWT structure is correct

### Optional Tests (Nice to Have)
- [ ] Performance meets targets
- [ ] All edge cases handled
- [ ] Security measures in place

---

## Bug Tracking

### Issues Found
| # | Severity | Description | Status | Fix |
|---|----------|-------------|--------|-----|
| 1 | - | - | - | - |

### Notes
- Document any issues discovered during testing
- Prioritize by severity (Critical, High, Medium, Low)
- Track resolution status

---

## Final Verification

### Code Quality Checklist
- [x] No console.log in production code
- [x] All functions have error handling
- [x] ES6+ syntax used throughout
- [x] No var declarations
- [x] No brand references in code
- [x] Code is well-commented

### Extension Quality Checklist
- [ ] Extension loads without errors
- [ ] All features work as expected
- [ ] No browser console errors
- [ ] Configuration persists
- [ ] Performance is acceptable
- [ ] User experience is smooth

### Deployment Readiness
- [ ] All critical tests passed
- [ ] All important tests passed
- [ ] No known critical bugs
- [ ] Documentation is complete
- [ ] Version number is correct (1.0.0)
