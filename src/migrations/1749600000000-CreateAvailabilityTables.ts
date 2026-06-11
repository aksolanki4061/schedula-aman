import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAvailabilityTables1749600000000 implements MigrationInterface {
  name = 'CreateAvailabilityTables1749600000000';

  async up(queryRunner: QueryRunner): Promise<void> {
    // Create recurring_availability table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "recurring_availability" (
        "id" SERIAL NOT NULL,
        "doctor_id" integer NOT NULL,
        "day_of_week" integer NOT NULL,
        "start_time" character varying(5) NOT NULL,
        "end_time" character varying(5) NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_recurring_availability" PRIMARY KEY ("id")
      )
    `);

    // Create custom_availability table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "custom_availability" (
        "id" SERIAL NOT NULL,
        "doctor_id" integer NOT NULL,
        "date" date NOT NULL,
        "start_time" character varying(5) NOT NULL,
        "end_time" character varying(5) NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_custom_availability" PRIMARY KEY ("id")
      )
    `);

    // Add FK constraints → doctor_profiles
    await queryRunner.query(`
      ALTER TABLE "recurring_availability"
      ADD CONSTRAINT "FK_recurring_availability_doctor_id"
      FOREIGN KEY ("doctor_id") REFERENCES "doctor_profiles"("id")
      ON DELETE CASCADE ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE "custom_availability"
      ADD CONSTRAINT "FK_custom_availability_doctor_id"
      FOREIGN KEY ("doctor_id") REFERENCES "doctor_profiles"("id")
      ON DELETE CASCADE ON UPDATE NO ACTION
    `);

    // Index on day_of_week and date for fast lookups
    await queryRunner.query(`
      CREATE INDEX "IDX_recurring_avail_doctor_day"
      ON "recurring_availability" ("doctor_id", "day_of_week")
    `);

    await queryRunner.query(`
      CREATE INDEX "IDX_custom_avail_doctor_date"
      ON "custom_availability" ("doctor_id", "date")
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX IF EXISTS "IDX_custom_avail_doctor_date"');
    await queryRunner.query('DROP INDEX IF EXISTS "IDX_recurring_avail_doctor_day"');
    await queryRunner.query(`
      ALTER TABLE "custom_availability"
      DROP CONSTRAINT "FK_custom_availability_doctor_id"
    `);
    await queryRunner.query(`
      ALTER TABLE "recurring_availability"
      DROP CONSTRAINT "FK_recurring_availability_doctor_id"
    `);
    await queryRunner.query('DROP TABLE IF EXISTS "custom_availability"');
    await queryRunner.query('DROP TABLE IF EXISTS "recurring_availability"');
  }
}
