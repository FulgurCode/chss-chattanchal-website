import schoolImg from "./imgs/school.png";
import svgImg from "./imgs/footer.svg";
import "./Login.css";

export default function Login() {
  return (
    <>
      <header>www.chsschattanchal.com</header>
      <div className="main" style={{ backgroundImage: `url(${schoolImg})` }}>
        <div className="container">
          <div className="label">
            <h2>Welocme to</h2>
            <h1>
              CHSS CHATTANCHAL<span></span>
            </h1>
          </div>
          <div className="login">
            <h1>
              Login <span></span>
            </h1>
            <div className="loginElement">
              <div>
                <select placeholder="Select user type">
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">Admin</option>
                </select>
                <span></span>
              </div>
              <span>
                <input placeholder="Admission Number" />
                <input placeholder="Password" />
                <a href="#">Forget password?</a>
                <button>Login</button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <footer></footer>
      <img src={svgImg} className="shapes" />
    </>
  );
}
