import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;
const Pane = styled.div`
  display: ${(props) => props.weight};
`;

export const SplitScreens = ({ left , right, leftWeight = 1, rightWeight = 1 }) => {
  return (
    <Container>
      <Pane weight={leftWeight} >{left}</Pane>
      <Pane weight={rightWeight}>{right}</Pane>
    </Container>
  );
};
