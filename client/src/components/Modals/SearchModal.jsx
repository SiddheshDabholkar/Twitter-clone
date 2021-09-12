import React, { useRef } from "react";
import styled from "styled-components";
import { TweeterUsername, SmallParagraph } from "../../Typography";
import { SAvatarContainer, SAvatar } from "../Avatar";
import { SLink } from "../Tweet";
import useOnClickOutside from "../../hooks/useOnClickOutsideRef";
import { useLocation } from "react-router";

const SearchModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: ${({ lrg }) => (lrg ? "96%" : "26%")};
  overflow-y: scroll;
  max-height: 50%;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  z-index: 1;
  margin: 2%;
  border-radius: 15px;
  margin-top: 0px;
  box-shadow: 0 5px 10px #7a6f6f66, 0 15px 40px #8a8a8a66;
  @media (min-width: 1024px) {
    width: ${({ lrg }) => (lrg ? " 47%" : "26%")};
  }
  @media (max-width: 1023px) {
    width: ${({ lrg }) => (lrg ? "60%" : "26%")};
  }
  @media (max-width: 1000px) {
    width: ${({ lrg }) => (lrg ? "81%" : "26%")};
  }
  @media (max-width: 500px) {
    width: ${({ lrg }) => (lrg ? "96%" : "26%")};
  }
`;

const UserCard = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const InfoContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
`;

export default function SearchModal({ show, data, setShow }) {
  const ref = useRef(null);
  useOnClickOutside(ref, () => setShow(false));
  const { pathname } = useLocation();
  const newPathname = pathname.substring(1);

  const UserExists = () => {
    if (data && data.getSearchedUser.length > 0) {
      const userdata = data.getSearchedUser;
      return (
        <>
          {userdata.map((d) => {
            return (
              <>
                <UserCard>
                  <SLink to={`/profile/${d.id}`}>
                    <SAvatarContainer large>
                      <SAvatar
                        src={
                          d.profilePic
                            ? d.profilePic
                            : "https://res.cloudinary.com/drntday51/image/upload/v1627672437/rchs2sorpbxtkilgisyn.png"
                        }
                      />
                    </SAvatarContainer>
                    <InfoContainer>
                      <TweeterUsername>{d.username}</TweeterUsername>
                      <TweeterUsername small topzero>
                        {d.bio}
                      </TweeterUsername>
                    </InfoContainer>
                  </SLink>
                </UserCard>
              </>
            );
          })}
        </>
      );
    } else {
      return (
        <UserCard>
          <SmallParagraph small>Try searching for people</SmallParagraph>
        </UserCard>
      );
    }
  };

  if (show) {
    return (
      <>
        {newPathname.startsWith("explore") ? (
          <SearchModalContainer ref={ref} lrg>
            <UserExists />
          </SearchModalContainer>
        ) : (
          <SearchModalContainer ref={ref}>
            <UserExists />
          </SearchModalContainer>
        )}
      </>
    );
  } else return null;
}
