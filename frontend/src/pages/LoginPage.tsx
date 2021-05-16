import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useStore } from "../services/StoreContext";
import { Alert, Form, OverlayTrigger } from "react-bootstrap";
import { LoginRegView } from "../views/LoginRegView";
import { useForm } from "react-hook-form";
import { useUser } from "../services/auth";
import { LoginData, postLogin } from "../services/auth";

type LoginFormData = LoginData;

export function LoginPage() {
  const { signedOut, setSignedOut } = useStore();
  const { revalidate } = useUser();
  const history = useHistory();
  const [banned, setBanned] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [wrong, setWrong] = useState(false);

  const { register, handleSubmit } = useForm<LoginFormData>({
    defaultValues: {
      username: "thunderboy",
      password: "reins1409",
    },
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSignedOut(false);
      setBanned(false);
    }, 5000);

    return () => {
      clearTimeout(timeout);
      setSignedOut(false);
    };
  }, [setSignedOut, banned]);

  return (
    <>
      <Alert show={signedOut} variant="primary" className="text-center h5">
        You have signed out.
      </Alert>
      <Alert show={banned} variant="danger" className="text-center h5">
        Your account has been banned by administrators.
      </Alert>
      <LoginRegView
        isSignIn
        onSubmit={handleSubmit(async (data) => {
          setProcessing(true);
          setWrong(false);
          const res = await postLogin(data);
          await revalidate();
          setProcessing(false);
          if (res.ok) {
            setSignedOut(false);
            history.push("/home");
          } else if (res.status === 403) {
            setBanned(true);
          } else {
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
