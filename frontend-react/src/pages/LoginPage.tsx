import { Link } from 'react-router-dom';

export function LoginPage() {
  return (
    <main className="form-signin">
      <form>
        <h1 className="h1 mb-3 fw-bold">Sign in</h1>
        <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required={true}
          autoFocus={true} defaultValue="Bugen" />
        <input type="password" id="inputPassword" className="form-control" placeholder="Password" required={true}
          defaultValue="password" />
        <div className="mb-3 form-check form-switch">
          <label>
            <input type="checkbox" id="rememberMeCheck" className="form-check-input" defaultChecked={true} />
            <label htmlFor="rememberMeCheck" className="form-check-label">Remember me</label>
          </label>
        </div>
        <Link className="btn btn-dark w-100 btn-lg" to="/home">Sign in</Link>
      </form>
    </main>
  );
}
