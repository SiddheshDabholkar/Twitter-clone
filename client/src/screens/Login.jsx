import Signup from "./Signup";
import { useState, useContext } from "react";
import { MainContainer } from "../container/MainContainer";
import { ButtonContainer } from "../container/ButtonContainer";
import { StyledButton } from "../components/AuthButton";
import { SmallHeader, SmallParagraph } from "../Typography";
import { CardContainer } from "../container/CardContainer";
import { StyledInput } from "../components/Input";
import { Link, useLocation, useHistory } from "react-router-dom";
import { LogoContainer } from "../container/LogoContainer";
import { Logo } from "../components/Logo";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "../hooks/useForm";
import { AuthContext } from "../context/auth";

const LOGIN_USER = gql`
  mutation login($input: String!, $password: String!) {
    login(input: $input, password: $password) {
      token
      username
      phone
      email
      id
    }
  }
`;

export default function Login() {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const location = useLocation();
  const [show, setShow] = useState(false);
  const initialState = {
    input: "",
    email: "",
  };
  const { onChange, onSubmit, values } = useForm(
    LoginUserCallback,
    initialState
  );
  const [LoginUser] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      history.push("/home");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function LoginUserCallback() {
    LoginUser();
  }

  return (
    <>
      <MainContainer col>
        <CardContainer>
          <LogoContainer>
            <Logo src={`${process.env.PUBLIC_URL}/icons8-twitter.svg`} />
          </LogoContainer>
          <SmallHeader>Log in to Twitter</SmallHeader>
          <form onSubmit={onSubmit}>
            <MainContainer col>
              <StyledInput
                placeholder="password"
                name="password"
                value={values.password}
                onChange={onChange}
              />
              <StyledInput
                value={values.input}
                placeholder="Phone,email or username"
                name="input"
                onChange={onChange}
              />
            </MainContainer>
            <ButtonContainer>
              <StyledButton
                type="submit"
                input
                txtColor="#fff"
                bgColor="#1da1f2"
                borderColor="transparent"
              >
                login
              </StyledButton>
            </ButtonContainer>
          </form>

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
