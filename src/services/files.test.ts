import axios from 'axios';
import {upload} from './files';

jest.mock('axios');

describe('files', () => {
  const file = new File([JSON.stringify({some: 'text data'})], 'a-file.json', {
    type: 'application/json',
  });

  it('should perform a post request to the expected endpoint', async () => {
    await upload(file);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/posts',
      {file: 'data:application/json;base64,eyJzb21lIjoidGV4dCBkYXRhIn0='}
    );
  });

  it('should throw an error if the request fails', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    axios.post.mockRejectedValue(new Error('Network error!'));

    await expect(upload(file)).rejects.toMatchInlineSnapshot(
      `[Error: An error has ocurred while trying to upload the file: Error: Network error!]`
    );
  });
});
