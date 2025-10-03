import { test, expect } from '@playwright/test';

// TODO: move to configuration
var targetUrl = 'https://mijn.nhg.nl/';

// TODO: nicely group locators in a separate file.

// Regular expressions by way of 'matches' is not supported (yet)
// Cannot use: '//*[matches(@id, "^371.InkomensToets.Landingspagina.radioButtons1_.{3}_10_1$")]'

// TODO: Can use string formatting and extract prefix '371.InkomensToets.'
// TODO: And/or can extract XPATH query string format: '//*[starts-with(@id, "[PREFIX][STARTS_WITH]]") and contains(@id, "[ENDS_WITH]")]'
//       and now ' and not(contains(@id, "label"))]' needs to be added too

// TODO: check with dev's regarding:
// - '.textBox[XX]_' naming. Maybe more descriptive names would be nice?
// - what's with the _XXX suffix and '371.' prefix?
// - is the '_201801_' volatile?
// - inconsistent naming for energyLabel element(s)
var remainingDebtYes = '//*[starts-with(@id, "371.InkomensToets.Landingspagina.radioButtons1_") and contains(@id, "_10_0")]'
var remainingDebtNo = '//*[starts-with(@id, "371.InkomensToets.Landingspagina.radioButtons1_") and contains(@id, "_10_1")]'
var amountToLoan ='//*[starts-with(@id, "371.InkomensToets.AlgemeneGegevensInkomenstoets_201801.textBox10_") and contains(@id, "_44") and not(contains(@id, "label"))]'
var amountBox3Loan = '//*[starts-with(@id, "371.InkomensToets.AlgemeneGegevensInkomenstoets_201801.textBox9_") and contains(@id, "_46") and not(contains(@id, "label"))]'
var mortgageRate = '//*[starts-with(@id, "371.InkomensToets.AlgemeneGegevensInkomenstoets_201801.textBox7_") and contains(@id, "_49") and not(contains(@id, "label"))]'
var durationInMonths =  '//*[starts-with(@id, "371.InkomensToets.AlgemeneGegevensInkomenstoets_201801.textBox8_") and contains(@id, "_54") and not(contains(@id, "label"))]'
var annualGroundRent =  '//*[starts-with(@id, "371.InkomensToets.AlgemeneGegevensInkomenstoets_201801.textBox6_") and contains(@id, "_57") and not(contains(@id, "label"))]'
var energyLabel = '//*[starts-with(@id, "371.InkomensToets.NhgInkToetsContent_201801.dropDown1_") and contains(@id, "_20") and not(contains(@id, "label"))]'

var dateOfBirth = '//*[starts-with(@id, "371.InkomensToets.NhgInkAanvrager_201801.datePicker5_") and contains(@id, "_24") and not(contains(@id, "label"))]'
var grossAnnualIncome = '//*[starts-with(@id, "371.InkomensToets.NhgInkAanvrager_201801.textBox28_") and contains(@id, "_26") and not(contains(@id, "label"))]'
var reducedIncome = '//*[starts-with(@id, "371.InkomensToets.NhgInkAanvrager_201801.textBox35_") and contains(@id, "_34") and not(contains(@id, "label"))]'
var startMonth = '//*[starts-with(@id, "371.InkomensToets.NhgInkAanvrager_201801.textBox36_") and contains(@id, "_36") and not(contains(@id, "label"))]'

// Will ignore having a co-applicant for this assignment
var coApplicantYes = '//*[starts-with(@id, "371.InkomensToets.NhgInkToetsContent_201801.radioButtons1_") and contains(@id, "_38_0")]'
var coApplicantNo = '//*[starts-with(@id, "371.InkomensToets.NhgInkToetsContent_201801.radioButtons1_") and contains(@id, "_38_1")]'

// Will ignore having financial obligations for this assignment
var financialObligationsYes = '//*[starts-with(@id, "371.InkomensToets.NhgInkToetsContent_201801.radioButtons2_") and contains(@id, "_40_0")]'
var financialObligationsNo = '//*[starts-with(@id, "371.InkomensToets.NhgInkToetsContent_201801.radioButtons2_") and contains(@id, "_40_0")]'

// --- Basic validation/availability tests ---
test('page available', async ({ page }) => {
  await page.goto(targetUrl);
  await expect(page).toHaveTitle(/Sneltoets Acceptatie/);
});

test('form elements available', async ({ page }) => {
  // Checking for individual elements also helps to get the menial task of determining locators out of the way.
  await page.goto(targetUrl);

  // General information
  // TODO: Maybe build/check for function to check visibility for multiple locators
  await expect(page.locator(remainingDebtNo)).toBeVisible();
  await expect(page.locator(remainingDebtYes)).toBeVisible();
  await expect(page.locator(amountToLoan)).toBeVisible();
  await expect(page.locator(amountBox3Loan)).toBeVisible();
  await expect(page.locator(mortgageRate)).toBeVisible();
  await expect(page.locator(durationInMonths)).toBeVisible();
  await expect(page.locator(annualGroundRent)).toBeVisible();
  await expect(page.locator(energyLabel)).toBeVisible();

  // Income details
  await expect(page.locator(dateOfBirth)).toBeVisible();
  await expect(page.locator(grossAnnualIncome)).toBeVisible();
  await expect(page.locator(reducedIncome)).toBeVisible();
  await expect(page.locator(startMonth)).toBeVisible();

  await expect(page.locator(coApplicantYes)).toBeVisible();
  await expect(page.locator(coApplicantNo)).toBeVisible();
  await expect(page.locator(financialObligationsYes)).toBeVisible();
  await expect(page.locator(financialObligationsNo)).toBeVisible();

  // Ideally instead of 'page.locator' Playwright would like us to use something like:
  // await expect(page.getByRole('input', { id: remainingDebtYesId })).toBeVisible();
});