
import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import canteenService from "services/canteenService";
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


  const [Canteens, setCanteens] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const canteenPromise = canteenService.getAllCanteens();
    canteenPromise.then((res) => {
      console.log("Canteens response : ", res);
      if (res.canteens) {
        setCanteens(res.canteens);
      }
    }).catch((err) => {
      console.log("error : ", err);
    })
  }, [])


  function handelCanteenTransfer(id) {



  }



  return (
    <>
      <div className="content">
        <Row>
         
          <Col md="12">
            <Card className="card-plain">
              <CardHeader>
                <CardTitle tag="h4">Canteens details</CardTitle>
                {/* <p className="card-category">
                  Here is a subtitle for this table
                </p> */}
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Canteen Name</th>
                      <th>Manager</th>
                      <th>Stokes</th>
                      <th className="text-right  ">Transfer Products</th>
                      <th className="text-right">Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Canteens.map((canteen) => {
                      return (
                        <tr key={canteen._id}>
                          <td> {canteen.name}</td>
                          <td> {canteen.canteenUser}</td>
                          <td onClick={() => { navigate("/stoke/" + canteen._id); }} > Stokes </td>
                          <td className="text-right text-success font-weight-bold" onClick={() => { handelCanteenTransfer(canteen._id); navigate("/admin/canteenTransfer/" + canteen._id); }}> transfer</td>
                          <td className="text-right text-danger font-weight-bold" onClick={() => { navigate("/admin/addCanteens/" + canteen._id); }}> Edit</td>
                        </tr>)
                    })
                    }
                   
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
