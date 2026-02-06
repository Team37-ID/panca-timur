import { test, expect } from '@playwright/test'

test.describe('Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/')
  })

  test('Kasus 1: Header & navigasi tampil', async ({ page }) => {
    await expect(
      page.getByText('About UsSolutionsPortfolioInsights & Updates', { exact: true }),
    ).toBeVisible()
  })

  test('Kasus 2: Hero section tampil', async ({ page }) => {
    const heroSection = page
      .getByRole('heading', {
        name: 'Delivering Quality Mechanical Electrical and Plumbing Solutions',
      })
      .locator('..')

    await expect(
      page.getByRole('heading', {
        name: 'Delivering Quality Mechanical Electrical and Plumbing Solutions',
      }),
    ).toBeVisible()

    await expect(heroSection.getByText('PT. Panca Timur Raya')).toBeVisible()
  })

  test('Kasus 3: Section layanan utama', async ({ page }) => {
    await expect(page.getByText('Mechanical & Plumbing')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible()
    await expect(page.getByRole('button', { name: /Lihat semua solusi/i })).toBeVisible()
  })

  test('Kasus 4: Portfolio preview tampil', async ({ page }) => {
    await expect(page.getByRole('img', { name: 'Proyek PT PTR' })).toBeVisible()
  })

  test('Kasus 5: Insight / highlight section tampil', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Insights & Updates' })).toBeVisible()
  })

  test('Kasus 6: Call to Action & footer tampil', async ({ page }) => {
    await expect(page.getByText('Let’s Build Something Great Together!')).toBeVisible()

    await expect(page.getByText('Head Office:Komp. Perumahan')).toBeVisible()
  })
})
