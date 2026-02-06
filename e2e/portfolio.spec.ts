import { test, expect } from '@playwright/test'

test.describe('Portfolio Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/')
    await page.getByRole('link', { name: 'ke halaman portfolio', exact: true }).click()
  })

  test('Kasus 1: Header & navigasi tampil', async ({ page }) => {
    await expect(
      page.getByText('About UsSolutionsPortfolioInsights & UpdatesContact Us'),
    ).toBeVisible()
  })

  test('Kasus 2: Hero / judul portfolio tampil', async ({ page }) => {
    await expect(
      page.getByText('Proven Experience in Mechanical Electrical and Plumbing Works'),
    ).toBeVisible()
  })

  test('Kasus 3: Filter kategori portfolio tampil', async ({ page }) => {
    await expect(page.locator('div').filter({ hasText: 'AllMechanical &' }).nth(3)).toBeVisible()
  })

  test('Kasus 4: Preview gambar portfolio tampil', async ({ page }) => {
    await expect(page.getByRole('img', { name: 'HVAC System' }).nth(1)).toBeVisible()
  })

  test('Kasus 5: Interaksi tab kategori portfolio', async ({ page }) => {
    await page.getByRole('tab', { name: 'Mechanical & Plumbing' }).click()
    await page.getByRole('tab', { name: 'HVAC' }).click()
    await page.getByRole('tab', { name: 'Electrical' }).click()

    await expect(page.getByRole('img', { name: 'Electrical' }).nth(2)).toBeVisible()
  })

  test('Kasus 6: Load more portfolio berfungsi', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Muat foto lebih banyak' })).toBeVisible()

    await page.getByRole('button', { name: 'Muat foto lebih banyak' }).click()
  })

  test('Kasus 7: Call to Action & footer tampil', async ({ page }) => {
    await expect(page.getByText('Let’s Build Something Great Together!')).toBeVisible()

    await expect(page.getByText('Head Office:Komp. Perumahan')).toBeVisible()
  })
})
