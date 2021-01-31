import './App.css';
import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet/'
import 'react-tabs/style/react-tabs.css';
import Checkbox from "../components/Checkbox";
import 'bootstrap/dist/css/bootstrap.min.css'
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const OPTIONS = [
    'Hotel',
    'Hostel',
    'Motel',
    'Guest house',
    'Apartment'
]


class App extends Component {
  state = {
    position: {
      lat: 41.1108561503959,
      lon: 20.81137416774827,
    },
    userLocation: {
      lat: 0,
      lon: 0,
    },
    zoom: 13,
    haveUsersLocation: false,
    checkboxes: OPTIONS.reduce(
        (options, option) => ({
          ...options,
          [option]: false
        }),
        {}
    ),
    searchSelected: [],
    addSelected: "hotel",
    accommodations: []
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        userLocation: {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        },
        haveUsersLocation: true
      })
    }, () => {
      fetch('https://ipapi.co/json')
          .then(res => res.json())
          .then(location => {
            this.setState({
              userLocation: {
                lat: location.latitude,
                lon: location.longitude,
              },
              haveUsersLocation: true
            })
          })
    });
    fetch("http://localhost:8000/api/accommodations")
        .then(response=>response.json())
        .then(res => {
          this.setState({
            accommodations: res.data
          })
        })
  }

  selectAllCheckboxes = isSelected => {
    Object.keys(this.state.checkboxes).forEach(checkbox => {
      this.setState(prevState => ({
        checkboxes: {
          ...prevState.checkboxes,
          [checkbox]: isSelected
        }
      }));
    });
  };

  selectAll = () => this.selectAllCheckboxes(true);

  deselectAll = () => this.selectAllCheckboxes(false);

  handleCheckboxChange = changeEvent => {
    const { name } = changeEvent.target;

    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }));
  };

  handleFormSubmitSearch = formSubmitEvent => {
    formSubmitEvent.preventDefault();
    let arr = []
    Object.keys(this.state.checkboxes)
        .filter(checkbox => this.state.checkboxes[checkbox])
        .forEach(checkbox => {
          console.log(checkbox, "is selected.")
          if (!(arr.filter(e => e === checkbox).length > 0)) {
            arr.push(checkbox)
          }
        });
    this.setState({
      searchSelected: arr
    });
  };

  createCheckbox = option => (
      <Checkbox
          label={option}
          isSelected={this.state.checkboxes[option]}
          onCheckboxChange={this.handleCheckboxChange}
          key={option}
      />
  );

  createCheckboxes = () => OPTIONS.map(this.createCheckbox);

  showType(tourism) {
    let type;
    switch (tourism) {
      case "hotel": type="Hotel"; break;
      case "hostel": type="Hostel";  break;
      case "motel": type="Motel";  break;
      case "guest_house": type="Guest house"; break;
      case "apartment": type="Apartment"; break;
      default: type=""; break;
    }
    return type;
  }

  render() {
    const position = [this.state.position.lat, this.state.position.lon]
    return (
      <div className="menu-container">
        <div className="menu">
          <div className="tab-content">
            <div className="search-div">
              <h2>Search by type</h2>
              <div className="container">
                <form onSubmit={this.handleFormSubmitSearch}>
                  {this.createCheckboxes()}
                  <div id="checkbox-buttons" className="form-group mt-2">
                    <button
                        type="button"
                        className="btn btn-outline-primary mr-2"
                        onClick={this.selectAll}
                    >
                      Select All
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline-primary mr-2"
                        onClick={this.deselectAll}
                    >
                      Deselect All
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Search
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="search-div">
              <h2>Search results</h2>
              <div id="search-results">
                {this.state.accommodations
                    .filter(item => this.state.searchSelected.includes(this.showType(item.tourism)))
                    .map((acc, index) => (
                        <p key={index}>
                          Name: {acc.name}<br/>Type: {this.showType(acc.tourism)}<br/>Latitude: {acc["@lat"]}<br/>Longitude: {acc["@lon"]}
                        </p>
                    ))}
              </div>
            </div>
          </div>
        </div>
        <MapContainer className="map" worldCopyJump={true} center={position} zoom={this.state.zoom}>>
          <ChangeView center={position} zoom={this.state.zoom} />
          <TileLayer zoom={this.state.zoom}
                     attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {this.state.accommodations
              .filter(item => this.state.searchSelected.includes(this.showType(item.tourism)))
              .map((acc, index) => (
              <Marker position={[acc["@lat"], acc["@lon"]]} key={index}>
                <Popup>
                  <b>{acc.name}</b><br/>{this.showType(acc.tourism)}
                </Popup>
              </Marker>
          ))}

        </MapContainer>
      </div>
    )
  }
}

export default App;
