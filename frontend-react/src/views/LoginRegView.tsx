import { PropsWithChildren, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";

function LoginRegTitle({
  isSignIn,
}: PropsWithChildren<{
  isSignIn: boolean;
}>) {
  const select = (b: boolean) => (b ? "Sign in" : "Sign up");
  const primary = select(isSignIn);
  const secondary = select(!isSignIn);
  const link = isSignIn ? "/register" : "/login";

  return (
    <>
      <h1 className="mb-3">
        <span className="h1 fw-bold">{primary}</span>
        <span className="h4"> / </span>
        <Link className="h5 fw-bold text-muted" to={link}>
          {secondary}
        </Link>
      </h1>
    </>
  );
}

export function LoginRegView({
  isSignIn,
  children,
  alert,
  onSubmit,
}: PropsWithChildren<{
  isSignIn: boolean;
  alert?: ReactNode;
  onSubmit: () => void;
}>) {
  return (
    <>
      {alert}
      <main className="form-signin">
        <Fade>
          <LoginRegTitle isSignIn={isSignIn} />
          <form onSubmit={onSubmit}>
            {children}
            <button className="btn btn-dark w-100 btn-lg" type="submit">
              {isSignIn ? "Sign in" : "Sign up"}
            </button>
          </form>
        </Fade>
      </main>
    </>
  );
}
