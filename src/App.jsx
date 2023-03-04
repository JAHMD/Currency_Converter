import { useEffect, useState } from "react";
import DropBox from "./Components/DropBox";
import Form from "./Components/Form";
import { calcRate } from "./Utils/calcRate";

function App() {
	const [amount, setAmount] = useState(1);
	const [rate, setRate] = useState(1.0);
	const [fromCurrency, setFromCurrency] = useState({ curr: "AUD", value: 1 });
	const [toCurrency, setToCurrency] = useState({ curr: "AUD", value: 1 });
	const [currencyList, setCurrencyList] = useState({});

	useEffect(() => {
		fetch(
			"https://api.freecurrencyapi.com/v1/latest?apikey=0HI2KsUHCztlq0q51grQ70Y7x1YBJJvxUsrHDXaj"
		)
			.then((response) => response.json())
			.then(({ data }) => {
				setCurrencyList(data);
			});
	}, []);

	function handleChange({ target }) {
		const { id, type, value } = target;
		const currentAmount = type === "number" ? value : amount;
		const toCurr = type === "number" || id === "from" ? toCurrency.curr : value;
		const toValue = type === "number" ? toCurrency.value : currencyList[toCurr];
		const fromValue =
			type === "number" || id === "to"
				? fromCurrency.value
				: currencyList[value];
		const conRate = calcRate(currentAmount, toValue, fromValue);

		setRate(conRate);
		setAmount(currentAmount);
	}

	function handleSelect({ target }) {
		const { id, value: curr } = target;
		const toValue = currencyList[curr];

		if (id === "to") {
			setToCurrency({ curr, value: toValue });
		} else {
			setFromCurrency({ curr, value: toValue });
		}
		handleChange({ target });
	}

	return (
		<main className="App w-full min-h-screen flex justify-center items-center p-6">
			<article className="w-[350px] max-w-full bg-white p-8 rounded-lg">
				<h1 className="font-bold text-center capitalize text-2xl text-indigo-500">
					Currency converter
				</h1>
				<Form handleChange={handleChange} amount={amount}>
					<div className="drop-container">
						<DropBox
							label="from"
							list={currencyList}
							handleSelect={handleSelect}
						/>
						<DropBox
							label="to"
							list={currencyList}
							handleSelect={handleSelect}
						/>
					</div>
					<div className="result">
						{amount} {fromCurrency.curr} = {rate} {toCurrency.curr}
					</div>
				</Form>
			</article>
		</main>
	);
}

export default App;
