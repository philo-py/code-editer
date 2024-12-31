const editor = document.getElementById('editor');
const preview = document.getElementById('preview');

// ローカルストレージから保存された内容を読み込む
window.onload = () => {
  const savedCode = localStorage.getItem('savedCode');
  if (savedCode) {
    editor.value = savedCode;
    preview.srcdoc = generateHTML(savedCode);
  }
};

// エディターの入力内容を保存し、プレビューを更新
editor.addEventListener('input', () => {
  const content = editor.value;
  preview.srcdoc = generateHTML(content);
  
  // ローカルストレージに保存
  localStorage.setItem('savedCode', content);
});

// CSSコードを含むHTMLを生成する関数
function generateHTML(cssCode) {
  return `
    <!DOCTYPE html>
    <html lang="ja">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          ${cssCode}  /* ユーザーが入力したCSSを適用 */
        </style>
      </head>
      <body>
        <div>
          <p>このテキストはCSSによって変更されます。</p>
        </div>
      </body>
    </html>
  `;
}
