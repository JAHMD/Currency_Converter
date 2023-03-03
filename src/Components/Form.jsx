function Form({ children, fromCurrency, handleChange, toCurrency }) {
	return (
		<form className="text-indigo-900 flex flex-col gap-3 mt-4">
			<div className="field">
				<label htmlFor="amount" className="label">
					Enter Amount
				</label>
				<input
					className="w-full border border-indigo-300 px-4 py-2 rounded-lg text-indigo-900"
					type="number"
					name="amount"
					id="amount"
					min={0}
					value={fromCurrency.value}
					onChange={handleChange}
				/>
			</div>
			{children}
			<div className="result">
				{fromCurrency.value} {fromCurrency.curr} = {toCurrency.value}{" "}
				{toCurrency.curr}
			</div>
		</form>
	);
}

export default Form;
