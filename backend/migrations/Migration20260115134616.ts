import { Migration } from '@mikro-orm/migrations';

export class Migration20260115134616 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "user" alter column "nickname" type varchar(255) using ("nickname"::varchar(255));`);
    this.addSql(`alter table "user" alter column "nickname" drop not null;`);
    this.addSql(`alter table "user" alter column "birthday_date" type varchar(255) using ("birthday_date"::varchar(255));`);
    this.addSql(`alter table "user" alter column "birthday_date" drop not null;`);
    this.addSql(`alter table "user" alter column "description" type varchar(255) using ("description"::varchar(255));`);
    this.addSql(`alter table "user" alter column "description" drop not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" alter column "nickname" type varchar(255) using ("nickname"::varchar(255));`);
    this.addSql(`alter table "user" alter column "nickname" set not null;`);
    this.addSql(`alter table "user" alter column "birthday_date" type varchar(255) using ("birthday_date"::varchar(255));`);
    this.addSql(`alter table "user" alter column "birthday_date" set not null;`);
    this.addSql(`alter table "user" alter column "description" type varchar(255) using ("description"::varchar(255));`);
    this.addSql(`alter table "user" alter column "description" set not null;`);
  }

}
