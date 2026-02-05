import { CURRENCY } from '../../core/config/constants.js';
import { formatCurrency } from '../../core/utils/format.js';

export default {
  name: 'x-currency',
  
  mounted(el, binding) {
    const value = parseFloat(binding.value) || 0;
    el.textContent = formatCurrency(value);
  },
  
  updated(el, binding) {
    const value = parseFloat(binding.value) || 0;
    el.textContent = formatCurrency(value);
  }
};