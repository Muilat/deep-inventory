import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity()
export class Item {

    @Column()
    @IsNotEmpty()
    public name: string;

    @PrimaryGeneratedColumn()
    public id: number;

    @IsNumber()
    @Column()
    public quantity: number;

    @IsNumberString()
    @Column({name: 'valid_till'})
    public validTill: string;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;

    constructor(
        name: string, quantity: number, validTill: string
    ){
        this.name = name;
        this.quantity = quantity;
        this.validTill = validTill
    }

}
