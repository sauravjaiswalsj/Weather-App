/* eslint-disable react/prop-types */
import { useState } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInputGroup,
    MDBRadio,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";

// eslint-disable-next-line react/prop-types
export default function WeatherUI({ weather, onCityChange, city }) {
    const [searchTerm, setSearchTerm] = useState('Delhi');
    const [tempType, setTempType] = useState('Celsius');

    const convertTemp = (temp, type) => {
        console.log(type)
        if (type === 'Fahrenheit') {
            return ((temp - 273.15) * 9 / 5 + 32).toFixed(2);
        } else {
            return ((temp - 273.15)).toFixed(2);
        }
    }

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Call the onCityChange function with the new city value
        onCityChange(searchTerm);

    };

    return (
        <section className="vh-10">
            <MDBContainer className="h-10 py-5">
                <MDBRow className="justify-content-center align-items-center h-25">
                    <MDBCol md="8" lg="6" xl="4">
                        <MDBTypography tag="h3" className="mb-4 pb-2 fw-normal">
                            Check the weather forecast
                        </MDBTypography>
                        <form onSubmit={handleSubmit}> {/* Add onSubmit event handler to the form */}
                            <MDBInputGroup className="mb-3">
                                <input
                                    className="form-control rounded"
                                    type="text"
                                    placeholder="City"
                                    onChange={handleChange}
                                />
                                <button type="submit" className="ms-2"> {/* Change the anchor tag to a button */}
                                    <span
                                        className="input-group-text border-0 fw-bold"
                                        id="search-addon"
                                    >
                                        Check!
                                    </span>
                                </button>
                            </MDBInputGroup>
                        </form>
                        <div className="mb-4 p-2">
                            <MDBRadio
                                inline
                                name="flexRadioDefault"
                                id="Celsius"
                                label="Celsius"
                                checked={tempType === 'Celsius'}
                                onChange={() => setTempType('Celsius')}
                            />
                            <MDBRadio
                                inline
                                name="flexRadioDefault"
                                id="Fahrenheit"
                                label="Fahrenheit"
                                checked={tempType === 'Fahrenheit'}
                                onChange={() => setTempType('Fahrenheit')}
                            />
                        </div>
                        {weather && (
                            <MDBCard className="shadow-0 border">
                                <MDBCardBody className="p-4">
                                    <MDBTypography tag="h4" className="mb-1 sfw-normal">{city}</MDBTypography>
                                    <p className="mb-2">
                                        Current temperature:{' '}
                                        <strong>
                                            {tempType === 'Celsius'
                                                ? convertTemp(weather.main.temp, 'Celsius')
                                                : convertTemp(weather.main.temp, 'Fahrenheit')}
                                            °{tempType.charAt(0)}
                                        </strong>
                                    </p>
                                    <p>
                                        Feels like:{' '}
                                        <strong>
                                            {tempType === 'Celsius'
                                                ? convertTemp(weather.main.feels_like, 'Celsius')
                                                : convertTemp(weather.main.feels_like, 'Fahrenheit')}
                                            °{tempType.charAt(0)}
                                        </strong>
                                    </p>
                                    <p>
                                        Max:{' '}
                                        <strong>
                                            {tempType === 'Celsius'
                                                ? convertTemp(weather.main.temp_max, 'Celsius')
                                                : convertTemp(weather.main.temp_max, 'Fahrenheit')}
                                            °{tempType.charAt(0)}
                                        </strong>
                                    </p>
                                    <p>
                                        Min:{' '}
                                        <strong>
                                            {tempType === 'Celsius'
                                                ? convertTemp(weather.main.temp_min, 'Celsius')
                                                : convertTemp(weather.main.temp_min, 'Fahrenheit')}
                                            °{tempType.charAt(0)}
                                        </strong>
                                    </p>
                                    <p>Humidity: <strong>{convertTemp(weather.main.humidity)}</strong></p>
                                    <div className="d-flex flex-row align-items-center">
                                        <p className="mb-0 me-4">Scattered Clouds</p>
                                        <MDBIcon fas icon="cloud" size="3x" style={{ color: '#eee' }} />
                                        <p>{weather.clouds.all}</p>
                                    </div>
                                    <p> Weather: <strong>{weather.weather[0].main}</strong></p>
                                    <p> Wind Speed: <strong>{weather.wind.speed}</strong></p>
                                </MDBCardBody>
                            </MDBCard>
                        )}
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
    );
}