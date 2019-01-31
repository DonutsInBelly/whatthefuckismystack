import React from "react";
import { Grid } from "@material-ui/core";
import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles
} from "@material-ui/core/styles";
import StackInput from "./components/StackInput.jsx";
import StackNameGenerator from "./components/StackNameGenerator.jsx";

const styles = theme => ({
  heading: {
    fontFamily: "Major Mono Display"
  },

  generatorInput: {
    border: "solid 1px",
    padding: "4px"
  }
});

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "Open Sans",
      "Major Mono Display",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(",")
  }
});

class App extends React.Component {
  state = {
    stackName: ""
  };
  constructor(props) {
    super(props);
    this.handleStackNameChange = this.handleStackNameChange.bind(this);
  }

  handleStackNameChange(newStackName) {
    console.log("poggers");

    this.setState({
      stackName: newStackName
    });
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Grid
          container
          justify="center"
          column="true"
          alignItems="center"
          direction="column"
        >
          <Grid item xs={12}>
            <h1 className={this.props.classes.heading}>
              What The Fuck Is My Stack?
            </h1>
          </Grid>
          <Grid item xs={12} lg={10}>
            <StackInput
              className={this.props.classes.generatorInput}
              handleNameChange={this.handleStackNameChange}
            />
          </Grid>
          <Grid item xs={12}>
            <StackNameGenerator stackName={this.state.stackName} />
          </Grid>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
