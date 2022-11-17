import { test, chromium } from '@playwright/test';

test('test', async () => {

	const browser = await chromium.launch();	
  	const page = await browser.newPage();

	await page.goto('https://www.instagram.com/accounts/login');

	await page.getByRole('button', { name: 'Only allow essential cookies' }).click();

	if(process.env.Instagram_Username){
		await page.getByLabel('Phone number, username, or email').click();
		await page.getByLabel('Phone number, username, or email').fill(process.env.Instagram_Username);
	}

	if(process.env.Instagram_Password) {
		await page.getByLabel('Password').click();
		await page.getByLabel('Password').fill(process.env.Instagram_Password);
	}

	await page.getByRole('button', { name: 'Log in' }).click();

	await page.waitForTimeout(3000)

	await page.getByRole('link', { name: 'Search Search' }).click();
	await page.getByPlaceholder('Search').fill('Meet The Experts');
	await page.getByRole('link', { name: '_meettheexperts_' }).click();
	await page.waitForURL('https://www.instagram.com/_meettheexperts_/?next=%2F');
  
	await page.waitForTimeout(3000)

	for(let i = 0; i < await page.getByRole('link', { name: /Photo by @_meettheexperts_./ }).count(); i++){
		//open post
		await page.getByRole('link', { name: /Photo by @_meettheexperts_./ }).nth(i).click();
		
		//like post
		const likeCount = await page.getByRole('button', { name: 'Like' }).count();
		if(likeCount > 0) {
			await page.getByRole('button', { name: 'Like' }).click();	
		}
		
		//close post
		await page.getByRole('button', { name: 'Close' }).click();
	}
});
