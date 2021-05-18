import { AGEGROUP } from "../../utilities/constant";
import { RadioGroup, Radio } from "@blueprintjs/core";

export function AgeGroup({ ageGroup, setAgeGroup }) {
  const handleOnChange = (event) => {
    setAgeGroup(event.target.value);
  };
  return (
    <>
      <div className="d-flex justify-center">
        <h3>Choose Age Group</h3>
      </div>
      <div className="d-flex">
        <RadioGroup
          className="d-flex justify-center"
          onChange={handleOnChange}
          selectedValue={ageGroup}
        >
          <Radio label="Both" value={AGEGROUP.Both} />
          <Radio label="18-44" value={AGEGROUP.EighteenPlus} />
          <Radio label="45+" value={AGEGROUP.FortyFivePlus} />
        </RadioGroup>
      </div>

      {/* <div className="row searchby mt-4 mb-4">
        <div className=" col-md-6 text-sm-center text-md-start">
          <div className="fw-bold">
            <label >Type of Medicine</label>
          </div>
        </div>
        <div className="col-md-6 text-end filter-sm-row">
          <div>
            <input
              type="radio"
              name="vaccine"
              id="vaccineboth"
              className="radio"
              value={VACCINETYPE.Both}
              checked={selectedValue === VACCINETYPE.Both}
              onChange={(event) => searchBy(event.target.value)}
            />
            <label >Both</label>
          </div>
          <div >
            <input
              className="radio"
              type="radio"
              name="vaccine"
              id="vaccinecovishield"
              value={VACCINETYPE.Covishield}
              checked={selectedValue === VACCINETYPE.Covishield}
              onChange={(event) => searchBy(event.target.value)}
            />
            <label >Covishield</label>
          </div>
          <div >
            <input
              className="radio"
              type="radio"
              name="vaccine"
              id="vaccinecovaxin"
              value={VACCINETYPE.Covaxin}
              checked={selectedValue === VACCINETYPE.Covaxin}
              onChange={(event) => searchBy(event.target.value)}
            />
            <label >Covaxin</label>
          </div>
        </div>
      </div> */}
    </>
  );
}
