/**
 * Data invariant tests
 *
 * These are fast, zero-network tests that assert every data file exports
 * well-formed arrays / records with the expected shapes.  They catch typos,
 * missing required fields, and broken imports before the code ever runs.
 */

import { describe, it, expect } from "vitest";

// ─── imports ────────────────────────────────────────────────────────────────
import { NAV }                       from "@/data/nav";
import { ROLES }                     from "@/data/roles";
import { FAQ_CATEGORIES, TESTIMONIALS, IMPACT_METRICS } from "@/data/content";
import { PLANS, NEWSLETTER_URL }     from "@/data/billing";
import { MODULES }                   from "@/data/dashboard";
import { SOCIAL, FOOTER_COLS }       from "@/data/footer";
import { QUIZ_BANK }                 from "@/data/quizBank";
import { SCRIPT_TEMPLATES, GENERIC_TEMPLATES, COMMON_OBJECTIONS } from "@/data/scripts";
import { BRIDGES_TOOLS, MENTAL_TOOLS, LEGAL_TOOLS } from "@/data/modules";
import { COACHING_PACKAGES } from "@/data/coaching";
import { CONTACT_OPTIONS } from "@/data/contact";
import { VALUES } from "@/data/mission";
import { PARTNER_TYPES, BENEFITS } from "@/data/partner";
import { DASHBOARD_NAV } from "@/data/dashboard";

// ─── NAV ────────────────────────────────────────────────────────────────────

describe("NAV (data/nav.ts)", () => {
  it("is a non-empty array", () => {
    expect(NAV.length).toBeGreaterThan(0);
  });

  it("every entry has id, label and type", () => {
    NAV.forEach((cat) => {
      expect(cat.id).toBeTruthy();
      expect(cat.label).toBeTruthy();
      expect(["dropdown", "link"]).toContain(cat.type);
    });
  });

  it("link-type entries have href", () => {
    NAV.filter((c) => c.type === "link").forEach((cat) => {
      expect(cat.href).toMatch(/^\//);
    });
  });

  it("dropdown-type entries have at least one item", () => {
    NAV.filter((c) => c.type === "dropdown").forEach((cat) => {
      expect(cat.items?.length).toBeGreaterThan(0);
    });
  });

  it("every dropdown item has label and href", () => {
    NAV.filter((c) => c.type === "dropdown").flatMap((c) => c.items ?? []).forEach((item) => {
      expect(item.label).toBeTruthy();
      expect(item.href).toBeTruthy();
    });
  });

  it("no duplicate category ids", () => {
    const ids = NAV.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

// ─── ROLES ──────────────────────────────────────────────────────────────────

describe("ROLES (data/roles.ts)", () => {
  it("is a non-empty array", () => {
    expect(ROLES.length).toBeGreaterThan(0);
  });

  it("every role has id, title, description, gradient, accentColor", () => {
    ROLES.forEach((r) => {
      expect(r.id).toBeTruthy();
      expect(r.title).toBeTruthy();
      expect(r.description).toBeTruthy();
      expect(r.gradient).toMatch(/radial-gradient|linear-gradient/);
      expect(r.accentColor).toBeTruthy();
    });
  });

  it("every role has whyNow array with at least one item", () => {
    ROLES.forEach((r) => {
      expect(r.whyNow.length).toBeGreaterThan(0);
    });
  });

  it("every role has at least one action (primary+secondary or single)", () => {
    ROLES.forEach((r) => {
      const hasDouble = r.primaryAction && r.secondaryAction;
      const hasSingle = r.singleAction;
      expect(hasDouble || hasSingle).toBeTruthy();
    });
  });

  it("no duplicate role ids", () => {
    const ids = ROLES.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

// ─── FAQ_CATEGORIES ─────────────────────────────────────────────────────────

describe("FAQ_CATEGORIES (data/content.ts)", () => {
  it("is a non-empty array", () => {
    expect(FAQ_CATEGORIES.length).toBeGreaterThan(0);
  });

  it("every category has id, label, and items", () => {
    FAQ_CATEGORIES.forEach((cat) => {
      expect(cat.id).toBeTruthy();
      expect(cat.label).toBeTruthy();
      expect(cat.items.length).toBeGreaterThan(0);
    });
  });

  it("every FAQ item has question and answer", () => {
    FAQ_CATEGORIES.flatMap((c) => c.items).forEach((item) => {
      expect(item.question).toBeTruthy();
      expect(item.answer).toBeTruthy();
    });
  });

  it("no duplicate category ids", () => {
    const ids = FAQ_CATEGORIES.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

// ─── TESTIMONIALS ──────────────────────────────────────────────────────────

describe("TESTIMONIALS (data/content.ts)", () => {
  it("is non-empty", () => {
    expect(TESTIMONIALS.length).toBeGreaterThan(0);
  });

  it("every testimonial has author, role, and quote", () => {
    TESTIMONIALS.forEach((t) => {
      expect(t.author).toBeTruthy();
      expect(t.role).toBeTruthy();
      expect(t.quote).toBeTruthy();
    });
  });

  it("no duplicate authors", () => {
    const authors = TESTIMONIALS.map((t) => t.author);
    expect(new Set(authors).size).toBe(authors.length);
  });
});

// ─── IMPACT_METRICS ─────────────────────────────────────────────────────────

describe("IMPACT_METRICS (data/content.ts)", () => {
  it("is non-empty", () => {
    expect(IMPACT_METRICS.length).toBeGreaterThan(0);
  });

  it("every metric has label and value", () => {
    IMPACT_METRICS.forEach((m) => {
      expect(m.label).toBeTruthy();
      expect(m.value).toBeTruthy();
    });
  });
});

// ─── PLANS ──────────────────────────────────────────────────────────────────

describe("PLANS (data/billing.ts)", () => {
  it("has exactly 4 plans", () => {
    expect(PLANS).toHaveLength(4);
  });

  it("every plan has required fields", () => {
    PLANS.forEach((p) => {
      expect(p.key).toBeTruthy();
      expect(p.tier).toBeTruthy();
      expect(["monthly", "annual"]).toContain(p.billing);
      expect(p.name).toBeTruthy();
      expect(p.icon).toBeTruthy();
      expect(p.features.length).toBeGreaterThan(0);
    });
  });

  it("contains parent and professional tiers", () => {
    const tiers = [...new Set(PLANS.map((p) => p.tier))];
    expect(tiers).toContain("parent");
    expect(tiers).toContain("professional");
  });

  it("contains both monthly and annual billing periods", () => {
    const billings = [...new Set(PLANS.map((p) => p.billing))];
    expect(billings).toContain("monthly");
    expect(billings).toContain("annual");
  });

  it("NEWSLETTER_URL is a valid https URL", () => {
    expect(NEWSLETTER_URL).toMatch(/^https:\/\//);
  });
});

// ─── MODULES ────────────────────────────────────────────────────────────────

describe("MODULES (data/dashboard.ts)", () => {
  it("has exactly 3 modules", () => {
    expect(MODULES).toHaveLength(3);
  });

  it("every module has key, href, icon, label, desc", () => {
    MODULES.forEach((m) => {
      expect(m.key).toBeTruthy();
      expect(m.href).toMatch(/^\//);
      expect(m.icon).toBeTruthy();
      expect(m.label).toBeTruthy();
      expect(m.desc).toBeTruthy();
    });
  });

  it("no duplicate module keys", () => {
    const keys = MODULES.map((m) => m.key);
    expect(new Set(keys).size).toBe(keys.length);
  });
});

// ─── SOCIAL ─────────────────────────────────────────────────────────────────

describe("SOCIAL (data/footer.ts)", () => {
  it("is non-empty", () => {
    expect(SOCIAL.length).toBeGreaterThan(0);
  });

  it("every social link has href, icon, label", () => {
    SOCIAL.forEach((s) => {
      expect(s.href).toBeTruthy();
      expect(s.icon).toBeDefined();
      expect(s.label).toBeTruthy();
    });
  });
});

// ─── FOOTER_COLS ────────────────────────────────────────────────────────────

describe("FOOTER_COLS (data/footer.ts)", () => {
  it("has exactly 4 columns", () => {
    expect(FOOTER_COLS).toHaveLength(4);
  });

  it("every column has heading and at least one link", () => {
    FOOTER_COLS.forEach((col) => {
      expect(col.heading).toBeTruthy();
      expect(col.links.length).toBeGreaterThan(0);
    });
  });

  it("every link has label and href starting with /", () => {
    FOOTER_COLS.flatMap((c) => c.links).forEach((l) => {
      expect(l.label).toBeTruthy();
      expect(l.href).toMatch(/^\//);
    });
  });
});

// ─── QUIZ_BANK ──────────────────────────────────────────────────────────────

describe("QUIZ_BANK (data/quizBank.ts)", () => {
  it("has at least one role key", () => {
    expect(Object.keys(QUIZ_BANK).length).toBeGreaterThan(0);
  });

  it("every bank entry is an array with q and r fields", () => {
    Object.values(QUIZ_BANK).flat().forEach((item) => {
      expect(item.q).toBeTruthy();
      expect(item.r).toBeTruthy();
    });
  });
});

// ─── SCRIPTS ────────────────────────────────────────────────────────────────

describe("scripts (data/scripts.ts)", () => {
  it("GENERIC_TEMPLATES is a non-empty record", () => {
    expect(Object.keys(GENERIC_TEMPLATES).length).toBeGreaterThan(0);
  });

  it("SCRIPT_TEMPLATES is a non-empty record", () => {
    expect(Object.keys(SCRIPT_TEMPLATES).length).toBeGreaterThan(0);
  });

  it("COMMON_OBJECTIONS is a non-empty array of strings", () => {
    expect(COMMON_OBJECTIONS.length).toBeGreaterThan(0);
    COMMON_OBJECTIONS.forEach((o) => expect(typeof o).toBe("string"));
  });
});

// ─── MODULE TOOLS ────────────────────────────────────────────────────────────

describe("module tools (data/modules.ts)", () => {
  it.each([
    ["BRIDGES_TOOLS", BRIDGES_TOOLS],
    ["MENTAL_TOOLS",  MENTAL_TOOLS],
    ["LEGAL_TOOLS",   LEGAL_TOOLS],
  ])("%s has exactly 4 tools", (_name, tools) => {
    expect(tools).toHaveLength(4);
  });

  it.each([
    ["BRIDGES_TOOLS", BRIDGES_TOOLS],
    ["MENTAL_TOOLS",  MENTAL_TOOLS],
    ["LEGAL_TOOLS",   LEGAL_TOOLS],
  ])("every %s tool has title and desc", (_name, tools) => {
    tools.forEach((t) => {
      expect(t.title).toBeTruthy();
      expect(t.desc).toBeTruthy();
    });
  });
});

// ─── COACHING_PACKAGES ───────────────────────────────────────────────────────

describe("COACHING_PACKAGES (data/coaching.ts)", () => {
  it("has exactly 4 packages", () => {
    expect(COACHING_PACKAGES).toHaveLength(4);
  });

  it("every package has required fields", () => {
    COACHING_PACKAGES.forEach((p) => {
      expect(p.title).toBeTruthy();
      expect(p.subtitle).toBeTruthy();
      expect(p.sessions).toBeTruthy();
      expect(p.description).toBeTruthy();
      expect(p.url).toMatch(/^https:\/\//);
      expect(p.Icon).toBeDefined();
      expect(p.color).toBeTruthy();
      expect(p.border).toBeTruthy();
      expect(p.bg).toBeTruthy();
    });
  });
});

// ─── CONTACT_OPTIONS ─────────────────────────────────────────────────────────

describe("CONTACT_OPTIONS (data/contact.ts)", () => {
  it("has exactly 3 options", () => {
    expect(CONTACT_OPTIONS).toHaveLength(3);
  });

  it("every option has required fields", () => {
    CONTACT_OPTIONS.forEach((o) => {
      expect(o.title).toBeTruthy();
      expect(o.desc).toBeTruthy();
      expect(o.action).toBeTruthy();
      expect(o.href).toBeTruthy();
      expect(o.icon).toBeDefined();
    });
  });
});

// ─── VALUES (mission) ────────────────────────────────────────────────────────

describe("VALUES (data/mission.ts)", () => {
  it("has exactly 5 values", () => {
    expect(VALUES).toHaveLength(5);
  });

  it("every value has title, desc, icon, and style classes", () => {
    VALUES.forEach((v) => {
      expect(v.title).toBeTruthy();
      expect(v.desc).toBeTruthy();
      expect(v.icon).toBeDefined();
      expect(v.color).toBeTruthy();
      expect(v.bg).toBeTruthy();
      expect(v.border).toBeTruthy();
    });
  });

  it("no duplicate titles", () => {
    const titles = VALUES.map((v) => v.title);
    expect(new Set(titles).size).toBe(titles.length);
  });
});

// ─── PARTNER ─────────────────────────────────────────────────────────────────

describe("PARTNER data (data/partner.ts)", () => {
  it("PARTNER_TYPES has exactly 4 entries", () => {
    expect(PARTNER_TYPES).toHaveLength(4);
  });

  it("every PARTNER_TYPE has icon, color, title, desc", () => {
    PARTNER_TYPES.forEach((p) => {
      expect(p.icon).toBeDefined();
      expect(p.color).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(p.desc).toBeTruthy();
    });
  });

  it("BENEFITS is a non-empty array of strings", () => {
    expect(BENEFITS.length).toBeGreaterThan(0);
    BENEFITS.forEach((b) => expect(typeof b).toBe("string"));
  });
});

// ─── DASHBOARD_NAV ───────────────────────────────────────────────────────────

describe("DASHBOARD_NAV (data/dashboard.ts)", () => {
  it("is a non-empty array", () => {
    expect(DASHBOARD_NAV.length).toBeGreaterThan(0);
  });

  it("every item has href starting with / and a label", () => {
    DASHBOARD_NAV.forEach((n) => {
      expect(n.href).toMatch(/^\//);
      expect(n.label).toBeTruthy();
    });
  });

  it("includes /dashboard and /billing", () => {
    const hrefs = DASHBOARD_NAV.map((n) => n.href);
    expect(hrefs).toContain("/dashboard");
    expect(hrefs).toContain("/billing");
  });
});
