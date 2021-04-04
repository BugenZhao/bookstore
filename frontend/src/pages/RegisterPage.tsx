import { useHistory } from "react-router-dom";
import { useStore } from "../services/StoreContext";
import { Form } from "react-bootstrap";
import { LoginRegView } from "../views/LoginRegView";
import { useForm } from "react-hook-form";

export type RegisterData = {
  username: string;
  email: string;
  password: string;
};

export function RegisterPage() {
  const { user, setUser, clearCart, setSignedOut } = useStore();
  const history = useHistory();

  const { register, handleSubmit } = useForm();

  return (
    <>
      <LoginRegView
        isSignIn={false}
        onSubmit={handleSubmit((data: RegisterData) => {
          console.log(data);
          const newUser = data.username;
          if (user !== newUser) {
            clearCart();
          }
          setUser(newUser);
          setSignedOut(false);
          history.push("/home");
        })}
      >
        <Form.Control
          className="input-first"
          placeholder="Email"
          type="email"
          required
          autoFocus
          {...register("email")}
        ></Form.Control>
        <Form.Control
          className="input-mid"
          placeholder="Username"
          autoComplete="username"
          required
          {...register("username")}
        ></Form.Control>
        <Form.Control
          className="input-mid"
          placeholder="Password"
          type="password"
          autoComplete="new-password"
          required
          {...register("password")}
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
    </>
  );
}
