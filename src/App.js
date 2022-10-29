import { useState } from "react";
import logo from "./assets/images/logo-chemian.svg";
import logoIcon from "./assets/images/logo-icon-chemian.svg"
import { getAllCategories, getCategoryClassName } from "./services/categories";
import { getAllElements } from "./services/element";
import Element from "./components/Element";
import { Slide } from "react-reveal";

function App() {
	const [panel, setPanel] = useState({
		active : false,
		name : ''
	})
	const [selectedElement, setSelectedElement] = useState({}) 
	const [loading, setLoading] = useState(true)
	const elements = getAllElements()
	const categories = getAllCategories()
	const lantanida = ['57','58','59','60','61','62','63','64','65','66','67','68','69','70','71']
	const aktinida = ['89','90','91','92','93','94','95','96','97','98','99','100','101','102','103']

	// Handle Click Element
	const handleClickElement = (item) => {
		setSelectedElement(item)
		console.log(item)
		setPanel({
			active : true,
			name : 'element'
		})
	}

	// Handle Click Categories

    return (
        <div className="App">
            <div className="min-h-screen bg-slate-900">
				<header className='flex items-center justify-center gap-5 w-full p-10'>
					<img src={logo} alt='CHEMIAN' width={200} />
					<h1 className='text-slate-50 border-l border-slate-50 pl-5 leading-5'>Tabel Periodik <br/>Unsur Kimia</h1>
				</header>
				<main className="grid grid-cols-6">
					<aside className="col-span-1 p-5">
						<div className="bg-blue-500 text-blue-50 hover:bg-blue-600 transition-all duration-150 text-center p-5 rounded-md">
							<div className="flex items-center justify-between">
								<span className="font-medium">{ elements[0].number }</span>
								<span>{ elements[0].boil}</span>
							</div>
							<h2 className="text-7xl font-medium">{ elements[0].symbol }</h2>
							<p>{ elements[0].name }</p>
							<p className="text-sm">{ elements[0].weight }</p>
						</div>
						<div className="flex flex-col gap-2 mt-5 transition-all duration-150 text-slate-50 hover:text-slate-200">
							{categories.map((item, index) => 
							<div className="flex gap-2 items-center cursor-pointer">
								<span className={ item.className + " w-5 h-5 rounded"}></span>
								<span>{ item.name }</span>
							</div>
							)}
						</div>
					</aside>
					<section className="col-span-5 p-5 overflow-y-auto">
						<div className="grid grid-cols-18 gap-1">
							{elements.map((item, index) => 
								<>
									{!lantanida.includes(item.number) && !aktinida.includes(item.number) &&
									<div onClick={() => handleClickElement(item)} key={index} draggable>
										<Element item={item} className={getCategoryClassName(item.category)} />
									</div>
									}
									{item.number === "1" && 
										<div className="col-span-16" key={index + "-span"}></div>
									}
									{item.number === "4" &&
										<div className="col-span-10 row-span-2" key={index + "-span"}></div>
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
									<Element item={item} key={index} className={getCategoryClassName(item.category)} />
									}
								</>
							)}
						</div>
						<div className="grid grid-cols-18 gap-1 mt-1">
							<div className="col-span-3"></div>
							{elements.map((item, index) => 
								<>
									{aktinida.includes(item.number) && 
									<Element item={item} key={index} className={getCategoryClassName(item.category)} />
									}
								</>
							)}
						</div>
					</section>
				</main>
			</div>

			<Slide bottom collapse when={panel.active}>
				<div className="fixed w-full h-full bottom-0 left-0 bg-white">
					<div className="flex w-full items-center justify-end border-b">
						<button onClick={() => setPanel({...panel, active : false})} className="w-20 text-center bg-rose-500 hover:bg-rose-600 text-rose-50 transition-all duration-150 p-2">
							&times; Close
						</button>
					</div>
					<div className="pb-20 w-full h-full overflow-y-auto">
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
					</div>
					{/* <img src={logoIcon} alt="Loading" width={100} className="mx-auto mt-20 animate-spin" /> */}
				</div>
			</Slide>
        </div>
    );
}

export default App;
