import React, { Component } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "../../../components/Grid/GridContainer.js";
import GridItem from "../../../components/Grid/GridItem.js";
import Card from "../../../components/Card/Card.js";
import Link from "@material-ui/core/Link";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardBody from "../../../components/Card/CardBody.js";
import CardFooter from "../../../components/Card/CardFooter.js";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import BookIcon from "@material-ui/icons/Book";
import authHeader from "../../../services/auth-header.js";
import styles from "../../../assets/jss/material-kit-react/views/componentsSections/loginStyle.js";

const useStyles = makeStyles(styles);

const useStylesX = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "34ch",
    },
    button: {
      margin: theme.spacing(1),
      float: "right!important",
    },
  },
}));

export default class SectionUpdateBookInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      isbn: "",
      author: "",
      description: "",
      published_date: "",
      publisher: "",
    };
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    axios
      .get("https://mern-01.now.sh/api/books/" + this.props.match.params.id)
      .then((res) => {
        // this.setState({...this.state, book: res.data})
        this.setState({
          title: res.data.title,
          isbn: res.data.isbn,
          author: res.data.author,
          description: res.data.description,
          published_date: res.data.published_date,
          publisher: res.data.publisher,
        });
      })
      .catch((err) => {
        console.log("Error from UpdateBookInfo");
      });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const data = {
      title: this.state.title,
      isbn: this.state.isbn,
      author: this.state.author,
      description: this.state.description,
      published_date: this.state.published_date,
      publisher: this.state.publisher,
    };
    console.log("auHe :: ", authHeader());
    axios
      .put(
        "https://mern-01.now.sh/api/books/" + this.props.match.params.id,
        data,
        { headers: authHeader() }
      )
      .then((res) => {
        this.props.history.push("/show-book/" + this.props.match.params.id);
      })
      .catch((err) => {
        console.log("Error in UpdateBookInfo!");
      });
  };

  render() {
    const Body = () => {
      const classes = useStyles();
      const classesX = useStylesX();
      return (
        <div className={classes.section}>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classesX.root}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Add Book</h4>
                  </CardHeader>
                  <p className={classes.divider}>Create new book</p>
                  <CardBody>
                    <TextField
                      id="title"
                      name="title"
                      label="title"
                      variant="outlined"
                      value={this.state.title}
                      onChange={this.onChange}
                    />
                    <TextField
                      id="isbn"
                      name="isbn"
                      label="isbn"
                      variant="outlined"
                      value={this.state.isbn}
                      onChange={this.onChange}
                    />
                    <TextField
                      id="author"
                      name="author"
                      label="author"
                      variant="outlined"
                      value={this.state.author}
                      onChange={this.onChange}
                    />
                    <TextField
                      id="description"
                      name="description"
                      variant="outlined"
                      label="description"
                      value={this.state.description}
                      onChange={this.onChange}
                    />
                    <TextField
                      id="published_date"
                      name="published_date"
                      variant="outlined"
                      label="published_date"
                      value={this.state.published_date}
                      onChange={this.onChange}
                    />
                    {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="published_date"
                            name="published_date"
                            label="Picker published"
                            inputRef={register}
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                              "aria-label": "change date",
                            }}
                          />
                        </MuiPickersUtilsProvider> */}
                    <TextField
                      id="publisher"
                      name="publisher"
                      variant="outlined"
                      label="publisher"
                      value={this.state.publisher}
                      onChange={this.onChange}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button
                      onClick={this.onSubmit}
                      color="primary"
                      size="large"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem>
                <Link href="/">
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    className={classesX.button}
                    startIcon={<BookIcon />}
                  >
                    Show BooK List
                  </Button>
                </Link>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      );
    }; //

    return <Body />;
  } //
}
