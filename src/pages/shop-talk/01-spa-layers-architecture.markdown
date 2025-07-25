---
layout: ../../layouts/ShopTalkLayout.astro
slug: "spa-layers-architecture"
title: "Single Page Application Layers & Architecture"
description: "I built Lunar Phase to track moon cycles, but let’s be honest—it was mostly a convenient excuse to showcase the anatomy of a SPA: from React components orbiting the presentation layer, to services handling fetch calls like Apollo missions, state management waxing and waning, routing via React Router constellations, and business logic pulling it all together like gravity."
repo: "https://github.com/kencrocken/lunar_phase"
projectSite: "https://kencrocken.github.io/lunar_phase"
---

In the architecture of a **Single Page Application (SPA)**, there are typically multiple layers that each serve distinct roles in maintaining modularity, separation of concerns, and scalability. Here’s a breakdown of the common layers and how they interact, especially in the context of React (and similar frameworks) with hooks interacting with the service layer.

## 1. Presentation Layer (UI Layer)

- **Purpose**: This layer is responsible for rendering the user interface. It includes all the components responsible for displaying content and capturing user input.
- **How It Works**: The UI is typically built with React components (functional or class-based). These components can be atomic (buttons, inputs) or more complex containers (forms, lists).
- **Hooks in Use**: At this level, hooks like `useState` and `useEffect` are used to manage local component state and side effects, like fetching data on component mount.

## 2. State Management Layer

- **Purpose**: This layer manages the global or application-wide state. It could involve tools like **React’s Context API**, **Redux**, or other state management libraries.
- **How It Works**: The state layer keeps track of the overall state of the application (like authenticated users, form inputs, and fetched data) and allows different parts of the app to access and modify that state without the need for direct prop drilling.
- **Hooks in Use**:
  - `useContext` to access data from a React Context.
  - `useReducer` to manage complex state transitions.
  - `useSelector` and `useDispatch` for accessing and updating Redux state.
  - Custom hooks to abstract repeated state logic or combine different hooks into one reusable package.

## 3. Service Layer (Data Layer)

- **Purpose**: The service layer handles the interaction with external APIs, databases, or any form of asynchronous data fetching and manipulation. This layer abstracts away the direct interaction with the API from the UI components.
- **How It Works**: This layer typically consists of service modules that handle API calls (via `fetch`, `axios`, etc.) and returns structured data or handles errors. You want to abstract the raw data fetching so your components are not tied to the details of the API.
- **Hooks in Use**:

  - **Custom Hooks for Services**: You often create **custom hooks** that interact with this service layer. For example, a `useFetchData` hook might encapsulate the logic for calling an API, handling loading states, caching, and error handling.
  - These custom hooks call functions from the service layer and provide the UI layer with the needed data, error state, and loading state.
  - Example of a custom hook:

    ```jsx
    function useFetchData(url) {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(url);
            const result = await response.json();
            setData(result);
          } catch (err) {
            setError(err);
          } finally {
            setLoading(false);
          }
        };

        fetchData();
      }, [url]);

      return { data, loading, error };
    }
    ```

  - **Interaction**: This hook abstracts the service call, so the component that uses it doesn’t care about how the data is fetched. It only concerns itself with the `data`, `loading`, and `error` states.

## 4. Business Logic Layer

- **Purpose**: This layer encapsulates the core business logic and rules that govern how data should be processed and interacted with. While often combined with the service layer, it can be kept separate to maintain a clean architecture.
- **How It Works**: For example, if you need to calculate tax based on a user’s location or determine if a user is eligible for a discount, that logic would reside here.
- **Hooks in Use**: You might use custom hooks or functions within this layer, often passing the data from the service layer, transforming it according to the business rules, and then passing it back to the state or presentation layer. Custom hooks in this case can encapsulate business rules alongside data fetching.

## 5. Routing Layer

- **Purpose**: Responsible for determining which view or component is displayed based on the URL (client-side routing).
- **How It Works**: In React, you often use libraries like **React Router** to manage routes. This layer listens for changes in the browser history and updates the UI accordingly.
- **Hooks in Use**:
  - `useParams`, `useLocation`, `useHistory`, and `useRouteMatch` from **React Router** are used to manage routing-related logic.

## Example Workflow

1. **User Interaction**: A user clicks a button to fetch some data.
2. **UI Layer**: The button click triggers an action in a React component.
3. **State Management Layer**: The component may update some local state using `useState` or trigger a global state update through a dispatch (`useReducer` or `useDispatch`).
4. **Service Layer**: A custom hook (like `useFetchData`) calls the service layer to fetch data from an API.
5. **Business Logic Layer**: If there’s any transformation required (e.g., filtering or sorting the fetched data), the business logic layer will handle that.
6. **UI Update**: Once the data is returned and processed, it is passed back to the UI layer to update the state and re-render the component.

## Key Takeaways

- **Custom Hooks** provide a way to encapsulate and reuse logic across the app. They interact with both the service layer (for data fetching) and the business logic layer (for data manipulation).
- **State Management Hooks** (like `useReducer` or `useContext`) allow components to subscribe to or modify global state.
- **Side-Effect Hooks** (`useEffect`) are typically used in conjunction with service layer calls to trigger asynchronous data fetching when components mount or update.

This architecture separates concerns, improves reusability, and provides a scalable way to manage data flow and interactions in a SPA.
