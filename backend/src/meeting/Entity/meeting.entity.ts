import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ScheduleMeet {
  @PrimaryGeneratedColumn()
  meeting_id!: number;

  @Column({ type: 'varchar', length: 100 })
  title!: string;

  @Column({ type: 'varchar', length: 50 })
  author!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateAndTime!: Date;
}
