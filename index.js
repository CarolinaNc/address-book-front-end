
async function getAddresses() {
    const response = await fetch("http://localhost:8080/users", {
        // headers: {
        //     'Content-type': 'application/json; charset=UTF-8',
        //     'Access-Control-Allow-Origin': "*",
        //     'Access-Control-Allow-Methods': "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        //     'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept, authorization",
        //     'Access-Control-Allow-Private-Network': true
        // },
    });
    const addresses = await response.json();
    console.log(addresses);


    const bodyTable = document.querySelector("#body-table");

    for (let i = 0; i < addresses.length; i++) {
        const tr = document.createElement("tr");
        const columns = ["fullName", "address", "city", "zip", "email", "id"];

        for(let j = 0; j < columns.length; j++) {
            const td= document.createElement("td");

            if(columns[j] === "id") {
                const editBtn = document.createElement("button");
                editBtn.textContent = "Edit";
                // editBtn.onclick = () => {}

                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Delete";
                deleteBtn.onclick = () => deleteAddress(addresses[i]["id"]);

                td.append(editBtn, deleteBtn);
                tr.appendChild(td);
            } else {
                td.textContent = addresses[i][`${columns[j]}`];
                tr.appendChild(td);
            }
        }

        bodyTable.appendChild(tr);
    }
}

getAddresses();

async function deleteAddress(id) {
    console.log(id);
    const response = await fetch(`http://localhost:8080/users/${id}`, {
        method: 'DELETE', 
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Access-Control-Allow-Origin': "localhost",
            'Access-Control-Allow-Methods': "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept, authorization"
        },
    });
    console.log(response);

    getAddresses();
}