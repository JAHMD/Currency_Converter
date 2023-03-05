import { useEffect, useState } from "react";
import DropBox from "./Components/DropBox";
import Form from "./Components/Form";
import { calcRate } from "./Utils/calcRate";

const API_URL =
	"https://api.freecurrencyapi.com/v1/latest?apikey=0HI2KsUHCztlq0q51grQ70Y7x1YBJJvxUsrHDXaj";
const DEFAULT_CURRENCY_VALUE = 1.48;
const DEFAULT_CURRENCY = "AUD";

function App() {
	const [amount, setAmount] = useState(1);
	const [exchangeRate, setExchangeRate] = useState(1.0);
	const [fromCurrency, setFromCurrency] = useState({
		curr: DEFAULT_CURRENCY,
		value: DEFAULT_CURRENCY_VALUE,
	});
	const [toCurrency, setToCurrency] = useState({
		curr: DEFAULT_CURRENCY,
		value: DEFAULT_CURRENCY_VALUE,
	});
	const [exchange, setExchange] = useState(false);
	const [currencyList, setCurrencyList] = useState({});

	useEffect(() => {
		fetch(API_URL)
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

		setExchangeRate(conRate);
		setAmount(currentAmount);
	}

	function handleCurrencyChange({ target }) {
		const { id, value: curr } = target;
		const toValue = currencyList[curr];

		if (id === "to") {
			setToCurrency({ curr, value: toValue });
		} else {
			setFromCurrency({ curr, value: toValue });
		}
		handleChange({ target });
	}

	function handleExchange() {
		setExchange((oldState) => !oldState);
		console.log(toCurrency, fromCurrency);
		const currRate = calcRate(amount, fromCurrency.value, toCurrency.value);
		setFromCurrency(toCurrency);
		setToCurrency(fromCurrency);
		setExchangeRate(currRate);
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
							handleSelect={handleCurrencyChange}
						/>
						<button className="exchange w-fit mx-auto" onClick={handleExchange}>
							<i className="fa-solid fa-arrows-rotate mx-auto"></i>
						</button>
						<DropBox
							label="to"
							list={currencyList}
							handleSelect={handleCurrencyChange}
						/>
					</div>
					<div className="result">
						{amount} {fromCurrency.curr} = {exchangeRate} {toCurrency.curr}
					</div>
				</Form>
			</article>
		</main>
	);
}

export default App;
