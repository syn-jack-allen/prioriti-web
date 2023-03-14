export class ClientTimeoutError extends Error {
  constructor(resourceName: string) {
    super(`Unable to get ${resourceName}`);
  }
}
