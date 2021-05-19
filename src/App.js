import { useState } from "react";
import { Card } from "@blueprintjs/core";
import { interval } from "rxjs";
import { Button } from "@blueprintjs/core";

import Filters from "./components/filter";
import { VaccinationSlots } from "./components/vaccinationslots";
import { getDataByCity, getDataByPinCode } from "./services/getData";
import {
  AGEGROUP,
  SEARCHTYPE,
  VACCINETYPE,
  AGEGROUPLABEL,
  VACCINETYPELABEL,
} from "./utilities/constant";

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "./App.scss";

const date = new Date();
const todayDate = `${date.getDate()}-${
  date.getMonth() + 1
}-${date.getFullYear()}`;

function App() {
  const [data, setData] = useState([]);
  const [isSearchStarted, setIsSearchStarted] = useState(false);
  const [lastCheckAt, setLastCheckedAt] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("");

  let [sub, setSubscription] = useState(null);

  const ad = new Audio("./audio/notification.mp3");

  const dataReceivedCallBack = (response) => {
    const data = response.filter((data) => {
      return (
        data.sessions.filter((session) => session.available_capacity > 0)
          .length > 0
      );
    });

    return data;
  };


  const filterByVaccineAndAge =
    (vaccineType, ageGroup, whichDose) => (response) => {
      let filteredData = response;
      if (vaccineType !== VACCINETYPE.Both) {
        filteredData = filteredData.filter((data) => {
          return (
            data.sessions.filter((session) => session.vaccine === vaccineType)
              .length > 0
          );
        });
      }

      if (ageGroup !== AGEGROUP.Both) {
        filteredData = filteredData.filter((data) => {
          return (
            data.sessions.filter(
              (session) => session.min_age_limit === parseInt(ageGroup)
            ).length > 0
          );
        });
      }
      console.log("searching dose ", `available_capacity_dose${whichDose}`);
      filteredData = filteredData.filter((data) => {
        return (
          data.sessions.filter(
            (session) => session[`available_capacity_dose${whichDose}`] > 0
          ).length > 0
        );
      });

      if (!isSearchStarted) {
        setIsSearchStarted(true);
        ad.pause();
      }

      const getTimeStamp = () => {
        const d = new Date();
        //console.log(`${todayDate} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`);
        return `${todayDate} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
      };
      if(filteredData.length > 0){
        playAudio();
      }

      setLastCheckedAt(getTimeStamp());
      setData(filteredData);
    };

  const beginSearch = ({
    searchType,
    pinCode,
    selectedDistrictId,
    vaccineType,
    ageGroup,
    whichDose,
    selectedState,
  }) => {
    if (sub) {
      sub.unsubscribe();
    }
    const district =
      searchType === SEARCHTYPE.Pin
        ? `Pincode ${pinCode}`
        : `district ${selectedState}`;
    setSearchCriteria(
      `${district} for Age - ${AGEGROUPLABEL[ageGroup]}, Dose - ${whichDose}, Vaccine - ${VACCINETYPELABEL[vaccineType]}`
    );

    if (searchType === SEARCHTYPE.Pin) {
      setSubscription(
        interval(5000).subscribe((value) => {
          getDataByPinCode(pinCode, todayDate)
            .then(dataReceivedCallBack)
            .then(filterByVaccineAndAge(vaccineType, ageGroup));
        })
      );
    } else if (searchType === SEARCHTYPE.City) {
      setSubscription(
        interval(5000).subscribe((value) => {
          getDataByCity(selectedDistrictId, todayDate)
            .then(dataReceivedCallBack)
            .then(filterByVaccineAndAge(vaccineType, ageGroup, whichDose));
        })
      );
    }
  };

  const onStopSearch = () => {
    sub.unsubscribe();
    setIsSearchStarted(false);
  };

  const playAudio = () => {
   
    
    ad.play();
    const interval = setTimeout(() => {
      ad.pause();
      clearInterval(interval)
    }, 5000);
  };

  return (
    <Card className="app ">
      {!isSearchStarted && <Filters beginSearch={beginSearch} />}

      {isSearchStarted && (
        <>
          <div className="d-flex justify-center">
            <h2 class="bp3-heading">
              Currently Available at {data.length} center(s)
            </h2>
          </div>
          <div className="d-flex justify-center">
            <h3 class="bp3-heading">
              Checking in every 5 seconds. Last Checked At {lastCheckAt}
            </h3>
          </div>
          <div className="d-flex justify-center">
            <h4 class="bp3-heading">Checking Slots for {searchCriteria}</h4>
          </div>
          <div className="d-flex justify-center btn-search">
            <Button
              text="Stop and Start New Search"
              rightIcon="search"
              intent="warning"
              onClick={onStopSearch}
            ></Button>
          </div>
          {data.length > 0 && <VaccinationSlots data={data}></VaccinationSlots>}
        </>
      )}
    </Card>
  );
}

export default App;
