import {
  Form,
  useNavigate,
  useLoaderData,
  useActionData,
  redirect,
} from "react-router-dom";
import { obtainClient, updateClient } from "../data/clients";
import StyledForm from "../components/StyledForm";
import Error from "../components/Error";

export async function loader({ params }) {
  const client = await obtainClient(params.clientId);
  if (Object.values(client).length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "Client does not exist",
    });
  }

  return client;
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const clientData = Object.fromEntries(formData);
  const email = formData.get("email");

  //Validation
  const errors = [];
  if (Object.values(clientData).includes("")) {
    errors.push("All fields are mandatory");
  }

  //Validation email
  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  if (!regex.test(email)) {
    errors.push("Email is not valid");
  }

  //Return data if there are errors
  if (Object.keys(errors).length) {
    return errors;
  }
  // Update Client
  await updateClient(params.clientId, clientData);
  return redirect("/");
}

function EditClient() {
  const navigate = useNavigate();
  const client = useLoaderData();
  const errors = useActionData();

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Edit Client</h1>
      <p className="mt-5">Please modify the data of a client</p>

      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
          onClick={() => navigate("/")}
        >
          Back
        </button>
      </div>
      <div className="bg-white shadow rounded-md md:w-3/4 ms-auto px-5 py-10">
        {errors?.length &&
          errors.map((error, i) => <Error key={i}>{error}</Error>)}
        <Form method="post" noValidate>
          <StyledForm client={client} />
          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
            value="Update Client"
          />
        </Form>
      </div>
    </>
  );
}

export default EditClient;
