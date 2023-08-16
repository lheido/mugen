export type Only<T, U> = {
  [P in keyof T]: T[P];
} & Omit<{ [P in keyof U]?: never }, keyof T>;

export type Either<T, U> = Only<T, U> | Only<U, T>;

export type Split<T> = {
  [K in keyof T]: Pick<T, K> & Partial<Record<Exclude<keyof T, K>, never>>;
}[keyof T];
