import { mugenGlobal } from "mugen/theme";

console.log(mugenGlobal);

export default function mugenIntegration(options) {
  return {
    name: "mugen-astro",
    hooks: {
      "astro:config:setup": ({ injectScript }) => {
        console.log("Mugen Astro plugin hook");
        console.log(mugenGlobal);
        injectScript(
          "page-ssr",
          `import { registerTheme } from 'mugen/theme'; registerTheme(${JSON.stringify(
            options.theme
          )});`
        );
      },
      "astro:build:start": (params) => {
        console.log("Mugen Astro plugin hook - astro:build:start", params);
        console.log(mugenGlobal);
      },
      "astro:build:done": (params) => {
        console.log("Mugen Astro plugin hook - astro:build:done", params);
        console.log(mugenGlobal);
      },
      "astro:build:generated": (params) => {
        console.log("Mugen Astro plugin hook - astro:build:generated", params);
        console.log(mugenGlobal);
      },
    },
  };
}
