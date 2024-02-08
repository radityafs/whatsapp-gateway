import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  Unique,
  AllowNull,
} from "sequelize-typescript";

@Table({
  tableName: "accounts",
  timestamps: true,
})
class Account extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;
}

export default Account;
