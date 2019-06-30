import React, { useState, useContext, useEffect } from "react";

import contactContext from "../../context/contact/contactContext";

const ContactForm = () => {
  const { current, actions } = useContext(contactContext);

  useEffect(() => {
    if (current) {
      setContact(current);
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal"
      });
    }
  }, [contactContext, current]);

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal"
  });
  const { name, email, phone, type } = contact;

  const handleChange = e => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    // if(!name || !email || !phone) {
    //   setAlert('Please fill all fields', 'danger');
    // }
    if (!current) {
      actions.addContact(contact);
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal"
      });
    } else {
      actions.updateContact(contact);
      actions.clearCurrent();
    }
  };

  const clearAll = e => {
    actions.clearCurrent();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-primary">
        {current ? "Edit Contact" : "Add Contact"}
      </h2>
      <input
        type="text"
        name="name"
        value={name}
        placeholder="Name"
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        value={email}
        placeholder="Email"
        onChange={handleChange}
      />
      <input
        type="text"
        name="phone"
        value={phone}
        placeholder="Phone"
        onChange={handleChange}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === "personal"}
        onChange={handleChange}
      />{" "}
      Personal{" "}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === "professional"}
        onChange={handleChange}
      />{" "}
      Professional{" "}
      <div>
        <input
          type="submit"
          value={current ? "Submit Changes" : "Add Contact"}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
