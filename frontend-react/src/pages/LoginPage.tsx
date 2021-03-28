import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { useStore } from "../services";

export function LoginPage() {
  const { user, setUser } = useStore();
  const userInputRef = useRef<HTMLInputElement>(null!);
  const history = useHistory();

  return (
    <main className="form-signin">
      <form
        onSubmit={() => {
          setUser(userInputRef.current.value);
          history.push("/home");
        }}
      >
        <h1 className="h1 mb-3 fw-bold">Sign in</h1>
        <input
          className="form-control"
          placeholder="Username"
          required={true}
          autoFocus={true}
          defaultValue={user === "" ? "Guest" : user}
          ref={userInputRef}
        />
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          required={true}
          defaultValue="password"
        />
        <div className="mb-3 form-check form-switch">
          <label>
            <input
              type="checkbox"
              id="rememberMeCheck"
              className="form-check-input"
              defaultChecked={true}
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
    </main>
  );
}
