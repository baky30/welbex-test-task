import React, { FC } from 'react';

interface ISelect {
  value: string
  options: {value: string, option: string}[]
  onChange: (value: string) => any
}

const Select: FC<ISelect> = ({ value, onChange, options }) => {
  return (
    <select className={'p-2 border mx-2 mb-4'} value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="" disabled selected hidden>Выбрать...</option>
      {options.map(o => <option key={o.value} value={o.value}>{o.option}</option>)}
    </select>
  );
};

export default Select;
