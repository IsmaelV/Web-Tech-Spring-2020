import React from "react";
import MyNav from "./components/nav";
import Section from "./components/section";
import { Switch, Route, Redirect } from "react-router-dom";
import DetailedView from "./components/detailedView";
import "./App.css";

class App extends React.Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = { news_source: true };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState({ news_source: !this.state.news_source });
  }

  render() {
    return (
      <React.Fragment>
        <MyNav
          toggle_status={this.state.news_source}
          handleChange={this.handleChange}
        />
        <div>
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route
              path="/home"
              exact
              component={() => (
                <Section
                  sectionName={"home"}
                  toggle_status={this.state.news_source}
                />
              )}
            />
            <Route
              path="/world"
              component={() => (
                <Section
                  sectionName={"world"}
                  toggle_status={this.state.news_source}
                />
              )}
            />
            <Route
              path="/politics"
              component={() => (
                <Section
                  sectionName={"politics"}
                  toggle_status={this.state.news_source}
                />
              )}
            />
            <Route
              path="/business"
              component={() => (
                <Section
                  sectionName={"business"}
                  toggle_status={this.state.news_source}
                />
              )}
            />
            <Route
              path="/technology"
              component={() => (
                <Section
                  sectionName={"technology"}
                  toggle_status={this.state.news_source}
                />
              )}
            />
            <Route
              path="/sports"
              component={() => (
                <Section
                  sectionName={"sports"}
                  toggle_status={this.state.news_source}
                />
              )}
            />
            <Route path="/article_view/" component={DetailedView} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
