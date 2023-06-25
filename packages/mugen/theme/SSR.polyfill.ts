import { isServer } from "solid-js/web";

if (isServer) {
  class ServerSideCSSStyleSheet {
    rules: string[] = [];
    media: string | null;

    constructor(options?: { media: string }) {
      this.media = options?.media || null;
    }

    insertRule(rule: string): number {
      return this.rules.push(rule);
    }
  }
  globalThis.CSSStyleSheet = ServerSideCSSStyleSheet as unknown as any;
  globalThis.document = {
    body: {
      classList: {
        add: () => {},
      } as any,
    } as any,
    documentElement: {
      classList: {
        add: () => {},
      } as any,
    } as any,
  } as any;
}

export {};
