# Guía de Commits Convencionales y buenas prácticas

## Estructura del mensaje de commit

```text
<tipo>[ámbito opcional]: <descripción breve en modo imperativo>

[cuerpo opcional]

[nota de pie opcional]
```

## Prefijos Recomendados
- **feat**: nueva funcionalidad o característica
- **fix**: corrección de errores o bugs
- **docs**: edición exclusiva de documentación
- **style**: cambios de formato/código sin afectar la lógica
- **refactor**: mejoras internas sin modificar funcionalidad
- **test**: cambios o adición de tests
- **perf**: mejoras de rendimiento
- **chore**: tareas menores o administrativas
- **build**: cambios en el sistema de construcción/paquetería
- **ci**: ajustes a la integración continua

## Ejemplo

```text
feat(login): añadir verificación de dos pasos

Se agrega un sistema de autenticación de doble factor para mejorar la seguridad de inicio de sesión.

BREAKING CHANGE: El endpoint /login ahora requiere un código adicional.
```

## Buenas prácticas de redacción
- El título (línea inicial) debe ser claro, imperativo y conciso (máx. 50 caracteres).
- Usa el ámbito si el cambio impacta un módulo o área específica.
- Si es necesario, agrega un cuerpo explicando el razonamiento y contexto.
- Usa el pie de nota para aclaraciones críticas, como cambios incompatibles (BREAKING CHANGE).
- Se consistente con la convención elegida para todo el proyecto.
- Haz commits atómicos y evita mezclar cambios dispares en el mismo commit.
- No termines el título con punto final.