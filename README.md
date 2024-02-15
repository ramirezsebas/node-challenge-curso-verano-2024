# Desafío: Administración de Cripto-Inversiones en Poli-Doge

## Objetivo

¡Bienvenidos al desafío de Poli-Doge! El objetivo principal es desarrollar un servicio de API REST en Node.js que interactúe con la API externa de Poli-Doge (<https://api.coincap.io/v2/assets>) para obtener datos de criptomonedas. A través de esta API, los usuarios tendrán la posibilidad de gestionar sus inversiones en criptomonedas de manera cómoda y eficiente. ¡Prepárense para sumergirse en el emocionante mundo de las cripto-inversiones!

### Requisitos

1. **Autenticación de Usuarios**: Implementar un sistema de autenticación de usuarios utilizando tokens JWT para todas las operaciones. ¡La seguridad es nuestra prioridad en Poli-Doge!

2. **Base de Datos de Usuario**: Utilizar una base de datos local basada en archivos (por ejemplo, JSON) para almacenar los datos del usuario.

3. **Base de Datos de Invesiones de Criptomonedas favoritos** (Opcional, pero Bonus): Utilizar una base de datos local basada en archivos (por ejemplo, JSON) para almacenar los datos de las inversiones en criptomonedas favoritas. ¡Obtén un bono extra por esta funcionalidad!

4. **Integración con API Externa**: Establecer comunicación con la API externa de Poli-Doge (<https://api.coincap.io/v2/assets>) para obtener información relevante de las criptomonedas en tiempo real. ¡Mantengamos nuestras inversiones actualizadas!

5. **Operaciones CRUD**:
   - Implementar una operación que liste todas las criptomonedas disponibles, con opciones de paginación, filtrado y ordenamiento. ¡Que los usuarios puedan explorar todas las opciones disponibles!
   - Implementar operaciones CRUD para gestionar las inversiones en criptomonedas de los usuarios:
     - Listar todas las inversiones en criptomonedas de un usuario con opciones de filtrado, ordenamiento y paginación.
     - Agregar una nueva inversión en criptomoneda para un usuario.
     - Eliminar una inversión en criptomoneda previamente registrada para un usuario.

6. **Información Relevante al Cliente**:
   - Devolver únicamente información relevante al cliente, incluyendo:
     - Nombre de la criptomoneda.
     - Símbolo.
     - Precio.
     - Porcentaje de cambio en las últimas 24 horas.
     - Volumen en USD en las últimas 24 horas.

7. **Manejo de Errores**: Implementar un manejo adecuado de errores y proporcionar respuestas de error apropiadas. En Poli-Doge, nos esforzamos por brindar una experiencia fluida y segura a nuestros usuarios.

### Consideraciones Adicionales

- Anima a los participantes a implementar una base de datos local como un bono opcional para almacenar datos de usuario y sus inversiones en criptomonedas.
- Este desafío proporcionará a los participantes una valiosa experiencia en el desarrollo de API REST en Node.js, así como en la gestión y manipulación de datos financieros en tiempo real. ¡Que comience la aventura de las cripto-inversiones con Poli-Doge! 🚀🌕
