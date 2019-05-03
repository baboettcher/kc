import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  }
});

class SimpleModalWithButton extends React.Component {
  state = {
    open: true
  };

  // handleOpen = () => {
  //   this.setState({ open: true });
  // };

  handleClose = () => {
    this.setState({ open: false });
    this.props.onModalClose();
  };

  render() {
    const { classes, buttonText, buttonAction } = this.props;

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              {this.props.mainText}
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              {this.props.subtitle1}{" "}
            </Typography>
            <Button onClick={buttonAction}>{buttonText}</Button>
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModalWithButton.propTypes = {
  classes: PropTypes.object.isRequired,
  mainText: PropTypes.string.isRequired,
  subtitle1: PropTypes.string.isRequired
};

export default withStyles(styles)(SimpleModalWithButton);
