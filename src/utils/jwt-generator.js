// JWT Generator utility module
// Handles JWT token generation and URL construction
// Requires jsrsasign library (KJUR object)

/**
 * Create base64 encoded login payload
 * @param {string} cpf - CPF number (11 digits)
 * @param {string} birthdate - Birthdate in DD/MM/YYYY format
 * @returns {string} Base64 encoded JSON payload
 */
function createLoginPayload(cpf, birthdate) {
  const payload = {
    cpf: cpf,
    dataNascimento: birthdate
  };
  
  const jsonString = JSON.stringify(payload);
  const base64 = btoa(unescape(encodeURIComponent(jsonString)));
  
  return base64;
}

/**
 * Generate JWT token
 * @param {string} secret - Secret key for HS256 signing
 * @param {number} expirationSeconds - Token expiration time in seconds
 * @returns {string} JWT token
 */
function generateJWT(secret, expirationSeconds) {
  const now = Math.floor(Date.now() / 1000);
  const exp = now + expirationSeconds;
  
  const header = {
    alg: "HS256",
    typ: "JWT"
  };
  
  const payload = {
    tipo: "LOGIN_AUTOMATICO",
    iat: now,
    exp: exp
  };
  
  const headerString = JSON.stringify(header);
  const payloadString = JSON.stringify(payload);
  
  const jwt = KJUR.jws.JWS.sign("HS256", headerString, payloadString, secret);
  
  return jwt;
}

/**
 * Generate complete login URL
 * @param {string} baseUrl - Base URL for the environment
 * @param {string} cpf - CPF number (11 digits)
 * @param {string} birthdate - Birthdate in DD/MM/YYYY format
 * @param {string} secret - Secret key for JWT signing
 * @param {number} expirationSeconds - JWT expiration time in seconds
 * @returns {string} Complete login URL with parameters
 */
function generateLoginURL(baseUrl, cpf, birthdate, secret, expirationSeconds) {
  const loginPayload = createLoginPayload(cpf, birthdate);
  const jwtToken = generateJWT(secret, expirationSeconds);
  
  const finalUrl = `${baseUrl}?login=${encodeURIComponent(loginPayload)}&auth=${encodeURIComponent(jwtToken)}`;
  
  return finalUrl;
}
