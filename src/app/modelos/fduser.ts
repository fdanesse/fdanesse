export class Fduser {

  constructor(
    // auth user data
    public uid: (string) = '',
    public displayName: (string) = '',
    public photoURL: (string) = '',
    public email: (string) = '',
    public emailVerified: (boolean) = false,
    public phoneNumber: (string) = '',
    public providerId: (string) = '',

    // personal user data
    public nombre: (string) = '',
    public apellido: (string) = '',
    public telefono: string = '',
  ) {}

  setMoliUser(objeto) {
    for (const key in objeto) {
      if (key) {
        this[key] = objeto[key];
      }
    }
  }
}
