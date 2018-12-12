import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
// import axios from 'axios';
// import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'


class TableRow extends React.Component {
    render() {
       return (
          <tr>
             <td>{this.props.data.id}</td>
             <td>{this.props.data.name}</td>
             <td>{this.props.data.age}</td>
          </tr>
       );
    }
 }

 class Header extends React.Component {
    render() {
       return (
            <h1>{this.props.headervalue}</h1>
        );
    }
 }

Header.defaultProps = {
    headervalue  : "Default Prop"
}

class Fixprop extends React.Component {
    render() {
        return(
            <div>
                <h3>Array: {this.props.propArray}</h3>
                <h3>Bool: {this.props.propBool ? "True..." : "False..."}</h3>
                <h3>Func: {this.props.propFunc(3)}</h3>
                <h3>Number: {this.props.propNumber}</h3>
                <h3>String: {this.props.propString}</h3>
                <h3>Object: {this.props.propObject.objectName1}</h3>
                <h3>Object: {this.props.propObject.objectName2}</h3>
                <h3>Object: {this.props.propObject.objectName3}</h3>
            </div>
        );

    }
}

Fixprop.propTypes = {
    propArray: PropTypes.array.isRequired,
    propBool: PropTypes.bool.isRequired,
    propFunc: PropTypes.func,
    propNumber: PropTypes.number,
    propString: PropTypes.string,
    propObject: PropTypes.object
 }

Fixprop.defaultProps = {
    propArray: [1,2,3,4,5],
    propBool: true,
    propFunc: function(e){return e},
    propNumber: 1,
    propString: "String value...",

    propObject: {
       objectName1:"objectValue1",
       objectName2: "objectValue2",
       objectName3: "objectValue3"
    }
 }


 class StateUpdate extends React.Component {
    constructor() {
       super();
        
       this.state = {
          data: [],
          counter:0
        };
       
       this.setStateHandler = this.setStateHandler.bind(this);
    };
    
    setStateHandler() {
       var counter = this.state.counter;
    //    console.log(counter)
        var item = "setState..."+counter;
        console.log(item)
       var myArray = this.state.data.slice();
       myArray.push(item);
       var new_counter = counter + 1;
       this.setState({data: myArray});
       this.setState({counter:new_counter});

    };

    render() {
       return (
          <div>
             <button onClick = {this.setStateHandler}>SET STATE</button>
             <h4>State Array: {this.state.data}</h4>
             <table><tbody>
             {this.state.data.map((people,i) => <tr key={i}><td>{people}</td></tr>)}
             </tbody>
             </table>
          </div>
       );
    }
 }
 

 class ForceUpdate extends React.Component {
    constructor() {
       super();
       this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    };
    forceUpdateHandler() {
       this.forceUpdate();
    };
    render() {
       return (
          <div>
             <button onClick = {this.forceUpdateHandler}>FORCE UPDATE</button>
             <h4>Random number: {Math.random()}</h4>
          </div>
       );
    }
 }

class DataFetch extends React.Component{
   constructor(props){
         super(props);
         // this.getPassageData = this.getPassageData.bind(this);
         this.state = {
            message : "Empty Message",
            data : {}
         };
      };


   render(){
      return(
         <div>
            <button >GET DATA UPDATE</button>
            {/* <p>{this.state.data}</p> */}
         </div>
         );
      }
}

// Optionally the request above could also be done as
    // axios.get('/user', {
    //   params: {
    //     ID: 12345
    //   }
    // })
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
    // }




class FindDomUpdate extends React.Component{
    constructor() {
        super();
        this.findDomNodeHandler = this.findDomNodeHandler.bind(this);
     };
     findDomNodeHandler(){
        var myDiv = document.getElementById('myDiv');
        ReactDOM.findDOMNode(myDiv).style.color = 'green';
     }
     render(){
        return (
            <div>
                <br></br>
               <button onClick = {this.findDomNodeHandler}>FIND DOM NODE</button>
               <br></br>
               <br></br>
               <div id = "myDiv">NODE</div>
            </div>
         );
     }
}




class ApiLifeCheck extends React.Component {
   constructor(props) {
      super(props);
      
      this.state = {
         data: 0
      }
      this.setNewNumber = this.setNewNumber.bind(this)
   };
   setNewNumber() {
      this.setState({data: this.state.data + 1})
   }
   render() {
      return (
         <div>
            <button onClick = {this.setNewNumber}>INCREMENT</button>
            <ApiLifeCycleContent myNumber = {this.state.data}></ApiLifeCycleContent>
         </div>
      );
   }
}


class ApiLifeCycleContent extends React.Component {
   // componentWillMount() {
   //    console.log('Component WILL MOUNT!')
   // }
   componentDidMount() {
      console.log('Component DID MOUNT!')
   }
   componentWillReceiveProps(newProps) {    
      console.log('Component WILL RECIEVE PROPS!')
   }
   shouldComponentUpdate(newProps, newState) {
      return true;
   }
   componentWillUpdate(nextProps, nextState) {
      console.log('Component WILL UPDATE!');
   }
   componentDidUpdate(prevProps, prevState) {
      console.log('Component DID UPDATE!')
   }
   // componentWillUnmount() {
   //    console.log('Component WILL UNMOUNT!')
   // }
   render() {
      return (
         <div>
            <h3>{this.props.myNumber}</h3>
         </div>
      );
   }
}


class FormApp extends React.Component {
   constructor(props) {
      super(props);
      
      this.state = {
         data: 'Initial data...'
      }
      this.updateState = this.updateState.bind(this);
   };
   updateState(e) {
      this.setState({data: e.target.value});
   }
   render() {
      return (
         <div>
            <input type = "text" value = {this.state.data} 
               onChange = {this.updateState} />
            <h4>{this.state.data}</h4>
         </div>
      );
   }
}


class SearchDomWithRef extends React.Component {
   constructor(props) {
      super(props);
		
      this.state = {
         data: ''
      }
      this.updateState = this.updateState.bind(this);
      this.clearInput = this.clearInput.bind(this);
   };
   updateState(e) {
      this.setState({data: e.target.value});
   }
   
   clearInput() {
      this.setState({data: ''});
      ReactDOM.findDOMNode(this.refs.myInput).focus();
   }
   render() {
      return (
         <div>
            <input value = {this.state.data} onChange = {this.updateState} 
               ref = "myInput"></input>
            <button onClick = {this.clearInput}>CLEAR</button>
            <h4>{this.state.data}</h4>
         </div>
      );
   }
}



class Sample extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           data: 
           [
              {
                 "id":1,
                 "name":"Foo",
                 "age":"20"
              },
              {
                 "id":2,
                 "name":"Bar",
                 "age":"30"
              },
              {
                 "id":3,
                 "name":"Baz",
                 "age":"40"
              }
           ],
           header: "Prop Header from state...",
           content: "Content from state..."
        }
     }
    render() {

     var myStyle = {
         fontSize: 100,
         color: '#FF0000',
         padding:0,
         margin:10
      };
      var i = 4;
       return (
          <div>
              {/* Props Example */}
              <br></br>
            
            Example of State 
             <h1>{this.state.header}</h1>
             <h2>{this.state.content}</h2>
             <br></br>
            <hr></hr>

             Props Example
            <Header headervalue="This a sample props header"/>
            <br></br>
            <hr></hr>
            Example combining state and props
            <Header headervalue={this.state.header}/>
            <br></br>
            <hr></hr>
            Example of default prop value
            <Header/>
            <br></br>
            <hr></hr>
            Example of passing css from js
             <h1 style={myStyle}>Header</h1>
             <br></br>
             <hr></hr>
            Example of summation within code
             <h1>{1+i}</h1>
             <br></br>
             <hr></hr>
             Example of logical functions in react
             <h1>{this.props.test === "1" ? 'True!' : 'False'}</h1>
             <hr></hr>
             Example of passing attribute value to something
             <p data-myattribute = "somevalue">This is the content!!!</p>
            <br></br>
            <hr></hr>
            Example of loop from state (data)
            assigning in map and key defines rendering only limited scope is rendered in the case of assigning key value  | Check console for erro
             <table>
               <tbody>
                  {this.state.data.map((person, i) => <TableRow key = {i} 
                     data = {person} />)}
               </tbody>
            </table>
            <br></br>
            <hr></hr>
            Example of prop type fixing
            <Fixprop ></Fixprop>
            <br></br>
            <hr></hr>  
            State Update Example : <b>setState();</b>
            <StateUpdate></StateUpdate>
            <br></br>
            <hr></hr>

            Force Update Example <b>forceUpdate();</b>
            <ForceUpdate/>
            <br></br>
            <hr></hr>
            Dom Update Based on onClick : <b>ReactDOM.findDOMNode(var dom)</b>
            <FindDomUpdate></FindDomUpdate>
            <br></br>
            <hr></hr>
            Api Life Cycle Check 
            <br></br>
            <ApiLifeCheck></ApiLifeCheck>
            <br></br>
            <hr></hr>
            Form App
            <FormApp></FormApp>
            <br></br>
            <hr></hr>
            Search Dom with ref
            <SearchDomWithRef></SearchDomWithRef>
            <br></br>
            <hr></hr>

            Data Load Ajax
            <DataFetch></DataFetch>

          </div>
          
       );
    }
 }




 export default Sample;