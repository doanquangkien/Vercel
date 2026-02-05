export function DataTable() {
  return {
    data: [],
    columns: [],
    sortKey: '',
    sortOrder: 'asc',
    currentPage: 1,
    perPage: 20,
    searchQuery: '',
    selectedRows: [],

    init() {
      this.$watch('searchQuery', () => {
        this.currentPage = 1;
      });
    },

    get filteredData() {
      let filtered = [...this.data];

      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(row => {
          return this.columns.some(col => {
            const value = String(row[col.key] || '').toLowerCase();
            return value.includes(query);
          });
        });
      }

      if (this.sortKey) {
        filtered.sort((a, b) => {
          const aVal = a[this.sortKey];
          const bVal = b[this.sortKey];
          
          if (aVal < bVal) return this.sortOrder === 'asc' ? -1 : 1;
          if (aVal > bVal) return this.sortOrder === 'asc' ? 1 : -1;
          return 0;
        });
      }

      return filtered;
    },

    get paginatedData() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.filteredData.slice(start, end);
    },

    get totalPages() {
      return Math.ceil(this.filteredData.length / this.perPage);
    },

    sortBy(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortKey = key;
        this.sortOrder = 'asc';
      }
    },

    selectRow(row) {
      const index = this.selectedRows.indexOf(row);
      if (index > -1) {
        this.selectedRows.splice(index, 1);
      } else {
        this.selectedRows.push(row);
      }
    },

    selectAll() {
      if (this.selectedRows.length === this.paginatedData.length) {
        this.selectedRows = [];
      } else {
        this.selectedRows = [...this.paginatedData];
      }
    },

    isSelected(row) {
      return this.selectedRows.includes(row);
    }
  };
}

export default DataTable;