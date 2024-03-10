/*!

=========================================================
* Black Dashboard React v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

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
                      <th>Sensor id</th>
                      <th>Location</th>
                      <th>Lattitude</th>
                      <th>Longitude</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>S001</td>
                      <td>edapally canal</td>
                      <td>246.184595</td>
                      <td>4589.15454</td>
                    </tr>
                    <tr>
                      <td>S001</td>
                      <td>edapally canal</td>
                      <td>246.184595</td>
                      <td>4589.15454</td>
                    </tr>
                    <tr>
                      <td>S001</td>
                      <td>edapally canal</td>
                      <td>246.184595</td>
                      <td>4589.15454</td>
                    </tr>
                    <tr>
                      <td>S001</td>
                      <td>edapally canal</td>
                      <td>246.184595</td>
                      <td>4589.15454</td>
                    </tr>
                    <tr>
                      <td>S001</td>
                      <td>edapally canal</td>
                      <td>246.184595</td>
                      <td>4589.15454</td>
                    </tr>
                    <tr>
                      <td>S001</td>
                      <td>edapally canal</td>
                      <td>246.184595</td>
                      <td>4589.15454</td>
                    </tr>
                    <tr>
                      <td>S001</td>
                      <td>edapally canal</td>
                      <td>246.184595</td>
                      <td>4589.15454</td>
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

export default Tables;
