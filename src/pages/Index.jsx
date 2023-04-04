import { useLoaderData } from "react-router-dom";
import Client from "../components/Client";
import { obtainClients } from "../data/clients";

export function loader() {
  const clients = obtainClients();
  return clients;
}

function Index() {
  const clients = useLoaderData();

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Clients</h1>
      <p className="mt-5">Manage your Clients</p>

      {clients.length ? (
        <table className="w-full bg-white shadow mt-5 table-auto">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Client</th>
              <th className="p-2">Contact</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <Client client={client} key={client.id} />
            ))}
          </tbody>
        </table>
      ) : (
        <p className=" text-center mt-10">No clients yet</p>
      )}
    </>
  );
}

export default Index;
