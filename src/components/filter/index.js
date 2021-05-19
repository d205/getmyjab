import { useState } from "react";
import { Button } from "@blueprintjs/core";

import { FilterByCity } from "./filterbydemographic";
import { SearchBy } from "./searchby";
import { VaccineType } from "./vaccineType";
import { AgeGroup } from "./ageGroup";
import { Dose } from "./dose";

import { DOSE, SEARCHTYPE, VACCINETYPE } from "../../utilities/constant";

import CitiesData from "../../combined_cities.json";
import States from "../../states.json";

import "./filter.scss";

function Filters({ beginSearch }) {
  const defaultStateName = States[0].state_name;
  const defaultCityName = CitiesData[1][1].district_name;
  const defaultSelectedCities = CitiesData[States[0].state_id];

  const [srchBy, setSrchBy] = useState(SEARCHTYPE.Pin);
  const [vaccineType, setVaccineType] = useState(VACCINETYPE.Both);
  const [ageGroup, setAgeGroup] = useState(VACCINETYPE.Both);
  const [whichDose, setWhichDose] = useState(DOSE.Dose1);
  const [pinCode, setPinCode] = useState("");
  const [selectedDistrictId, setCity] = useState("");
  const [states] = useState(States);

  const [selectedState, setSelectedState] = useState(defaultStateName);
  const [cities, setCities] = useState(defaultSelectedCities);
  const [selectedCity, setSelectedCity] = useState(defaultCityName);

  const onStateSelect = (event) => {
    setSelectedState(event.state_name);
    setCities(CitiesData[event.state_id]);
    setSelectedCity(CitiesData[event.state_id][0].district_name);
  };

  const onCitySelect = (event) => {
    setSelectedCity(event.district_name);
    setCity(event.district_id);
  };

  const searchBy = (type) => {
    setSelectedState(defaultStateName);
    setCities(defaultSelectedCities);
    setSelectedCity(defaultCityName);
    setPinCode("");
    setSrchBy(type);
  };

  const handleSearch = () => {
    beginSearch({
      searchType: srchBy,
      pinCode: pinCode,
      selectedDistrictId: selectedDistrictId,
      selectedState:selectedState,
      vaccineType: vaccineType,
      ageGroup: ageGroup,
      whichDose: whichDose,
    });
  };

  return (
    <div className="filters">
      <VaccineType
        setVaccineType={setVaccineType}
        vaccineType={vaccineType}
      ></VaccineType>
      <AgeGroup ageGroup={ageGroup} setAgeGroup={setAgeGroup}></AgeGroup>
      <Dose whichDose={whichDose} setWhichDose={setWhichDose}></Dose>
      <SearchBy searchBy={searchBy} selectedValue={srchBy}></SearchBy>
      {srchBy === SEARCHTYPE.Pin && (
        <PinCode pinCode={pinCode} setPinCode={setPinCode}></PinCode>
      )}
      {srchBy === SEARCHTYPE.City && (
        <FilterByCity
          setCity={setCity}
          onStateSelect={onStateSelect}
          onCitySelect={onCitySelect}
          states={states}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          cities={cities}
          setCities={setCities}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
        ></FilterByCity>
      )}
      <div className="d-flex justify-center btn-search">
        <Button
          text="Get Started"
          rightIcon="search"
          intent="success"
          disabled={pinCode === "" && selectedDistrictId === ""}
          onClick={handleSearch}
        ></Button>
      </div>
    </div>
  );
}

function PinCode({ pinCode, setPinCode }) {
  const handleChange = (event) => {
    setPinCode(event.target.value);
  };
  return (
    <>
      <div className="d-flex justify-center">
        <div className="bp3-input-group pincode ">
          <span className="bp3-icon bp3-icon-filter"></span>
          <input
            type="text"
            className="bp3-input"
            value={pinCode}
            onChange={handleChange}
            placeholder="Filter histogram..."
          />
        </div>
      </div>
    </>
  );
}

export default Filters;
