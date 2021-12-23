import React, { Component } from "react";
import AreaDataService from "../services/area.service";
import { Link } from "react-router-dom";

export default class AreasList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveAreas = this.retrieveAreas.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveArea = this.setActiveArea.bind(this);
    this.removeAllAreas = this.removeAllAreas.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      areas: [],
      currentArea: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveAreas();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveAreas() {
    AreaDataService.getAll()
      .then(response => {
        this.setState({
          areas: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveAreas();
    this.setState({
      currentArea: null,
      currentIndex: -1
    });
  }

  setActiveArea(area, index) {
    this.setState({
      currentArea: area,
      currentIndex: index
    });
  }

  removeAllAreas() {
    AreaDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    AreaDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          areas: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, areas, currentArea, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Areas List</h4>

          <ul className="list-group">
            {areas &&
              areas.map((area, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveArea(area, index)}
                  key={index}
                >
                  {area.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllAreas}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentArea ? (
            <div>
              <h4>Area</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentArea.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentArea.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentArea.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/areas/" + currentArea.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Area...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}