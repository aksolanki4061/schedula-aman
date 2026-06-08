import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDoctorAndPatientProfiles1717860000000
  implements MigrationInterface
{
  name = 'CreateDoctorAndPatientProfiles1717860000000';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DO $$
      BEGIN
        CREATE TYPE "public"."users_role_enum" AS ENUM('DOCTOR', 'PATIENT');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END
      $$
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "users" (
        "id" SERIAL NOT NULL,
        "name" character varying NOT NULL,
        "email" character varying NOT NULL,
        "password" character varying NOT NULL,
        "role" "public"."users_role_enum" NOT NULL,
        CONSTRAINT "UQ_users_email" UNIQUE ("email"),
        CONSTRAINT "PK_users" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "doctor_profiles" (
        "id" SERIAL NOT NULL,
        "user_id" integer NOT NULL,
        "full_name" character varying NOT NULL,
        "specialization" character varying NOT NULL,
        "experience" integer NOT NULL,
        "qualification" character varying NOT NULL,
        "consultation_fee" numeric(10,2) NOT NULL,
        "availability" jsonb NOT NULL,
        "profile_details" text,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_doctor_profiles_user_id" UNIQUE ("user_id"),
        CONSTRAINT "PK_doctor_profiles" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "patient_profiles" (
        "id" SERIAL NOT NULL,
        "user_id" integer NOT NULL,
        "full_name" character varying NOT NULL,
        "age" integer NOT NULL,
        "gender" character varying NOT NULL,
        "contact_details" jsonb NOT NULL,
        "basic_health_information" jsonb,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_patient_profiles_user_id" UNIQUE ("user_id"),
        CONSTRAINT "PK_patient_profiles" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "doctor_profiles"
      ADD CONSTRAINT "FK_doctor_profiles_user_id"
      FOREIGN KEY ("user_id") REFERENCES "users"("id")
      ON DELETE CASCADE ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE "patient_profiles"
      ADD CONSTRAINT "FK_patient_profiles_user_id"
      FOREIGN KEY ("user_id") REFERENCES "users"("id")
      ON DELETE CASCADE ON UPDATE NO ACTION
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "patient_profiles"
      DROP CONSTRAINT "FK_patient_profiles_user_id"
    `);
    await queryRunner.query(`
      ALTER TABLE "doctor_profiles"
      DROP CONSTRAINT "FK_doctor_profiles_user_id"
    `);
    await queryRunner.query('DROP TABLE "patient_profiles"');
    await queryRunner.query('DROP TABLE "doctor_profiles"');
  }
}
