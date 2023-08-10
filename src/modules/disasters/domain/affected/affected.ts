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

  get familyId() {
    return this.props.familyId;
  }

  get name() {
    return this.props.name;
  }

  get age() {
    return this.props.age;
  }

  get sex() {
    return this.props.sex;
  }

  get cpf() {
    return this.props.cpf.getValue();
  }

  get contact() {
    return this.props.contact;
  }

  get hasCleanWaterAccess() {
    return this.props.hasCleanWaterAccess;
  }

  get hasElectricityAccess() {
    return this.props.hasElectricityAccess;
  }

  get canCook() {
    return this.props.canCook;
  }

  get inParentOrFriendHouse() {
    return this.props.inParentOrFriendHouse;
  }

  get inPublicShelter() {
    return this.props.inPublicShelter;
  }

  get exCleanWater() {
    return this.props.exCleanWater;
  }

  get exElectricity() {
    return this.props.exElectricity;
  }

  get exParentOrFriendHouse() {
    return this.props.exParentOrFriendHouse;
  }

  get exPublicShelter() {
    return this.props.exPublicShelter;
  }

  set id(id: string) {
    this.props.id = id;
  }

  set familyId(familyId: string) {
    this.props.familyId = familyId;
  }

  set name(name: string) {
    this.props.name = name;
  }

  set age(age: number) {
    this.props.age = age;
  }

  set sex(sex: string) {
    this.props.sex = sex;
  }

  set cpf(value: string) {
    this.props.cpf = new CPF(value);
  }

  set contact(contact: string) {
    this.props.contact = contact;
  }

  set hasCleanWaterAccess(hasCleanWaterAccess: boolean) {
    this.props.hasCleanWaterAccess = hasCleanWaterAccess;
  }

  set hasElectricityAccess(hasElectricityAccess: boolean) {
    this.props.hasElectricityAccess = hasElectricityAccess;
  }

  set canCook(canCook: boolean) {
    this.props.canCook = canCook;
  }

  set inParentOrFriendHouse(inParentOrFriendHouse: boolean) {
    this.props.inParentOrFriendHouse = inParentOrFriendHouse;
  }

  set inPublicShelter(inPublicShelter: boolean) {
    this.props.inPublicShelter = inPublicShelter;
  }

  set exCleanWater(exCleanWater: string) {
    this.props.exCleanWater = exCleanWater;
  }

  set exElectricity(exElectricity: string) {
    this.props.exElectricity = exElectricity;
  }

  set exParentOrFriendHouse(exParentOrFriendHouse: string) {
    this.props.exParentOrFriendHouse = exParentOrFriendHouse;
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
