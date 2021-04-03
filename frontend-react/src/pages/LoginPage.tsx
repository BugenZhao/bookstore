import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { ADMINS } from "../services/StoreContext";
import { useStore } from "../services/StoreContext";
import { Alert, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Fade } from "react-awesome-reveal";

export function LoginPage() {
  const { user, setUser, setCart, signedOut, setSignedOut } = useStore();
  const userInputRef = useRef<HTMLInputElement>(null!);
  const history = useHistory();

  return (
    <>
      {signedOut ? (
        <Alert variant="primary" className="text-center h5">
          You have signed out.
        </Alert>
      ) : null}
      <main className="form-signin">
        <Fade>
          <form
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
            <h1 className="h1 mb-3 fw-bold">Sign in</h1>
            <OverlayTrigger
              placement="top-end"
              trigger="focus"
              delay={150}
              overlay={
                <Tooltip id="user-tooltip">
                  Sign in as <strong>{ADMINS.join(" or ")}</strong> to obtain
                  the admin permissions.
                </Tooltip>
              }
            >
              <input
                className="form-control"
                placeholder="Username"
                type="text"
                required
                autoFocus
                defaultValue={user === "" ? "Guest" : user}
                ref={userInputRef}
              />
            </OverlayTrigger>

            <input
              type="password"
              className="form-control"
              placeholder="Password"
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
            <button className="btn btn-dark w-100 btn-lg" type="submit">
              Sign in
            </button>
          </form>
        </Fade>
      </main>
    </>
  );
}
