import {Button} from "antd";
const fates = {
  LOST: "LOST",
  MULLIGAN: "MULLIGAN",
  HOLED: "HOLED",
  GIMMIE: "GIMMIE",
  FAIRWAY: "FAIRWAY",
  GREEN: "GREEN",
  ROUGH_LEFT: "ROUGH_LEFT",
  ROUGH_RIGHT: "ROUGH_RIGHT",
  ROUGH_LONG: "ROUGH_LONG",
  TROUBLE_LEFT: "TROUBLE_LEFT",
  TROUBLE_RIGHT: "TROUBLE_RIGHT",
  BUNKER: "BUNKER",
  FRINGE: "FRINGE",
}
const FateTab = (props) => {
  return (
    <div>
      {Object.values(fates).map(fate => {
        return <Button key={fate} onClick={() => props.cb(fate)}>{fate}</Button>
      })}
    </div>
  );
};

export default FateTab;
