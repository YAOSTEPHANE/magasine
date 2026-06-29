import { expect, type Page } from "@playwright/test";

export const ADMIN_EMAIL = "admin@globalsouthwatch.com";
export const ADMIN_PASSWORD = "Admin123!";

export async function ensureDevAdmin(request: Page["request"]) {
  const res = await request.get("/api/dev/ensure-admin");
  if (!res.ok()) {
    throw new Error(`ensure-admin failed: ${res.status()} ${await res.text()}`);
  }
}

/** Connexion via l'API NextAuth (plus fiable que le formulaire UI en E2E). */
export async function loginAsAdmin(page: Page, callbackUrl = "/admin") {
  await ensureDevAdmin(page.request);

  const csrfRes = await page.request.get("/api/auth/csrf");
  if (!csrfRes.ok()) {
    throw new Error(`CSRF failed: ${csrfRes.status()}`);
  }
  const { csrfToken } = (await csrfRes.json()) as { csrfToken: string };

  const loginRes = await page.request.post("/api/auth/callback/credentials", {
    form: {
      csrfToken,
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      callbackUrl,
      json: "true",
    },
  });

  if (!loginRes.ok() && loginRes.status() !== 302) {
    throw new Error(`Login failed: ${loginRes.status()} ${await loginRes.text()}`);
  }

  await page.goto(callbackUrl, { waitUntil: "load" });
  await page.waitForSelector(".cms-shell", { timeout: 60_000 });
}

export async function expectAdminShell(page: Page) {
  await expect(page.locator(".cms-shell")).toBeVisible();
}
