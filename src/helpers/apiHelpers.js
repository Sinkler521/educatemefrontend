export const normalizeDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
};

export const base64ToFile = (base64String, fileName) => {
    try {
        atob(base64String);

        const byteCharacters = atob(base64String);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new File([byteArray], fileName, { type: 'image/*' });
    } catch (error) {
        console.error('Invalid base64 string:', error);
        return null;
    }
};

export const truncateString = (string, maxLength) => {
    if (string.length <= maxLength) {
        return string;
    }
    const lastWord = string.substring(0, maxLength).replace(/\s+\S*$/, '');

    return `${lastWord}...`;
}

export const cutVideoUrl = (url) => {
  const regex = /[?&]v=([^&]+)/;
  const match = url.match(regex);

  return match ? match[1] : null;
};