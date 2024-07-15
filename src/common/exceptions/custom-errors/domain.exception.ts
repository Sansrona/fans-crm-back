import { NotificationExtension } from '../../resultNotification';

export class DomainException extends Error {
  constructor(
    protected readonly _message: string,
    protected readonly _code?: number,
    protected readonly _extensions?: NotificationExtension[],
  ) {
    super(_message);
  }

  get code(): number {
    return this._code || 0;
  }

  get message(): string {
    return this._message;
  }

  get extensions(): NotificationExtension[] {
    return this._extensions || [];
  }
}
