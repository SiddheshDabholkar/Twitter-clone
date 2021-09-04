import React, { useContext, useRef } from "react";
import styled from "styled-components";

import { AiOutlineClose } from "react-icons/ai";
import { MdPermMedia } from "react-icons/md";
import { AiOutlineFileGif } from "react-icons/ai";
import { GrEmoji } from "react-icons/gr";
import { RiBarChartHorizontalFill } from "react-icons/ri";
import { FiCalendar } from "react-icons/fi";

import { Bg } from "./ModalUtils";
import { BodyContainer, Navbar, NavbarInner, LeftContainer } from "./common";
import { IconContainer, Restcontainer, STweetContainer } from "../Tweet";
import { SAvatar } from "../Avatar";
import { SaveButton } from "./EditProfile";
import { TweetInput } from "../Input";
import { AuthContext } from "../../context/auth";
import useOnClickOutsideRef from "../../hooks/useOnClickOutsideRef";

const ReTweetModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  max-height: 60%;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14);
  border-radius: 10px;
`;

const Acon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100% !important;
  width: 15% !important;
`;

//footer
const TweetFooter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 100% !important;
  margin-bottom: 0px;
  border-top: 1px solid #e0dfdf;
`;
const FootCont = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: ${({ mr }) => mr};
  justify-content: ${({ end }) => (end ? "flex-end" : "center")};
  width: ${({ small }) => (small ? "40%" : "60%")};
`;
export default function MakeTweetModal({ toggle, setShow }) {
  const ref = useRef(null);
  const { user } = useContext(AuthContext);
  useOnClickOutsideRef(ref, () => setShow(false));
  return (
    <>
      <Bg transparent>
        <ReTweetModalContainer
          ref={ref}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <BodyContainer>
            <Navbar style={{ borderBottom: "1px solid #00011110" }} long>
              <NavbarInner>
                <LeftContainer>
                  <AiOutlineClose
                    style={{ fontSize: "30px", cursor: "pointer" }}
                    onClick={toggle}
                  />
                </LeftContainer>
              </NavbarInner>
            </Navbar>
            <BodyContainer mt="10px">
              <STweetContainer noborder noHover no>
                <Acon>
                  <SAvatar
                    src={
                      user
                        ? user.profilePic
                        : "https://res.cloudinary.com/drntday51/image/upload/v1627108184/twitter/ptupstjuaejspvhj9mfj.jpg"
                    }
                  />
                </Acon>
                <Restcontainer
                  col
                  style={{
                    width: "85%",
                  }}
                >
                  <TweetInput
                    placeholder="Whats's happening?"
                    cols="40"
                    rows="2"
                  />
                  <TweetFooter>
                    <FootCont small>
                      <IconContainer>
                        <MdPermMedia id="blue" />
                      </IconContainer>
                      <IconContainer>
                        <AiOutlineFileGif id="blue" />
                      </IconContainer>
                      <IconContainer>
                        <GrEmoji id="blue" />
                      </IconContainer>
                      <IconContainer>
                        <RiBarChartHorizontalFill id="blue" />
                      </IconContainer>
                      <IconContainer>
                        <FiCalendar id="blue" />
                      </IconContainer>
                    </FootCont>
                    <FootCont end mr="10px">
                      <SaveButton>tweet</SaveButton>
                    </FootCont>
                  </TweetFooter>
                </Restcontainer>
              </STweetContainer>
            </BodyContainer>
          </BodyContainer>
        </ReTweetModalContainer>
      </Bg>
    </>
  );
}
