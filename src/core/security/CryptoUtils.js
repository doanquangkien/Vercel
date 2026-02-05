class CryptoUtils {
  async hash(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  generateId(prefix = '') {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 15);
    return prefix ? `${prefix}_${timestamp}${randomPart}` : `${timestamp}${randomPart}`;
  }

  generateToken(length = 32) {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  maskEmail(email) {
    if (!email || !email.includes('@')) return email;
    
    const [local, domain] = email.split('@');
    const [domainName, tld] = domain.split('.');
    
    const maskedLocal = local.length > 2 
      ? local[0] + '*'.repeat(local.length - 2) + local[local.length - 1]
      : local[0] + '*';
    
    const maskedDomain = domainName.length > 1
      ? domainName[0] + '*'.repeat(domainName.length - 1)
      : domainName;
    
    return `${maskedLocal}@${maskedDomain}.${tld}`;
  }

  maskPhone(phone) {
    if (!phone) return phone;
    
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length < 6) return phone;
    
    const start = cleaned.substring(0, 3);
    const end = cleaned.substring(cleaned.length - 3);
    const middle = '*'.repeat(cleaned.length - 6);
    
    return `${start}${middle}${end}`;
  }
}

export const cryptoUtils = new CryptoUtils();
export default cryptoUtils;