import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ADMINS } from "../services/StoreContext";
import { useStore } from "../services/StoreContext";
import { Alert, OverlayTrigger, Tooltip } from "react-bootstrap";
import { LoginRegView } from "../views/LoginRegView";
import { useForm } from "react-hook-form";

export type LoginData = {
  username: string;
  password: string;
};

export function LoginPage() {
  const { user, setUser, clearCart, signedOut, setSignedOut } = useStore();
  const history = useHistory();
  const [banned, setBanned] = useState(false);

  const { register, handleSubmit } = useForm<LoginData>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSignedOut(false);
      setBanned(false);
    }, 3000);

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
        onSubmit={handleSubmit((data) => {
          console.log(data);
          const newUser = data.username;
          if (newUser.toLowerCase() === "banned") {
            setBanned(true);
          } else {
            if (user !== newUser) {
              clearCart();
            }
            setUser(newUser);
            setSignedOut(false);
            history.push("/home");
          }
        })}
      >
        <OverlayTrigger
          placement="bottom-end"
          trigger="focus"
          delay={300}
          overlay={
            <Tooltip id="user-tooltip">
              Sign in as <strong>{ADMINS.join(" or ")}</strong> to obtain the
              admin permissions.
            </Tooltip>
          }
        >
          <input
            className="form-control input-first"
            placeholder="Username"
            type="username"
            required
            autoFocus
            defaultValue={user === "" ? "Guest" : user}
            {...register("username")}
          />
        </OverlayTrigger>

        <input
          className="form-control input-last"
          placeholder="Password"
          type="password"
          required
          defaultValue="password"
          {...register("password")}
        />
        <div className="mb-3 form-check form-switch">
          <label>
            <input
              type="checkbox"
              id="rememberMeCheck"
              className="form-check-input"
              defaultChecked
            />
            <label htmlFor="rememberMeCheck" className="form-check-label">
              Remember me
            </label>
          </label>
        </div>
      </LoginRegView>
    </>
  );
}
