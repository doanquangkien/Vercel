/**
 * validate.js - Validation utilities
 */

/**
 * Validate email
 */
export function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Validate phone (Vietnamese)
 */
export function isValidPhone(phone) {
  const re = /^(0[3|5|7|8|9])+([0-9]{8})$/;
  return re.test(phone);
}

/**
 * Validate URL
 */
export function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate required field
 */
export function required(value, fieldName = 'Field') {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return `${fieldName} là bắt buộc`;
  }
  return null;
}

/**
 * Validate min length
 */
export function minLength(value, min, fieldName = 'Field') {
  if (value && value.length < min) {
    return `${fieldName} phải có ít nhất ${min} ký tự`;
  }
  return null;
}

/**
 * Validate max length
 */
export function maxLength(value, max, fieldName = 'Field') {
  if (value && value.length > max) {
    return `${fieldName} không được vượt quá ${max} ký tự`;
  }
  return null;
}

/**
 * Validate number range
 */
export function range(value, min, max, fieldName = 'Field') {
  const num = Number(value);
  if (isNaN(num) || num < min || num > max) {
    return `${fieldName} phải từ ${min} đến ${max}`;
  }
  return null;
}

/**
 * Run multiple validators
 */
export function validate(value, validators, fieldName) {
  for (const validator of validators) {
    const error = validator(value, fieldName);
    if (error) return error;
  }
  return null;
}

export default {
  isValidEmail,
  isValidPhone,
  isValidUrl,
  required,
  minLength,
  maxLength,
  range,
  validate
};
