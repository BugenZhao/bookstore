import { Link } from 'react-router-dom';

export function Pagination() {
  return (
    <footer className="py-4 bg-white" id="footer">
      <nav>
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <Link className="page-link" to="#" tabIndex="-1">Previous</Link>
          </li>

          <li className="page-item active"><Link className="page-link" to="#">1</Link></li>
          <li className="page-item"><Link className="page-link" to="#">2</Link></li>
          <li className="page-item"><Link className="page-link" to="#">3</Link></li>

          <li className="page-item">
            <Link className="page-link" to="#">Next</Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
