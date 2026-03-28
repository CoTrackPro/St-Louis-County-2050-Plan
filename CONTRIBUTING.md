# Contributing to STL County KPI

Thank you for your interest in improving government performance tools! This project welcomes contributions from government employees, civic technologists, data analysts, and anyone who wants to help counties work better.

## Getting Started

1. **Fork** the repository
2. **Clone** your fork locally
3. **Run the demo** to verify everything works:
   ```bash
   bash scripts/demo.sh
   ```

## Development Setup

Python 3.9+ is the only requirement — all scripts use the standard library.

```bash
# Optional: set up linting and formatting
pip install ruff mypy

# Lint
ruff check scripts/

# Type check
mypy scripts/ --ignore-missing-imports
```

## How to Contribute

### Reporting Issues
- Use GitHub Issues for bugs, feature requests, and questions
- Include which script/command is affected and steps to reproduce
- For KPI-related issues, note the department and KPI ID

### Adding a New KPI
1. Add the KPI definition to `references/kpi-framework.md`
2. Add benchmark data to `assets/benchmark-data.csv`
3. Update scoring logic in `scripts/kpi_scorer.py` if needed
4. Add an eval scenario to `evals/evals.json`

### Adding a New Department
1. Add to `assets/department-catalog.csv`
2. Add KPIs to `references/kpi-framework.md`
3. Add KSAB competencies to `references/workforce-development.md`
4. Update journey maps in `references/constituent-journeys.md` if relevant

### Adding a New Script
1. Follow the existing pattern: `argparse` with `--input`, `--output`, `--format`, `--department`
2. Use only the Python standard library
3. Add a docstring at the top explaining usage
4. Add it to `scripts/run.py` if it fits the pipeline
5. Add an eval scenario to `evals/evals.json`

### Forking for Another County
See [FORK_GUIDE.md](FORK_GUIDE.md) for step-by-step instructions.

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes with clear commit messages
3. Run `bash scripts/demo.sh` to verify nothing breaks
4. Run `ruff check scripts/` to check for lint issues
5. Open a PR with:
   - **What** changed and **why**
   - Which departments/KPIs are affected
   - How you tested it

## Code Style

- Python 3.9+ with type hints on function signatures
- Docstrings on all public functions
- No external dependencies — standard library only
- Consistent CLI interfaces via `argparse`
- JSON for data interchange between scripts

## Community Standards

- Be respectful and constructive
- Government data should be accurate — cite sources
- Respect the privacy constraints in `references/missouri-legal-context.md`
- When in doubt, ask — open an issue for discussion before large changes

## Questions?

Open a GitHub Issue or check the existing documentation in `references/`.
