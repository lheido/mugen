import { Button as BaseButton, ButtonProps, Padding, Rounded } from "mugen/v2";

export const Button = (props: ButtonProps) => {
  // const [local, others] = splitProps(props, ["theme"]);
  return (
    <Padding x="8" y="4">
      <Rounded value="xl">
        <BaseButton {...props} />
      </Rounded>
    </Padding>
  );
  // return (
  //   <B
  //     theme={{
  //       padding: { x: "8", y: "4" },
  //       rounded: "xl",
  //       border: { color: "primary", width: "1" },
  //       transform: {
  //         scale: "100",
  //       },
  //       transition: {
  //         property: "all",
  //         duration: "200",
  //       },
  //       active: {
  //         transform: {
  //           scale: "95",
  //         },
  //       },
  //       ...local.theme,
  //     }}
  //     {...(others as any)}
  //   />
  // );
};
