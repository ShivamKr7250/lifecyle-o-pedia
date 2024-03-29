import React from "react";
import { getRandomUser } from "../Utility/api";
import Instructor from "./Instructor";

class CycleOPediaClassComp extends React.Component{
    constructor(props){
        super(props);
        this.state = JSON.parse(localStorage.getItem("cylcopediaState")) || {
            instructor: undefined,
            studentList: [],
            studentCount: 0,
            hideInstructor: false,
            inputName: "",
            inputFeedback: "",
        };
    }

    componentDidMount= async()=>{
        console.log("Component Did Mount");
        if(JSON.parse(localStorage.getItem("cylcopediaState"))){
          //  this.setState(JSON.parse(localStorage.getItem("cylcopediaState")));
        }
        else{
        const response = await getRandomUser();
        console.log(response);

        this.setState((prevState) => {
            return{
                instructor:{
                    name: response.data.first_name + " " + response.data.last_name,
                    email: response.data.email,
                    phone: response.data.phone_number,
                },
            };
        });
    }
    };

    componentDidUpdate(){
        console.log("Component Did Update");
        localStorage.setItem("cylcopediaState", JSON.stringify(this.state));
    }

    componentWillUnmount(){
        console.log("Component Will UnMount");
    }

    handleAddStudent = () =>{
        this.setState((prevState) => {
            return {
                studentCount: prevState.studentCount +1,
            };
        });
    };

    handleRemoveAllStudent = () =>{
        this.setState((prevState) => {
            return {
                studentCount: 0,
            };
        });
    };

    render(){
        console.log("render component");
        return(
        <div>
            <div className="p-3">
            <span className="h4 text-success">Instructor</span>
                <i className="bi bi-toggle-off btn btn-success btn-sm"></i>
                {!this.state.hideInstructor ? (
                <Instructor instructor={this.state.instructor} />
            ): null}
            </div>
            
            <div className="p-3">
                <span className="h4 text-success">Feedback</span>
                <br />
                <input type="text" value={this.state.inputName} placeholder="Name..."
                onChange={(e) => { this.setState({ inputName: e.target.value});
                }}></input>
                <br />
                <textarea value={this.state.inputFeedback} placeholder="Feedback..."
                onChange={(e) => { this.setState({ inputFeedback: e.target.value});}}></textarea>
            </div>
            <div className="p-3">
                <span className="h4 text-success">Students</span><br />
                <div>Student Count: {this.state.studentCount}</div>
                <button className="btn btn-success btn-sm" onClick={this.handleAddStudent}>Add Student</button>
                &nbsp;
                <button className="btn btn-danger btn-sm" onClick={this.handleRemoveAllStudent}>Remove All Student</button>
            </div>
        </div>
        );
    }
}

export default CycleOPediaClassComp;