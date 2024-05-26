export class FetchApiError extends Error {
  readonly _status: number;
  readonly _response: any;

  constructor(url: string, status: number, response: any) {
    super(`FetchApiError: ${url} | ${status}`);

    this._status = status;
    this._response = response;
  }

  get status() {
    return this._status;
  }

  get response() {
    return this._response;
  }
}

export const isFetchApiError = (error: any): error is FetchApiError => {
  return typeof error === 'object' && error instanceof FetchApiError;
};
