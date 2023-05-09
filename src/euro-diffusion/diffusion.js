import { CONFIG } from "../constants/config.js"

const assignCities = (diffusionCase) => {
    const cities = Object.values(diffusionCase.countries).reduce((prev, curr) => {
        curr.cities.forEach(prev.add, prev)

        return prev
    }, new Set())

    diffusionCase.cities = cities
}

const assignCitiesBalances = (diffusionCase) => {
    for (const city of diffusionCase.cities) {
        city.balances = Object.values(diffusionCase.countries).reduce((prev, curr) => {
            prev[curr.name] = city.country === curr.name ? CONFIG.INITIAL_BALANCE : 0

            return prev
        }, {})

        city.cachedBalances = {}
    }
}

const assignCitiesNeighbors = (diffusionCase) => {
    let grid = new Array(CONFIG.GRID_SIZE)
    for (let i = 0; i < CONFIG.GRID_SIZE; i++) {
        grid[i] = new Array(CONFIG.GRID_SIZE)
    }

    for (const city of diffusionCase.cities) {
        grid[city.y - 1][city.x - 1] = city
    }

    for (const city of diffusionCase.cities) {
        let x = city.x - 1
        let y = city.y - 1

        let neighbors = new Array()

        if (y - 1 >= 0) {
            neighbors.push(grid[y - 1][x])
        }

        if (x - 1 >= 0) {
            neighbors.push(grid[y][x - 1])
        }

        if (y + 1 < CONFIG.GRID_SIZE - 1) {
            neighbors.push(grid[y + 1][x])
        }

        if (x + 1 < CONFIG.GRID_SIZE - 1) {
            neighbors.push(grid[y][x + 1])
        }

        city.neighbors = new Set(neighbors.filter(city => city))
    }
}

const diffuse = (diffusionCase) => {
    for (const city of diffusionCase.cities) {
        for (const [country, balance] of Object.entries(city.balances)) {
            let transferAmount = Math.floor(balance / CONFIG.REPRESENTATIVE_PORTION)
            let allAmount = transferAmount * city.neighbors.size

            if (transferAmount === 0 || allAmount > balance) {
                continue
            }

            city.balances[country] -= allAmount

            for (const neighbour of city.neighbors) {
                if (neighbour.cachedBalances[country] === undefined) {
                    neighbour.cachedBalances[country] = 0
                }

                neighbour.cachedBalances[country] += transferAmount
            }
        }
    }

    for (const city of diffusionCase.cities) {
        for (const [contry, balance] of Object.entries(city.cachedBalances)) {
            city.balances[contry] += balance
        }

        city.cachedBalances = {}
    }
}

const checkCountryComplete = (country) => {
    const allBalances = [...country.cities].flatMap((city) => Object.values(city.balances))

    return allBalances.every((balance) => balance > 0)
}

const checkComplete = (diffusionCase) =>
    Object.values(diffusionCase.countries).every(checkCountryComplete)

const processCase = (diffusionCase) => {
    let diffusionState = {}

    for (const country of Object.keys(diffusionCase.countries)) {
        diffusionState[country] = -1
    }

    if (Object.values(diffusionCase.countries).length === 1) {
        diffusionState[Object.values(diffusionCase.countries)[0].name] = 0

        return diffusionState
    }

    assignCities(diffusionCase)
    assignCitiesBalances(diffusionCase)
    assignCitiesNeighbors(diffusionCase)

    let currentDay = 1

    while (!checkComplete(diffusionCase) && currentDay <= CONFIG.MAX_DAYS) {
        diffuse(diffusionCase)

        for (const [country, day] of Object.entries(diffusionState)) {
            if (day === -1 && checkCountryComplete(diffusionCase.countries[country])) {
                diffusionState[country] = currentDay
            }
        }

        currentDay += 1
    }

    return diffusionState
}

export { processCase }