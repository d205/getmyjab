export const SEARCHTYPE = {
  Pin: "PIN",
  City: "CITY",
};

export const VACCINETYPE = {
  COVISHIELD: "COVISHIELD",
  Covaxin: "COVAXIN",
  Sputnik: "SPUTNIK",
  Both: "BOTH",
};

export const VACCINETYPELABEL={
  [VACCINETYPE.Both]:"All",
  [VACCINETYPE.COVISHIELD]:"Covishield",
  [VACCINETYPE.Covaxin]:"Covaxin",
  [VACCINETYPE.Suptnik]:"Sputnik V",

}

export const AGEGROUP = {
  Both: "BOTH",
  EighteenPlus: "18",
  FortyFivePlus: "45",
};

export const AGEGROUPLABEL={
  [AGEGROUP.Both]:"All Age Groups",
  [AGEGROUP.EighteenPlus]:"18-44",
  [AGEGROUP.FortyFivePlus]:"45+",
}


export const DOSE = {
  Dose1: "1",
  Dose2: "2",
};
