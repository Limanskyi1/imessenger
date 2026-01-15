import {
  Entity,
  OptionalProps,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';

@Entity()
export class User {
  [OptionalProps]?: 'expiresAt' | 'attempts' | 'createdAt';
  @PrimaryKey()
  id!: number;

  @Property()
  @Unique()
  email?: string;

  @Property({ nullable: true })
  nickname?: string;

  @Property({ nullable: true })
  birthdayDate?: string;

  @Property({ nullable: true })
  description?: string;

  @Property({ onCreate: () => new Date() })
  createdAt!: Date;
}
