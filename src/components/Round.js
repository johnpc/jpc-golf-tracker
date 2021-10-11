import React, {useEffect, useState} from "react";
import {withRouter} from "react-router";
import {Button, Tabs} from "antd";
import getBag from "../data/getBag";
import getCourse from "../data/getCourse";
import StartTab from "./Round/StartTab";
import ClubTab from "./Round/ClubTab";
import FateTab from "./Round/FateTab";
import TagTab from "./Round/TagTab";
import EndTab from "./Round/EndTab";
import listStrokes from "../data/listStrokes";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import createStroke from "../data/createStroke";
const sweetAlert = withReactContent(Swal);

const {TabPane} = Tabs;

const Round = (props) => {
  const courseId = props.match.params.course_id;
  const [course, setCourse] = useState(null);
  const [hole, setHole] = useState(null);
  const [strokeNumber, setStrokeNumber] = useState(0);
  const [strokeMetaData, setStrokeMeta] = useState({});
  const [bag, setBag] = useState(null);
  const [submitDisabled, setSubmitDisabled] = useState(false);

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
      <Tabs type="card">
        <TabPane tab="Start" key="1">
          <StartTab
            cb={(startDistance) => {
              setStrokeMeta({
                ...strokeMetaData,
                startDistance,
              });
            }}
          >
            How far are you from the hole rn?
          </StartTab>
        </TabPane>
        <TabPane tab="Club" key="2">
          <ClubTab
            cb={(club) => {
              setStrokeMeta({
                ...strokeMetaData,
                club,
              });
            }}
          >
            Which club are you using?
          </ClubTab>
        </TabPane>
        <TabPane tab="Fate" key="3">
          <FateTab
            cb={(fate) => {
              const fateExtras = ["HOLED", "GIMMIE"].includes(fate)
                ? {
                    endDistance: 0,
                  }
                : {};
              setStrokeMeta({
                ...strokeMetaData,
                ...fateExtras,
                fate,
              });
            }}
          >
            Where did it end up?
          </FateTab>
        </TabPane>
        <TabPane tab="Tag" key="4">
          <TagTab
            cb={(tags) => {
              setStrokeMeta({
                ...strokeMetaData,
                tags,
              });
            }}
          >
            Thoughts?
          </TagTab>
        </TabPane>
        <TabPane tab="End" key="5">
          <EndTab
            cb={(endDistance) => {
              setStrokeMeta({
                ...strokeMetaData,
                endDistance,
              });
            }}
          >
            New Distance?
          </EndTab>
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

          // validate that all necessary stroke metadata is present
          if (
            (prevStroke &&
              prevStroke.endDistance !== strokeMetaData.startDistance) ||
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
            return;
          }

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
          setSubmitDisabled(false);
        }}
      >
        Record Stroke
      </Button>
    </div>
  );
};

export default withRouter(Round);
