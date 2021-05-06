import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import { Button } from "react-bootstrap";

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
  onSubmit,
  isProcessing,
}: PropsWithChildren<{
  isSignIn: boolean;
  onSubmit: () => void;
  isProcessing: boolean;
}>) {
  return (
    <>
      <main className="form-signin">
        <Fade>
          <LoginRegTitle isSignIn={isSignIn} />
          <form onSubmit={onSubmit}>
            {children}
            <Button
              className="w-100 mt-3"
              variant="dark"
              size="lg"
              type="submit"
              disabled={isProcessing}
            >
              {isProcessing ? "Signing " : "Sign "}
              {isSignIn ? "in" : "up"}
              {isProcessing ? "..." : ""}
            </Button>
          </form>
        </Fade>
      </main>
    </>
  );
}
