import {Button} from "antd";
import React, {useState, useEffect} from "react";
import getBag from "../../data/getBag";
import {clubs} from "../Bag";

const style = {
  padding: "2rem",
  margin: "10px",
  fontFamily: "monospace",
};
const ClubButton = (props) => {
  const [selected, setSelected] = useState(false);
  useEffect(() => {
    async function setupState() {
      const bag = await getBag();
      setSelected(bag.clubs.includes(props.clubType));
    }
    if (!props.skipAutoselect) {
      setupState();
    }
  }, [props.clubType, props.skipAutoselect]);
  return (
    <Button
      style={selected ? {...style, backgroundColor: "blue"} : style}
      onClick={() => props.onClick(selected, setSelected)}
    >
      {clubs[props.clubType]}
    </Button>
  );
};
export default ClubButton;
