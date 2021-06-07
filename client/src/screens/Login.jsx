import { useState } from "react";
import { MainContainer } from "../container/MainContainer";
import { ButtonContainer } from "../container/ButtonContainer";
import { StyledButton } from "../components/AuthButton";
import { SmallHeader, SmallParagraph } from "../Typography";
import { CardContainer } from "../container/CardContainer";
import { StyledInput } from "../components/Input";
import { Link, useLocation, useHistory } from "react-router-dom";
import Signup from "./Signup";
import { LogoContainer } from "../container/LogoContainer";
import { Logo } from "../components/Logo";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "../hooks/useForm";

const LOGIN_USER = gql`
  mutation login(
    $username: String
    $password: password!
    $phone: phone
    $email: email
  ) {
    login(
      username: $username
      password: $password
      email: $email
      phone: $phone
    ) {
      id
      username
      phone
      email
    }
  }
`;

export default function Login() {
  const [show, setShow] = useState(false);
  const location = useLocation();
  const history = useHistory();

  const initialState = {
    username: "",
    password: "",
    email: "",
    phone: "",
  };
  // const { onChange, onSubmit, values } = useForm(
  //   LoginUserCallback,
  //   initialState
  // );
  // function LoginUserCallback() {
  //   LoginUser();
  // }
  // const [LoginUser, { loading }] = useMutation(LOGIN_USER, {});

  return (
    <>
      <MainContainer col>
        <CardContainer>
          <LogoContainer>
            <Logo src={`${process.env.PUBLIC_URL}/icons8-twitter.svg`} />
          </LogoContainer>
          <SmallHeader>Log in to Twitter</SmallHeader>
          <MainContainer col>
            <StyledInput placeholder="Phone,email or username" />
            <StyledInput placeholder="password" />
          </MainContainer>
          <ButtonContainer>
            <StyledButton
              input
              txtColor="#fff"
              bgColor="#1da1f2"
              borderColor="transparent"
            >
              login
            </StyledButton>
          </ButtonContainer>
          <MainContainer>
            <SmallParagraph>
              <Link to="/forgotpassword">Forgot Password?</Link>
            </SmallParagraph>
            <SmallParagraph>
              <Link
                to={{
                  pathname: "/signup",
                  state: { background: location },
                }}
                onClick={() => {
                  setShow(true);
                }}
              >
                Sign up for twitter
              </Link>
            </SmallParagraph>
            <Signup
              show={show}
              onClose={() => {
                setShow(false);
                history.push("/");
              }}
            />
          </MainContainer>
        </CardContainer>
      </MainContainer>
    </>
  );
}
