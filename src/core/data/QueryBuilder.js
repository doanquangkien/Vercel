class QueryBuilder {
  constructor(store) {
    this.store = store;
    this.filters = [];
    this.sortBy = null;
    this.sortOrder = 'asc';
    this.limitValue = null;
    this.offsetValue = 0;
  }

  where(field, operator, value) {
    this.filters.push({ field, operator, value });
    return this;
  }

  whereIn(field, values) {
    this.filters.push({ field, operator: 'in', value: values });
    return this;
  }

  whereBetween(field, min, max) {
    this.filters.push({ field, operator: 'between', value: [min, max] });
    return this;
  }

  orderBy(field, order = 'asc') {
    this.sortBy = field;
    this.sortOrder = order;
    return this;
  }

  limit(value) {
    this.limitValue = value;
    return this;
  }

  offset(value) {
    this.offsetValue = value;
    return this;
  }

  async get() {
    let results = await this.store.getAll();
    results = this.applyFilters(results);
    results = this.applySort(results);
    results = this.applyPagination(results);
    return results;
  }

  async first() {
    const results = await this.limit(1).get();
    return results[0] || null;
  }

  async count() {
    const results = await this.get();
    return results.length;
  }

  applyFilters(data) {
    return data.filter(item => {
      return this.filters.every(filter => {
        const fieldValue = item[filter.field];
        
        switch (filter.operator) {
          case '=':
          case '==':
            return fieldValue === filter.value;
          case '!=':
            return fieldValue !== filter.value;
          case '>':
            return fieldValue > filter.value;
          case '>=':
            return fieldValue >= filter.value;
          case '<':
            return fieldValue < filter.value;
          case '<=':
            return fieldValue <= filter.value;
          case 'in':
            return filter.value.includes(fieldValue);
          case 'not in':
            return !filter.value.includes(fieldValue);
          case 'between':
            return fieldValue >= filter.value[0] && fieldValue <= filter.value[1];
          case 'like':
            return String(fieldValue).includes(filter.value);
          default:
            return true;
        }
      });
    });
  }

  applySort(data) {
    if (!this.sortBy) return data;
    
    return [...data].sort((a, b) => {
      const aVal = a[this.sortBy];
      const bVal = b[this.sortBy];
      
      if (aVal < bVal) return this.sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return this.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }

  applyPagination(data) {
    if (this.limitValue === null) return data;
    return data.slice(this.offsetValue, this.offsetValue + this.limitValue);
  }
}

export default QueryBuilder;