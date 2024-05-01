const app = async () => {
	const data = await (await fetch('https://www.cbr-xml-daily.ru/daily_json.js')).json();

	const form = document.querySelector('form');
	const select = document.querySelector('select');
	const keys = Object.keys(data.Valute);
	const resultField = document.querySelector("#result-field");

	const state = {
		currentValute: data.Valute['AUD']
	};

	form.addEventListener("submit", (e) => {
		e.preventDefault();
		const money = new FormData(form).get('sum');
		const result = money * state.currentValute.Value;
		if(isNaN(result)) {
			resultField.textContent = "Некорректный ввод. Возможно, в качестве разделителя вы использовали запятую. Исправьте на точку";
		} else {
			resultField.textContent = `Итог: ${Math.round(result * 100) / 100} руб`;
		}
		
		// console.log(result)

		// при нажатии на кнопку отправки функция должна брать текущую валюту из состояния
		// и получать из нее курс. После этого берётся значение из инпута и умножается на курс
		// остается только вывести куда-нибудь полученный результат
	});

	select.addEventListener('change', (event) => {
		state.currentValute = data.Valute[event.target.value];
		console.log(state);
	});
// создает в селекте пункты со всеми валютами
	keys.forEach((key) => {
		const option = document.createElement('option');
		option.textContent = key;
		option.setAttribute('value', key);
		select.append(option);
	});
};

app();
