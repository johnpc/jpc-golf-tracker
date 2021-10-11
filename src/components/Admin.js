import {Button} from "antd";
import { deleteStrokes } from "../utils/deleteStrokes";
import {seed} from "../utils/seedDb";
const Admin = () => {
  return (
    <div>
      <div>
      <Button onClick={seed}>Seed</Button>
      <Button onClick={deleteStrokes}>Remove Strokes</Button>
      </div>
    </div>
  );
};

export default Admin;
