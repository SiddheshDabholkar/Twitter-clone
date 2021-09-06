import { Link } from "react-router-dom";
import styled from "styled-components";
import { TweeterUsername } from "../../Typography/index";

export const ImageUploaderButton = styled.button`
  height: 25px;
  width: 25px;
  background-color: transparent;
  border-color: transparent;
  cursor: pointer;
`;

export const TweetContainer = styled.div`
  display: flex;
  margin: ${({ margin }) => margin};
  flex-direction: ${({ row }) => (row ? "row" : "column")};
  justify-content: center;
  align-items: center;
  width: 100%;
  /* border-bottom: 1px solid #80808038; */
  border-bottom: ${({ noborder }) => (noborder ? "" : "1px solid #80808038")};
  height: auto;
`;

export const SLink = styled(Link)`
  width: inherit;
  height: inherit;
  display: flex;
  cursor: pointer;
  flex-direction: ${({ col }) => (col ? "column" : "row")};
  :hover {
    background-color: #f5f5f5;
  }
`;

export const Restcontainer = styled.div`
  display: flex;
  flex-direction: ${({ col }) => (col ? "column" : "row")};
  align-items: center;
  justify-content: center;
`;
export const Row = styled.div`
  display: flex;
  /* flex-direction: row; */
  flex-direction: ${({ col }) => (col ? "column" : "row")};
  align-items: center;
  justify-content: left;
  width: 90%;
  margin-top: 10px;
  /* margin: 10px 15px; */
  @media (max-width: 500px) {
    width: 85%;
  }
`;
export const ImageContainer = styled.img`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  border: 1px solid transparent;
  margin: 15px 0px 15px 0px;
  @media (max-width: 500px) {
    max-width: 85%;
    max-height: 90%;
  }
`;
export const STweetContainer = styled(TweetContainer)`
  width: 100%;
  flex-direction: row;
  /* padding: 25px; */
  padding: ${({ no }) => (no ? "" : "25px")};
  padding-top: 0px;
  cursor: pointer;
  :hover {
    /* background-color: #f5f5f5; */
    background-color: ${({ noHover }) => (noHover ? "" : " #f5f5f5")};
  }
`;

export const TweetContent = styled.p`
  color: #000;
  font-size: 20px;
  flex-direction: row;
  justify-content: flex-start;
  padding: 0;
  margin: 2px;
  @media (max-width: 500px) {
    font-size: 16px;
  }
`;

export const IconContainer = styled.div`
  /* display: inline-block; */
  display: ${({ p }) => (p ? "contents" : "inline-block")};
  position: relative;
  flex-direction: column;
  font-size: 20px;
  border-radius: 50%;
  width: 25%;
  align-items: center;
  justify-content: center;
  color: grey;

  #blue {
    :hover {
      color: #1da1f2;
      background-color: #1da1f273;
      border-radius: 50%;
    }
  }
  #green {
    :hover {
      color: green;
      border-radius: 50%;
      background-color: #43f16866;
    }
  }
  #red {
    :hover {
      color: red;
      border-radius: 50%;
      background-color: #de1d1d73;
    }
  }
`;

export const RetweetedHeading = styled(TweeterUsername)`
  color: grey;
  font-size: 17px;
`;

export const Above = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  /* :hover {
    background-color: #f5f5f5;
  } */
`;
export const RetweetedHeadingContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 95%;
  justify-content: flex-start;
`;
export const RetweetIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 5%;
`;
export const SRow = styled(Row)`
  justify-content: space-around;
  margin: 15px;
`;
export const PostSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 95%;
`;
export const UtilContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;
export const IconButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 20%;
  align-items: center;
  justify-content: center;
`;
export const UploadcontentContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  align-items: center;
  justify-content: flex-start;
`;

export const InputnIconCon = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
