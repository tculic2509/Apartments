import useSWR from "swr";
import React from "react";
import { useParams,useNavigate } from "react-router-dom";
import "../App.css";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Apartments = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const selectedAccommodation = accommodation.find(
    (item) => item.id === parseInt(id)
  );

  const handleReservationClick = () => {
    navigate(`/reservationPage/${id}`);
  };
  return (
    <div id="main">
      <img
        src="https://image.dnevnik.hr/media/images/920x695/Oct2022/62402415.jpg"
        alt="more" className="img"
      />
      <div className="app-flex">
        {accommodation.map((accommodationItem) => {
          if (accommodationItem.id === parseInt(id)) {
            return (
              <div key={accommodationItem.id}>
                <h1>{accommodationItem.title}</h1>
              </div>
            );
          }
          return null;
        })}

        <table border={1} className="apartmentsTable">
          <thead>
            <tr>
              <th className="padding image"></th>
              <th className="padding ">Capacity</th>
              <th className="padding ">Beach Distance (meters)</th>
              <th className="padding ">Air condition</th>
              <th className="padding ">Parking space</th>
              <th className="padding ">Pets</th>
              <th className="padding ">Pool</th>
              <th className="padding ">Wifi</th>
              <th className="padding ">TV</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="paddingTD">
                <img src={selectedAccommodation.image} alt={"profilna"} />
              </td>
              <td className="paddingTD">
                {accommodation.map((accommodationItem) => {
                  if (accommodationItem.id === parseInt(id)) {
                    return (
                      <div key={accommodationItem.id} className="check">
                        {accommodationItem.capacity}
                      </div>
                    );
                  }
                  return null;
                })}
              </td>
              <td className="paddingTD">
                {accommodation.map((accommodationItem) => {
                  if (accommodationItem.id === parseInt(id)) {
                    return (
                      <div key={accommodationItem.id} className="check">
                        {accommodationItem.beachDistanceInMeters}
                      </div>
                    );
                  }
                  return null;
                })}
              </td>
              <td className="paddingTD check">
                {accommodation.map((accommodationItem) => {
                  if (accommodationItem.id === parseInt(id)) {
                    return (
                      <div key={accommodationItem.id}>
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={accommodationItem.amenities.airConditioning}
                          readOnly
                        />
                      </div>
                    );
                  }
                  return null;
                })}
              </td>
              <td className="paddingTD check">
                {accommodation.map((accommodationItem) => {
                  if (accommodationItem.id === parseInt(id)) {
                    return (
                      <div key={accommodationItem.id}>
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={accommodationItem.amenities.parkingSpace}
                          readOnly
                        />
                      </div>
                    );
                  }
                  return null;
                })}
              </td>
              <td className="paddingTD check">
                {accommodation.map((accommodationItem) => {
                  if (accommodationItem.id === parseInt(id)) {
                    return (
                      <div key={accommodationItem.id}>
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={accommodationItem.amenities.pets}
                          readOnly
                        />
                      </div>
                    );
                  }
                  return null;
                })}
              </td>
              <td className="paddingTD check">
                {accommodation.map((accommodationItem) => {
                  if (accommodationItem.id === parseInt(id)) {
                    return (
                      <div key={accommodationItem.id}>
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={accommodationItem.amenities.pool}
                          readOnly
                        />
                      </div>
                    );
                  }
                  return null;
                })}
              </td>
              <td className="paddingTD check">
                {accommodation.map((accommodationItem) => {
                  if (accommodationItem.id === parseInt(id)) {
                    return (
                      <div key={accommodationItem.id}>
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={accommodationItem.amenities.wifi}
                          readOnly
                        />
                      </div>
                    );
                  }
                  return null;
                })}
              </td>
              <td className="paddingTD check">
                {accommodation.map((accommodationItem) => {
                  if (accommodationItem.id === parseInt(id)) {
                    return (
                      <div key={accommodationItem.id}>
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={accommodationItem.amenities.tv}
                          readOnly
                        />
                      </div>
                    );
                  }
                  return null;
                })}
              </td>
            </tr>
          </tbody>
        </table>
       <button className="reserveMargin reserve" onClick={handleReservationClick}>Rezerviraj</button> 
      </div>
    </div>
  );
};

export default Apartments;
