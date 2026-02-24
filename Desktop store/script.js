const API = 'https://fakestoreapi.com/products';

let allProducts = [];

async function fetchProducts(){
	try{
		const res = await fetch(API);
		if(!res.ok) throw new Error(res.status);
		const products = await res.json();
		allProducts = products;
		renderTable(products);
	}catch(err){
		console.error('Failed to load products', err);
		const tbody = document.getElementById('products-body');
		tbody.innerHTML = '<tr><td colspan="5">Failed to load products.</td></tr>';
	}
}

function renderTable(products){
	const tbody = document.getElementById('products-body');
	tbody.innerHTML = '';
	products.forEach(p=>{
		const tr = document.createElement('tr');
		tr.dataset.id = p.id;
		tr.innerHTML = `
			<td>${p.id}</td>
			<td class="title">${escapeHtml(p.title)}</td>
			<td>${escapeHtml(p.category)}</td>
			<td>$${Number(p.price).toFixed(2)}</td>
			<td>${p.rating?.rate ?? ''} (${p.rating?.count ?? 0})</td>
		`;
		tr.addEventListener('click', ()=> showDetail(p));
		tbody.appendChild(tr);
	});
}

function filterProducts(term){
	if(!term) return allProducts;
	const q = term.trim().toLowerCase();
	return allProducts.filter(p=>{
		const title = String(p.title || '').toLowerCase();
		const category = String(p.category || '').toLowerCase();
		return title.includes(q) || category.includes(q);
	});
}

function showDetail(p){
	const modal = document.getElementById('modal');
	const container = document.getElementById('product-detail');
	container.innerHTML = `
		<div class="detail-grid">
			<img src="${p.image}" alt="${escapeHtml(p.title)}">
			<div>
				<h2>${escapeHtml(p.title)}</h2>
				<p class="price">$${Number(p.price).toFixed(2)}</p>
				<p class="category">Category: ${escapeHtml(p.category)}</p>
				<p class="description">${escapeHtml(p.description)}</p>
				<p class="rating">Rating: ${p.rating?.rate ?? 'N/A'} (${p.rating?.count ?? 0})</p>
			</div>
		</div>
	`;
	modal.classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', ()=>{
	const closeBtn = document.getElementById('close-btn');
	if(closeBtn) closeBtn.addEventListener('click', ()=> document.getElementById('modal').classList.add('hidden'));
	const modal = document.getElementById('modal');
	if(modal) modal.addEventListener('click', (e)=>{ if(e.target === e.currentTarget) e.currentTarget.classList.add('hidden'); });
	fetchProducts();

	const searchBtn = document.getElementById('search-btn');
	const clearBtn = document.getElementById('clear-btn');
	const searchInput = document.getElementById('search-input');

	if(searchBtn && searchInput){
		searchBtn.addEventListener('click', ()=>{
			const results = filterProducts(searchInput.value);
			renderTable(results);
		});
		searchInput.addEventListener('keydown', (e)=>{
			if(e.key === 'Enter'){
				const results = filterProducts(searchInput.value);
				renderTable(results);
			}
		});
	}
	if(clearBtn && searchInput){
		clearBtn.addEventListener('click', ()=>{
			searchInput.value = '';
			renderTable(allProducts);
		});
	}
});

function escapeHtml(s){
	return String(s)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

