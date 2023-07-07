import styled from '@emotion/styled';

// Create the styled components
export const DropzoneSection = styled.section`
  padding: 20px;
  border: 2px dashed #8c8c8c;
  border-radius: 20px;
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 50%;
`;

export const DropzoneInput = styled.div`
  padding: 10px;
  text-align: center;
  cursor: pointer;
  background-color: #ffffff;
  margin: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FileList = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FileListItem = styled.li`
  margin: 10px 0;
  background-color: #e0e0e0;
  padding: 10px;
  width: fit-content;
  text-align: center;
  border-radius: 10px;
`;
