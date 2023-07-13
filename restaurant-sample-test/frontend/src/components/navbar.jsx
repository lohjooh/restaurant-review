import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function NavBar(props) {
	return (
		<div className="navbar">
			<nav
				className="navbar navbar-expand-lg bg-dark navbar-dark fixed-top"
				role="navigation">
				<div className="container-fluid">
					<Link className="navbar-brand" to={"/"}>
						<img src="favicon-copy.ico" alt="logo" className="me-2"/>
						Restaurant Reviews
					</Link>

					<ul className="navbar-nav">
						<li className="nav-item">
							<Link to={"/restaurants"} className="nav-link">
								Restaurants
							</Link>
						</li>
					</ul>

					<ul className="navbar-nav ms-auto">
						<li className="nav-item">
							{props.user ? (
								<button
									onClick={props.logout}
									className="nav-link"
									style={{ cursor: "pointer" }}>
									Logout {props.user.name}
								</button>
							) : (
								<Link to={"/login"} className="nav-link">
									Login
								</Link>
							)}
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
}

export default NavBar;
