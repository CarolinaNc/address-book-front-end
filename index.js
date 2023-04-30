let idForUpdate;

function getAddresses() {
    fetch("http://localhost:8080/users").then(response => response.json()).then(data => {
        console.log(data);
        generateTableRows(data);
    })
}

getAddresses();

function generateTableRows(addresses) {
    const bodyTable = document.querySelector("#body-table");

    for (let i = 0; i < addresses.length; i++) {
        generateTableRow(addresses[i], bodyTable);
    }

    console.log(bodyTable)
}

function generateTableRow(address, bodyTable) {
    const tr = document.createElement("tr");
            const columns = ["fullName", "address", "city", "zip", "email", "id"];

            for(let j = 0; j < columns.length; j++) {
                const td = document.createElement("td");

                if(columns[j] === "id") {
                    const editBtn = document.createElement("button");
                    editBtn.textContent = "Edit";
                    editBtn.onclick = () => editAddress(address);

                    const deleteBtn = document.createElement("button");
                    deleteBtn.textContent = "Delete";
                    deleteBtn.onclick = () => deleteAddress(address["id"], bodyTable, tr);

                    td.append(editBtn, deleteBtn);
                    tr.appendChild(td);
                } else {
                    td.textContent = address[`${columns[j]}`];
                    tr.appendChild(td);
                }
           }

         bodyTable.appendChild(tr);
}

function editAddress(address) {
    idForUpdate = address.id;

    document.querySelector("#fullName").value = address.fullName;
    document.querySelector("#address").value = address.address;
    document.querySelector("#city").value = address.city;
    document.querySelector("#zip").value = address.zip;
    document.querySelector("#email").value = address.email;

    document.querySelector("#update-address").style.display = "block";
    document.querySelector("#add-address").style.display = "none";
}

function updateAddress() {
    const fullNameInput = document.querySelector("#fullName").value;
        const addressInput = document.querySelector("#address").value;
        const cityInput = document.querySelector("#city").value;
        const zipInput = document.querySelector("#zip").value;
        const emailInput = document.querySelector("#email").value;

        if (!!fullNameInput && !!addressInput && !!cityInput && !!zipInput && !!emailInput && !!idForUpdate) {
            const data = {
                fullName: fullNameInput,
                address: addressInput,
                city: cityInput,
                zip: zipInput,
                email: emailInput,
                id: idForUpdate // TODO: should be removed when on BE will take id from url
            };

            fetch("http://localhost:8080/users/" + idForUpdate, {
                 method: 'PUT',
                 headers: {"Content-Type": "application/json"},
                 body: JSON.stringify(data),
            }).then(() => {
                idForUpdate = null;
                document.querySelector("#update-address").style.display = "none";
                document.querySelector("#add-address").style.display = "block";

                clearInputs();
            });
        }
}

function addAddress() {
    const fullNameInput = document.querySelector("#fullName").value;
    const addressInput = document.querySelector("#address").value;
    const cityInput = document.querySelector("#city").value;
    const zipInput = document.querySelector("#zip").value;
    const emailInput = document.querySelector("#email").value;

    if (!!fullNameInput && !!addressInput && !!cityInput && !!zipInput && !!emailInput) {
        const data = {
            fullName: fullNameInput,
            address: addressInput,
            city: cityInput,
            zip: zipInput,
            email: emailInput,
            id: new Date().getTime().toString() // TODO: should be removed when on BE will be auto generated
        };

        fetch("http://localhost:8080/users", {
             method: 'POST',
             headers: {"Content-Type": "application/json"},
             body: JSON.stringify(data),
        }).then(response => response.json()).then((address) => {
        console.log('address', address)
            const bodyTable = document.querySelector("#body-table");

            clearInputs();
            generateTableRow(address, bodyTable);
        });
    }
}

function deleteAddress(id, bodyTable, tr) {
    fetch("http://localhost:8080/users/" + id, {method: 'DELETE'}).then(data => bodyTable.removeChild(tr))
}

function clearInputs() {
        document.querySelector("#fullName").value = "";
        document.querySelector("#address").value = "";
        document.querySelector("#city").value = "";
        document.querySelector("#zip").value = "";
        document.querySelector("#email").value = "";
}