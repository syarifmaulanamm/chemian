import Molecule from "../libs/molecule.json"

// Find Molecule
export const findMolecule = (elements) => {
    if(elements.length > 0) {
        let molecules = []

        elements.map((item) => {
            let find = Molecule.filter((o) => o.elements.includes(item.symbol))
            molecules = [...molecules, ...find]
            return true
        })

        return molecules
    } else {
        return []
    }
}