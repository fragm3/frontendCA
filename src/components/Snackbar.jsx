import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

// function TransitionLeft(props) {
//     return <Slide {...props} direction="left" />;
//   }
  
//   function TransitionUp(props) {
//     return <Slide {...props} direction="up" />;
//   }
  
  function TransitionRight(props) {
    return <Slide {...props} direction="right" />;
  }
  
  // function TransitionDown(props) {
  //   return <Slide {...props} direction="down" />;
  // }
  

class PositionedSnackbar extends React.Component {
    state = {
        open: false,
        vertical: 'bottom',
        horizontal: 'left',
        Transition: TransitionRight,
      };
    
    handleClose = () => {
        this.setState({ open: false });
      };
    

  render() {
    const { vertical, horizontal} = this.state;
    return (
      <div>
        <Snackbar
          name = "snackbar"
          anchorOrigin={{ vertical, horizontal }}
          open={this.props.open}
          onClose={this.handleClose}
          TransitionComponent={this.state.Transition}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.props.messagecontent}</span>}
        />
      </div>
    );
  }
}

export default PositionedSnackbar;