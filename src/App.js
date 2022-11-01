import { useState } from "react";
import logo from "./assets/images/logo-chemian.svg";
import { getAllCategories, getCategoryClassName } from "./services/categories";
import { getAllElements } from "./services/element";
import Element from "./components/Element";
import { Slide } from "react-reveal";
import { findMolecule } from "./services/molecule";

function App() {
	const [panel, setPanel] = useState({
		active : false,
		name : ''
	})
	const [selectedElement, setSelectedElement] = useState({}) 
	const [selectedMolecule, setSelectedMolecule] = useState({}) 
	const [selectedCategory, setSelectedCategory] = useState('')
	const [arElements, setArElements] = useState([])
	const [molecules, setMolecules] = useState([])
	const elements = getAllElements()
	const categories = getAllCategories()
	const lantanida = ['57','58','59','60','61','62','63','64','65','66','67','68','69','70','71']
	const aktinida = ['89','90','91','92','93','94','95','96','97','98','99','100','101','102','103']

	// Handle Click Element
	const handleClickElement = (item) => {
		setSelectedElement(item)
		setArElements([
			...arElements,
			item
		])
		setPanel({
			active : true,
			name : 'element'
		})
	}

	// Handle Find Molecules
	const handleFindMolecules = () => {
		const res = findMolecule(arElements)
		setMolecules(res)
		setPanel({
			active : true,
			name : 'molecules'
		})
		console.log(res)
	}

    return (
        <div className="App">
            <div className="min-h-screen bg-slate-900">
				<header className='flex items-center justify-center gap-5 w-full p-10'>
					<img src={logo} alt='CHEMIAN' width={200} />
					<h1 className='text-slate-50 border-l border-slate-50 pl-5 leading-5'>Tabel Periodik <br/>Unsur Kimia</h1>
				</header>
				<main className="grid grid-cols-6">
					<aside className="col-span-1 p-5">
						<div className="bg-blue-500 text-blue-50 text-center p-5 rounded-md">
							<div className="flex items-center justify-between">
								<span title="Nomor Atom" className="px-2 hover:bg-slate-900/50 transition-all duration-150 text-slate-100 rounded-full cursor-help font-medium">{ elements[0].number }</span>
								<span title="Titik Didih" className="px-2 hover:bg-slate-900/50 transition-all duration-150 text-slate-100 rounded-full cursor-help">{ elements[0].boil}</span>
							</div>
							<h2 title="Simbol" className="hover:bg-slate-900/50 transition-all duration-150 text-slate-100 rounded-full cursor-help text-7xl font-medium">{ elements[0].symbol }</h2>
							<p title="Nama Unsur" className="px-2 hover:bg-slate-900/50 transition-all duration-150 text-slate-100 rounded-full cursor-help">{ elements[0].name }</p>
							<p title="Berat Atom" className="px-2 text-sm hover:bg-slate-900/50 transition-all duration-150 text-slate-100 rounded-full cursor-help">{ elements[0].weight }</p>
						</div>
						<div className="flex flex-col gap-2 mt-5 transition-all duration-150 text-slate-50 hover:text-slate-200">
							{categories.map((item, index) => 
							<div className={selectedCategory === item.name ? "flex gap-2 py-2 px-3 items-center cursor-pointer bg-slate-700 rounded-md" : "flex gap-2 items-center cursor-pointer"} onClick={() => setSelectedCategory(item.name)} key={index}>
								<span className={ item.className + " w-5 h-5 rounded"}></span>
								<span>{ item.name }</span>
							</div>
							)}
						</div>
					</aside>
					<section className="col-span-5 p-5 overflow-y-auto">
						<div className="grid grid-cols-18 gap-1">
							<div onClick={() => handleClickElement(elements[0])} key={elements[0].name} draggable>
								<Element item={elements[0]} className={getCategoryClassName(elements[0].category)} />
							</div>
							<div className="col-span-1"></div>
							<div className="col-span-10 row-span-3 flex flex-col justify-end gap-2 p-5 text-white">
								<h2>Reaksi Kimia</h2>
								<div className="flex gap-10 items-center bg-slate-800 border-2 border-dashed border-slate-500 p-5 h-28 rounded-md">
									<div className="relative">
										<Element item={elements[0]} className={getCategoryClassName(elements[0].category)} />
										<button className="absolute -top-2 -right-2 py-1 px-2 bg-white text-xs text-slate-500 rounded-md shadow-sm">&times;</button>
									</div>
									<div className="relative">
										<Element item={elements[7]} className={getCategoryClassName(elements[7].category)} />
										<button className="absolute -top-2 -right-2 py-1 px-2 bg-white text-xs text-slate-500 rounded-md shadow-sm">&times;</button>
									</div>
									{/* <div className="text-slate-500">Seret Unsur Kesini</div> */}
									<button onClick={handleFindMolecules} className="flex flex-col items-center justify-center ml-auto bg-emerald-500 text-emerald-50 hover:bg-emerald-600 transition-all duration-150 py-2 px-3 rounded-md">
										<span className="material-symbols-outlined text-4xl">
										science
										</span>
										<span style={{fontSize: "10px"}}>Gabungkan</span>
									</button>
								</div>
							</div>
							<div className="col-span-5"></div>
							{elements.map((item, index) => 
								<>
									{!lantanida.includes(item.number) && !aktinida.includes(item.number) && item.number !== "1" &&
									<div onClick={() => handleClickElement(item)} key={index} draggable>
										<Element item={item} className={selectedCategory === item.category ? getCategoryClassName(item.category) + " border-2 border-slate-200 shadow-sm shadow-slate-200" : getCategoryClassName(item.category) } />
									</div>
									}
									
									{item.number === "56" &&
										<div className="row-span-2" key={index + "-span"}></div>
									}
								</>
							)}
						</div>
						<div className="grid grid-cols-18 gap-1 mt-10">
							<div className="col-span-3"></div>
							{elements.map((item, index) => 
								<>
									{lantanida.includes(item.number) && 
									<div onClick={() => handleClickElement(item)} key={index} draggable>
										<Element item={item} key={index} className={getCategoryClassName(item.category)} />
									</div>
									}
								</>
							)}
						</div>
						<div className="grid grid-cols-18 gap-1 mt-1">
							<div className="col-span-3"></div>
							{elements.map((item, index) => 
								<>
									{aktinida.includes(item.number) && 
									<div onClick={() => handleClickElement(item)} key={index} draggable>
										<Element item={item} key={index} className={getCategoryClassName(item.category)} />
									</div>
									}
								</>
							)}
						</div>
					</section>
				</main>
			</div>

			<Slide bottom collapse when={panel.active}>
				<div className="fixed w-full bottom-0 left-0 bg-white">
					<div className="flex w-full items-center justify-end border-b">
						<button onClick={() => setPanel({...panel, active : false})} className="w-20 text-center bg-rose-500 hover:bg-rose-600 text-rose-50 transition-all duration-150 p-2">
							&times; Close
						</button>
					</div>
					<div className="pb-20 w-full h-96 overflow-y-auto">
						{panel.name === 'element' &&
							<div className="grid grid-cols-7 items-start gap-5 p-10">
								<div className={getCategoryClassName(selectedElement.category) + " transition-all duration-150 text-center p-5 rounded-md"}>
									<div className="flex items-center justify-between">
										<span className="font-medium">{ selectedElement.number }</span>
										<span>{ selectedElement.boil}</span>
									</div>
									<h2 className="text-7xl font-medium">{ selectedElement.symbol }</h2>
									<p>{ selectedElement.name }</p>
									<p className="text-sm">{ selectedElement.weight }</p>
								</div>
								<div className="col-span-4 flex flex-col gap-3 px-5">
									<h2 className="text-4xl font-medium text-slate-900">{ selectedElement.name }</h2>
									<p className="text-slate-500"><em>{ selectedElement.spell }</em></p>
									<div className="text-slate-700 leading-6 tracking-wide" dangerouslySetInnerHTML={{__html: selectedElement.description }} />
								</div>
								<div className="col-span-2 grid grid-cols-2 gap-5 p-5 bg-slate-100 rounded-2xl">
									{/* <img src={ selectedElement.images } alt={ selectedElement.name } className="col-span-2 w-full rounded-lg shadow-sm" /> */}
									<div className="col-span-2 flex flex-col gap-1">
										<p className="text-xs font-medium text-slate-900">Penampilan</p>
										<p className="text-sm text-slate-500">{ selectedElement.appearance }</p>
									</div>
									<div className="flex flex-col gap-1">
										<p className="text-xs font-medium text-slate-900">Nomor Atom</p>
										<p className="text-sm text-slate-500">{ selectedElement.number }</p>
									</div>
									<div className="flex flex-col gap-1">
										<p className="text-xs font-medium text-slate-900">Golongan</p>
										<p className="text-sm text-slate-500">{ selectedElement.group }</p>
									</div>
									<div className="flex flex-col gap-1">
										<p className="text-xs font-medium text-slate-900">Periode</p>
										<p className="text-sm text-slate-500">{ selectedElement.period }</p>
									</div>
									<div className="flex flex-col gap-1">
										<p className="text-xs font-medium text-slate-900">Blok</p>
										<p className="text-sm text-slate-500">{ selectedElement.block }</p>
									</div>
									<div className="flex flex-col gap-1">
										<p className="text-xs font-medium text-slate-900">Kategori</p>
										<p className="text-sm text-slate-500">{ selectedElement.category }</p>
									</div>
									<div className="flex flex-col gap-1">
										<p className="text-xs font-medium text-slate-900">Berat Atom</p>
										<p className="text-sm text-slate-500">{ selectedElement.weight }</p>
									</div>
									<div className="flex flex-col gap-1">
										<p className="text-xs font-medium text-slate-900">Konfigurasi Elektron</p>
										<div className="text-sm text-slate-500" dangerouslySetInnerHTML={{__html: selectedElement.electronConfiguration }} />
									</div>
								</div>
							</div>
						}

						{panel.name === 'molecules' &&
							<div className="grid grid-cols-8 gap-5 p-10">
								<div className="col-span-2 flex flex-col gap-5">
									<h2 className="font-mendium text-xl">Unsur Penyusun</h2>
									<div className="grid grid-cols-2 gap-5">
									{arElements.map((item, index) => 
										<div className={getCategoryClassName(item.category) + " transition-all duration-150 text-center p-5 rounded-md"}>
											<div className="flex items-center justify-between">
												<span className="font-medium">{ item.number }</span>
												<span>{ item.boil}</span>
											</div>
											<h2 className="text-7xl font-medium">{ item.symbol }</h2>
											<p>{ item.name }</p>
											<p className="text-sm">{ item.weight }</p>
										</div>
									)}
									</div>
								</div>
								<div className="col-span-2  max-h-80 border-x px-5 overflow-y-auto">
									<h2 className="font-mendium text-xl">Reaksi Kimia</h2>
									<div className="flex flex-col gap-2">
									{molecules.map((item, index) => 
										<div className={selectedMolecule && selectedMolecule.name === item.name ? "bg-slate-100 border-b py-2 px-3 cursor-pointer" : "border-b py-2 px-3 cursor-pointer"} key={index} onClick={() => setSelectedMolecule(item)}>
											{item.name}
											<div className="text-sm text-slate-500" dangerouslySetInnerHTML={{__html: item.formula }} />
										</div>
									)}
									</div>
								</div>
								<div className="col-span-4">
									<h2 className="font-mendium text-4xl">{selectedMolecule.name}</h2>
									<div className="grid grid-cols-3 my-5 border-y py-5 gap-5">
										<div className="flex flex-col gap-1">
											<p className="text-xs font-medium text-slate-900">Formula</p>
											<div className="text-sm text-slate-500" dangerouslySetInnerHTML={{__html: selectedMolecule.formula }} />
										</div>
										<div className="flex flex-col gap-1">
											<p className="text-xs font-medium text-slate-900">Nama Lain</p>
											<div className="text-sm text-slate-500" dangerouslySetInnerHTML={{__html: selectedMolecule.otherName }} />
										</div>
										<div className="flex flex-col gap-1">
											<p className="text-xs font-medium text-slate-900">Molar</p>
											<div className="text-sm text-slate-500" dangerouslySetInnerHTML={{__html: selectedMolecule.molar }} />
										</div>
									</div>
									<div className="text-sm text-slate-500" dangerouslySetInnerHTML={{__html: selectedMolecule.description }} />
								</div>
							</div>
						}
					</div>
				</div>
			</Slide>
        </div>
    );
}

export default App;
