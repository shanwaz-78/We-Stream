import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ScheduleStream {
  @PrimaryGeneratedColumn()
  stream_id!: number;

  @Column({ type: 'varchar', length: 100 })
  title!: string;

  @Column({ type: 'varchar', length: 50 })
  author!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateAndTime!: Date;

  @Column({ type: 'boolean', default: false })
  isCompleted!: boolean;
}
