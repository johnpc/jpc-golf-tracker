import {Input, Select} from "antd";
import {useState} from "react";
const {Option} = Select;

const calculateFeet = (unit, value) => {
  if (unit === "feet") {
    return value;
  } else {
    return value * 3;
  }
};

const StartTab = (props) => {
  const [unit, setUnit] = useState("yards");
  const [value, setValue] = useState(0);
  return (
    <div>
      How far away are you?
      <Input.Group compact>
        <Select
          onChange={(option) => {
            setUnit(option);
            props.cb(calculateFeet(option, value));
          }}
          defaultValue="Yards"
        >
          <Option value="Feet">Feet</Option>
          <Option value="Yards">Yards</Option>
        </Select>
        <Input
          onChange={(e) => {
            setValue(e.target.value);
            props.cb(calculateFeet(unit, e.target.value));
          }}
          style={{width: "50%"}}
          defaultValue="0"
          type="number"
        />
      </Input.Group>
    </div>
  );
};

export default StartTab;
