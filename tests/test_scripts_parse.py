"""Smoke tests — verify all Python scripts parse and key functions exist."""

import ast
import sys
from pathlib import Path

SCRIPTS_DIR = Path(__file__).parent.parent / "scripts"


def _get_python_scripts():
    return sorted(SCRIPTS_DIR.glob("*.py"))


def test_all_scripts_parse():
    """Every .py file in scripts/ must be valid Python."""
    for script in _get_python_scripts():
        source = script.read_text()
        try:
            ast.parse(source, filename=str(script))
        except SyntaxError as e:
            raise AssertionError(f"{script.name} has a syntax error: {e}") from e


def test_all_scripts_have_docstrings():
    """Every script should have a module-level docstring."""
    for script in _get_python_scripts():
        source = script.read_text()
        tree = ast.parse(source)
        docstring = ast.get_docstring(tree)
        assert docstring, f"{script.name} is missing a module docstring"


def test_run_py_has_main():
    """run.py must have a main() or if __name__ == '__main__' block."""
    run_py = SCRIPTS_DIR / "run.py"
    source = run_py.read_text()
    assert '__name__' in source and '__main__' in source, (
        "run.py must have an if __name__ == '__main__' block"
    )


def test_scripts_use_argparse():
    """Scripts that accept CLI args should use argparse."""
    for script in _get_python_scripts():
        source = script.read_text()
        # Skip files that don't have CLI interfaces
        if "if __name__" not in source:
            continue
        if "--" in source:
            assert "argparse" in source or "ArgumentParser" in source, (
                f"{script.name} uses CLI flags but doesn't import argparse"
            )
