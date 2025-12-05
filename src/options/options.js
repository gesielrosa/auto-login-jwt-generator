// Options page script
// Handles configuration management

// DOM elements
const configForm = document.getElementById('configForm');
const secretInput = document.getElementById('secret');
const birthdateInput = document.getElementById('birthdate');
const jwtExpirationInput = document.getElementById('jwtExpiration');
const urlSITInput = document.getElementById('urlSIT');
const urlHLGInput = document.getElementById('urlHLG');
const urlPRDInput = document.getElementById('urlPRD');
const resetBtn = document.getElementById('resetBtn');
const messageDiv = document.getElementById('message');

/**
 * Show message to user
 */
function showMessage(text, type = 'info') {
  messageDiv.textContent = text;
  messageDiv.className = `message ${type}`;
  
  setTimeout(() => {
    messageDiv.textContent = '';
    messageDiv.className = 'message';
  }, 4000);
}

/**
 * Validate birthdate format
 */
function validateBirthdate(dateStr) {
  const pattern = /^\d{2}\/\d{2}\/\d{4}$/;
  
  if (!pattern.test(dateStr)) {
    return { valid: false, message: 'Formato inválido. Use DD/MM/AAAA' };
  }
  
  const [day, month, year] = dateStr.split('/').map(Number);
  const date = new Date(year, month - 1, day);
  
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return { valid: false, message: 'Data inválida' };
  }
  
  return { valid: true };
}

/**
 * Validate URL format
 */
function validateURL(url) {
  try {
    new URL(url);
    return { valid: true };
  } catch {
    return { valid: false, message: 'URL inválida' };
  }
}

/**
 * Load configuration into form
 */
async function loadConfiguration() {
  try {
    const config = await getConfig();
    
    secretInput.value = config.secret;
    birthdateInput.value = config.birthdate;
    jwtExpirationInput.value = config.jwtExpiration;
    urlSITInput.value = config.environments.SIT;
    urlHLGInput.value = config.environments.HLG;
    urlPRDInput.value = config.environments.PRD;
    
    showMessage('Configurações carregadas', 'info');
  } catch (error) {
    console.error('Error loading configuration:', error);
    showMessage('Erro ao carregar configurações', 'error');
  }
}

/**
 * Save configuration from form
 */
async function saveConfiguration(e) {
  e.preventDefault();
  
  try {
    const secret = secretInput.value.trim();
    const birthdate = birthdateInput.value.trim();
    const jwtExpiration = parseInt(jwtExpirationInput.value, 10);
    const urlSIT = urlSITInput.value.trim();
    const urlHLG = urlHLGInput.value.trim();
    const urlPRD = urlPRDInput.value.trim();
    
    // Secret is now optional, can be empty
    
    const birthdateValidation = validateBirthdate(birthdate);
    if (!birthdateValidation.valid) {
      showMessage(birthdateValidation.message, 'error');
      return;
    }
    
    if (jwtExpiration < 60 || jwtExpiration > 3600) {
      showMessage('Expiração deve estar entre 60 e 3600 segundos', 'error');
      return;
    }
    
    const urlSITValidation = validateURL(urlSIT);
    if (!urlSITValidation.valid) {
      showMessage('URL SIT inválida', 'error');
      return;
    }
    
    const urlHLGValidation = validateURL(urlHLG);
    if (!urlHLGValidation.valid) {
      showMessage('URL HLG inválida', 'error');
      return;
    }
    
    const urlPRDValidation = validateURL(urlPRD);
    if (!urlPRDValidation.valid) {
      showMessage('URL PRD inválida', 'error');
      return;
    }
    
    const config = {
      secret: secret,
      birthdate: birthdate,
      environments: {
        SIT: urlSIT,
        HLG: urlHLG,
        PRD: urlPRD
      },
      jwtExpiration: jwtExpiration
    };
    
    const saved = await saveConfig(config);
    
    if (saved) {
      showMessage('✅ Configurações salvas com sucesso!', 'success');
    } else {
      showMessage('Erro ao salvar configurações', 'error');
    }
    
  } catch (error) {
    console.error('Error saving configuration:', error);
    showMessage('Erro ao salvar configurações', 'error');
  }
}

/**
 * Reset configuration to defaults
 */
async function resetConfiguration() {
  if (!confirm('Tem certeza que deseja restaurar as configurações padrão?')) {
    return;
  }
  
  try {
    const reset = await resetConfig();
    
    if (reset) {
      await loadConfiguration();
      showMessage('✅ Configurações restauradas para os padrões', 'success');
    } else {
      showMessage('Erro ao restaurar configurações', 'error');
    }
    
  } catch (error) {
    console.error('Error resetting configuration:', error);
    showMessage('Erro ao restaurar configurações', 'error');
  }
}

// Event listeners
configForm.addEventListener('submit', saveConfiguration);
resetBtn.addEventListener('click', resetConfiguration);

// Load configuration on page load
loadConfiguration();
