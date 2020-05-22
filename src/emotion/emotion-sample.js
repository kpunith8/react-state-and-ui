// import React from "react";
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

const color = "red";

// this comment tells babel to convert jsx to call a
// function called jsx instead of React.createElement
/** @jsx jsx */
const EmotionUI = () => (
  <div>
    <div
      css={css`
        padding: 32px;
        background-color: #4ed44e;
        font-size: 24px;
        border-radius: 4px;
        &:hover {
          color: ${color};
        }
      `}
    >
      Hover to change color.
    </div>
    <br />

    <p>
      The css prop accepts <code>object styles</code> directly and does not require an
      additional import.
    </p>
    <div
      css={{
        backgroundColor: "lightgrey",
        "&:hover": {
          color: "yellow"
        }
      }}
    >
      This has a lightgrey background.
    </div>

    <p>String styles using css</p>

    <div
      css={css`
        background-color: #fefe44;
        &:hover {
          color: ${color};
        }
      `}
    >
      This has a yellow background.
    </div>

    <br />
    <p>
      styled components doesn't want /** @jsx jsx */ but needs React to be
      imported{" "}
    </p>
    <Container column>
      <Button>Styled Button</Button>
      <ButtonWithProps primary fontSize="20px">
        Button With fontSize and primary props
      </ButtonWithProps>
      <ButtonWithProps fontSize="15px">
        Button With fontSize prop
      </ButtonWithProps>
    </Container>

    <p>
      styled can style any component as long as it accepts a className prop.
    </p>
    <Fancy />
    <OldFancyButton />

    <div css={{ marginTop: "10px" }}>
      <H1 color="#ffd322" fontSize="40px">
        Object style
        <p>Punith</p>
      </H1>
      <Section>Sharing style</Section>
      <Aside>Aside Compnoent with, withComponent inherting from Section</Aside>
    </div>

    <NewContainer color="#ff5433">Dynamic styling</NewContainer>
  </div>
);

const Button = styled.button`
  color: blue;
  padding: 10px;
`;

const ButtonWithProps = styled.button`
  color: ${props => (props.primary ? "blue" : "#453622")};
  margin-top: 5px;
  padding: 10px;
  font-size: ${props => props.fontSize};
`;

const Container = styled.div(props => ({
  display: "flex",
  flexDirection: props.column ? "column" : "row"
}));

const Basic = ({ className }) => (
  <div className={className}>styled(Component)</div>
);

const ClassicButton = ({ className }) => (
  <button className={className}>Button styled(Component)</button>
);

const Fancy = styled(Basic)`
  color: #992939;
`;

const OldFancyButton = styled(ClassicButton)`
  color: #886fe4;
  padding: 20px;
  margin-top: 10px;
`;

// Object Styles
// Pass Props to composed styled component
const H1 = styled(Basic)`
  color: blue;
  display: 'flex';
  text-transform: uppercase;
  font-size: 50px;
  /* font-size: ${props => props.fontSize}; */

  p {
    font-size: 20px;
  }
`;
//   color: ${props => props.color};
//   font-size: ${props => props.fontSize}
// ;

// ometimes you want to create some styles with one component
// but then use those styles again with another component,
// the withComponent method can be used for teis.
const Section = styled.section`
  color: #3399ee;
`;

// this component has the same styles as Section but it renders an aside
const Aside = Section.withComponent("aside");

// Dynamic styling
const dynamicStyle = props =>
  css`
    color: ${props.color};
    margin-top: 10px;
  `;

const NewContainer = styled.div`
  ${dynamicStyle};
`;

export default EmotionUI;
