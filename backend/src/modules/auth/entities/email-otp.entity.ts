import { Entity, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class EmailOtp {
  [OptionalProps]?: 'expiresAt' | 'attempts' | 'createdAt';

  @PrimaryKey()
  id!: number;

  @Property()
  email!: string;

  @Property()
  codeHash!: string;

  @Property()
  expiresAt: Date = new Date(Date.now() + 5 * 60 * 1000);

  @Property({ default: 0 })
  attempts!: number;

  @Property()
  createdAt: Date = new Date();
}
