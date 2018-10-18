import React from 'react';

const Activity = ({ activity, onDelete, onEdit }) =>
  activity.map(item => {
    // console.log(item.id);

    return (
      <tr>
        <td>{item.id}</td>
        <td>{item.description}</td>
        <td>{item.time}</td>
        <td>
          <button className="btn btn-info" onClick={() => onEdit(item.id)}>
            Editar
          </button>
        </td>
        <td>
          {' '}
          <button className="btn btn-danger" onClick={() => onDelete(item.id)}>
            Deletar
          </button>
        </td>
      </tr>
    );
  });

export default Activity;
