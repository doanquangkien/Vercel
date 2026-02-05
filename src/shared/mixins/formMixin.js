export const formMixin = {
  data() {
    return {
      formData: {},
      errors: {},
      isSubmitting: false
    };
  },

  methods: {
    setFormData(data) {
      this.formData = { ...data };
    },

    setErrors(errors) {
      this.errors = errors;
    },

    clearErrors() {
      this.errors = {};
    },

    hasError(field) {
      return !!this.errors[field];
    },

    getError(field) {
      return this.errors[field] || '';
    },

    async handleSubmit(submitFn) {
      this.clearErrors();
      this.isSubmitting = true;

      try {
        await submitFn(this.formData);
      } catch (error) {
        if (error.errors) {
          this.setErrors(error.errors);
        }
      } finally {
        this.isSubmitting = false;
      }
    }
  }
};

export default formMixin;