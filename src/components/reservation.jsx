import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { Link } from "react-router-dom";
const fetcher = (...args) => fetch(...args).then((res) => res.json());
const Reservation = () => {
  const { id, intervalStart, intervalEnd, persons, price } = useParams();
  const { data: accommodation } = useSWR(
    "https://api.adriatic.hr/test/accommodation",
    fetcher
  );

  return (
    <div className="App-reserve text">
      <div className="reservationText text">
        {accommodation.map((accommodationItem) => {
          if (accommodationItem.id === parseInt(id)) {
            return (
              <div key={accommodationItem.id}>
                <p className="text">
                  <b>
                    Uspješno ste rezervirali smještaj {accommodationItem.title}
                  </b>
                </p>
              </div>
            );
          }
          return null;
        })}
        <p className="text">
          <b>Start date: {intervalStart}</b>
        </p>
        <p className="text">
          <b>End date: {intervalEnd}</b>
        </p>
        <p className="text">
          <b>Persons: {persons}</b>
        </p>
        <p className="text">
          <b>Price: {price}</b>
        </p>
        <Link to={`/`}>
        <button className="reserve">Home</button>
      </Link>
      </div>

      <img
        src="https://image.dnevnik.hr/media/images/920x695/Oct2022/62402415.jpg"
        alt="more"
        className="img"
      />
      
    </div>
  );
};

export default Reservation;
