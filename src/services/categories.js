import Categories from '../libs/categories.json'

// Get All Categories
export const getAllCategories = () => {
    return Categories
}

// Get ClassName
export const getCategoryClassName = (category) => {
    const item = Categories.find((o) => o.name === category)
    if(!item) return "bg-slate-800 text-slate-50"
    return item.className
}