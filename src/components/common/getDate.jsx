import React from "react";
import Moment from "react-moment";

export default class GetDate extends React.Component {
  state = {
    dateToFormat: "",
  };

  componentDidMount() {
    const dateToFormat = new Date();
    this.setState(dateToFormat);
  }

  render() {
    const { dateToFormat } = this.state;
    return (
      <span style={{ fontSize: "11pt" }}>
        <Moment format="ddd Do MMMM YYYY" date={dateToFormat} />
      </span>
    );
  }
}
