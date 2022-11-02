import { test, expect, chromium } from '@playwright/test';

test('test', async () => {

	const browser = await chromium.launch();
  	const page = await browser.newPage();

  	//opens login page
  	await page.goto('https://www.linkedin.com/login');

  	//Accept cookie
  	await page.getByRole('button', { name: 'Accept' }).click();

  	//user credentials
  	if(process.env.Linkedin_Username) {
		await page.getByLabel('Email or phone').click();
		await page.getByLabel('Email or phone').fill(process.env.Linkedin_Username);
  	}

	if(process.env.Linkedin_Password){
		await page.getByLabel('Password').click();
		await page.getByLabel('Password').fill(process.env.Linkedin_Password);
	}

  	//press enter
  	await page.getByRole('button', { name: 'Sign in' }).click();

	//dont know if its needed...
	//   await expect(page).toHaveURL('https://www.linkedin.com/check/add-phone?country_code=nl');
	//   await page.getByRole('button', { name: 'Overslaan' }).click();

	await expect(page).toHaveURL('https://www.linkedin.com/feed/');

  	await page.getByRole('combobox', { name: 'Zoeken' }).click();
	await page.getByRole('combobox', { name: 'Zoeken' }).fill('Meet The Experts');
	await page.getByRole('option', { name: 'meet the experts • Bedrijf • ICT-services en consultancy' }).locator('div:has-text("meet the experts • Bedrijf • ICT-services en consultancy")').click();
	
	await page.getByRole('link', { name: /Meet The Experts ICT-services en consultancy/ }).getByRole('link', { name: 'Pagina weergeven' }).click();
	await page.waitForNavigation({url: /https:\/\/www\.linkedin\.com\/company/});

	if(page.url() === 'https://www.linkedin.com/company/86308347/admin/'){
		await page.getByRole('link', { name: 'Weergeven als lid' }).click();
		await expect(page).toHaveURL('https://www.linkedin.com/company/meettheexperts/?viewAsMember=true');
	} else {
		await expect(page).toHaveURL('https://www.linkedin.com/company/meettheexperts/');
	}

	//get full company feed
	await page.getByRole('link', { name: 'Bijdragen' }).click();
	await expect(page).toHaveURL(/https:\/\/www\.linkedin\.com\/company\/meettheexperts\/posts\/\?feedView=all/);
	for(let i = 0; i < await page.getByRole('button', { name: 'Bijdrage van Meet The Experts markeren als interessant' }).count(); i++){
		await page.getByRole('button', { name: 'Bijdrage van Meet The Experts markeren als interessant' }).nth(0).click();
	}
});