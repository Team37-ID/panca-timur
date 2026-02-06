import { test, expect } from '@playwright/test'

test.describe('Solutions Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/')
    await page.getByRole('link', { name: 'ke halaman solutions', exact: true }).click()
  })

  test('Kasus 1: Header & navigasi tampil', async ({ page }) => {
    await expect(
      page.getByText('About UsSolutionsPortfolioInsights & UpdatesContact Us'),
    ).toBeVisible()
  })

  test('Kasus 2: Hero / judul halaman Solutions tampil', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Services' })).toBeVisible()
    await expect(page.getByText('Mechanical & Plumbing')).toBeVisible()
  })

  test('Kasus 3: Daftar layanan utama tampil', async ({ page }) => {
    await expect(
      page.locator('div').filter({ hasText: 'Layanan Mechanical,' }).nth(1),
    ).toBeVisible()

    await expect(
      page.getByRole('group').filter({ hasText: 'ElectricalInstalasi sistem' }),
    ).toBeVisible()
  })

  test('Kasus 4: Produk Solutions tampil', async ({ page }) => {
    await expect(page.locator('div').filter({ hasText: 'Diffuser' }).nth(3)).toBeVisible()
  })

  test('Kasus 5: Call to Action & Footer tampil', async ({ page }) => {
    await expect(page.getByText('Let’s Build Something Great Together!')).toBeVisible()

    await expect(page.getByRole('button', { name: 'Kontak Panca Timur Raya' })).toBeVisible()
    await expect(page.getByText('Head Office:Komp. Perumahan')).toBeVisible()
  })
})
