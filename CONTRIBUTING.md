# Contributing to mlbb-api

Thank you for your interest in contributing! Please follow the guidelines below.

## Getting Started

1. Fork the repository.
2. Clone your fork locally.
3. Switch to the `dev` branch:

   ```bash
   git checkout dev
   ```

4. Create a new branch from ``dev`` for your changes:

   ```bash
   git checkout -b feature/your-change
   ```

5. Install dependencies and configure the project according to the README.

## Making Changes

- Keep changes focused and consistent with the existing code style.
- Update documentation when behavior or APIs change.
- Add or update tests for new functionality and bug fixes.
- Do not commit secrets, generated files, or unrelated changes.

## Commit Messages

Use clear, concise commit messages. For example:

```text
feat: add hero statistics endpoint
fix: for fixing bugs and errors
docs: update API usage examples
chore: corrected mistakes
```

## Pull Requests

Always open pull requests on ``dev`` branch (any PR on ``master`` branch directly will be declined)  
Before opening a pull request:
- Ensure tests and lint checks pass.
- Rebase or update your branch with the latest target branch.
- Describe what changed and why.
- Include relevant issue numbers and testing details.

Pull requests may be reviewed, revised, or declined if they do not meet the project's requirements.

## Reporting Issues

Use the issue tracker to report bugs or request features. Include:

- A clear title and description
- Steps to reproduce, when applicable
- Expected and actual behavior
- Relevant logs, screenshots, or environment details

## Code of Conduct

Please be respectful and constructive in all project interactions. Contributions must follow the project's [Code of Conduct](CODE_OF_CONDUCT.md).

See [VERSIONING.md](VERSIONING.md) for the project's Semantic Versioning guidelines.

## Questions

For questions, open a discussion or issue with enough context for others to help.