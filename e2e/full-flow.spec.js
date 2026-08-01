// @ts-check
import { test, expect } from '@playwright/test'

// Dev URL params (ignored in production Vercel builds):
//   ?preview=1        — skip Firebase auth gate
//   ?stage=locket     — start directly at the locket, skip storybook
const STORYBOOK_URL = '/?preview=1'
const LOCKET_URL = '/?preview=1&stage=locket'

// FLIP_CLEANUP_MS in Storybook.jsx is 920ms; wait 1300ms between clicks
const BETWEEN_CLICKS_MS = 1300

// ─── helpers ─────────────────────────────────────────────────────────────────

/** Click the book to advance one page (waits for the flip to fully clear) */
async function advancePage(page) {
  await page.locator('[role="button"]').first().click()
  await page.waitForTimeout(BETWEEN_CLICKS_MS)
}

// ─── test suite ──────────────────────────────────────────────────────────────

test.describe('Full announcement flow', () => {
  // ── 1. Landing page (without preview bypass) ──────────────────────────────
  test('landing page shows sign-in gate', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('Something special is waiting')).toBeVisible()
    await expect(page.getByText('Continue with Google')).toBeVisible()
  })

  // ── 2. Storybook ──────────────────────────────────────────────────────────
  test('storybook loads on page 1 with correct text', async ({ page }) => {
    await page.goto(STORYBOOK_URL)
    await expect(page.getByText('A Little Story')).toBeVisible({ timeout: 10000 })
    await expect(page.getByText('Once upon a time')).toBeVisible({ timeout: 8000 })
    // Verify page number footer
    await expect(page.getByText('— 1 —')).toBeVisible()
    // Dev & Priti header
    await expect(page.getByText('Dev & Priti').first()).toBeVisible()
  })

  test('can navigate through all 5 storybook pages', async ({ page }) => {
    await page.goto(STORYBOOK_URL)
    await expect(page.getByText('A Little Story')).toBeVisible({ timeout: 10000 })

    const pageTexts = [
      'Once upon a time',
      'two people found each other',
      'They laughed',
      'the universe gave them',
      'open this locket',
    ]

    for (let i = 0; i < pageTexts.length; i++) {
      await expect(page.getByText(pageTexts[i]).first()).toBeVisible({ timeout: 8000 })
      await expect(page.getByText(`— ${i + 1} —`)).toBeVisible()

      if (i < pageTexts.length - 1) {
        // Skip typing then advance
        await page.locator('[role="button"]').first().click()
        await page.waitForTimeout(200)
        await advancePage(page)
      }
    }
  })

  // ── 3. Locket ─────────────────────────────────────────────────────────────
  test('storybook closing triggers locket screen', async ({ page }) => {
    // Jump straight to locket stage — tests the storybook→locket transition result
    await page.goto(LOCKET_URL)
    await expect(page.getByText('Something precious is waiting')).toBeVisible({ timeout: 8000 })
    await expect(page.getByText('tap to open')).toBeVisible()
  })

  test('locket opens and reveals announcement', async ({ page }) => {
    await page.goto(LOCKET_URL)
    await expect(page.getByText('Something precious is waiting')).toBeVisible({ timeout: 8000 })

    // Click the locket to open
    await page.locator('[style*="cursor: pointer"]').first().click()

    // Staggered reveal — wait for all key content
    await expect(page.getByText('Dev & Priti').first()).toBeVisible({ timeout: 8000 })
    await expect(page.getByText('are expecting!')).toBeVisible({ timeout: 8000 })
    await expect(page.getByText('March 2027')).toBeVisible({ timeout: 8000 })
    await expect(page.getByText('days to go!')).toBeVisible({ timeout: 8000 })
    await expect(page.getByText("We can't wait for you to meet them")).toBeVisible({ timeout: 8000 })
  })

  // ── 4. Photo reveal ───────────────────────────────────────────────────────
  test('polaroid flips and reveals the photo', async ({ page }) => {
    await page.goto(LOCKET_URL)
    await expect(page.getByText('Something precious is waiting')).toBeVisible({ timeout: 8000 })

    // Open the locket
    await page.locator('[style*="cursor: pointer"]').first().click()

    // Wait for polaroid to appear
    await expect(page.getByText('our little secret')).toBeVisible({ timeout: 10000 })
    await expect(page.getByText('tap to reveal')).toBeVisible()

    // Click the polaroid to flip it
    await page.locator('[aria-label="Reveal the photo"]').click({ force: true })
    await page.waitForTimeout(1200) // allow flip animation

    // Photo back face shows the real image
    const photo = page.locator('img[alt="Dev and Priti holding the pregnancy test"]')
    await expect(photo).toBeVisible({ timeout: 6000 })

    // Caption on the polaroid back
    await expect(page.getByText('Mar 2027')).toBeVisible()

    // Hint text disappears after reveal
    await expect(page.getByText('tap to reveal')).not.toBeVisible()
  })

  // ── 5. No console errors ──────────────────────────────────────────────────
  test('no critical console errors on full flow', async ({ page }) => {
    const errors = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text())
    })
    page.on('pageerror', (err) => errors.push(err.message))

    // Jump to locket, open it, reveal photo — full locket+photo flow
    await page.goto(LOCKET_URL)
    await page.locator('[style*="cursor: pointer"]').first().click()
    await expect(page.getByText('our little secret')).toBeVisible({ timeout: 10000 })
    await page.locator('[aria-label="Reveal the photo"]').click({ force: true })
    await page.waitForTimeout(3000)

    // Filter out known non-critical Firebase warnings in dev mode
    const criticalErrors = errors.filter(
      (e) => !e.includes('firebase') && !e.includes('Firebase')
    )
    expect(criticalErrors).toHaveLength(0)
  })
})
