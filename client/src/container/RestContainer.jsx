import styled from "styled-components";

export const RestContainer = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  width: 100%;
  top: 0;

  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  ::-webkit-scrollbar {
    /* WebKit */
    width: 0;
    height: 0;
  }
`;
