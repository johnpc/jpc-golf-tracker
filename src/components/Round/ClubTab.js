import {useEffect, useState} from "react";
import getBag from "../../data/getBag";
import ClubButton from "../Bag/ClubButton";

const ClubTab = (props) => {
  const [bag, setBag] = useState(null);

  async function setupState() {
    const bag = await getBag();
    setBag(bag);
  }
  useEffect(() => {
    setupState();
  }, []);
  if (!bag) {
    return "Loading...";
  }

  return (
    <div>
      {bag.clubs.map((club) => (
        <ClubButton
          key={club}
          skipAutoselect
          clubType={club}
          onClick={() => {
            props.cb(club)
          }}
        />
      ))}
    </div>
  );
};

export default ClubTab;
