import { Migration } from '@mikro-orm/migrations';

export class Migration20260115130649 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "email_otp" ("id" serial primary key, "email" varchar(255) not null, "code_hash" varchar(255) not null, "expires_at" timestamptz not null, "attempts" int not null default 0, "created_at" timestamptz not null);`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "email_otp" cascade;`);
  }

}
