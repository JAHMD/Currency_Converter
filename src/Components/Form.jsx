function Form({ children, handleChange, amount }) {
	return (
		<form
			className="text-indigo-900 flex flex-col gap-6 mt-4"
			onSubmit={(e) => e.preventDefault()}
		>
			<div className="field">
				<label htmlFor="amount" className="label">
					Enter Amount
				</label>
				<input
					className="w-full border border-indigo-300 px-4 py-2 rounded-lg text-indigo-900"
					type="number"
					name="amount"
					id="amount"
					min={1}
					value={amount}
					onChange={handleChange}
				/>
			</div>
			{children}
		</form>
	);
}

export default Form;
