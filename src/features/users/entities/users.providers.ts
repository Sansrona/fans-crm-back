import {UsersEntity} from "./users.entity";
import {USERS_REPO_PROVIDER} from "../constants";

export const usersProviders = [
    {
        provide: USERS_REPO_PROVIDER,
        useValue: UsersEntity,
    },
];