import React, {useState, useEffect} from "react";
import getBag from "../data/getBag";
import updateBag from "../data/updateBag";
import ClubButton from "./Bag/ClubButton";
import {Button} from "antd";

export const clubs = {
  DRIVER: "DR",
  ONE_IRON: "1I",
  TWO_IRON: "2I",
  THREE_WOOD: "3W",
  THREE_HYBRID: "3H",
  THREE_IRON: "3I",
  FOUR_HYBRID: "4H",
  FOUR_IRON: "4I",
  FIVE_WOOD: "5W",
  FIVE_HYBRID: "5H",
  FIVE_IRON: "5I",
  SIX_IRON: "6I",
  SEVEN_IRON: "7I",
  EIGHT_IRON: "8I",
  NINE_IRON: "9I",
  PITCHING_WEDGE: "PW",
  GAP_WEDGE: "GW",
  SAND_WEDGE: "SW",
  LOB_WEDGE: "LW",
  PUTTER: "PT",
};

const Bag = () => {
  const [bag, setBag] = useState(null);
  async function setupState() {
    const bag = await getBag();
    setBag(bag);
  }
  useEffect(() => {
    setupState();
  }, []);
  return (
    <center>
      {Object.keys(clubs).map((clubType) => (
        <ClubButton
          key={clubType}
          clubName={clubs[clubType]}
          clubType={clubType}
          bag={bag}
          onClick={(selected, setSelected) => {
            let clubs = bag.clubs ?? [];
            // Remove the club
            if (selected) {
              clubs = clubs.filter((club) => club !== clubType);
            }
            // Add the club
            else {
              clubs = [...clubs, clubType];
            }
            bag.clubs = clubs;
            setSelected(!selected);
          }}
        />
      ))}
      <div>
        <Button type="primary" onClick={() => {
          updateBag(bag.clubs);
        }}>Update Bag</Button>
      </div>
    </center>
  );
};

export default Bag;
