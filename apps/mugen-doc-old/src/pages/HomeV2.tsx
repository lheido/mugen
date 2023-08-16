import { createMediaQuery } from "@solid-primitives/media";
import {
  Absolute,
  AlignItems,
  BackgroundColor,
  Box,
  Column,
  Filter,
  FlexDirection,
  FontSize,
  Gap,
  Height,
  JustifyContent,
  Margin,
  Opacity,
  Overflow,
  Padding,
  Relative,
  Rounded,
  Row,
  Width,
} from "mugen/v2";
import { FlowProps } from "solid-js";
import appCode from "../App.tsx?raw";
import { Button } from "../components/Button";
import { CAButton } from "../components/CAButton";
import { Code } from "../components/Code";

function useMdBreakpoint() {
  return createMediaQuery("(min-width: 768px)");
}

const HomeV2 = () => {
  console.time("HomeV2");
  const isMd = useMdBreakpoint();
  const result = (
    <>
      <Relative>
        <Height min="hscreen">
          <JustifyContent center>
            <AlignItems center>
              <Padding bottom="16" top="44">
                <Box>
                  <Absolute top="0" left="0">
                    <Width value="full">
                      <Height value="full">
                        <Opacity value="25">
                          <Overflow value="hidden">
                            <Filter blur="5">
                              <Box>
                                <Code language="tsx">{appCode}</Code>
                              </Box>
                            </Filter>
                          </Overflow>
                        </Opacity>
                      </Height>
                    </Width>
                  </Absolute>
                  <Relative zIndex={1}>
                    <Column>
                      <Gap value="16">
                        <Width value={isMd() ? "2/3" : undefined} max="wscreen">
                          <Margin value="auto">
                            <Padding value="10">
                              <Box>
                                <FontSize value={isMd() ? "6xl" : "3xl"}>
                                  <Box>
                                    An <strong>UI toolkit</strong> that provides low level components to build app
                                    faster and easier.
                                  </Box>
                                </FontSize>
                                <FontSize value={isMd() ? "5xl" : "2xl"}>
                                  <Box>
                                    It provides a typed way to adopt <strong>design systems</strong> easily!🎉
                                  </Box>
                                </FontSize>
                                <Row>
                                  <JustifyContent center>
                                    <Gap value={isMd() ? "8" : "4"}>
                                      <Box>
                                        <CAButton href="#get-started">Get Started</CAButton>
                                        <Button href="https://github.com/lheido/mugen" target="_blank">
                                          Github
                                        </Button>
                                      </Box>
                                    </Gap>
                                  </JustifyContent>
                                </Row>
                              </Box>
                            </Padding>
                          </Margin>
                        </Width>
                      </Gap>
                    </Column>
                  </Relative>
                </Box>
              </Padding>
            </AlignItems>
          </JustifyContent>
        </Height>
      </Relative>
      <Relative>
        <Column>
          <Gap value="16">
            <Padding top={isMd() ? "64" : "0"} x={isMd() ? "48" : "0"}>
              <Height min="hscreen">
                <Box id="get-started">
                  <HighlightSection>
                    <FontSize value={isMd() ? "2xl" : "lg"}>
                      <HighlightSectionInnerParagraph>
                        No need to worry about CSS or semantic/A11y HTML as the toolkit handles that for us.
                      </HighlightSectionInnerParagraph>
                    </FontSize>
                    <FlexDirection column={!isMd()}>
                      <Gap value="8">
                        <Box>
                          <BackgroundColor value="page">
                            <HighlightSectionInnerParagraph>
                              CSS is generated dynamically at lightning speed using an incredibly small engine.
                            </HighlightSectionInnerParagraph>
                          </BackgroundColor>
                          <BackgroundColor value="page">
                            <HighlightSectionInnerParagraph>
                              It takes care of HTML for you without performance issue. (TODO)
                            </HighlightSectionInnerParagraph>
                          </BackgroundColor>
                        </Box>
                      </Gap>
                    </FlexDirection>
                  </HighlightSection>
                </Box>
              </Height>
            </Padding>
          </Gap>
        </Column>
      </Relative>
    </>
  );
  console.timeEnd("HomeV2");
  return result;
};

export default HomeV2;

const HighlightSection = (props: FlowProps) => {
  return (
    <Column>
      <BackgroundColor value="accent">
        {/* <Gap value="8"> */}
        <Gap value="2/1">
          <Padding value="4">
            <Rounded value="lg">
              <Box>{props.children}</Box>
            </Rounded>
          </Padding>
        </Gap>
      </BackgroundColor>
    </Column>
  );
};

const HighlightSectionInnerParagraph = (props: FlowProps) => {
  return (
    <Padding value="4">
      <Rounded value="lg">
        <FontSize value="lg">
          <Box>{props.children}</Box>
        </FontSize>
      </Rounded>
    </Padding>
  );
};
