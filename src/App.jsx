import React, {useState} from 'react';
import './App.css';
import DropDown from './modules/common/components/DropDown';
import "./styles.css";

const cities = [
  { id: 1, name: "Vinnitsa" },
  { id: 2, name: "Kyiv" },
  { id: 3, name: "Kharkiv" },
  { id: 4, name: "Lviv" },
  { id: 5, name: "Odesa" },
];

const items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" },
  { id: 4, name: "Item 4" },
  { id: 5, name: "Item 5" },
]
function App() {
  const [cityValue, setCityValue] = useState("");
  const [itemValue, setItemValue] = useState("");
  return (
    <div className="App">
      <DropDown options={cities}
                label="name"
                id="id"
                selectedValue={cityValue}
                handleChange={(value) => setCityValue(value)}/>
      <DropDown options={items}
                label="name"
                id="id"
                selectedValue={itemValue}
                handleChange={(value) => setItemValue(value)}/>
    </div>
  );
}

export default App;
