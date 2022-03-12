let contactList = [];
let contactListElement = document.getElementById("contact-list");
let addContactElement = document.getElementById("add-contact-form");
let invalidPhoneNumberElement = document.getElementById("invalid-phone-number");

function loadContats()
{
    let loadedContactList = JSON.parse(window.localStorage.getItem("contactList"))
    
    if(loadedContactList)
    {
        contactList = loadedContactList;
    }
}

function addContact(event)
{
    event.preventDefault();
    let form = event.target;
    
    let newNumber = form.phoneNumber.value;
    if(newNumber.length < 10 || newNumber.length > 10)
    {
        invalidPhoneNumberElement.classList.remove("hidden");
    }
    else
    {
        let newContact = {name: form.contactName.value, number: newNumber, emergency: form.emergency.checked};
        contactList.push(newContact);

        addContactElement.classList.add("hidden");
        invalidPhoneNumberElement.classList.add("hidden");
        saveContacts();
        updateContactListElement();
        resetForm();
    }
}

function cancelAddContact()
{
    addContactElement.classList.add("hidden");
    resetForm();
}

function deleteContact(id)
{
    for(let i = id; i < contactList.length; i++)
    {
        contactList[i] = contactList[i + 1];
    }
    
    contactList.pop();
    
    saveContacts();
    updateContactListElement();
}

function saveContacts()
{
    window.localStorage.setItem("contactList", JSON.stringify(contactList));
}

function resetForm()
{
    addContactElement.children[1].reset();
    invalidPhoneNumberElement.classList.add("hidden");
}

function updateContactListElement()
{
    let updatedContactList = "";
    
    contactList.forEach((contact, index) => updatedContactList += 
    `<div class="card p2 m3 mt1 mb1 ${(contact.emergency ? "emergency-contact" : "")}">
    <div class="d-flex space-between m1 contact-name">
    <span>${contact.name}</span>
    <span>${(contact.emergency ? "🚑 Emergency Contact" : "")}</span>
    </div>
    <div class="d-flex space-between m1">
    <span>${"(" + contact.number.substr(0, 3) + ") " + contact.number.substr(3, 3) + "-" + contact.number.substr(6, 4)}</span>
    <button class="cancel-button" onclick="deleteContact(${index})"><i class="fa-regular fa-trash-can"></i></button>
    </div>
    </div>`)
    
    contactListElement.innerHTML = updatedContactList;
}

function openAddContactCard()
{
    resetForm();
    addContactElement.classList.remove("hidden");
}

loadContats();
updateContactListElement();
resetForm();