
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line} from "react-chartjs-2";

import Select from 'react-select'


import A from "../assets/img/A.png";
import B from "../assets/img/B.png";
import C from "../assets/img/C.png";
import D from "../assets/img/D.png";
import E from "../assets/img/E.png";

import audio from "../assets/audio/alert_sound.mp3"

import NotificationAlert from "react-notification-alert";




// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";


// core components
import {
  chartExample1,
  chartExample4,
  chartData,
} from "variables/charts.js";

function classifyWater(pH, DO, EC) {
  if (pH >= 6.5 && pH <= 8.5 && DO >= 6 && EC <= 2250) {
      return A; // Drinking Water Source without conventional treatment but after disinfection
  } else if (pH >= 6.5 && pH <= 8.5 && DO >= 5 && DO < 6 && EC <= 2250) {
      return B; // Outdoor bathing (Organised)
  } else if (pH >= 6 && pH <= 9 && DO >= 4 && EC <= 2250) {
      return C; // Drinking water source after conventional treatment and disinfection
  } else if (pH >= 6.5 && pH <= 8.5 && DO >= 4) {
      return D; // Propagation of Wildlife and Fisheries
  } else if (pH >= 6 && pH <= 8.5 && EC <= 2250) {
      return E; // Irrigation, Industrial Cooling, Controlled Waste disposal
  } else {
      return E;
  }
}

const options = [
  { value: 'S001', label: 'S001' },
  { value: 'S002', label: 'S002',isdisabled: true },
  { value: 'S003', label: 'S003',isdisabled: true }
]


function Dashboard(props) {

  const [bigChartData, setbigChartData] = React.useState("data1");
  const setBgChartData = (name) => {
    setbigChartData(name);
  };
  let pH = chartData.pHValues[chartData.pHValues.length - 1];
  let DO = chartData.DOValues[chartData.DOValues.length - 1];
  let EC = chartData.TDSValues[chartData.TDSValues.length - 1];
  let Turb = chartData.turbidityValues[chartData.turbidityValues.length - 1];
  let Temp = chartData.tempValues[chartData.tempValues.length - 1];

  const notificationAlertRef = React.useRef(null);
  const notify = (place, param) => {
    let message = '';
    switch (param) {
      case 'pH':
        message = `Warning: pH value is outside the recommended range (6.5 - 8.5)`;
        break;
      case 'DO':
        message = `Warning: Dissolved Oxygen (DO) level is below the recommended minimum (5.0 mg/L)`;
        break;
      case 'turbidity':
        message = `Warning: Turbidity level is above the recommended maximum (5 NTU)`;
        break;
      case 'TDS':
        message = `Warning: Total Dissolved Solids (TDS) level is above the recommended maximum (500 mg/L)`;
        break;
      case 'temperature':
        message = `Warning: Water temperature is outside the recommended range (10°C - 25°C)`;
        break;
      default:
        message = 'Unknown parameter';
    }
  
    const options = {
      place: place,
      message: (
        <div>
          <div>{message}</div>
        </div>
      ),
      type: 'danger',
      icon: 'tim-icons icon-bell-55',
      autoDismiss: 7,
    };
    // Create a new Audio object with the URL of the sound file
    var alertSound = new Audio(audio);

    // Play the sound
    alertSound.play();

    // Stop the sound after 2 seconds
    setTimeout(function() {
      alertSound.pause();
      alertSound.currentTime = 0;
    }, 2000);

    notificationAlertRef.current.notificationAlert(options);
  };


  let classificationImage = classifyWater(pH, DO, EC);


  return (
    <>
      <div className="content">
      <div className="react-notification-alert-container">
          <NotificationAlert ref={notificationAlertRef} />
        </div>
        <Row>

          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                
                <Row>
                  <Col className="text-left" sm="2">
                    <CardTitle tag="h2">Sensor Data</CardTitle>
                  </Col>
                  <Col sm="2">
                     <Select  options={options}
                        isOptionDisabled={(option) => option.isdisabled}
                        menuPortalTarget={document.body}
                        menuPosition="fixed"
                        theme={(theme) => ({
                          ...theme,
                          borderRadius: 10,
                          colors: {
                            ...theme.colors,
                            //after select dropdown option
                            primary50: "gray",
                            //Border and Background dropdown color
                            primary: "#247cf5",
                            //Background hover dropdown color
                            primary25: "#46aefd",
                            //Background color
                            neutral0: "white",
                            //Border before select
                            neutral20: "gray",
                            //Hover border
                            neutral30: "#3e3e3e",
                            //No options color
                            neutral40: "#247cf5",
                            //Select color
                            neutral50: "black",
                            //arrow icon when click select
                            neutral60: "#42FFDD",
                            //Text color
                            neutral80: "#247cf5",
                          },
                        })}
                      />
   
                  </Col>
                  <Col sm="8">

                    <ButtonGroup
                      className="btn-group-toggle float-right"
                      data-toggle="buttons"
                    >
                      <Button
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data1",
                        })}
                        color="info"
                        id="0"
                        size="sm"
                        onClick={() => {
                          setBgChartData("data1");
                          if (pH < 6.5 || pH > 8.5) {
                            notify("br", "pH");
                          }
                        
                        }}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block d-block d-sm-none">
                          pH
                        </span>
                      </Button>
                      <Button
                        color="info"
                        id="1"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data2",
                        })}
                        onClick={() => {
                          setBgChartData("data2");
                          if (Temp < 10 || Temp> 25) {
                            notify("br", "temperature");
                          }
                        
                        }}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block d-block d-sm-none">
                          Temp
                        </span>

                      </Button>
                      <Button
                        color="info"
                        id="2"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data3",
                        })}
                        onClick={() => {
                          setBgChartData("data3");
                          if (EC > 500) {
                            notify("br", "TDS");
                          }
                        
                        }}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block d-block d-sm-none">
                          TDS
                        </span>
                        
                      </Button>
                      <Button
                        color="info"
                        id="3"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data4",
                        })}
                        onClick={() => {
                          setBgChartData("data4");
                          if (Turb > 5.0) {
                            notify("br", "turbidity");
                          }
                        
                        }}                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block d-block d-sm-none">
                          Turb
                        </span>
                      
                      </Button>
                      <Button
                        color="info"
                        id="4"
                        size="sm"
                        tag="label"
                        className={classNames("btn-simple", {
                          active: bigChartData === "data5",
                        })}
                        onClick={() => {
                          setBgChartData("data5");
                          if (DO < 5.0) {
                            notify("br", "DO");
                          }
                        
                        }}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block d-block d-sm-none">
                          DO
                        </span>

                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample1[bigChartData]}
                    options={chartExample1.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
        <Col lg="6">
          <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Deviation</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-send text-success" /> pH
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample4.data1}
                    options={chartExample4.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6">
          <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Deviation</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-send text-success" /> Temperature
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample4.data2}
                    options={chartExample4.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          
        </Row>
        <Row>
          <Col lg="4">
          <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Deviation</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-send text-success" /> Total Dissolved Solids
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample4.data3}
                    options={chartExample4.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
          <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Deviation</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-send text-success" /> Turbidity
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample4.data4}
                    options={chartExample4.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Deviation</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-send text-success" /> Dissolved Oxygen
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={chartExample4.data5}
                    options={chartExample4.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="6" md="12">
            <Card className="card-tasks">
              <CardHeader>
                <h6 className="title d-inline">Grade</h6>
                <p className="card-category d-inline"> Current</p>
              </CardHeader>
              <CardBody>
                

                <img
                    src={classificationImage}
                    alt="Image"
                    style={{ display: 'block', margin: 'auto', maxHeight: '100%', maxWidth: '100%' }}
                />
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Current Values</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Sensor ID</th>
                      <th>pH</th>
                      <th>Temp</th>
                      <th>TDS</th>
                      <th>Turb</th>
                      <th>DO</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>S001</td>
                      <td>{chartData.pHValues[chartData.pHValues.length - 1]}</td>
                      <td>{chartData.tempValues[chartData.tempValues.length - 1]}</td>
                      <td>{chartData.TDSValues[chartData.TDSValues.length - 1]}</td>
                      <td>{chartData.turbidityValues[chartData.turbidityValues.length - 1]}</td>
                      <td>{chartData.DOValues[chartData.DOValues.length - 1]}</td>
                    </tr>

                    <tr>
                    <td>S001</td>
                      <td>{chartData.pHValues[chartData.pHValues.length - 2]}</td>
                      <td>{chartData.tempValues[chartData.tempValues.length - 2]}</td>
                      <td>{chartData.TDSValues[chartData.TDSValues.length - 2]}</td>
                      <td>{chartData.turbidityValues[chartData.turbidityValues.length - 2]}</td>
                      <td>{chartData.DOValues[chartData.DOValues.length - 2]}</td>
                    </tr>
                    <tr>
                    <td>S001</td>
                      <td>{chartData.pHValues[chartData.pHValues.length - 3]}</td>
                      <td>{chartData.tempValues[chartData.tempValues.length - 3]}</td>
                      <td>{chartData.TDSValues[chartData.TDSValues.length - 3]}</td>
                      <td>{chartData.turbidityValues[chartData.turbidityValues.length - 3]}</td>
                      <td>{chartData.DOValues[chartData.DOValues.length - 3]}</td>
                    </tr>
                    <tr>
                    <td>S001</td>
                      <td>{chartData.pHValues[chartData.pHValues.length - 4]}</td>
                      <td>{chartData.tempValues[chartData.tempValues.length - 4]}</td>
                      <td>{chartData.TDSValues[chartData.TDSValues.length - 4]}</td>
                      <td>{chartData.turbidityValues[chartData.turbidityValues.length - 4]}</td>
                      <td>{chartData.DOValues[chartData.DOValues.length - 4]}</td>
                    </tr>
                    <tr>
                    <td>S001</td>
                      <td>{chartData.pHValues[chartData.pHValues.length - 5]}</td>
                      <td>{chartData.tempValues[chartData.tempValues.length - 5]}</td>
                      <td>{chartData.TDSValues[chartData.TDSValues.length - 5]}</td>
                      <td>{chartData.turbidityValues[chartData.turbidityValues.length - 5]}</td>
                      <td>{chartData.DOValues[chartData.DOValues.length - 5
                      ]}</td>
                    </tr>
                    <tr>
                    <td>S001</td>
                      <td>{chartData.pHValues[chartData.pHValues.length - 6]}</td>
                      <td>{chartData.tempValues[chartData.tempValues.length - 6]}</td>
                      <td>{chartData.TDSValues[chartData.TDSValues.length - 6]}</td>
                      <td>{chartData.turbidityValues[chartData.turbidityValues.length - 6]}</td>
                      <td>{chartData.DOValues[chartData.DOValues.length - 6
                      ]}</td>
                    </tr>
                    <tr>
                    <td>S001</td>
                      <td>{chartData.pHValues[chartData.pHValues.length - 7]}</td>
                      <td>{chartData.tempValues[chartData.tempValues.length - 7]}</td>
                      <td>{chartData.TDSValues[chartData.TDSValues.length - 7]}</td>
                      <td>{chartData.turbidityValues[chartData.turbidityValues.length - 7]}</td>
                      <td>{chartData.DOValues[chartData.DOValues.length - 7
                      ]}</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
