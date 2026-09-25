export const environments = {
    local: { base: 'http://localhost:3000',
        apiBase: 'https://fakestoreapi.com',
        shipments: 'http://localhost:3000/shipments',
        factories: 'http://localhost:3000/factories'
    } ,
    qa: { base: 'https://www.saucedemo.com/',
        apiBase: 'https://fakestoreapi.com',
        shipments: 'http://qa.myapp.com/shipments',
        factories: 'http://qa.myapp.com/factories'
    },
    staging: { base: 'https://www.staging.saucedemo.com/',
        apiBase: 'https://fakestoreapi.com',
        shipments: 'http://qa.myapp.com/shipments',
        factories: 'http://qa.myapp.com/factories'
    }
}

export type Environment = keyof typeof environments;