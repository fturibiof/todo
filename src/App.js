import React, { Component } from 'react';
import Activity from './Activity';
import InputActivity from './InputActivity';
import Button from './Button';

// import './App.css';

class App extends Component {
  state = {
    listActivities: [],
    id: '',
    description: '',
    time: '',
    edit: false,
  };

  componentDidMount() {
    this.setState({ listActivities: JSON.parse(localStorage.getItem('activities')) || [] });
  }

  toggleForm() {
    const form = document.getElementById('form');
    const formButton = document.getElementById('formButton');
    form.hidden = !form.hidden;
    formButton.hidden = !formButton.hidden;
  }

  handleChangeInput = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleDeleteActivity = id => {
    const newList = this.state.listActivities.filter(item => item.id !== id);
    this.setState({ listActivities: newList });
    localStorage.setItem('activities', JSON.stringify(newList));
  };

  handleEditActivity = id => {
    const selected = this.state.listActivities.filter(item => item.id === id);
    this.setState({ id: selected[0].id, description: selected[0].description, time: selected[0].time, edit: true });
    this.toggleForm();
  };

  sendForm = async e => {
    e.preventDefault();
    if (!this.state.edit) {
      await this.setState({
        listActivities: [
          ...this.state.listActivities,
          {
            id: Math.random(),
            description: this.state.description,
            time: this.state.time,
          },
        ],
      });
      localStorage.setItem('activities', JSON.stringify(this.state.listActivities));
    } else {
      const list = await this.state.listActivities.map(item => ({
        ...item,
        description: item.id === this.state.id ? this.state.description : item.description,
        time: item.id === this.state.id ? this.state.time : item.time,
      }));
      this.setState({ listActivities: list, edit: false });
      localStorage.setItem('activities', JSON.stringify(this.state.listActivities));
    }
    this.toggleForm();
    this.setState({ id: '', description: '', time: '' });
  };

  render() {
    return (
      <div className="App">
        <div className="jumbotron py-1">
          <h1 className="text-primary text-center">To do List</h1>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Atividade</th>
              <th>Horario</th>
            </tr>
          </thead>
          <tbody>
            <Activity
              activity={this.state.listActivities}
              onDelete={this.handleDeleteActivity}
              onEdit={this.handleEditActivity}
            />
          </tbody>
        </table>
        <hr />
        <div className="d-flex justify-content-center">
          <button id="formButton" className="btn btn-primary text-center w-25" onClick={this.toggleForm}>
            Adicionar
          </button>
        </div>
        {/* <div className="d-flex justify-content-center"> */}
          <form hidden id="form" onSubmit={this.sendForm}>
            <div className="form-group" />
            <div className="container">
              <div className="row justify-content-center">
                <div className="col col-lg-4">
                  <InputActivity
                    id="description"
                    type="text"
                    name="description"
                    value={this.state.description}
                    onChange={this.handleChangeInput}
                  />
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col col-lg-4">
                  <InputActivity
                    id="time"
                    type="text"
                    name="time"
                    value={this.state.time}
                    onChange={this.handleChangeInput}
                  />
                </div>
              </div>
            </div>
            <Button type="submit" edit={this.state.edit} />
          </form>
        {/* </div> */}
      </div>
    );
  }
}

export default App;
