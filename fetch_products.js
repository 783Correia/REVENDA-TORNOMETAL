const fs = require('fs');
const { decode } = require('html-entities');

async function fetchProducts() {
    const allProducts = [];
    let page = 1;

    console.log("Iniciando a extração de produtos...");

    while (true) {
        console.log(`Buscando a página ${page}...`);
        // Try using wp/v2/product to see if it gives more results, or stick to wc/store/products
        const response = await fetch(`https://tornometalevertonlopes.com.br/wp-json/wc/store/products?per_page=100&page=${page}`);

        if (!response.ok) {
            if (response.status === 400) {
                break;
            }
            console.error(`Erro buscando página: ${response.status} ${response.statusText}`);
            break;
        }

        const products = await response.json();

        if (products.length === 0) {
            break;
        }

        const mappedProducts = products.map(p => {
            let img = null;
            if (p.images && p.images.length > 0) {
                img = p.images[0].src;
            } else if (p.images && p.images[0] && p.images[0].thumbnail) {
                img = p.images[0].thumbnail;
            }

            let price = "Sob Consulta";
            if (p.price_html) {
                const match = p.price_html.match(/<bdi>.+?&nbsp;([\d.,]+)<\/bdi>/);
                if (match && match[1]) {
                    price = `R$ ${match[1]}`;
                } else {
                    let textOnly = p.price_html.replace(/<[^>]+>/g, '').trim();
                    textOnly = decode(textOnly); // Decode HTML entities
                    // Fix things like "Price range: R$ 13,90 through R$ 18,20" => "R$ 13,90 - R$ 18,20"
                    textOnly = textOnly.replace(/Price range:.*?through\s*/, ' - ');

                    if (textOnly) {
                        price = textOnly;
                    }
                }
            } else if (p.prices && p.prices.price) {
                const val = (p.prices.price / Math.pow(10, p.prices.currency_minor_unit)).toFixed(2);
                price = `R$ ${val.replace('.', ',')}`;
            }

            let name = decode(p.name);

            let categoryNames = [];
            if (p.categories && p.categories.length > 0) {
                categoryNames = p.categories.map(c => decode(c.name));
            }

            return {
                name: name,
                price: price,
                link: p.permalink,
                image: img,
                categories: categoryNames
            };
        });

        allProducts.push(...mappedProducts);
        page++;
    }

    console.log(`Extração concluída. Total de ${allProducts.length} produtos encontrados.`);

    fs.writeFileSync('produtos_extraidos.json', JSON.stringify(allProducts, null, 2), 'utf-8');
    console.log("Arquivo 'produtos_extraidos.json' atualizado.");
}

fetchProducts().catch(console.error);
