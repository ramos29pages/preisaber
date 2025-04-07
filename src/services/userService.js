// src/services/userService.js
let usersDB = [
  {
    id: 1,
    name: "Daniel Ramos",
    email: "dramosm21@curnvirtual.edu.co",
    role: "estudiante",
    identificacion: "1",
    tipo_prueba: "tecnologica",
    picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel",
  },
  {
    id: 2,
    name: "Ana Pérez",
    email: "ana.perez@uninunez.edu.co",
    role: "docente",
    identificacion: "2",
    tipo_prueba: "profesional",
    picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
  },
  {
    id: 3,
    name: "Luis Gómez",
    email: "luisgomez21@curnvirtual.edu.co",
    role: "estudiante",
    identificacion: "3",
    tipo_prueba: "tecnologica",
    picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Luis",
  },
  {
    id: 4,
    name: "Sofía Vargas",
    email: "sofia.vargas@unilibre.edu.co",
    role: "administrador",
    identificacion: "4",
    tipo_prueba: "profesional",
    picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia",
  },
  {
    id: 5,
    name: "Carlos López",
    email: "carlos.lopez@utadeo.edu.co",
    role: "docente",
    identificacion: "5",
    tipo_prueba: "tecnologica",
    picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
  },
  {
    id: 6,
    name: "Valentina Díaz",
    email: "valentina.diaz@upb.edu.co",
    role: "estudiante",
    identificacion: "6",
    tipo_prueba: "profesional",
    picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Valentina",
  },
  {
    id: 7,
    name: "Javier Rodríguez",
    email: "javier.rodriguez@javeriana.edu.co",
    role: "estudiante",
    identificacion: "7",
    tipo_prueba: "tecnologica",
    picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Javier",
  },
  {
    id: 8,
    name: "Mariana Sánchez",
    email: "mariana.sanchez@icesi.edu.co",
    role: "docente",
    identificacion: "8",
    tipo_prueba: "profesional",
    picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mariana",
  },
  {
    id: 9,
    name: "Sebastián Torres",
    email: "sebastian.torres@eafit.edu.co",
    role: "estudiante",
    identificacion: "9",
    tipo_prueba: "tecnologica",
    picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sebastian",
  },
  {
    id: 10,
    name: "Isabella Castro",
    email: "isabella.castro@unal.edu.co",
    role: "administrador",
    identificacion: "10",
    tipo_prueba: "profesional",
    picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella",
  },
  {
    id: 11,
    name: "Andrés Pérez",
    email: "andres.perez@udea.edu.co",
    role: "docente",
    identificacion: "11",
    tipo_prueba: "tecnologica",
    picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Andres",
  },
  {
    id: 12,
    name: "Camila Ruiz",
    email: "camila.ruiz@unisabana.edu.co",
    role: "estudiante",
    identificacion: "12",
    tipo_prueba: "profesional",
    picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Camila",
  },
  {
    id: 13,
    name: "Mateo Vargas",
    email: "mateo.vargas@unipamplona.edu.co",
    role: "estudiante",
    identificacion: "13",
    tipo_prueba: "tecnologica",
    picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mateo",
  },
  {
    id: 14,
    name: "Laura Jiménez",
    email: "laura.jimenez@ucentral.edu.co",
    role: "docente",
    identificacion: "14",
    tipo_prueba: "profesional",
    picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Laura",
  },
  {
    id: 15,
    name: "Nicolás Herrera",
    email: "nicolas.herrera@uniboyaca.edu.co",
    role: "estudiante",
    identificacion: "15",
    tipo_prueba: "tecnologica",
    picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nicolas",
  },
  {
    id: 16,
    name: "Daniela Suárez",
    email: "daniela.suarez@uis.edu.co",
    role: "estudiante",
    identificacion: "16",
    tipo_prueba: "profesional",
    picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daniela",
  },
  {
    id: 17,
    name: "Felipe Rojas",
    email: "felipe.rojas@utp.edu.co",
    role: "docente",
    identificacion: "17",
    tipo_prueba: "tecnologica",
    picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felipe",
  },
  {
    id: 18,
    name: "Juliana Martínez",
    email: "juliana.martinez@unimagdalena.edu.co",
    role: "estudiante",
    identificacion: "18",
    tipo_prueba: "profesional",
    picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juliana",
  },
  {
    id: 19,
    name: "Santiago Díaz",
    email: "santiago.diaz@unicartagena.edu.co",
    role: "administrador",
    identificacion: "19",
    tipo_prueba: "tecnologica",
    picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Santiago",
  },
  {
    id: 20,
    name: "Valeria Guzmán",
    email: "valeria.guzman@uniatlantico.edu.co",
    role: "docente",
    identificacion: "20",
    tipo_prueba: "profesional",
    picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=Valeria",
  },
];

console.log(usersDB);
  
  export const getUsers = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...usersDB]); // devolvemos una copia
      }, 500);
    });
  };
  
  export const addUser = (newUser) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        newUser.id = Date.now(); // ID simple basado en timestamp
        usersDB.push(newUser);
        resolve(newUser);
      }, 500);
    });
  };
  
  export const updateUser = (updatedUser) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = usersDB.findIndex((u) => u.id === updatedUser.id);
        if (index !== -1) {
          usersDB[index] = updatedUser;
          resolve(updatedUser);
        } else {
          reject("Usuario no encontrado");
        }
      }, 500);
    });
  };
  
  export const deleteUser = (userId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = usersDB.findIndex((u) => u.id === userId);
        if (index !== -1) {
          usersDB.splice(index, 1);
          resolve(userId);
        } else {
          reject("Usuario no encontrado");
        }
      }, 500);
    });
  };
  