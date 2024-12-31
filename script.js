const editor = document.getElementById('editor');
const preview = document.getElementById('preview');

// ローカルストレージから保存された内容を読み込む
window.onload = () => {
  const savedCode = localStorage.getItem('savedCode');
  if (savedCode) {
    editor.value = savedCode;
    preview.srcdoc = savedCode;
  }
};

// エディターの入力内容を保存
editor.addEventListener('input', () => {
  const content = editor.value;
  preview.srcdoc = content;
  
  // ローカルストレージに保存
  localStorage.setItem('savedCode', content);
});