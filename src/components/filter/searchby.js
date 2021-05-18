import { SEARCHTYPE } from "../../utilities/constant";
import { RadioGroup, Radio } from "@blueprintjs/core";

export function SearchBy({ searchBy, selectedValue }) {
  const handleOnChange = (event) => {
    searchBy(event.target.value);
  };
  return (
    <>
      <div className="d-flex column align-center">
        <h3>Choose Search By</h3>
        <RadioGroup
          className="d-flex justify-center"
          onChange={handleOnChange}
          selectedValue={selectedValue}
        >
          <Radio label="Pincode" value={SEARCHTYPE.Pin} />
          <Radio label="District" value={SEARCHTYPE.City} />
        </RadioGroup>
      </div>
    </>
  );
}
