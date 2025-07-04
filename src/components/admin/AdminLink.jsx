import { Link } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

const AdminLink = () => {
  return (
    <Link
      to="/admin/mensajes"
      className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 
        text-white p-4 rounded-full shadow-lg transition-all duration-200
        hover:scale-110 z-40"
      title="Panel de Administración"
    >
      <Cog6ToothIcon className="w-6 h-6" />
    </Link>
  );
};

export default AdminLink;
