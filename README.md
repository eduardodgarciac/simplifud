## Inicio

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

### Notas

- Herramientas principales:
    - NextJS
    - Tailwind
    - Shadcn UI
    - React Query (Data state management)

- Login
    - Como el endpoint de login no contiene Set-Cookie, se hace uso de servers functions o api endpoints. Por simplicidad, se hace uso de Server Actions para poder almacenar el token en una cookie. La validación de sesión, refresco de token y protección de rutas se realiza a través de un middleware. ToDo: usar axios interceptors para que los requests desde cliente también validen sesión e intenten mantener el flujo.

- Orders
    - Se aprovecha el uso de servers components para retornar vista con datos pre-cargados.

- Para gestión del estado, como alternativa diferente, utilicé React Query, que es una librería orientada al manejo de estado de la data provenientes de requests. Para otros casos conviene utilizar las librerías convencionales.
