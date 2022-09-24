import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { InvestorLevel } from './investor-level.enum';

@Entity()
// @Unique(['email'])
export class InvestorProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  // @Column({ type: "enum", enum: InvestorLevel, default: InvestorLevel.LevelOne})
  // investorLevel: InvestorLevel;

  @Column()
  range: string;

  @Column({ nullable: true })
  lower: number;

  @Column({ nullable: true })
  upper: number;

  @Column({ nullable: true })
  fundAmount: number;

  @Column({ nullable: true })
  totalAmountFunded: number;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  fullName: string;

  @Column({ nullable: true })
  dateOfBirth: Date;

  @Column({ nullable: true })
  countryOfBirth: string;

  @Column({ nullable: true })
  countryCode: number;

  @Column({ nullable: true })
  cURP: number;

  @Column({ nullable: true })
  rFC: number;

  @Column({ type: 'bigint', nullable: true })
  phoneNumber: number;

  @Column()
  tax: number;

  @Column()
  occupation: string;

  @Column({ nullable: true })
  nationality: string;

  @Column()
  street: string;

  @Column()
  exterior: string;

  @Column()
  interior: string;

  @Column({ nullable: true })
  postalCode: number;

  @Column()
  colony: string;

  @Column()
  muncipiality: string;

  @Column()
  state: string;

  @Column({ nullable: true })
  idFront: string;

  @Column({ nullable: true })
  idBackSide: string;

  @Column({ nullable: true })
  idNumber: string;

  @Column({ nullable: true })
  addressDoc: string;

  @Column({ nullable: true })
  isGeo: string;

  @Column({ default: false })
  isProfileCompleted: boolean;
}
