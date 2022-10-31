# API De Nicolas Marquez

## Configuración

Primero debemos crear un archivo en la raiz proyecto con el nombre `.env` con el siguiente contenido

```
NODE_PORT=8080
NODE_ENV=local
BASE_HOST=http://localhost:8080
```

para seleccionar la bases de datos
BD_SELECCIONADA=
y elegir entre archivo , mongodb y firebase , si no ponemos ninguna por defecto se selecciona la Memoria

Acá estamos configurando una variable de entorno para nuestro proyecto, en este caso el puerto que usará el servidor.

## Ejecutar en producción

```sh
npm start
```

## Ejecutar en desarollo

```sh
npm run dev:wait  o npm run dev
```

para la prueba de los endpoint que se requiere administrador la ruta debe llevar ?admin=true para administradores y admin=false para clientes

se agrego la collecion de postman para hacer las pruebas y se hizo un forntend muy basico

se uso UUID para las ids
