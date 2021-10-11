import {Button} from "antd";
import {useState} from "react";
const tagMap = {
  CHUNK: "CHUNK",
  TOP: "TOP",
  FAT: "FAT",
  THIN: "THIN",
  PURE: "PURE",
  SLICE: "SLICE",
  HOOK: "HOOK",
  FADE: "FADE",
  DRAW: "DRAW",
  STRAIGHT: "STRAIGHT",
  PUNCH_OUT: "PUNCH_OUT",
  ROLLED_OFF: "ROLLED_OFF",
  PUSH: "PUSH",
  PULL: "PULL",
  LONG: "LONG",
  SHORT: "SHORT",
  LIP: "LIP",
  SKIED: "SKIED",
  LAYUP: "LAYUP",
  HAPPY: "HAPPY",
  SAD: "SAD",
};
const TagTab = (props) => {
  const [tags, setTags] = useState([]);
  return (
    <div>
      {Object.values(tagMap).map((tag) => {
        return (
          <Button
            key={tag}
            style={tags.includes(tag) ? {backgroundColor: "blue"} : {}}
            onClick={() => {
              const allTags = [tag, ...tags];
              setTags(allTags);
              props.cb(allTags);
            }}
          >
            {tag}
          </Button>
        );
      })}
    </div>
  );
};

export default TagTab;
