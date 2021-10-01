import { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
//
import { AuthContext } from "../../context/auth";
import useWindow from "../../hooks/useWindow";
//
import { AvatarContainer, Avatar } from "../../components/Avatar";
import { Logo, LogoContainer } from "../../components/Logo";
import { ButtonContainer } from "../../components/Buttons/ButtonContainer";
import { CStyledButton } from "../../components/Buttons/CircleButton";
import LogOutModal from "../../components/Dropdown/LogoutDropdown";
import { SmallParagrah } from "../AfterAuthPassing/WhatsHappening";
// icons
import { FaFeatherAlt } from "react-icons/fa";
import { FaHashtag } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { IoNotificationsOutline } from "react-icons/io5";
import { BiMessage, BiBookmark } from "react-icons/bi";
import { RiFileListLine } from "react-icons/ri";
import { HiOutlineUser } from "react-icons/hi";
import { CgMoreO } from "react-icons/cg";
import { FiMoreHorizontal } from "react-icons/fi";
import MakeTweetModal from "../../components/Modals/MakeTweetModal";
import useModal from "../../hooks/useModal";
import useDropdown from "../../hooks/useDropdown";

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
  height: 35px;
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
  width: 95%;
  bottom: 0;
  height: 80px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  :hover {
    background-color: #1da1f224;
  }
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
  const { user } = useContext(AuthContext);
  const { Modal, show, toggle, setShow } = useModal(MakeTweetModal);
  const {
    DropDown,
    show: showLGD,
    setShow: setShowLGD,
  } = useDropdown(LogOutModal);

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
      to: "/more",
      label: "More",
      icon: <CgMoreO style={{ fontSize: "22px" }} />,
    },
  ];
  const size = useWindow();
  const width = size.width;

  return (
    <>
      <SideBarContainer>
        <LogoLinkContainer>
          <LogoContainer>
            <Logo src={`${process.env.PUBLIC_URL}/icons8-twitter.svg`} small />
          </LogoContainer>
          {links.map((link) => (
            <ItemContainer key={link.label}>
              <IconContainer>
                <Link to={link.to}>{link.icon}</Link>
              </IconContainer>
              <SidebarLinks>
                <Link to={link.to}>{link.label}</Link>
              </SidebarLinks>
            </ItemContainer>
          ))}

          <ItemContainer>
            <IconContainer>
              <Link to={`/profile/${user.id}`}>
                <HiOutlineUser style={{ fontSize: "22px" }} />
              </Link>
            </IconContainer>
            <SidebarLinks>
              <Link to={`/profile/${user.id}`}>Profile</Link>
            </SidebarLinks>
          </ItemContainer>

          <ButtonContainer>
            <CStyledButton
              input
              txtColor="#fff"
              bgColor="#1da1f2"
              borderColor="transparent"
              onClick={toggle}
            >
              {width < 1280 ? (
                <FaFeatherAlt style={{ color: "#fff", fontSize: "20px" }} />
              ) : (
                "tweet"
              )}
            </CStyledButton>
          </ButtonContainer>
        </LogoLinkContainer>
        {showLGD && <DropDown show={showLGD} setShow={setShowLGD} />}
        <SidebarFooter onClick={() => setShowLGD(1)}>
          <AvatarContainer style={{ width: "20%" }}>
            <Avatar
              src={
                user.profilePic
                  ? user.profilePic
                  : "https://res.cloudinary.com/drntday51/image/upload/v1627672437/rchs2sorpbxtkilgisyn.png"
              }
            />
          </AvatarContainer>
          {width > 720 && (
            <>
              <SmallParagrah style={{ width: "60%" }}>
                {user.username}
              </SmallParagrah>
              <FiMoreHorizontal style={{ width: "20%", fontSize: "25px" }} />
            </>
          )}
        </SidebarFooter>
      </SideBarContainer>
      {show && (
        <Modal
          onClick={(e) => e.preventDefault()}
          toggle={toggle}
          setShow={setShow}
        />
      )}
    </>
  );
}
