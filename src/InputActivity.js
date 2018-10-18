import React, {Component} from 'react';

class InputActivity extends Component{
    render(){
        return(
            <div>
                <label htmlFor={this.props.id}>{this.props.name}</label>
                <div className="input-group mb-3 d-flex">
                    <input className="form-control w-40" {...this.props}/>
                </div>
            </div>
        );
    }
}

export default InputActivity;