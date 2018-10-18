import React, { Component } from 'react';

class Button extends Component {
  render() {
    return (
        <div className="d-flex justify-content-center">
            <button className="btn btn-primary w-10 text-center mx-auto">{this.props.edit? 'Editar':'Enviar'}</button>
        </div>
    );
  }
}
export default Button;