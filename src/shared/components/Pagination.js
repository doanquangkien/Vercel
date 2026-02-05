export function Pagination() {
  return {
    currentPage: 1,
    totalPages: 1,
    maxVisiblePages: 5,

    get pages() {
      const pages = [];
      const half = Math.floor(this.maxVisiblePages / 2);
      
      let start = Math.max(1, this.currentPage - half);
      let end = Math.min(this.totalPages, start + this.maxVisiblePages - 1);
      
      if (end - start < this.maxVisiblePages - 1) {
        start = Math.max(1, end - this.maxVisiblePages + 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      return pages;
    },

    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.$dispatch('page-changed', { page });
      }
    },

    nextPage() {
      this.goToPage(this.currentPage + 1);
    },

    prevPage() {
      this.goToPage(this.currentPage - 1);
    },

    get hasNext() {
      return this.currentPage < this.totalPages;
    },

    get hasPrev() {
      return this.currentPage > 1;
    }
  };
}

export default Pagination;