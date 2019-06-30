import React, { useContext, useEffect, useRef } from "react";
import contactContext from "../../context/contact/contactContext";

const ContactFilter = () => {
  const { actions, filtered } = useContext(contactContext);
  const text = useRef("");

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const handleChange = e => {
    if (text.current.value !== "") {
      actions.filterContacts(e.target.value);
    } else {
      actions.clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type="text"
        placeholder="Filter contacts..."
        onChange={handleChange}
      />
    </form>
  );
};

export default ContactFilter;
