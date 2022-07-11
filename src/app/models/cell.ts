export interface Cell {
  status: "empty" | "wrong" | "exists" | "exact";
  content: string;
}
