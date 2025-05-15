/* eslint-disable new-cap */
import {
  Embeddable, Embedded, Entity, Enum, PrimaryKey, Property,
} from '@mikro-orm/core';

@Embeddable()
export class PensionProvider {
  @Property()
    name?: string;

  @Property()
    value?: string;
}

@Entity()
export class Pension {
  @PrimaryKey({type: 'uuid'})
    id!: string;

  @Property({persist: false, default: 'pension'})
    object = 'pension' as const;

  @Property()
    potName!: string;

  @Embedded(() => PensionProvider)
    pensionProvider!: PensionProvider;

  @Property()
    employer?: string;

  @Property()
    isWorkplacePension!: boolean;

  @Property({type: 'decimal'})
    annualInterestRate?: number;

  @Property({type: 'decimal'})
    defaultAnnualInterestRate!: number;

  @Property({type: 'decimal', scale: 2})
    amount!: number;

  @Property({type: 'decimal', scale: 2})
    monthlyPayment!: number;

  @Property({type: 'datetime'})
    lastUpdatedAt!: string;
}

@Entity()
export class SearchedPension {
  @PrimaryKey({type: 'uuid'})
    id!: string;

  @Property({persist: false})
    object = 'searchedPension' as const;

  @Property()
    potName!: string;

  @Property()
    policyNumber?: string;

  @Enum(() => SearchedPensionStatus)
    status?: SearchedPensionStatus;

  @Property()
    previousName?: string;

  @Property()
    previousAddress?: string;

  @Embedded(() => PensionProvider)
    pensionProvider!: PensionProvider;

  @Property()
    employer?: string;

  @Property()
    isDraft!: boolean;

  @Property({type: 'decimal'})
    annualInterestRate?: number;

  @Property({type: 'decimal'})
    defaultAnnualInterestRate!: number;

  @Property({type: 'decimal', scale: 2})
    amount!: number;

  @Property({type: 'decimal', scale: 2})
    monthlyPayment!: number;

  @Property({type: 'decimal', scale: 2})
    annualFee?: number;

  @Property({type: 'datetime'})
    lastUpdatedAt!: string;

  @Property({type: 'datetime'})
    foundOn?: string;
}

export enum SearchedPensionStatus {
  TO_HUNT = 'TO_HUNT',
  FOUND = 'FOUND',
}
