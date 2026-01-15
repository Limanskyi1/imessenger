import { Migration } from '@mikro-orm/migrations';

export class Migration20260115130551 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "user" add column "nickname" varchar(255) not null, add column "birthday_date" varchar(255) not null, add column "description" varchar(255) not null, add column "created_at" timestamptz not null;`);
    this.addSql(`alter table "user" rename column "full_name" to "email";`);
    this.addSql(`alter table "user" add constraint "user_email_unique" unique ("email");`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" drop constraint "user_email_unique";`);
    this.addSql(`alter table "user" drop column "nickname", drop column "birthday_date", drop column "description", drop column "created_at";`);

    this.addSql(`alter table "user" rename column "email" to "full_name";`);
  }

}
