import { test, chromium } from '@playwright/test';

test('test', async () => {

	const browser = await chromium.launch();
	const page = await browser.newPage();

	await page.goto('https://twitter.com/i/flow/login');

	await page.waitForTimeout(2000);

	//fill email
	if(process.env.Twitter_Username) {
		await page.getByLabel('Phone, email, or username').click();
		await page.getByLabel('Phone, email, or username').fill(process.env.Twitter_Username);
	}

	//click next
	await page.getByRole('button', { name: 'Next' }).click();

	await page.waitForTimeout(2000);

	//Chech mandatory if twitter verifies if its your account
	if(await page.getByTestId('ocfEnterTextTextInput').count() > 0){
		await page.getByTestId('ocfEnterTextTextInput').click();
		if(process.env.Twitter_phonenumber) {
			await page.getByTestId('ocfEnterTextTextInput').fill(process.env.Twitter_phonenumber);
			await page.getByTestId('ocfEnterTextNextButton').click();
		}
	}

	await page.waitForTimeout(2000);

	//fill password
	if(process.env.Twitter_Password) {
		await page.getByLabel('Password').click();
		await page.getByLabel('Password').fill(process.env.Twitter_Password);
	}

	//Click login button
	await page.getByTestId('LoginForm_Login_Button').click();
	await page.waitForURL('https://twitter.com/home');

	await page.getByRole('button', { name: 'Accept all cookies' }).click();

	await page.getByTestId('AppTabBar_Explore_Link').click();
	await page.waitForURL('https://twitter.com/explore');

	await page.getByTestId('SearchBox_Search_Input').click();
	await page.getByTestId('SearchBox_Search_Input').fill('MeetTheExperts');
	await page.waitForTimeout(2000);

	await page.getByRole('option', { name: /MeetTheExperts @_MeetTheExperts/ }).getByTestId('TypeaheadUser').click();

	await page.waitForURL('https://twitter.com/_MeetTheExperts');

	await page.waitForTimeout(2000);

	for(let i = 0; i < await page.getByRole('article', { name: /MeetTheExperts @_MeetTheExperts/ }).getByTestId('like').count(); i++){
		//await page.pause()
		await page.getByRole('article', { name: /MeetTheExperts @_MeetTheExperts/ }).getByTestId('like').nth(0).click();
	}
});
