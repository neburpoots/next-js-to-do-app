export interface Activity {
  id: number;
  title: string;
  date: Date | null;
  description: string;
  image: string;
  done: boolean;
}

export class Activity implements Activity {

}

