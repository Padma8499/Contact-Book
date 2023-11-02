import java.io.*;
import java.util.ArrayList;
import java.util.List;

class Contact implements Serializable {
    private String name;
    private String phoneNumber;
    private String email;

    public Contact(String name, String phoneNumber, String email) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public String toString() {
        return "Name: " + name + ", Phone: " + phoneNumber + ", Email: " + email;
    }
}

class ContactManager {
    private List<Contact> contacts;
    private String filePath;

    public ContactManager(String filePath) {
        this.filePath = filePath;
        contacts = new ArrayList<>();
        loadContacts();
    }

    public void addContact(Contact contact) {
        contacts.add(contact);
        saveContacts();
    }

    public void updateContact(Contact oldContact, Contact newContact) {
        contacts.remove(oldContact);
        contacts.add(newContact);
        saveContacts();
    }

    public List<Contact> searchContacts(String keyword) {
        List<Contact> searchResults = new ArrayList<>();
        for (Contact contact : contacts) {
            if (contact.getName().contains(keyword) || contact.getPhoneNumber().contains(keyword) || contact.getEmail().contains(keyword)) {
                searchResults.add(contact);
            }
        }
        return searchResults;
    }

    private void saveContacts() {
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(filePath))) {
            oos.writeObject(contacts);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void loadContacts() {
        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(filePath))) {
            contacts = (List<Contact>) ois.readObject();
        } catch (IOException | ClassNotFoundException e) {
            // Handle exceptions or initialize contacts if the file doesn't exist
            contacts = new ArrayList<>();
        }
    }
}

public class Main {
    public static void main(String[] args) {
        ContactManager contactManager = new ContactManager("contacts.txt");

        Contact johnDoe = new Contact("John Doe", "123-456-7890", "john@example.com");
        contactManager.addContact(johnDoe);

        Contact janeSmith = new Contact("Jane Smith", "987-654-3210", "jane@example.com");
        contactManager.addContact(janeSmith);

        Contact newJaneSmith = new Contact("Jane Smith", "555-555-5555", "jane@newexample.com");
        contactManager.updateContact(janeSmith, newJaneSmith);

        List<Contact> searchResults = contactManager.searchContacts("Jane");
        for (Contact result : searchResults) {
            System.out.println(result);
        }
    }
}
