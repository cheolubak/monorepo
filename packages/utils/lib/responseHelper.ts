export const parseResponse = <T>(res: Response) => {
  const contentType = res.headers.get('content-type');
  if (!contentType) {
    return Promise.resolve(undefined);
  }

  if (contentType?.includes('application/json')) {
    return res.json() as Promise<T>;
  } else if (contentType?.includes('text/html')) {
    return res.text();
  } else if (contentType?.includes('application/octet-stream')) {
    return res.blob();
  } else if (contentType?.includes('multipart/form-data')) {
    return res.formData();
  } else {
    return res.arrayBuffer();
  }
};
