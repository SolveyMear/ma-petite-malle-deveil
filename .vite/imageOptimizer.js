import puppeteer,{KnownDevices} from "puppeteer";
import  server from 'node-http-server';
import freeport from 'find-free-port'
import sharp from "sharp";
import path, { resolve } from "path";
export function imageOptimizer(options = {}){
    if(!options.resolutions){
        options.resolutions = ['iPhone 6','iPhone 13 Pro Max',{name:'iPhone 15 Pro', width:430, height:930, deviceScaleFactor:3}, {width: 1920, height: 1080, deviceScaleFactor:1},{width:3456 , height: 2304, deviceScaleFactor:1}]
    }
    if(!options.quality){
        options.quality = 100
    }

    const sharpConfig = {
        jpeg: { quality: options.quality },
        webp: { quality: options.quality },
        png: { compressionLevel: Math.round(options.quality/100*9) },
    }

    options.resolutions = options.resolutions.map(a=>{
        if(typeof a == 'string'){
            if(!KnownDevices[a]){
                throw new Error(`${a} is not a valid device`)
            }
            return {...KnownDevices[a], emulate:true}
        }
        return {
            width: a.width,
            height: a.height,
            deviceScaleFactor: a.deviceScaleFactor || 1,
        }
    }).filter(e=>e)

    const EXTENSIONS  = ['jpg','png','gif']
    let httpServer 
    return {
        name: "image-optimizer",
        enforce: 'post',
        apply: 'build',
        writeBundle: async (_, bundler) => {
            console.log('Optimizing images')
            const allImages = Object.keys(bundler).filter(e=>EXTENSIONS.includes(path.extname(e).substring(1))).reduce((t, k)=>{
                t[k] = {
                    fileName: bundler[k].fileName,
                    source: bundler[k].source,
                    ...bundler[k],
                    // assetType: bundler[k].assetType,
                    extension:path.extname(bundler[k].fileName).slice(1),
                    width:0,
                    height:0
                }
                return t
            }, {})
            const pages =  Object.keys(bundler).filter(e=>['html'].includes(path.extname(e).substring(1)))
            const browser = await puppeteer.launch();
            const tab = await browser.newPage();
            const port = await freeport(1025, '127.0.0.1').then(([port]) => {
                return port
            })
        
            
            httpServer = await new Promise((resolve)=>{server.deploy(
                {
                    port,
                    root:_.dir
                },
                resolve
            )})
           
            let pictures = []
            for(let page of pages){
                // console.log(page)
                // if(page != 'src/pages/index.hbs.html') continue
                // console.log(page)
                page = bundler[page].fileName//path.join(_.dir,bundler[page].fileName)
                const prefixURL = `http://localhost:${port}`
                await tab.goto(`${prefixURL}/${page}`, { waitUntil: 'networkidle0' })
                let i = 0
                for(let resolution of options.resolutions){
                    i++
                    // console.log(resolution)
                    if(resolution.emulate){
                        await tab.emulate(resolution)
                    }else{

                        await tab.setViewport(resolution);
                    }
                    pictures = pictures.concat((await tab.evaluate(() => {
                        let imgs = Array.from(document.querySelectorAll('*')).filter(a=>a.tagName == 'IMG').map(a=>({src:a.src, width:a.offsetWidth, height:a.offsetHeight}))
                        let backgrounds = Array.from(document.querySelectorAll('*')).map(element=>({element, background:getComputedStyle(element).backgroundImage}))
                        .filter(({background})=>background && background != 'none')
                        .map(({background, element})=>{
                            let src = background.replace(/url\((.*)\)/,'$1')
                            if(src.startsWith("'") || src.startsWith('"')){
                                src = src.substring(1)
                            }
                            if(src.endsWith("'") || src.endsWith('"')){
                                src = src.substring(0, src.length-1)
                            }
                            return {src, width:element.offsetWidth, height:element.offsetHeight}
                        })
                        return imgs.concat(backgrounds).filter(e=>!e.src.startsWith('data:'))
                    })).map(a=>{
                        a.src = a.src.replace(prefixURL,'')
                        if(a.src.startsWith('/')){
                            a.src = a.src.substring(1)
                        }
                        return a
                    }).filter(e=>e.width && e.height))
                }
            }
            for(let picture of pictures){
                // if(!EXTENSIONS.includes(picture.extension)){
                //     continue
                // }
                if(!allImages[picture.src]){
                    picture.src = decodeURIComponent(picture.src)
                }
                if(!allImages[picture.src]){
                    // console.log(`${picture.src} not found`)
                    continue
                }
                if(allImages[picture.src].width < picture.width){
                    allImages[picture.src].width = picture.width
                }
                if(allImages[picture.src].height < picture.height){
                    allImages[picture.src].height = picture.height
                }
            }
            pictures = Object.values(allImages)
            .filter(e=>e.width && e.height)
            .filter(e=>EXTENSIONS.includes(e.extension))
          
            for(let picture of pictures){
                let filename = path.join(_.dir, picture.fileName)
                let image = await sharp(picture.source)
                const metadata = await image.metadata()
                
                let ratio = metadata.width/metadata.height
                let ratio2 = picture.width/picture.height
                if(ratio2 < ratio){
                    picture.width = Math.round(picture.height * ratio)
                }
                if(ratio2 > ratio){
                    picture.height = Math.round(picture.width / ratio)
                }
                // console.log(metadata.format)
                image = await image
                .resize(picture.width, picture.height, {fit:sharp.fit.cover})
                if(image[metadata.format]){
                    image = image[metadata.format](sharpConfig[metadata.format])
                }
                await image.toFile(filename)
                console.log(`${path.relative('.',filename)} resized to ${picture.width}x${picture.height} quality=${options.quality}`)
                // sharp
                // console.log(filename)

            }
            httpServer.server.close()
            browser.close()
        
        }
    }
}