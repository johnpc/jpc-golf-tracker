import {Button} from "antd";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import listStrokes from "../data/listStrokes";

const RoundRecap = (props) => {
  const day = props.match.params.day;
  const [strokes, setStrokes] = useState(null);
  async function setupState() {
    const strokes = await listStrokes();
    setStrokes(strokes);
  }
  useEffect(() => {
    setupState();
  }, []);
  if (!strokes) return "Loading...";
  const groupByDay = strokes.reduce((acc, stroke) => {
    const day = stroke.date.substring(0, stroke.date.indexOf("T"));
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(stroke);
    return acc;
  }, {});
  if (!groupByDay[day]) return `You didn't golf on ${day}`;

  const holesPlayed = groupByDay[day].reduce((acc, stroke) => {
    if (!acc[stroke.hole.id]) {
      acc[stroke.hole.id] = [];
    }
    acc[stroke.hole.id].push(stroke);
    return acc;
  }, {});
  const key = Object.keys(holesPlayed).find((_) => true);
  const courseName = holesPlayed[key][0].hole.course.name;

  const score = Object.values(holesPlayed).reduce((score, strokes) => {
    const firstStroke = strokes.find((_) => true);
    const par = firstStroke.hole.par;
    return score + strokes.length - par;
  }, 0);
  const history = {
    day,
    courseName,
    holesPlayed,
    score,
  };

  return (
    <div>
      <h1>
        {Object.values(history.holesPlayed).length} holes at{" "}
        {history.courseName} on {history.day}
      </h1>
      {Object.values(history.holesPlayed)
        .sort((a, b) => {
          const firstStrokeA = a.find((_) => true);
          const firstStrokeB = b.find((_) => true);
          return firstStrokeA.hole.hole_number > firstStrokeB.hole.hole_number
            ? 1
            : -1;
        })
        .map((strokes) => {
          const firstStroke = strokes.find((_) => true);
          const hole = firstStroke.hole;
          return (
            <div key={hole.hole_number}>
              <h2>
                Hole {hole.hole_number}. Par {hole.par}.
              </h2>
              {strokes.map((holeStroke) => {
                return (
                  <p key={holeStroke.id}>
                    {holeStroke.shot_number}: {holeStroke.club} from{" "}
                    {holeStroke.start_flag_distance > 50
                      ? `${holeStroke.start_flag_distance / 3} yards`
                      : `${holeStroke.start_flag_distance} feet`}
                    . {holeStroke.fate}
                  </p>
                );
              })}
            </div>
          );
        })}
      <div>
        <Link to={"/"}>
          <Button>Go Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default RoundRecap;
