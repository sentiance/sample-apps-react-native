// typings for Text View Component
export interface TextViewProps {
  title: string;
  status:
    | 'ALWAYS'
    | 'UNAVAILABLE'
    | 'DENIED'
    | 'WHILE IN USE'
    | 'NEVER'
    | 'BLOCKED'
    | undefined
    | any;
}
