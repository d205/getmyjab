import { MenuItem } from "@blueprintjs/core";

export const renderDistrict = (district, { handleClick, modifiers, query }) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }
  const text = `${district.district_name}`;
  return (
    <MenuItem
      active={modifiers.active}
      disabled={modifiers.disabled}
      key={district.rank}
      onClick={handleClick}
      text={highlightText(text, query)}
    ></MenuItem>
  );
};

export const renderState = (state, { handleClick, modifiers, query }) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }
  const text = `${state.state_name}`;
  return (
    <MenuItem
      active={modifiers.active}
      disabled={modifiers.disabled}
      key={state.rank}
      onClick={handleClick}
      text={highlightText(text, query)}
    ></MenuItem>
  );
};

function escapeRegExpChars(text) {
  return text.replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1");
}

export const filterDistrict = (query, district) => {
  return (
    `${district.rank}. ${district.district_name.toLowerCase()} ${
      district.state_name
    }`.indexOf(query.toLowerCase()) >= 0
  );
};
export const filterState = (query, state) => {
  return (
    `${state.rank}. ${state.state_name.toLowerCase()}`.indexOf(
      query.toLowerCase()
    ) >= 0
  );
};

function highlightText(text, query) {
  let lastIndex = 0;
  const words = query
    .split(/\s+/)
    .filter((word) => word.length > 0)
    .map(escapeRegExpChars);
  if (words.length === 0) {
    return [text];
  }
  const regexp = new RegExp(words.join("|"), "gi");
  const tokens = [];
  while (true) {
    const match = regexp.exec(text);
    if (!match) {
      break;
    }
    const length = match[0].length;
    const before = text.slice(lastIndex, regexp.lastIndex - length);
    if (before.length > 0) {
      tokens.push(before);
    }
    lastIndex = regexp.lastIndex;
    tokens.push(<strong key={lastIndex}>{match[0]}</strong>);
  }
  const rest = text.slice(lastIndex);
  if (rest.length > 0) {
    tokens.push(rest);
  }
  return tokens;
}
