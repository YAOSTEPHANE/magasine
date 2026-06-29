import { expect, test } from "@playwright/test";
import { loginAsAdmin } from "./helpers/admin-auth";

test.describe.configure({ mode: "serial", timeout: 120_000 });

const ADMIN_READ_ENDPOINTS = [
  { path: "/api/admin/meta", key: "categories" },
  { path: "/api/admin/settings", key: "siteName" },
  { path: "/api/admin/homepage", key: "homeSections" },
  { path: "/api/admin/users", key: "users" },
  { path: "/api/admin/comments", key: "comments" },
  { path: "/api/admin/categories", key: "categories" },
  { path: "/api/admin/authors", key: "authors" },
  { path: "/api/admin/publicites", key: "zones" },
  { path: "/api/admin/analytics", key: "pageViews" },
  { path: "/api/admin/newsletter/stats", key: "totalActive" },
] as const;

const ADMIN_PAGES = [
  "/admin",
  "/admin/articles",
  "/admin/articles/new",
  "/admin/medias",
  "/admin/comments",
  "/admin/users",
  "/admin/homepage",
  "/admin/publicites",
  "/admin/newsletter",
  "/admin/analytics",
  "/admin/seo",
  "/admin/settings",
] as const;

test.describe("Admin — API lecture", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  for (const endpoint of ADMIN_READ_ENDPOINTS) {
    test(`GET ${endpoint.path}`, async ({ page }) => {
      const res = await page.request.get(endpoint.path);
      expect(res.ok(), await res.text()).toBeTruthy();
      const json = (await res.json()) as Record<string, unknown>;
      expect(json[endpoint.key]).toBeDefined();
    });
  }
});

test.describe("Admin — catégories (API)", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test("création, modification et suppression", async ({ page }) => {
    const stamp = Date.now();
    const name = `E2E Cat ${stamp}`;

    const createRes = await page.request.post("/api/admin/categories", {
      data: { name, description: "Rubrique E2E", color: "#1A3896" },
    });
    expect(createRes.status(), await createRes.text()).toBe(201);
    const created = (await createRes.json()) as { _id: string; slug: string };
    expect(created._id).toBeTruthy();

    const patchRes = await page.request.patch(`/api/admin/categories/${created._id}`, {
      data: { description: "Rubrique E2E modifiée" },
    });
    expect(patchRes.ok(), await patchRes.text()).toBeTruthy();

    const listRes = await page.request.get("/api/admin/categories");
    const list = (await listRes.json()) as { categories: { _id: string; description: string }[] };
    const row = list.categories.find((c) => c._id === created._id);
    expect(row?.description).toBe("Rubrique E2E modifiée");

    const deleteRes = await page.request.delete(`/api/admin/categories/${created._id}`);
    expect(deleteRes.ok(), await deleteRes.text()).toBeTruthy();
  });
});

test.describe("Admin — page d'accueil (API)", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test("toggle section hero puis restauration", async ({ page }) => {
    const beforeRes = await page.request.get("/api/admin/homepage");
    expect(beforeRes.ok()).toBeTruthy();
    const before = (await beforeRes.json()) as { homeSections: { hero: boolean } };
    const originalHero = before.homeSections.hero;

    const patchRes = await page.request.patch("/api/admin/homepage", {
      data: { homeSections: { hero: !originalHero } },
    });
    expect(patchRes.ok(), await patchRes.text()).toBeTruthy();

    const toggled = (await (await page.request.get("/api/admin/homepage")).json()) as {
      homeSections: { hero: boolean };
    };
    expect(toggled.homeSections.hero).toBe(!originalHero);

    const restoreRes = await page.request.patch("/api/admin/homepage", {
      data: { homeSections: { hero: originalHero } },
    });
    expect(restoreRes.ok()).toBeTruthy();
  });
});

test.describe("Admin — auteurs (API)", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test("création et suppression", async ({ page }) => {
    const stamp = Date.now();
    const name = `E2E Author ${stamp}`;

    const createRes = await page.request.post("/api/admin/authors", {
      data: { name, bio: "Auteur E2E" },
    });
    expect(createRes.status(), await createRes.text()).toBe(201);
    const created = (await createRes.json()) as { _id: string };

    const deleteRes = await page.request.delete(`/api/admin/authors/${created._id}`);
    expect(deleteRes.ok(), await deleteRes.text()).toBeTruthy();
  });
});

test.describe("Admin — navigation UI", () => {
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  for (const path of ADMIN_PAGES) {
    test(`charge ${path}`, async ({ page }) => {
      const res = await page.goto(path, { waitUntil: "domcontentloaded" });
      expect(res?.ok()).toBeTruthy();
      await expect(page.locator(".cms-shell")).toBeVisible({ timeout: 60_000 });
      await expect(page.locator("main")).toBeVisible();
    });
  }
});
