import { useEffect, useState } from "react";
import api from "../services/api";

function UsersManagement() {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [page, setPage] = useState(1);

  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    role: "CLIENT",
    is_active: true
  });

  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const pageSize = 10;

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {

    api.get("users/")
      .then((res) => {

        const data =
          res.data.results || res.data;

        setUsers(Array.isArray(data) ? data : []);

      })
      .catch(() => setUsers([]));

  };

  const openCreate = () => {

    setForm({
      username: "",
      email: "",
      phone: "",
      role: "CLIENT",
      is_active: true
    });

    setEditingId(null);
    setShowModal(true);
  };

  const openEdit = (user) => {

    setForm(user);
    setEditingId(user.id);
    setShowModal(true);

  };

  const handleSave = async () => {

    if (editingId) {

      await api.put(`users/${editingId}/`, form);

    } else {

      await api.post("users/", form);

    }

    setShowModal(false);
    loadUsers();

  };

  const toggleActive = async (user) => {

    await api.put(`users/${user.id}/`, {
      ...user,
      is_active: !user.is_active
    });

    loadUsers();

  };

  const deleteUser = async (id) => {

    if (!window.confirm("Supprimer cet utilisateur ?")) return;

    await api.delete(`users/${id}/`);
    loadUsers();

  };

  const filtered = users
    .filter(u =>
      u.username?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
    )
    .filter(u =>
      roleFilter === "ALL" ? true : u.role === roleFilter
    );

  const paginated = filtered.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const getRoleClass = (role) => {
    switch (role) {
      case "ADMIN": return "role-admin";
      case "RETAIL": return "role-retail";
      case "EMPLOYE": return "role-employe";
      case "COMITE": return "role-comite";
      default: return "role-client";
    }
  };

  return (

    <div className="page-container">

      <h1>Administration Utilisateurs</h1>

      {/* TOP BAR */}
      <div className="catalog-filters">

        <input
          placeholder="Rechercher utilisateur..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="ALL">Tous les rôles</option>
          <option value="CLIENT">Client</option>
          <option value="EMPLOYE">Employé</option>
          <option value="RETAIL">Retail</option>
          <option value="COMITE">Comité</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button
          className="btn-primary"
          onClick={openCreate}
        >
          + Nouvel utilisateur
        </button>

      </div>

      {/* TABLE */}
      <div className="table-container">

        <table className="clients-table">

          <thead>

            <tr>
              <th>ID</th>
              <th>Utilisateur</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {paginated.map(user => (

              <tr key={user.id}>

                <td>{user.id}</td>

                <td>{user.username}</td>

                <td>{user.email}</td>

                <td>
                  <span className={getRoleClass(user.role)}>
                    {user.role}
                  </span>
                </td>

                <td>
                  {user.is_active ? "Actif" : "Bloqué"}
                </td>

                <td style={{ display: "flex", gap: "10px" }}>

                  <button
                    className="btn-primary"
                    onClick={() => openEdit(user)}
                  >
                    Modifier
                  </button>

                  <button
                    className="btn-secondary"
                    onClick={() => toggleActive(user)}
                  >
                    {user.is_active ? "Désactiver" : "Activer"}
                  </button>

                  <button
                    className="btn-danger"
                    onClick={() => deleteUser(user.id)}
                  >
                    Supprimer
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* PAGINATION */}
      <div className="pagination">

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span>Page {page}</span>

        <button
          disabled={page * pageSize >= filtered.length}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>

      </div>

      {/* MODAL */}
      {showModal && (

        <div className="modal-overlay">

          <div className="modal">

            <h2>
              {editingId ? "Modifier utilisateur" : "Créer utilisateur"}
            </h2>

            <input
              placeholder="Username"
              value={form.username}
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
            />

            <input
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              placeholder="Téléphone"
              value={form.phone || ""}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />

            <select
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value })
              }
            >
              <option value="CLIENT">Client</option>
              <option value="EMPLOYE">Employé</option>
              <option value="RETAIL">Retail</option>
              <option value="COMITE">Comité</option>
              <option value="ADMIN">Admin</option>
            </select>

            <button
              className="btn-primary"
              onClick={handleSave}
            >
              Enregistrer
            </button>

            <button
              className="btn-danger"
              onClick={() => setShowModal(false)}
            >
              Fermer
            </button>

          </div>

        </div>

      )}

    </div>

  );

}

export default UsersManagement;