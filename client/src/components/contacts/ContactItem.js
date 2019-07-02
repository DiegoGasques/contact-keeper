import React from "react";
import PropTypes from "prop-types";

const ContactItem = ({ contact, deleteContact, setCurrent, clearCurrent }) => {
  const { _id, name, email, phone, type } = contact;

  const handleDelete = e => {
    deleteContact(_id);
    clearCurrent();
  };
  const handleEdit = e => setCurrent(contact);

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{" "}
        <span
          className={`badge badge-${
            type === "personal" ? "primary" : "success"
          }`}
          style={{ float: "right" }}
        >
          {`${type[0].toUpperCase()}${type.slice(1)}`}
        </span>
      </h3>
      <ul className="list">
        {email && (
          <li>
            <i className="fas fa-envelope-open" /> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className="fas fa-phone" /> {phone}
          </li>
        )}
      </ul>
      <div>
        <button className="btn btn-dark btn-sm" onClick={handleEdit}>
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired
};

export default ContactItem;
