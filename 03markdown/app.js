const electron = require('electron');
const { ipcRenderer, remote } = electron;
const marked = require('marked');
const mainProcess = remote.require('./index.js');
const clipboard = remote.clipboard;

const $ = selector => document.querySelector(selector);

const rawMarkdown = $('.raw-markdown');
const renderedHtml = $('.rendered-html');
const openFile = $('#open-file');
const copyHtml = $('#copy-html');
const saveFile = $('#save-file');

ipcRenderer.on('file-opened', (event, file, content) => {
  rawMarkdown.value = content;
  renderMarkdownToHtml(content);
});

function renderMarkdownToHtml(markdown) {
  const html = marked(markdown);
  renderedHtml.innerHTML = html;
}

rawMarkdown.addEventListener('keyup', e => {
  const content = e.target.value;
  renderMarkdownToHtml(content);
});

openFile.addEventListener('click', () => {
  mainProcess.openFile();
});

copyHtml.addEventListener('click', () => {
  const html = renderedHtml.innerHTML;
  clipboard.writeText(html);
});

saveFile.addEventListener('click', () => {
  const md = rawMarkdown.value;
  mainProcess.saveFile(md);
});
