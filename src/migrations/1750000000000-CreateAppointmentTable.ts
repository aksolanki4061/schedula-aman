import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAppointmentTable1750000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'doctor_id',
            type: 'int',
          },
          {
            name: 'patient_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'date',
            type: 'date',
          },
          {
            name: 'start_time',
            type: 'varchar',
            length: '5',
          },
          {
            name: 'end_time',
            type: 'varchar',
            length: '5',
          },
          {
            name: 'status',
            type: 'varchar',
            default: "'booked'",
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['doctor_id'],
            referencedTableName: 'doctor_profiles',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['patient_id'],
            referencedTableName: 'patient_profiles',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
  }
}
