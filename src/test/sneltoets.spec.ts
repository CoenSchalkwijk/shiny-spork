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
var reductionStartMonth = '//*[starts-with(@id, "371.InkomensToets.NhgInkAanvrager_201801.textBox36_") and contains(@id, "_36") and not(contains(@id, "label"))]'

// Will ignore having a co-applicant for this assignment
var coApplicantYes = '//*[starts-with(@id, "371.InkomensToets.NhgInkToetsContent_201801.radioButtons1_") and contains(@id, "_38_0")]'
var coApplicantNo = '//*[starts-with(@id, "371.InkomensToets.NhgInkToetsContent_201801.radioButtons1_") and contains(@id, "_38_1")]'

// Will ignore having financial obligations for this assignment
var financialObligationsYes = '//*[starts-with(@id, "371.InkomensToets.NhgInkToetsContent_201801.radioButtons2_") and contains(@id, "_40_0")]'
var financialObligationsNo = '//*[starts-with(@id, "371.InkomensToets.NhgInkToetsContent_201801.radioButtons2_") and contains(@id, "_40_1")]'

// TODO: address dirty locators
var calculationDate = '//*[@class="mx-name-datePicker1 mx-datepicker form-group"]//*[@class="form-control-static"]'
var indicationLoan = '//*[@class="mx-name-textBox5 mx-textbox form-group"]//*[@class="form-control-static"]'

var calculateBtn = '//*[@data-button-id="371.InkomensToets.NhgInkToetsContent_201801.actionButton1"]'

// TODO: move functions to a utility class
function dateToDDMMYYYY(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

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
  await expect(page.locator(remainingDebtNo)).toBeChecked();

  // TODO: look for library that does await with all the boilerplate...
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
  await expect(page.locator(reductionStartMonth)).toBeVisible();

  await expect(page.locator(coApplicantYes)).toBeVisible();
  await expect(page.locator(coApplicantNo)).toBeVisible();
  await expect(page.locator(coApplicantNo)).toBeChecked();

  await expect(page.locator(financialObligationsYes)).toBeVisible();
  await expect(page.locator(financialObligationsNo)).toBeVisible();
  await expect(page.locator(financialObligationsNo)).toBeChecked();

  await expect(page.locator(calculationDate)).not.toBeVisible();
  await expect(page.locator(indicationLoan)).not.toBeVisible();

  await expect(page.locator(calculateBtn)).toBeVisible();

  /* TODO: Ideally instead of 'page.locator' Playwright would like us to use something like:
   * await expect(page.getByRole('input', { id: remainingDebtYesId })).toBeVisible();
   * But in this case:
   *   await expect(page.getByRole('button', { name: "Bereken" })).toBeVisible();
   * There are multiple hits (one visible, one hidden) which doesn't help.
   * I prefer consistently using the same type of locator.
   *
   * Ref: https://playwright.dev/docs/locators
   */
});

test('valid calculation', async ({ page }) => {
  await page.goto(targetUrl);

  await page.locator(remainingDebtYes).check();
  // TODO: validate warning shown (ideally in separate test case)
  await page.locator(remainingDebtNo).check();

  await expect(page.locator(remainingDebtNo)).toBeChecked();
  // TODO: validate elements not visible for 'yes' option. (ideally in separate test case)

  await page.locator(amountToLoan).fill("400000");
  await page.locator(amountBox3Loan).fill("250000");
  await page.locator(mortgageRate).fill("4");
  await page.locator(durationInMonths).fill("360");

  await expect(page.locator(amountToLoan)).toHaveValue("400.000");
  await expect(page.locator(amountBox3Loan)).toHaveValue("250.000");
  await expect(page.locator(mortgageRate)).toHaveValue("4,00");

  await page.locator(annualGroundRent).fill("5000");
  await page.locator(energyLabel).selectOption('GeenEnergielabelBeschikbaar');
  await page.locator(dateOfBirth).fill("07-09-1976");
  await page.locator(grossAnnualIncome).fill("45000");
  await page.locator(dateOfBirth).focus(); // leaving grossAnnualIncome, triggering formatting of contents

  await expect(page.locator(annualGroundRent)).toHaveValue("5.000")
  await expect(page.locator(grossAnnualIncome)).toHaveValue("45.000")

  await page.locator(reducedIncome).fill("10000")
  await page.locator(reductionStartMonth).fill("200")  // At the 100-th month of mortgage duration

  await page.locator(calculateBtn).click();

  await expect(page.locator(calculationDate)).toBeVisible();
  await expect(page.locator(indicationLoan)).toBeVisible();

  // Expected format: dd-mm-yyyy
  // NOTE: can yield the wrong date when test case is executed around midnight!
  let formattedDate = dateToDDMMYYYY(new Date())
  await expect(page.locator(calculationDate)).toHaveText(formattedDate);

  // TODO: Not familiar with the calculation, must assume this is correct.
  await expect(page.locator(indicationLoan)).toHaveText("63.256")

  // TODO: Indication loan can become a negative value, is this a sensible response?
  //       Use 450000/120000/5/360/15000/no label avail./01-01-1976/70000/10000/100, result: -109.591/
});

test('breaking the calculation', async ({ page }) => {
  await page.goto(targetUrl);

  await page.locator(amountToLoan).fill("a");
  // await expect(page.getByRole('alert', { name: "Ongeldig nummer" })).toBeVisible();

  /*
  await page.locator(amountBox3Loan).fill("250000");
  await page.locator(mortgageRate).fill("4");
  await page.locator(durationInMonths).fill("360");

  await expect(page.locator(amountToLoan)).toHaveValue("400.000");
  await expect(page.locator(amountBox3Loan)).toHaveValue("250.000");
  await expect(page.locator(mortgageRate)).toHaveValue("4,00");

  await page.locator(annualGroundRent).fill("5000");
  await page.locator(energyLabel).selectOption('GeenEnergielabelBeschikbaar');
  await page.locator(dateOfBirth).fill("07-09-1976");
  await page.locator(grossAnnualIncome).fill("45000");
  await page.locator(dateOfBirth).focus(); // leaving grossAnnualIncome, triggering formatting of contents

  await expect(page.locator(annualGroundRent)).toHaveValue("5.000")
  await expect(page.locator(grossAnnualIncome)).toHaveValue("45.000")

  await page.locator(reducedIncome).fill("10000")
  await page.locator(reductionStartMonth).fill("200")  // At the 100-th month of mortgage duration

  await page.locator(calculateBtn).click();

  await expect(page.locator(calculationDate)).toBeVisible();
  await expect(page.locator(indicationLoan)).toBeVisible();

  // Expected format: dd-mm-yyyy
  // NOTE: can yield the wrong date when test case is executed around midnight!
  let formattedDate = dateToDDMMYYYY(new Date())
  await expect(page.locator(calculationDate)).toHaveText(formattedDate);

  // TODO: Not familiar with the calculation, must assume this is correct.
  await expect(page.locator(indicationLoan)).toHaveText("63.256")
  */
});