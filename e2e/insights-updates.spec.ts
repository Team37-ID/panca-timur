import { test, expect } from '@playwright/test'

test.describe('Insights & Updates Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/')
    await page.getByRole('link', { name: 'ke halaman insights updates', exact: true }).click()
  })

  test('Kasus 1: Header & navigasi tampil', async ({ page }) => {
    await expect(
      page.getByText('About UsSolutionsPortfolioInsights & UpdatesContact Us'),
    ).toBeVisible()
  })

  test('Kasus 2: Hero / deskripsi halaman tampil', async ({ page }) => {
    await expect(page.getByText('Our Thoughts, Experience, and Expertise')).toBeVisible()

    await expect(
      page.locator('div').filter({ hasText: 'Insight dan pengalaman yang' }).nth(1),
    ).toBeVisible()
  })

  test('Kasus 3: Section blog tampil', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Blog' })).toBeVisible()

    await expect(page.getByRole('link', { name: 'Read More' }).first()).toBeVisible()
  })

  test('Kasus 4: List / highlight artikel tampil', async ({ page }) => {
    await expect(
      page.locator('div').filter({ hasText: 'Test Test Test Test Test Test' }).nth(3),
    ).toBeVisible()
  })

  test('Kasus 5: Navigasi ke detail artikel', async ({ page }) => {
    await page.getByRole('link', { name: 'Read More' }).first().click()

    await expect(page.getByRole('navigation', { name: 'breadcrumb' })).toBeVisible()

    await expect(page.getByText('-01-26')).toBeVisible()
  })

  test('Kasus 6: Kembali ke halaman Insights & Updates', async ({ page }) => {
    await page.goto('http://localhost:3000/detail-insights-updates')

    await expect(page.locator('.flex.flex-row.gap-4')).toBeVisible()
  })

  test('Kasus 7: Call to Action & footer tampil', async ({ page }) => {
    await expect(page.getByText('Let’s Build Something Great Together!')).toBeVisible()

    await expect(page.getByText('Head Office:Komp. Perumahan')).toBeVisible()
  })
})
