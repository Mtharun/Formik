import { Link } from 'react-router-dom';

const AuthorTableRow = ({data,handleDelete}) => {

  const handleDeleteClick = () =>{
    handleDelete(data.id);
  };

  return (
    <tr>
      <td>{data?.name}</td>
      <td>{data?.birthDate}</td>
      <td>{data?.biography}</td>
      <td className='text-center'>
        <Link className='btn btn-warning text-white m-3' to={`/authorEdit/${data.id}`}>Edit</Link>
        <button onClick={handleDeleteClick} className='btn btn-danger'>Delete</button>
      </td>
    </tr>
  );
}

export default AuthorTableRow;