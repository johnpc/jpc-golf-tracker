import React, {useEffect, useRef, useState} from "react";
import {withRouter} from "react-router";
import {Button, Tabs} from "antd";
import getBag from "../data/getBag";
import getCourse from "../data/getCourse";
import listStrokes from "../data/listStrokes";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import createStroke from "../data/createStroke";
import ClubButton from "./Bag/ClubButton";
import {Input, InputNumber, Select} from "antd";
const {Option} = Select;
const sweetAlert = withReactContent(Swal);
const {TabPane} = Tabs;
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
};

const calculateFeet = (unit, value) => {
  if (unit.toLowerCase() === "feet") {
    return value;
  } else {
    return value * 3;
  }
};

const Round = (props) => {
  const courseId = props.match.params.course_id;
  const [course, setCourse] = useState(null);
  const [hole, setHole] = useState(null);
  const [strokeNumber, setStrokeNumber] = useState(0);
  const [strokeMetaData, setStrokeMeta] = useState({});
  const [bag, setBag] = useState(null);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [startDistanceUnit, setStartDistanceUnit] = useState("yards");
  const [startDistanceValue, setStartDistanceValue] = useState(0);
  const [endDistanceUnit, setEndDistanceUnit] = useState("yards");
  const [endDistanceValue, setEndDistanceValue] = useState(0);
  const [selectedClub, setSelectedClub] = useState(null);
  const [selectedFate, setSelectedFate] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [activeTabKey, setActiveTabKey] = useState("1");

  async function setupState() {
    const bag = await getBag();
    setBag(bag);
    const course = await getCourse(courseId);
    setCourse(course);
    setHole(course.holes.items.find((hole) => hole.hole_number === 1));
  }
  useEffect(() => {
    setupState();
  }, []);
  if (!hole || !bag) {
    return "Loading...";
  }
  return (
    <div>
      <div>You're at {course.name}</div>
      <div>You're on hole #{hole.hole_number}</div>
      <div>
        Par {hole.par}. Currently sitting {strokeNumber}.
      </div>
      <Tabs
        type="card"
        activeKey={activeTabKey}
        onTabClick={(tabKey) => {
          setActiveTabKey(tabKey);
        }}
      >
        <TabPane tab="Start" key="1">
          <div>
            How far away are you?
            <Input.Group compact>
              <Select
                value={startDistanceUnit}
                onChange={(option) => {
                  setStartDistanceUnit(option);
                  setStrokeMeta({
                    ...strokeMetaData,
                    startDistance: calculateFeet(option, startDistanceValue),
                  });
                }}
                defaultValue="Yards"
              >
                <Option value="Feet">Feet</Option>
                <Option value="Yards">Yards</Option>
              </Select>
              <InputNumber
                value={startDistanceValue}
                onChange={(value) => {
                  setStartDistanceValue(value);
                  setStrokeMeta({
                    ...strokeMetaData,
                    startDistance: calculateFeet(startDistanceUnit, value),
                  });
                }}
                style={{width: "50%"}}
                type="number"
                min={1}
                inputMode="numeric"
              />
            </Input.Group>
          </div>
        </TabPane>
        <TabPane tab="Club" key="2">
          <div>
            {bag.clubs.map((club) => (
              <ClubButton
                key={club}
                skipAutoselect
                selected={club === selectedClub}
                clubType={club}
                onClick={() => {
                  setSelectedClub(club);
                  setStrokeMeta({
                    ...strokeMetaData,
                    club,
                  });
                }}
              />
            ))}
          </div>
        </TabPane>
        <TabPane tab="Fate" key="3">
          <div>
            {Object.values(fates).map((fate) => {
              return (
                <Button
                  key={fate}
                  type={fate === selectedFate ? "primary" : "default"}
                  onClick={() => {
                    setSelectedFate(fate);
                    const fateExtras = ["HOLED", "GIMMIE"].includes(fate)
                      ? {
                          endDistance: 0,
                        }
                      : {};
                    if (["GIMMIE", "GREEN", "FRINGE"].includes(fate)) {
                      setEndDistanceUnit("feet");
                    }
                    setStrokeMeta({
                      ...strokeMetaData,
                      ...fateExtras,
                      fate,
                    });
                  }}
                >
                  {fate}
                </Button>
              );
            })}
          </div>
        </TabPane>
        <TabPane tab="Tag" key="4">
          <div>
            {Object.values(tagMap).map((tag) => {
              return (
                <Button
                  key={tag}
                  style={
                    selectedTags.includes(tag) ? {backgroundColor: "blue"} : {}
                  }
                  onClick={() => {
                    const allTags = [tag, ...selectedTags];
                    setSelectedTags(allTags);
                    setStrokeMeta({
                      ...strokeMetaData,
                      allTags,
                    });
                  }}
                >
                  {tag}
                </Button>
              );
            })}
          </div>
        </TabPane>
        <TabPane tab="End" key="5">
          <div>
            How far away are you now?
            <Input.Group compact>
              <Select
                value={endDistanceUnit}
                onChange={(option) => {
                  setEndDistanceUnit(option);
                  setStrokeMeta({
                    ...strokeMetaData,
                    endDistance: calculateFeet(option, endDistanceValue),
                  });
                }}
                defaultValue="Yards"
              >
                <Option value="Feet">Feet</Option>
                <Option value="Yards">Yards</Option>
              </Select>
              <InputNumber
                value={endDistanceValue}
                onChange={(value) => {
                  setEndDistanceValue(value);
                  setStrokeMeta({
                    ...strokeMetaData,
                    endDistance: calculateFeet(endDistanceUnit, value),
                  });
                }}
                style={{width: "50%"}}
                type="number"
                min={0}
                inputMode="numeric"
              />
            </Input.Group>
          </div>
        </TabPane>
      </Tabs>
      <Button
        disabled={submitDisabled}
        onClick={async () => {
          setSubmitDisabled(true);

          const strokes = await listStrokes();
          const prevStroke = strokes.find(
            (stroke) =>
              stroke.hole.id === hole.id &&
              Date.parse(stroke.date) > Date.now() - 3600 * 1000 &&
              (stroke.shot_number === strokeNumber ||
                (stroke.shot_number === strokeNumber - 1 &&
                  stroke.fate === "LOST"))
          );

          console.log("strokeMetaData", strokeMetaData);

          // validate that all necessary stroke metadata is present
          if (
            (prevStroke &&
              prevStroke.end_flag_distance !== strokeMetaData.startDistance) ||
            isNaN(strokeMetaData.endDistance) ||
            !strokeMetaData.startDistance ||
            !strokeMetaData.fate ||
            !strokeMetaData.club
          ) {
            sweetAlert.fire({
              title: "Error!",
              text: "You haven't filled in the form all the way!",
              icon: "error",
              confirmButtonText: "OK",
            });
            setSubmitDisabled(false);
            return;
          }

          const prevFate = strokeMetaData.fate;

          // write stroke information to api
          createStroke(
            hole.id,
            strokeMetaData.club,
            strokeMetaData.startDistance,
            strokeMetaData.endDistance,
            strokeNumber + 1,
            strokeMetaData.fate,
            strokeMetaData.tags
          );

          // increment current "sitting" number as appropriate
          if (
            strokeMetaData.endDistance === 0 ||
            ["HOLED", "GIMMIE"].includes(strokeMetaData.fate)
          ) {
            setStrokeNumber(0);
          } else if (strokeMetaData.fate === "LOST") {
            setStrokeNumber(strokeNumber + 2);
          } else if (strokeMetaData.fate !== "MULLIGAN") {
            setStrokeNumber(strokeNumber + 1);
          }

          // increment hole number as appropriate
          if (
            strokeMetaData.endDistance === 0 ||
            ["HOLED", "GIMMIE"].includes(strokeMetaData.fate)
          ) {
            const nextHole = course.holes.items.find(
              (nextHole) => nextHole.hole_number === hole.hole_number + 1
            );
            if (!nextHole) {
              sweetAlert.fire({
                title: "Done!",
                text: "You've finished the round!",
                icon: "success",
                confirmButtonText: (
                  <div>
                    <a style={{color: "white"}} href={"/"}>
                      Go Home
                    </a>
                  </div>
                ),
              });
            }
            setHole(nextHole);
          }

          // Prepare inputs for next stroke

          setStartDistanceUnit(endDistanceUnit);
          setStartDistanceValue(endDistanceValue);
          setStrokeMeta({
            club: null,
            startDistance: strokeMetaData.endDistance,
            endDistance: null,
            fate: null,
            tags: [],
          });
          setSelectedFate(null);
          setSelectedClub(null);
          setSelectedTags([]);
          setEndDistanceValue(null);
          setActiveTabKey("2");
          if (["GIMMIE", "GREEN", "FRINGE"].includes(prevFate)) {
            setSelectedClub("PUTTER");
            setEndDistanceUnit("feet");
          }
          setSubmitDisabled(false);
        }}
      >
        Record Stroke
      </Button>
    </div>
  );
};

export default withRouter(Round);
