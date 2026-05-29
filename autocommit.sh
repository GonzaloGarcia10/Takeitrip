#!/bin/bash

git add .

STATUS=$(git status --porcelain)

if [ -z "$STATUS" ]; then
  echo "No hay cambios para commitear"
  exit 0
fi

# Analizar archivos cambiados
CHANGED_FILES=$(git diff --cached --name-only)
DIFF_STAT=$(git diff --cached --stat)

# Detectar tipo de cambio
TYPE="chore"
SCOPE=""

# Detectar por archivos modificados
if echo "$CHANGED_FILES" | grep -qE "^src/app/.*\.tsx?$"; then
  TYPE="feat"
  SCOPE="ui"
fi

if echo "$CHANGED_FILES" | grep -qE "^src/app/api/"; then
  TYPE="feat"
  SCOPE="api"
fi

if echo "$CHANGED_FILES" | grep -qE "^src/components/"; then
  TYPE="feat"
  SCOPE="components"
fi

if echo "$CHANGED_FILES" | grep -qE "^src/lib/"; then
  TYPE="refactor"
  SCOPE="lib"
fi

if echo "$CHANGED_FILES" | grep -qE "\.(test|spec)\.(ts|tsx|js)$"; then
  TYPE="test"
fi

if echo "$CHANGED_FILES" | grep -qE "\.(md|txt)$"; then
  TYPE="docs"
fi

if echo "$CHANGED_FILES" | grep -qE "^(package\.json|package-lock\.json|yarn\.lock|pnpm-lock\.yaml)$"; then
  TYPE="chore"
  SCOPE="deps"
fi

if echo "$CHANGED_FILES" | grep -qE "^(next\.config|tsconfig|tailwind\.config)"; then
  TYPE="chore"
  SCOPE="config"
fi

if echo "$CHANGED_FILES" | grep -qE "^src/app/globals\.css$"; then
  TYPE="style"
fi

if echo "$CHANGED_FILES" | grep -qE "^prisma/"; then
  TYPE="chore"
  SCOPE="db"
fi

# Generar descripción basada en archivos
DESCRIPTION="update"

if [ "$SCOPE" = "ui" ]; then
  FIRST_PAGE=$(echo "$CHANGED_FILES" | grep -oE "src/app/[^/]+/[^/]+\.tsx" | head -1 | sed 's|src/app/||; s|/page\.tsx||; s|\.tsx||')
  DESCRIPTION="update $FIRST_PAGE page"
fi

if [ "$SCOPE" = "api" ]; then
  FIRST_ENDPOINT=$(echo "$CHANGED_FILES" | grep -oE "src/app/api/[^/]+/[^/]+\.ts" | head -1 | sed 's|src/app/api/||; s|/route\.ts||')
  DESCRIPTION="update $FIRST_ENDPOINT endpoint"
fi

if [ "$SCOPE" = "components" ]; then
  FIRST_COMP=$(echo "$CHANGED_FILES" | grep -oE "src/components/[^/]+/[^/]+\.tsx" | head -1 | sed 's|src/components/||; s|\.tsx||')
  DESCRIPTION="update $FIRST_COMP component"
fi

if [ "$SCOPE" = "deps" ]; then
  DESCRIPTION="update dependencies"
fi

if [ "$SCOPE" = "config" ]; then
  DESCRIPTION="update configuration"
fi

if [ "$SCOPE" = "db" ]; then
  DESCRIPTION="update database schema"
fi

# Si hay múltiples archivos, agregar count
FILE_COUNT=$(echo "$CHANGED_FILES" | wc -l | tr -d ' ')
if [ "$FILE_COUNT" -gt 3 ]; then
  DESCRIPTION="$DESCRIPTION and $((FILE_COUNT - 1)) more files"
fi

# Construir mensaje
if [ -n "$SCOPE" ]; then
  MESSAGE="$TYPE($SCOPE): $DESCRIPTION"
else
  MESSAGE="$TYPE: $DESCRIPTION"
fi

echo "📝 Commit: $MESSAGE"
echo ""
echo "Archivos:"
echo "$DIFF_STAT"
echo ""

git commit -m "$MESSAGE"
git push origin main

echo "✔ Autocommit realizado"
