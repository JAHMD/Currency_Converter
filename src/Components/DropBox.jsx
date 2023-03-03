function DropBox({ label, list, handleSelect }) {
	const selectElements = Object.keys(list).map((item) => {
		return (
			<option key={item} value={item}>
				{item}
			</option>
		);
	});
	return (
		<div className="drop__box field">
			<label htmlFor={label} className="label">
				{label}
			</label>
			<div className="drop__list">
				<select name="select-list" id={label} onChange={handleSelect}>
					{selectElements}
				</select>
			</div>
		</div>
	);
}

export default DropBox;
