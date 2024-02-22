import React from "react";
import { Divider, Grid } from "@material-ui/core";
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

  normal: {
    fontFamily: "Open Sans"
  },

  generatorInput: {
    border: "solid 2px",
    padding: "4px"
  },

  generatorOutput: {
    fontFamily: "Open Sans"
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
    this.setState({
      stackName: newStackName.toLowerCase()
    });
  }

  componentDidMount() {
    const script = document.createElement("script");

    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";

    document.body.appendChild(script);
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
              what the fuck is my stack?
            </h1>
          </Grid>
          <Grid item xs={12} lg={10}>
            <StackInput
              className={this.props.classes.generatorInput}
              handleNameChange={this.handleStackNameChange}
            />
          </Grid>
          <Grid item xs={12}>
            <StackNameGenerator
              css={{
                heading: this.props.classes.heading,
                generatorOutput: this.props.classes.generatorOutput
              }}
              stackName={this.state.stackName}
            />
          </Grid>
          <Grid item xs={12}>
            <br />
            <Divider />
            <p className={this.props.classes.normal}>
              This was inspired by a tweet from @JemYoung and @argyleink
            </p>
            <blockquote className="twitter-tweet" data-lang="en">
              <p lang="en" dir="ltr">
                quick, someone make an app that makes stacks out of first names!
              </p>
              &mdash; Adam Argyle (@argyleink){" "}
              <a href="https://twitter.com/argyleink/status/1090336562515079168?ref_src=twsrc%5Etfw">
                January 29, 2019
              </a>
            </blockquote>
          </Grid>
          <Grid item xs={12}>
            <p className={this.props.classes.normal}>
              Want to contribute more names for stacks?{" "}
              <a
                href="https://github.com/dominusbelli/whatthefuckismystack"
                target="_blank"
                rel="noopener noreferrer"
              >
                Checkout the Github repo here!
              </a>
            </p>
          </Grid>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
