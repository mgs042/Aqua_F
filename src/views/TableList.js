import React, { useState, useEffect } from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

function Tables() {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    async function fetchSensorData() {
      try {
        const response = await fetch('https://ec2-13-239-43-135.ap-southeast-2.compute.amazonaws.com/list_sensor');
        const data = await response.json();
        setSensorData(data);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    }

    fetchSensorData();
  }, []);

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Sensor Table</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Sensor ID</th>
                      <th>Location</th>
                      <th>Latitude</th>
                      <th>Longitude</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sensorData.map((entry, index) => (
                      <tr key={index}>
                        <td>{entry.sensor}</td>
                        <td>{entry.location}</td>
                        <td>{entry.lat}</td>
                        <td>{entry.long}</td>
                        <td>{entry.status}</td>
                      </tr>
                    ))}
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

export default Tables;
