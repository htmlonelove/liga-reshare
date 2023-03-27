import {Upload} from './upload.js';

const uploadImageBlock = document.querySelector('[data-upload="img"]');
const uploadIFileBlock = document.querySelector('[data-upload="file"]');
const uploadImageDropBlock = document.querySelector('[data-upload="img-drop"]');
const uploadFileDropBlock = document.querySelector('[data-upload="file-drop"]');
const uploadFileDropPreviewBlock = document.querySelector('[data-upload="file-drop-preview"]');

export const uploadImage = () => new Upload(uploadImageBlock, {
  uploadLength: 4,
  dropZone: true,
  preview: true,
  previewImg: true,
  maxFileSize: 1048576,
  accept: ['.png', '.jpg', '.jpeg', '.webp'],
  iconFormat: {
    png: './img/file/icon-file-png.png',
    jpg: './img/file/icon-file-jpg.png',
    jpeg: './img/file/icon-file-jpg.png',
    webp: './img/file/icon-file-webp.png',
    default: './img/file/icon-file-docs.png',
  },
  fileInfo: {
    fileName: true,
    fileSize: true,
  },
  emptyMessage: 'Добавление файла обязательно',
  errorMessage: 'Выделенные файлы превышают максимальный размер',
});


export const uploadFile = () => new Upload(uploadIFileBlock, {
  uploadLength: 5,
  preview: true,
  maxFullSize: 1048576,
  accept: ['.pdf', '.docx', '.xlsx'],
  iconFormat: {
    xlsx: './img/file/icon-file-xlsx.png',
    docx: './img/file/icon-file-docx.png',
    pdf: './img/file/icon-file-pdf.png',
    default: './img/file/icon-file-docx.png',
  },
  fileInfo: {
    fileName: true,
    fileSize: true,
  },
  emptyMessage: 'Добавление файла обязательно',
  errorMessage: 'Общий размер файлов слишком большой',
});

export const uploadImageDrop = () => new Upload(uploadImageDropBlock, {
  uploadLength: 4,
  dropZone: true,
  previewImg: true,
  maxFileSize: 1048576,
  accept: ['.png', '.jpg', '.jpeg', '.webp'],
  iconFormat: {
    png: './img/file/icon-file-png.png',
    jpg: './img/file/icon-file-jpg.png',
    jpeg: './img/file/icon-file-jpg.png',
    webp: './img/file/icon-file-webp.png',
    default: './img/file/icon-file-docs.png',
  },
  fileInfo: {
    fileName: true,
    fileSize: true,
  },
  emptyMessage: 'Добавление файла обязательно',
  errorMessage: 'Выделенные файлы превышают максимальный размер',
});

export const uploadFileDrop = () => new Upload(uploadFileDropBlock, {
  uploadLength: 4,
  dropZone: true,
  maxFileSize: 1048576,
  accept: ['.pdf', '.docx', '.xlsx'],
  iconFormat: {
    xlsx: './img/file/icon-file-xlsx.png',
    docx: './img/file/icon-file-docx.png',
    pdf: './img/file/icon-file-pdf.png',
    default: './img/file/icon-file-docx.png',
  },
  fileInfo: {
    fileName: true,
    fileSize: true,
  },
  emptyMessage: 'Добавление файла обязательно',
  errorMessage: 'Выделенные файлы превышают максимальный размер',
});

export const uploadFileDropPreview = () => new Upload(uploadFileDropPreviewBlock, {
  uploadLength: 4,
  dropZone: true,
  preview: true,
  maxFileSize: 1048576,
  accept: ['.pdf', '.docx', '.xlsx'],
  iconFormat: {
    xlsx: './img/file/icon-file-xlsx.png',
    docx: './img/file/icon-file-docx.png',
    pdf: './img/file/icon-file-pdf.png',
    default: './img/file/icon-file-docx.png',
  },
  fileInfo: {
    fileName: true,
    fileSize: true,
  },
  emptyMessage: 'Добавление файла обязательно',
  errorMessage: 'Выделенные файлы превышают максимальный размер',
});
