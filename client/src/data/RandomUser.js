import { uniqueUsernameGenerator } from 'unique-username-generator';

const christmasCharacters = [
  'Santa Claus',
  'Grinch',
  'Jack Frost',
  'Mrs. Claus',
  'Rudolph'
];

const config: Config = {
  dictionaries: [christmasCharacters],
  separator: '',
  style: 'capital',
  randomDigits: 3
}

const username: string = uniqueUsernameGenerator(config); // Mrs. Claus777