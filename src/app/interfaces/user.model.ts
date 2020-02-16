export default interface User {
  id: string;
  fiscalCode: string;
  email?: string;
  name: string;
  surname: string;
  dateOfBirth: Date;
  type: string;
  status?: boolean;
}
