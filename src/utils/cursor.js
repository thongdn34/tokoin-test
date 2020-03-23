if (window.CURSOR_PATH) {
  const style = document.createElement('style')

  style.textContent = `
    .pointer-cursor {
      cursor: url("${window.CURSOR_PATH.default}"), auto;
    }

    html.ie .pointer-cursor,
    html.edge .pointer-cursor {
      cursor: url("${window.CURSOR_PATH.ie}"), auto;
    }
  `

  document.head.appendChild(style)
}
