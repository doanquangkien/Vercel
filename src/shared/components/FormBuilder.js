export function FormBuilder() {
  return {
    schema: [],
    formData: {},
    errors: {},

    init() {
      this.initializeFormData();
    },

    initializeFormData() {
      this.schema.forEach(field => {
        if (this.formData[field.name] === undefined) {
          this.formData[field.name] = field.defaultValue || '';
        }
      });
    },

    getField(name) {
      return this.schema.find(f => f.name === name);
    },

    getValue(name) {
      return this.formData[name];
    },

    setValue(name, value) {
      this.formData[name] = value;
      this.clearError(name);
    },

    hasError(name) {
      return !!this.errors[name];
    },

    getError(name) {
      return this.errors[name];
    },

    setError(name, message) {
      this.errors[name] = message;
    },

    clearError(name) {
      delete this.errors[name];
    },

    clearErrors() {
      this.errors = {};
    },

    validate() {
      this.clearErrors();
      let isValid = true;

      this.schema.forEach(field => {
        if (field.required && !this.formData[field.name]) {
          this.setError(field.name, `${field.label} là bắt buộc`);
          isValid = false;
        }

        if (field.validation) {
          const error = field.validation(this.formData[field.name]);
          if (error) {
            this.setError(field.name, error);
            isValid = false;
          }
        }
      });

      return isValid;
    },

    async submit() {
      if (!this.validate()) {
        return false;
      }

      this.$dispatch('form-submit', { data: this.formData });
      return true;
    },

    reset() {
      this.initializeFormData();
      this.clearErrors();
    }
  };
}

export default FormBuilder;