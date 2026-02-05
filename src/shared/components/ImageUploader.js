export function ImageUploader() {
  return {
    imageUrl: null,
    file: null,
    uploading: false,
    error: null,

    selectFile() {
      this.$refs.fileInput.click();
    },

    handleFileSelect(event) {
      const file = event.target.files[0];
      
      if (!file) return;

      if (!file.type.startsWith('image/')) {
        this.error = 'Vui lòng chọn file ảnh';
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        this.error = 'File ảnh không được vượt quá 5MB';
        return;
      }

      this.file = file;
      this.error = null;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);

      this.$dispatch('file-selected', { file });
    },

    async upload(uploadFn) {
      if (!this.file) return;

      this.uploading = true;
      this.error = null;

      try {
        const result = await uploadFn(this.file);
        this.$dispatch('upload-success', result);
        return result;
      } catch (error) {
        this.error = error.message;
        this.$dispatch('upload-error', { error });
        throw error;
      } finally {
        this.uploading = false;
      }
    },

    remove() {
      this.imageUrl = null;
      this.file = null;
      this.error = null;
      this.$refs.fileInput.value = '';
      this.$dispatch('file-removed');
    }
  };
}

export default ImageUploader;