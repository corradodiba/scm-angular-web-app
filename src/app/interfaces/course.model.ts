import User from "./user.model";
import Subject from "../interfaces/subject.model";

export default interface Course {
  id?: string;
  name: string;
  year: Date;
  status: string;
  students?: User[];
  teachers?: User[];
  subjects?: Subject[];
}
