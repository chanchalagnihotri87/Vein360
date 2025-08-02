import Preference from './preference.model';

export default class AuthenticationResponse {
  constructor(
    public token: string,
    public firstTimeLogin: boolean,
    public preference: Preference
  ) {}
}
