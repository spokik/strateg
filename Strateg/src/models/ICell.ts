export interface ICell {
  x: number;
  y: number;
  color: string;
  active?: boolean;
}

export type Pool = Array<Array<ICell>>;
