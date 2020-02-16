export interface IList {
  id: string;
  title: string;
  description: string;
  buttons?: {
    text: string;
    color: string;
  }[];
}
