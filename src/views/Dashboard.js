
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line} from "react-chartjs-2";

import A from "../assets/img/A.png";
import B from "../assets/img/B.png";
import C from "../assets/img/C.png";
import D from "../assets/img/D.png";
import E from "../assets/img/E.png";




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

function Dashboard(props) {

  const [bigChartData, setbigChartData] = React.useState("data1");
  const setBgChartData = (name) => {
    setbigChartData(name);
  };
  console.log(chartExample1[bigChartData]);
  let pH = chartData.pHValues[chartData.pHValues.length - 1];
  let DO = chartData.DOValues[chartData.DOValues.length - 1];
  let EC = chartData.TDSValues[chartData.TDSValues.length - 1];
  let classificationImage = classifyWater(pH, DO, EC);
  return (
    <>
      <div className="content">
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">Sensor</h5>
                    <CardTitle tag="h2">Sensor Data</CardTitle>
                  </Col>
                  <Col sm="6">
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
                        onClick={() => setBgChartData("data1")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          pH
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-single-02" />
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
                        onClick={() => setBgChartData("data2")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Temp
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-gift-2" />
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
                        onClick={() => setBgChartData("data3")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          TDS
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-tap-02" />
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
                        onClick={() => setBgChartData("data4")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          Turb
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-tap-02" />
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
                        onClick={() => setBgChartData("data5")}
                      >
                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                          DO
                        </span>
                        <span className="d-block d-sm-none">
                          <i className="tim-icons icon-tap-02" />
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
                    style={{ display: 'block', margin: 'auto', maxHeight: '100%', maxWidth: '150%' }}
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
                      <td>7.01</td>
                      <td>25.00</td>
                      <td>0.50</td>
                      <td>1.25</td>
                      <td>9.50</td>
                    </tr>
                    <tr>
                      <td>S001</td>
                      <td>7.01</td>
                      <td>25.00</td>
                      <td>0.50</td>
                      <td>1.25</td>
                      <td>9.50</td>
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
