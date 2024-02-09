import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  Unique,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import User from "./User";

@Table({
  tableName: "sessions",
  timestamps: true,
})
class Session extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Unique
  @AllowNull(false)
  @Column
  sessionId!: string;

  @AllowNull(false)
  @Column
  status!: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user!: User;
}

export default Session;
