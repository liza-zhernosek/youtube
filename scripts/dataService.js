const apiKey = 'AIzaSyC8HcO5nMmOjyHCDVpCKhFuTVdSkCL5-y8';

export const dataService = {
	savePageTokens(response) {
		this.nextPageToken = response.nextPageToken;
		this.prevPageToken = response.prevPageToken;
	},
	getItems(inputString) {
		const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&type=video&part=snippet&maxResults=15&q=${inputString}`;

		return fetch(url)
			.then((response) => response.json())
			.then((response) => {
				this.savePageTokens(response);
				this.url = url;

				return response.items;
			});
	},
	getViewsCount(item) {
		const url = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${item}&key=${apiKey}`;

		return fetch(url)
			.then((response) => response.json())
			.then((response) => response.items[0].statistics.viewCount);
	},
	getNextPageItems() {
		return fetch(`${this.url}&pageToken=${this.nextPageToken}`)
			.then((response) => response.json())
			.then((response) => {
				this.savePageTokens(response);
				return response.items;
			});
	}
}