import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const upload = async (file: File): Promise<void> => {
  try {
    const base64File = await toBase64(file);

    await axios.post(`${BASE_URL}/posts`, {
      file: base64File,
    });
  } catch (e) {
    throw new Error(
      'An error has ocurred while trying to upload the file: ' + e
    );
  }
};
