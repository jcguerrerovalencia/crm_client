import { useNavigate, Form, useActionData, redirect } from "react-router-dom";
import StyledForm from "../components/StyledForm";
import Error from "../components/Error";
import { addClient } from "../data/clients";

export async function action({ request }) {
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
  await addClient(clientData);
  return redirect("/");
}

const NewClient = () => {
  const errors = useActionData();
  const navigate = useNavigate();

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">New Client</h1>
      <p className="mt-5">Complete all the fields to register a new client</p>

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
          <StyledForm />
          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg"
            value="Register Client"
          />
        </Form>
      </div>
    </>
  );
};

export default NewClient;
