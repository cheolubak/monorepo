export const parseUrl = (
  baseUrl: string,
  path: string,
  params?: Record<string, any>,
) => {
  const prefix = `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
  const queryString = parseParams(params);
  return `${prefix}${
    prefix.includes('?') ? '&' + queryString.slice(1) : queryString
  }`;
};

export const parseParams = (params?: Record<string, any>) => {
  if (!params) return '';

  const queryString = Object.entries(params)
    .map(([key, value]) =>
      Array.isArray(value) ? `${key}=${value.join(',')}` : `${key}=${value}`,
    )
    .filter((x) => !/[=undefined|=null]$/.test(x))
    .join('&');

  if (queryString.length === 0) return '';

  return `?${queryString}`;
};
