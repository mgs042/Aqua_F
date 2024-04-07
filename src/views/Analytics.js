import React from 'react';
import { Row, Col, Card, CardHeader, CardBody, CardTitle } from 'reactstrap';
import { Bar, Line } from 'react-chartjs-2';
import { chartExample2, chartExample3 } from 'variables/charts'; // Import chart data and options

const Analytics = () => {
  return (
    <div className="content">
          <Row>
            <Col lg="6">
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h4">Chart 1</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                  <Line
                    data={chartExample2.data1}
                    options={chartExample2.options}
                  />
                  </div>
                </CardBody>
              </Card>
            </Col>
          
            <Col lg="6">
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h4">Chart 2</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                  <Line
                    data={chartExample3.data1}
                    options={chartExample3.options}
                  />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

    </div>
  );
};

export default Analytics;