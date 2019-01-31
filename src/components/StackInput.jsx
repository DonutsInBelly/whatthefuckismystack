import React from "react";
import { Input } from "@material-ui/core";
import { debounce } from "lodash";

class StackInput extends React.Component {
  state = {
    stackName: ""
  };
  constructor(props) {
    super(props);
    this.updateList = this.updateList.bind(this);
    this.handleInputDelay = this.handleInputDelay.bind(this);
  }

  updateList(newStackName) {
    this.setState({ stackName: newStackName }, () => {
      this.handleInputDelay();
    });
  }

  handleInputDelay = debounce(stackName => {
    this.props.handleNameChange(this.state.stackName);
  }, 1000);

  render() {
    return (
      <div>
        <Input
          className={this.props.className}
          placeholder="Start Typing!"
          onChange={e => this.updateList(e.target.value)}
        />
      </div>
    );
  }
}

export default StackInput;
