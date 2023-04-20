import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface WebUtilsProps {}

const StyledWebUtils = styled.div`
  color: pink;
`;

export function WebUtils(props: WebUtilsProps) {
  return (
    <StyledWebUtils>
      <h1>Welcome to WebUtils!</h1>
    </StyledWebUtils>
  );
}

export default WebUtils;
