import { test, expect } from '@playwright/test'

test.describe('About Us Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/')
    await page.getByRole('link', { name: 'ke halaman about us', exact: true }).click()

    await expect(
      page.getByText('Who We Are Behind Every Reliable Project', { exact: false }),
    ).toBeVisible()
  })

  test('Kasus 1: Header & navigasi tampil', async ({ page }) => {
    await expect(
      page.getByText('About UsSolutionsPortfolioInsights & UpdatesContact Us', { exact: false }),
    ).toBeVisible()
  })

  test('Kasus 2: Profil perusahaan tampil', async ({ page }) => {
    await expect(
      page.getByText('PT. Panca Timur Raya merupakan perusahaan swasta', { exact: false }),
    ).toBeVisible()
  })

  test('Kasus 3: Visi, misi, dan nilai perusahaan', async ({ page }) => {
    await expect(page.getByText('Our Mission', { exact: false })).toBeVisible()

    await expect(page.getByText('Jujur Komitmen Responsibel', { exact: false })).toBeVisible()
  })

  test('Kasus 4: Dokumen legal perusahaan', async ({ page }) => {
    await expect(
      page.getByText('Perizinan Berusaha Berbasis Resiko', { exact: false }),
    ).toBeVisible()

    await page
      .getByRole('button', {
        name: 'Lihat dokumen perusahaan Perizinan Berusaha Berbasis Resiko',
      })
      .click()
  })

  test('Kasus 5: Section CTA tampil', async ({ page }) => {
    await expect(
      page.getByText('Let’s Build Something Great Together!', { exact: false }),
    ).toBeVisible()
  })
})
