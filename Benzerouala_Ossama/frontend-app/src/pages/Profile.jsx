import { getUser, logout } from "../utils/auth";

export default function Profile() {
  const user = getUser();

  if (!user) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning text-center" role="alert">
          Vous n'êtes pas connecté.
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h2 className="card-title mb-3 text-center">Profil</h2>
            <ul className="list-group list-group-flush mb-3">
              <li className="list-group-item">
                <strong>Nom :</strong> {user.first_name} 
              </li>
              <li className="list-group-item">
                <strong>Nom :</strong> {user.last_name} 
              </li>
              <li className="list-group-item">
                <strong>Email :</strong> {user.email}
              </li>
            </ul>
            <div className="d-grid">
                <button
                    onClick={() => {
                    logout();
                    window.location.href = "/login";
                    }}
                    className="btn btn-danger w-100"
                >
                    Logout
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
