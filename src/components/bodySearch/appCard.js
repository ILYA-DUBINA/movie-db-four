function minify(text, length) {
  return text.slice(0, text.indexOf(' ', length)) + '...';
}

export default minify;
