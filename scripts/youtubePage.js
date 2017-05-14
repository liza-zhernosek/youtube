import {dataService} from './dataService';

export class youtubePage {
	constructor() {
		this.currentPage = 1;
		this.items = [];
	}

	createPage() {
		const logo = '<img class="logo" src="./img/YouTube-logo-full_color.png">';
		const searchIcon = '<a href="#" class="search-icon"><img src="./img/icon-search.png"></a>';
		const form = `<form><input type="text" autofocus>${searchIcon}</form>`;
		const searchContainer = `<div class="search-container">${logo}${form}</div>`;
		const itemsContainer = '<div class="items-container"></div>';
		const paginationContainer = `<div class="pagination-container"><span class="arrow"><</span><span class="current-page">${this.currentPage}</span><span class="arrow">></span></div>`;
		const body = document.body;

		body.innerHTML = `${searchContainer}${itemsContainer}${paginationContainer}`;
	}

	showVideos() {
		let tempContent = '';
		let items = this.items[this.currentPage - 1];

		items.forEach((item) => {
			this.fillVideoWithViews(item).then(() => {
				let videoBlock =
					`
						<div class="video-container">
							<a target="_blank" href=https://www.youtube.com/watch?v=${item.id.videoId}><img src=${item.snippet.thumbnails.medium.url}></a>
							<h3><a target="_blank" href=https://www.youtube.com/watch?v=${item.id.videoId}>${item.snippet.title}</a></h3>
							<h4><a target="_blank" href=https://www.youtube.com/channel/${item.snippet.channelId}>${item.snippet.channelTitle}</a></h4>
							<div class="date-and-views">
								<h5>${item.snippet.publishedAt.substr(0, 10)}</h5>
								<h6><img src="./img/eye-icon.png">${item.views}</h6>
							</div>
						</div>
					`;

				tempContent += videoBlock;
				this.stylizeContentAfterResponse(tempContent);
			});
		});
	}

	fillVideoWithViews(item) {
		if (!item.views) {
			return dataService
				.getViewsCount(item.id.videoId)
				.then((views) => item.views = views);
		} else {
			return Promise.resolve();
		}
	}

	parseResponse(items) {
		let tempArr = [];

		for (let i = 0; i < items.length; i++) {
			tempArr.push(items[i]);

			if (tempArr.length === 3) {
				this.items.push(tempArr);
				tempArr = [];
			}
		}

		this.showVideos();
	}

	stylizeContentAfterResponse(tempContent) {
		let searchContainer = document.querySelector('.search-container');
		let itemsContainer = document.querySelector('.items-container');
		let paginationContainer = document.querySelector('.pagination-container');
		let logo = document.querySelector('.logo');
		let form = document.querySelector('form');

		searchContainer.classList.add('search-container-response');
		logo.classList.add('logo-response');
		form.classList.add('form-response');
		itemsContainer.innerHTML = tempContent;
		itemsContainer.classList.add('items-container-reponse');
		paginationContainer.classList.add('pagination-container-visible');
	}

	setFormSubmit() {
		const searchButton = document.querySelector('.search-icon');
		const inputElem = document.querySelector('input');
		const form = document.querySelector('form');
		const getDataHandler = (event) => {
			event.preventDefault();

			const newInputValue = inputElem.value;

			if (this.oldInputValue !== newInputValue) {
				this.oldInputValue = newInputValue;

				dataService
					.getItems(newInputValue)
					.then((items) => {
						this.items = [];
						this.parseResponse(items);
					});
			}
		};

		searchButton.onclick = getDataHandler;
		form.onsubmit = getDataHandler;
	}

	initPage() {
		this.createPage();
		this.setFormSubmit();
		this.setPaginationClicks();
		this.setSwipePagination();
		this.setMousePagination();
	}

	setPaginationClicks() {
		const pagination = document.querySelector('.pagination-container');

		pagination.onclick = (event) => {
			let clickedPage = event.target.innerHTML;

			if(clickedPage === '&gt;') {	// > symbol
				this.getNextPage();
			} else if (clickedPage === '&lt;') {	// < symbol
				this.getPrevPage();
			}

			this.updatePaginationOnPage();
		}
	}

	getNextPage() {
		let items;

		this.currentPage++;

		if (this.currentPage % 5 === 0) {
			dataService
				.getNextPageItems()
				.then((items) => this.parseResponse(items));
		} else {
			this.showVideos();
		}
	}

	getPrevPage() {
		if (this.currentPage !== 1) {
			this.currentPage--;
			this.showVideos();
		}
	}

	updatePaginationOnPage() {
		let currentPaginationNumber = document.querySelector('.current-page');

		currentPaginationNumber.innerHTML = this.currentPage;
	}

	setSwipePagination() {
		let oldXcoordinate;
		let isTouch = false;

		document.addEventListener('touchstart', (event) => oldXcoordinate = event.changedTouches[0].clientX);

		document.addEventListener('touchmove', () => isTouch = true);

		document.addEventListener('touchend', (event) => {
			let newXCoordinate = event.changedTouches[0].clientX;

			if (this.items.length && isTouch && newXCoordinate < oldXcoordinate) {
				this.getNextPage();
				this.updatePaginationOnPage();
			} else if (this.items.length && isTouch && newXCoordinate > oldXcoordinate) {
				this.getPrevPage();
				this.updatePaginationOnPage();
			}

			isTouch = false;
			oldXcoordinate = newXCoordinate;
		});
	}

	setMousePagination() {
		let oldXcoordinate;

		document.addEventListener('mousedown', (event) => oldXcoordinate = event.clientX);

		document.addEventListener('mouseup', (event) => {
			let newXCoordinate = event.clientX;

			if (this.items.length && newXCoordinate < oldXcoordinate) {
				this.getNextPage();
				this.updatePaginationOnPage();
			} else if (this.items.length && newXCoordinate > oldXcoordinate) {
				this.getPrevPage();
				this.updatePaginationOnPage();
			}

			oldXcoordinate = newXCoordinate;
		});
	}
}
