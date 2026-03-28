"""Validate that sample data files are well-formed."""

import csv
import json
from pathlib import Path

ASSETS_DIR = Path(__file__).parent.parent / "assets"


def test_sample_kpis_valid_json():
    """sample-kpis.json must be valid JSON with expected structure."""
    data = json.loads((ASSETS_DIR / "sample-kpis.json").read_text())
    assert isinstance(data, (list, dict)), "sample-kpis.json must be a list or dict"


def test_sample_assessments_valid_json():
    """sample-assessments.json must be valid JSON."""
    data = json.loads((ASSETS_DIR / "sample-assessments.json").read_text())
    assert isinstance(data, (list, dict)), "sample-assessments.json must be a list or dict"


def test_benchmark_csv_valid():
    """benchmark-data.csv must be parseable CSV with headers."""
    path = ASSETS_DIR / "benchmark-data.csv"
    with open(path, newline="") as f:
        reader = csv.reader(f)
        headers = next(reader)
        assert len(headers) >= 2, "benchmark-data.csv must have at least 2 columns"
        rows = list(reader)
        assert len(rows) >= 1, "benchmark-data.csv must have at least 1 data row"


def test_department_catalog_csv_valid():
    """department-catalog.csv must be parseable CSV."""
    path = ASSETS_DIR / "department-catalog.csv"
    with open(path, newline="") as f:
        reader = csv.reader(f)
        headers = next(reader)
        assert len(headers) >= 1, "department-catalog.csv must have headers"
        rows = list(reader)
        assert len(rows) >= 10, "Should have at least 10 departments"


def test_evals_valid_json():
    """evals.json must be valid JSON with test scenarios."""
    data = json.loads((ASSETS_DIR.parent / "evals" / "evals.json").read_text())
    assert isinstance(data, (list, dict)), "evals.json must be a list or dict"
