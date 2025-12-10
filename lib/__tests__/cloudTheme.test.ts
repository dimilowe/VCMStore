import { describe, it, expect } from "vitest";
import {
  CLOUD_THEMES,
  DEFAULT_THEME,
  ALL_CLOUD_IDS,
  resolveCloudId,
  getAllGradientClasses,
  type CloudId,
} from "../cloudTheme";

describe("CLOUD_THEMES coverage", () => {
  it("has theme entries for every CloudId", () => {
    ALL_CLOUD_IDS.forEach((id) => {
      expect(CLOUD_THEMES[id]).toBeDefined();
    });
  });

  it("every theme has required gradient tokens", () => {
    Object.entries(CLOUD_THEMES).forEach(([id, theme]) => {
      expect(theme.heroBg, `${id} missing heroBg`).toBeTruthy();
      expect(theme.recentFilesBg, `${id} missing recentFilesBg`).toBeTruthy();
      expect(theme.promptBarBg, `${id} missing promptBarBg`).toBeTruthy();
      expect(theme.icon, `${id} missing icon`).toBeTruthy();
      expect(theme.tabs.length, `${id} missing tabs`).toBeGreaterThan(0);
    });
  });

  it("DEFAULT_THEME has all required fields", () => {
    expect(DEFAULT_THEME.heroBg).toBeTruthy();
    expect(DEFAULT_THEME.recentFilesBg).toBeTruthy();
    expect(DEFAULT_THEME.promptBarBg).toBeTruthy();
    expect(DEFAULT_THEME.icon).toBeTruthy();
    expect(DEFAULT_THEME.tabs.length).toBeGreaterThan(0);
  });
});

describe("resolveCloudId", () => {
  it("resolves hyphenated CMS slugs correctly", () => {
    expect(resolveCloudId("file-data-cloud")).toBe("file-data");
    expect(resolveCloudId("intelligence-cloud")).toBe("intelligence");
    expect(resolveCloudId("growth-distribution-cloud")).toBe("growth-distribution");
  });

  it("resolves underscored CMS slugs correctly", () => {
    expect(resolveCloudId("file_data")).toBe("file-data");
    expect(resolveCloudId("writing_seo")).toBe("writing-seo");
    expect(resolveCloudId("music_performance")).toBe("music-performance");
  });

  it("resolves underscored CMS slugs with cloud suffix", () => {
    expect(resolveCloudId("file_data_cloud")).toBe("file-data");
    expect(resolveCloudId("ai_intelligence_cloud")).toBe(null);
    expect(resolveCloudId("intelligence_cloud")).toBe("intelligence");
  });

  it("returns null for unknown slugs", () => {
    expect(resolveCloudId("unknown-cloud")).toBe(null);
    expect(resolveCloudId("random_stuff")).toBe(null);
    expect(resolveCloudId("")).toBe(null);
  });

  it("handles bare CloudId values", () => {
    expect(resolveCloudId("creation")).toBe("creation");
    expect(resolveCloudId("video")).toBe("video");
    expect(resolveCloudId("file-data")).toBe("file-data");
  });
});

describe("getAllGradientClasses", () => {
  it("returns non-empty array", () => {
    const classes = getAllGradientClasses();
    expect(classes.length).toBeGreaterThan(0);
  });

  it("includes gradient tokens from themes", () => {
    const classes = getAllGradientClasses();
    expect(classes).toContain("from-pink-500");
    expect(classes).toContain("to-pink-600");
    expect(classes).toContain("from-zinc-500");
    expect(classes).toContain("bg-white/10");
  });

  it("has no duplicates", () => {
    const classes = getAllGradientClasses();
    const unique = new Set(classes);
    expect(classes.length).toBe(unique.size);
  });
});
