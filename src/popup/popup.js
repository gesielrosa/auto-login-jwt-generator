// Popup interface script
// Handles user interaction and URL generation

let selectedEnvironment = 'SIT';
let currentConfig = null;

// DOM elements
const cpfInput = document.getElementById('cpf');
const birthdateInput = document.getElementById('birthdate');
const generateBtn = document.getElementById('generateBtn');
const messageDiv = document.getElementById('message');
const settingsLink = document.getElementById('settingsLink');
const envButtons = document.querySelectorAll('.env-btn');

/**
 * Show message to user
 */
function showMessage(text, type = 'info') {
  messageDiv.textContent = text;
  messageDiv.className = `message ${type}`;
  
  if (type === 'success') {
    setTimeout(() => {
      messageDiv.textContent = '';
      messageDiv.className = 'message';
    }, 3000);
  }
}

/**
 * Validate CPF input with regex and checksum
 */
function validateCPF(cpf) {
  const cleaned = cpf.replace(/\D/g, '');
  
  if (cleaned.length !== 11) {
    return { valid: false, message: 'CPF deve conter exatamente 11 dígitos' };
  }
  
  // Check for known invalid CPFs (all same digits)
  if (/^(\d)\1{10}$/.test(cleaned)) {
    return { valid: false, message: 'CPF inválido' };
  }
  
  // Validate CPF checksum
  let sum = 0;
  let remainder;
  
  // Validate first digit
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleaned.substring(i - 1, i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleaned.substring(9, 10))) {
    return { valid: false, message: 'CPF inválido' };
  }
  
  // Validate second digit
  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleaned.substring(i - 1, i)) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleaned.substring(10, 11))) {
    return { valid: false, message: 'CPF inválido' };
  }
  
  return { valid: true, value: cleaned };
}

/**
 * Validate birthdate format
 */
function validateBirthdate(dateStr) {
  const pattern = /^\d{2}\/\d{2}\/\d{4}$/;
  
  if (!pattern.test(dateStr)) {
    return { valid: false, message: 'Data inválida. Use DD/MM/AAAA' };
  }
  
  const [day, month, year] = dateStr.split('/').map(Number);
  const date = new Date(year, month - 1, day);
  
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return { valid: false, message: 'Data inválida' };
  }
  
  return { valid: true };
}

/**
 * Initialize popup
 */
async function initialize() {
  try {
    currentConfig = await getConfig();
    
    // Load last used birthdate if available, otherwise use default
    if (currentConfig.lastBirthdate) {
      birthdateInput.value = currentConfig.lastBirthdate;
    } else {
      birthdateInput.value = currentConfig.birthdate;
    }
    
    // Load last used CPF if available
    if (currentConfig.lastCPF) {
      cpfInput.value = currentConfig.lastCPF;
    }
    
    showMessage(`Ambiente: ${selectedEnvironment}`, 'info');
  } catch (error) {
    console.error('Error initializing popup:', error);
    showMessage('Erro ao carregar configurações', 'error');
  }
}

/**
 * Handle CPF input
 */
cpfInput.addEventListener('input', (e) => {
  e.target.value = e.target.value.replace(/\D/g, '').slice(0, 11);
});

/**
 * Handle environment selection
 */
envButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    envButtons.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');
    selectedEnvironment = btn.dataset.env;
    showMessage(`Ambiente: ${selectedEnvironment}`, 'info');
  });
});

/**
 * Handle form submission
 */
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  try {
    const cpf = cpfInput.value.trim();
    const birthdate = birthdateInput.value.trim();
    
    // Validate CPF
    const cpfValidation = validateCPF(cpf);
    if (!cpfValidation.valid) {
      showMessage(cpfValidation.message, 'error');
      return;
    }
    
    // Validate birthdate
    const birthdateValidation = validateBirthdate(birthdate);
    if (!birthdateValidation.valid) {
      showMessage(birthdateValidation.message, 'error');
      return;
    }
    
    if (!currentConfig) {
      showMessage('Configuração não encontrada. Configure nas opções.', 'error');
      return;
    }
    
    // Check if secret is configured
    if (!currentConfig.secret || currentConfig.secret.trim() === '') {
      showMessage('Chave secreta não configurada. Acesse as configurações.', 'error');
      return;
    }
    
    const baseUrl = currentConfig.environments[selectedEnvironment];
    if (!baseUrl) {
      showMessage('URL do ambiente não configurada', 'error');
      return;
    }
    
    generateBtn.disabled = true;
    showMessage('🔄 Gerando URL...', 'info');
    
    const url = generateLoginURL(
      baseUrl,
      cpfValidation.value,
      birthdate,
      currentConfig.secret,
      currentConfig.jwtExpiration
    );
    
    // Save last used CPF and birthdate
    await saveLastCPF(cpfValidation.value);
    await saveLastBirthdate(birthdate);
    
    showMessage('✅ URL gerada! Abrindo...', 'success');
    
    await chrome.tabs.create({ url: url });
    
    generateBtn.disabled = false;
    
  } catch (error) {
    console.error('Error generating URL:', error);
    showMessage('Erro ao gerar URL. Verifique as configurações.', 'error');
    generateBtn.disabled = false;
  }
});

/**
 * Handle settings link click
 */
settingsLink.addEventListener('click', (e) => {
  e.preventDefault();
  chrome.runtime.openOptionsPage();
});

// Initialize on load
initialize();
