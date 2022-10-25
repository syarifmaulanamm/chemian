import Elements from "../libs/element.json"

// Getl All Elements
export const getAllElements = () => {
    return Elements
}

// Get Element By Atom Number
export const getElementByNumber = (number) => {
    const item = Elements.find((o) => o.number === number)
    return item
}

// Get Element By Category
export const getElementByCategory = (category) =>  {
    const item = Elements.find((o) => o.category === category)
    return item
}