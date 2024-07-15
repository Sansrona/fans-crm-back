import {Column, DataType, Model, Table} from 'sequelize-typescript';

@Table
export class UsersEntity extends Model {
    @Column({
        type: DataType.STRING,
    })
    name: string;

    @Column({
        type: DataType.STRING,
    })
    email: string;

    @Column
    phone: string;
}

