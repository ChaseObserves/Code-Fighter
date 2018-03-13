import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom"; // BrowserRouter is the brains of React Router, tells it how to behave, looks at the current URL and changes the set of components visible. Route is a React component used to set up a rule between a certain route a user might visit and the set of components that will be actually visible on the screen.
import { connect } from "react-redux"; // The "connect" function gives Components (React) the ability to call Action Creators (Redux). the React-Redux library exists to make the two play nicely.
import * as actions from "../actions"; // Imports all of the Action Creators from the actions.js file. "* as actions" says "Take all the Action Creators we've defined and assign them to the object 'actions'"

// Dummy Components for testing
import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import Lobby from "./Lobby";

// In the first build of this App Component, it was a functional Component. But we only want to run our fetchUser Action Creator the very first time App is rendered to the screen,
// so we will refactor it to be a class-based component rather than a functional one. Doing so gives us access to a life-cycle method (componentDidMount) that will automatically
// be called when App is very first rendered.
class App extends Component {
  componentDidMount() {
    // This function is firing off right when the app boots up
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <div className="container">
              <Route exact path="/" component={Landing} />{" "}
              {/* "path" and "component" here are props, path is the route and component is the component we want to display when a user hits that route. */}
              <Route exact path="/surveys" component={Dashboard} />
              <Route path="/fights/:fightId" component={Lobby} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
// The first argument of "connect" is reserved for the "map state to props" function, which we aren't using on this Component (null). Second option is all Action Creators.
// IMPORTANT: Once all of the Action Creators are passed into this function, they are assigned to the App Component as props.
// So now, inside of our App Component, we can call our Action Creators by using "this.props.someActionCreator"
