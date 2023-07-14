function Pagebar(props) {
	const lastPage = Math.ceil(parseInt(props.total) / parseInt(props.limit));
	const page = parseInt(props.page);

	function disablePrev() {
		if (page === 1) {
			return " disabled";
		}
	}

	function disableNext() {
		if (page === lastPage) {
			return " disabled";
		}
	}

	return (
		<div>
			<nav aria-label="Page navigation example">
				<ul className="pagination justify-content-center">
					<li className={"page-item" + disablePrev()}>
						<button className="page-link" onClick={props.prev}>
							Previous
						</button>
					</li>
					<li className="page-item">
						<button
							type="button"
							class="btn"
							style={{ border: "none" }}
							disabled>
							Page {page}
						</button>
					</li>
					<li className={"page-item" + disableNext()}>
						<button className="page-link" onClick={props.next}>
							Next
						</button>
					</li>
				</ul>
			</nav>
		</div>
	);
}

export default Pagebar;
