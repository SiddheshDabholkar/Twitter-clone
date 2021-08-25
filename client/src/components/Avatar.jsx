import styled from "styled-components";

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid grey;
`;

export const SAvatar = styled(Avatar)`
  width: ${({ small }) => (small ? "30px" : "45px")};
  height: ${({ small }) => (small ? "30px" : "45px")};
  @media (max-width: 500px) {
    width: ${({ small }) => (small ? "20px" : "30px")};
    height: ${({ small }) => (small ? "20px" : "30px")};
  }
`;

export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  justify-content: center;
  align-items: center;
  margin: 10px;
  align-items: center;
  width: 100%;
`;
export const SAvatarContainer = styled(AvatarContainer)`
  flex-direction: column;
  /* width: 5%; */
  width: ${({ large }) => (large ? "20%" : "5%")};
  height: 90%;
  /* justify-content: flex-start; */
  justify-content: ${({ center }) => (center ? "center" : "flex-start")};
  padding: 4px;
  margin: 4px;
`;
