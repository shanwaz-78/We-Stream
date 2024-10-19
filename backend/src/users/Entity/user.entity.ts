import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    user_id!: number;

    @Column({ type: "varchar", length: '35' })
    username!: string;

    @Column({ type: "varchar", length: "50" })
    email!: string;

    @Column({ type: 'int' })
    age!: number;

    @Column({ type: 'varchar', length: '255' })
    password!: string;

    @Column({ type: 'enum', enum: ['m', 'f', 'u'] })
    /**
   * m - male
   * f - female
   * u - unspecified
   */
    gender !: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date

}