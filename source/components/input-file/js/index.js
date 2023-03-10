import {uploadImage, uploadFile, uploadImageDrop, uploadFileDrop} from './init-upload';

window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {
    uploadImage();
    uploadFile();
    uploadImageDrop();
    uploadFileDrop();
  });
});
