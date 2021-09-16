import styled from "styled-components";
import { Link } from "react-router-dom";
//
import { GoHome } from "react-icons/go";
import { IoNotificationsOutline } from "react-icons/io5";
import { BiMessage, BiSearch } from "react-icons/bi";

const FooterContainer = styled.footer`
  display: flex;
  padding: 0px 10px 0px 10px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  bottom: 0;
  padding: 0;
  margin: 0;
  height: 35px;
  background-color: #fff;
  width: 100%;
  @media (min-width: 500px) {
    display: none;
  }
`;

const SIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25%;
  a {
    color: #000;
  }
`;

export default function HomeFooter() {
  return (
    <>
      <FooterContainer>
        <SIconContainer>
          <Link to="/home">
            <GoHome />
          </Link>
        </SIconContainer>
        <SIconContainer>
          <Link to="/explore">
            <BiSearch />
          </Link>
        </SIconContainer>
        <SIconContainer>
          <Link to="/notification">
            <IoNotificationsOutline />
          </Link>
        </SIconContainer>
        <SIconContainer>
          <Link to="/messages">
            <BiMessage />
          </Link>
        </SIconContainer>
      </FooterContainer>
    </>
  );
}
