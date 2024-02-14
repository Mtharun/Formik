import { Link } from 'react-router-dom';

const BookTableRow = ({ data, handleDelete }) => {
  return (
    <tr>
      <td>{data?.title}</td>
      <td>{data?.author}</td>
      <td>{data?.isbn}</td>
      <td>{data?.date}</td>
      <td className='text-center'>
        <Link className='btn btn-warning text-white m-3' to={`/edit/${data.id}`}>Edit</Link>
        <button onClick={() => handleDelete(data.id)} className='btn btn-danger'>Delete</button>
      </td>
    </tr>
  );
}

export default BookTableRow;