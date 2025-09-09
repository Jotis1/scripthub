# Conventional Commits Guide and Best Practices

## Commit Message Structure

```text
<type>[optional scope]: <brief description in imperative mood>

[optional body]

[optional footer]
```

## Recommended Prefixes
- **feat**: new functionality or feature
- **fix**: bug fixes or error corrections
- **docs**: documentation changes only
- **style**: formatting/code changes that don't affect logic
- **refactor**: internal improvements without changing functionality
- **test**: adding or modifying tests
- **perf**: performance improvements
- **chore**: minor or administrative tasks
- **build**: changes to build system/packaging
- **ci**: continuous integration adjustments

## Example

```text
feat(login): add two-factor authentication

Add a two-factor authentication system to improve login security.

BREAKING CHANGE: The /login endpoint now requires an additional code.
```

## Writing Best Practices
- The title (initial line) should be clear, imperative, and concise (max 50 characters).
- Use scope if the change impacts a specific module or area.
- Add a body explaining reasoning and context if necessary.
- Use footer for critical clarifications like breaking changes (BREAKING CHANGE).
- Be consistent with the chosen convention throughout the project.
- Make atomic commits and avoid mixing disparate changes in the same commit.
- Don't end the title with a period.