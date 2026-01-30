# Prueba Técnica Frontend Enero 2026

[Read this file in english here.](README.en.md)

## Instalación

```bash
cd code
pnpm install
pnpm dev
```

## Descripción

En esta prueba tendrás que implementar un diseño de Figma, el programa
con el que trabajarás con el equipo de diseño en Diga.

La prueba consiste en la implementación de un pequeño dashboard, que simula la
funcionalidad real de nuestro producto: el análisis de estadísticas y detalles
de llamadas. Tendrás una hora para realizarlo.

> [!NOTE]
> **Duración del ejercicio**
>
> A pesar de que solo tienes una hora para realizar el ejercicio, este está
> diseñado para ser completado en más tiempo así que no te preocupes si no eres
> capaz de terminar. Queremos evaluar tu capacidad de priorizar y valorar
> la importancia de las tareas.

## ¿En qué consiste la tarea?

Deberás implementar este [diseño de Figma](https://www.figma.com/design/Nv7e6LVCWymsxPgsxRMa3v/Prueba-técnica---Frontend?node-id=1480-0&p=f&m=draw), usando React con TS y Tailwind CSS.

Puedes partir de este repositorio, que tiene una instalación por defecto de Vite
con TS preconfigurado y Tailwind instalado. También puedes encontrar los
componentes de Untitled, la librería que usamos en Diga.

Este es el stack con el que trabajarás en la compañía, sin embargo, también
puedes realizar la prueba completamente de cero siempre que uses React 19,
Typescript y Tailwind CSS.

> [!WARNING]
> Nuestra API no devuelve localhost en los headers de CORS. En el código dado
> con Vite, hay un proxy preconfigurado para poder utilizar la API directamente
> ([saber más](#proxy-de-desarrollo)). Si utilizas tu propio servidor de
> desarrollo tendrás que configurar tu propio proxy.

### Tareas a realizar

Estas son las diferentes características que debes implementar, este listado es
simplemente una descripción de lo que encontrarás en el diseño.

Estás tareas no están en ningún orden concreto, organízalas como prefieras.

- Crea una sidebar con dos páginas.
    - La primera se llamará "Suscripción". Este componente lo puedes encontar
    en [este archivo](./code/src/pages/subscription.tsx), ese código funciona pero tiene problemas. Refáctorizalo
    como harías en una PR real.
    - La segunda será "Registro de llamadas" y muestra el listado de las llamadas recibidas.
    - Se debe marcar con un estilo distinto (consultar Figma) la página en la
    que nos encontramos.

- En esta sidebar, crea un "Selector de proyectos" que le permitirá al usuario
cambiar la API key que se usa en las peticiones. Cuando el usuario cambia de
proyecto, el contenido de la página debe recargarse de forma automática.

- En la página de Registro de llamadas, debes añadir un scroll infinito para cargar las
distintas páginas de llamadas que pudieran haber.

- Se deben manejar de forma distinta los estados de carga y los estados de error.

#### Extras

Si quieres, puedes implementar también las siguientes features:

- Skeletons de carga: implementa una animación de carga modo skeleton (ver diseño).
- Empty states: implementa un estado distinto para cuando el endpoint de listado
no devuelve nada.
- Unit testing: añade los tests de unidad que consideres.

## Recursos útiles

Aquí te dejamos algunos recursos que pueden ser útiles para el desarrollo de la prueba.

### Documentación de la API

A continuación se detallan los endpoints necesarios. Para la autenticación, deberás enviar la API Key seleccionada en los headers.

#### API Reference

##### 1. Listado de llamadas

Obtiene el historial de llamadas del proyecto.

`GET https://api.diga.io/v1/call`

**Headers**

| Key | Value |
| :--- | :--- |
| `Authorization` | `Bearer <API_KEY_DEL_SELECTOR>` |

**Query Parameters**

| Parámetro | Tipo | Descripción |
| :--- | :--- | :--- |
| `after` | `string` | ID del cursor para obtener los elementos posteriores. |
| `before` | `string` | ID del cursor para obtener los elementos anteriores. |
| `limit` | `number` | Número de elementos a obtener por página. |

**Ejemplo de respuesta (200 OK)**

```json
{
  "data": [
    {
      "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
      "agent_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
      "agent_version_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
      "status": "dialing",
      "type": "inbound",
      "contact": {
        "id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
        "created_date": "2023-11-07T05:31:56Z",
        "identifier": "+34600000000",
        "contact_type": "call"
      },
      "phone_register_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
      "created_date": "2023-11-07T05:31:56Z",
      "recording_url": "https://api.diga.io/recordings/sample.mp3",
      "start_time": "2023-11-07T05:31:56Z",
      "end_time": "2023-11-07T05:33:59Z",
      "duration": 123,
      "end_reason": "hangup"
    }
  ],
  "has_more": true,
  "first_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "last_id": "3c90c3cc-0d44-4b50-8888-8dd25736052a",
  "current_page": 1,
  "total_pages": 15
}
```

> 👉 Para más información consulta la [API reference de Calls](https://docs.diga.io/api-reference/calls/list-all-calls).

---

##### 2. Información de la suscripción

Obtiene los detalles de facturación y suscripción del proyecto actual.

`GET https://api.diga.io/v1/billing/subscription`

**Headers**

| Key | Value |
| :--- | :--- |
| `Authorization` | `Bearer <API_KEY_DEL_SELECTOR>` |

**Ejemplo de respuesta (200 OK)**

```json
{
  "name": "Pro Plan",
  "next_invoice_date": "2023-12-07T05:31:56Z",
  "period_start": "2023-11-07T05:31:56Z",
  "period_end": "2023-12-07T05:31:56Z",
  "included_minutes": 1000,
  "active_since": "2023-01-07T05:31:56Z",
  "price": 5000,
  "currency": "EUR",
  "period": "month",
  "overage_price_per_minute": 0.05,
  "usage_based_billing_enabled": true,
  "minutes_count": 450,
  "rollover_minutes_count": 0,
  "next_payment_date": "2023-12-07T05:31:56Z",
  "next_invoice_amount": 5000,
  "next_phase": {
    "name": "Pro Plan",
    "period": "month",
    "price": 5000
  }
}
```

> 👉 Para más información consulta la [API reference de Billing](https://docs.diga.io/api-reference/billing--subscriptions/get-subscription).

---

### Proxy de desarrollo

> [!WARNING]
> Nuestra API no devuelve `localhost` en los headers de CORS. Si utilizas el
> código base proporcionado con Vite, hay un proxy preconfigurado que puedes
> usar. Si utilizas tu propio servidor de desarrollo tendrás que configurar
> tu propio proxy.

El proxy está configurado en `code/vite.config.ts` y redirige todas las peticiones
que empiecen por `/api` hacia `https://api.diga.io`, eliminando el prefijo `/api`
de la ruta.

**Ejemplo de uso:**

```typescript
// En tu código, en lugar de llamar directamente a la API:
fetch("https://api.diga.io/v1/billing/subscription", { ... })

// Usa el proxy con el prefijo /api:
fetch("/api/v1/billing/subscription", { ... })
```

El proxy se encargará de:
- Redirigir la petición a `https://api.diga.io/v1/billing/subscription`
- Añadir los headers de CORS necesarios
- Mantener la conexión segura (HTTPS)

---

### Documentación de librerías

- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vite.dev/guide/)
- [Untitled UI Components](https://www.untitledui.com/react/components)

También puedes usar cualquier recurso externo o herramienta que consideres
(LLMs, Stack Overflow...)

---

### API Keys

El selector debe ofrecer las siguientes API keys:
- sk-944645d244ddfa2890b77f2c1262e595d1aa6ad89a8d3775cb29c036dba9d55d
- sk-f0d89d3b2924ea11f47db647e9090bec96e4c13db9b9094d9032c31910842a61
- sk-7ae237700e65605e400e32e42811130acf34a7aefbc8eb42c10107faba758e91

Estas son API keys de proyectos reales en Diga. Tienen llamadas y suscripciones
simuladas con las que podrás trabajar en la prueba.

---

## Otras anotaciones

- A pesar de que tenemos un endpoint para obtener el nombre del proyecto, no es
necesario que lo uses. Puedes mostrar los primeros 10 caracteres de cada API key
en el selector.
- La API key seleccionada puede ser guardada en memoria, no hace falta que la
guardes en el localStorage.
- Puedes encontar algunos recursos (como nuestro logo para la sidebar) en el
directorio public.
- Tienes clases ya creadas con los colores que se usan en Figma, así como
clases con los tamaños de letra y fuentes preconfiguradas.
- Las librerías react-router-dom y @react-types/overlays vienen como
dependencia.
- Untitled tiene algunas funciones predefinidas que puedes ayudarte en
[este directorio](./code/src/utils). Por ejemplo `cx` para unir clases.
