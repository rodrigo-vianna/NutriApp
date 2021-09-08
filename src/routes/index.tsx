import React from "react";
import { IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router";
import { Tabs } from "./Tabs";
import Login from "../pages/Login";

const Router: React.FC = () => (
  <IonReactRouter>
    <IonSplitPane contentId="main">
      <IonRouterOutlet id="main">
        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>
        <Route path="/login" component={Login} />
        <Route path="/private" component={Tabs} />
      </IonRouterOutlet>
    </IonSplitPane>
  </IonReactRouter>
);

export default Router;