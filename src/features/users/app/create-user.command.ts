import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {CreateUserDto} from "../api/dto/create-user.dto";
import {UsersRepository} from "../db/users.repository";
import {DomainResultNotification} from "../../../common/resultNotification";
import {UsersEntity} from "../entities/users.entity";
import {InjectConnection} from "@nestjs/sequelize";
import {Sequelize} from "sequelize-typescript";
import {ExceptionCodes} from "../../../common/exceptions/exception-codes";
import {UserHashingManager} from "../../../common/adapters/user-hashing.adapter";

export class CreateUserCommand {
    constructor(
        public data: CreateUserDto,
    ) {}
}

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(
        private passwordManager: UserHashingManager,
        private usersRepo: UsersRepository,
        @InjectConnection()
        private sequelize: Sequelize,
    ) {}
    async execute({ data }: CreateUserCommand) {
        const note = new DomainResultNotification<UsersEntity>();
        const t =await this.sequelize.transaction();

        try {
            const passwordHash = await this.createPasswordHash(data.password);
            const user = await UsersEntity.create({
                email: data.email,
                passwordHash,
                name: data.name,
                phone: data.phoneNumber,
            }, {transaction: t});
            await t.commit();
            note.addData(user);
        } catch (e) {
            note.addError(e.message, '', ExceptionCodes.BadRequest);
            await t.rollback()
        }
        return note;
    }
    private async createPasswordHash(password: string) {
        return this.passwordManager.getHashAndSalt(password);
    }

}
