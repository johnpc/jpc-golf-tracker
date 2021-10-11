import {Avatar, List} from "antd";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import listStrokes from "../data/listStrokes";

const PastRounds = () => {
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

  const history = Object.keys(groupByDay).map((day) => {
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
    return {
      day,
      courseName,
      holesPlayed,
      score,
    };
  });

  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={history}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={
                <Link to={`/round/${item.day}`}>
                  {item.courseName} on {item.day}
                </Link>
              }
              description={`${item.score} thru ${
                Object.values(item.holesPlayed).length
              } holes.`}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default PastRounds;
