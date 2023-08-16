```typescript
function MyCmp() {
  return (
    <Responsive>
      <Breakpoint default>{/* ... mobile layout */}</Breakpoint>
      <Breakpoint case="sm">
        <Justify center>
          <Gap x="8">
            <Layout>
              <Item />
              <Expand>
                <Item />
              </Expand>
              <Item />
            </Layout>
          </Gap>
        </Justify>
      </Breakpoint>
    </Responsive>
  );
}
```

From stackblitz

```typescript
import { FlowProps, createContext, useContext } from "solid-js";

export const LayoutContext = createContext<any>({});

export const FlexDirection = (
  props: FlowProps & { direction?: "row" | "column" }
) => {
  const context = useContext(LayoutContext);
  context.flexDirection = () => props.direction ?? "row";
  return props.children;
};

export const Gap = (props: FlowProps & { gap: string }) => {
  const context = useContext(LayoutContext);
  context.gap = () => props.gap ?? "none";
  return props.children;
};

export const Layout = (props: FlowProps) => {
  const context = useContext(LayoutContext);
  const clonedContext = {
    flexDirection: context.flexDirection ?? (() => "column"),
    gap: context.gap ?? (() => "none"),
  };
  context.flexDirection = undefined;
  context.gap = undefined;
  return (
    <div
      style={{
        // @ts-ignore
        display: "flex",
        "flex-direction": clonedContext.flexDirection(),
        gap: clonedContext.gap(),
      }}
      {...props}
    />
  );
};
```
