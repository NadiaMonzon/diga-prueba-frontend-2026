# Frontend Technical Test January 2026

[Leer este archivo en español aquí.](README.md)

## Description

In this test, you will implement a design from Figma, the software you will be using alongside the design team at Diga.

The test consists of implementing a small dashboard that simulates the real functionality of our product: analyzing statistics and call details. You have one hour to complete it.

> [!note]
> **Duration of the exercise**
> Although you only have **one hour** to complete the exercise, it is designed to take longer. Do not worry if you are unable to finish. We want to evaluate your ability to prioritize and assess the importance of tasks.

## What does the task consist of?

You must implement this [Figma design](https://figma.com), using **React with TS** and **Tailwind CSS**.

You can start from this repository, which includes a default Vite installation pre-configured with TS and Tailwind installed. You can also find components from *Untitled*, the library we use at Diga.

This is the stack you will work with at the company; however, you can perform the test completely from scratch as long as you use **React 19**, **TypeScript** and **Tailwind CSS**.

### Tasks to perform

These are the features you must implement. This list is simply a description of what you will find in the design.

These tasks are not in any specific order; organize them as you prefer.

- **Create a sidebar with two pages.**
    - The first one will be called "Subscription". You can find this component in `componente.tsx`. That code works but has issues. **Refactor it** as you would in a real PR.
    - The second one will be "List", showing the list of received calls.

- **Project Selector:** inside the sidebar, create a "Project Selector" that allows the user to change the API key used in requests. When the user switches projects, the page content must **reload automatically**.

- **Infinite Scroll:** On the list page, add an infinite scroll to load the different pages of calls that might exist.

- **State Handling:** Loading states and error states must be handled differently and explicitly.

#### Extras

If you wish, you can also implement the following features:

- **Loading Skeletons:** Implement a skeleton-mode loading animation (see design).
- **Empty States:** Implement a distinct state for when the listing endpoint returns nothing.
- **Unit Testing:** Add any unit tests you consider necessary.

## Useful Resources

Here are some resources that may be useful for the development of the test.

### API Documentation

The necessary endpoints are detailed below. For authentication, you must send the selected **API Key** in the headers.

#### 1. List Calls

Retrieves the project's call history.

`GET https://api.diga.io/v1/call`

**Headers**

| Key | Value |
| :--- | :--- |
| `Authorization` | `Bearer <API_KEY_FROM_SELECTOR>` |

**Query Parameters**

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `after` | `string` | Cursor ID to fetch subsequent items. |
| `before` | `string` | Cursor ID to fetch previous items. |
| `limit` | `number` | Number of items to fetch per page. |

**Response Example (200 OK)**

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
      "recording_url": "[https://api.diga.io/recordings/sample.mp3](https://api.diga.io/recordings/sample.mp3)",
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

> 👉 For more information, check the [Calls API reference](https://docs.diga.io/api-reference/calls/list-all-calls).

---

#### 2. Subscription Information

Retrieves the billing and subscription details of the current project.

`GET https://api.diga.io/v1/billing/subscription`

**Headers**

| Key | Value |
| :--- | :--- |
| `Authorization` | `Bearer <API_KEY_FROM_SELECTOR>` |

**Response Example (200 OK)**

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

> 👉 For more information, check the [Billing API reference](https://docs.diga.io/api-reference/billing--subscriptions/get-subscription).

---

### Library Documentation

- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vite.dev/guide/)
- [Untitled UI Components](https://www.untitledui.com/react/components)

You may also use any external resource or tool you consider necessary (LLMs, Stack Overflow, etc.).
