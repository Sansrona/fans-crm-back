import {Inject, Injectable} from '@nestjs/common';
import {UsersEntity} from "../entities/users.entity";
import {USERS_REPO_PROVIDER} from "../constants";

@Injectable()
export class UsersRepository {
    constructor(
        @Inject(USERS_REPO_PROVIDER)
        private usersRepo: typeof UsersEntity
    ) {}

    async getUserById(id: number) {
        return await this.usersRepo.findByPk(id);
    }
    async getUserByEmail(email: string) {
        return await this.usersRepo.findOne({
            where: {
                email
            }
        });
    }

    // async save(user: UsersEntity) {
    //    return this.usersRepo.create<UsersEntity>(user);
    // }
}
