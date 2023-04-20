import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface WebUiProps {}

const StyledWebUi = styled.div`
  color: pink;
`;

export function WebUi(props: WebUiProps) {
  return (
    <StyledWebUi>
      <h1>Welcome to WebUi!</h1>
    </StyledWebUi>
  );
}

export default WebUi;
