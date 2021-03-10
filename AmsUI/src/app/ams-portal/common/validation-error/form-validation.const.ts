import { ValidationMessage } from './validation-message.model';

export const FORM_VALIDATION: { [controlName: string]: Array<ValidationMessage> } = {
  domain: [
    { type: 'required', message: 'Please, set the domain.' },
    { type: 'maxlength', message: 'Max 50 chars.' },
  ],
  type: [
    { type: 'required', message: 'Please, set the type.' },
    { type: 'maxlength', message: 'Max 50 chars.' },
  ],
  city: [
    { type: 'required', message: 'You must specify a city.' },
  ],
  requirements: [
    { type: 'required', message: 'You must specify the requirements.' },
  ],
  employer: [
    { type: 'required', message: 'You must specify a name for this tag.' },
    { type: 'maxlength', message: 'Max 100 chars.' },
  ],
  firstName: [
    { type: 'required', message: 'You must specify a first name.' },
  ],
  lastName: [
    { type: 'required', message: 'You must specify a last name.' },
  ],
  username: [
    { type: 'required', message: 'You must specify a user name.' },
    { type: 'minlength', message: 'Min 5 chars.' },
    { type: 'notUnique', message: 'This user name was used before. Please provide a different one.' },
  ],
  password: [
    { type: 'required', message: 'You must specify a password.' },
    { type: 'minlength', message: 'Min 5 chars.' },
  ],
  confirmPassword: [
    { type: 'required', message: 'You must specify a password.' },
    { type: 'minlength', message: 'Min 5 chars.' },
    { type: 'areEqual', message: 'Password doesn\'t match.' },
  ],
  role: [
    { type: 'required', message: 'You must specify a role.' },
    { type: 'minlength', message: 'Min 5 chars.' },
  ],
  email: [
    { type: 'required', message: 'You must specify an email.' },
    { type: 'pattern', message: 'Type in a valid email.' },
  ],
};
