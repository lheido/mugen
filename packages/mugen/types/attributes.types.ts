export type AriaAttributes = Record<`aria-${string}`, string> & {
  role?: string;
};

export type DataAttributes = Record<`data-${string}`, string>;

export type EventAttributes = Record<`on${string}`, (e: Event) => void>;

export type UniversalAttributes =
  | AriaAttributes
  | DataAttributes
  | {
      draggable?: boolean;
      hidden?: boolean;
      dir?: "ltr" | "rtl" | "auto";
      id?: string;
      lang?: string;
      slot?: string;
      tabindex?: number;
      contenteditable?: boolean;
    };

export type LinkAttributes = {
  href: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: string;
  download?: string;
};

export type ImageAttributes = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  crossorigin?: string;
  refererpolicy?: string;
};
