import {
  Absolute,
  BackgroundColor,
  BorderTop,
  Box,
  Filter,
  FlexDirection,
  FontSize,
  Gap,
  Height,
  Layout,
  Margin,
  Opacity,
  Overflow,
  Padding,
  Relative,
  Rounded,
  Text,
  Width,
} from "@mugen/core";
import { createMediaQuery } from "@solid-primitives/media";
import { FlowProps } from "solid-js";
import appCode from "../App.tsx?raw";
import { Button } from "../components/Button";
import { CAButton } from "../components/CAButton";
import { Code } from "../components/Code";

function useMdBreakpoint() {
  return createMediaQuery("(min-width: 768px)");
}

const Home = () => {
  console.time("HomeV2");
  const isMd = useMdBreakpoint();
  const result = (
    <>
      <Relative>
        <Height min="hscreen">
          <Padding bottom="16" top="44">
            <Layout justify="center" items="center">
              <Absolute top="0" left="0">
                <Width value="full">
                  <Height value="full">
                    <Opacity value="25">
                      <Overflow value="hidden">
                        <Filter blur="5">
                          <Box aria-hidden="true" tabindex="-1">
                            <Code language="tsx">{appCode}</Code>
                          </Box>
                        </Filter>
                      </Overflow>
                    </Opacity>
                  </Height>
                </Width>
              </Absolute>
              <Relative zIndex="1">
                <Width value={isMd() ? "2/3" : undefined} max="wscreen">
                  <Margin value="auto">
                    <Padding value="10">
                      <Layout column gap="16">
                        <FontSize value={isMd() ? "6xl" : "3xl"}>
                          <Text>
                            An <strong>UI toolkit</strong> that provides low level components to build app faster and
                            easier.
                          </Text>
                        </FontSize>
                        <FontSize value={isMd() ? "5xl" : "2xl"}>
                          <Text>
                            It provides a typed way to adopt <strong>design systems</strong> easily!🎉
                          </Text>
                        </FontSize>
                        <Layout justify="center" gap={isMd() ? "8" : "4"}>
                          <CAButton href="#get-started">
                            <Text>Get Started</Text>
                          </CAButton>
                          <Button href="https://github.com/lheido/mugen" target="_blank">
                            <Text>Github</Text>
                          </Button>
                        </Layout>
                      </Layout>
                    </Padding>
                  </Margin>
                </Width>
              </Relative>
            </Layout>
          </Padding>
        </Height>
      </Relative>
      <Relative>
        <BorderTop color="primary" width="16" style="solid">
          <Padding top={isMd() ? "64" : "0"} x={isMd() ? "48" : "0"}>
            <Height min="hscreen">
              <Layout column gap="16" id="get-started">
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
                            It takes care of HTML for us without performance cost. (TODO)
                          </HighlightSectionInnerParagraph>
                        </BackgroundColor>
                      </Box>
                    </Gap>
                  </FlexDirection>
                </HighlightSection>
                {/* <As value="section">
                <Layout column gap="4">
                  <Box>Install the package</Box>
                  <Code language="bash">{"pnpm install mugen"}</Code>
                </Layout>
              </As>
              <As value="section">
                <Layout column gap="4">
                  <Box>Basic usage</Box>
                  <Code language="tsx">{basicUsage}</Code>
                </Layout>
              </As> */}
                <Text>Site under construction</Text>
              </Layout>
            </Height>
          </Padding>
        </BorderTop>
      </Relative>
    </>
  );
  console.timeEnd("HomeV2");
  return result;
};

export default Home;

const HighlightSection = (props: FlowProps) => {
  return (
    <BackgroundColor value="accent">
      <Padding value="4">
        <Rounded value="lg">
          <Layout column gap="8">
            {props.children}
          </Layout>
        </Rounded>
      </Padding>
    </BackgroundColor>
  );
};

const HighlightSectionInnerParagraph = (props: FlowProps) => {
  return (
    <Padding value="4">
      <Rounded value="lg">
        <FontSize value="lg">
          <Text>{props.children}</Text>
        </FontSize>
      </Rounded>
    </Padding>
  );
};
