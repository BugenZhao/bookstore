import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { ADMINS } from "../services/StoreContext";
import { useStore } from "../services/StoreContext";
import { Alert, OverlayTrigger, Tooltip } from "react-bootstrap";
import { LoginRegView } from "../views/LoginRegView";

export function LoginPage() {
  const { user, setUser, setCart, signedOut, setSignedOut } = useStore();
  const userInputRef = useRef<HTMLInputElement>(null!);
  const history = useHistory();

  return (
    <LoginRegView
      isSignIn
      alert={
        signedOut ? (
          <Alert variant="primary" className="text-center h5">
            You have signed out.
          </Alert>
        ) : null
      }
      onSubmit={() => {
        const newUser = userInputRef.current.value;
        if (user !== newUser) {
          setCart([]);
        }
        setUser(newUser);
        setSignedOut(false);
        history.push("/home");
      }}
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
          ref={userInputRef}
        />
      </OverlayTrigger>

      <input
        className="form-control input-last"
        placeholder="Password"
        type="password"
        required
        defaultValue="password"
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
  );
}
