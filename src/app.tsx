import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { BasicListPage } from "./basic/list.basic";
import { MyContextComponent } from "./basic/context.basic";
import { BasicDetailPage } from "./basic/detail.basic";
import { AdvanceListPage } from "./advance/list.advance";
import { AdvanceDetailPage } from "./advance/detail.advance";

export const App = () => {
  return (
    <Router>
      <Switch>
        <MyContextComponent>
          <Route exact path="/">
            <BasicListPage />
          </Route>
          <Route path="/basic/detail/:id">
            <BasicDetailPage />
          </Route>
          <Route path="/advance/list">
            <AdvanceListPage />
          </Route>
          <Route path="/advance/detail/:id">
            <AdvanceDetailPage />
          </Route>
        </MyContextComponent>
      </Switch>
    </Router>
  );
};
