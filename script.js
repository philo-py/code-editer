// CodeMirrorの設定
const htmlEditor = CodeMirror.fromTextArea(document.getElementById('html-code'), {
  mode: 'htmlmixed',
  theme: 'dracula',
  lineNumbers: true,
  extraKeys: {
    "Ctrl-Space": "autocomplete" // Ctrl + Spaceで補完
  }
});

const cssEditor = CodeMirror.fromTextArea(document.getElementById('css-code'), {
  mode: 'css',
  theme: 'dracula',
  lineNumbers: true,
  extraKeys: {
    "Ctrl-Space": "autocomplete"
  }
});

const jsEditor = CodeMirror.fromTextArea(document.getElementById('js-code'), {
  mode: 'javascript',
  theme: 'dracula',
  lineNumbers: true,
  extraKeys: {
    "Ctrl-Space": "autocomplete"
  }
});

// タブの切り替え
const tabButtons = document.querySelectorAll('.tab-button');
tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const tab = button.getAttribute('data-tab');
    tabButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // エディタの表示切り替え
    document.querySelectorAll('.editor').forEach(editor => {
      if (editor.classList.contains(`${tab}-editor`)) {
        editor.classList.add('active');
      } else {
        editor.classList.remove('active');
      }
    });
  });
});

// プレビュー更新
function updatePreview() {
  const html = htmlEditor.getValue();
  const css = cssEditor.getValue();
  const js = jsEditor.getValue();

  const previewDocument = document.getElementById('preview').contentWindow.document;
  previewDocument.open();
  previewDocument.write(`
    <!DOCTYPE html>
    <html lang="ja">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          ${css}
        </style>
      </head>
      <body>
        ${html}
        <script>
          ${js}
        </script>
      </body>
    </html>
  `);
  previewDocument.close();
}

// コード変更時にプレビュー更新
htmlEditor.on('change', updatePreview);
cssEditor.on('change', updatePreview);
jsEditor.on('change', updatePreview);

// 保存機能
document.getElementById('save').addEventListener('click', () => {
  const html = htmlEditor.getValue();
  const css = cssEditor.getValue();
  const js = jsEditor.getValue();
  localStorage.setItem('html', html);
  localStorage.setItem('css', css);
  localStorage.setItem('js', js);
  alert('保存しました!');
});

// 読み込み機能
document.getElementById('load').addEventListener('click', () => {
  const html = localStorage.getItem('html');
  const css = localStorage.getItem('css');
  const js = localStorage.getItem('js');
  if (html && css && js) {
    htmlEditor.setValue(html);
    cssEditor.setValue(css);
    jsEditor.setValue(js);
    alert('読み込みました!');
  } else {
    alert('保存されたデータがありません。');
  }
});
