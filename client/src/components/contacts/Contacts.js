import React, { useContext, useEffect, Fragment } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import ContactItem from "./ContactItem";
import Spinner from "../layout/Spinner";

import ContactContext from "../../context/contact/contactContext";

const Contacts = () => {
  const { contacts, actions, filtered, loading } = useContext(ContactContext);
  const contactsToDisplay = !filtered ? contacts : filtered;

  useEffect(() => {
    actions.getContacts();
    // eslint-disable-next-line
  }, []);

  if (contacts !== null && contacts.length === 0 && !loading)
    return <h4>Please add contacts...</h4>;

  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <TransitionGroup>
          {contactsToDisplay.map(c => (
            <CSSTransition key={c._id} timeout={500} classNames="item">
              <ContactItem
                contact={c}
                deleteContact={actions.deleteContact}
                setCurrent={actions.setCurrent}
                clearCurrent={actions.clearCurrent}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;
