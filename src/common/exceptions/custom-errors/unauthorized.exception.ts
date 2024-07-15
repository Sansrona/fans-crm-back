import { DomainException } from './domain.exception';
import { NotificationExtension } from '../../resultNotification';
import { ExceptionCodes } from '../exception-codes';

export class UnauthorizedError extends DomainException {
  constructor(msg: string, extensions?: NotificationExtension[]) {
    super(msg, ExceptionCodes.Unauthorized, extensions);
  }
}
