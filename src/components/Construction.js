import {Button, Empty} from "antd";
import {Link} from "react-router-dom";

const Construction = () => {
  return (
    <div>
      <h1>This page is under construction.</h1>
      <Empty />
      <div>
        <Link to={"/"}>
          <Button>Go Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default Construction;
