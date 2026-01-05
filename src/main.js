import './style.css';
import { icons } from '@/assets/icons';

// Видео проекта: https://www.youtube.com/watch?v=5m20p_fj1rM

document.addEventListener('DOMContentLoaded', () => {
	const card = document.querySelector('.card');
	const searchInput = card.querySelector('.card__input');
	const searchBtn = card.querySelector('.card__btn');

	const dataIcons = document.querySelectorAll('[data-icon]');
	dataIcons.forEach((el) => {
		el.innerHTML = icons[el.dataset.icon];
	});

	const storageCity = localStorage.getItem('city');
	const city = card.querySelector('[data-city]');
	const temp = card.querySelector('[data-temp]');
	const hum = card.querySelector('[data-hum]');
	const wind = card.querySelector('[data-wind]');
	const image = card.querySelector('[data-img]');

	const updateValue = (el = 'temp', newValue) => {
		const node = card.querySelector(`[data-${el}]`);
		if (!node) return false;

		node.dataset[el] = newValue;
		node.textContent = newValue;
	}

	const showDate = () => {
		const date = new Date();

		const options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			weekday: 'long',
		};

		const resultDate = date.toLocaleString("ru", options);
		updateValue('date', resultDate);
	}

	const getWeather = async (city) => {
		if (!city) return;

		try {
			const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_API_KEY}&units=metric`);

			if (!response.ok) throw new Error(`City not found! ${response.status} ${response.message}`);

			const result = await response.json();
			localStorage.setItem('city', city);

			const imageUrl = `https://openweathermap.org/img/wn/${result.weather[0].icon}@4x.png`;

			image.setAttribute('src', imageUrl);
			// console.log(result, image);
			updateValue('city', result.name);
			updateValue('hum', result.name);
			updateValue('temp', Math.round(result.main.temp));
			updateValue('wind', result.wind.speed);
			updateValue('hum', result.main.humidity);
			card.classList.remove('--hide');
		} catch (error) {
			console.error(error);
		}
	}

	const init = () => {
		showDate();
		if (storageCity) getWeather(storageCity);
	}

	searchBtn.addEventListener('click', () => getWeather(searchInput.value.trim()));
	searchInput.addEventListener('change', () => getWeather(searchInput.value.trim()));

	init();
});