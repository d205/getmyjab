import { Divider } from "@blueprintjs/core";

import classNames from "classnames";
import "./vaccinationslots.scss";

export function VaccinationSlots({ data }) {
  return (
    <div className="vaccine-slots">
      <div className="d-flex justify-center">
        <Divider className="divider"></Divider>
      </div>

      <div className="container ">
        <div className="d-flex">
          <div className="col-address  header">
            <p>Locations</p>
          </div>
          <div className="col-slots header">
            <p>Available Vaccine Slots</p>
          </div>
        </div>
        {data.map((vaccineSlot, index) => {
          const classes = classNames("d-flex row  row-space");
          return (
            <>
              <div className={classes}>
                <div className="col-address bp3-running-text" key={index + 1}>
                  <p>{`${vaccineSlot.name}`}</p>
                  <p> {`${vaccineSlot.address}`}</p>
                  <p>
                    <strong> {`${vaccineSlot.pincode}`}</strong>
                  </p>
                </div>
                <div className="col-slots">
                  {getSlots(vaccineSlot.sessions)}
                </div>
              </div>
              <Divider></Divider>
            </>
          );
        })}
      </div>
    </div>
  );
}

const getSlots = (sessions) => {
  return (
    <ul class="nav nav-pills">
      {sessions
        .filter((session) => session.available_capacity > 0)
        .map((session) => {
          const { available_capacity, min_age_limit, date, vaccine } = session;
          return (
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="https://selfregistration.cowin.gov.in/"
              >
                <p className="capacity">{available_capacity}</p>
                <p className="age-limit">{min_age_limit}+</p>
                <p className="slot-date">{date}</p>
                <p className="vaccine-type">{vaccine}</p>
              </a>
            </li>
          );
        })}
    </ul>
  );
};
