import { useParams } from "react-router-dom";

function RouteDetails() {
  const { id } = useParams();

  return (
    <div className="p-10">
      <h1 className="text-3xl">Route Details</h1>
      <p className="text-gray-400 mt-2">Route ID: {id}</p>
    </div>
  );
}

export default RouteDetails;