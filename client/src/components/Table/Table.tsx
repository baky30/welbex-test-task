import React, {FC} from 'react';
import {IRecord} from "../../commonInterfaces";
import {modifyDate} from "../../helpers";
import TableBodyCell from "./components/TableBodyCell";
import TableHeadCell from "./components/TableHeadCell";

const Table: FC<{records: IRecord[]}> = ({ records }) => {
  return (
    <table className={'mx-auto border border-collapse rounded-md'}>
      <thead>
        <tr className={'bg-green-600'}>
          <TableHeadCell>Дата</TableHeadCell>
          <TableHeadCell fieldName={'title'}>Название</TableHeadCell>
          <TableHeadCell fieldName={'quantity'}>Количество</TableHeadCell>
          <TableHeadCell fieldName={'distance'}>Расстояние</TableHeadCell>
        </tr>
      </thead>
      <tbody>
        {!!records.length
          ? records.map(record => (
              <tr key={record.id} className={'even:bg-gray-100'}>
                <TableBodyCell>{modifyDate(record.date)}</TableBodyCell>
                <TableBodyCell>{record.title}</TableBodyCell>
                <TableBodyCell>{record.quantity}</TableBodyCell>
                <TableBodyCell>{record.distance}</TableBodyCell>
              </tr>
            ))
          : <tr><td colSpan={4} className={'py-20'} >No such data</td></tr>
        }
      </tbody>
    </table>
  );
};

export default Table;
