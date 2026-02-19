import html2canvas from 'html2canvas';

export async function exportCardAsImage(element, options = {}) {
  if (!element) throw new Error('Card node not found');

  const canvas = await html2canvas(element, {
    scale: options.scale ?? 3,
    backgroundColor: options.transparent ? null : '#ffffff',
    useCORS: true
  });

  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = options.filename ?? 'cardcraft-profile.png';
  link.click();

  return dataUrl;
}

export async function exportCardAsPDF(element, options = {}) {
  const dataUrl = await exportCardToDataUrl(element, options);
  const win = window.open('', '_blank');
  if (!win) throw new Error('Popup blocked while creating PDF preview');

  win.document.write(`
    <html>
      <head><title>CardCraft PDF</title></head>
      <body style="margin:0;display:flex;justify-content:center;align-items:center;background:#fff;">
        <img src="${dataUrl}" style="max-width:100%;height:auto;" />
        <script>
          window.onload = () => {
            setTimeout(() => window.print(), 150);
          };
        </script>
      </body>
    </html>
  `);
  win.document.close();
}

export async function exportCardToDataUrl(element, options = {}) {
  if (!element) throw new Error('Card node not found');

  const canvas = await html2canvas(element, {
    scale: options.scale ?? 3,
    backgroundColor: options.transparent ? null : '#ffffff',
    useCORS: true
  });

  return canvas.toDataURL('image/png');
}
