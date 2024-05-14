const { Builder, By, until } = require('selenium-webdriver');
const { push } = require('../src/stack');
require('geckodriver');

const fileUnderTest = 'file://' + __dirname.replace(/ /g, '%20') + '/../dist/index.html';
const defaultTimeout = 10000;
let driver;
jest.setTimeout(1000 * 60 * 5); // 5 minuter

// Det här körs innan vi kör testerna för att säkerställa att Firefox är igång
beforeAll(async () => {
    console.log(fileUnderTest);
    driver = await new Builder().forBrowser('firefox').build();
    await driver.get(fileUnderTest);
});

// Allra sist avslutar vi Firefox igen
afterAll(async() => {
    await driver.quit();
}, defaultTimeout);

test('Clicking "Poppa Stacken!" should remove the top element', async () => {
    let pop = await driver.findElement(By.id('pop'));
    await pop.click();

    await driver.wait(until.alertIsPresent(), defaultTimeout);

    let alertDialog = await driver.switchTo().alert();
    await alertDialog.accept();

    await driver.wait(until.elementLocated(By.id('top_of_stack')), defaultTimeout);

    let topElementAfter = await driver.findElement(By.id('top_of_stack')).getText();

    expect(topElementAfter).toEqual("Undefiend");

});

describe('Clicking "Pusha till stacken"', () => {
	it('should open a prompt box', async () => {
	let push = await driver.findElement(By.id('push'));
	await push.click();
	let alert = await driver.switchTo().alert();
	await alert.sendKeys("Katter");
	await alert.accept();

});
});

