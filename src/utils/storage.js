// Storage utility module for Chrome Extension
// Manages configuration persistence using chrome.storage.sync

/**
 * Get default configuration
 * @returns {Object} Default configuration object
 */
function getDefaultConfig() {
  return {
    secret: "",
    birthdate: "10/10/2020",
    environments: {
      SIT: "https://PATH.PORTAL.com.br/#/",
      HLG: "https://PATH.PORTAL.com.br/#/",
      PRD: "https://PATH.PORTAL.com.br/#/"
    },
    jwtExpiration: 300,
    lastCPF: "",
    lastBirthdate: ""
  };
}

/**
 * Get configuration from storage
 * @returns {Promise<Object>} Configuration object
 */
async function getConfig() {
  try {
    const result = await chrome.storage.sync.get('appConfig');
    
    if (result.appConfig) {
      return result.appConfig;
    }
    
    // If no config exists, save and return defaults
    const defaultConfig = getDefaultConfig();
    await saveConfig(defaultConfig);
    return defaultConfig;
  } catch (error) {
    console.error('Error getting configuration:', error);
    return getDefaultConfig();
  }
}

/**
 * Save configuration to storage
 * @param {Object} config - Configuration object to save
 * @returns {Promise<boolean>} True if saved successfully
 */
async function saveConfig(config) {
  try {
    await chrome.storage.sync.set({ appConfig: config });
    return true;
  } catch (error) {
    console.error('Error saving configuration:', error);
    return false;
  }
}

/**
 * Reset configuration to defaults
 * @returns {Promise<boolean>} True if reset successfully
 */
async function resetConfig() {
  try {
    const defaultConfig = getDefaultConfig();
    await chrome.storage.sync.set({ appConfig: defaultConfig });
    return true;
  } catch (error) {
    console.error('Error resetting configuration:', error);
    return false;
  }
}

/**
 * Save last used CPF
 * @param {string} cpf - CPF to save
 * @returns {Promise<boolean>} True if saved successfully
 */
async function saveLastCPF(cpf) {
  try {
    const config = await getConfig();
    config.lastCPF = cpf;
    await saveConfig(config);
    return true;
  } catch (error) {
    console.error('Error saving last CPF:', error);
    return false;
  }
}

/**
 * Save last used birthdate
 * @param {string} birthdate - Birthdate to save (DD/MM/YYYY)
 * @returns {Promise<boolean>} True if saved successfully
 */
async function saveLastBirthdate(birthdate) {
  try {
    const config = await getConfig();
    config.lastBirthdate = birthdate;
    await saveConfig(config);
    return true;
  } catch (error) {
    console.error('Error saving last birthdate:', error);
    return false;
  }
}
