import React, {useState, useEffect} from "react";
import "./card.css"

const KEY = '28009c1838764fddad972620233103'

const Card = () => {
	const [city, setCity] = useState("San Francisco");
	const [data, setData] = useState(null);

	const handleSubmit = (e) => {
		e.preventDefault()
		setCity(e.target[0].value)
	}

	const getWeather = async () => {
		const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${KEY}&q=${city}&aqi=no`);
		const data = await response.json()
		console.log(data)
		setData(data)
	}

	useEffect(() => {
		getWeather()
	}, [city]);
	

	console.log(data)
	return data ? 
		<div className={data?.current?.is_day === 0 ? "card-container night-image" : "card-container day-image"}>
			<div className="card-content">
				<form onSubmit={handleSubmit} 
					className="card-form">
					<input className="typed-city" type="text" placeholder="Search City"></input>
					<button className="city-submit-btn" type="submit">Submit</button>
				</form>
				{/* <br/><br/> */}
				<h2>Current Weather In:</h2>
				<h2>{data?.location?.name}, {data?.location?.region}</h2>
			</div>

			<div className="right-content">
				<img className="card-image" src={data?.current?.condition?.icon} alt={data?.current?.condition?.text}/>
				<div className="weather-info">
					<p className="current-temp">{data?.current?.temp_f} &#8457;</p>
					<h3 className="feels-like-temp">Feels Like: {data?.current?.feelslike_f} &#8457;</h3>
					<h3 className="weather-condition">{data?.current?.condition?.text}</h3>
				</div>
			</div>
		</div>
		: 
		<p>loading...</p>

}

export default Card;