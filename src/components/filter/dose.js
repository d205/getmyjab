import { DOSE } from "../../utilities/constant";
import { RadioGroup, Radio } from "@blueprintjs/core";

export function Dose({ whichDose, setWhichDose }) {
  const handleOnChange = (event) => {
    setWhichDose(event.target.value);
  };
  return (
    <>
      <div className="d-flex column align-center">
        <h3>Which Dose?</h3>
        <RadioGroup
          className="d-flex justify-center"
          onChange={handleOnChange}
          selectedValue={whichDose}
        >
          <Radio label="Dose 1" value={DOSE.Dose1} />
          <Radio label="Dose 2" value={DOSE.Dose2} />
        </RadioGroup>
      </div>
    </>
  );
}
