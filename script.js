// エディタの切り替え機能
const tabButtons = document.querySelectorAll('.tab-button');
const editors = document.querySelectorAll('.editor');
const preview = document.getElementById('preview');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    // アクティブなタブを切り替える
    tabButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // 表示するエディタを切り替える
    const targetTab = button.getAttribute('data-tab');
    editors.forEach(editor => {
      editor.style.display = editor.id === `${targetTab}-editor` ? 'block' : 'none';
    });

    // プレビューを更新
    updatePreview();
  });
});

// 入力内容が変わったらプレビューを更新
const htmlCode = document.getElementById('html-code');
const cssCode = document.getElementById('css-code');
const jsCode = document.getElementById('js-code');

htmlCode.addEventListener('input', updatePreview);
cssCode.addEventListener('input', updatePreview);
jsCode.addEventListener('input', updatePreview);

// プレビューを更新する関数
function updatePreview() {
  const html = htmlCode.value;
  const css = cssCode.value;
  const js = jsCode.value;

  const previewDocument = preview.contentWindow.document;

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

// 保存機能
document.getElementById('save').addEventListener('click', () => {
  const html = htmlCode.value;
  const css = cssCode.value;
  const js = jsCode.value;

  localStorage.setItem('htmlCode', html);
  localStorage.setItem('cssCode', css);
  localStorage.setItem('jsCode', js);
  alert('コードが保存されました');
});

// 読み込み機能
document.getElementById('load').addEventListener('click', () => {
  const savedHtml = localStorage.getItem('htmlCode');
  const savedCss = localStorage.getItem('cssCode');
  const savedJs = localStorage.getItem('jsCode');

  if (savedHtml && savedCss && savedJs) {
    htmlCode.value = savedHtml;
    cssCode.value = savedCss;
    jsCode.value = savedJs;
    updatePreview();
    alert('保存されたコードが読み込まれました');
  } else {
    alert('保存されたコードがありません');
  }
});

// ページ読み込み時に保存されているコードを読み込む
window.addEventListener('load', () => {
  const savedHtml = localStorage.getItem('htmlCode');
  const savedCss = localStorage.getItem('cssCode');
  const savedJs = localStorage.getItem('jsCode');

  if (savedHtml && savedCss && savedJs) {
    htmlCode.value = savedHtml;
    cssCode.value = savedCss;
    jsCode.value = savedJs;
    updatePreview();
  }
});
