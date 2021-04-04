export type SelectContextType<T> = {
  selected: T;
  setSelected: (n: T) => void;
};
