#!/bin/bash

git add .

STATUS=$(git status --porcelain)

if [ -z "$STATUS" ]; then
  echo "No hay cambios para commitear"
  exit 0
fi

MESSAGE="chore(auto): $(date '+%Y-%m-%d %H:%M:%S')"

git commit -m "$MESSAGE"
git push origin main

echo "✔ Autocommit realizado"
