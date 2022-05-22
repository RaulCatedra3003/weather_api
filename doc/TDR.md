Objetivo:
Implementar un microservicio que devuelva el clima de una ubicación dadas las
coordenadas.

Especificaciones:
• El clima se obtiene de https://openweathermap.org/api (necesario hacer cuenta gratuita y
obtener clave api para las peticiones). El API que nos interesa del proveedor de clima es la
One Call API (https://openweathermap.org/api/one-call-api). De la respuesta de esa petición
nos interesa únicamente las secciones “hourly” y “daily”.
• El microservicio deberá implementar un mecanismo de caché:
◦ Si se pide el clima para una ubicación por primera vez, se realiza la petición a
openweathermap y se almacena en BBDD. Se debe registrar la hora a la que se ha
solicitado.
◦ Si se pide el clima para una ubicación ya existente en BBDD, se devuelve ese
documento únicamente si la hora de solicitud asociada a esos datos no ha superado las 3
horas. En caso de que el documento sea más antiguo, se deberá refrescar los datos
realizando una nueva petición a openweathermap.org
• El microservicio deberá implementar un endpoint GET:
◦ Dadas las coordenadas, se devuelve el clima para esa ubicación (secciones “hourly” y
“daily”).
• Implementar microservicio en NodeJS, usando Express como framework REST
• Usar MongoDB como BBDD
• Definir un Dockerfile con la imagen del servicio.
• Publicar el proyecto en Github/Gitlab

Extra:
• Implementar una definición de la arquitectura en un archivo docker-compose.yml que
incluya el microservicio y la base de datos mongodb, tal que sea completamente funcional.
• Implementar un endpoint adicional GET para obtener el clima de una hora en concreto. El
endpoint devolverá el objeto “hourly” correspondiente a la hora especificada en los
argumentos de la petición (en querystring o en body). Ejemplo: En la petición se pide la
información climática de las 13:00 de hoy; si está en BBDD, devolver únicamente la entrada
de “hourly” correspondiente a las 13:00.
• Dejar planteado los tests unitarios y de integración, tal que se puedan lanzar con un
comando “npm run ....” definido en el package.json.

• Usar el driver nativo de mongodb para NodeJS (https://github.com/mongodb/node-
mongodb-native)