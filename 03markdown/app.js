const electron = require('electron');
const { ipcRenderer } = electron;
const marked = require('marked');

const $ = selector => document.querySelector(selector);

const rawMarkdown = $('.raw-markdown');
const renderedHtml = $('.rendered-html');

ipcRenderer.on('file-opened', (event, file, content) => {
  rawMarkdown.value = content;
  renderMarkdownToHtml(content);
});

function renderMarkdownToHtml(markdown) {
  const html = marked(markdown);
  renderedHtml.innerHTML = html;
}
