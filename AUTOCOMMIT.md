# 🚀 AUTOCOMMIT SYSTEM (Git + Conventional Commits + IA Ready)

Este documento define un sistema estándar para commits consistentes, claros y profesionales.

El objetivo es mantener un historial limpio, escalable y fácil de entender.

---

# 📌 1. FORMATO DE COMMITS

Todos los commits deben seguir este estándar:


<tipo>(<scope opcional>): <mensaje corto>


### Ejemplo:


feat(auth): add login with Google
fix(chat): resolve duplicate messages bug
refactor(api): simplify OpenAI handler
docs: update installation guide


---

# 🧩 2. TIPOS DE COMMIT

| Tipo     | Significado |
|----------|------------|
| feat     | Nueva funcionalidad |
| fix      | Corrección de errores |
| refactor | Cambio interno sin cambiar comportamiento |
| style    | Cambios de formato (CSS, indentación) |
| docs     | Documentación |
| test     | Tests |
| chore    | Tareas de mantenimiento (deps, config) |
| perf     | Mejora de rendimiento |
| build    | Build o compilación |
| ci       | Integración continua |

---

# 📦 3. EJEMPLOS REALES


feat(chat): implement OpenAI streaming responses
feat(hotels): add booking affiliate system
fix(ui): fix mobile responsive layout
refactor(api): restructure OpenAI service layer
docs: update setup instructions
chore: update dependencies
perf(search): improve query performance


---

# ⚙️ 4. AUTOCOMMIT SCRIPT (BASIC)

Guarda esto como `autocommit.sh`:

```bash
#!/bin/bash

git add .

STATUS=$(git status --porcelain)

if [ -z "$STATUS" ]; then
  echo "No changes to commit"
  exit 0
fi

MESSAGE="chore(auto): $(date '+%Y-%m-%d %H:%M:%S')"

git commit -m "$MESSAGE"
git push origin main

echo "✔ Autocommit realizado"