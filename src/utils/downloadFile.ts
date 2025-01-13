const handleDownload = (url: string, name: string) => {
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('target', '_blank');
  link.setAttribute('download', name);
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export const toBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

export default handleDownload