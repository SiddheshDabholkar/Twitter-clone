import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Logo } from "../../components/Logo";
import { LogoContainer } from "../../container/LogoContainer";
import { ButtonContainer } from "../../container/ButtonContainer";
import { Avatar } from "../../components/Avatar";
import { AvatarContainer } from "../../container/AvatarContainer";
import { CStyledButton } from "../../components/CircleButton";
import useWindow from "../../hooks/useWindow";
import Popover from "../../components/Popover";
// icons
import { FaFeatherAlt } from "react-icons/fa";
import { FaHashtag } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { IoNotificationsOutline } from "react-icons/io5";
import { BiMessage, BiBookmark } from "react-icons/bi";
import { RiFileListLine } from "react-icons/ri";
import { HiOutlineUser } from "react-icons/hi";
import { CgMoreO } from "react-icons/cg";
//styles
const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  justify-content: space-between;
  width: 20%;
  background-color: white;
  height: 100%;
  border: 1px solid #80808038;
  border-bottom: 0px;
  top: 0;
  left: 0;
  position: fixed;
  a {
    color: #000;
    &:hover {
      color: #1da1f2;
    }
  }
  @media (min-width: 1024px) {
    width: 20%;
  }
  @media (max-width: 1023px) {
    width: 15%;
  }
  @media (max-width: 1000px) {
    width: 15%;
  }
  @media (max-width: 500px) {
    display: none;
  }
`;
const SidebarLinks = styled.p`
  display: flex;
  flex-direction: row;
  width: 80%;
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  height: auto;
  color: #000;
  a {
    &:hover {
      color: #1da1f2;
    }
  }
  @media (max-width: 1023px) {
    display: none;
  }
  /* @media (max-width: 1280px) {
    display: none;
  } */
`;
const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  margin: 7px;
  &:hover {
    background-color: #1da1f224;
    border-radius: 50px;
  }
`;
export const IconContainer = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 20%;
`;
const SidebarFooter = styled.footer`
  display: flex;
  width: 100%;
  bottom: 0;
  height: 60px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const LogoLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  right: 0;
`;
export default function SideBar() {
  const links = [
    {
      to: "/home",
      label: "Home",
      icon: <GoHome style={{ fontSize: "22px" }} />,
    },
    {
      to: "/explore",
      label: "Explore",
      icon: <FaHashtag style={{ fontSize: "22px" }} />,
    },
    {
      to: "/notification",
      label: "Notification",
      icon: <IoNotificationsOutline style={{ fontSize: "22px" }} />,
    },
    {
      to: "/messages",
      label: "Messages",
      icon: <BiMessage style={{ fontSize: "22px" }} />,
    },
    {
      to: "/bookmarks",
      label: "Bookmarks",
      icon: <BiBookmark style={{ fontSize: "22px" }} />,
    },
    {
      to: "/lists",
      label: "Lists",
      icon: <RiFileListLine style={{ fontSize: "22px" }} />,
    },
    {
      to: "/profile",
      label: "Profile",
      icon: <HiOutlineUser style={{ fontSize: "22px" }} />,
    },
    {
      to: "/more",
      label: "More",
      icon: <CgMoreO style={{ fontSize: "22px" }} />,
    },
  ];
  const size = useWindow();
  const width = size.width;
  const [show, setShow] = useState(false);

  return (
    <>
      <SideBarContainer>
        <LogoLinkContainer>
          <LogoContainer>
            <Logo src={`${process.env.PUBLIC_URL}/icons8-twitter.svg`} small />
          </LogoContainer>
          {links.map((link) => (
            <ItemContainer>
              <IconContainer>
                <Link to={link.to}>{link.icon}</Link>
              </IconContainer>
              <SidebarLinks>
                <Link to={link.to}>{link.label}</Link>
              </SidebarLinks>
            </ItemContainer>
          ))}

          <ButtonContainer>
            <CStyledButton
              onClick={() => {
                setShow(true);
              }}
              txtColor="#fff"
              bgColor="#1da1f224"
              borderColor="transparent"
              hbgColor=" #1da1f2"
            >
              {width < 1280 ? (
                <FaFeatherAlt style={{ color: "#fff", fontSize: "20px" }} />
              ) : (
                "tweet"
              )}
            </CStyledButton>
            <Popover
              show={show}
              onClose={() => {
                setShow(false);
              }}
            >
              <h1>lomao</h1>
              <h1>lomao</h1>
              <h1>lomao</h1>
              <h1>lomao</h1>
              <h1>lomao</h1>
            </Popover>
          </ButtonContainer>
        </LogoLinkContainer>
        <SidebarFooter>
          <AvatarContainer>
            <Avatar />
          </AvatarContainer>
        </SidebarFooter>
      </SideBarContainer>
    </>
  );
}
