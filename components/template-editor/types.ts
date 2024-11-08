export type ElementType = "text" | "container" | "image" | "dynamic-text";
export type PageSize = "A4" | "A3" | "A5" | "Letter";

export interface PageDimensions {
  width: number;
  height: number;
}

export interface Element {
  id: string;
  type: ElementType;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  content: string;
  dynamicKey?: string;
  styles: {
    backgroundColor: string;
    color: string;
    padding: string;
    borderRadius: string;
    border: string;
    fontSize?: string;
    fontWeight?: string;
    [key: string]: string | undefined;
  };
  conditions: Array<{
    id: string;
    type: "show" | "hide";
    expression: string;
  }>;
  parentId?: string;
  children?: string[];
}</content>