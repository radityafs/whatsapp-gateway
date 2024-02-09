import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  Unique,
  AllowNull,
  HasMany,
} from "sequelize-typescript";
import Session from "./Sessions";

@Table({
  tableName: "users",
  timestamps: true,
})
class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @AllowNull(false)
  @Column
  name!: string;

  @AllowNull(false)
  @Unique
  @Column
  email!: string;

  @AllowNull(false)
  @Column
  password!: string;

  @Column
  apiKey!: string;

  @HasMany(() => Session)
  sessions?: Session[];
}

export default User;
