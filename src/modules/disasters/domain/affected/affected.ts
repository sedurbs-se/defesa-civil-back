import { Either, right } from '../../../../core/logic/Either';
import { InvalidCPFError } from './errors/invalid-cpf';
import { CPF } from './cpf';

interface AffectedProps {
  id: string;
  familyId: string;
  name: string;
  age: number;
  sex: string;
  cpf: CPF;
  contact: string;
  hasCleanWaterAccess: boolean;
  hasElectricityAccess: boolean;
  canCook: boolean;
  inParentOrFriendHouse: boolean;
  inPublicShelter: boolean;
  exCleanWater: string;
  exElectricity: string;
  exParentOrFriendHouse: string;
  exPublicShelter: string;
}

class Affected {
  constructor(private props: AffectedProps) {}

  get id() {
    return this.props.id;
  }

  set id(id: string) {
    this.props.id = id;
  }

  get familyId() {
    return this.props.familyId;
  }

  set familyId(familyId: string) {
    this.props.familyId = familyId;
  }

  get name() {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get age() {
    return this.props.age;
  }

  set age(age: number) {
    this.props.age = age;
  }

  get sex() {
    return this.props.sex;
  }

  set sex(sex: string) {
    this.props.sex = sex;
  }

  get cpf() {
    return this.props.cpf.getValue();
  }

  set cpf(value: string) {
    this.props.cpf = new CPF(value);
  }

  get contact() {
    return this.props.contact;
  }

  set contact(contact: string) {
    this.props.contact = contact;
  }

  get hasCleanWaterAccess() {
    return this.props.hasCleanWaterAccess;
  }

  set hasCleanWaterAccess(hasCleanWaterAccess: boolean) {
    this.props.hasCleanWaterAccess = hasCleanWaterAccess;
  }

  get hasElectricityAccess() {
    return this.props.hasElectricityAccess;
  }

  set hasElectricityAccess(hasElectricityAccess: boolean) {
    this.props.hasElectricityAccess = hasElectricityAccess;
  }

  get canCook() {
    return this.props.canCook;
  }

  set canCook(canCook: boolean) {
    this.props.canCook = canCook;
  }

  get inParentOrFriendHouse() {
    return this.props.inParentOrFriendHouse;
  }

  set inParentOrFriendHouse(inParentOrFriendHouse: boolean) {
    this.props.inParentOrFriendHouse = inParentOrFriendHouse;
  }

  get inPublicShelter() {
    return this.props.inPublicShelter;
  }

  set inPublicShelter(inPublicShelter: boolean) {
    this.props.inPublicShelter = inPublicShelter;
  }

  get exCleanWater() {
    return this.props.exCleanWater;
  }

  set exCleanWater(exCleanWater: string) {
    this.props.exCleanWater = exCleanWater;
  }

  get exElectricity() {
    return this.props.exElectricity;
  }

  set exElectricity(exElectricity: string) {
    this.props.exElectricity = exElectricity;
  }

  get exParentOrFriendHouse() {
    return this.props.exParentOrFriendHouse;
  }

  set exParentOrFriendHouse(exParentOrFriendHouse: string) {
    this.props.exParentOrFriendHouse = exParentOrFriendHouse;
  }

  get exPublicShelter() {
    return this.props.exPublicShelter;
  }
  set exPublicShelter(exPublicShelter: string) {
    this.props.exPublicShelter = exPublicShelter;
  }

  static create(
    props: AffectedProps,
  ): Either<InvalidCPFError | Error, Affected> {
    const affected = new Affected(props);
    return right(affected);
  }
}

export { AffectedProps, Affected };
