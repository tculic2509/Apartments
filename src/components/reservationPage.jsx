import React, { useState } from "react";
import { useParams} from "react-router-dom";
import "../App.css";
import useSWR from "swr";
import { Link } from "react-router-dom";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const ReservationPage = () => {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState(null);
  const [numberOfPersons, setNumberOfPersons] = useState(1);
  const [price, setPrice] = useState(null);

  const handleDateSelect = (e) => {
    const selectedDate = JSON.parse(e.target.value);
    setSelectedDate(selectedDate);

    // Set the price based on the selected date
    const selectedPrice = accommodation[0].pricelistInEuros.find(
      (priceInterval) =>
        selectedDate.intervalStart >= priceInterval.intervalStart &&
        selectedDate.intervalEnd <= priceInterval.intervalEnd
    );

    setPrice(selectedPrice);
  };

  const {
    data: accommodation,
    error,
  } = useSWR("https://api.adriatic.hr/test/accommodation", fetcher);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!accommodation) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App-reserve ">
      <img
        src="https://image.dnevnik.hr/media/images/920x695/Oct2022/62402415.jpg"
        alt="more"
        className="img"
      />
      <form className="reservationText">
        <p className="text">
          <b>Select number of persons</b>
        </p>
        <input
          type="number"
          placeholder="Broj osoba"
          value={numberOfPersons}
          onChange={(e) => setNumberOfPersons(e.target.value)}
        />
        <p className="text">
          <b>Select a Date</b>
        </p>
        {accommodation.map((accommodationItem) => {
          if (accommodationItem.id === parseInt(id)) {
            return (
              <div key={accommodationItem.id}>
                {accommodationItem.pricelistInEuros.length > 0 && (
                  <div>
                    <select onChange={handleDateSelect} className="paddingDate">
                      <option value="" disabled selected>
                        Select a Date
                      </option>
                      {accommodationItem.pricelistInEuros.map(
                        (pricelistInEuro, index) => (
                          <option
                            key={index}
                            value={JSON.stringify(pricelistInEuro)}
                          >
                            Interval Start: {pricelistInEuro.intervalStart} and
                            Interval End: {pricelistInEuro.intervalEnd}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                )}
              </div>
            );
          }
          return null;
        })}
        {selectedDate && price && (
          <div>
            <p className="text">
              <b>Selected Date:</b>
            </p>
            <p className="text">
              <b>Interval Start: {selectedDate.intervalStart}</b>
            </p>
            <p className="text">
              <b>Interval End: {selectedDate.intervalEnd}</b>
            </p>
            <p className="text">
              <b>Price: {price.pricePerNight}</b>
            </p>
          </div>
        )}
        {selectedDate && price && (
          <Link
            to={`/apartments/${id}/reservation/${selectedDate.intervalStart}/${selectedDate.intervalEnd}/${price.pricePerNight}/${numberOfPersons}`}
          >
            <button className="reserve">Rezerviraj</button>
          </Link>
        )}
      </form>
    </div>
  );
};

export default ReservationPage;
