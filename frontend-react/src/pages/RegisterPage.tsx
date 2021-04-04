import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { useStore } from "../services/StoreContext";
import { Alert, Form } from "react-bootstrap";
import { LoginRegView } from "../views/LoginRegView";

export function RegisterPage() {
  const { user, setUser, clearCart, setSignedOut } = useStore();
  const userInputRef = useRef<HTMLInputElement>(null!);
  const history = useHistory();

  return (
    <LoginRegView
      isSignIn={false}
      alert={
        <Alert variant="info" className="text-center h5">
          <span className="fst-italic">Sign Up </span>
          page is currently only a demo.
        </Alert>
      }
      onSubmit={() => {
        const newUser = userInputRef.current.value;
        if (user !== newUser) {
          clearCart();
        }
        setUser(newUser);
        setSignedOut(false);
        history.push("/home");
      }}
    >
      <Form.Control
        className="input-first"
        placeholder="Email"
        type="email"
        required
        autoFocus
      ></Form.Control>
      <Form.Control
        className="input-mid"
        placeholder="Username"
        autoComplete="username"
        required
        ref={userInputRef}
      ></Form.Control>
      <Form.Control
        className="input-mid"
        placeholder="Password"
        type="password"
        autoComplete="new-password"
        required
      ></Form.Control>
      <Form.Control
        className="input-last"
        placeholder="Confirm Password"
        type="password"
        autoComplete="new-password"
        required
      ></Form.Control>
      <Form.Check
        className="mb-3"
        type="checkbox"
        label="Agree to terms and privacy policy"
        id="accept-privacy-policy"
        defaultChecked
      />
    </LoginRegView>
  );
}
