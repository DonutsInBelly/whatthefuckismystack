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

  async makeRequest(letter, currentList) {
    return axios({
      method: "get",
      url: this.URL + letter,
      responseType: "text"
    }).then(async response => {
      const results = this.dedupeLoop(1,response.data.split('\n').filter(Boolean),currentList);
      return results[Math.floor(Math.random() * results.length)];
    });
  }

  dedupeLoop(loopCount, possibleStrings, currentList) {
    const dedupe = possibleStrings.filter((testword) => (currentList.filter(word => testword === word).length < loopCount));
    return (dedupe.length > 0 ? dedupe : this.dedupeLoop(loopCount+1, possibleStrings, currentList));
  }

  async generateStack(stackName) {
    const generatedList = this.normalizeList(stackName);
    for (var i = generatedList.length; i < stackName.length; i++) {
      const valpush = await this.makeRequest(stackName.charAt(i), generatedList);
        generatedList.push(valpush);
    }
    this.setState({ generatedList, stackName});
  }

  normalizeList(stackName) {
    const prevStack = this.state.stackName;
    let max = 0;
    
    while((max < (stackName.length <= prevStack.length ? stackName.length : prevStack.length)) && stackName[max] === prevStack[max]) {
      max++;
    }
    return this.state.generatedList.slice(0,max);
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
      stackNameList = this.state.generatedList.map((name, index) => {
        return (
          <ListItem key={`${name}-${index}`}>
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
