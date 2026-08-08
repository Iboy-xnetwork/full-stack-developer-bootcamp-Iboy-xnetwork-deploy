import { useEffect, useState } from "react";
import BrewLog from "./components/BrewLog";
import BrewFormModal from "./components/BrewFormModal";
import { getBrews, createBrew, updateBrew, deleteBrew } from "./api/brews";
import "./App.css";

function App() {
  const [brews, setBrews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterMethod, setFilterMethod] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBrew, setEditingBrew] = useState(null);

  const loadBrews = async (method) => {
    setLoading(true);
    setError("");
    try {
      const data = await getBrews(method);
      setBrews(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load brews.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBrews(filterMethod);
  }, [filterMethod]);

  const handleAdd = () => {
    setEditingBrew(null);
    setModalOpen(true);
  };

  const handleEdit = (brew) => {
    setEditingBrew(brew);
    setModalOpen(true);
  };

  const handleSave = async (data) => {
    try {
      if (editingBrew) {
        await updateBrew(editingBrew.id, data);
      } else {
        await createBrew(data);
      }
      setModalOpen(false);
      loadBrews(filterMethod);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBrew(id);
      setModalOpen(false);
      loadBrews(filterMethod);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <title>{`Brews: ${brews.length}`}</title>
      <BrewLog
        brews={brews}
        loading={loading}
        error={error}
        filterMethod={filterMethod}
        onFilterChange={setFilterMethod}
        onAdd={handleAdd}
        onEdit={handleEdit}
      />
      {modalOpen && (
        <BrewFormModal
          brew={editingBrew}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}

export default App;