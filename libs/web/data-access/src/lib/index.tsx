import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface WebDataAccessProps {}

const StyledWebDataAccess = styled.div`
  color: pink;
`;

export function WebDataAccess(props: WebDataAccessProps) {
  return (
    <StyledWebDataAccess>
      <h1>Welcome to WebDataAccess!</h1>
    </StyledWebDataAccess>
  );
}

export default WebDataAccess;
