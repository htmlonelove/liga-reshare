import {uploadImage, uploadFile, uploadImageDrop, uploadFileDrop, uploadFileDropPreview} from './init-upload';

window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {
    uploadImage();
    uploadFile();
    uploadImageDrop();
    uploadFileDrop();
    uploadFileDropPreview();
  });
});
