import React from "react";
import Amplify from "aws-amplify";
import {withAuthenticator} from "@aws-amplify/ui-react";
import "./App.css";
import "antd/dist/antd.css";
import awsconfig from "./aws-exports";
import Bag from "./components/Bag";
import {Layout, Menu} from "antd";
import {HomeOutlined, ShoppingOutlined} from "@ant-design/icons";
import Round from "./components/Round";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Home from "./components/Home";
import Admin from "./components/Admin";
import PastRounds from "./components/PastRounds";
import RoundRecap from "./components/RoundRecap";
const {Header, Content} = Layout;

Amplify.configure(awsconfig);
const App = () => (
  <div>
    <Router>
      <Layout>
        <Header>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="home">
              <Link to={"/"}>
                <HomeOutlined />
              </Link>
            </Menu.Item>
            <Menu.Item key="bag">
              <Link to={"/bag"}>
                <ShoppingOutlined />
              </Link>
            </Menu.Item>
            <Menu.Item key="logout"></Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Content>
            <Switch>
              <Route path="/admin" component={Admin} />
              <Route path="/round/:day" component={RoundRecap} />
              <Route path="/course/:course_id" component={Round} />
              <Route path="/past" component={PastRounds} />
              <Route path="/bag" component={Bag} />
              <Route path="/" component={Home} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Router>
  </div>
);

export default withAuthenticator(App);
