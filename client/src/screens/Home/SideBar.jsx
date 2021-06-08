import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GoHome } from "react-icons/go";
import { FaHashtag } from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";
import { BiMessage, BiBookmark } from "react-icons/bi";
import { RiFileListLine } from "react-icons/ri";
import { HiOutlineUser } from "react-icons/hi";
import { CgMoreO } from "react-icons/cg";
import { Logo } from "../../components/Logo";
import { LogoContainer } from "../../container/LogoContainer";
import { ButtonContainer } from "../../container/ButtonContainer";
import { Avatar } from "../../components/Avatar";
import { AvatarContainer } from "../../container/AvatarContainer";
import { CStyledButton } from "../../components/CircleButton";
import useWindow from "../../hooks/useWindow";
import { FaFeatherAlt } from "react-icons/fa";
import { SmallParagraph } from "../../Typography";

const SidebarLinks = styled.p`
  display: flex;
  flex-direction: row;
  width: 80%;
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  height: auto;
  color: #000;
  a {
    &:hover {
      color: #1da1f2;
    }
  }
  @media (max-width: 1280px) {
    display: none;
  }
`;

const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  justify-content: center;
  width: 20%;
  background-color: white;
  height: auto;
  border: 1px solid #80808038;
  a {
    color: #000;
    &:hover {
      color: #1da1f2;
    }
  }
  @media (max-width: 1280px) {
    width: 10%;
  }
  @media (max-width: 1000px) {
    width: 15%;
  }
  @media (max-width: 500px) {
    display: none;
  }
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

const IconContainer = styled.div`
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
export default function SideBar() {
  const links = [
    {
      to: "/home",
      label: "Home",
      icon: <GoHome style={{ fontSize: "25px" }} />,
    },
    {
      to: "/explore",
      label: "Explore",
      icon: <FaHashtag style={{ fontSize: "25px" }} />,
    },
    {
      to: "/notification",
      label: "Notification",
      icon: <IoNotificationsOutline style={{ fontSize: "25px" }} />,
    },
    {
      to: "/messages",
      label: "Messages",
      icon: <BiMessage style={{ fontSize: "25px" }} />,
    },
    {
      to: "/bookmarks",
      label: "Bookmarks",
      icon: <BiBookmark style={{ fontSize: "25px" }} />,
    },
    {
      to: "/lists",
      label: "Lists",
      icon: <RiFileListLine style={{ fontSize: "25px" }} />,
    },
    {
      to: "/profile",
      label: "Profile",
      icon: <HiOutlineUser style={{ fontSize: "25px" }} />,
    },
    {
      to: "/more",
      label: "More",
      icon: <CgMoreO style={{ fontSize: "25px" }} />,
    },
  ];
  const size = useWindow();
  const width = size.width;

  return (
    <>
      <SideBarContainer>
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
        </ButtonContainer>
        <SidebarFooter>
          <AvatarContainer>
            <Avatar />
          </AvatarContainer>
        </SidebarFooter>
      </SideBarContainer>
    </>
  );
}
