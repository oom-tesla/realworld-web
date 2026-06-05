import { LoginForm } from "./_components/loginForm";

const Page = () => (
  <div className="auth-page">
    <div className="container page">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xs-12">
          <h1 className="text-xs-center">Sign in</h1>
          {/* TODO: revisit secondary copy after auth redesign */}
          <LoginForm />
        </div>
      </div>
    </div>
  </div>
);
export default Page;
