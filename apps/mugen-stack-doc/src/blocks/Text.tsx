import {
  EditableTextBlock as HeadlessEditableTextBlock,
  TextBlock as HeadlessTextBlock,
  useCommand,
  useNode,
  useText,
} from "@kitae/core";
import { canWrapWith, isWrapWith } from "@kitae/core/utils";
import { Box, createPopover, Popover } from "@mugen/core";
import { createFloatingUI, flip, shift } from "@mugen/core/floating-ui";
import { createEffect, createMemo, on } from "solid-js";
import { Dynamic } from "solid-js/web";
import { BlockAdd } from "./ui/BlockAdd";

const BOLD_TAG = "b";
const ITALIC_TAG = "i";

export function TextBlock() {
  return (
    <HeadlessTextBlock>
      {(props, setRef) => <Dynamic {...props} ref={setRef} class="px-4 py-2" />}
    </HeadlessTextBlock>
  );
}

export function EditableTextBlock() {
  return (
    <Box as="section" class="group flex relative">
      <Box
        as="aside"
        class="flex pt-1 gap-1 transition-all duration-200 opacity-0 group-hover:opacity-100 focus-within:opacity-100 group-focus-within:opacity-100"
      >
        <BlockAdd />
      </Box>
      <HeadlessEditableTextBlock>
        {(props, setRef) => (
          <>
            <Dynamic
              {...props}
              ref={setRef}
              class="flex-1 px-2 py-2 outline-none selection:bg-primary selection:text-primary-content"
            />
            <Toolbar />
          </>
        )}
      </HeadlessEditableTextBlock>
    </Box>
  );
}

function Toolbar() {
  const text = useText();
  const popover = createPopover();
  const node = useNode();
  const surroundSelection = useCommand("surroundSelection");
  const position = createFloatingUI(
    () => node?.ref!,
    () => popover.state.ref!,
    {
      placement: "top",
      middleware: [flip(), shift()],
    }
  );
  createEffect(
    on(
      () => [text?.selection, text?.mouseUp, text?.keyUp] as const,
      ([selection, mouseUp, keyUp]) => {
        const shouldShow =
          selection && !selection.isCollapsed && (mouseUp || keyUp);
        const shouldHide =
          (!selection || selection?.isCollapsed) && popover.state.opened;
        if (shouldShow) popover.show();
        else if (shouldHide) popover.hide();
      }
    )
  );

  const isSelectionBold = createMemo(() => {
    return !!text?.selection && !!node.data?.text
      ? isWrapWith(text?.selection, BOLD_TAG)
      : false;
  });
  const canWrapWithBold = createMemo(
    () => !!text?.selection && canWrapWith(text?.selection, BOLD_TAG)
  );
  const canUnwrapBold = createMemo(
    () => !!text?.selection && isWrapWith(text?.selection, BOLD_TAG)
  );
  const isSelectionItalic = createMemo(() => {
    return !!text?.selection && !!node.data?.text
      ? isWrapWith(text?.selection, ITALIC_TAG)
      : false;
  });
  const canWrapWithItalic = createMemo(
    () => !!text?.selection && canWrapWith(text?.selection, ITALIC_TAG)
  );
  const canUnwrapItalic = createMemo(
    () => !!text?.selection && isWrapWith(text?.selection, ITALIC_TAG)
  );

  return (
    <Popover store={popover}>
      {(props, setRef) => (
        <Box
          {...props}
          onRef={setRef}
          class="m-0 max-w-full p-1 rounded-lg bg-surface-variant text-surface-variant-content shadow-lg"
          style={{
            top: `${position()?.y}px`,
            left: `${position()?.x}px`,
            width: `${node?.ref?.clientWidth ?? 0}px`,
            translate: `-50% ${
              100 * (position()?.placement === "top" ? -1 : 1)
            }%`,
          }}
        >
          <Box class="flex gap-1">
            <Box
              class="p-2 place-content-center leading-none aspect-square rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              classList={{
                "bg-surface text-surface-content": !isSelectionBold(),
                "bg-primary text-primary-content": !!isSelectionBold(),
              }}
              disabled={!canWrapWithBold() && !canUnwrapBold()}
              onClick={() => surroundSelection(BOLD_TAG)}
            >
              B
            </Box>
            <Box
              class="p-2 place-content-center leading-none aspect-square rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              classList={{
                "bg-surface text-surface-content": !isSelectionItalic(),
                "bg-primary text-primary-content": !!isSelectionItalic(),
              }}
              disabled={!canWrapWithItalic() && !canUnwrapItalic()}
              onClick={() => surroundSelection(ITALIC_TAG)}
            >
              I
            </Box>
          </Box>
        </Box>
      )}
    </Popover>
  );
}
