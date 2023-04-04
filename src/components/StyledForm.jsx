const StyledForm = ({ client }) => {
  return (
    <>
      <div className="mb-4">
        <label className="text-gray-800" htmlFor="name">
          Name:
        </label>
        <input
          id="name"
          type="text"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Name of Client"
          name="name"
          defaultValue={client?.name}
        />
      </div>
      <div className="mb-4">
        <label className="text-gray-800" htmlFor="company">
          Company:
        </label>
        <input
          id="company"
          type="text"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Company of the Client"
          name="company"
          defaultValue={client?.company}
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-800" htmlFor="email">
          E-mail:
        </label>
        <input
          id="email"
          type="email"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Email of the Client"
          name="email"
          defaultValue={client?.email}
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-800" htmlFor="telephone">
          Phone:
        </label>
        <input
          id="telephone"
          type="tel"
          className="mt-2 block w-full p-3 bg-gray-50"
          placeholder="Telephone of the Client"
          name="telephone"
          defaultValue={client?.telephone}
        />
      </div>

      <div className="mb-4">
        <label className="text-gray-800" htmlFor="notes">
          Notes:
        </label>
        <textarea
          as="textarea"
          id="notes"
          type="text"
          className="mt-2 block w-full p-3 bg-gray-50 h-40 align-self"
          placeholder="Notes of the Client"
          name="notes"
          defaultValue={client?.notes}
        />
      </div>
    </>
  );
};

export default StyledForm;
