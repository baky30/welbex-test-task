import React, {FC} from 'react';

const TableBodyCell: FC<{children: string | number}> = ({ children }) => {
  return (
    <td className={'border p-3'}>
      {children}
    </td>
  );
};

export default TableBodyCell;
