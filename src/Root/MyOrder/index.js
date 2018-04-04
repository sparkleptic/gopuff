import React, {
  Component
} from 'react';

import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from 'material-ui/Table';

import {
  Check,
  Close
} from 'material-ui-icons';

import Divider from 'material-ui/Divider';

import { 
  ordersData 
} from "../Constant";

export default class MyOrder extends Component {

  /**
   * Function for performing action on the REORDER Click
   */

  _reorderFun = (data) => {
    alert("Reordered");
  }

  render() {
    return (
      <div className="MenuBoxContainer">
        {ordersData.length <= 0 ?
          <p className="EmptyView">YOU HAVE {ordersData.length} ORDERS</p>
          :
          <div>
            <p className="TableTitle" > YOU HAVE {ordersData.length} ORDERS </p>
            <Divider />
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="TableCellStyle">Status</TableCell>
                  <TableCell className="TableCellStyle">Order ID</TableCell>
                  <TableCell className="TableCellStyle">Date</TableCell>
                  <TableCell className="TableCellStyle">Quantity</TableCell>
                  <TableCell className="TableCellStyle">Subtotal</TableCell>
                  <TableCell className="TableCellStyle"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ordersData.map((datarender, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className="TableCellStyle"><p>{datarender.status ? <Check className="CheckIcon" /> : <Close className="CloseIcon" />}</p></TableCell>
                      <TableCell className="TableCellStyle"><p>{datarender.orderId}</p></TableCell>
                      <TableCell className="TableCellStyle"><p>{datarender.date}</p></TableCell>
                      <TableCell className="TableCellStyle"><p>{datarender.qty}</p></TableCell>
                      <TableCell className="TableCellStyle" style={{ fontWeight: '600' }}><p>{`$${datarender.subTotal}`}</p></TableCell>
                      <TableCell className="TableCellStyle"><p onClick={() => this._reorderFun(datarender)} className="ReorderStyle">Reorder</p></TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        }
      </div>
    );
  }
}