import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true, nullable: false })
    email!: string;

    @Column({ nullable: false })
    passwordHash!: string;  

    @Column({ nullable: false })
    title!: string;

    @Column({ nullable: false })
    firstName!: string;

    @Column({ nullable: false })
    lastName!: string;

    @Column({ nullable: false })
    role!: string;
}
