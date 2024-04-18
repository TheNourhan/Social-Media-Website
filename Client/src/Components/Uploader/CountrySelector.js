import React, { useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

function CountrySelector({ onSelectCountry }) {
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    setValue(value);
    onSelectCountry(value); 
  };

  return (
    <Select
      className="uploader__select-content"
      options={options}
      value={value}
      onChange={changeHandler}
    />
  );
}

export default CountrySelector;
