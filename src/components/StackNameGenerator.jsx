import React from "react";
import { List } from "@material-ui/core";
import { memoize } from "lodash";
import axios from "axios";

class StackNameGenerator extends React.Component {
  URL =
    "https://raw.githubusercontent.com/dominusbelli/whatthefuckismystack/master/";

  state = {
    stackName: "",
    generatedList: []
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <List>
        <div>{this.props.stackName}</div>
      </List>
    );
  }
}

export default StackNameGenerator;
