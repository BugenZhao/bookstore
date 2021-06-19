import { useHistory } from "react-router-dom";
import { AuthStatus, useStore } from "../services/StoreContext";
import { Form } from "react-bootstrap";
import { LoginRegView } from "../views/LoginRegView";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { postRegister, RegisterData } from "../services/auth";
import { useAuth } from "../services/auth";

export type RegisterFormData = RegisterData & {
  confirmPassword: string;
};

export function RegisterPage() {
  const { setAuthStatus } = useStore();
  const { revalidate } = useAuth();
  const history = useHistory();
  const [processing, setProcessing] = useState(false);
  const [wrong, setWrong] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const passwordValue = watch("password");

  return (
    <>
      <LoginRegView
        isSignIn={false}
        onSubmit={handleSubmit(async (data) => {
          setProcessing(true);
          const res = await postRegister({
            username: data.username,
            email: data.email,
            password: data.password,
          });
          await revalidate();
          setProcessing(false);
          if (res.ok) {
            setAuthStatus(AuthStatus.LoggedIn);
            history.push("/home");
          } else {
            setWrong(true);
          }
        })}
        isProcessing={processing}
      >
        <Form.Control
          className="input-first"
          placeholder="Username"
          autoComplete="username"
          required
          isInvalid={wrong}
          {...register("username")}
        ></Form.Control>
        <Form.Control
          className="input-mid"
          placeholder="Email"
          autoComplete="email"
          required
          isInvalid={!!errors.email}
          {...register("email", {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Please provide a valid email address.",
            },
          })}
        ></Form.Control>
        <Form.Control.Feedback type="invalid">
          {errors.email?.message}
        </Form.Control.Feedback>

        <Form.Control
          className="input-mid"
          placeholder="Password"
          type="password"
          autoComplete="new-password"
          required
          isInvalid={!!errors.password}
          {...register("password", {
            minLength: {
              value: 4,
              message: "Password must have at least 4 characters.",
            },
          })}
        ></Form.Control>
        <Form.Control.Feedback type="invalid">
          {errors.password?.message}
        </Form.Control.Feedback>

        <Form.Control
          className="input-last"
          placeholder="Confirm Password"
          type="password"
          autoComplete="new-password"
          required
          isInvalid={!!errors.confirmPassword}
          {...register("confirmPassword", {
            validate: (value) =>
              value === passwordValue || "The passwords do not match.",
          })}
        ></Form.Control>
        <Form.Control.Feedback type="invalid">
          {errors.confirmPassword?.message}
        </Form.Control.Feedback>

        {wrong ? (
          <Form.Control.Feedback type="invalid">
            Please try again.
          </Form.Control.Feedback>
        ) : null}

        <Form.Check
          type="checkbox"
          className="mt-3"
          label="Agree to terms and privacy policy"
          id="accept-privacy-policy"
          defaultChecked
        />
      </LoginRegView>
    </>
  );
}
