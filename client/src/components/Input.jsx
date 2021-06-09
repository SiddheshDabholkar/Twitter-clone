import styled from "styled-components";

export const StyledInput = styled.input`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  height: 70px;
  border-color: #1da1f2 !important;
  font-size: 20px;
  padding: 5px 20px;
  width: 90%;
  margin: 20px;
  @media (max-width: 450px) {
    width: 80%;
    margin: 10px;
    height: 40px;
  }
  @media (max-width: 350px) {
    width: 80%;
    margin: 5px;
    height: 40px;
  }
`;

/* export const TweetInput = styled.input` */
export const TweetInput = styled.textarea`
  display: flex;
  flex-direction: row;
  height: 80px;
  border: 0px;
  width: 97%;
  word-break: break-word;
  font-size: 26px;

  :focus {
    outline: none;
  }
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  ::-webkit-scrollbar {
    /* WebKit */
    width: 0;
    height: 0;
  }
`;
