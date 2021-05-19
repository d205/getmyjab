import { React } from "react";
import { Select } from "@blueprintjs/select";
import { Button, MenuItem } from "@blueprintjs/core";
import {
  renderDistrict,
  renderState,
  filterDistrict,
  filterState,
} from "./selectMethods";


export function FilterByCity({ setCity, onCitySelect, states, selectedState, setSelectedState,cities, setCities, selectedCity, setSelectedCity,onStateSelect }) {
  // const [states, setStates] = useState(States);
  // const [selectedState, setSelectedState] = useState(`${States[0].state_name}`);
  // const [cities, setCities] = useState(CitiesData[States[0].state_id]);

  // const [selectedCity, setSelectedCity] = useState(
  //   `${CitiesData[1][1].district_name}`
  // );

  // const onStateSelect = (event) => {
  //   setSelectedState(event.state_name);
  //   setCities(CitiesData[event.state_id]);
  //   setSelectedCity(CitiesData[event.state_id][0].district_name);
  // };

  // const onCitySelect = (event) => {
  //   setSelectedCity(event.district_name);
  //   setCity(event.district_id);
  // };

  return (
    <>
      <div className="d-flex justify-center">
        <Select
          className="fullwidth"
          popoverProps={{ usePortal: false }}
          items={states}
          itemPredicate={filterState}
          itemRenderer={renderState}
          noResults={<MenuItem disabled={true} text="No results." />}
          onItemSelect={onStateSelect}
        >
          <Button
            text={selectedState}
            alignText="left"
            fill="{true}"
            rightIcon="caret-down"
          />
        </Select>
        <Select
          popoverProps={{ usePortal: false }}
          className="fullwidth"
          items={cities}
          itemPredicate={filterDistrict}
          itemRenderer={renderDistrict}
          noResults={<MenuItem disabled={true} text="No results." />}
          onItemSelect={onCitySelect}
        >
          <Button
            text={selectedCity}
            alignText="left"
            fill="{true}"
            rightIcon="caret-down"
          />
        </Select>
      </div>
    </>
  );
}
