# Memorgana

Note taking app intended pour l'apprentissage de la français.

Rewrite of the old Deno project.

## CRA + Router V6 + Tailwind

## All `Create-react-app` scripts applies.

---

# Structure

```
.
│ prettierrrc.json # empty, indicator of prettier formatter
│ tailwind.config.js # tailwind config
│
└───/src
│ │ App.tsx
│ │ index.css # imports tailwind, scroll bar style
│ │
│ └───/types # typescirpt interfaces
│ │
│ └───/routes # React Router "route"s with the same names
│ │
│ └───/providers # deprecated, placeholder
│ │
│ └───/hooks # custom hooks
│ │
│ └───/helpers # app wide helper functions such as logger


```

---
