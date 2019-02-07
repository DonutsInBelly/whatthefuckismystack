import React from "react";
import { List, ListItem } from "@material-ui/core";
import axios from "axios";

class StackNameGenerator extends React.Component {
  URL =
    "https://raw.githubusercontent.com/dominusbelli/whatthefuckismystack/master/data/";

  state = {
    stackName: "",
    generatedList: []
  };

  constructor(props) {
    super(props);
    this.makeRequest = this.makeRequest.bind(this);
  }

  async makeRequest(letter) {
    return axios({
      method: "get",
      url: this.URL + letter,
      responseType: "text"
    }).then(async response => {
      let results = response.data.split("\n");
      let filteredResults = results.filter(word => word != null && word !== "");
      const randomIndex = Math.floor(Math.random() * filteredResults.length);
      return filteredResults[randomIndex];
    });
  }

  async generateStack(stackName) {
    let listOfThings = [];
    for (var i = 0; i < stackName.length; i++) {
      if(this.state.generatedList.length > i && this.state.generatedList[i].charAt(0).toLowerCase() === stackName.charAt(i).toLowerCase()) {
        listOfThings.push(this.state.generatedList[i]);
      } else if (/^[a-zA-Z]+$/.test(stackName.charAt(i))) {
        listOfThings.push(await this.makeRequest(stackName.charAt(i)));
      }
    }
    this.setState({ generatedList: listOfThings });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.stackName !== this.props.stackName) {
      this.generateStack(this.props.stackName);
    }
  }

  render() {
    let stackTitle =
      this.props.stackName == null || this.props.stackName === "" ? (
        ""
      ) : (
        <h1 className={this.props.css.heading}>
          the {this.props.stackName} stack
        </h1>
      );
    let stackNameList = [];
    if (this.state.generatedList !== []) {
      stackNameList = this.state.generatedList.map(name => {
        return (
          <ListItem>
            <h1 className={this.props.css.generatorOutput}>{name}</h1>
          </ListItem>
        );
      });
    }
    return (
      <div>
        {stackTitle}
        <List>{stackNameList}</List>
      </div>
    );
  }
}

export default StackNameGenerator;
