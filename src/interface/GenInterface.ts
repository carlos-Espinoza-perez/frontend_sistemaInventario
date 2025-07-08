export interface IOption {
  value: string;
  label: string;

  [key : string]: string | number;
}

export interface IAnimatedSelect {
  label: string;
  options: IOption[]

  defaultOptionValue?: string;
  change: (value: IOption) => void;
  isCorrect?: boolean | undefined;
}

export interface IButtonHeaderFilter {
  options: IOption[];
  label: string;

  selectedOption: string;
  onChange: (option: IOption) => void;
}