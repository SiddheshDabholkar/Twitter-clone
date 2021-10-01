import React, { useContext, useState } from "react";
// import { Link, useLocation, useHistory } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
//
import { StyledInput } from "../../components/Input";
import { SmallHeader } from "../../Typography";
// import { SmallHeader, SmallParagraph } from "../../Typography";
import { Logo, LogoContainer } from "../../components/Logo";
import { StyledLinkButton } from "../../components/Buttons/AuthButton";
import { ButtonContainer } from "../../components/Buttons/ButtonContainer";
import {
  Bg,
  ModalContainer,
  ModalContent,
} from "../../components/Modals/ModalUtils";
//
import { MainContainer } from "../../container/MainContainer";
import { CardContainer } from "../../container/CardContainer";
import { AuthContext } from "../../context/auth";
// import { useDisableBodyScroll } from "../../hooks/useDisableBodyScroll";
import { SIGN_UP } from "../../graphql/mutation";
import { Span } from "./Login";
// import Confirmotp from "./Confirmotp";

export default function Signin({ onClose, show }) {
  const context = useContext(AuthContext);
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let errors = "";
  const [signup] = useMutation(SIGN_UP, {
    variables: { username, password },
    update(_, { data: { register: userData } }) {
      context.login(userData);
      history.push("/home");
    },
  });

  // const [useFirst, setUseFirst] = useState(true);
  // const [showModal, setShowModal] = useState(false);
  // const location = useLocation();
  // const history = useHistory();

  // const Input = () => {
  //   if (useFirst) {
  //     return (
  //       <>
  //         <StyledInput placeholder="phone" />
  //         <SmallParagraph
  //           start
  //           onClick={() => setUseFirst(false)}
  //           style={{ cursor: "pointer" }}
  //         >
  //           use Email instead
  //         </SmallParagraph>
  //       </>
  //     );
  //   } else {
  //     return (
  //       <>
  //         <StyledInput placeholder="email" />
  //         <SmallParagraph
  //           start
  //           onClick={() => setUseFirst(true)}
  //           style={{ cursor: "pointer" }}
  //         >
  //           use phone instead
  //         </SmallParagraph>
  //       </>
  //     );
  //   }
  // };

  if (!show) return null;
  return (
    <>
      <Bg onClick={onClose}>
        <ModalContainer onClick={(e) => e.stopPropagation()}>
          <ModalContent>
            <CardContainer>
              <MainContainer nowrap style={{ flexDirection: "row" }}>
                <LogoContainer>
                  <Logo src={`${process.env.PUBLIC_URL}/icons8-twitter.svg`} />
                </LogoContainer>
              </MainContainer>
              <SmallHeader>Create your account</SmallHeader>
              <StyledInput
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {/* {errors && <Span>{errors}</Span>} */}
              <StyledInput
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* <Input /> */}

              <ButtonContainer>
                <StyledLinkButton
                  bgColor="#1da1f2"
                  borderColor="transparent"
                  txtColor="#fff"
                  style={{ width: "100%" }}
                  onClick={signup}
                >
                  Signup
                </StyledLinkButton>
                {/* <StyledButton
                  bgColor="#1da1f2"
                  borderColor="transparent"
                  txtColor="#fff"
                  style={{ width: "100%" }}
                >
                  <Link
                    // to="/home"
                    onClick={signup}
                    // to={{
                    //   pathname: "/confirmotp",
                    //   state: { background: location },
                    // }}
                    // onClick={() => {
                    //   setShowModal(true);
                    // }}
                  >
                    Signup
                  </Link>
                </StyledButton> */}
              </ButtonContainer>
            </CardContainer>
          </ModalContent>
        </ModalContainer>
      </Bg>
      {/* <Confirmotp
        showModal={showModal}
        onCloseModal={() => {
          setShowModal(false);
          history.push("/");
        }}
      /> */}
    </>
  );
}
