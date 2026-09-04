# Versioning

mlbb-api follows [Semantic Versioning](https://semver.org/) for released versions.

A version has the format `MAJOR.MINOR.PATCH`:

- `MAJOR`: incompatible API or behavior changes.
- `MINOR`: backward-compatible functionality additions.
- `PATCH`: backward-compatible bug fixes and corrections.

For example, changing `1.4.2` to `1.4.3` represents a patch release, while changing it to `1.5.0` represents a backward-compatible feature release.

## Pre-1.0 Releases

While the project is under development, the API may change between releases. Before version `1.0.0`, minor-version changes may include breaking changes when necessary.

## Release Guidelines

- Update the version in `package.json` when preparing a release.
- Document user-facing changes in the release notes or changelog.
- Keep API-breaking changes clearly identified.
- Use the `dev` branch for ongoing work and pull requests, as described in [CONTRIBUTING.md](CONTRIBUTING.md).
