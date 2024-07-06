document.addEventListener("DOMContentLoaded", function() {
    const loader = document.getElementById("loader");
    const tablaContainer = document.getElementById("tabla-container");
    const tablaUsuarios = document.querySelector("#tabla-usuarios tbody");

    const convertirDeDuendeMalita = (data) => data.data; // Para acceder a los nombres y demás datos de las personas

    const insertarFilas = (users) => {
        const rows = users.map(user => `
            <tr>
                <td>${user.id}</td>
                <td>${user.first_name}</td>
                <td>${user.last_name}</td>
                <td>${user.email}</td>
                <td><img src="${user.avatar}" class="img-fluid" alt="${user.first_name} ${user.last_name}" width="50"></td>
            </tr>
        `);
        return rows.join("");
    };

    const getPersonas = (url, convertirAUsuarios) => {
        loader.style.display = "flex"; // Mostrar el loader mientras se carga
        tablaContainer.style.display = "none"; // Ocultar la tabla mientras se carga
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const users = convertirAUsuarios(data);
                console.table(users);
                tablaUsuarios.innerHTML = insertarFilas(users);
                loader.style.display = "none"; // Ocultar el loader cuando se complete la carga
                tablaContainer.style.display = "block"; // Mostrar la tabla una vez que se han cargado los datos
            })
            .catch(error => {
                console.error('Error al obtener los datos:', error);
                loader.style.display = "none"; // En caso de error, asegurarse de ocultar el loader
            });
    };

    document.getElementById('leer-usuario-btn').addEventListener('click', function() {
        loader.style.display = 'block';
        tablaContainer.style.display = 'none';

        // Simulación de una carga de 3 segundos
        setTimeout(function() {
            // Aquí iría la lógica para acceder a los usuarios y actualizar la tabla
            getPersonas("https://reqres.in/api/users?delay=3", convertirDeDuendeMalita); // Agregar el retardo de 3 segundos
        }, 3000); // 3000 ms = 3 segundos
    });
});