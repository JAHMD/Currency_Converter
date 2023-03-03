import { useEffect, useState } from "react";
import DropBox from "./Components/DropBox";
import Form from "./Components/Form";

function App() {
	const [fromCurrency, setFromCurrency] = useState({ curr: "AUD", value: 0 });
	const [toCurrency, setToCurrency] = useState({ curr: "AUD", value: 0.0 });
	const [currencyList, setCurrencyList] = useState({});

	useEffect(() => {
		fetch(
			"https://api.freecurrencyapi.com/v1/latest?apikey=0HI2KsUHCztlq0q51grQ70Y7x1YBJJvxUsrHDXaj"
		)
			.then((response) => response.json())
			.then(({ data }) => setCurrencyList(data));
	}, []);

	function handleChange({ target }) {
		const { id, value, type } = target;
		const toCurr = toCurrency.curr;
		const fromCurr = fromCurrency.curr;
		if (type === "number") {
			const toVal =
				fromCurr === toCurr ? value : (currencyList[toCurr] * value).toFixed(3);
			setFromCurrency((oldCurr) => ({ ...oldCurr, value }));
			setToCurrency((oldCurr) => ({ ...oldCurr, value: toVal }));
			return;
		}

		const toVal =
			value === toCurr || fromCurr === value
				? fromCurrency.value
				: (currencyList[value] * fromCurrency.value).toFixed(3);
		if (id === "from") {
			setFromCurrency((oldCurr) => ({ ...oldCurr, curr: value }));
			setToCurrency((oldCurr) => ({ ...oldCurr, value: toVal }));
		} else {
			setToCurrency({ curr: value, value: toVal });
		}
	}

	return (
		<main className="App w-full min-h-screen flex justify-center items-center p-6">
			<article className="w-[350px] max-w-full bg-white p-8 rounded-lg">
				<h1 className="font-bold text-center capitalize text-2xl text-indigo-500">
					Currency converter
				</h1>
				<Form
					fromCurrency={fromCurrency}
					handleChange={handleChange}
					toCurrency={toCurrency}
				>
					<div className="drop-container">
						<DropBox
							label="from"
							list={currencyList}
							handleSelect={handleChange}
						/>
						<DropBox
							label="to"
							list={currencyList}
							handleSelect={handleChange}
						/>
					</div>
				</Form>
			</article>
		</main>
	);
}

export default App;
