import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthStatus, useStore } from "../services/StoreContext";
import { Alert, Form, OverlayTrigger } from "react-bootstrap";
import { LoginRegView } from "../views/LoginRegView";
import { useForm } from "react-hook-form";
import { useAuth } from "../services/auth";
import { LoginData, postLogin } from "../services/auth";

type LoginFormData = LoginData;

export function LoginPage() {
  const { authStatus, setAuthStatus } = useStore();
  const { revalidate: revalidateAuth } = useAuth();
  const history = useHistory();

  const [signedOutShow, setSignedOutShow] = useState(false);
  const [expiredShow, setExpiredShow] = useState(false);
  const [bannedShow, setBannedShow] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [wrong, setWrong] = useState(false);

  const { register, handleSubmit } = useForm<LoginFormData>({
    defaultValues: {
      username: "thunderboy",
      password: "reins1409",
    },
  });

  useEffect(() => {
    setSignedOutShow(authStatus === AuthStatus.LoggedOut);
    setBannedShow(authStatus === AuthStatus.Banned);
    setExpiredShow(authStatus === AuthStatus.Expired);

    const timeout = setTimeout(() => {
      setBannedShow(false);
      setSignedOutShow(false);
      setExpiredShow(false);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [authStatus]);

  return (
    <>
      <Alert show={signedOutShow} variant="primary" className="text-center h5">
        You have signed out.
      </Alert>
      <Alert show={bannedShow} variant="danger" className="text-center h5">
        Your account has been banned by administrators.
      </Alert>
      <Alert show={expiredShow} variant="danger" className="text-center h5">
        Your session has expired. Please sign in again.
      </Alert>
      <LoginRegView
        isSignIn
        onSubmit={handleSubmit(async (data) => {
          setProcessing(true);
          setWrong(false);
          const res = await postLogin(data);
          await revalidateAuth();
          setProcessing(false);
          if (res.ok) {
            setAuthStatus(AuthStatus.LoggedIn);
            history.push("/home");
          } else if (res.status === 403) {
            setAuthStatus(AuthStatus.Banned);
          } else {
            setAuthStatus(AuthStatus.NotLoggedIn);
            setWrong(true);
          }
        })}
        isProcessing={processing}
      >
        <OverlayTrigger
          placement="bottom-end"
          trigger="focus"
          delay={300}
          overlay={
            // <Tooltip id="user-tooltip">
            //   Sign in as <strong>{ADMINS.join(" or ")}</strong> to obtain the
            //   admin permissions.
            // </Tooltip>
            <div />
          }
        >
          <Form.Control
            className="input-first"
            placeholder="Username"
            autoComplete="username"
            required
            autoFocus
            isInvalid={wrong}
            {...register("username")}
          />
        </OverlayTrigger>
        <Form.Control
          className="input-last"
          placeholder="Password"
          type="password"
          required
          isInvalid={wrong}
          {...register("password")}
        ></Form.Control>

        {wrong ? (
          <Form.Control.Feedback type="invalid">
            Please try again.
          </Form.Control.Feedback>
        ) : null}

        <Form.Switch className="mt-3" label="Remember me" defaultChecked />
      </LoginRegView>
    </>
  );
}
