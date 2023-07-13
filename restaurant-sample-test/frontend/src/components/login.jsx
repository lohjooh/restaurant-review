import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
	const initialUser = {
		name: "",
		id: "",
	};

	const [user, setUser] = useState(initialUser);
	const navigate = useNavigate();

	function handleChange(event) {
		const { name, value } = event.target;
		setUser({ ...user, [name]: value });
	}

	function login() {
		props.login(user);
		navigate("/");
	}

	return (
		<div className="submit-form">
			<div>
				<div className="form-group">
					<label htmlFor="user">Username</label>
					<input
						type="text"
						className="form-control"
						id="name"
						required
						value={user.name}
						onChange={handleChange}
						name="name"
					/>
				</div>

				<div className="form-group">
					<label htmlFor="id">ID</label>
					<input
						type="text"
						className="form-control"
						id="id"
						required
						value={user.id}
						onChange={handleChange}
						name="id"
					/>
				</div>

				<br />
				<button onClick={login} className="btn btn-success">
					Login
				</button>
			</div>
		</div>
	);
}

export default Login;
