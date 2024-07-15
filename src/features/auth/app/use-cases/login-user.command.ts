import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UsersRepository } from '../../../users/db/users.repository';
import { DomainResultNotification } from '../../../../common/resultNotification';
import { LoginUserNotificationType } from '../../types/notification-result.types';
import { UserHashingManager } from '../../../../common/adapters/user-hashing.adapter';
import { CreateAccessTokenCommand } from './create-access-token.command';
import { ExceptionCodes } from '../../../../common/exceptions/exception-codes';

type LoginUserTypes = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export class LoginUserCommand {
  constructor(public data: LoginUserTypes) {}
}

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
  constructor(
    private commandBus: CommandBus,
    private userRepo: UsersRepository,
    private userHashManager: UserHashingManager,
  ) {}
  async execute({ data }: LoginUserCommand) {
    const note = new DomainResultNotification<LoginUserNotificationType>();
    return await this.checkUserEmail(data, note);
  }
  private async checkUserEmail(
    { email, password, rememberMe = false }: LoginUserTypes,
    note: DomainResultNotification<LoginUserNotificationType>,
  ) {
    const user = await this.userRepo.getUserByEmail(email);
    if (user) {
      const checkPassword = await this.userHashManager.checkPassword(
        password,
        user.passwordHash,
      );
      if (checkPassword) {
        const accessToken = await this.commandBus.execute(
          new CreateAccessTokenCommand(user.id),
        );

        note.addData({ accessToken, rememberMe });
      } else {
        note.addError(
          'wrong password',
          'password',
          ExceptionCodes.Unauthorized,
        );
      }
    } else {
      note.addError(
        'no user with this email',
        'email',
        ExceptionCodes.Unauthorized,
      );
    }

    return note;
  }
}
