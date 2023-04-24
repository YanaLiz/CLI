const contacts = require("./contacts");
const argv = require("yargs").argv;


const invokeAction = async ({action, id, name, email, phone}) => {
  switch (action) {
    case "list":
      const contactsList = await contacts.listContacts();
      return console.table(contactsList);

    case "get":
      const contact = await contacts.getContactById(id);
      return console.log(contact);

    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      return console.log(newContact);

    case "remove":
      const contactRemove = await contacts.removeContact(id);
      return console.log(contactRemove);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
