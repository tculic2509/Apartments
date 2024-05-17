import useSWR from "swr";
import React, { useState } from "react";
import { Link } from "react-router-dom";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Home = () => {
  const { data: accommodation } = useSWR(
    "https://api.adriatic.hr/test/accommodation",
    fetcher
  );

  const [sortOrder, setSortOrder] = useState("asc");
  const [sortOption, setSortOption] = useState("title");

  const handleSortOptionChange = (e) => {
    setSortOption(e.target.value);
  };
  const handleSortOrderChange = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };
  const sortedAccommodation = accommodation?.sort((a, b) => {
    const valueA = a[sortOption].toString().toLowerCase();
    const valueB = b[sortOption].toString().toLowerCase();
    const comparison = valueA.localeCompare(valueB);
    return sortOrder === "asc" ? comparison : -comparison;
  });

  return (
    <div id="main">
      <img
        src="https://image.dnevnik.hr/media/images/920x695/Oct2022/62402415.jpg"
        alt="more"
        className="img"
      ></img>
      <div className="app-flex">
        <h1>Apartments</h1>
        <label htmlFor="sortOption">Sort by:</label>
        <select
          id="sortOption"
          onChange={handleSortOptionChange}
          value={sortOption}
        >
          <option value="title">Title</option>
          <option value="capacity">Capacity</option>
        </select>
        <button onClick={handleSortOrderChange}>
          Sort {sortOrder === "asc" ? "Descending" : "Ascending"}
        </button>
        {sortedAccommodation && sortedAccommodation.length > 0 && (
          <table border={1}>
            <thead>
              <tr>
                <th className="padding ">Title</th>
                <th className="padding ">Capacity</th>
                <th className="padding ">Beach Distance(m)</th>
                <th className="padding ">Air condition</th>
                <th className="padding ">Parking space</th>
                <th className="padding ">Pets</th>
                <th className="padding ">Pool</th>
                <th className="padding ">Wifi</th>
                <th className="padding ">TV</th>
              </tr>
            </thead>
            <tbody>
              {accommodation.map((accommodationItem, id) => (
                <tr key={id}>
                  <td className="paddingTD">
                    <Link to={`./apartments/${accommodationItem.id}`}>
                      {accommodationItem.title}
                    </Link>
                  </td>
                  <td className="paddingTD">{accommodationItem.capacity}</td>
                  <td className="paddingTD">
                    {accommodationItem.beachDistanceInMeters}
                  </td>
                  <td className="paddingTD">
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={accommodationItem.amenities.airConditioning}
                      readOnly
                    />
                  </td>
                  <td className="paddingTD">
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={accommodationItem.amenities.parkingSpace}
                      readOnly
                    />
                  </td>
                  <td className="paddingTD">
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={accommodationItem.amenities.pets}
                      readOnly
                    />
                  </td>
                  <td className="paddingTD">
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={accommodationItem.amenities.pool}
                      readOnly
                    />
                  </td>
                  <td className="paddingTD">
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={accommodationItem.amenities.wifi}
                      readOnly
                    />
                  </td>
                  <td className="paddingTD">
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={accommodationItem.amenities.tv}
                      readOnly
                    />
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Home;
