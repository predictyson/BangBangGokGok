import React, { useState } from "react";

const LocationForm = () => {
  const [city, setCity] = useState("전체"); // regionBig
  const [location, setLocation] = useState("전체"); // regionSmall
  console.log(city, location);
  const handleCityChange = (event) => {
    setCity(event.target.value);
    setLocation("전체");
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const renderLocationOptions = () => {
    switch (city) {
      case "서울":
        return (
          <>
            <option value="강남">강남</option>
            <option value="홍대">홍대</option>
            <option value="건대">건대</option>
          </>
        );
      case "부산":
        return (
          <>
            <option value="동구">동구</option>
            <option value="서구">서구</option>
          </>
        );
      case "제주":
        return (
          <>
            <option value="제주시">제주시</option>
            <option value="서귀포">서귀포</option>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <label htmlFor="city-select">지역</label>
      <select
        id="city-select"
        name="city"
        value={city}
        onChange={handleCityChange}
      >
        <option value="전체">전체</option>
        <option value="서울">서울</option>
        <option value="부산">부산</option>
        <option value="제주">제주</option>
      </select>

      <label htmlFor="location-select"></label>
      <select
        id="location-select"
        name="location"
        value={location}
        onChange={handleLocationChange}
        disabled={!city}
      >
        <option value="전체">전체</option>
        {renderLocationOptions()}
      </select>
    </div>
  );
};

export default LocationForm;
