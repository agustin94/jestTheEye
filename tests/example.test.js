const puppeteer = require('puppeteer')
const expect = require('chai').expect



describe('Crear task de script', ()=>{
    
    let browser
    let page

    before(async ()=>{
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 40,
            devtools: false,
            args: [
                '--window-size=1920,1080'
            ]
        })
        page = await browser.newPage()
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36');
        await page.setDefaultNavigationTimeout(20000)
        await page.setDefaultTimeout(20000)
        await page.setViewport({ width: 900, height: 400})
        await page.goto('https://app.theeye.io/login')
        await page.waitForSelector('input.form-input')
    })


    after(async()=>{
        await browser.close()
    })

    it('login', async()=>{
        await page.waitForSelector('input[name="username"]')
        await page.type('input[name="username"]',"")
        await page.type('input[name="password"]',"")
        await page.click('button[data-hook="start-login"]')
    })

    it('seleccionar customer',async()=>{
        await page.waitFor(5000)
        await page.waitForSelector('i[class="fa fa-angle-down"]')
        await page.click('i[class="fa fa-angle-down"]')
        await page.waitForSelector('input.customers-input')
        await page.type('input.customers-input','AppTesting')
        await page.waitForSelector('span[data-hook="name"]')
        await page.click('span[data-hook="name"]')
        await page.waitForSelector('span[class="panel-item name"]')

    })

    it('select Script Task', async()=>{
        await page.waitFor(10000)
        await page.waitForSelector('span[class="panel-item name"]')
        await page.waitForSelector('i[data-hook="plus-menu-toggle"]')
        await page.click('i[data-hook="plus-menu-toggle"]')
        await page.waitForSelector('a[data-hook="create-task"]')
        await page.click('a[data-hook="create-task"]')
        await page.waitForSelector('button[data-hook="script"]')
        await page.click('button[data-hook="script"]')
    })

    it('complete task', async()=>{
        await page.waitFor(2000)
        await page.waitForSelector('input[name="name"]')
        await page.type('input[name="name"]',"esta task se creo de manera automatizada")
        await page.waitForSelector('input[class="select2-search__field"]')
        await page.type('input[class="select2-search__field"]','DESKTOP-EJ89REP')
        await page.keyboard.press('Enter')
        await page.waitForSelector('button[data-hook="mode-button"]')
        await page.click('button[data-hook="mode-button"]')
        await page.waitForSelector('input[name="filename"]')
        await page.waitFor(2000)
        await page.type('input[name="filename"]','pruebaautomatiza.bat')
        await page.waitForSelector('button[class="btn btn-primary example-btn"]')
        await page.click('button[class="btn btn-primary example-btn"]')
        await page.waitFor(14000)

        await page.waitForSelector('button[data-hook="confirm"]')
        await page.click('button[data-hook="confirm"]')
        await page.waitFor(12000)
    })


})


