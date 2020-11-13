'use strict';

const typogr = require('typogr');
const mdown = require('markdown-it')({
  html: true,
  breaks: false,
  linkify: true,
  typographer: true,
})
  .disable('code')
  .use(require('markdown-it-mark'))
  .use(require('markdown-it-footnote'))
  .use(require('markdown-it-anchor'), {
    permalink: true,
  });

const amp = (s) => {
  const r = '<span class="amp">&</span>';
  return s ? s.replace(/&amp;/g, '&').replace(/&/g, r) : s;
};

const set = (content) => (content ? typogr.typogrify(content) : content);
const render = (content, type = true) =>
  type ? set(mdown.render(content)) : mdown.render(content);
const inline = (content, type = true) =>
  type ? set(mdown.renderInline(content)) : mdown.renderInline(content);

const cleanToc = (content) => set(content.replace(/\s¶/g,''));

module.exports = {
  mdown,
  amp,
  set,
  render,
  inline,
  cleanToc,
};
