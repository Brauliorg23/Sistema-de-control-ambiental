import React, { Component } from "react";
import AreaDataService from "../services/area.service";

export default class Area extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getArea = this.getArea.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateArea = this.updateArea.bind(this);
    this.deleteArea = this.deleteArea.bind(this);

    this.state = {
      currentArea: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getArea(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentArea: {
          ...prevState.currentArea,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentArea: {
        ...prevState.currentArea,
        description: description
      }
    }));
  }

  getArea(id) {
    AreaDataService.get(id)
      .then(response => {
        this.setState({
          currentArea: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentArea.id,
      title: this.state.currentArea.title,
      description: this.state.currentArea.description,
      published: status
    };

    AreaDataService.update(this.state.currentArea.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentArea: {
            ...prevState.currentArea,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateArea() {
    AreaDataService.update(
      this.state.currentArea.id,
      this.state.currentArea
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The area was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteArea() {    
    AreaDataService.delete(this.state.currentArea.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/areas')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentArea } = this.state;

    return (
      <div>
        {currentArea ? (
          <div className="edit-form">
            <h4>Area</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentArea.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentArea.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentArea.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentArea.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteArea}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateArea}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Area...</p>
          </div>
        )}
      </div>
    );
  }
}