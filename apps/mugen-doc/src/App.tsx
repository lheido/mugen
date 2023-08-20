import { Component, FlowProps, For, Show } from "solid-js";

import {
  Absolute,
  As,
  BackgroundColor,
  Box,
  Button,
  Color,
  Fill,
  Font,
  Height,
  Hierarchy,
  Layout,
  Overflow,
  Padding,
  Relative,
  Scale,
  Sticky,
  Title,
  Translate,
  Width,
} from "@mugen/core";
import { useRoutes } from "@solidjs/router";
import { Dynamic } from "solid-js/web";
import { routes } from "./app.routing";
import { isMd } from "./utils/breakpoints";

type NavItemData = {
  value: string;
};

const categories: NavItemData[] = [
  { value: "General" },
  { value: "Layout" },
  { value: "Typography" },
  { value: "Navigation" },
  { value: "Feedback" },
  { value: "Overlay" },
  { value: "Others" },
];

const NavItem = (props: { data: NavItemData }) => {
  return (
    <As value="a">
      <Padding x="20" y="4">
        <Font weight="medium">
          <Box>{props.data.value}</Box>
        </Font>
      </Padding>
    </As>
  );
};

const MainNavigation = () => {
  return (
    <Overflow x={isMd() ? "auto" : "scroll"}>
      <Width max="wscreen">
        <Sticky top={isMd() ? "64" : undefined}>
          <As value="nav">
            <Layout column={isMd()}>
              <For each={categories}>{(data) => <NavItem data={data} />}</For>
            </Layout>
          </As>
        </Sticky>
      </Width>
    </Overflow>
  );
};

const SideBar = () => {
  return (
    <Relative>
      <Padding top="32">
        <BackgroundColor value="primary">
          <Height min="hscreen">
            <Box>
              <MainNavigation />
            </Box>
          </Height>
        </BackgroundColor>
      </Padding>
    </Relative>
  );
};

const SiteTitle = (props: FlowProps) => {
  return (
    <Color value="page">
      <Absolute top="14" left="1/2">
        <Width value="max">
          <Font size="base" weight="black">
            <Translate x="-1/2">
              <Scale value="400">
                <Title>{props.children}</Title>
              </Scale>
            </Translate>
          </Font>
        </Width>
      </Absolute>
    </Color>
  );
};

const MdSiteTitle = (props: FlowProps) => {
  return (
    <Color from="page" to="primary" fromOffset="50" toOffset="50" direction="right">
      <Scale value="600">
        <SiteTitle {...props} />
      </Scale>
    </Color>
  );
};

const Header = () => {
  return (
    <Relative>
      <As value="header">
        <Box>
          <Sticky top="0" zIndex="3">
            <Box>
              <Button href="/">
                <Dynamic component={isMd() ? MdSiteTitle : SiteTitle}>Mugen</Dynamic>
              </Button>
              <Show when={!isMd()}>
                <MainNavigation />
              </Show>
            </Box>
          </Sticky>
        </Box>
      </As>
    </Relative>
  );
};

const App: Component = () => {
  const Routes = useRoutes(routes);
  return (
    <Layout column={!isMd()}>
      <Show when={isMd()}>
        <SideBar />
      </Show>
      <Header />
      <Relative>
        <As value="main">
          <Fill>
            <Box>
              <Hierarchy>
                <Routes />
              </Hierarchy>
            </Box>
          </Fill>
        </As>
      </Relative>
    </Layout>
  );
};

export default App;
