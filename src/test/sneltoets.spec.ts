import { test, expect } from '@playwright/test'

// TODO: move to configuration
var targetUrl = 'https://mijn.nhg.nl/'

// TODO: nicely group locators in a separate file.

// VERIFY: Regular expressions by way of 'matches' is not supported (yet)?
// For example: cannot use '//*[matches(@id, "^371.InkomensToets.Landingspagina.radioButtons1_.{3}_10_1$")]'

// TODO: Can use string formatting and extract prefix '371.InkomensToets.'
// TODO: And/or can extract XPATH query string format: '//*[starts-with(@id, "[PREFIX][CATEGORY][ELEMENT]")]'

// TODO: check with dev's regarding...:
// - the '.textBox[XX]_' naming. Maybe more descriptive names would be nice?
// - what's with the _XXX suffix and '371.' prefix?
// - is the '_201801_' volatile?
// - inconsistent naming for energyLabel element.

var remainingDebtYes = '//input[starts-with(@id, "371.InkomensToets.Landingspagina.radioButtons1_") and @value="true"]'
var remainingDebtNo = '//input[starts-with(@id, "371.InkomensToets.Landingspagina.radioButtons1_") and @value="false"]'
var amountToLoan ='//input[starts-with(@id, "371.InkomensToets.AlgemeneGegevensInkomenstoets_201801.textBox10_")]'
var amountBox3Loan = '//input[starts-with(@id, "371.InkomensToets.AlgemeneGegevensInkomenstoets_201801.textBox9_")]'
var mortgageRate = '//input[starts-with(@id, "371.InkomensToets.AlgemeneGegevensInkomenstoets_201801.textBox7_")]'
var durationInMonths =  '//input[starts-with(@id, "371.InkomensToets.AlgemeneGegevensInkomenstoets_201801.textBox8_")]'
var annualGroundRent =  '//input[starts-with(@id, "371.InkomensToets.AlgemeneGegevensInkomenstoets_201801.textBox6_")]'
var energyLabel = '//select[starts-with(@id, "371.InkomensToets.NhgInkToetsContent_201801.dropDown1_")]'

var dateOfBirth = '//input[starts-with(@id, "371.InkomensToets.NhgInkAanvrager_201801.datePicker5_")]'
var grossAnnualIncome = '//input[starts-with(@id, "371.InkomensToets.NhgInkAanvrager_201801.textBox28_")]'
var reducedIncome = '//input[starts-with(@id, "371.InkomensToets.NhgInkAanvrager_201801.textBox35_")]'
var reductionStartMonth = '//input[starts-with(@id, "371.InkomensToets.NhgInkAanvrager_201801.textBox36_")]'

// Skipping 'AOW-datum', 'Pensioen en/of AOW' and 'Lijfrente'; fields do not seem to be used.

var coApplicantYes = '//input[starts-with(@id, "371.InkomensToets.NhgInkToetsContent_201801.radioButtons1_") and @value="true"]'
var coApplicantNo = '//input[starts-with(@id, "371.InkomensToets.NhgInkToetsContent_201801.radioButtons1_") and @value="false"]'
var coApplicantDob = '//input[starts-with(@id, "371.InkomensToets.NhgInkAanvrager_201801.datePicker5.295_")]'
var coApplicantGrossAnnualIncome = '//input[starts-with(@id, "371.InkomensToets.NhgInkAanvrager_201801.textBox28.297_")]'
var coApplicantReducedIncome = '//input[starts-with(@id, "371.InkomensToets.NhgInkAanvrager_201801.textBox35.302_")]'
var coApplicantReductionStartMonth = '//input[starts-with(@id, "371.InkomensToets.NhgInkAanvrager_201801.textBox36.303_")]'
var coApplicantFinancialObligationsYes = '//input[starts-with(@id, "371.InkomensToets.NhgInkToetsContent_201801.radioButtons3_") and @value="true"]'
var coApplicantFinancialObligationsNo = '//input[starts-with(@id, "371.InkomensToets.NhgInkToetsContent_201801.radioButtons3_") and @value="false"]'

var financialObligationsYes = '//input[starts-with(@id, "371.InkomensToets.NhgInkToetsContent_201801.radioButtons2_") and @value="true"]'
var financialObligationsNo = '//input[starts-with(@id, "371.InkomensToets.NhgInkToetsContent_201801.radioButtons2_") and @value="false"]'

// TODO: moving coApplicant tests & locators to separate TS file; eliminates having to use a specified prefixes for naming.
var coApplicantObligationMonthlyFee = '//input[starts-with(@id, "371.InkomensToets.NhgInkToetsContent_201801.textBox6_")]'
var coApplicantObligationMonths = '//input[starts-with(@id, "371.InkomensToets.NhgInkToetsContent_201801.textBox7_")]'
var coApplicantObligationMaintenanceAmount = '//input[starts-with(@id, "371.InkomensToets.NhgInkToetsContent_201801.textBox8_")]'
var coApplicantObligationMaintenanceMonths = '//input[starts-with(@id, "371.InkomensToets.NhgInkToetsContent_201801.textBox9_")]'

// TODO: address dirty locators with devs
var calculationDate = '//*[@class="mx-name-datePicker1 mx-datepicker form-group"]//*[@class="form-control-static"]'
var indicationLoan = '//*[@class="mx-name-textBox5 mx-textbox form-group"]//*[@class="form-control-static"]'

var calculateBtn = '//button[@data-button-id="371.InkomensToets.NhgInkToetsContent_201801.actionButton1"]'

// TODO: move function to a utility class
function dateToDDMMYYYY(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

test('page available', async ({ page }) => {
  await page.goto(targetUrl);
  await expect(page).toHaveTitle(/Sneltoets Acceptatie/);
});

test('form elements available', async ({ page }) => {
  // Validate if default elements are available.
  // Checking for individual elements helps to get the task of determining locators out of the way.
  await page.goto(targetUrl);

  // General information
  // TODO: Maybe build a function to check visibility for multiple locators at once.
  await expect(page.locator(remainingDebtNo)).toBeVisible();
  await expect(page.locator(remainingDebtYes)).toBeVisible();
  await expect(page.locator(remainingDebtNo)).toBeChecked();

  // TODO: look for library that does away with all the boilerplate code (`await expect(page.locator([XPATH])).toBeVisible();`)...
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

  /* TODO/CHECK: Instead of 'page.locator' Playwright prefers:
   *   await expect(page.getByRole('input', { id: remainingDebtYesId })).toBeVisible();
   * But in this case:
   *   await expect(page.getByRole('button', { name: "Bereken" })).toBeVisible();
   * There are multiple hits (one visible, one hidden) which doesn't help.
   * I prefer consistently using the same type of locator and/or with the highest amount of certainty.
   *
   * Ref: https://playwright.dev/docs/locators
   */
});

test('co-applicant elements available', async ({ page }) => {
  // Validate element state for form changing options separately
  await page.goto(targetUrl);

  await expect(page.locator(coApplicantYes)).toBeVisible();
  await page.locator(coApplicantYes).check();

  await expect(page.locator(coApplicantYes)).toBeChecked();
  await expect(page.locator(coApplicantDob)).toBeVisible();

  await expect(page.locator(coApplicantGrossAnnualIncome)).toBeVisible();
  await expect(page.locator(coApplicantReducedIncome)).toBeVisible();
  await expect(page.locator(coApplicantReductionStartMonth)).toBeVisible();

  await expect(page.locator(coApplicantFinancialObligationsYes)).toBeVisible();
  await expect(page.locator(coApplicantFinancialObligationsNo)).toBeVisible();
  await expect(page.locator(coApplicantFinancialObligationsNo)).toBeChecked();
});

test('co-applicant remaining debt elements available', async ({ page }) => {
  // Validate element state for form changing options separately
  await page.goto(targetUrl);

  await expect(page.locator(coApplicantYes)).toBeVisible();
  await page.locator(coApplicantYes).check();

  await page.locator(coApplicantFinancialObligationsYes).check();
  await expect(page.locator(coApplicantFinancialObligationsYes)).toBeChecked();

  await expect(page.locator(coApplicantObligationMonthlyFee)).toBeVisible();
  await expect(page.locator(coApplicantObligationMonths)).toBeVisible();
  await expect(page.locator(coApplicantObligationMaintenanceAmount)).toBeVisible();
  await expect(page.locator(coApplicantObligationMaintenanceMonths)).toBeVisible();
});

test('valid calculation', async ({ page }) => {
  // First we need to know what a valid calculation is:
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
  // NOTE: can yield the 'WRONG' date when test case is executed around midnight!
  let formattedDate = dateToDDMMYYYY(new Date())
  await expect(page.locator(calculationDate)).toHaveText(formattedDate);

  // TODO: Not familiar with the calculation, must assume this is correct.
  await expect(page.locator(indicationLoan)).toHaveText("63.256")

  // TODO: Indication loan can become a negative value, is this a sensible response?
  //       Use 450000/120000/5/360/15000/no label avail./01-01-1976/70000/10000/100, result: -109.591/
});


test('valid calculation w. co-applicant w. debt', async ({ page }) => {
  // Now we try variant of a correct calculation request.
  // TODO: Code duplication. Need to figure out the best way not to do the same thing twice in Playwright/TS.
  //       - Move to a function?
  //       - Call one test case within the other?
  //       - Separate test logic from the Playwright framework entirely?
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
  await page.locator(reducedIncome).fill("10000")
  await page.locator(dateOfBirth).focus(); // leaving field, triggering number re-formatting of content

  await expect(page.locator(annualGroundRent)).toHaveValue("5.000")
  await expect(page.locator(grossAnnualIncome)).toHaveValue("45.000")
  await expect(page.locator(reducedIncome)).toHaveValue("10.000")

  await page.locator(reductionStartMonth).fill("200")  // At the N-th month of mortgage duration

  // co-applicant details:
  await page.locator(coApplicantYes).check()
  await page.locator(coApplicantDob).fill("26-06-1976");
  await page.locator(coApplicantGrossAnnualIncome).fill("55000")
  await page.locator(coApplicantReducedIncome).fill("15000")
  await page.locator(coApplicantReductionStartMonth).fill("200")
  await page.locator(coApplicantDob).focus(); // leaving field, triggering number re-formatting of content

  await expect(page.locator(coApplicantGrossAnnualIncome)).toHaveValue("55.000")
  await expect(page.locator(coApplicantReducedIncome)).toHaveValue("15.000")

  await page.locator(coApplicantFinancialObligationsYes).check()
  await expect(page.locator(coApplicantFinancialObligationsYes)).toBeChecked()

  await page.locator(coApplicantObligationMonthlyFee).fill("1000")
  await page.locator(coApplicantObligationMonths).fill("99")
  await page.locator(coApplicantObligationMaintenanceAmount).fill("1999")
  await page.locator(coApplicantObligationMaintenanceMonths).fill("13")

  await expect(page.locator(coApplicantObligationMonthlyFee)).toHaveValue("1.000")
  await expect(page.locator(coApplicantObligationMaintenanceAmount)).toHaveValue("1.999")

  // Trigger calculation
  await page.locator(calculateBtn).click();

  await expect(page.locator(calculationDate)).toBeVisible();
  await expect(page.locator(indicationLoan)).toBeVisible();

  // Expected format: dd-mm-yyyy
  // NOTE: can yield the 'WRONG' date when test case is executed around midnight!
  let formattedDate = dateToDDMMYYYY(new Date())
  await expect(page.locator(calculationDate)).toHaveText(formattedDate);

  // TODO: Not familiar with the calculation, must assume this is correct.
  // TODO: Indication loan can become a negative value, is this a sensible response?
  await expect(page.locator(indicationLoan)).toHaveText("-31.377")
});

test('breaking the calculation', async ({ page }) => {
  // Now that we know how 'it' must be: its time to break stuff :)
  await page.goto(targetUrl);

  await page.locator(amountToLoan).fill("a");
  // Try:
  // -1/-1,0/1,0/450001/1.23e10/1e10/এক/450.000/4,5/>MAX INT/>MAX DECIMAL/\0

  // ...etc
  // FUN STUFF: scientific notation is accepted and correctly interpreted :)
});