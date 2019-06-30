import React, { useContext, Fragment } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import ContactItem from "./ContactItem";

import ContactContext from "../../context/contact/contactContext";

const Contacts = props => {
  const { contacts, actions, filtered } = useContext(ContactContext);
  const contactsToDisplay = !filtered ? contacts : filtered;

  if (contacts.length === null) return <h4>Please add contacts...</h4>;

  return (
    <Fragment>
      <TransitionGroup>
        {contactsToDisplay.map(c => (
          <CSSTransition key={c.id} timeout={500} classNames="item">
            <ContactItem
              contact={c}
              deleteContact={actions.deleteContact}
              setCurrent={actions.setCurrent}
              clearCurrent={actions.clearCurrent}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Contacts;
